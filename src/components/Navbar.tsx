import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../theme';
import { SECTIONS, scrollToSection, type SectionId } from '../sections';
import './Navbar.css';

const Navbar = ({ active }: { active: SectionId | null }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav">
      <a
        href="#"
        className="nav-brand"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(null);
        }}
      >
        <span className="mono">
          <span className="accent">&lt;</span>sdp<span className="accent">/&gt;</span>
        </span>
      </a>

      <div className="nav-links">
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : undefined}
            aria-current={active === id ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
            }}
          >
            {id[0].toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
          Resume
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
