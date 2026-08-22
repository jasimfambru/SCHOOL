import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  User,
  Upload,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Tag,
  FileText,
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  Sparkles,
  LogOut,
  Eye,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  FolderPlus,
} from 'lucide-react';
import { EventItem } from '../types';
import {
  StaffUser,
  DEMO_STAFF_ACCOUNTS,
  PRESET_EVENT_IMAGES,
  getStoredEvents,
  addStoredEvent,
  updateStoredEvent,
  deleteStoredEvent,
  getActiveStaffUser,
  setStaffUserSession,
} from '../utils/eventStorage';

interface StaffEventPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventsUpdated: () => void;
  initialEventToEdit?: EventItem | null;
}

export const StaffEventPortalModal: React.FC<StaffEventPortalModalProps> = ({
  isOpen,
  onClose,
  onEventsUpdated,
  initialEventToEdit,
}) => {
  // Staff Auth State
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(getActiveStaffUser());
  const [staffIdInput, setStaffIdInput] = useState('STAFF-ADMIN');
  const [passwordInput, setPasswordInput] = useState('faculty123');
  const [authError, setAuthError] = useState('');

  // Dashboard Navigation
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State for Event Matter & Images
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Celebration');
  const [date, setDate] = useState(
    new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  );
  const [location, setLocation] = useState('Main Auditorium & Campus Quadrangle');
  const [staffInCharge, setStaffInCharge] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_EVENT_IMAGES[0].url);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState('');
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const categories: EventItem['category'][] = [
    'Celebration',
    'Robotics & AI',
    'Sports',
    'Cultural',
    'Exhibition',
    'Academic',
    'Annual Day',
  ];

  // Refresh events list
  const reloadEvents = () => {
    const data = getStoredEvents();
    setEventsList(data);
  };

  useEffect(() => {
    if (isOpen) {
      const user = getActiveStaffUser();
      setCurrentUser(user);
      reloadEvents();

      if (initialEventToEdit) {
        populateFormForEdit(initialEventToEdit);
      } else if (user && !staffInCharge) {
        setStaffInCharge(`${user.name} (${user.department})`);
      }
    }
  }, [isOpen, initialEventToEdit]);

  // Handle Login
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const matched = DEMO_STAFF_ACCOUNTS.find(
      (acc) => acc.id.toLowerCase() === staffIdInput.trim().toLowerCase()
    );

    if (matched) {
      setCurrentUser(matched);
      setStaffUserSession(matched);
      setStaffInCharge(`${matched.name} (${matched.department})`);
      showToast(`Welcome back, ${matched.name}!`);
    } else {
      // Allow custom staff ID for convenience
      const customUser: StaffUser = {
        id: staffIdInput.trim().toUpperCase(),
        name: 'Staff Coordinator',
        department: 'Event Management Team',
        role: 'Faculty In-Charge',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        token: `token-${Date.now()}`,
      };
      setCurrentUser(customUser);
      setStaffUserSession(customUser);
      setStaffInCharge(`${customUser.name} (${customUser.department})`);
      showToast(`Staff access granted for ${customUser.id}!`);
    }
  };

  // Quick select demo staff
  const selectDemoStaff = (acc: StaffUser) => {
    setStaffIdInput(acc.id);
    setPasswordInput('faculty123');
    setCurrentUser(acc);
    setStaffUserSession(acc);
    setStaffInCharge(`${acc.name} (${acc.department})`);
    showToast(`Logged in as ${acc.name} (${acc.role})`);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setStaffUserSession(null);
    setEditingEventId(null);
    resetForm();
    showToast('Staff signed out successfully');
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setCategory('Celebration');
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setLocation('Main Auditorium & Campus Quadrangle');
    setDescription('');
    setCoverImage(PRESET_EVENT_IMAGES[0].url);
    setGalleryImages([]);
    setCustomImageUrl('');
    setHighlights([]);
    setHighlightInput('');
    setEditingEventId(null);
    if (currentUser) {
      setStaffInCharge(`${currentUser.name} (${currentUser.department})`);
    }
  };

  // Populate form for editing
  const populateFormForEdit = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setTitle(evt.title);
    setCategory(evt.category);
    setDate(evt.date);
    setLocation(evt.location);
    setDescription(evt.description);
    setCoverImage(evt.image);
    setGalleryImages(evt.galleryImages || []);
    setHighlights(evt.highlights || []);
    setStaffInCharge(evt.staffInCharge || (currentUser ? currentUser.name : ''));
    setActiveTab('upload');
  };

  // Handle file uploads (cover image)
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoverImage(reader.result);
          showToast('Cover photo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery files upload
  const handleGalleryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList: File[] = Array.from(files);
      fileList.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      showToast(`${files.length} event photo(s) added to gallery!`);
    }
  };

  // Add highlight tag
  const addHighlight = () => {
    if (highlightInput.trim() && !highlights.includes(highlightInput.trim())) {
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput('');
    }
  };

  // Remove highlight tag
  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Insert sample template matter
  const insertSampleMatter = () => {
    const sample = `Nagarjuna Public School organized the ${title || 'Grand Campus Event'} on ${date} at the ${location} with great enthusiasm and active participation from students, faculty, and esteemed guests.

The program commenced with an inaugural welcome address and ceremonial lamp lighting. Students presented captivating demonstrations, musical performances, and exhibitions highlighting their talents and hard work.

Key speakers emphasized the importance of holistic development, creative exploration, and perseverance. The event concluded with the distribution of commendation certificates and medals to the winning teams, followed by a heartfelt vote of thanks.`;
    setDescription(sample);
    if (highlights.length === 0) {
      setHighlights([
        'Inaugural Address & Lamp Lighting',
        'Over 150+ Student Participants',
        'Merit Trophy & Award Ceremony',
      ]);
    }
    showToast('Sample event matter template inserted!');
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 3500);
  };

  // Handle Event Submit (Save / Upload)
  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an event title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter the event matter / description.');
      return;
    }

    const eventPayload: Omit<EventItem, 'id'> = {
      title: title.trim(),
      category,
      date: date.trim(),
      location: location.trim(),
      description: description.trim(),
      image: coverImage || PRESET_EVENT_IMAGES[0].url,
      galleryImages: galleryImages.length > 0 ? galleryImages : [coverImage],
      staffInCharge: staffInCharge.trim() || (currentUser ? currentUser.name : 'Staff Coordinator'),
      highlights: highlights.length > 0 ? highlights : ['Campus Event', 'Student Excellence'],
      isPublished: true,
    };

    if (editingEventId) {
      updateStoredEvent(editingEventId, eventPayload);
      showToast('Event & matter updated successfully!');
    } else {
      addStoredEvent(eventPayload);
      showToast('New event & matter published to website!');
    }

    reloadEvents();
    onEventsUpdated();
    resetForm();
    setActiveTab('manage');
  };

  // Handle Delete Event
  const handleDeleteEvent = (id: string, eventTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      deleteStoredEvent(id);
      reloadEvents();
      onEventsUpdated();
      showToast(`Deleted event "${eventTitle}"`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Nagarjuna Staff & Faculty Portal
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Event Publisher
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Upload images, reports, and writeups for school held events
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Alert */}
        {isSuccessToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 flex items-center justify-between shadow-inner animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setIsSuccessToast(false)} className="opacity-80 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70">
          {!currentUser ? (
            /* =================== STAFF LOGIN SCREEN =================== */
            <div className="max-w-md mx-auto my-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Staff & Faculty Login</h4>
                <p className="text-xs text-slate-500">
                  Please log in with your official staff credentials to post event images and reports.
                </p>
              </div>

              <form onSubmit={handleStaffLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Staff / Faculty ID</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={staffIdInput}
                      onChange={(e) => setStaffIdInput(e.target.value)}
                      placeholder="e.g. STAFF-ADMIN or TCH-102"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 py-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-3.5 py-2.5 font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                {authError && <p className="text-rose-600 font-bold">{authError}</p>}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Log In to Event Manager</span>
                </button>
              </form>

              {/* 1-Click Demo Staff Logins */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Quick 1-Click Demo Staff Logins
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_STAFF_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => selectDemoStaff(acc)}
                      className="text-left p-2.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center gap-2.5 group bg-white shadow-2xs"
                    >
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                          {acc.name}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">{acc.department}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* =================== STAFF DASHBOARD SCREEN =================== */
            <div className="space-y-6">
              {/* Authenticated Staff Top Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {currentUser.name}
                      </h4>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {currentUser.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Dept: <strong className="text-slate-700">{currentUser.department}</strong> • ID: {currentUser.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('upload')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                        activeTab === 'upload'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingEventId ? 'Edit Event' : 'Upload Event & Matter'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('manage')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                        activeTab === 'manage'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>All Events ({eventsList.length})</span>
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Sign Out Staff"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {activeTab === 'upload' ? (
                /* =================== TAB 1: UPLOAD EVENT FORM =================== */
                <form onSubmit={handleSubmitEvent} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Event Metadata & Matter */}
                  <div className="lg:col-span-7 space-y-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h5 className="text-sm font-bold text-slate-900">
                          {editingEventId ? 'Edit Event Details' : 'New School Event & Report Writeup'}
                        </h5>
                      </div>
                      {editingEventId && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="text-xs text-amber-600 font-bold hover:underline"
                        >
                          Cancel Edit & Start New
                        </button>
                      )}
                    </div>

                    {/* Event Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Event Title / Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. 78th Independence Day Grand Celebration, Annual Science Expo 2026..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                      />
                    </div>

                    {/* Category & Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as EventItem['category'])}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Event Held Date <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="e.g. August 15, 2026"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location & In-Charge Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Venue / Location
                        </label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Main Auditorium, Sports Arena..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Staff In-Charge / Author
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={staffInCharge}
                            onChange={(e) => setStaffInCharge(e.target.value)}
                            placeholder="e.g. Dr. Anand Verma (AI Lab)"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Event Matter / Writeup */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">
                          Event Matter / Report Writeup <span className="text-rose-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={insertSampleMatter}
                          className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" /> Auto-Fill Sample Matter
                        </button>
                      </div>
                      <textarea
                        required
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write detailed event highlights, speeches, activities conducted, student participants, winning houses, and chief guest remarks..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 leading-relaxed focus:bg-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                      />
                    </div>

                    {/* Highlights / Key Bullets */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Key Highlights & Accolades (Optional)
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={highlightInput}
                          onChange={(e) => setHighlightInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addHighlight();
                            }
                          }}
                          placeholder="e.g. '1st Place in Relay Race', '45+ Working Models'..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={addHighlight}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      </div>
                      {highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {highlights.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-blue-100"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => removeHighlight(idx)}
                                className="text-blue-400 hover:text-rose-600"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Image & Photo Gallery Uploads */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Cover Photo Upload Box */}
                    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-blue-600" />
                          <span>Primary Cover Photo</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPresetPicker(!showPresetPicker)}
                          className="text-[11px] text-blue-600 font-bold hover:underline"
                        >
                          {showPresetPicker ? 'Hide Library' : 'Browse Presets'}
                        </button>
                      </div>

                      {/* Cover Photo Preview */}
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                        <img
                          src={coverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/90 hover:bg-white text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1"
                          >
                            <Upload className="w-3 h-3" /> Change File
                          </button>
                        </div>
                      </div>

                      {/* File Upload Trigger */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-200/80 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upload From Computer</span>
                        </button>
                      </div>

                      {/* Image URL input option */}
                      <div>
                        <input
                          type="url"
                          value={customImageUrl}
                          onChange={(e) => {
                            setCustomImageUrl(e.target.value);
                            if (e.target.value.startsWith('http')) {
                              setCoverImage(e.target.value);
                            }
                          }}
                          placeholder="Or paste direct image URL..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 outline-none"
                        />
                      </div>

                      {/* Preset Picker Modal/Drawer */}
                      {showPresetPicker && (
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[11px] font-bold text-slate-600">Select School Event Photo:</p>
                          <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
                            {PRESET_EVENT_IMAGES.map((img, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => {
                                  setCoverImage(img.url);
                                  setShowPresetPicker(false);
                                  showToast(`Selected "${img.label}"`);
                                }}
                                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                                  coverImage === img.url ? 'border-blue-600 scale-95' : 'border-transparent hover:opacity-80'
                                }`}
                              >
                                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Multiple Gallery Photos Upload */}
                    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FolderPlus className="w-4 h-4 text-emerald-600" />
                          <span>Event Photo Album ({galleryImages.length} Photos)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-xl border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Photos
                        </button>
                      </div>

                      <input
                        ref={galleryFileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryFilesUpload}
                        className="hidden"
                      />

                      {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2">
                          {galleryImages.map((gImg, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200">
                              <img src={gImg} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(idx)}
                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-4 text-center cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                          <p className="text-xs font-bold text-slate-600">Upload multiple event photos</p>
                          <p className="text-[10px] text-slate-400">Add stage shots, award ceremony, student groups</p>
                        </div>
                      )}
                    </div>

                    {/* Publish Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{editingEventId ? 'Save & Update Event' : 'Publish Event to Website'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* =================== TAB 2: MANAGE EXISTING EVENTS =================== */
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h5 className="text-sm sm:text-base font-black text-slate-900">
                        Published Events & Activities ({eventsList.length})
                      </h5>
                      <p className="text-xs text-slate-500">
                        Live events currently displayed on the Nagarjuna Public School website
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        resetForm();
                        setActiveTab('upload');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Upload Event</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {eventsList.map((evt) => (
                      <div
                        key={evt.id}
                        className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3.5 overflow-hidden">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-16 h-14 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-2xs"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                                {evt.category}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {evt.date}
                              </span>
                            </div>
                            <h6 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {evt.title}
                            </h6>
                            <p className="text-[11px] text-slate-500 truncate max-w-lg">
                              {evt.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => populateFormForEdit(evt)}
                            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors flex items-center gap-1 text-xs font-bold"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id, evt.title)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
