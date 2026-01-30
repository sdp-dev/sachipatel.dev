import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSpotify } from 'react-icons/fa';
import './SocialLinks.css';

interface SocialLinksProps {
  size?: 'small' | 'large';
  showLabels?: boolean;
}

const socials = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/sdp-dev',
    color: '#6b8cae',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/sachipatell/',
    color: '#4a6a8a',
  },
  {
    name: 'Spotify',
    icon: FaSpotify,
    url: 'https://open.spotify.com/user/sachi16?si=84cf8590c42a45ec',
    color: '#7dab8f',
  },
];

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
