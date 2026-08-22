import React, { useState } from 'react';
import { X, User, Lock, CheckCircle2, Key, ShieldCheck } from 'lucide-react';

interface PortalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'student' | 'parent' | 'teacher';
  onOpenStaffPortal?: () => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  onOpenStaffPortal,
}) => {
  const [role, setRole] = useState<'student' | 'parent' | 'teacher'>(initialRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'teacher') {
      onClose();
      if (onOpenStaffPortal) {
        onOpenStaffPortal();
      }
      return;
    }
    setIsLoggedIn(true);
  };

  const fillDemoCreds = () => {
    if (role === 'student') {
      setUsername('STU-2026-092');
      setPassword('demo1234');
    } else if (role === 'parent') {
      setUsername('PAR-9876543210');
      setPassword('parentPass2026');
    } else {
      setUsername('TCH-FACULTY-12');
      setPassword('facultyPass');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-md p-6 sm:p-8 text-slate-800 shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Welcome to Nagarjuna Portal!
            </h3>
            <p className="text-xs text-slate-600">
              Authenticated as <strong className="text-blue-600">{username}</strong> ({role.toUpperCase()} PORTAL). Accessing report cards, attendance logs, homework feeds & online fees...
            </p>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                onClose();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-2xl shadow-md shadow-blue-500/20"
            >
              Enter Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                Nagarjuna Campus Portal
              </h3>
              <p className="text-slate-500 font-medium">Select portal role and sign in</p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-white/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
              {(['student', 'parent', 'teacher'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl font-bold capitalize transition-all ${
                    role === r
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'teacher' ? 'Staff / Teacher' : r}
                </button>
              ))}
            </div>

            {role === 'teacher' && (
              <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl text-[11px] text-blue-800 flex items-center justify-between">
                <span>📸 Upload school events, photos & reports</span>
                {onOpenStaffPortal && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenStaffPortal();
                    }}
                    className="font-bold text-blue-600 hover:underline shrink-0 ml-2"
                  >
                    Event Manager &rarr;
                  </button>
                )}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {role === 'student' ? 'Student Registration ID' : role === 'parent' ? 'Registered Phone / Parent ID' : 'Faculty ID'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter ID"
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-10 pr-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-10 pr-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={fillDemoCreds}
                  className="text-amber-600 hover:underline flex items-center gap-1 font-bold"
                >
                  <Key className="w-3 h-3" /> Auto-fill Demo Credentials
                </button>
                <a href="#" className="text-slate-500 hover:text-slate-800 font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all"
              >
                Sign In to {role.toUpperCase()} Portal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
