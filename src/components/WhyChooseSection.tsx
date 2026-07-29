import React from 'react';
import {
  GraduationCap,
  Users,
  Monitor,
  Bot,
  Laptop,
  Atom,
  Trophy,
  BookOpen,
  Palette,
  ShieldCheck,
  Bus,
  UserCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const cards = [
    {
      title: 'Academic Excellence',
      desc: '100% CBSE board results with integrated Olympiad & competitive exam coaching.',
      icon: GraduationCap,
      gradient: 'from-blue-600 to-sky-500',
    },
    {
      title: 'Experienced Faculty',
      desc: '180+ qualified M.Sc, M.Tech, and Ph.D educators dedicated to student success.',
      icon: Users,
      gradient: 'from-indigo-600 to-blue-500',
    },
    {
      title: 'Digital Smart Classrooms',
      desc: '4K interactive displays, 3D visual learning modules, and cloud assignments.',
      icon: Monitor,
      gradient: 'from-sky-500 to-blue-600',
    },
    {
      title: 'Robotics & AI Hub',
      desc: 'Hands-on training in Arduino, LEGO Mindstorms, Raspberry Pi, and Python AI.',
      icon: Bot,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Computer Lab',
      desc: 'High-speed gigabit internet, dual-monitor workstations, and coding clubs.',
      icon: Laptop,
      gradient: 'from-cyan-500 to-teal-600',
    },
    {
      title: 'Science Laboratories',
      desc: 'Dedicated Physics, Chemistry, and Biology research labs with sensor equipment.',
      icon: Atom,
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      title: 'Sports Facilities',
      desc: 'Synthetic football turf, basketball courts, cricket nets, and indoor sports.',
      icon: Trophy,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Library & E-Resource',
      desc: '25,000+ print volumes, quiet study nooks, and digital journal database access.',
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Creative Arts & Music',
      desc: 'Performing arts studio, vocal music conservatory, and fine arts workshop.',
      icon: Palette,
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Safe Campus',
      desc: '24/7 CCTV surveillance, biometric access gates, and resident healthcare team.',
      icon: ShieldCheck,
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'GPS-Tracked Transport',
      desc: 'Air-conditioned bus fleet with live parent GPS location tracking app.',
      icon: Bus,
      gradient: 'from-blue-600 to-sky-500',
    },
    {
      title: 'Individual Attention',
      desc: 'Optimal 1:20 teacher-student ratio ensuring personalized guidance for every child.',
      icon: UserCheck,
      gradient: 'from-indigo-600 to-purple-600',
    },
  ];

  return (
    <section id="why-choose" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Nagarjuna School</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            12 Pillars of Educational Distinction
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Every feature at Nagarjuna School is intentionally designed to ignite curiosity, cultivate discipline, and build strong future leaders.
          </p>
        </div>

        {/* 12 Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white hover:bg-white transition-all duration-300 group hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
