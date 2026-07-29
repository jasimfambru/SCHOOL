import React from 'react';
import { X, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-lg p-6 sm:p-8 text-slate-800 shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Official School Prospectus 2026-27
            </h3>
            <p className="text-xs text-slate-500">
              Complete guide to academic vision, STEM labs, and campus rules
            </p>
          </div>
        </div>

        <div className="bg-white/80 p-5 rounded-2xl border border-slate-200/60 space-y-2.5 text-xs text-slate-700 mb-5 shadow-xs font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Comprehensive CBSE Curriculum & Grading Breakdown</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Robotics & AI Lab Equipment & Python Tracks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Sports Arena Facilities & Olympic Coach Profiles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Transport Routes & Fee Structure Matrix</span>
          </div>
        </div>

        <a
          href="#download-prospectus"
          onClick={() => {
            alert('Prospectus 2026-27 PDF download initiated!');
            onClose();
          }}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all text-xs"
        >
          <Download className="w-4 h-4" />
          <span>Download High-Res PDF Prospectus (12.4 MB)</span>
        </a>
      </div>
    </div>
  );
};
