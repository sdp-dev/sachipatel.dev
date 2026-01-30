import { useRef } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '../components/ProjectCard';
import './Projects.css';

const projects: Project[] = [
  {
    id: 1,
    name: 'LLM Factuality Evaluation',
    description: 'Benchmarking factual consistency of open-source LLMs on medical literature summarization.',
    category: 'ML / NLP',
    bullets: [
      'Built QAGS-style pipeline evaluating LLaMA-8B, Mistral-7B, DeepSeek-7B across 250 CORD-19 papers',
      'Engineered automated question generation (FLAN-T5) + extractive QA (RoBERTa) with F1/BERTScore metrics',
      'Optimized inference for 8K-token documents; findings on weak factual grounding (<0.50 F1) published',
    ],
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'BERTScore', 'FLAN-T5'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 2,
    name: 'Restaurant Reservation System',
    description: 'Full-stack booking platform with real-time availability and secure authentication.',
    category: 'Full Stack',
    bullets: [
      'Architected Flask + React app with JWT auth, real-time reservations, and normalized PostgreSQL schema',
      'Achieved 85% test coverage with 40+ pytest unit tests across API endpoints',
      'Containerized with Docker and deployed on AWS EC2 via GitHub Actions CI/CD pipeline',
    ],
    technologies: ['Flask', 'React', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions'],
    github: 'https://github.com/sdp-dev',
  },
  {
    id: 3,
    name: 'HTTP Web Server',
    description: 'Low-level HTTP server implementation handling concurrent requests and static file serving.',
    category: 'Systems',
    bullets: [
      'Implemented HTTP/1.1 server in C using POSIX socket programming for GET request handling',
      'Built custom request parser with URI validation, MIME type detection, and error handling',
      'Integrated dynamic file routing for serving static HTML, CSS, and image assets',
    ],
    technologies: ['C', 'Socket Programming', 'HTTP', 'POSIX'],
    github: 'https://github.com/sdp-dev',
  },
];

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
            a selection of things i've built
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
