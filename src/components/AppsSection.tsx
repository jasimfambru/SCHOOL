import React from 'react';
import { Smartphone, Users, GraduationCap, Download } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

const apps = [
  {
    Icon: Users,
    name: 'Nagarjuna Public School Parent',
    audience: 'For parents',
    text: 'The official app for parents of Nagarjuna Public School students.',
    url: SCHOOL_INFO.parentApp,
  },
  {
    Icon: GraduationCap,
    name: 'Nagarjuna Public School Staff',
    audience: 'For teachers and staff',
    text: 'The official app for the teachers and staff of Nagarjuna Public School.',
    url: SCHOOL_INFO.staffApp,
  },
];

export const AppsSection: React.FC = () => {
  return (
    <section id="apps" className="py-16 sm:py-20 bg-[#eef3ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <small className="text-[#c8202f] font-extrabold tracking-[0.25em] text-xs">SCHOOL APPS</small>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f1f4d] mt-2">Download our apps</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Get the Nagarjuna Public School app for your phone. Available on Google Play for Android.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {apps.map(({ Icon, name, audience, text, url }) => (
            <div key={name} className="bg-white rounded-3xl p-7 shadow-lg shadow-[#0f1f4d]/5 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0f1f4d] text-white flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest text-[#c8202f] uppercase">{audience}</div>
                  <h3 className="text-lg font-black text-[#0f1f4d] leading-snug">{name}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{text}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-[#0f1f4d] hover:bg-blue-900 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Download on Google Play</span>
                <Smartphone className="w-4 h-4 opacity-70" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
