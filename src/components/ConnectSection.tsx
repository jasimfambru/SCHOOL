import React from 'react';
import { Play } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { SocialButtons } from './SocialButtons';

export const ConnectSection: React.FC = () => {
  return (
    <section id="follow" className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#c8202f] to-[#8f1320] text-white rounded-3xl px-6 sm:px-12 py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black">See our school on YouTube</h2>
          <p className="text-[#ffd9dc] mt-2">Events, performances and school life. Follow us on all our pages.</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          <a
            href={SCHOOL_INFO.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0f1f4d] font-bold px-7 py-3 rounded-full shadow-lg transition-all"
          >
            <Play className="w-4 h-4" /> Visit Our Channel
          </a>
          <SocialButtons onDark />
        </div>
      </div>
    </section>
  );
};
