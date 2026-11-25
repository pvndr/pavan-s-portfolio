import { useState, useEffect, useCallback } from 'react';
import { playClickSound } from '../utils/audio';
import pose1 from '../assets/poses/pose-1-balcony.jpg';
import pose2 from '../assets/poses/pose-2-standing.jpg';
import pose3 from '../assets/poses/pose-3-glass.jpg';
import pose4 from '../assets/poses/pose-4-front.jpg';

export interface PersonaPose {
  id: string;
  name: string;
  tag: string;
  image: string;
  status: string;
  speech: string;
  targetSection: string;
  sectionLabel: string;
}

export const PERSONA_POSES: PersonaPose[] = [
  {
    id: 'pose-1',
    name: 'Horizon View',
    tag: '01 / CONTEMPLATE',
    image: pose1,
    status: 'OBSERVING THE HORIZON',
    speech: 'Leaning on the balcony ledge, observing the Bangalore skyline and architecting systems.',
    targetSection: 'hero',
    sectionLabel: 'Hero Overview',
  },
  {
    id: 'pose-2',
    name: 'Standing Up',
    tag: '02 / STAND & BUILD',
    image: pose2,
    status: 'RISING INTO EXECUTION',
    speech: 'Stepping forward from the ledge to examine 5 production repositories and architectures.',
    targetSection: 'work',
    sectionLabel: 'Featured Works',
  },
  {
    id: 'pose-3',
    name: 'Engaged Stance',
    tag: '03 / COLLABORATE',
    image: pose3,
    status: 'ENGAGING WITH ARCHITECTURE',
    speech: 'Deep-diving into full-stack layers: React, FastAPI, ChromaDB, and 8.56 CGPA foundation.',
    targetSection: 'capabilities',
    sectionLabel: 'Capabilities & Journey',
  },
  {
    id: 'pose-4',
    name: 'Direct Frontal',
    tag: '04 / DIRECT CONNECT',
    image: pose4,
    status: 'READY FOR PROTOCOL',
    speech: 'Standing front-and-center, published IJARCCE author, open for AI engineering roles.',
    targetSection: 'terminal',
    sectionLabel: 'Terminal Dispatch',
  },
];

export function usePersonaPose() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);

  // Preload images
  useEffect(() => {
    PERSONA_POSES.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      setIsPastHero(scrollY > 280);

      const workEl = document.getElementById('work');
      const capEl = document.getElementById('capabilities') || document.getElementById('journey');
      const termEl = document.getElementById('terminal') || document.getElementById('research');

      const probe = scrollY + windowHeight * 0.45;

      if (termEl && probe >= termEl.offsetTop) {
        setActiveIdx(3);
      } else if (capEl && probe >= capEl.offsetTop) {
        setActiveIdx(2);
      } else if (workEl && probe >= workEl.offsetTop) {
        setActiveIdx(1);
      } else {
        setActiveIdx(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectPose = useCallback((idx: number, jumpToSection = false) => {
    playClickSound();
    setActiveIdx(idx);

    if (jumpToSection) {
      const targetId = PERSONA_POSES[idx].targetSection;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return {
    activeIdx,
    currentPose: PERSONA_POSES[activeIdx],
    selectPose,
    poses: PERSONA_POSES,
    isPastHero,
  };
}
