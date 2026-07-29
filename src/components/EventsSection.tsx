import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  Tag,
  Clock,
} from 'lucide-react';
import { EVENTS } from '../data/schoolData';

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Robotics & AI', 'Exhibition', 'Sports', 'Cultural'];

  const filteredEvents =
    selectedCategory === 'All'
      ? EVENTS
      : EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <section id="events" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>School Calendar & Activities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Upcoming Events, Workshops & Fests
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            A vibrant campus life packed with hackathons, science exhibitions, sports meets, robotic expos, and cultural celebrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/80 border border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-white hover:bg-white transition-all group flex flex-col sm:flex-row shadow-md hover:shadow-xl"
            >
              <div className="sm:w-2/5 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white shadow-xs">
                  {evt.category}
                </span>
              </div>

              <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{evt.location}</span>
                  </span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
