import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TypedCode.css';

interface CodeLine {
  content: string;
  type: 'keyword' | 'string' | 'function' | 'variable' | 'comment' | 'bracket' | 'operator' | 'normal';
}

interface TypedCodeProps {
  code: CodeLine[][];
  typingSpeed?: number;
}

const TypedCode = ({ code, typingSpeed = 30 }: TypedCodeProps) => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < code.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, typingSpeed * 20);

      return () => clearTimeout(timer);
    }
  }, [visibleLines, code.length, typingSpeed]);

  const getTokenClass = (type: CodeLine['type']) => {
    const classes: Record<string, string> = {
      keyword: 'code-keyword',
      string: 'code-string',
      function: 'code-function',
      variable: 'code-variable',
      comment: 'code-comment',
      bracket: 'code-bracket',
      operator: 'code-operator',
      normal: '',
    };
    return classes[type] || '';
  };

  return (
    <motion.div
      className="code-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="code-header">
        <span className="code-filename mono">sachi.tsx</span>
      </div>
      <pre className="code-content mono">
        {code.slice(0, visibleLines).map((line, lineIndex) => (
          <div key={lineIndex} className="code-line">
            <span className="line-number">{lineIndex + 1}</span>
            <span className="line-content">
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} className={getTokenClass(token.type)}>
                  {token.content}
                </span>
              ))}
            </span>
          </div>
        ))}
        {visibleLines < code.length && (
          <div className="code-line">
            <span className="line-number">{visibleLines + 1}</span>
            <span className="line-content">
              <span className="typing-cursor">|</span>
            </span>
          </div>
        )}
      </pre>
    </motion.div>
  );
};

export default TypedCode;
