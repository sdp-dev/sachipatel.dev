import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import RichText from './RichText';
import { socials } from '../data/socials';
import { whoAmI, whatIDo, beyondCode, experiences } from '../data/about';
import { projects } from '../data/projects';
import './AboutTerminal.css';

type Run = (cmd: string) => void;
type FileNode = { type: 'file'; render: (run: Run) => ReactNode; href?: string };
type DirNode = { type: 'dir'; children: Record<string, FsNode> };
type FsNode = FileNode | DirNode;

interface Entry {
  id: number;
  cwd: string[];
  cmd: string;
  output: ReactNode;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Cmd = ({ run, cmd, children }: { run: Run; cmd: string; children?: ReactNode }) => (
  <button type="button" className="term-cmd" onClick={() => run(cmd)}>
    {children ?? cmd}
  </button>
);

const text = (t: string): FileNode => ({ type: 'file', render: () => <p className="term-prose"><RichText text={t} /></p> });

const fs: DirNode = {
  type: 'dir',
  children: {
    'about.txt': text(whoAmI),
    'now.txt': text(whatIDo),
    experience: {
      type: 'dir',
      children: Object.fromEntries(
        [...new Set(experiences.map((exp) => exp.file))].map((file) => [
          file,
          {
            type: 'file',
            render: () => (
              <div className="term-cards">
                {experiences.filter((exp) => exp.file === file).map((exp) => (
                  <div key={exp.company} className="term-card">
                    <div className="term-card-title">{exp.role}</div>
                    <div className="term-card-meta">{exp.company} · {exp.period}</div>
                    <p className="term-prose">{exp.description}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]),
      ),
    },
    projects: {
      type: 'dir',
      children: Object.fromEntries(
        projects.map((project) => [
          `${slugify(project.name)}.txt`,
          {
            type: 'file',
            render: () => (
              <div className="term-card">
                <div className="term-card-title">{project.name}</div>
                <div className="term-card-meta">{project.technologies.join(' · ')}</div>
                <ul className="term-list">
                  {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            ),
          },
        ]),
      ),
    },
    'beyond-code.txt': text(beyondCode),
    'contact.txt': {
      type: 'file',
      render: () => (
        <ul className="term-list term-list-plain">
          {socials.map((social) => (
            <li key={social.name}>
              <span className="term-key">{social.name.toLowerCase()}</span>
              <a href={social.url} target="_blank" rel="noopener noreferrer">{social.url.replace(/^https?:\/\/(www\.)?/, '').split('?')[0]}</a>
            </li>
          ))}
        </ul>
      ),
    },
    'resume.pdf': {
      type: 'file',
      href: '/resume.pdf',
      render: (run) => <span>That's a PDF. Try <Cmd run={run} cmd="open resume.pdf" />.</span>,
    },
  },
};

const resolve = (cwd: string[], arg: string) => {
  const parts = arg.startsWith('/') || arg.startsWith('~') ? [] : [...cwd];
  for (const seg of arg.replace(/^~/, '').split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts;
};

const lookup = (parts: string[]): FsNode | undefined => {
  let node: FsNode = fs;
  for (const part of parts) {
    if (node.type !== 'dir' || !node.children[part]) return undefined;
    node = node.children[part];
  }
  return node;
};

const displayPath = (cwd: string[]) => (cwd.length ? `~/${cwd.join('/')}` : '~');

// Path of `target` relative to `cwd`, so clickable entries produce commands that work from where you are.
const relative = (cwd: string[], target: string[]) => {
  let i = 0;
  while (i < cwd.length && cwd[i] === target[i]) i++;
  return [...Array(cwd.length - i).fill('..'), ...target.slice(i)].join('/') || '.';
};

const COMMANDS: [string, string][] = [
  ['help', 'show this list'],
  ['ls [dir]', 'list files'],
  ['cd <dir>', 'change directory'],
  ['cat <file>', 'print a file'],
  ['open <file>', 'open a file (try resume.pdf)'],
  ['tree', 'show everything at once'],
  ['clear', 'clear the screen'],
  ['exit', 'back to the regular page'],
];

interface Result {
  output?: ReactNode;
  cwd?: string[];
  clear?: boolean;
  effect?: () => void;
}

const Prompt = ({ cwd }: { cwd: string[] }) => (
  <span className="term-prompt">
    <span className="term-user">sachi@sdp</span>:<span className="term-path">{displayPath(cwd)}</span>$
  </span>
);

const AboutTerminal = ({ onExit }: { onExit: () => void }) => {
  const [cwd, setCwd] = useState<string[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const cwdRef = useRef<string[]>([]);
  const booted = useRef(false);

  const listing = (dir: DirNode, path: string[], from: string[], run: Run) => (
    <div className="term-ls">
      {Object.entries(dir.children).map(([name, node]) => {
        const rel = relative(from, [...path, name]);
        return node.type === 'dir' ? (
          <Cmd key={name} run={run} cmd={`cd ${rel}`}><span className="term-dir">{name}/</span></Cmd>
        ) : (
          <Cmd key={name} run={run} cmd={node.href ? `open ${rel}` : `cat ${rel}`}>{name}</Cmd>
        );
      })}
    </div>
  );

  const tree = (dir: DirNode, path: string[], from: string[], run: Run, prefix = ''): ReactNode[] =>
    Object.entries(dir.children).flatMap(([name, node], i, all) => {
      const lastChild = i === all.length - 1;
      const rel = relative(from, [...path, name]);
      const line = (
        <div key={rel}>
          <span className="term-muted">{prefix}{lastChild ? '└── ' : '├── '}</span>
          {node.type === 'dir' ? (
            <Cmd run={run} cmd={`cd ${rel}`}><span className="term-dir">{name}/</span></Cmd>
          ) : (
            <Cmd run={run} cmd={node.href ? `open ${rel}` : `cat ${rel}`}>{name}</Cmd>
          )}
        </div>
      );
      return node.type === 'dir'
        ? [line, ...tree(node, [...path, name], from, run, prefix + (lastChild ? '    ' : '│   '))]
        : [line];
    });

  const execute = (raw: string, dir: string[], run: Run): Result => {
    const [name = '', ...args] = raw.trim().split(/\s+/);
    const arg = args[0] ?? '';
    const target = resolve(dir, arg);
    const node = lookup(target);

    switch (name) {
      case '':
        return {};
      case 'help':
        return {
          output: (
            <div className="term-help">
              {COMMANDS.map(([cmd, desc]) => (
                <div key={cmd}>
                  <Cmd run={run} cmd={cmd.split(' ')[0]}>{cmd}</Cmd>
                  <span className="term-muted">{desc}</span>
                </div>
              ))}
            </div>
          ),
        };
      case 'ls':
        if (!node) return { output: `ls: ${arg}: No such file or directory` };
        if (node.type === 'file') return { output: arg };
        return { output: listing(node, target, dir, run) };
      case 'cd':
        if (!arg) return { cwd: [] };
        if (!node) return { output: `cd: no such directory: ${arg}` };
        if (node.type === 'file') return { output: `cd: not a directory: ${arg}` };
        return { cwd: target, output: listing(node, target, target, run) };
      case 'cat':
        if (!arg) return { output: 'usage: cat <file>' };
        if (!node) return { output: `cat: ${arg}: No such file or directory` };
        if (node.type === 'dir') return { output: `cat: ${arg}: Is a directory` };
        return { output: node.render(run) };
      case 'open':
        if (!arg) return { output: 'usage: open <file>' };
        if (!node) return { output: `open: ${arg}: No such file or directory` };
        if (node.type === 'file' && node.href) {
          const href = node.href;
          return { output: `Opening ${arg}…`, effect: () => window.open(href, '_blank', 'noopener') };
        }
        return execute(`${node.type === 'dir' ? 'ls' : 'cat'} ${arg}`, dir, run);
      case 'tree':
        return { output: <div className="term-tree"><div>{displayPath(dir)}</div>{tree(fs, [], dir, run)}</div> };
      case 'pwd':
        return { output: `/home/sachi${dir.length ? '/' + dir.join('/') : ''}` };
      case 'whoami':
        return { output: 'sachi: CS & Econ @ Barnard/Columbia, builder of agentic systems and backend/cloud infra.' };
      case 'clear':
        return { clear: true };
      case 'exit':
        return { effect: onExit };
      case 'sudo':
        return { output: 'sachi is not in the sudoers file. This incident will be reported.' };
      default:
        return { output: <>command not found: {name}. Type <Cmd run={run} cmd="help" /> for options.</> };
    }
  };

  // Reads the directory from a ref so clicks inside old output run against the current directory.
  const run: Run = (cmd) => {
    const dir = cwdRef.current;
    const result = execute(cmd, dir, run);
    const next = result.cwd ?? dir;
    cwdRef.current = next;
    setCwd(next);
    setEntries((prev) => (result.clear ? [] : [...prev, { id: nextId.current++, cwd: dir, cmd, output: result.output }]));
    result.effect?.();
    if (cmd.trim()) setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInput('');
  };

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    run('cat about.txt');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [entries]);

  const complete = () => {
    const tokens = input.split(' ');
    const partial = tokens[tokens.length - 1];
    let candidates: string[];
    if (tokens.length === 1) {
      candidates = COMMANDS.map(([cmd]) => cmd.split(' ')[0]).filter((c) => c.startsWith(partial));
    } else {
      const slash = partial.lastIndexOf('/');
      const base = partial.slice(0, slash + 1);
      const dir = lookup(resolve(cwd, base || '.'));
      if (dir?.type !== 'dir') return;
      candidates = Object.entries(dir.children)
        .filter(([name]) => name.startsWith(partial.slice(slash + 1)))
        .map(([name, node]) => base + name + (node.type === 'dir' ? '/' : ''));
    }
    if (!candidates.length) return;
    // Fill in the longest prefix shared by every candidate.
    let common = candidates[0];
    for (const c of candidates) while (!c.startsWith(common)) common = common.slice(0, -1);
    tokens[tokens.length - 1] = common + (candidates.length === 1 && !common.endsWith('/') ? ' ' : '');
    setInput(tokens.join(' '));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const i = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setInput(history[i]);
    } else if (e.key === 'ArrowDown' && historyIndex !== null) {
      e.preventDefault();
      const i = historyIndex + 1;
      setHistoryIndex(i < history.length ? i : null);
      setInput(i < history.length ? history[i] : '');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="term">
      <div className="term-header">
        <div className="term-buttons">
          <button type="button" className="term-btn red" aria-label="Close terminal" onClick={onExit} />
          <span className="term-btn yellow" />
          <span className="term-btn green" />
        </div>
        <span className="term-title mono">sachi@sdp: {displayPath(cwd)}</span>
      </div>

      <div className="term-body mono" ref={bodyRef} onClick={focusInput}>
        <div className="term-muted term-banner">
          Click any underlined name to open it, or type <Cmd run={run} cmd="help" />.
        </div>
        {entries.map((entry) => (
          <div key={entry.id} className="term-entry">
            <div><Prompt cwd={entry.cwd} /> {entry.cmd}</div>
            {entry.output && <div className="term-output">{entry.output}</div>}
          </div>
        ))}
        <div className="term-input-row">
          <Prompt cwd={cwd} />
          <input
            ref={inputRef}
            className="term-input mono"
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

      <div className="term-shortcuts mono">
        {['ls', 'cd experience', 'cd projects', 'open resume.pdf'].map((cmd) => (
          <Cmd key={cmd} run={run} cmd={cmd} />
        ))}
      </div>
    </div>
  );
};

export default AboutTerminal;
