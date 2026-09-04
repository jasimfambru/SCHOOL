import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Bot,
  Laptop,
  GraduationCap,
  BookOpen,
  Building,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  Play,
  CheckCircle,
  Monitor,
  Award,
  Camera,
  Edit3,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  getStoredEvents,
  getActiveStaffUser,
  setStaffUserSession,
  StaffUser,
} from '../utils/eventStorage';
import { EditSimulatorModal } from './EditSimulatorModal';
import { StaffLoginModal } from './StaffLoginModal';
import { getCustomSimulatorImages } from '../utils/simulatorStorage';

interface HeroProps {
  onOpenApplyModal: () => void;
  onOpenProspectusModal: () => void;
}

type CampusHotspot =
  | 'building'
  | 'robotics'
  | 'smart_classroom'
  | 'computer'
  | 'playground'
  | 'auditorium'
  | 'events';

export const Hero: React.FC<HeroProps> = ({ onOpenApplyModal, onOpenProspectusModal }) => {
  const [activeHotspot, setActiveHotspot] = useState<CampusHotspot>('robotics');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState<boolean>(false);
  const [activeStaff, setActiveStaff] = useState<StaffUser | null>(() => getActiveStaffUser());
  const [customImages, setCustomImages] = useState<Record<string, string>>(() =>
    getCustomSimulatorImages()
  );

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Record<string, string>>;
      if (customEvent.detail) {
        setCustomImages(customEvent.detail);
      } else {
        setCustomImages(getCustomSimulatorImages());
      }
    };

    const handleAuth = (e: Event) => {
      const customEvent = e as CustomEvent<StaffUser | null>;
      setActiveStaff(customEvent.detail !== undefined ? customEvent.detail : getActiveStaffUser());
    };

    window.addEventListener('simulator_images_updated', handleUpdate);
    window.addEventListener('nagarjuna_staff_auth_changed', handleAuth);
    return () => {
      window.removeEventListener('simulator_images_updated', handleUpdate);
      window.removeEventListener('nagarjuna_staff_auth_changed', handleAuth);
    };
  }, []);

  const handleOpenEditFlow = () => {
    if (activeStaff) {
      setIsEditModalOpen(true);
    } else {
      setIsStaffLoginOpen(true);
    }
  };

  const storedEvents = getStoredEvents();
  const latestEvent = storedEvents[0];
  const eventDisplayImage = latestEvent?.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop';

  const hotspots = [
    {
      id: 'robotics' as CampusHotspot,
      label: 'Robotics & AI Lab',
      icon: Bot,
      color: 'from-blue-600 to-sky-500',
      badge: 'STEM & AI',
      title: 'Advanced Robotics & AI Center',
      desc: 'Arduino, LEGO Mindstorms, 3D printing, Python programming, and autonomous drone kits.',
      image: customImages['robotics'] || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'building' as CampusHotspot,
      label: 'Main Campus',
      icon: Building,
      color: 'from-sky-500 to-blue-600',
      badge: 'Eco-Friendly',
      title: 'Nagarjuna Green Campus',
      desc: '15-acre sprawling Wi-Fi campus with solar architecture and climate-controlled academic facilities in Kandukur.',
      image: customImages['building'] || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'smart_classroom' as CampusHotspot,
      label: 'Smart Classrooms',
      icon: Monitor,
      color: 'from-amber-500 to-orange-500',
      badge: '4K Interactive',
      title: 'Digital Smart Classrooms',
      desc: 'Interactive 4K flat panels, ergonomic digital stations, and immersive visual curriculum modules.',
      image: customImages['smart_classroom'] || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'computer' as CampusHotspot,
      label: 'Computer Center',
      icon: Laptop,
      color: 'from-indigo-500 to-cyan-500',
      badge: 'High-Tech',
      title: 'Digital Computer Labs',
      desc: 'High-speed gigabit workstations, cloud coding environments, and cyber safety training.',
      image: customImages['computer'] || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'playground' as CampusHotspot,
      label: 'Sports Arena',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Olympic Turf',
      title: 'Multi-Sport Complex',
      desc: 'Football synthetic pitch, floodlit basketball courts, cricket nets, and running track.',
      image: customImages['playground'] || 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'auditorium' as CampusHotspot,
      label: 'Grand Auditorium',
      icon: Award,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Acoustic Hall',
      title: '1,200-Seat Grand Auditorium',
      desc: 'Acoustically engineered amphitheater for student theatre, annual day galas, and guest lectures.',
      image: customImages['auditorium'] || 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'events' as CampusHotspot,
      label: 'Campus Celebrations',
      icon: Sparkles,
      color: 'from-rose-500 to-pink-600',
      badge: 'Live Events',
      title: latestEvent ? latestEvent.title : 'Annual Day & Cultural Celebrations',
      desc: latestEvent ? latestEvent.description : 'National festivities, Independence Day parade, sports meet, and vibrant cultural showcases.',
      image: customImages['events'] || eventDisplayImage,
    },
  ];

  const currentHotspotData = hotspots.find((h) => h.id === activeHotspot) || hotspots[0];

  return (
    <section className="relative min-h-[90vh] text-slate-800 overflow-hidden flex items-center pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Shaping{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                Future Leaders
              </span>{' '}
              Through Innovation.
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to <strong className="text-slate-900">Nagarjuna School</strong>, where academic excellence meets futuristic technology. Empowering students through Robotics, AI, and holistic development in a world-class campus environment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#campus-hub"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all"
              >
                <Compass className="w-5 h-5 text-white" />
                <span>Explore Campus</span>
              </a>

              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 hover:bg-white border border-slate-200 text-slate-800 font-bold rounded-2xl shadow-sm backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Admissions Open 2026-27</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-slate-200/60">
              <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-sm">
                <p className="text-3xl font-black text-slate-900">100%</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Board Results</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-sm">
                <p className="text-3xl font-black text-slate-900">25+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Global Awards</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-sm">
                <p className="text-3xl font-black text-slate-900">12</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Tech Labs</p>
              </div>
            </div>
          </div>

          {/* Right Side Feature: Glass Dashboard Card */}
          <div id="campus-hub" className="lg:col-span-6 relative">
            <div className="p-6 bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-2xl relative">
              {/* Decorative Pulse Element */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    INTERACTIVE CAMPUS SIMULATOR
                  </h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 font-bold">
                    LIVE VISUAL
                  </span>
                </div>

                {/* Staff Status & Edit Photo Action */}
                <div className="flex items-center gap-2">
                  {activeStaff ? (
                    <div className="flex items-center gap-1.5">
                      <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-xl text-[11px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="truncate max-w-[120px]">Staff: {activeStaff.name}</span>
                      </div>
                      <button
                        onClick={handleOpenEditFlow}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
                        title="Edit or upload custom pictures for the simulator"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-300" />
                        <span>Edit Photos</span>
                      </button>
                      <button
                        onClick={() => setStaffUserSession(null)}
                        className="text-[10px] text-slate-400 hover:text-rose-600 px-1.5 py-1 font-semibold transition-colors"
                        title="Sign out of staff mode"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleOpenEditFlow}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
                      title="Sign in as staff to edit campus simulator photos"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Staff Login to Edit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Hotspot Category Buttons Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
                {hotspots.map((h) => {
                  const Icon = h.icon;
                  const isActive = activeHotspot === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-gradient-to-r ' + h.color + ' text-white shadow-md'
                          : 'bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{h.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Visual Image Viewport */}
              <div className="aspect-video bg-slate-900 rounded-3xl mb-4 overflow-hidden relative group shadow-inner">
                <img
                  src={currentHotspotData.image}
                  alt={currentHotspotData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white flex items-center gap-1.5 text-xs text-blue-600 font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentHotspotData.badge}</span>
                </div>

                {/* Top Right Edit Button directly on active photo */}
                <button
                  onClick={handleOpenEditFlow}
                  className="absolute top-3 right-3 bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 text-xs font-bold shadow-md hover:scale-105 transition-all z-10 cursor-pointer"
                  title={activeStaff ? `Change photo for ${currentHotspotData.label}` : 'Staff login to change photo'}
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeStaff ? 'Change Photo' : 'Staff: Edit Photo'}</span>
                </button>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white">
                  <h3 className="text-sm sm:text-base font-bold flex items-center gap-2">
                    <currentHotspotData.icon className="w-4 h-4 text-sky-400" />
                    <span>{currentHotspotData.title}</span>
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 leading-snug">
                    {currentHotspotData.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Feature Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={onOpenProspectusModal}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 text-slate-800 transition-all text-left shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Prospectus</div>
                      <div className="text-[10px] text-slate-500">Download Curriculum PDF</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <a
                  href="#robotics-ai"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/80 text-slate-800 transition-all text-left shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Robotics & AI</div>
                      <div className="text-[10px] text-slate-500">Explore STEM Tech</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Login Modal */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        title="Staff Login to Edit Simulator Photos"
        subtitle="Sign in with official Nagarjuna staff credentials (satff@nagarjuna.school / staff@2026) to edit campus simulator pictures and upload school photos."
        onSuccess={(user) => {
          setActiveStaff(user);
          setIsEditModalOpen(true);
        }}
      />

      {/* Edit Simulator Modal */}
      <EditSimulatorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialHotspotId={activeHotspot}
        onImageChange={() => setCustomImages(getCustomSimulatorImages())}
      />
    </section>
  );
};
