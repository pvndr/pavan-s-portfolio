import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { InacioNavbar } from './components/layout/InacioNavbar';
import { InacioHeroSection } from './components/sections/InacioHeroSection';
import { InacioWorkSection } from './components/sections/InacioWorkSection';
import { InacioBentoSection } from './components/sections/InacioBentoSection';
import { InacioInspectorSection } from './components/sections/InacioInspectorSection';
import { InacioJourneySection } from './components/sections/InacioJourneySection';
import { InacioResearchSection } from './components/sections/InacioResearchSection';
import { TerminalSection } from './components/sections/TerminalSection';
import { InacioDock } from './components/ui/InacioDock';
import { InacioCursor } from './components/ui/InacioCursor';
import { FineGrainParticles } from './components/canvas/FineGrainParticles';
import { DocumentModal, type DocumentModalData } from './components/ui/DocumentModal';
import { PersistentVideoStage } from './components/ui/PersistentVideoStage';
import './styles/inacio-design.css';

export default function App() {
  const [activeDocument, setActiveDocument] = useState<DocumentModalData | null>(null);

  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="inacio-root-app">
      {/* 1. Custom Blend-Mode Magnetic Cursor */}
      <InacioCursor />

      {/* 2. Fine Grain-Like Particles (Inácio Nakiti reference) */}
      <FineGrainParticles />

      {/* 3. Film Grain Texture & Subtle Blueprint Grid */}
      <div className="inacio-grain-overlay" aria-hidden="true" />
      <div className="inacio-grid-bg" aria-hidden="true" />
      <div className="inacio-ambient-glow" aria-hidden="true" />

      {/* 4. Top Architectural Navigation Bar */}
      <InacioNavbar />

      {/* 5. Main Site Flow: Split Contents (Left) & Persistent Smooth Video Stage (Right) */}
      <main id="main-content" className="inacio-split-layout">
        <div className="inacio-split-left-content">
          <InacioHeroSection onOpenDocument={setActiveDocument} />
          <InacioWorkSection onOpenDocument={setActiveDocument} />
          <InacioBentoSection />
          <InacioInspectorSection />
          <InacioJourneySection />
          <InacioResearchSection onOpenDocument={setActiveDocument} />
          <TerminalSection />
        </div>

        <aside className="inacio-split-right-stage" aria-label="Persistent Video Persona">
          <PersistentVideoStage />
        </aside>
      </main>

      {/* 6. Inácio's Signature Floating Bottom Dock */}
      <InacioDock />

      {/* 7. Document & Research Preview Modal */}
      <DocumentModal
        document={activeDocument}
        onClose={() => setActiveDocument(null)}
      />
    </div>
  );
}
