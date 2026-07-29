import React from 'react';
import { PhoneCall } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Hello%20Nagarjuna%20School,%20I%20am%20interested%20in%20admissions%20for%20Session%202026-27.`}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl shadow-emerald-500/20 flex items-center gap-2 font-bold text-xs hover:scale-105 transition-all backdrop-blur-md border border-white/40"
    >
      <PhoneCall className="w-5 h-5 text-white" />
      <span className="hidden sm:inline">WhatsApp Helpdesk</span>
    </a>
  );
};
