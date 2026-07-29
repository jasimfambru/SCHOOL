import React from 'react';
import {
  Trophy,
  Award,
  Star,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const stats = [
    { value: '100%', label: 'CBSE Board Pass Rate', sub: 'Class X & XII' },
    { value: '5,000+', label: 'Active Students', sub: 'Nursery to Class XII' },
    { value: '350+', label: 'State & National Awards', sub: 'STEM, Sports & Arts' },
    { value: '180+', label: 'Expert Faculty', sub: 'Advanced Degrees' },
    { value: '45+', label: 'Smart Classrooms', sub: '4K Interactive Panels' },
    { value: '12+', label: 'High-Tech Labs', sub: 'Robotics, AI, Science' },
  ];

  const rankers = [
    { name: 'Kavya Sharma', score: '99.2%', track: 'CBSE Class XII - Science & AI', rank: 'All India Rank 4' },
    { name: 'Aditya V. Rao', score: '98.8%', track: 'CBSE Class X', rank: 'State Rank 1' },
    { name: 'Siddharth Patel', score: '98.6%', track: 'CBSE Class XII - Commerce', rank: 'District Topper' },
  ];

  return (
    <section className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Excellence Unmatched</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Our Legacy of Academic & STEM Achievements
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Consistently producing state toppers, national robotics champions, and graduates who secure admissions in premier universities worldwide.
          </p>
        </div>

        {/* Large Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-white text-center shadow-md hover:scale-105 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-900 mb-0.5">{s.label}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Board Exam Toppers Feature */}
        <div className="bg-white/75 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>CBSE Board Examination Hall of Fame 2026</span>
              </h3>
              <p className="text-xs text-slate-600">Celebrating our top achievers and star performers</p>
            </div>
            <span className="hidden sm:inline-block text-xs bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1 rounded-full border border-emerald-100">
              100% PASS RATE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankers.map((r, idx) => (
              <div
                key={idx}
                className="bg-white/90 p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {r.rank}
                  </span>
                  <div className="text-2xl font-black text-amber-500">
                    {r.score}
                  </div>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{r.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{r.track}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
