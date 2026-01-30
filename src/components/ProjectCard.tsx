import { motion } from 'framer-motion';
import './ProjectCard.css';

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="project-header">
        <span className="project-category tag tag-blue">{project.category}</span>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <ul className="project-bullets">
        {project.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      <div className="project-technologies">
        {project.technologies.map((tech, i) => (
          <span key={i} className="tag">{tech}</span>
        ))}
      </div>

      <div className="project-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
            View Code
          </a>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link primary">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
