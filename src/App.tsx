import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { CampusGalleryModal } from './components/CampusGalleryModal';
import { ConnectSection } from './components/ConnectSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';

export const App: React.FC = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const openApply = () => setIsApplyModalOpen(true);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Header onOpenApplyModal={openApply} />

      <main>
        <Hero onOpenApplyModal={openApply} />
        <AboutSection />
        <EventsSection />
        <LeadershipSection />
        <CampusGalleryModal />
        <ConnectSection />
        <ContactSection />
      </main>

      <Footer />

      <WhatsAppButton />
      <BackToTop />
      <AdmissionModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
    </div>
  );
};

export default App;
