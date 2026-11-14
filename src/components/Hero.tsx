import React from 'react';
import { Play, ClipboardList, PartyPopper, Images, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeroProps {
  onOpenApplyModal: () => void;
}

const stackImg =
  'object-cover rounded-2xl border-[6px] border-white shadow-2xl shadow-black/40';

export const Hero: React.FC<HeroProps> = ({ onOpenApplyModal }) => {
  const quick = [
    { Icon: ClipboardList, title: 'Admissions', sub: 'Enquire online', action: onOpenApplyModal },
    { Icon: PartyPopper, title: 'Events', sub: 'Latest celebrations', href: '#events' },
    { Icon: Images, title: 'Photo Gallery', sub: 'School moments', href: '#gallery' },
    { Icon: Play, title: 'YouTube', sub: 'Watch our videos', href: SCHOOL_INFO.youtube, external: true },
    { Icon: MapPin, title: 'Visit Us', sub: 'Find the school', href: '#contact' },
  ];

  return (
    <>
      <section id="top" className="relative bg-[#0f1f4d] overflow-hidden">
        <img
          src="/photos/campus/school-building-welcome-back.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f4d]/95 via-[#0f1f4d]/80 to-[#0f1f4d]/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 pb-28 sm:pb-32 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white max-w-xl">
            <span className="inline-block bg-amber-400/15 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-widest mb-5">
              ADMISSIONS OPEN · NURSERY TO CLASS X
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] mb-5">
              Where every child <span className="text-amber-400">learns, grows</span> and shines
            </h1>
            <p className="text-base sm:text-lg text-[#d6def7] leading-relaxed mb-8">
              An English-medium school in Kandukur, recognised by the Govt. of A.P., with caring teachers, an AI-powered English language lab and a joyful school life.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenApplyModal}
                className="bg-amber-400 hover:bg-amber-300 text-[#0f1f4d] font-bold px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                Apply for Admission
              </button>
              <a
                href={SCHOOL_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#0f1f4d] font-bold px-7 py-3 rounded-full transition-all"
              >
                <Play className="w-4 h-4" /> Watch Our School
              </a>
            </div>
          </div>

          {/* Photo stack (large screens) */}
          <div className="relative hidden lg:block h-[440px]">
            <img src="/photos/events/diwali/diwali-decoration-display.webp" alt="Diwali decorations made by students" className={`${stackImg} absolute right-4 top-0 w-[400px] h-[280px] rotate-[2.5deg]`} />
            <img src="/photos/events/food-feast/little-chefs-with-dishes.webp" alt="Students in chef hats at Food Feast" className={`${stackImg} absolute left-0 top-[200px] w-[280px] h-[190px] -rotate-[4deg]`} />
            <img src="/photos/assembly/assembly-pledge-and-exercises.webp" alt="Students taking the pledge at assembly" className={`${stackImg} absolute right-0 top-[290px] w-[230px] h-[160px] rotate-[3deg]`} />
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {quick.map(({ Icon, title, sub, action, href, external }) => {
            const inner = (
              <>
                <Icon className="w-7 h-7 mx-auto mb-2 text-[#c8202f]" />
                <div className="font-bold text-[#0f1f4d] text-sm sm:text-base">{title}</div>
                <div className="text-xs sm:text-sm text-slate-500">{sub}</div>
              </>
            );
            const cls =
              'bg-white rounded-2xl py-5 px-3 text-center shadow-xl shadow-[#0f1f4d]/10 border-b-4 border-amber-400 hover:-translate-y-1 transition-transform';
            return action ? (
              <button key={title} onClick={action} className={cls}>
                {inner}
              </button>
            ) : (
              <a
                key={title}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cls}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};
