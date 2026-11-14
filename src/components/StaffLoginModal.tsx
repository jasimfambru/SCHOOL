import React, { useState } from 'react';
import { X, ShieldCheck, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { signInStaff, StaffUser } from '../utils/eventStorage';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: StaffUser) => void;
  title?: string;
  subtitle?: string;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Staff Portal Authentication',
  subtitle = 'Sign in with official Nagarjuna staff credentials to edit campus simulator photos, upload events, and manage campus media.',
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const result = await signInStaff(email, password);
    setBusy(false);
    if (!result.success || !result.user) {
      setError(result.error || 'Could not sign in.');
      return;
    }

    setPassword('');
    if (onSuccess) {
      onSuccess(result.user);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-sky-200 text-[11px] font-bold uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Staff Access</span>
          </div>
          <h3 className="text-xl font-black">{title}</h3>
          <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">{subtitle}</p>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Staff Email</label>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your staff email"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="w-2/3 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{busy ? 'Signing in...' : 'Sign In'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
