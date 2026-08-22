import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Phone,
  Search,
  User,
  CreditCard,
  Compass,
  Sparkles,
  Bus,
  FileText,
  Moon,
  Sun,
  ShieldCheck,
  Cpu,
  Upload,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { getActiveStaffUser } from '../utils/eventStorage';

interface HeaderProps {
  onOpenApplyModal: () => void;
  onOpenStaffPortal: () => void;
  onOpenFeeModal: () => void;
  onOpenRouteTrackerModal: () => void;
  onOpenProspectusModal: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApplyModal,
  onOpenStaffPortal,
  onOpenFeeModal,
  onOpenRouteTrackerModal,
  onOpenProspectusModal,
  darkMode,
  setDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeStaff = getActiveStaffUser();

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
    { name: 'Staff Editor Hub', href: '#staff-events' },
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
                className="text-xs xl:text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 px-3 py-1.5 rounded-xl transition-all font-semibold"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Staff Event Login / Management Button */}
            <a
              href="#staff-events"
              onClick={(e) => {
                const el = document.getElementById('staff-events');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border ${
                activeStaff
                  ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 shadow-2xs'
                  : 'text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{activeStaff ? `Staff: ${activeStaff.name.split(' ')[0]}` : 'Staff Login & Editor'}</span>
            </a>

            <button
              onClick={onOpenApplyModal}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-full shadow-md transition-all hover:scale-105"
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
            <div className="pb-3 border-b border-slate-800">
              <a
                href="#staff-events"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-sky-300 bg-blue-950/70 border border-blue-800/80 py-2.5 rounded-xl"
              >
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>{activeStaff ? `Staff: ${activeStaff.name}` : 'Staff Login / Event Editor'}</span>
              </a>
            </div>

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
