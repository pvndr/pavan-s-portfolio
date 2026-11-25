import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ArrowDownRight, FileText } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

interface InacioHeroSectionProps {
  onOpenDocument?: (doc: { title: string; url: string; type: 'pdf' | 'image' }) => void;
}

export function InacioHeroSection({ onOpenDocument }: InacioHeroSectionProps) {
  const scrollTo = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="inacio-hero-section">
      <div className="inacio-hero-layout">
        {/* Left Column: Technical Narrative & Positioning */}
        <div className="inacio-hero-left">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inacio-kicker-bar"
          >
            <span className="inacio-pulse-dot" />
            <span>AVAILABLE FOR ROLES · BENGALURU, IN · UTC+5:30</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inacio-hero-title"
          >
            Engineering fast, polished software &amp; the <em>intelligent systems</em> behind it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inacio-hero-desc"
          >
            I am <strong style={{ color: 'var(--inacio-fg)' }}>{profile.name}</strong>, a Computer Science student (8.56 CGPA) and software developer in Bengaluru. I design retrieval augmented generation pipelines, PostgreSQL backed applications, and interactive web tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inacio-hero-actions"
          >
            <button onClick={() => scrollTo('work')} className="inacio-btn-primary">
              <span>Inspect case studies</span>
              <ArrowDownRight size={16} />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenDocument?.({
                  title: 'Pavan D R — Resume',
                  url: profile.links.resume,
                  type: 'pdf',
                });
              }}
              className="inacio-btn-secondary"
            >
              <FileText size={15} />
              <span>Review resume</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inacio-hero-meta-row"
          >
            <div className="inacio-meta-stat">
              <span className="inacio-stat-val">8.56</span>
              <span>B.E. CGPA</span>
            </div>
            <div>/</div>
            <div className="inacio-meta-stat">
              <span className="inacio-stat-val">IJARCCE</span>
              <span>Published Research</span>
            </div>
            <div>/</div>
            <div className="inacio-meta-stat">
              <span className="inacio-stat-val">5+</span>
              <span>Engineered Systems</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visible on mobile/tablets where right persistent stage stacks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inacio-hero-right inacio-hero-mobile-only"
        >
          <div className="inacio-portrait-shell">
            <div className="inacio-corner-cross tl">+</div>
            <div className="inacio-corner-cross tr">+</div>
            <div className="inacio-corner-cross bl">+</div>
            <div className="inacio-corner-cross br">+</div>

            <div className="inacio-portrait-canvas-wrapper persona-aspect">
              <video
                src="/persona.mp4"
                playsInline
                muted
                autoPlay
                loop
                className="inacio-persistent-video-el"
              />
              <div className="inacio-photo-scanline" />
            </div>

            <div className="inacio-portrait-footer">
              <span>SYSTEM.ID: PDR_01</span>
              <span>12.9716° N, 77.5946° E</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
