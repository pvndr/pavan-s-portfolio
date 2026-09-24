import { useEffect, useState } from 'react';
import '../styles/BootSequence.css';

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const bootLines = [
      "INITIATING BOOT SEQUENCE...",
      "LOADING KERNEL v9.4.2 [OK]",
      "MOUNTING VIRTUAL FILE SYSTEM [OK]",
      "ESTABLISHING SECURE CONNECTION...",
      "AUTHENTICATING GUEST USER [OK]",
      "LOADING NEURAL ARCHITECTURE...",
      "INITIALIZING UI PROTOCOLS [OK]",
      "SYSTEM READY."
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        // Start fade out after all lines are printed
        setTimeout(() => {
          setIsFadingOut(true);
          // Call onComplete after fade out animation
          setTimeout(onComplete, 800);
        }, 600);
      }
    }, 250); // Speed of new lines appearing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`boot-sequence-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="boot-terminal">
        {lines.map((line, index) => (
          <div key={index} className="boot-line">
            <span className="boot-prompt">&gt;</span> {line}
          </div>
        ))}
        {!isFadingOut && (
          <div className="boot-line">
            <span className="boot-prompt">&gt;</span><span className="cursor-blink">_</span>
          </div>
        )}
      </div>
      
      <div className="boot-progress-bar">
        <div className="boot-progress-fill" style={{ width: `${(lines.length / 8) * 100}%` }}></div>
      </div>
    </div>
  );
}
