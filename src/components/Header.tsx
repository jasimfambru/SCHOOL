import React, { useEffect, useState } from 'react';
import { Menu, X, MapPin, Phone, ShieldCheck, LogOut } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { StaffLoginModal } from './StaffLoginModal';
import { SocialButtons } from './SocialButtons';
import { getActiveStaffUser, setStaffUserSession, StaffUser } from '../utils/eventStorage';

interface HeaderProps {
  onOpenApplyModal: () => void;
}

const navLinks = [
  { name: 'Home', href: '#top' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenApplyModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [staffLoginOpen, setStaffLoginOpen] = useState(false);
  const [activeStaff, setActiveStaff] = useState<StaffUser | null>(() => getActiveStaffUser());

  useEffect(() => {
    const handleAuth = (e: Event) => {
      const detail = (e as CustomEvent<StaffUser | null>).detail;
      setActiveStaff(detail !== undefined ? detail : getActiveStaffUser());
    };
    window.addEventListener('nagarjuna_staff_auth_changed', handleAuth);
    return () => window.removeEventListener('nagarjuna_staff_auth_changed', handleAuth);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0_2px_14px_rgba(15,31,77,0.08)]">
        {/* Top info bar */}
        <div className="bg-[#0f1f4d] text-[#cfd8f5] text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
            <span className="hidden md:flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{SCHOOL_INFO.address}</span>
            </span>
            <div className="flex items-center gap-4 ml-auto">
              <a href={`tel:${SCHOOL_INFO.phoneRaw}`} className="flex items-center gap-1.5 hover:text-white font-semibold">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{SCHOOL_INFO.phone}</span>
              </a>
              <a href={`tel:${SCHOOL_INFO.phone2Raw}`} className="hidden sm:inline hover:text-white font-semibold">
                {SCHOOL_INFO.phone2}
              </a>
              <span className="hidden lg:block">
                <SocialButtons variant="icons" onDark />
              </span>
              {activeStaff ? (
                <button
                  onClick={() => setStaffUserSession(null)}
                  className="flex items-center gap-1.5 hover:text-white font-semibold"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Staff: {activeStaff.name.split(' ')[0]} (sign out)</span>
                </button>
              ) : (
                <button
                  onClick={() => setStaffLoginOpen(true)}
                  className="flex items-center gap-1.5 hover:text-white font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt={`${SCHOOL_INFO.name} logo`} className="w-14 h-14 object-contain" />
            <div className="leading-tight">
              <div className="font-black text-lg sm:text-xl text-[#0f1f4d] tracking-wide">NAGARJUNA PUBLIC SCHOOL</div>
              <div className="text-[11px] font-bold tracking-[0.3em] text-[#c8202f]">KANDUKUR</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-slate-800">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="hover:text-[#c8202f] transition-colors">
                {l.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenApplyModal}
              className="hidden sm:inline-flex bg-[#c8202f] hover:bg-[#a81a27] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md transition-all"
            >
              Apply Now
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2.5 rounded-xl bg-[#0f1f4d] text-white"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                {l.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenApplyModal();
              }}
              className="w-full mt-2 bg-[#c8202f] text-white font-bold text-sm px-6 py-3 rounded-full"
            >
              Apply Now
            </button>
            <div className="pt-3 flex justify-center">
              <SocialButtons variant="icons" />
            </div>
          </div>
        )}
      </header>

      <StaffLoginModal
        isOpen={staffLoginOpen}
        onClose={() => setStaffLoginOpen(false)}
        title="Staff Sign In"
        subtitle="Sign in with your school staff account to publish and edit events."
        onSuccess={(user) => setActiveStaff(user)}
      />
    </>
  );
};
