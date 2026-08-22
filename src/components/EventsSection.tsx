import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  User,
  Search,
  FolderOpen,
  Image as ImageIcon,
  CheckCircle,
  X,
  Share2,
  Award,
  Plus,
  Edit3,
  Trash2,
  LogIn,
  LogOut,
  ShieldCheck,
  Upload,
  Lock,
  RotateCcw,
  Camera,
  Check,
  AlertCircle,
} from 'lucide-react';
import { EventItem } from '../types';
import {
  getStoredEvents,
  addStoredEvent,
  updateStoredEvent,
  deleteStoredEvent,
  resetStoredEvents,
  getActiveStaffUser,
  setStaffUserSession,
  DEMO_STAFF_ACCOUNTS,
  PRESET_EVENT_IMAGES,
  StaffUser,
} from '../utils/eventStorage';

interface EventsSectionProps {
  refreshTrigger?: number;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  refreshTrigger = 0,
}) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Staff Auth State
  const [activeStaff, setActiveStaff] = useState<StaffUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStaffId, setLoginStaffId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Event Viewer Modal State
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Add / Edit Event Form State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Celebration');
  const [formDate, setFormDate] = useState('');
  const [formLocation, setFormLocation] = useState('Campus Auditorium & Grounds');
  const [formStaffInCharge, setFormStaffInCharge] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formGalleryImages, setFormGalleryImages] = useState<string[]>([]);
  const [formHighlightInput, setFormHighlightInput] = useState('');
  const [formHighlights, setFormHighlights] = useState<string[]>([]);
  const [formNotification, setFormNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [imageTab, setImageTab] = useState<'upload' | 'preset' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Load events & active session
  useEffect(() => {
    const data = getStoredEvents();
    setEvents(data);
    const staff = getActiveStaffUser();
    setActiveStaff(staff);
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

  // Staff Login Handler
  const handleStaffLogin = (user?: StaffUser) => {
    if (user) {
      setStaffUserSession(user);
      setActiveStaff(user);
      setIsLoginModalOpen(false);
      setLoginError('');
      return;
    }

    if (!loginStaffId.trim()) {
      setLoginError('Please enter your Staff ID or registered email.');
      return;
    }

    const matched = DEMO_STAFF_ACCOUNTS.find(
      (s) =>
        s.id.toLowerCase() === loginStaffId.trim().toLowerCase() ||
        s.name.toLowerCase().includes(loginStaffId.trim().toLowerCase())
    );

    const loggedUser: StaffUser = matched || {
      id: loginStaffId.trim().toUpperCase(),
      name: loginStaffId.includes('@') ? loginStaffId.split('@')[0] : loginStaffId,
      department: 'Academic Faculty',
      role: 'Staff Coordinator & Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      token: `token-${Date.now()}`,
    };

    setStaffUserSession(loggedUser);
    setActiveStaff(loggedUser);
    setIsLoginModalOpen(false);
    setLoginStaffId('');
    setLoginPassword('');
    setLoginError('');
  };

  const handleStaffLogout = () => {
    setStaffUserSession(null);
    setActiveStaff(null);
    setIsEditorModalOpen(false);
  };

  // Open Create Event Modal
  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setFormTitle('');
    setFormCategory('Celebration');
    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    setFormDate(today);
    setFormLocation('Main Campus Auditorium & Quadrangle');
    setFormStaffInCharge(activeStaff?.name || 'Staff Coordinator');
    setFormDescription('');
    setFormImage(PRESET_EVENT_IMAGES[0].url);
    setFormGalleryImages([]);
    setFormHighlights(['Active Student Participation', 'Faculty Coordination']);
    setFormNotification(null);
    setIsEditorModalOpen(true);
  };

  // Open Edit Event Modal
  const handleOpenEditModal = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setFormTitle(evt.title);
    setFormCategory(evt.category || 'Celebration');
    setFormDate(evt.date);
    setFormLocation(evt.location || 'Nagarjuna Public School Campus');
    setFormStaffInCharge(evt.staffInCharge || activeStaff?.name || 'Faculty In-Charge');
    setFormDescription(evt.description);
    setFormImage(evt.image);
    setFormGalleryImages(evt.galleryImages || []);
    setFormHighlights(evt.highlights || []);
    setFormNotification(null);
    setIsEditorModalOpen(true);
  };

  // Save Event (Create or Update)
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormNotification({ message: 'Event title is required.', type: 'error' });
      return;
    }
    if (!formDescription.trim()) {
      setFormNotification({ message: 'Please provide the writeup matter for this event.', type: 'error' });
      return;
    }

    const payload = {
      title: formTitle.trim(),
      category: formCategory,
      date: formDate.trim() || '2026',
      location: formLocation.trim() || 'Nagarjuna Campus',
      staffInCharge: formStaffInCharge.trim() || activeStaff?.name || 'Nagarjuna Faculty',
      description: formDescription.trim(),
      image: formImage.trim() || PRESET_EVENT_IMAGES[0].url,
      galleryImages: formGalleryImages.length > 0 ? formGalleryImages : [formImage.trim() || PRESET_EVENT_IMAGES[0].url],
      highlights: formHighlights.filter((h) => h.trim().length > 0),
    };

    if (editingEventId) {
      updateStoredEvent(editingEventId, payload);
    } else {
      addStoredEvent(payload);
    }

    const updatedList = getStoredEvents();
    setEvents(updatedList);
    setIsEditorModalOpen(false);
  };

  // Delete Event
  const handleDeleteEvent = (id: string) => {
    deleteStoredEvent(id);
    const updatedList = getStoredEvents();
    setEvents(updatedList);
    setDeleteConfirmId(null);
    if (selectedEventModal?.id === id) {
      setSelectedEventModal(null);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all events to default demo records? Custom added events will be restored.')) {
      const reset = resetStoredEvents();
      setEvents(reset);
    }
  };

  // Handle Local File Upload for Cover Image
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Multi Photo Upload for Gallery
  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setFormGalleryImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Quick templates for fast writeup matter
  const writeupTemplates = [
    {
      title: 'Robotics & STEM Conclave',
      category: 'Robotics & AI',
      desc: 'Nagarjuna Public School hosted the prestigious Inter-School STEM & Robotics Conclave. Students from across the state presented self-driving rover prototypes, AI vision models, and quadcopter drones. The event was inaugurated by veteran scientists who commended the student innovators on their coding precision and engineering ingenuity.',
      highlights: ['1st Prize in Autonomous Maze Solver', 'Best Innovation Trophy', '18 School Delegations'],
    },
    {
      title: 'Annual Sports & Athletic Meet',
      category: 'Sports',
      desc: 'The annual Sports Olympiad was celebrated with thrilling track and field competitions, football finals, and house relay championships. Over 600 student athletes demonstrated exceptional sportsmanship, discipline, and stamina. Medals and rolling trophies were presented during the grand valedictory ceremony.',
      highlights: ['New 100m Sprint Record', 'Tagore House Champions', '600+ Athletes Participated'],
    },
    {
      title: 'Grand Cultural & Arts Gala',
      category: 'Cultural',
      desc: 'A mesmerizing evening of classical music, folk dances, theatrical drama, and visual art installations was presented by students. The auditorium reverberated with applause as our junior and senior choirs performed thematic symphonies celebrating unity, culture, and environmental harmony.',
      highlights: ['State Level Classical Dance Trophy', 'Choir Standing Ovation', 'Live Canvas Painting'],
    },
  ];

  const applyTemplate = (t: typeof writeupTemplates[0]) => {
    setFormTitle(t.title);
    setFormCategory(t.category);
    setFormDescription(t.desc);
    setFormHighlights(t.highlights);
  };

  return (
    <section id="events" className="py-20 text-slate-800 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Staff Status & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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

          {/* Staff Login & Edit Controls on Section */}
          <div className="shrink-0 flex flex-wrap items-center gap-3">
            {activeStaff ? (
              <div className="bg-blue-50/90 border border-blue-200/80 rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 shadow-sm">
                <img
                  src={activeStaff.avatar}
                  alt={activeStaff.name}
                  className="w-10 h-10 rounded-xl object-cover border border-blue-300"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-900">{activeStaff.name}</span>
                    <span className="text-[10px] bg-blue-600 text-white font-black px-1.5 py-0.5 rounded">STAFF</span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-medium truncate max-w-[160px]">
                    {activeStaff.role}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pl-2 border-l border-blue-200">
                  <button
                    onClick={handleOpenCreateModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                    title="Add New Event"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
                  </button>
                  <button
                    onClick={handleStaffLogout}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Sign Out Staff"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginError('');
                  setIsLoginModalOpen(true);
                }}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-blue-500 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 transition-all hover:scale-105 group"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Staff Login / Edit Events</span>
              </button>
            )}
          </div>
        </div>

        {/* Staff Mode Active Helper Banner */}
        {activeStaff && (
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 sm:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                Staff Editing Mode is <strong>Active</strong>. You can add new events, update writeups/photos, or delete obsolete event records.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenCreateModal}
                className="bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span>+ Add New Event</span>
              </button>
              <button
                onClick={handleResetDefaults}
                className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1"
                title="Reset Events to Default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Add New Event Card (if staff is logged in) */}
          {activeStaff && (
            <div
              onClick={handleOpenCreateModal}
              className="bg-blue-50/50 border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-blue-50/80 group min-h-[340px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Add New Event Report
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-xs leading-relaxed">
                Publish a fresh event, upload photo albums, write matter, and add student awards.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-white px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
                <span>Open Event Editor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}

          {/* Event Cards */}
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-300 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between relative"
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

                  {/* Staff Edit / Delete Badges directly on image hover */}
                  {activeStaff && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl shadow-md"
                    >
                      <button
                        onClick={() => handleOpenEditModal(evt)}
                        className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                        title="Edit this event"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="text-[11px] pr-1">Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(evt.id)}
                        className="p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs transition-all"
                        title="Delete event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
                  {activeStaff && (
                    <button
                      onClick={() => handleOpenEditModal(evt)}
                      className="text-slate-600 hover:text-blue-600 font-bold text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-blue-50 rounded-lg flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-blue-500" />
                      <span>Edit</span>
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

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No events found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No matching events found for the selected category or search term.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
              {activeStaff && (
                <button
                  onClick={handleOpenCreateModal}
                  className="text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-xl shadow-xs"
                >
                  + Add First Event
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= STAFF LOGIN MODAL ================= */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 relative">
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-sky-200 text-[11px] font-bold uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Faculty Authentication</span>
              </div>
              <h3 className="text-xl font-black">Staff Event Editor Login</h3>
              <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
                Sign in to add new school celebrations, publish event writeups, upload gallery photos, and edit existing records.
              </p>
            </div>

            <div className="p-6 space-y-5">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Quick 1-Click Faculty Demo Login */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Quick Demo Faculty Access (1-Click)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_STAFF_ACCOUNTS.map((staff) => (
                    <button
                      key={staff.id}
                      type="button"
                      onClick={() => handleStaffLogin(staff)}
                      className="p-2.5 rounded-2xl border border-slate-200 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/60 text-left transition-all flex items-center gap-2.5 group"
                    >
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                          {staff.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {staff.department.split(' ')[0]} • {staff.role.split(' ')[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-semibold uppercase">
                  Or Manual Faculty Login
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Manual Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStaffLogin();
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Staff ID / Official Email
                  </label>
                  <input
                    type="text"
                    value={loginStaffId}
                    onChange={(e) => setLoginStaffId(e.target.value)}
                    placeholder="e.g. STAFF-ADMIN or your name"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Passcode / Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="•••••••• (Any password for demo)"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Enter Staff Edit Mode</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT EVENT MODAL ================= */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/30 text-sky-200 text-[10px] font-extrabold uppercase mb-1">
                  <Edit3 className="w-3 h-3" />
                  <span>{editingEventId ? 'Editing Existing Event' : 'New School Event Report'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  {editingEventId ? 'Update Event Matter & Photos' : 'Publish New School Event'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Body Form */}
            <form onSubmit={handleSaveEvent} className="p-5 sm:p-6 overflow-y-auto space-y-4">
              {formNotification && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    formNotification.type === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formNotification.message}</span>
                </div>
              )}

              {/* Quick Template Selector */}
              {!editingEventId && (
                <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Quick Writeup Matter Templates</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {writeupTemplates.map((tpl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => applyTemplate(tpl)}
                        className="text-[11px] font-semibold bg-white hover:bg-blue-600 hover:text-white text-slate-700 px-3 py-1.5 rounded-xl border border-blue-200 transition-all shadow-2xs"
                      >
                        + {tpl.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. State Level Robotics Conclave 2026"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-medium"
                  >
                    <option value="Celebration">Celebration</option>
                    <option value="Robotics & AI">Robotics & AI</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Annual Day">Annual Day</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Date, Location, Staff In Charge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. 15 August 2026"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Venue / Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Main Auditorium"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Staff In-Charge
                  </label>
                  <input
                    type="text"
                    value={formStaffInCharge}
                    onChange={(e) => setFormStaffInCharge(e.target.value)}
                    placeholder="Faculty name"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              {/* Row 3: Event Writeup Matter Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>Event Writeup / Description Matter <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">{formDescription.length} characters</span>
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter the full event report, speech summaries, guest details, and student participation highlights..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 leading-relaxed"
                  required
                />
              </div>

              {/* Row 4: Cover Image & Gallery Photos */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>Event Cover Photo & Gallery</span>
                  </label>

                  <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageTab('upload')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        imageTab === 'upload' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('preset')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        imageTab === 'preset' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Preset Library
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        imageTab === 'url' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {/* Upload Mode */}
                {imageTab === 'upload' && (
                  <div className="space-y-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer bg-white transition-colors"
                    >
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-slate-700">Click to upload cover image from device</p>
                      <p className="text-[10px] text-slate-400">PNG, JPG, WebP supported</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Preset Library Mode */}
                {imageTab === 'preset' && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200">
                    {PRESET_EVENT_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setFormImage(img.url)}
                        className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          formImage === img.url ? 'border-blue-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-1">
                          <span className="text-[8px] text-white font-bold truncate">{img.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* URL Mode */}
                {imageTab === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                )}

                {/* Preview Selected Cover */}
                {formImage && (
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                    <img src={formImage} alt="Cover Preview" className="w-16 h-12 rounded-lg object-cover border" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 block">Selected Cover Preview</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">✓ Ready for publication</span>
                    </div>
                  </div>
                )}

                {/* Extra Gallery Photos */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700">
                      Multi-Photo Gallery Album ({formGalleryImages.length} photos)
                    </span>
                    <button
                      type="button"
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Upload More Photos</span>
                    </button>
                    <input
                      ref={galleryFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryFileUpload}
                      className="hidden"
                    />
                  </div>

                  {formGalleryImages.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto p-1 bg-white rounded-xl border border-slate-200">
                      {formGalleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-14 h-11 shrink-0 rounded-lg overflow-hidden border group">
                          <img src={img} alt={`Album ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormGalleryImages(formGalleryImages.filter((_, i) => i !== idx))}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 5: Highlights / Honors Tags */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Key Highlights / Student Awards & Badges
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formHighlightInput}
                    onChange={(e) => setFormHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (formHighlightInput.trim()) {
                          setFormHighlights([...formHighlights, formHighlightInput.trim()]);
                          setFormHighlightInput('');
                        }
                      }
                    }}
                    placeholder="e.g. 1st Prize in State Level Robotic Race (Press Enter)"
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formHighlightInput.trim()) {
                        setFormHighlights([...formHighlights, formHighlightInput.trim()]);
                        setFormHighlightInput('');
                      }
                    }}
                    className="bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl"
                  >
                    Add
                  </button>
                </div>

                {formHighlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formHighlights.map((h, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1.5"
                      >
                        <span>✓ {h}</span>
                        <button
                          type="button"
                          onClick={() => setFormHighlights(formHighlights.filter((_, idx) => idx !== i))}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingEventId ? 'Save Changes' : 'Publish Event Now'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION DIALOG ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Delete Event Record?</h3>
              <p className="text-xs text-slate-600 mt-1">
                Are you sure you want to remove this event from the school portal? This action can be undone by clicking "Reset".
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(deleteConfirmId)}
                className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl shadow-md"
              >
                Yes, Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

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

                <div className="flex items-center gap-2">
                  {activeStaff && (
                    <button
                      onClick={() => {
                        const target = selectedEventModal;
                        setSelectedEventModal(null);
                        handleOpenEditModal(target);
                      }}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold flex items-center gap-1 px-3 py-1 rounded-xl border border-blue-200"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Matter</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleShareEvent(selectedEventModal)}
                    className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedShare ? 'Copied Link!' : 'Share'}</span>
                  </button>
                </div>
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
