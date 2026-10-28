import RichText from '../components/RichText';
import SectionHeader from './SectionHeader';
import { whoAmI, whatIDo, beyondCode, factSheet, currently } from '../data/about';
import './About.css';

const paragraphs = [
  ['who i am', whoAmI],
  ['what i do', whatIDo],
  ['beyond code', beyondCode],
];

const About = () => (
  <section id="about" className="section-block">
    <SectionHeader n="01" title="about.md" sub="who I am" />
    <div className="about-grid">
      <div className="about-prose">
        {paragraphs.map(([label, text]) => (
          <div key={label} className="about-para">
            <h3 className="about-label mono"># {label}</h3>
            <p>
              <RichText text={text} />
            </p>
          </div>
        ))}
      </div>

      <aside className="fact-sheet mono">
        <img src="/images/profile.jpg" alt="Sachi Patel" className="fact-photo" />
        <div className="box-label">[ fact sheet ]</div>
        <dl>
          {factSheet.map(([key, value]) => (
            <div key={key} className="fact-row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="fact-currently">
          ┌─ currently
          {currently.map((line) => (
            <span key={line}>
              <br />│  {line}
            </span>
          ))}
          <br />└─ updated oct '26
        </div>
      </aside>
    </div>
  </section>
);

export default About;
