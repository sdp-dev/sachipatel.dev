import { Link } from 'react-router-dom';

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

// Renders **highlight** and [label](href) markup from the shared data strings.
const RichText = ({ text }: { text: string }) => {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const [whole, bold, label, href] = match;
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    if (bold) {
      parts.push(<span key={index} className="highlight">{bold}</span>);
    } else if (href.startsWith('/')) {
      parts.push(<Link key={index} to={href}>{label}</Link>);
    } else {
      parts.push(<a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    }
    last = index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};

export default RichText;
