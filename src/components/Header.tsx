import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events & Media', href: '#events' },
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
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
    </>
  );
};
