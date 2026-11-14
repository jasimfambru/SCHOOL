import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  getActiveStaffUser,
  setStaffUserSession,
  StaffUser,
} from '../utils/eventStorage';
import { StaffLoginModal } from './StaffLoginModal';

interface HeaderProps {
  onOpenApplyModal: () => void;
  onOpenFeeModal: () => void;
  onOpenRouteTrackerModal: () => void;
  onOpenProspectusModal: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApplyModal,
  onOpenFeeModal,
  onOpenRouteTrackerModal,
  onOpenProspectusModal,
  darkMode,
  setDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStaff, setActiveStaff] = useState<StaffUser | null>(() => getActiveStaffUser());
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleAuth = (e: Event) => {
      const customEvent = e as CustomEvent<StaffUser | null>;
      setActiveStaff(customEvent.detail !== undefined ? customEvent.detail : getActiveStaffUser());
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('nagarjuna_staff_auth_changed', handleAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('nagarjuna_staff_auth_changed', handleAuth);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events & Media', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Computer Lab', href: '#computer-lab' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Main Navbar - Frosted Glass */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/75 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-white/80 py-3'
            : 'bg-white/60 backdrop-blur-lg py-4 border-b border-white/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Nagarjuna Public School logo" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                  NAGARJUNA
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-blue-600 font-semibold uppercase">
                School
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs xl:text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 px-3.5 py-2 rounded-xl transition-all font-semibold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Staff Status / Portal Button */}
            {activeStaff ? (
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[100px]">Staff: {activeStaff.name.split(' ')[0]}</span>
                <button
                  onClick={() => setStaffUserSession(null)}
                  className="text-slate-400 hover:text-rose-600 ml-1 p-0.5 transition-colors"
                  title="Staff sign out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsStaffLoginOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100/80 hover:bg-blue-50 border border-slate-200/80 px-3 py-2 rounded-full transition-all"
                title="Staff Login for Events & Campus Simulator"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Staff Portal</span>
              </button>
            )}

            <a
              href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Hello%20Nagarjuna%20School,%20I%20would%20like%20to%20know%20details%20of%20the%20school%20and%20admissions.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-full transition-all"
              title="Chat on WhatsApp for School Details & Admissions"
            >
              <span>💬 WhatsApp Admissions</span>
            </a>
            <button
              onClick={onOpenApplyModal}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-sky-400 hover:bg-slate-900 px-3 py-2 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${SCHOOL_INFO.phoneRaw}`}
                  className="text-center py-2 px-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold flex items-center justify-center gap-1"
                >
                  📞 {SCHOOL_INFO.phone}
                </a>
                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Hello%20Nagarjuna%20School,%20I%20would%20like%20to%20know%20details%20of%20the%20school%20and%20admissions.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2 px-3 rounded-xl bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700 font-semibold flex items-center justify-center gap-1"
                >
                  💬 WhatsApp
                </a>
              </div>
              {/* Staff Access in Mobile Menu */}
              <div className="pt-1">
                {activeStaff ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/60 text-xs text-blue-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Staff: {activeStaff.name}</span>
                    </div>
                    <button
                      onClick={() => setStaffUserSession(null)}
                      className="text-xs text-rose-300 hover:text-rose-100 font-bold bg-rose-500/20 px-2 py-1 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsStaffLoginOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Staff Portal Login</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplyModal();
                }}
                className="w-full text-center text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 py-3 rounded-xl shadow-lg"
              >
                🎓 Apply for Admission 2026-27
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Staff Login Modal */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        title="Staff Portal Authentication"
        subtitle="Sign in with official Nagarjuna staff credentials (satff@nagarjuna.school / staff@2026) to manage campus simulator photos and publish events."
        onSuccess={(user) => {
          setActiveStaff(user);
        }}
      />
    </>
  );
};
