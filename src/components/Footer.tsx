import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { SocialButtons } from './SocialButtons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1f4d] text-[#b9c6ee] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={`${SCHOOL_INFO.name} logo`} className="w-14 h-14 object-contain bg-white rounded-full p-1" />
            <div className="leading-tight text-white">
              <div className="font-black tracking-wide">NAGARJUNA PUBLIC SCHOOL</div>
              <div className="text-[11px] font-bold tracking-[0.3em] text-amber-400">KANDUKUR</div>
            </div>
          </div>
          <p>{SCHOOL_INFO.society}</p>
          <p>{SCHOOL_INFO.address}</p>
          <p className="font-semibold text-white">
            <a href={`tel:${SCHOOL_INFO.phoneRaw}`} className="hover:text-amber-300">{SCHOOL_INFO.phone}</a>
            {'  |  '}
            <a href={`tel:${SCHOOL_INFO.phone2Raw}`} className="hover:text-amber-300">{SCHOOL_INFO.phone2}</a>
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Quick links</h4>
          <ul className="space-y-2">
            {[
              ['About', '#about'],
              ['Events', '#events'],
              ['Photo Gallery', '#gallery'],
              ['Admissions', '#admissions'],
              ['Contact', '#contact'],
            ].map(([name, href]) => (
              <li key={name}>
                <a href={href} className="hover:text-white">{name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Follow us</h4>
          <SocialButtons onDark />
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {SCHOOL_INFO.name}, {SCHOOL_INFO.place}. All rights reserved.
      </div>
    </footer>
  );
};
