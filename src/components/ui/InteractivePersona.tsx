import { usePersonaPose } from '../../hooks/usePersonaPose';
import { ArrowUpRight } from 'lucide-react';

export function InteractivePersona() {
  const { activeIdx, currentPose, selectPose, poses } = usePersonaPose();

  return (
    <div className="inacio-portrait-shell persona-container" aria-label="Interactive persona controller">
      <div className="inacio-corner-cross tl">+</div>
      <div className="inacio-corner-cross tr">+</div>
      <div className="inacio-corner-cross bl">+</div>
      <div className="inacio-corner-cross br">+</div>

      {/* Top Pose Switcher Pills */}
      <div className="persona-nav-bar">
        <span className="persona-nav-title">POSE SYNC //</span>
        <div className="persona-chip-group">
          {poses.map((pose, idx) => (
            <button
              key={pose.id}
              onClick={() => selectPose(idx)}
              className={`persona-chip ${idx === activeIdx ? 'is-active' : ''}`}
              title={`Pose 0${idx + 1}: ${pose.name} (${pose.sectionLabel})`}
              aria-label={`Pose 0${idx + 1}`}
            >
              <span className="chip-dot" />
              <span>0{idx + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Frame with Cross-fade Layers */}
      <div className="inacio-portrait-canvas-wrapper persona-aspect">
        {poses.map((pose, idx) => (
          <img
            key={pose.id}
            src={pose.image}
            alt={`Pavan D R — ${pose.name}`}
            className={`persona-frame-img ${idx === activeIdx ? 'is-visible' : ''}`}
            loading="eager"
          />
        ))}

        {/* Scanline & Telemetry Tag */}
        <div className="inacio-photo-scanline" />
        <div className="persona-status-tag">
          <span className="inacio-pulse-dot" />
          <span>{currentPose.status}</span>
        </div>
      </div>

      {/* Footer Context Bar */}
      <div className="inacio-portrait-footer persona-footer">
        <div className="persona-footer-top">
          <div className="persona-context-speech">
            <span className="speech-quote">&ldquo;</span>
            {currentPose.speech}
            <span className="speech-quote">&rdquo;</span>
          </div>
        </div>

        <div className="persona-footer-meta">
          <span className="persona-meta-coords">12.9716° N, 77.5946° E · BLR</span>
          <button
            onClick={() => selectPose(activeIdx, true)}
            className="persona-jump-btn"
            title={`Scroll to ${currentPose.sectionLabel}`}
          >
            <span>Jump to {currentPose.sectionLabel}</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
