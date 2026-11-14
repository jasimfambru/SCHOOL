import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 text-slate-800 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-black text-[#0f1f4d]">Admission Enquiry</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">Tell us about your child and we will get back to you.</p>
        <EnquiryForm onDone={onClose} />
      </div>
    </div>
  );
};
