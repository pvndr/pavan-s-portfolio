import { useRef, useEffect, useState, useCallback } from 'react';
import { playClickSound } from '../../utils/audio';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import personaVideo from '../../assets/persona.mp4';

const SECTION_DESCRIPTIONS: Record<string, { tag: string; speech: string }> = {
  hero: {
    tag: '01 / OVERVIEW',
    speech: 'Bengaluru, IN · AI Software Engineer & Full Stack Developer.',
  },
  work: {
    tag: '02 / ARCHITECTURES',
    speech: '5 production repositories · RAG pipelines & vector databases.',
  },
  capabilities: {
    tag: '03 / CAPABILITIES',
    speech: 'Full-stack engineering · React, FastAPI, ChromaDB, and PostgreSQL.',
  },
  inspector: {
    tag: '04 / TELEMETRY',
    speech: 'Real-time client telemetry · DOM audit & sub-second performance.',
  },
  journey: {
    tag: '05 / TRAJECTORY',
    speech: 'Computer Science · 8.56 CGPA at KSSEM & Git milestones.',
  },
  research: {
    tag: '06 / PUBLICATIONS',
    speech: 'Peer-reviewed IJARCCE paper · DOI: 10.17148/IJARCCE.2026.155194.',
  },
  terminal: {
    tag: '07 / DISPATCH',
    speech: 'Terminal protocol active · Available for software engineering roles.',
  },
};

export function PersistentVideoStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Detect which section on the left is currently in view (without touching video currentTime)
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'capabilities', 'inspector', 'journey', 'research', 'terminal'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure video autoplays smoothly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted until user interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
    playClickSound();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    playClickSound();
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
  }, []);

  const restartVideo = useCallback(() => {
    playClickSound();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  }, []);

  const currentInfo = SECTION_DESCRIPTIONS[activeSection] || SECTION_DESCRIPTIONS.hero;

  return (
    <div className="inacio-sticky-video-container" aria-label="Persistent Video Persona">
      <div className="inacio-portrait-shell inacio-split-video-card">
        <div className="inacio-corner-cross tl">+</div>
        <div className="inacio-corner-cross tr">+</div>
        <div className="inacio-corner-cross bl">+</div>
        <div className="inacio-corner-cross br">+</div>

        {/* Top Controls Header */}
        <div className="persona-nav-bar">
          <div className="persona-video-mode-indicator">
            <span className="inacio-pulse-dot" />
            <span className="persona-nav-title">
              {currentInfo.tag} // LIVE
            </span>
          </div>

          <div className="persona-video-actions">
            <button
              onClick={togglePlay}
              className="persona-video-btn"
              title={isPlaying ? 'Pause video' : 'Play video'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button
              onClick={toggleMute}
              className="persona-video-btn"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>

            <button
              onClick={restartVideo}
              className="persona-video-btn"
              title="Replay video from beginning"
              aria-label="Restart"
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>

        {/* Smooth Persistent Native 60FPS Video */}
        <div className="inacio-portrait-canvas-wrapper inacio-split-canvas" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={personaVideo}
            playsInline
            muted={isMuted}
            autoPlay
            loop
            preload="auto"
            className="inacio-persistent-video-el"
          />

          {/* CRT scanline overlay */}
          <div className="inacio-photo-scanline" />

          {/* Status badge */}
          <div className="persona-status-tag">
            <span className="inacio-pulse-dot" />
            <span>PAVAN D R // {currentInfo.tag}</span>
          </div>
        </div>

        {/* Footer Context Bar */}
        <div className="inacio-portrait-footer persona-footer">
          <div className="persona-footer-top">
            <div className="persona-context-speech">
              <span className="speech-quote">&ldquo;</span>
              {currentInfo.speech}
              <span className="speech-quote">&rdquo;</span>
            </div>
          </div>

          <div className="persona-footer-meta">
            <span className="persona-meta-coords">12.9716° N, 77.5946° E · BLR</span>
            <span className="persona-scroll-sync-pill">PERSISTENT STREAM // 60 FPS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
