import { useRef, useEffect, useState, useCallback } from 'react';
import { playClickSound } from '../../utils/audio';
import { Play, Pause, RotateCcw } from 'lucide-react';
import personaVideo from '../../assets/persona.mp4';

interface VideoPersonaProps {
  videoSrc?: string;
}

export function VideoPersona({ videoSrc = personaVideo }: VideoPersonaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(14.93);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [jumpOffset, setJumpOffset] = useState(0);
  const [activeSectionName, setActiveSectionName] = useState('HERO OVERVIEW');
  const [activeSpeech, setActiveSpeech] = useState(
    'Initial stance // Resting on the ledge observing Bangalore.'
  );

  // Loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur) && dur > 0) {
        setVideoDuration(dur);
      }
      videoRef.current.currentTime = 0;
    }
  };

  // Scroll spy & whole-site video scrub controller
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        );

        // Calculate progress across the entire website (0 to 1)
        const fraction = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        setScrollProgress(fraction);

        // Sticky stage trigger when scrolled past hero
        const heroEl = document.getElementById('hero');
        const heroHeight = heroEl ? heroEl.offsetHeight : 700;
        setIsScrolledPastHero(scrollY > heroHeight * 0.45);

        // Realistic jump-down effect: as scroll starts (first 300px), apply physical downward step & forward scale
        const jumpProgress = Math.min(scrollY / 280, 1);
        setJumpOffset(jumpProgress);

        // Section detector for contextual status & speech
        const workEl = document.getElementById('work');
        const capEl = document.getElementById('capabilities');
        const journeyEl = document.getElementById('journey');
        const resEl = document.getElementById('research');
        const termEl = document.getElementById('terminal');

        const probe = scrollY + window.innerHeight * 0.45;

        if (termEl && probe >= termEl.offsetTop) {
          setActiveSectionName('06 / PROTOCOL READY');
          setActiveSpeech('Terminal dispatch ready — standing upright and open for roles.');
        } else if (resEl && probe >= resEl.offsetTop) {
          setActiveSectionName('05 / RESEARCH AUTHOR');
          setActiveSpeech('Published IJARCCE researcher — exploring machine learning and spatial intelligence.');
        } else if (journeyEl && probe >= journeyEl.offsetTop) {
          setActiveSectionName('04 / ACADEMIC FOUNDATION');
          setActiveSpeech('Engineering trajectory — 8.56 CGPA at KSSEM and verified repository commits.');
        } else if (capEl && probe >= capEl.offsetTop) {
          setActiveSectionName('03 / CORE CAPABILITIES');
          setActiveSpeech('Engaging full-stack layers — React, FastAPI, ChromaDB, and PostgreSQL.');
        } else if (workEl && probe >= workEl.offsetTop) {
          setActiveSectionName('02 / RISING INTO EXECUTION');
          setActiveSpeech('Jumping down from the ledge — inspecting 5 production repositories.');
        } else {
          setActiveSectionName('01 / BASELINE STANCE');
          setActiveSpeech('Sitting on the ledge — scroll down to initiate motion.');
        }

        // Scrub video across the full website scroll height (lasts till the end of the site)
        if (videoRef.current && !isPlaying && videoDuration > 0) {
          const targetTime = fraction * videoDuration;
          if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
            videoRef.current.currentTime = targetTime;
            setCurrentTime(targetTime);
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, videoDuration]);

  // Track time updates during manual playback
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = useCallback(() => {
    playClickSound();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const restartVideo = useCallback(() => {
    playClickSound();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    videoRef.current.play().then(() => setIsPlaying(true));
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Jump motion transform: translates down and scales forward as scroll initiates
  const jumpTransform = {
    transform: !isScrolledPastHero
      ? `translateY(${jumpOffset * 32}px) scale(${1 + jumpOffset * 0.03})`
      : 'none',
  };

  return (
    <>
      {/* 1. Placeholder slot inside Hero section to maintain layout spacing */}
      <div
        className={`inacio-video-persona-wrapper ${
          isScrolledPastHero ? 'is-docked-sticky' : 'is-hero-placed'
        }`}
      >
        <div
          className="inacio-portrait-shell persona-container video-stage-shell"
          style={jumpTransform}
          aria-label="Interactive video persona"
        >
          <div className="inacio-corner-cross tl">+</div>
          <div className="inacio-corner-cross tr">+</div>
          <div className="inacio-corner-cross bl">+</div>
          <div className="inacio-corner-cross br">+</div>

          {/* Top Controls Bar */}
          <div className="persona-nav-bar">
            <div className="persona-video-mode-indicator">
              <span className="inacio-pulse-dot" />
              <span className="persona-nav-title">
                {isPlaying ? 'PLAYING // 60FPS' : `${activeSectionName} // SCROLL SYNC`}
              </span>
            </div>

            <div className="persona-video-actions">
              <button
                onClick={togglePlay}
                className="persona-video-btn"
                title={isPlaying ? 'Pause video' : 'Play video fluidly'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={restartVideo}
                className="persona-video-btn"
                title="Restart from initial thumbnail"
                aria-label="Restart"
              >
                <RotateCcw size={11} />
              </button>
            </div>
          </div>

          {/* Main Video Canvas: Starts as thumbnail at 0s, jumps down and scrubs on scroll */}
          <div
            className="inacio-portrait-canvas-wrapper persona-aspect video-canvas-stage"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              playsInline
              muted
              loop={false}
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              className="persona-video-element"
            />

            {/* Scanline CRT overlay */}
            <div className="inacio-photo-scanline" />

            {/* Status tag */}
            <div className="persona-status-tag">
              <span className="inacio-pulse-dot" />
              <span>{activeSectionName}</span>
            </div>

            {/* Whole-site scrub progress track */}
            <div className="persona-scrub-bar-track" title="Scroll scrub position across website">
              <div
                className="persona-scrub-bar-fill"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>

          {/* Footer Context Bar */}
          <div className="inacio-portrait-footer persona-footer">
            <div className="persona-footer-top">
              <div className="persona-context-speech">
                <span className="speech-quote">&ldquo;</span>
                {activeSpeech}
                <span className="speech-quote">&rdquo;</span>
              </div>
            </div>

            <div className="persona-footer-meta">
              <span className="persona-meta-coords">
                {currentTime.toFixed(1)}s / {videoDuration.toFixed(1)}s ·{' '}
                {(scrollProgress * 100).toFixed(0)}% SITE PROGRESS
              </span>
              <span className="persona-scroll-sync-pill">
                {scrollProgress < 0.05 ? 'SCROLL TO JUMP DOWN ↘' : 'SYNCED TO END ↘'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
