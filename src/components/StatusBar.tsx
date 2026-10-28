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
    <div className="status-bar mono">
      <span>-- NORMAL --</span>
      <span className="status-middle">
        <span className="status-hide-sm">sachipatel.dev</span>
        <span className="status-path">~/{active ?? ''}</span>
        <span className="status-hide-sm">utf-8</span>
      </span>
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
    </div>
  );
};

export default StatusBar;
