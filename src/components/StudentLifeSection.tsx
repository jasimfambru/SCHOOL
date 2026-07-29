import React, { useState } from 'react';
import {
  Compass,
  Heart,
  Music,
  Code,
  Smile,
  Users,
  Palette,
  Trophy,
} from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Coding & STEM', 'Sports', 'Arts & Music', 'Community Service'];

  const items = [
    {
      title: 'Robotics Team Collaboration',
      category: 'Coding & STEM',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
      desc: 'Students programming autonomous rovers for inter-school STEM hackathons.',
    },
    {
      title: 'Inter-House Football Championship',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600&auto=format&fit=crop',
      desc: 'Energetic matches on our FIFA-grade synthetic turf football pitch.',
    },
    {
      title: 'Symphony Orchestra & Classical Music',
      category: 'Arts & Music',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
      desc: 'Mastering instruments and ensemble harmony in the Music Conservatory.',
    },
    {
      title: 'Community Tree Plantation Drive',
      category: 'Community Service',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
      desc: 'Eco Club members planting 500+ saplings across local parks and neighborhood green zones.',
    },
    {
      title: 'Fine Arts & Painting Workshop',
      category: 'Arts & Music',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
      desc: 'Expressing creativity through oil painting, clay sculpting, and digital graphics.',
    },
    {
      title: 'Student Council Leadership Summit',
      category: 'Community Service',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop',
      desc: 'Developing debate, parliamentary procedure, and public policy problem solving.',
    },
  ];

  const filteredItems =
    activeFilter === 'All' ? items : items.filter((i) => i.category === activeFilter);

  return (
    <section className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Smile className="w-4 h-4 text-indigo-600" />
            <span>Vibrant Campus Life</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Life at Nagarjuna School
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            A balanced ecosystem where academic rigors harmoniously blend with sports, arts, leadership, robotics, and social service.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/80 border border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 shadow-xs'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-white hover:bg-white transition-all group shadow-md hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white shadow-xs">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
