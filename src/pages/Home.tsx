import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import './Home.css';

const skillGroups = [
  { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C', 'SQL', 'MATLAB', 'R'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'Flask', 'FastAPI'] },
  { category: 'ML / NLP', items: ['PyTorch', 'scikit-learn', 'Hugging Face', 'LangChain', 'RAG'] },
  { category: 'Cloud / DevOps', items: ['AWS', 'PostgreSQL', 'BigQuery', 'Docker', 'Terraform', 'CI/CD'] },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-name">
                hey, i'm <span className="highlight-name">sachi</span>!
              </h1>
              <p className="hero-subtitle">
                cs & econ @ <span className="highlight">barnard</span>, columbia
              </p>
              <p className="hero-tagline">
                building cool stuff that matters!
              </p>
            </motion.div>

            <motion.div
              className="hero-skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {skillGroups.map((group) => (
                <div key={group.category} className="skill-row">
                  <span className="skill-label mono">{group.category}</span>
                  <div className="skill-tags">
                    {group.items.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hero-image">
              <img src="/images/profile.jpg" alt="Sachi" />
            </div>
            <div className="hero-social">
              <SocialLinks size="small" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
