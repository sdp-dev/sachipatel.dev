import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import './About.css';

const experiences = [
  {
    role: 'Software Engineering Intern',
    company: 'DTCC',
    period: 'Jun 2025 – Aug 2025',
    description: 'Built internal automation detecting idle EC2/EBS volumes across 25+ SYSIDs, driving $350K in cost savings. Developed MVP cost-savings dashboard integrating CloudAware and AWS Cost Explorer data.',
  },
  {
    role: 'Research Assistant',
    company: 'Rajiv Sethi Lab, Barnard',
    period: 'Jan 2024 – Present',
    description: 'Scraped Polymarket probabilities across 41 electoral events. Implemented trading strategy simulations comparing forecasting models vs. market accuracy. Co-authored paper published in ACM CI \'25.',
  },
  {
    role: 'Research Assistant',
    company: 'Martina Jasova Lab, Barnard',
    period: 'Jul 2024 – Dec 2024',
    description: 'Built text extraction pipeline parsing 12K+ pages of bank reports. Integrated GPT-4o mini for ESG sentiment classification with batched inference and exponential backoff.',
  },
  {
    role: 'Research Assistant',
    company: 'Spoken Language Processing, Columbia',
    period: 'May 2024 – Aug 2024',
    description: 'Automated extraction of 12 acoustic-prosodic features from 200+ audio files. Trained SVM and logistic regression classifiers to detect empathetic speech patterns.',
  },
];

const About = () => {
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
            about me
            <span className="mono">/&gt;</span>
          </h1>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-section">
            <h2>who i am</h2>
            <p>
              i'm <span className="highlight">Sachi</span>, a CS & Economics student at{' '}
              <span className="highlight">Barnard College of Columbia University</span>.
              i build full-stack applications, work on ML/NLP research, and care about
              writing clean, efficient code (and documentation!) that solves real problems.
            </p>
          </div>

          <div className="about-section">
            <h2>what i do</h2>
            <p>
              my work spans software engineering, machine learning, and data pipelines.
              i've built cost-optimization tools at DTCC, published research on prediction
              markets, developed NLP pipelines for ESG analysis, and trained classifiers
              for speech processing. i also mentor 120+ students as a Senior Computing Fellow 
              and work part-time as a high school debate coach.
            </p>
          </div>

          <div className="about-section">
            <h2>beyond code</h2>
            <p>
              when i'm not coding, i'm probably djing, curating spotify playlists, hunting for
              new coffee/matcha spots, scrolling on beli for restaurant recs, or looking at
              pictures of corgis.
            </p>
          </div>

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
                <p className="exp-company">{exp.company}</p>
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
