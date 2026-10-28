import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import RichText from './RichText';
import { socials } from '../data/socials';
import { stack } from '../data/stack';
import { whoAmI, currently } from '../data/about';
import { SECTIONS, type SectionId } from '../sections';
import './Terminal.css';

type Kind = 'in' | 'out' | 'err' | 'sys';

interface Line {
  id: number;
  kind: Kind;
  value: ReactNode;
}

const RESUME = '/resume.pdf';
const linkedin = socials.find((s) => s.name === 'LinkedIn')!.url;

const stripUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').split('?')[0].replace(/\/$/, '');

// `cd` targets: section ids plus a few aliases. null means the top of the page.
const DESTINATIONS: Record<string, SectionId | null> = {
  ...Object.fromEntries(SECTIONS.map((id) => [id, id])),
  work: 'experience',
  '~': null,
  '..': null,
  home: null,
};

const HELP: [string, string][] = [
  ['ls', 'list sections'],
  ['cd <section>', `jump to: ${SECTIONS.join(', ')}`],
  ['cat about.md', 'read about'],
  ['whois', 'contact info'],
  ['stack', 'tech stack'],
  ['resume', 'open resume.pdf'],
  ['clear', 'clear terminal'],
  ['sudo hire-me', ';)'],
];

const COMPLETIONS = [
  'help', 'ls', 'clear', 'whois', 'stack', 'resume', 'cat about.md',
  ...SECTIONS.map((id) => `cd ${id}`),
  'sudo hire-me',
];

const SHORTCUTS = ['help', 'ls', 'cd projects', 'whois'];

const LISTING: [string, string][] = [
  ['about.md', 'cat about.md'],
  ...SECTIONS.filter((id) => id !== 'about').map((id): [string, string] => [
    id === 'stack' ? 'stack.toml' : id === 'contact' ? 'contact.json' : `${id}/`,
    `cd ${id}`,
  ]),
  ['resume.pdf', 'resume'],
];

// Clickable command. Buttons in old output keep the `run` they were rendered with, which is fine:
// it only touches state setters, refs and the stable onNav prop.
const Cmd = ({ run, cmd, children }: { run: (cmd: string) => void; cmd: string; children?: ReactNode }) => (
  <button type="button" className="tty-cmd" onClick={() => run(cmd)}>
    {children ?? cmd}
  </button>
);

const Prompt = () => (
  <span className="tty-prompt">
    <span className="tty-user">sachi@sdp</span>
    <span className="tty-dim">:</span>
    <span className="tty-path">~</span>
    <span className="tty-dim">$</span>
  </span>
);

const bootLines = (): Omit<Line, 'id'>[] => [
  {
    kind: 'sys',
    value: `sachi@sdp · session started ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
  },
  { kind: 'sys', value: "type 'help' for commands · 'cd projects' to jump · tab to complete" },
];

const Terminal = ({ onNav }: { onNav: (id: SectionId | null) => void }) => {
  const nextId = useRef(0);
  const withIds = (lines: Omit<Line, 'id'>[]) => lines.map((l) => ({ ...l, id: nextId.current++ }));

  const [lines, setLines] = useState<Line[]>(() => withIds(bootLines()));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  // Only grab focus where there's a keyboard; on phones it would pop the on-screen one open.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true });
  }, []);

  const output = (raw: string): { kind?: Kind; value: ReactNode }[] | null => {
    const cmd = raw.trim().toLowerCase();

    if (cmd === 'help') {
      return [
        { value: 'available commands:' },
        ...HELP.map(([name, desc]) => ({
          value: (
            <>
              {'  '}
              <Cmd run={run} cmd={name.includes('<') ? 'cd projects' : name}>{name}</Cmd>
              {' '.repeat(Math.max(1, 17 - name.length))}
              <span className="tty-dim">{desc}</span>
            </>
          ),
        })),
      ];
    }
    if (cmd === 'ls') {
      return [{
        value: (
          <span className="tty-ls">
            {LISTING.map(([name, target]) => (
              <Cmd key={name} run={run} cmd={target}>
                <span className={name.endsWith('/') ? 'tty-dir' : undefined}>{name}</span>
              </Cmd>
            ))}
          </span>
        ),
      }];
    }
    if (cmd === 'cat about.md') {
      return [{ value: <RichText text={whoAmI} /> }, { value: '' }, { value: `currently: ${currently.join(' ')}` }];
    }
    if (cmd.startsWith('cat ')) {
      return [{ kind: 'err', value: `cat: ${cmd.slice(4)}: no such file. try 'cat about.md'` }];
    }
    if (cmd === 'whois') {
      return [
        { value: '  name      Sachi Patel' },
        ...socials.map((s) => ({
          value: (
            <>
              {`  ${s.name.toLowerCase().padEnd(10)}`}
              <a href={s.url} target="_blank" rel="noopener noreferrer">{stripUrl(s.url)}</a>
            </>
          ),
        })),
      ];
    }
    if (cmd === 'stack') {
      return stack.map((s) => ({ value: `  ${s.group.padEnd(16)} ${s.items.join(', ')}` }));
    }
    if (cmd === 'whoami') {
      return [{ value: 'sachi: CS & Econ @ Barnard/Columbia, builder of agentic systems and backend/cloud infra.' }];
    }
    if (cmd === 'pwd') return [{ value: '/home/sachi' }];
    if (cmd === 'sudo hire-me') {
      return [
        { value: '[sudo] password for recruiter:' },
        { value: '...' },
        { value: 'access granted ✓' },
        { value: <>linkedin: <a href={linkedin} target="_blank" rel="noopener noreferrer">{stripUrl(linkedin)}</a></> },
      ];
    }
    if (cmd.startsWith('sudo')) return [{ value: 'sachi is not in the sudoers file. This incident will be reported.' }];
    return null;
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo = { kind: 'in' as Kind, value: raw };
    const append = (more: Omit<Line, 'id'>[]) => setLines((prev) => [...prev, ...withIds(more)]);

    setInput('');
    setHistoryIndex(-1);
    if (!cmd) return append([echo]);
    setHistory((prev) => [raw, ...prev]);

    if (cmd === 'clear') return setLines(withIds(bootLines()));

    if (cmd === 'resume' || cmd === 'open resume.pdf') {
      append([echo, { kind: 'out', value: 'opening resume.pdf...' }]);
      window.open(RESUME, '_blank', 'noopener');
      return;
    }

    if (cmd === 'cd' || cmd.startsWith('cd ')) {
      const dest = cmd.slice(3).trim().replace(/\/$/, '') || '~';
      if (dest in DESTINATIONS) {
        const target = DESTINATIONS[dest];
        append([echo, { kind: 'sys', value: `navigating to ~/${target ?? ''}...` }]);
        setTimeout(() => onNav(target), 250);
      } else {
        append([echo, { kind: 'err', value: `cd: ${dest}: no such directory. try: ${SECTIONS.join(', ')}` }]);
      }
      return;
    }

    const out = output(raw);
    if (out) append([echo, ...out.map((o) => ({ kind: o.kind ?? ('out' as Kind), value: o.value }))]);
    else append([echo, { kind: 'err', value: <>{cmd}: command not found. try <Cmd run={run} cmd="help" />.</> }]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = COMPLETIONS.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) setLines((prev) => [...prev, ...withIds([{ kind: 'out', value: matches.join('   ') }])]);
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(i);
      setInput(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = Math.max(historyIndex - 1, -1);
      setHistoryIndex(i);
      setInput(i === -1 ? '' : history[i]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines(withIds(bootLines()));
    }
  };

  const focusInput = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="tty mono">
      <div className="tty-bar">
        <span className="tty-bar-left">
          <span className="tty-dots" aria-hidden="true">
            <span />
            <span />
            <span className="on" />
          </span>
          ~/sachi-portfolio — zsh
        </span>
        <span className="tty-dim">80×24</span>
      </div>

      <div className="tty-body" ref={bodyRef} onClick={focusInput}>
        {lines.map((line) =>
          line.kind === 'in' ? (
            <div key={line.id} className="tty-line">
              <Prompt /> {line.value}
            </div>
          ) : (
            <div key={line.id} className={`tty-line tty-${line.kind}`}>
              {line.value === '' ? ' ' : line.value}
            </div>
          ),
        )}
        <div className="tty-input-row">
          <Prompt />
          <input
            ref={inputRef}
            className="tty-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="tty-shortcuts">
        {SHORTCUTS.map((cmd) => (
          <Cmd key={cmd} run={run} cmd={cmd} />
        ))}
      </div>
    </div>
  );
};

export default Terminal;
