import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { ComputerLab } from './components/ComputerLab';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

/* Modals & Floating Tools */
import { AIChatAssistant } from './components/AIChatAssistant';
import { AdmissionModal } from './components/AdmissionModal';
import { RouteTrackerModal } from './components/RouteTrackerModal';
import { FeePaymentModal } from './components/FeePaymentModal';
import { ProspectusModal } from './components/ProspectusModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';

export const App: React.FC = () => {
  /* State for Modals */
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isRouteTrackerModalOpen, setIsRouteTrackerModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isProspectusModalOpen, setIsProspectusModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Global Frosted Glass Ambient Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 -left-32 w-[500px] h-[500px] bg-sky-400/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Navbar */}
        <Header
          onOpenApplyModal={() => setIsApplyModalOpen(true)}
          onOpenFeeModal={() => setIsFeeModalOpen(true)}
          onOpenRouteTrackerModal={() => setIsRouteTrackerModalOpen(true)}
          onOpenProspectusModal={() => setIsProspectusModalOpen(true)}
          darkMode={false}
          setDarkMode={() => {}}
        />

        <main>
          {/* 1. Hero Banner */}
          <Hero
            onOpenApplyModal={() => setIsApplyModalOpen(true)}
            onOpenProspectusModal={() => setIsProspectusModalOpen(true)}
          />

          {/* 2. School Events, Celebrations & Reports Showcase */}
          <EventsSection />

          {/* 3. About School & Core Mission */}
          <AboutSection />

          {/* 4. Next-Gen Computer Laboratory */}
          <ComputerLab />

          {/* 5. Academic & STEM Hall of Fame */}
          <AchievementsSection />

          {/* 6. Contact & Admissions Campus Office */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onOpenApplyModal={() => setIsApplyModalOpen(true)}
          onOpenProspectusModal={() => setIsProspectusModalOpen(true)}
          onOpenRouteTrackerModal={() => setIsRouteTrackerModalOpen(true)}
        />

        {/* Floating & Interactive Overlay Widgets */}
        <AIChatAssistant />
        <WhatsAppButton />
        <BackToTop />

        {/* Interactive Modals */}
        <AdmissionModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />

        <RouteTrackerModal
          isOpen={isRouteTrackerModalOpen}
          onClose={() => setIsRouteTrackerModalOpen(false)}
        />

        <FeePaymentModal
          isOpen={isFeeModalOpen}
          onClose={() => setIsFeeModalOpen(false)}
        />

        <ProspectusModal
          isOpen={isProspectusModalOpen}
          onClose={() => setIsProspectusModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
