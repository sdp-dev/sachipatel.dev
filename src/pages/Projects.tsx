import { useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import './Projects.css';

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="projects">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <span className="mono">&lt;</span>
            projects
            <span className="mono">/&gt;</span>
          </h1>
          <p className="projects-subtitle">
            some things i've built
          </p>
        </motion.div>

        <div className="projects-wrapper">
          <button
            className="scroll-btn scroll-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <span className="mono">&lt;</span>
          </button>

          <div className="projects-scroll" ref={scrollRef}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <button
            className="scroll-btn scroll-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <span className="mono">&gt;</span>
          </button>
        </div>

        <motion.div
          className="projects-instruction mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="accent">&lt;-</span> scroll or drag <span className="accent">-&gt;</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
