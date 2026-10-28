import RichText from '../components/RichText';
import SectionHeader from './SectionHeader';
import { whoAmI, whatIDo, beyondCode, factSheet, currently } from '../data/about';
import './About.css';

const paragraphs = [
  ['Who I am', whoAmI],
  ['What I do', whatIDo],
  ['Beyond code', beyondCode],
];

const About = () => (
  <section id="about" className="section-block">
    <SectionHeader n="01" title="about" />
    <div className="about-grid">
      <div className="about-prose">
        {paragraphs.map(([label, text]) => (
          <div key={label} className="about-para">
            <h3 className="about-label">{label}</h3>
            <p>
              <RichText text={text} />
            </p>
          </div>
        ))}
      </div>

      <aside className="fact-sheet">
        <img src="/images/profile.jpg" alt="Sachi Patel" className="fact-photo" />
        <div className="box-label">Quick facts</div>
        <dl>
          {factSheet.map(([key, value]) => (
            <div key={key} className="fact-row">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="fact-currently">
          <span className="fact-currently-label">Currently</span> {currently.join(' ')}
        </p>
      </aside>
    </div>
  </section>
);

export default About;
