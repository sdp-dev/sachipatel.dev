import './SectionHeader.css';

interface SectionHeaderProps {
  n: string;
  title: string;
  sub?: string;
}

const SectionHeader = ({ n, title, sub }: SectionHeaderProps) => (
  <div className="section-header mono">
    <span className="section-n">§ {n}</span>
    <h2 className="section-title">{title}</h2>
    {sub && <span className="section-sub">// {sub}</span>}
    <span className="section-rule" aria-hidden="true" />
  </div>
);

export default SectionHeader;
