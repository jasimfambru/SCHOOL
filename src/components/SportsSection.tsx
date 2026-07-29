import React from 'react';
import {
  Trophy,
  Dumbbell,
  Award,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const SportsSection: React.FC = () => {
  const sportsList = [
    {
      title: 'Football Turf Ground',
      desc: 'FIFA-approved synthetic turf ground for 11-a-side matches and daily training.',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Basketball Championship Court',
      desc: 'Floodlit court with acrylic surface for inter-school tournaments.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Cricket Nets & Coaching Academy',
      desc: 'Turf and astro nets with automated bowling machines and NIS certified coaches.',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Athletics 400m Track',
      desc: 'Professional 8-lane synthetic track for sprinting, relays, long jump, and hurdles.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Yoga & Mindful Wellness Sanctuary',
      desc: 'Serene indoor hall for daily pranayama, yoga, meditation, and posture alignment.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Indoor Table Tennis & Chess Complex',
      desc: 'Climate-controlled hall for indoor strategic games and rapid reflex sports.',
      image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section id="sports" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Athletic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            World-Class Sports & Physical Education
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Building physical stamina, sportsmanship, team spirit, and mental resilience through Olympic-grade sports infrastructure.
          </p>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sportsList.map((sport, idx) => (
            <div
              key={idx}
              className="bg-white/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-white hover:bg-white transition-all group shadow-md hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {sport.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sport.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sports Achievements Counter Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">Annual Sports Olympiad Trophies</h4>
              <p className="text-xs text-slate-600">Over 85 Gold Medals won in CBSE Inter-School Regional & National Athletic Meets</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-amber-600 font-black text-2xl">
            <div>
              <div>12+</div>
              <div className="text-[10px] text-slate-500 font-sans font-semibold uppercase tracking-wider">State Champions</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div>
              <div>100%</div>
              <div className="text-[10px] text-slate-500 font-sans font-semibold uppercase tracking-wider">Student Participation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
