import { motion } from 'framer-motion';
import TerminalText from '../components/TerminalText';
import InterestCards from '../components/InterestCards';
import SocialLinks from '../components/SocialLinks';
import './Home.css';

const Home = () => {
  const terminalLines = [
    'whoami',
    'sachi - cs student @ barnard/columbia',
    'cat interests.txt',
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-name">
              hey, i'm <span className="highlight-name">sachi</span>
            </h1>
            <p className="hero-subtitle">
              CS student at <span className="highlight">Barnard/Columbia</span>
              <br />
              building things that matter
            </p>

            <div className="hero-cta">
              <SocialLinks size="small" />
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <InterestCards />
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="mono">scroll</span>
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      <section className="home-terminal section">
        <div className="container">
          <TerminalText lines={terminalLines} />
        </div>
      </section>

      <section className="home-skills section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mono">&lt;</span>
            skills
            <span className="mono">/&gt;</span>
          </motion.h2>

          <div className="skills-grid">
            {[
              { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C', 'SQL', 'MATLAB', 'R'] },
              { category: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Flask', 'FastAPI'] },
              { category: 'ML / NLP', items: ['PyTorch', 'scikit-learn', 'Hugging Face', 'LangChain', 'RAG'] },
              { category: 'Cloud / DevOps', items: ['AWS', 'PostgreSQL', 'BigQuery', 'Docker', 'Terraform', 'CI/CD'] },
            ].map((skillGroup, i) => (
              <motion.div
                key={skillGroup.category}
                className="skill-group card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="skill-category">{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
