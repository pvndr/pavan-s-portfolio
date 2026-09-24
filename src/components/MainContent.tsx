import { useState } from 'react';
import { DocumentModal } from './DocumentModal';
import { ContactModal } from './ContactModal';

import { HeroSection } from './sections/HeroSection';
import { CaseStudiesSection } from './sections/CaseStudiesSection';
import { CapabilitySection } from './sections/CapabilitySection';
import { TimelineSection } from './sections/TimelineSection';
import { JournalSection } from './sections/JournalSection';
import { TerminalSection } from './sections/TerminalSection';

export function MainContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    documentUrl: '',
    type: 'image' as 'image' | 'pdf',
    details: [] as { label: string, value: string }[]
  });

  const openModal = (title: string, documentUrl: string, type: 'image' | 'pdf', details: { label: string, value: string }[] = []) => {
    setModalState({ isOpen: true, title, documentUrl, type, details });
  };

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main id="app-container" className="cinematic-flow">
        <HeroSection scrollToSection={scrollToSection} />
        <CaseStudiesSection />
        <CapabilitySection />
        <TimelineSection />
        <JournalSection openModal={openModal} />
        <TerminalSection setIsContactModalOpen={setIsContactModalOpen} openModal={openModal} />
      </main>

      <DocumentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        documentUrl={modalState.documentUrl}
        type={modalState.type}
        details={modalState.details}
      />

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
