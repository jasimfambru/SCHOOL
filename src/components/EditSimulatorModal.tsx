import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  Check,
  Image as ImageIcon,
  Bot,
  Building,
  Monitor,
  Laptop,
  Trophy,
  Award,
  ShieldCheck,
} from 'lucide-react';
import {
  DEFAULT_HOTSPOTS_CONFIG,
  getCustomSimulatorImages,
  saveCustomSimulatorImage,
  resetCustomSimulatorImage,
  resetAllSimulatorImages,
} from '../utils/simulatorStorage';
import { getStoredEvents, getActiveStaffUser } from '../utils/eventStorage';

interface EditSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHotspotId?: string;
  onImageChange?: () => void;
}

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  robotics: Bot,
  building: Building,
  smart_classroom: Monitor,
  computer: Laptop,
  playground: Trophy,
  auditorium: Award,
  events: Sparkles,
};

export const EditSimulatorModal: React.FC<EditSimulatorModalProps> = ({
  isOpen,
  onClose,
  initialHotspotId = 'robotics',
  onImageChange,
}) => {
  const activeStaff = getActiveStaffUser();
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(initialHotspotId);
  const [customImages, setCustomImages] = useState<Record<string, string>>(getCustomSimulatorImages());
  const [urlInput, setUrlInput] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentConfig =
    DEFAULT_HOTSPOTS_CONFIG.find((h) => h.id === selectedHotspotId) ||
    DEFAULT_HOTSPOTS_CONFIG[0];

  const currentImage = customImages[selectedHotspotId] || currentConfig.defaultImage;
  const isCustom = Boolean(customImages[selectedHotspotId]);

  // Combine default presets with school events if category is events
  const storedEvents = getStoredEvents();
  const extraPresets =
    selectedHotspotId === 'events'
      ? storedEvents.map((e) => e.image).filter(Boolean)
      : [];
  const allPresets = Array.from(new Set([...currentConfig.presets, ...extraPresets]));

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleApplyImage = (newUrl: string) => {
    if (!newUrl.trim()) return;
    const updated = saveCustomSimulatorImage(selectedHotspotId, newUrl.trim());
    setCustomImages(updated);
    setUrlInput('');
    showNotification(`Photo updated for "${currentConfig.label}"!`);
    if (onImageChange) onImageChange();
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        handleApplyImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetCurrent = () => {
    const updated = resetCustomSimulatorImage(selectedHotspotId);
    setCustomImages(updated);
    showNotification(`Restored default photo for "${currentConfig.label}"`);
    if (onImageChange) onImageChange();
  };

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all simulator photos back to original defaults?')) {
      resetAllSimulatorImages();
      setCustomImages({});
      showNotification('All simulator photos reset to defaults');
      if (onImageChange) onImageChange();
    }
  };

  const IconComponent = ICONS_MAP[selectedHotspotId] || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-full max-w-4xl overflow-hidden my-auto relative">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Edit Interactive Campus Simulator Photos
                </h2>
                {activeStaff ? (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Staff: {activeStaff.name}</span>
                  </span>
                ) : (
                  <span className="text-[11px] bg-blue-500/20 text-sky-200 border border-blue-400/40 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-sky-400" />
                    <span>Authorized Staff Portal</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                Upload your school's actual pictures or select from curated campus presets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hotspot Tabs Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {DEFAULT_HOTSPOTS_CONFIG.map((hotspot) => {
            const HIcon = ICONS_MAP[hotspot.id] || Sparkles;
            const isSelected = selectedHotspotId === hotspot.id;
            const hasCustom = Boolean(customImages[hotspot.id]);

            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspotId(hotspot.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <HIcon className="w-3.5 h-3.5" />
                <span>{hotspot.label}</span>
                {hasCustom && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-amber-300' : 'bg-emerald-500'
                    }`}
                    title="Custom photo active"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Toast Notification */}
        {successToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-in fade-in duration-150 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Body Content Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Preview
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isCustom
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isCustom ? 'Custom Photo' : 'Default Preset'}
              </span>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden relative shadow-lg group border border-slate-200">
              <img
                src={currentImage}
                alt={currentConfig.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Hotspot Badge */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-blue-700 shadow-sm flex items-center gap-1.5">
                <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentConfig.badge}</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h4 className="font-bold text-xs sm:text-sm">{currentConfig.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{currentConfig.desc}</p>
              </div>
            </div>

            {/* Reset current button if custom */}
            {isCustom && (
              <button
                onClick={handleResetCurrent}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 py-2.5 rounded-xl transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Default Preset for This Section</span>
              </button>
            )}
          </div>

          {/* Right Column: Edit Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Upload Box */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                1. Upload Photo from your Device (Computer / Mobile)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files?.[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/60'
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 hover:underline">
                    Click to browse
                  </span>{' '}
                  <span className="text-xs text-slate-500">or drag & drop your photo here</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Supports JPG, PNG, WebP (Automatically saved in browser)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Paste URL */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                2. Or Paste an Online Image Link (URL)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/school-photo.jpg"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleApplyImage(urlInput);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => handleApplyImage(urlInput)}
                  disabled={!urlInput.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Apply Link
                </button>
              </div>
            </div>

            {/* Choose from Curated Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                3. Or Choose from High-Definition Presets
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {allPresets.map((presetUrl, idx) => {
                  const isCurrent = currentImage === presetUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleApplyImage(presetUrl)}
                      className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all group ${
                        isCurrent
                          ? 'border-blue-600 ring-2 ring-blue-400/50 scale-102'
                          : 'border-slate-200 hover:border-blue-400 opacity-80 hover:opacity-100'
                      }`}
                      title="Select this preset photo"
                    >
                      <img
                        src={presetUrl}
                        alt={`Preset ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isCurrent && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleResetAll}
            className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition-colors"
          >
            Reset All Hotspots to Defaults
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
            >
              Done / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
