import { motion } from 'framer-motion';
import { socials } from '../data/socials';
import './SocialLinks.css';

interface SocialLinksProps {
  size?: 'small' | 'large';
  showLabels?: boolean;
}

const SocialLinks = ({ size = 'small', showLabels = false }: SocialLinksProps) => {
  return (
    <div className={`social-links ${size}`}>
      {socials.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          style={{ '--hover-color': social.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="social-icon" />
          {showLabels && <span className="social-label">{social.name}</span>}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
