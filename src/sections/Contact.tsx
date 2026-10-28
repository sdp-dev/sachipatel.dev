import { FiArrowUpRight, FiFileText } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import { socials } from '../data/socials';
import './Contact.css';

const stripUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').split('?')[0].replace(/\/$/, '');

const channels = [
  ...socials.map((s) => ({ name: s.name, icon: s.icon, label: stripUrl(s.url), href: s.url })),
  { name: 'Resume', icon: FiFileText, label: 'resume.pdf', href: '/resume.pdf' },
];

const Contact = () => (
  <section id="contact" className="section-block">
    <SectionHeader n="05" title="contact" />
    <div className="contact-grid">
      {channels.map((c) => (
        <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-cell">
          <c.icon className="contact-icon" />
          <div className="contact-text">
            <div className="contact-key">{c.name}</div>
            <div className="contact-value">{c.label}</div>
          </div>
          <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
        </a>
      ))}
    </div>
  </section>
);

export default Contact;
