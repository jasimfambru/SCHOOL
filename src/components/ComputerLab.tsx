import React from 'react';
import {
  Laptop,
  Code,
  ShieldCheck,
  Globe,
  Terminal,
  Cpu,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const ComputerLab: React.FC = () => {
  const features = [
    {
      title: 'Python & Java Programming',
      desc: 'Structured coding tracks from logic building to object-oriented software design.',
      icon: Code,
      badge: 'Core Coding',
    },
    {
      title: 'Scratch & Visual Blocks',
      desc: 'Fun drag-and-drop programming for Primary students to create interactive stories & games.',
      icon: Sparkles,
      badge: 'Primary STEM',
    },
    {
      title: 'AI & Data Tools Workspace',
      desc: 'Exploring machine learning concepts, data visualization, and prompt engineering fundamentals.',
      icon: Cpu,
      badge: 'Next-Gen AI',
    },
    {
      title: 'Cyber Safety & Ethical Web',
      desc: 'Comprehensive digital citizenship modules, password hygiene, and online safety protocols.',
      icon: ShieldCheck,
      badge: 'Cyber Security',
    },
    {
      title: 'High-Speed Fiber Backbone',
      desc: 'Dedicated 1 Gbps redundant fiber connectivity with advanced firewall web filtering.',
      icon: Globe,
      badge: 'Gigabit Network',
    },
    {
      title: 'Nagarjuna Coding Club',
      desc: 'Weekly hackathons, web design challenges, and inter-school algorithmic contests.',
      icon: Terminal,
      badge: 'Student Club',
    },
  ];

  return (
    <section id="computer-lab" className="py-20 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>High-Tech Computing Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Next-Generation Computer Laboratories
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Equipped with 120+ high-end workstations, dual-monitor programming suites, gigabit connectivity, and software design environments.
          </p>
        </div>

        {/* Large Monitor Illustration & Image Container */}
        <div className="mb-16 bg-white/75 backdrop-blur-xl rounded-[2.5rem] border border-white p-6 sm:p-10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Mock Monitor Graphic */}
            <div className="lg:col-span-7 relative">
              <div className="bg-slate-900 rounded-2xl border border-white/20 p-3 shadow-xl">
                {/* Screen Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono">
                    python3 app.py --mode=ai-learning
                  </span>
                </div>

                {/* Lab Image Viewport */}
                <div className="relative aspect-video rounded-xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
                    alt="Nagarjuna Computer Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/20"></div>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-2xl font-black text-slate-900">
                Empowering Digital Literacy & Computational Thinking
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From Class 1, students develop algorithmic thinking and problem-solving skills. By Class 8, they build web applications, write Python scripts, and create mobile games.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-800 font-bold bg-white/90 p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>120+ Intel Core i7 High-Performance Computers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-800 font-bold bg-white/90 p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full Adobe Creative Cloud & VS Code IDE Suite</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-800 font-bold bg-white/90 p-2.5 rounded-xl border border-slate-100 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Interactive Smart TV Projection Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white hover:bg-white transition-all group shadow-md hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
