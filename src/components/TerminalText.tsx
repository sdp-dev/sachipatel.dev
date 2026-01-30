import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TerminalText.css';

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  startDelay?: number;
}

const TerminalText = ({ lines, typingSpeed = 50, startDelay = 500 }: TerminalTextProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isTyping || currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = '';
          }
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentLineIndex, currentCharIndex, lines, typingSpeed]);

  return (
    <motion.div
      className="terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn red"></span>
          <span className="terminal-btn yellow"></span>
          <span className="terminal-btn green"></span>
        </div>
        <span className="terminal-title mono">~/sachi</span>
      </div>
      <div className="terminal-body mono">
        {displayedLines.map((line, index) => (
          <div key={index} className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span className="terminal-text">{line}</span>
            {index === currentLineIndex && currentCharIndex < lines[currentLineIndex]?.length && (
              <span className="terminal-cursor">|</span>
            )}
          </div>
        ))}
        {currentLineIndex < lines.length && displayedLines.length <= currentLineIndex && (
          <div className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span className="terminal-cursor">|</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TerminalText;
