import React, { useState } from 'react';
import { X, Maximize2, Sparkles, Filter } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/schoolData';
import { GalleryImage } from '../types';

export const CampusGalleryModal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>(null);

  const categories = [
    'All',
    'Campus',
    'Classroom',
    'Robotics',
    'Computer Lab',
    'Library',
    'Science Lab',
    'Sports',
    'Creative Arts',
    'Events',
  ];

  const filteredImages =
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Visual Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Nagarjuna Campus Gallery
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Take a visual tour through our sprawling 15-acre campus, robotics labs, smart classrooms, sports arenas, and cultural celebrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-white/80 border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setFullscreenImage(img)}
              className="group relative rounded-3xl overflow-hidden bg-white/80 border border-white cursor-pointer aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity"></div>

              {/* Category Badge */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/60 shadow-xs">
                {img.category}
              </span>

              {/* Hover Fullscreen Icon */}
              <div className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/80 backdrop-blur-md text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Description Overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {img.title}
                </h3>
                <p className="text-[11px] text-slate-200 line-clamp-1 mt-0.5 font-medium">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {fullscreenImage && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full space-y-4 text-center">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white shadow-2xl">
                <img
                  src={fullscreenImage.url}
                  alt={fullscreenImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {fullscreenImage.category}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {fullscreenImage.title}
                </h3>
                <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-1 leading-relaxed font-medium">
                  {fullscreenImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
