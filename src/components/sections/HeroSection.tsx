import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { ThreeHeroScene } from '../canvas/ThreeHeroScene';
import { InteractivePortrait } from '../canvas/InteractivePortrait';
import { ArrowDownRight, FileText } from 'lucide-react';

interface HeroSectionProps {
  onOpenDocument?: (doc: { title: string; url: string; type: 'pdf' | 'image' }) => void;
}

export function HeroSection({ onOpenDocument }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-spatial-section">
      {/* 3D Three.js Background Neural Scene */}
      <ThreeHeroScene />

      <div className="hero-content-wrapper">
        <div className="hero-layout-grid">
          {/* Left Column: Typography & Engineering Positioning */}
          <div className="hero-text-column">
            {/* Live Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hero-status-pill"
            >
              <span className="live-pulsar" />
              <span className="status-label">{profile.availability.label}</span>
            </motion.div>

            {/* Editorial Title Capped at 680px per B5 */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hero-massive-headline"
              style={{ textWrap: 'balance' }}
            >
              <span className="headline-row">Building software with machine learning,</span>
              <span className="headline-gradient">vector search, and clean architecture.</span>
            </motion.h1>

            {/* Bio & Concrete Facts per B8 */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hero-lead-paragraph"
              style={{ textWrap: 'pretty' }}
            >
              I am <strong className="text-white">{profile.name}</strong>, a Computer Science student (8.56 CGPA) and software developer in Bengaluru. I design retrieval augmented generation pipelines, PostgreSQL backed applications, and interactive web tools.
            </motion.p>

            {/* Clear Primary Action & Secondary Action per A4 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hero-cta-row"
            >
              <button
                onClick={() => scrollTo('work')}
                className="hero-primary-btn"
              >
                <span>Inspect case studies</span>
                <ArrowDownRight size={17} />
              </button>

              <button
                onClick={() => {
                  onOpenDocument?.({
                    title: 'Pavan D R — Resume',
                    url: profile.links.resume,
                    type: 'pdf',
                  });
                }}
                className="hero-secondary-btn"
              >
                <FileText size={16} />
                <span>Review resume</span>
              </button>
            </motion.div>

            {/* Proof Signal per A2 / B8 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hero-proof-strip"
            >
              <div className="proof-metric-item">
                <span className="proof-val">8.56</span>
                <span className="proof-lbl">B.E. CGPA</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-metric-item">
                <span className="proof-val">IJARCCE</span>
                <span className="proof-lbl">Published research</span>
              </div>
              <div className="proof-divider" />
              <div className="proof-metric-item">
                <span className="proof-val">5+</span>
                <span className="proof-lbl">Engineered repos</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: WebGL Interactive Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-portrait-column"
          >
            <InteractivePortrait
              imageSrc="/hero.png"
              name={profile.name}
              role={profile.role}
              status="AVAILABLE · BENGALURU"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
