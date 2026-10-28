import SectionHeader from './SectionHeader';
import { socials } from '../data/socials';
import './Contact.css';

const stripUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').split('?')[0].replace(/\/$/, '');

const channels = [
  ...socials.map((s) => ({ key: s.name.toLowerCase(), label: stripUrl(s.url), href: s.url })),
  { key: 'resume', label: 'resume.pdf ↓', href: '/resume.pdf' },
];

const Contact = () => (
  <section id="contact" className="section-block">
    <SectionHeader n="05" title="contact.json" sub="pick a channel" />
    <div className="contact-grid">
      {channels.map((c) => (
        <a key={c.key} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-cell">
          <div>
            <div className="contact-key mono">{c.key}</div>
            <div className="contact-value mono">{c.label}</div>
          </div>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  </section>
);

export default Contact;
