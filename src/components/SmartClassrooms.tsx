import React from 'react';
import {
  Monitor,
  Video,
  Volume2,
  Sparkles,
  Layers,
  CheckCircle2,
  Tv,
} from 'lucide-react';

export const SmartClassrooms: React.FC = () => {
  const highlights = [
    {
      title: '4K Interactive Flat Panels',
      desc: '75-inch touch interactive displays with multi-user writing, digital annotation, and screen mirroring.',
      icon: Tv,
    },
    {
      title: '3D Multimedia Learning',
      desc: 'Immersive animations and 3D simulations for complex concepts in Biology, Physics, Geometry, and History.',
      icon: Sparkles,
    },
    {
      title: 'Surround Audio-Visual Systems',
      desc: 'Acoustically tuned speakers and directional ceiling microphones for crystal-clear interactive lectures.',
      icon: Volume2,
    },
    {
      title: 'Cloud-Connected Learning',
      desc: 'Recorded lectures, digital homework portals, and parent progress tracking via integrated school app.',
      icon: Layers,
    },
  ];

  return (
    <section id="smart-classrooms" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>Digital Education</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              100% Digitally Empowered Smart Classrooms
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              At Nagarjuna School, every classroom is a smart learning studio. By combining interactive touch technology with rich visual content, we turn passive lectures into captivating interactive explorations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/75 backdrop-blur-xl p-5 rounded-2xl border border-white shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{h.title}</h3>
                    <p className="text-xs text-slate-600 leading-snug">{h.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl group bg-white/70 backdrop-blur-xl p-3">
              <div className="rounded-[2rem] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
                  alt="Smart Classroom at Nagarjuna School"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg">
                      45+
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-sm">Interactive Smart Panels Installed</h4>
                      <p className="text-xs text-slate-600">Providing visual clarity and interactive engagement for Class Nursery to XII</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
