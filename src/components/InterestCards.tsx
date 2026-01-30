import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeadphones, FaCoffee, FaDog, FaUtensils } from 'react-icons/fa';
import './InterestCards.css';

interface Interest {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  detail: string;
  color: string;
}

const interests: Interest[] = [
  {
    icon: FaHeadphones,
    title: 'dj',
    detail: 'part-time dj, curating vibes & beats',
    color: '#6b8cae',
  },
  {
    icon: FaCoffee,
    title: 'caffeine',
    detail: 'coffee & matcha enthusiast',
    color: '#7dab8f',
  },
  {
    icon: FaDog,
    title: 'corgis',
    detail: 'certified corgi lover',
    color: '#c9a0b8',
  },
  {
    icon: FaUtensils,
    title: 'foodie',
    detail: 'avid beli user, always hunting new spots',
    color: '#d4c094',
  },
];

const InterestCards = () => {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="interest-cards">
      <p className="interest-label mono">click to explore</p>
      <div className="cards-grid">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.title}
            className={`interest-card ${flipped === index ? 'flipped' : ''}`}
            onClick={() => setFlipped(flipped === index ? null : index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{ '--card-color': interest.color } as React.CSSProperties}
          >
            <div className="card-inner">
              <div className="card-front">
                <interest.icon className="card-icon" />
                <span className="card-title mono">{interest.title}</span>
              </div>
              <div className="card-back">
                <span className="card-detail">{interest.detail}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InterestCards;
