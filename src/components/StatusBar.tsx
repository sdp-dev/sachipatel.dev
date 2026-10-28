import { useEffect, useState } from 'react';
import type { SectionId } from '../sections';
import './StatusBar.css';

const StatusBar = ({ active }: { active: SectionId | null }) => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar">
      <span className="status-logo mono">
        <span className="accent">&lt;</span>sdp<span className="accent">/&gt;</span>
      </span>
      <span className="status-section">
        <span className="status-dot" aria-hidden="true" />
        {active ? active[0].toUpperCase() + active.slice(1) : 'Home'}
      </span>
      <span className="status-time">
        <span className="status-hide-sm">New York · </span>
        <span className="mono">
          {time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'America/New_York',
          })}
        </span>
      </span>
    </div>
  );
};

export default StatusBar;
