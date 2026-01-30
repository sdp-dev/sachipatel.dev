import { motion } from 'framer-motion';
import './GradientBackground.css';

const GradientBackground = () => {
  return (
    <div className="gradient-bg">
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="gradient-orb orb-2"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="gradient-orb orb-3"
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default GradientBackground;
