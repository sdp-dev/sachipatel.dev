import { FaGithub } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import { projects } from '../data/projects';
import './Projects.css';

const stripUrl = (url: string) => url.replace(/^https?:\/\//, '');

const Projects = () => (
  <section id="projects" className="section-block">
    <SectionHeader n="03" title="projects" />
    <div className="project-table">
      <div className="project-head" aria-hidden="true">
        <span>id</span>
        <span>name</span>
        <span>kind</span>
        <span>summary</span>
        <span className="project-year">year</span>
      </div>
      {projects.map((project, i) => (
        <article key={project.id} className="project-row">
          <div className="project-main">
            <span className="project-id mono">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
            </div>
            <span className="project-kind">{project.category}</span>
            <ul className="bullets project-bullets">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <span className="project-year mono">{project.year}</span>
          </div>
          <div className="project-foot">
            <div className="chips">
              {project.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                <FaGithub /> {stripUrl(project.github).replace('github.com/', '')}
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;
