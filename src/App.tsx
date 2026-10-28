import { useEffect, useState } from 'react';
import ThemeProvider from './components/ThemeProvider';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Contact from './sections/Contact';
import { SECTIONS, scrollToSection, type SectionId } from './sections';
import './styles/global.css';

// Links to the old multi-page routes land on the matching section instead.
const LEGACY_PATHS: Record<string, SectionId | null> = {
  '/about': 'about',
  '/projects': 'projects',
  '/photos': null,
};

const useActiveSection = () => {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const navHeight = document.querySelector('.nav')?.getBoundingClientRect().height ?? 0;
      let current: SectionId | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - navHeight - 8 <= 0) current = id;
      }
      // The last section is too short to reach the top, so count hitting the bottom as being there.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? SECTIONS[SECTIONS.length - 1] : current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
};

function App() {
  const active = useActiveSection();

  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '');
    if (path in LEGACY_PATHS) {
      window.history.replaceState(null, '', '/' + window.location.hash);
      const target = LEGACY_PATHS[path];
      if (target) requestAnimationFrame(() => scrollToSection(target));
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <ParticleBackground />
        <Navbar active={active} />
        <main className="container">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <footer className="site-footer container mono">© {new Date().getFullYear()} sachi patel</footer>
        <StatusBar active={active} />
      </div>
    </ThemeProvider>
  );
}

export default App;
