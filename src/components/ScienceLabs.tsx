import React, { useState } from 'react';
import {
  Atom,
  FlaskConical,
  Dna,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const ScienceLabs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'physics' | 'chemistry' | 'biology'>('physics');

  const labs = [
    {
      id: 'physics' as const,
      name: 'Physics Laboratory',
      icon: Atom,
      title: 'Precision Optics, Mechanics & Electronics',
      desc: 'Students verify laws of mechanics, wave motion, electromagnetic induction, laser optics, and semiconductor physics.',
      equipment: [
        'Digital Oscilloscopes & Signal Generators',
        'Laser & Spectrometer Optics Benches',
        'Wheatstone Bridges & Potentiometers',
        'Data Logger Motion & Acceleration Sensors',
      ],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'chemistry' as const,
      name: 'Chemistry Laboratory',
      icon: FlaskConical,
      title: 'Qualitative Analysis & Organic Synthesis',
      desc: 'Fully ventilated fume hoods, analytical balances, and titrametric stations designed for rigorous chemical research.',
      equipment: [
        'Fume Exhaust Hoods for Volatile Gases',
        'Digital pH Meters & Colorimeters',
        'Centrifuge & Distillation Units',
        'Individual Safety Eyewash & Emergency Showers',
      ],
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'biology' as const,
      name: 'Biology Laboratory',
      icon: Dna,
      title: 'Microbiology, Genetics & Life Sciences',
      desc: 'Equipped with binocular compound microscopes, human anatomical models, preserved specimens, and DNA extraction kits.',
      equipment: [
        'Compound Binocular & Monocular Microscopes',
        'Incubators & Autoclaves for Culture Studies',
        '3D Human & Plant Anatomical Models',
        'Botanical Garden & Hydroponics Study Station',
      ],
      image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const currentLab = labs.find((l) => l.id === activeLab) || labs[0];

  return (
    <section id="science-labs" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Atom className="w-4 h-4 text-emerald-600" />
            <span>Scientific Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            State-of-the-Art Science Laboratories
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Encouraging scientific inquiry, hypothesis testing, and experiential research across Physics, Chemistry, and Biology disciplines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {labs.map((lab) => {
            const Icon = lab.icon;
            const isActive = activeLab === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-500/20 scale-105'
                    : 'bg-white/80 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{lab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Lab Card */}
        <div className="bg-white/75 backdrop-blur-xl rounded-[2.5rem] border border-white p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentLab.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentLab.desc}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                Laboratory Equipment & Features
              </h4>
              <div className="space-y-2">
                {currentLab.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 font-semibold bg-white/90 p-3 rounded-xl border border-slate-100 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-xs text-amber-800 font-medium">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Strict 100% Lab Safety Compliance with certified coats, safety goggles, fire extinguishers, and emergency eyewash stations.</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white shadow-xl group">
              <img
                src={currentLab.image}
                alt={currentLab.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
