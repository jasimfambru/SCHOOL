import React from 'react';
import { GraduationCap, Languages, BadgeCheck, Sparkles } from 'lucide-react';

const facts = [
  { Icon: GraduationCap, title: 'Nursery to Class X', sub: 'Classes offered' },
  { Icon: BadgeCheck, title: 'English Medium', sub: 'Recognised by Govt. of A.P.' },
  { Icon: Languages, title: 'AI English Lab', sub: 'Fluento language lab' },
  { Icon: Sparkles, title: 'LEAD Curriculum', sub: 'Modern, activity-based learning' },
];

const life = [
  {
    img: '/photos/assembly/morning-prayer-assembly.webp',
    pos: '50% 50%',
    title: 'Morning Assembly',
    text: 'Prayer, the pledge and thoughts for the day begin every school day.',
  },
  {
    img: '/photos/events/food-feast/pre-primary-kids-at-food-feast.webp',
    pos: '50% 50%',
    title: 'Little Learners',
    text: 'Our youngest students learn through play, food and festivals.',
  },
  {
    img: '/photos/events/bright-side-of-life-talk-and-heal.webp',
    pos: '50% 52%',
    title: 'Talk and Heal',
    text: 'An open platform where Class X students can talk to the Director: "Your voice matters... We are here to listen!"',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <>
      <section id="about" className="py-16 sm:py-20 bg-[#fffaf0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <small className="text-[#c8202f] font-extrabold tracking-[0.25em] text-xs">ABOUT OUR SCHOOL</small>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f1f4d] mt-2">A school that feels like family</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Nagarjuna Public School, run by the Skandapuri Educational Society, Kandukur.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {facts.map(({ Icon, title, sub }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center shadow-md shadow-[#0f1f4d]/5">
                <Icon className="w-8 h-8 mx-auto mb-3 text-[#c8202f]" />
                <div className="text-lg sm:text-xl font-black text-blue-800">{title}</div>
                <div className="text-sm text-slate-500 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="school-life" className="py-16 sm:py-20 bg-[#0f1f4d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <small className="text-amber-400 font-extrabold tracking-[0.25em] text-xs">SCHOOL LIFE</small>
            <h2 className="text-3xl sm:text-4xl font-black mt-2">A day at Nagarjuna</h2>
            <p className="text-[#b9c6ee] mt-3">Discipline, joy and learning, every single day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {life.map((c) => (
              <div key={c.title} className="bg-white/[0.07] border border-white/10 rounded-3xl overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" style={{ objectPosition: c.pos }} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1.5">{c.title}</h3>
                  <p className="text-sm text-[#b9c6ee] leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
