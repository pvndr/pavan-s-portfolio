import { useState } from 'react';
import { usePersonaPose } from '../../hooks/usePersonaPose';
import { playClickSound } from '../../utils/audio';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import personaVideo from '../../assets/persona.mp4';

export function FloatingPersonaCompanion() {
  const { activeIdx, currentPose, selectPose, poses, isPastHero } = usePersonaPose();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Only render when scrolled past the hero section so it doesn't duplicate the hero frame
  if (!isPastHero) {
    return null;
  }

  const toggleCollapse = () => {
    playClickSound();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className="inacio-persona-companion-root" aria-label="Interactive persona companion">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            onClick={toggleCollapse}
            className="persona-companion-pill"
            title="Expand Persona Companion"
          >
            <span className="inacio-pulse-dot" />
            <video
              src={personaVideo}
              muted
              playsInline
              autoPlay
              loop
              className="persona-companion-pill-thumb"
            />
            <span className="persona-companion-pill-text">
              0{activeIdx + 1} // {currentPose.status}
            </span>
            <ChevronUp size={13} />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="persona-companion-card"
          >
            <div className="inacio-corner-cross tl">+</div>
            <div className="inacio-corner-cross tr">+</div>
            <div className="inacio-corner-cross bl">+</div>
            <div className="inacio-corner-cross br">+</div>

            {/* Header bar */}
            <div className="persona-companion-header">
              <div className="persona-companion-title">
                <span className="inacio-pulse-dot" />
                <span>PERSONA VIDEO // 0{activeIdx + 1}</span>
              </div>
              <div className="persona-companion-controls">
                <button
                  onClick={toggleCollapse}
                  className="companion-ctrl-btn"
                  title="Minimize companion"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Main Stage: Portrait + Dialog */}
            <div className="persona-companion-body">
              <div className="persona-companion-portrait">
                <video
                  src={personaVideo}
                  muted
                  playsInline
                  autoPlay
                  loop
                  className="persona-companion-img is-visible"
                />
                <div className="inacio-photo-scanline" />
              </div>

              <div className="persona-companion-dialog">
                <div className="companion-status-line">{currentPose.status}</div>
                <div className="companion-speech-text">
                  &ldquo;{currentPose.speech}&rdquo;
                </div>
                <button
                  onClick={() => selectPose(activeIdx, true)}
                  className="companion-anchor-btn"
                >
                  <span>{currentPose.sectionLabel}</span>
                  <ArrowUpRight size={11} />
                </button>
              </div>
            </div>

            {/* Pose switcher pills */}
            <div className="persona-companion-footer">
              <div className="persona-chip-group">
                {poses.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => selectPose(idx, true)}
                    className={`persona-chip ${idx === activeIdx ? 'is-active' : ''}`}
                    title={`Switch to Pose 0${idx + 1}: ${p.name}`}
                  >
                    <span className="chip-dot" />
                    <span>0{idx + 1}</span>
                  </button>
                ))}
              </div>
              <span className="companion-sync-label">SYNC MOTION</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
