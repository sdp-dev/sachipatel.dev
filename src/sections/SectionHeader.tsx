import './SectionHeader.css';

interface SectionHeaderProps {
  n: string;
  title: string;
}

const SectionHeader = ({ n, title }: SectionHeaderProps) => (
  <div className="section-header">
    <span className="section-n mono">{n}</span>
    <h2 className="section-title">
      <span className="mono">&lt;</span>
      {title}
      <span className="mono">/&gt;</span>
    </h2>
    <span className="section-rule" aria-hidden="true" />
  </div>
);

export default SectionHeader;
