import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  Tag,
  Clock,
  User,
  Search,
  PlusCircle,
  FolderOpen,
  Image as ImageIcon,
  CheckCircle,
  X,
  Share2,
  Award,
  ChevronLeft,
} from 'lucide-react';
import { EventItem } from '../types';
import { getStoredEvents, getActiveStaffUser } from '../utils/eventStorage';

interface EventsSectionProps {
  onOpenStaffPortal: () => void;
  onEditEvent?: (evt: EventItem) => void;
  refreshTrigger?: number;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenStaffPortal,
  onEditEvent,
  refreshTrigger = 0,
}) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const activeStaff = getActiveStaffUser();

  // Load events
  useEffect(() => {
    const data = getStoredEvents();
    setEvents(data);
  }, [refreshTrigger]);

  const categories = [
    'All',
    'Celebration',
    'Robotics & AI',
    'Sports',
    'Cultural',
    'Exhibition',
    'Annual Day',
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesCategory =
      selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.location && evt.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShareEvent = (evt: EventItem) => {
    if (navigator.share) {
      navigator.share({
        title: evt.title,
        text: evt.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${evt.title} - ${evt.description}`);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <section id="events" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>School Happenings & Held Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              School Events, Celebrations & Reports
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore photo galleries, writeups, and student achievements from all academic, sports, cultural, and robotics events held at Nagarjuna Public School.
            </p>
          </div>

          {/* Staff Upload Portal Trigger Card */}
          <div className="shrink-0">
            <a
              href="#staff-events"
              onClick={(e) => {
                const el = document.getElementById('staff-events');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
                onOpenStaffPortal();
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>{activeStaff ? 'Staff Console: Add / Edit Events' : 'Staff Login / Event Editor Hub'}</span>
            </a>
            {activeStaff && (
              <p className="text-[11px] text-emerald-600 font-semibold text-right mt-1.5 flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Logged in as {activeStaff.name}
              </p>
            )}
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white/90 border border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event title, matter..."
              className="w-full bg-white border border-slate-200/80 rounded-2xl pl-10 pr-3.5 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-2xs"
            />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-300 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                {/* Event Cover Image */}
                <div>
                  <div
                    onClick={() => {
                      setSelectedEventModal(evt);
                      setActiveGalleryIndex(0);
                    }}
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-100"
                  >
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-white/95 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full border border-white shadow-sm">
                        {evt.category}
                      </span>
                    </div>

                    {evt.galleryImages && evt.galleryImages.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-sky-400" />
                        <span>+{evt.galleryImages.length} Photos</span>
                      </span>
                    )}
                  </div>

                  {/* Event Matter Card Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1 text-blue-600 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {evt.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[160px]">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        {evt.location}
                      </span>
                    </div>

                    <h3
                      onClick={() => {
                        setSelectedEventModal(evt);
                        setActiveGalleryIndex(0);
                      }}
                      className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {evt.title}
                    </h3>

                    {/* Matter / Report Snippet */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    {/* Highlights tags if any */}
                    {evt.highlights && evt.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {evt.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
                    By: {evt.staffInCharge || 'Nagarjuna Faculty'}
                  </span>

                  <div className="flex items-center gap-2">
                    {activeStaff && onEditEvent && (
                      <button
                        onClick={() => onEditEvent(evt)}
                        className="text-slate-500 hover:text-blue-600 font-bold text-[11px] px-2 py-1 bg-slate-100 hover:bg-blue-50 rounded-lg"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedEventModal(evt);
                        setActiveGalleryIndex(0);
                      }}
                      className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Matter</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No events found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No matching events found for the selected category or search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ================= FULL EVENT MATTER & PHOTO GALLERY MODAL ================= */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden shrink-0">
              <img
                src={
                  selectedEventModal.galleryImages &&
                  selectedEventModal.galleryImages.length > 0
                    ? selectedEventModal.galleryImages[activeGalleryIndex] || selectedEventModal.image
                    : selectedEventModal.image
                }
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 rounded-2xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badges on Hero */}
              <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedEventModal.category}
                  </span>
                  <span className="text-slate-300 text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-300" />
                    {selectedEventModal.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black leading-tight text-white drop-shadow-md">
                  {selectedEventModal.title}
                </h3>
              </div>
            </div>

            {/* Gallery Thumbnail Selector if multiple photos exist */}
            {selectedEventModal.galleryImages && selectedEventModal.galleryImages.length > 1 && (
              <div className="bg-slate-900 px-5 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-slate-800">
                <span className="text-[11px] text-slate-400 font-bold uppercase shrink-0">
                  Photos ({selectedEventModal.galleryImages.length}):
                </span>
                {selectedEventModal.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeGalleryIndex === idx ? 'border-sky-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body: Full Matter & Report */}
            <div className="p-6 overflow-y-auto space-y-5 bg-white">
              {/* Event Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Venue: <strong>{selectedEventModal.location}</strong></span>
                  </span>
                  {selectedEventModal.staffInCharge && (
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Report by: <strong>{selectedEventModal.staffInCharge}</strong></span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleShareEvent(selectedEventModal)}
                  className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedShare ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              {/* Key Highlights */}
              {selectedEventModal.highlights && selectedEventModal.highlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Key Event Highlights & Honors</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedEventModal.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="bg-blue-50/70 border border-blue-100 p-2.5 rounded-2xl flex items-center gap-2 text-xs font-semibold text-blue-900"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Matter Report Text */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Event Matter & Detailed Summary
                </h4>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                  {selectedEventModal.description}
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Nagarjuna Public School • Official Event Gazette
              </span>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
