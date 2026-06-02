import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Photos from './pages/Photos';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <ParticleBackground />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/photos" element={<Photos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
