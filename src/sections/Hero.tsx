import Terminal from '../components/Terminal';
import RichText from '../components/RichText';
import { profile } from '../data/about';
import { socials } from '../data/socials';
import { scrollToSection } from '../sections';
import './Hero.css';

const linkedin = socials.find((s) => s.name === 'LinkedIn')!.url;

const Hero = () => (
  <section className="hero">
    <div className="hero-intro">
      <div className="hero-hello mono">// hello, world</div>
      <h1 className="hero-name mono">
        sachi
        <br />
        patel
      </h1>
      <p className="hero-school">
        <RichText text={profile.school} />
      </p>

      <dl className="hero-meta mono">
        <div>
          <dt>$ status</dt>
          <dd className="hero-status">● {profile.status}</dd>
        </div>
        <div>
          <dt>$ location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>$ pronouns</dt>
          <dd>{profile.pronouns}</dd>
        </div>
      </dl>

      <div className="hero-actions mono">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="term-btn primary">
          ↓ resume.pdf
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="term-btn">
          say hi →
        </a>
      </div>
    </div>

    <div className="hero-terminal">
      <Terminal onNav={scrollToSection} />
    </div>
  </section>
);

export default Hero;
