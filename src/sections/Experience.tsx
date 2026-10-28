import SectionHeader from './SectionHeader';
import { experiences } from '../data/about';
import './Experience.css';

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="bullets">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Experience = () => (
  <section id="experience" className="section-block">
    <SectionHeader n="02" title="experience" />
    <ol className="timeline">
      {experiences.map((exp) => (
        <li key={`${exp.company}-${exp.period}`} className="timeline-item">
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-when mono">
            <div>{exp.period}</div>
            <div>{exp.location}</div>
          </div>
          <div className="timeline-card">
            <h3 className="timeline-role">{exp.role}</h3>
            <div className="timeline-company">
              {exp.company}
            </div>
            {exp.bullets && <Bullets items={exp.bullets} />}
            {exp.groups?.map((group) => (
              <div key={group.label} className="timeline-group">
                <div className="timeline-group-head">
                  <span>{group.label}</span>
                  <span className="timeline-group-period">{group.period}</span>
                </div>
                <Bullets items={group.bullets} />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
