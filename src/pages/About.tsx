import { useState } from 'react';
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import RichText from '../components/RichText';
import AboutTerminal from '../components/AboutTerminal';
import { whoAmI, whatIDo, beyondCode, experiences } from '../data/about';
import './About.css';

type View = 'read' | 'terminal';

const VIEW_KEY = 'about-view';

const loadView = (): View => {
  try {
    return localStorage.getItem(VIEW_KEY) === 'read' ? 'read' : 'terminal';
  } catch {
    return 'terminal';
  }
};

const About = () => {
  const [view, setView] = useState<View>(loadView);

  const changeView = (next: View) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <div className="about">
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <span className="mono">&lt;</span>
            about
            <span className="mono">/&gt;</span>
          </h1>
        </motion.div>

        <div className="view-toggle mono" role="tablist" aria-label="About view">
          {(['terminal', 'read'] as View[]).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={view === option}
              className={`view-toggle-btn${view === option ? ' active' : ''}`}
              onClick={() => changeView(option)}
            >
              {option === 'terminal' ? '>_ terminal' : 'about.md'}
            </button>
          ))}
        </div>

        <motion.div
          key={view}
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {view === 'terminal' ? (
            <AboutTerminal onExit={() => changeView('read')} />
          ) : (
            <>
              <div className="about-section">
                <h2>Who I am</h2>
                <p><RichText text={whoAmI} /></p>
              </div>

              <div className="about-section">
                <h2>What I do</h2>
                <p><RichText text={whatIDo} /></p>
              </div>

              <div className="about-section">
                <h2>Beyond code</h2>
                <p><RichText text={beyondCode} /></p>
              </div>
            </>
          )}

          <div className="about-social">
            <SocialLinks size="large" showLabels />
          </div>
        </motion.div>

        <motion.div
          className="experience-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="mono">&lt;</span>
            experience
            <span className="mono">/&gt;</span>
          </h2>

          <div className="experience-grid">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="experience-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-period mono">{exp.period}</span>
                </div>
                <div className="exp-company-row">
                  <img src={exp.logo} alt={exp.company} className={`exp-logo${exp.logo.includes('goldman') ? ' exp-logo-sm' : ''}`} />
                  <span className="exp-company">{exp.company}</span>
                </div>
                <p className="exp-description">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
