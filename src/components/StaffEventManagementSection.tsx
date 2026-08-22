import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  PlusCircle,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Calendar,
  MapPin,
  User,
  Upload,
  CheckCircle,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Search,
  Tag,
  FileText,
  LogOut,
  LogIn,
  Eye,
  Check,
  X,
  Layers,
  FolderOpen,
  Award,
  BookOpen,
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

interface StaffEventManagementSectionProps {
  onEventsUpdated: () => void;
  refreshTrigger?: number;
  externalEventToEdit?: EventItem | null;
  onClearExternalEdit?: () => void;
}

export const StaffEventManagementSection: React.FC<StaffEventManagementSectionProps> = ({
  onEventsUpdated,
  refreshTrigger = 0,
  externalEventToEdit = null,
  onClearExternalEdit,
}) => {
  // Authentication state
  const [activeStaff, setActiveStaff] = useState<StaffUser | null>(getActiveStaffUser());
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab & mode state inside the section
  const [activeTab, setActiveTab] = useState<'manage' | 'editor'>('manage');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  // Editor Form State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Celebration');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Nagarjuna School Campus');
  const [staffInCharge, setStaffInCharge] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState('');

  // Feedback notifications
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewModalEvent, setPreviewModalEvent] = useState<EventItem | null>(null);

  // Load events
  useEffect(() => {
    setEvents(getStoredEvents());
    setActiveStaff(getActiveStaffUser());
  }, [refreshTrigger]);

  // Handle external edit request (e.g. from the public events section "Edit" button)
  useEffect(() => {
    if (externalEventToEdit) {
      handleStartEdit(externalEventToEdit);
      // Scroll to this management section smoothly
      const el = document.getElementById('staff-events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [externalEventToEdit]);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Staff Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!usernameInput.trim()) {
      setLoginError('Please enter your Staff Username or ID');
      return;
    }

    const matched = DEMO_STAFF_ACCOUNTS.find(
      (s) =>
        s.id.toLowerCase() === usernameInput.trim().toLowerCase() ||
        s.name.toLowerCase().includes(usernameInput.trim().toLowerCase())
    );

    const userToLogin: StaffUser = matched || {
      id: `STAFF-${Date.now().toString().slice(-4)}`,
      name: usernameInput.trim(),
      department: 'Academic Faculty',
      role: 'Staff Coordinator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      token: `token-${Date.now()}`,
    };

    setStaffUserSession(userToLogin);
    setActiveStaff(userToLogin);
    setStaffInCharge(userToLogin.name);
    showFeedback(`Welcome, ${userToLogin.name}! Staff access granted.`);
  };

  const handleQuickLogin = (staff: StaffUser) => {
    setStaffUserSession(staff);
    setActiveStaff(staff);
    setStaffInCharge(staff.name);
    showFeedback(`Signed in as ${staff.name} (${staff.role})`);
  };

  const handleLogout = () => {
    setStaffUserSession(null);
    setActiveStaff(null);
    handleResetForm();
    showFeedback('Logged out of Staff Portal successfully.', 'success');
  };

  // Editor Form controls
  const handleResetForm = () => {
    setEditingEventId(null);
    setTitle('');
    setCategory('Celebration');
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setLocation('Nagarjuna School Campus');
    setStaffInCharge(activeStaff ? activeStaff.name : 'Nagarjuna Faculty');
    setDescription('');
    setCoverImage(PRESET_EVENT_IMAGES[0].url);
    setGalleryImages([]);
    setHighlights([]);
    setNewHighlight('');
    setNewGalleryUrl('');
    if (onClearExternalEdit) onClearExternalEdit();
  };

  const handleStartAddNew = () => {
    handleResetForm();
    setActiveTab('editor');
  };

  const handleStartEdit = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setTitle(evt.title);
    setCategory(evt.category);
    setDate(evt.date);
    setLocation(evt.location || 'Nagarjuna School Campus');
    setStaffInCharge(evt.staffInCharge || (activeStaff ? activeStaff.name : 'Faculty Coordinator'));
    setDescription(evt.description);
    setCoverImage(evt.image);
    setGalleryImages(evt.galleryImages || [evt.image]);
    setHighlights(evt.highlights || []);
    setActiveTab('editor');
  };

  // Image Upload handler (File Reader to base64)
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showFeedback('Image file is too large. Please select an image under 4MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
          if (!galleryImages.includes(reader.result)) {
            setGalleryImages((prev) => [reader.result as string, ...prev]);
          }
          showFeedback('Cover photograph uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList: File[] = Array.from(files);
      fileList.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            const url = reader.result;
            setGalleryImages((prev) => (prev.includes(url) ? prev : [...prev, url]));
          }
        };
        reader.readAsDataURL(file);
      });
      showFeedback(`Added ${files.length} photo(s) to the event gallery album!`);
    }
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    if (!galleryImages.includes(newGalleryUrl.trim())) {
      setGalleryImages((prev) => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
      showFeedback('Photo URL added to gallery!');
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    if (!highlights.includes(newHighlight.trim())) {
      setHighlights((prev) => [...prev, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== idx));
  };

  // Pre-fill writeup templates
  const applyWriteupTemplate = (type: 'robotics' | 'sports' | 'cultural' | 'celebration' | 'science') => {
    switch (type) {
      case 'robotics':
        setTitle('Inter-School AI & Autonomous Robotics Conclave 2026');
        setCategory('Robotics & AI');
        setDescription(
          `Nagarjuna Public School hosted the prestigious AI & Autonomous Robotics Conclave, bringing together over 28 participating schools and 400+ student innovators.\n\nStudents showcased self-navigating line follower robots, obstacle-avoiding rovers, and computer-vision powered sorting systems created in our next-gen robotics lab. Our Senior Team secured 1st Place with their AI Wildfire Detection drone prototype.\n\nThe Principal commended the students' problem-solving mindset and practical mastery of Python and embedded electronics.`
        );
        setHighlights(['1st Place Championship Trophy', '28 Participating Schools', '400+ Live Visitors', 'Best Drone Innovation Award']);
        setCoverImage(PRESET_EVENT_IMAGES[1].url);
        break;
      case 'sports':
        setTitle('Annual Inter-House Sports Olympiad & Athletics Gala');
        setCategory('Sports');
        setDescription(
          `The school grounds vibrated with athletic passion during the Annual Sports Olympiad. Over 500 student athletes competed across 100m/200m sprints, 4x100m relay, long jump, shot put, and inter-house football finals.\n\nPrithvi House clinched the Overall Champions Trophy with 14 Gold Medals. Chief Guest National Athlete Shri R. Kumar praised the high standard of physical fitness and sportsman spirit displayed by all participants.`
        );
        setHighlights(['Overall Trophy: Prithvi House', '500+ Student Athletes', 'New School Record in 100m Sprint', 'Best House March Past']);
        setCoverImage(PRESET_EVENT_IMAGES[2].url);
        break;
      case 'cultural':
        setTitle('Grand Annual Day & Cultural Extravaganza "Tarang"');
        setCategory('Annual Day');
        setDescription(
          `A spectacular evening of dance, drama, and classical orchestra was celebrated at the Open Air Amphitheatre. Over 750 students took the stage performing classical Bharatanatyam, contemporary fusion, and a theatrical drama on environmental conservation.\n\nAcademic and co-curricular excellence awards were bestowed upon meritorious students by the Chairman and Principal.`
        );
        setHighlights(['750+ Student Performers', 'Classical Orchestra Ensemble', 'Annual Meritorious Awards', 'Eco-Drama Presentation']);
        setCoverImage(PRESET_EVENT_IMAGES[6].url);
        break;
      case 'celebration':
        setTitle('79th Independence Day Celebration & Flag Hoisting');
        setCategory('Celebration');
        setDescription(
          `The 79th Independence Day was commemorated with immense patriotic fervour. The National Flag was unfurled by the Principal followed by the National Anthem rendered by the school brass band.\n\nCadets performed a ceremonial guard of honour, accompanied by patriotic songs and speeches in English, Telugu, and Hindi reflecting upon India's journey of development.`
        );
        setHighlights(['Guard of Honour by NCC Cadets', 'Brass Band National Anthem', 'Patriotic Songs & Speeches', 'Tri-Colour Sweet Distribution']);
        setCoverImage(PRESET_EVENT_IMAGES[0].url);
        break;
      case 'science':
        setTitle('National Science Day Innovation & Model Expo');
        setCategory('Exhibition');
        setDescription(
          `Commemorating the Raman Effect, young scientists from Grades 4 to 10 exhibited 120+ working scientific models spanning renewable energy, hydroponics, hydraulic bridges, and smart irrigation systems.\n\nParents and visiting educators engaged directly with student inventors during interactive demonstrations.`
        );
        setHighlights(['120+ Working Scientific Models', 'Hydroponics & Solar Demos', 'Interactive Science Arena', 'Best Junior Innovator Award']);
        setCoverImage(PRESET_EVENT_IMAGES[3].url);
        break;
    }
    showFeedback(`Applied "${type.toUpperCase()}" template! You can now customize details.`);
  };

  // Save / Publish Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showFeedback('Please provide a title for the event.', 'error');
      return;
    }

    if (!description.trim()) {
      showFeedback('Please enter the event report / matter writeup.', 'error');
      return;
    }

    const finalCover = coverImage.trim() || PRESET_EVENT_IMAGES[0].url;
    const finalGallery = galleryImages.length > 0 ? galleryImages : [finalCover];

    if (editingEventId) {
      // Update existing event
      const updated = updateStoredEvent(editingEventId, {
        title: title.trim(),
        category,
        date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        location: location.trim() || 'Nagarjuna School Campus',
        staffInCharge: staffInCharge.trim() || (activeStaff ? activeStaff.name : 'Faculty Coordinator'),
        description: description.trim(),
        image: finalCover,
        galleryImages: finalGallery,
        highlights: highlights,
      });

      if (updated) {
        showFeedback(`Event "${updated.title}" updated and published!`);
      }
    } else {
      // Create new event
      const newEvt = addStoredEvent({
        title: title.trim(),
        category,
        date: date.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        location: location.trim() || 'Nagarjuna School Campus',
        staffInCharge: staffInCharge.trim() || (activeStaff ? activeStaff.name : 'Faculty Coordinator'),
        description: description.trim(),
        image: finalCover,
        galleryImages: finalGallery,
        highlights: highlights,
      });
      showFeedback(`New event "${newEvt.title}" published to website!`);
    }

    // Refresh events and switch to manage tab
    setEvents(getStoredEvents());
    onEventsUpdated();
    handleResetForm();
    setActiveTab('manage');
  };

  // Delete / Remove event
  const handleDeleteEvent = (id: string, eventTitle: string) => {
    const success = deleteStoredEvent(id);
    if (success) {
      setEvents(getStoredEvents());
      onEventsUpdated();
      setDeleteConfirmId(null);
      showFeedback(`Event "${eventTitle}" was removed successfully.`);
      if (editingEventId === id) {
        handleResetForm();
      }
    }
  };

  // Restore Default Events
  const handleResetToDefaults = () => {
    if (window.confirm('Reset all events to default school records? This will restore the original demo events.')) {
      const restored = resetStoredEvents();
      setEvents(restored);
      onEventsUpdated();
      handleResetForm();
      showFeedback('School events have been restored to defaults.');
    }
  };

  // Filtered list for Manage view
  const filteredEvents = events.filter((evt) => {
    const matchesCategory = selectedFilterCategory === 'All' || evt.category === selectedFilterCategory;
    const matchesSearch =
      searchQuery === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.location && evt.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="staff-events" className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Ambient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Faculty & Event Publisher Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Staff Event & Media Manager
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Authorized faculty console to write event reports, upload multi-photo galleries, and edit or remove held school events on the live website.
            </p>
          </div>

          {/* Quick Status / Login Summary Badge */}
          <div className="flex items-center gap-3">
            {activeStaff ? (
              <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 p-2.5 sm:px-4 rounded-2xl">
                <img
                  src={activeStaff.avatar}
                  alt={activeStaff.name}
                  className="w-10 h-10 rounded-xl object-cover border border-sky-400/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{activeStaff.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400">{activeStaff.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-slate-400 hover:text-rose-400 p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold"
                  title="Log out of Staff Portal"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="bg-blue-950/60 border border-blue-800/60 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs text-sky-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Sign in below to add, edit, or remove school events.</span>
              </div>
            )}
          </div>
        </div>

        {/* Global Feedback Toast if active */}
        {feedbackMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2 ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-rose-950/80 border-rose-700 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedbackMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{feedbackMessage.text}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Interface: Logged-in vs Logged-out views */}
        {!activeStaff ? (
          /* ================= 1. ON-PAGE STAFF LOGIN CARD ================= */
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column: Login Form */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <LogIn className="w-5 h-5 text-sky-400" />
                    <span>Staff Authentication</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your Faculty credentials to access event publishing tools.
                  </p>
                </div>

                {loginError && (
                  <div className="bg-rose-950/60 border border-rose-800 p-3 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Staff ID or Full Name
                    </label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="e.g. Dr. Anand Verma or STAFF-ADMIN"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Password / Security PIN
                    </label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Sign In to Staff Console</span>
                  </button>
                </form>
              </div>

              {/* Right Column: 1-Click Demo Profiles */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Quick Faculty Access (Demo):
                  </h4>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
                    1-Click
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Select any faculty profile below to instantly test adding, editing, or deleting events:
                </p>

                <div className="space-y-2 pt-1">
                  {DEMO_STAFF_ACCOUNTS.map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => handleQuickLogin(staff)}
                      type="button"
                      className="w-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 hover:border-sky-500/50 p-2.5 rounded-xl flex items-center gap-3 text-left transition-all group"
                    >
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="w-9 h-9 rounded-lg object-cover border border-slate-600 group-hover:border-sky-400"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                          {staff.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{staff.role}</p>
                      </div>
                      <span className="text-[11px] font-bold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                        Login &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= 2. ON-PAGE STAFF MANAGEMENT & EDITOR WORKSPACE ================= */
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Top Workspace Navigation Bar */}
            <div className="bg-slate-900/90 border-b border-slate-700/80 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'manage'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Events Directory ({events.length})</span>
                </button>

                <button
                  onClick={handleStartAddNew}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'editor' && !editingEventId
                      ? 'bg-emerald-600 text-white shadow-md'
                      : activeTab === 'editor' && editingEventId
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {editingEventId ? (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editing: {title ? title.slice(0, 18) + '...' : 'Event'}</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5 text-emerald-300" />
                      <span>+ Create New Event</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetToDefaults}
                  className="text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                  title="Reset events to original default dataset"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: ALL EVENTS MANAGER TABLE / GRID */}
            {activeTab === 'manage' && (
              <div className="p-4 sm:p-6 space-y-6">
                {/* Search and Category Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                    {['All', 'Celebration', 'Robotics & AI', 'Sports', 'Cultural', 'Exhibition', 'Annual Day'].map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedFilterCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            selectedFilterCategory === cat
                              ? 'bg-sky-500 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search title, matter..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Events Cards / Table */}
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-slate-900/90 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-slate-600 transition-all flex flex-col justify-between group shadow-lg"
                      >
                        <div>
                          {/* Image Banner */}
                          <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="bg-slate-900/90 backdrop-blur-md text-sky-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-slate-700">
                                {evt.category}
                              </span>
                            </div>
                            {evt.galleryImages && evt.galleryImages.length > 1 && (
                              <span className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <ImageIcon className="w-3 h-3 text-sky-400" />
                                <span>{evt.galleryImages.length} photos</span>
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <Calendar className="w-3 h-3 text-sky-400" />
                              <span>{evt.date}</span>
                              <span>•</span>
                              <span className="truncate max-w-[120px]">{evt.location}</span>
                            </div>

                            <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                              {evt.title}
                            </h4>

                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {evt.description}
                            </p>

                            <p className="text-[10px] text-slate-500 font-semibold pt-1">
                              In-Charge: {evt.staffInCharge || 'Faculty Coordinator'}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setPreviewModalEvent(evt)}
                            className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 hover:bg-slate-800 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(evt)}
                              className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-500/30 transition-all flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>

                            {deleteConfirmId === evt.id ? (
                              <div className="flex items-center gap-1 bg-rose-950 p-1 rounded-xl border border-rose-800 animate-in fade-in">
                                <span className="text-[10px] text-rose-300 font-bold px-1">Delete?</span>
                                <button
                                  onClick={() => handleDeleteEvent(evt.id, evt.title)}
                                  className="bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-lg"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(evt.id)}
                                className="text-slate-400 hover:text-rose-400 p-1.5 hover:bg-rose-950/50 rounded-xl transition-colors"
                                title="Remove / Delete this event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
                    <FolderOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-300">No events matched your search.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFilterCategory('All');
                      }}
                      className="mt-2 text-xs text-sky-400 font-bold hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: EVENT EDITOR (CREATE OR EDIT EVENT) */}
            {activeTab === 'editor' && (
              <form onSubmit={handleSaveEvent} className="p-4 sm:p-8 space-y-8">
                {/* Form Header Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                      {editingEventId ? (
                        <>
                          <Edit3 className="w-5 h-5 text-amber-400" />
                          <span>Edit Event Report & Photos</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-5 h-5 text-emerald-400" />
                          <span>Publish New School Event / Celebration</span>
                        </>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill in the event information, writeup matter, and upload photos to publish to the school website.
                    </p>
                  </div>

                  {/* Pre-fill Quick Templates */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold uppercase text-slate-400 mr-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Templates:
                    </span>
                    <button
                      type="button"
                      onClick={() => applyWriteupTemplate('robotics')}
                      className="px-2 py-1 bg-slate-700/80 hover:bg-slate-700 text-sky-300 text-[10px] font-bold rounded-lg border border-slate-600"
                    >
                      Robotics
                    </button>
                    <button
                      type="button"
                      onClick={() => applyWriteupTemplate('sports')}
                      className="px-2 py-1 bg-slate-700/80 hover:bg-slate-700 text-emerald-300 text-[10px] font-bold rounded-lg border border-slate-600"
                    >
                      Sports
                    </button>
                    <button
                      type="button"
                      onClick={() => applyWriteupTemplate('cultural')}
                      className="px-2 py-1 bg-slate-700/80 hover:bg-slate-700 text-purple-300 text-[10px] font-bold rounded-lg border border-slate-600"
                    >
                      Annual Day
                    </button>
                    <button
                      type="button"
                      onClick={() => applyWriteupTemplate('celebration')}
                      className="px-2 py-1 bg-slate-700/80 hover:bg-slate-700 text-amber-300 text-[10px] font-bold rounded-lg border border-slate-600"
                    >
                      National Day
                    </button>
                    <button
                      type="button"
                      onClick={() => applyWriteupTemplate('science')}
                      className="px-2 py-1 bg-slate-700/80 hover:bg-slate-700 text-cyan-300 text-[10px] font-bold rounded-lg border border-slate-600"
                    >
                      Science Expo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left 2 Columns: Core Matter & Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Event Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Event Title / Headline *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. 79th Independence Day Celebration & Parade"
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    {/* Category, Date, Location, Staff in charge in a 2x2 grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Category *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as EventItem['category'])}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                        >
                          <option value="Celebration">Celebration / National Day</option>
                          <option value="Robotics & AI">Robotics & AI Lab Event</option>
                          <option value="Sports">Sports & Athletics</option>
                          <option value="Cultural">Cultural & Arts</option>
                          <option value="Exhibition">Exhibition & Science Expo</option>
                          <option value="Annual Day">Annual Day & Convocation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Date Held / Scheduled *
                        </label>
                        <input
                          type="text"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder="e.g. August 15, 2026"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Location / Venue
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. School Amphitheatre / Sports Ground"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                          Staff Coordinator In-Charge
                        </label>
                        <input
                          type="text"
                          value={staffInCharge}
                          onChange={(e) => setStaffInCharge(e.target.value)}
                          placeholder="e.g. Mrs. Sunita Rao"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Event Matter / Full Report */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Event Matter & Full Writeup Report *
                        </label>
                        <span className="text-[11px] text-slate-500">
                          {description.length} characters
                        </span>
                      </div>
                      <textarea
                        required
                        rows={7}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write the full report, proceedings, student participation details, key speeches, winners, and chief guest comments..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                      />
                    </div>

                    {/* Key Highlights & Tags */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Key Highlights / Honors (Optional)
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddHighlight();
                            }
                          }}
                          placeholder="e.g. 1st Prize in Inter-School Coding"
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddHighlight}
                          className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                        >
                          Add Tag
                        </button>
                      </div>

                      {highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {highlights.map((h, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-950/80 border border-blue-800 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1.5"
                            >
                              <span>✓ {h}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveHighlight(idx)}
                                className="text-slate-400 hover:text-rose-400 ml-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Cover Image & Multi-Photo Album */}
                  <div className="space-y-6">
                    {/* Cover Photo */}
                    <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-sky-400" />
                        <span>Cover Photograph</span>
                      </h4>

                      {/* Preview */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                            <ImageIcon className="w-8 h-8 mb-1" />
                            <span>No cover selected</span>
                          </div>
                        )}
                      </div>

                      {/* Upload from Computer */}
                      <div>
                        <label className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md">
                          <Upload className="w-4 h-4" />
                          <span>Upload From Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Preset selector */}
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 mb-1.5">
                          Or pick from School Presets:
                        </p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {PRESET_EVENT_IMAGES.slice(0, 6).map((img, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setCoverImage(img.url);
                                if (!galleryImages.includes(img.url)) {
                                  setGalleryImages((prev) => [img.url, ...prev]);
                                }
                              }}
                              className={`relative aspect-video rounded-lg overflow-hidden border transition-all ${
                                coverImage === img.url
                                  ? 'border-sky-400 ring-2 ring-sky-400'
                                  : 'border-slate-700 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom URL Input */}
                      <div>
                        <input
                          type="url"
                          value={coverImage}
                          onChange={(e) => setCoverImage(e.target.value)}
                          placeholder="Or paste Image URL (https://...)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-[11px] text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Additional Photo Gallery Album */}
                    <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <span>Photo Album Gallery</span>
                        </h4>
                        <span className="text-[11px] text-slate-400 font-bold">
                          {galleryImages.length} Photos
                        </span>
                      </div>

                      {/* Gallery Upload Button */}
                      <label className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-sky-400" />
                        <span>Add Photos from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryFilesUpload}
                          className="hidden"
                        />
                      </label>

                      {/* URL Add */}
                      <div className="flex gap-1.5">
                        <input
                          type="url"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          placeholder="Or paste photo URL..."
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-[11px] text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddGalleryUrl}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold px-3 rounded-xl"
                        >
                          Add
                        </button>
                      </div>

                      {/* Thumbnail grid with remove */}
                      {galleryImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 pt-1">
                          {galleryImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 group"
                            >
                              <img src={img} alt={`Album ${idx}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="absolute inset-0 bg-rose-950/80 text-rose-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                title="Remove photo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Bottom Save & Cancel Controls */}
                <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleResetForm();
                      setActiveTab('manage');
                    }}
                    className="w-full sm:w-auto text-xs font-bold text-slate-400 hover:text-white px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    Cancel & Back to Directory
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-300" />
                      <span>
                        {editingEventId ? 'Save & Update Event Matter' : 'Publish Event to School Website'}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Quick Preview Modal if triggered */}
      {previewModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-700 overflow-hidden text-slate-100 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={previewModalEvent.image}
                alt={previewModalEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setPreviewModalEvent(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {previewModalEvent.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1 drop-shadow-md">
                  {previewModalEvent.title}
                </h3>
              </div>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{previewModalEvent.date}</span>
                <span>•</span>
                <span>{previewModalEvent.location}</span>
                <span>•</span>
                <span>Report by: {previewModalEvent.staffInCharge || 'Faculty'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {previewModalEvent.description}
              </p>
            </div>
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewModalEvent(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
