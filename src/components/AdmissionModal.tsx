import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Send, FileText } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: 'Male',
    gradeApplying: 'Class I',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    previousSchool: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-xl p-6 sm:p-8 text-slate-800 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-black text-slate-900">
            Online Admission Application 2026-27
          </h3>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-900">
              Application Submitted Successfully!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Application ID: <strong className="text-amber-600 font-mono">NS-2026-8842</strong>. Our admissions officer will contact <strong className="text-slate-900">{formData.parentName}</strong> at <strong className="text-blue-600">{formData.parentPhone}</strong> for document verification and campus interaction schedule.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md shadow-blue-500/20"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 font-semibold text-slate-400">
              <span className={step >= 1 ? 'text-blue-600 font-extrabold' : ''}>1. Student Details</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-blue-600 font-extrabold' : ''}>2. Parent & Contact</span>
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter student's full name"
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Applying Grade / Class *</label>
                  <select
                    value={formData.gradeApplying}
                    onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  >
                    <option>Nursery / LKG / UKG</option>
                    <option>Class I - V (Primary)</option>
                    <option>Class VI - VIII (Middle)</option>
                    <option>Class IX - X (Secondary)</option>
                    <option>Class XI - XII (STEM & AI Track)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-2xl text-white transition-all text-center mt-2 shadow-md shadow-blue-500/20"
                >
                  Next Step: Parent Info →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Parent's full name"
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House No, Area, City"
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 font-bold py-3 rounded-2xl text-slate-700 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
