import React from 'react';
import {
  GraduationCap,
  Phone,
  MapPin,
  Send,
  FileText,
  Bus,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenApplyModal: () => void;
  onOpenProspectusModal: () => void;
  onOpenRouteTrackerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenApplyModal,
  onOpenProspectusModal,
  onOpenRouteTrackerModal,
}) => {
  return (
    <footer className="bg-white/70 backdrop-blur-2xl text-slate-800 border-t border-white pt-16 pb-8 relative shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/60">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xl text-slate-900 tracking-tight">
                  NAGARJUNA SCHOOL
                </span>
                <p className="text-[10px] text-blue-600 tracking-wider uppercase font-extrabold">
                  {SCHOOL_INFO.affiliation}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Empowering young minds with world-class CBSE education, advanced robotics & AI laboratories, digital smart classrooms, sports complexes, and holistic character building.
            </p>

            <div className="pt-2 text-xs text-slate-700 space-y-1.5 font-medium">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-blue-600 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`tel:${SCHOOL_INFO.phoneRaw}`}
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-bold text-slate-900"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{SCHOOL_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Hello%20Nagarjuna%20School,%20I%20would%20like%20to%20know%20details%20of%20the%20school%20and%20admissions.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">About Nagarjuna</a></li>
              <li><a href="#events" className="hover:text-blue-600 transition-colors">Events & Happenings</a></li>
              <li><a href="#computer-lab" className="hover:text-blue-600 transition-colors">Computer Lab</a></li>
              <li><a href="#achievements" className="hover:text-blue-600 transition-colors">Hall of Fame</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Portals & Downloads */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Portals & Downloads</h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <button onClick={onOpenApplyModal} className="hover:text-blue-600 transition-colors text-left font-bold text-blue-700">
                  🎓 Online Admission Application
                </button>
              </li>
              <li>
                <button onClick={onOpenProspectusModal} className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Download Prospectus PDF</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenRouteTrackerModal} className="hover:text-blue-600 transition-colors text-left flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-blue-600" />
                  <span>School Bus Route Tracker</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">School Newsletter</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscribe to receive latest campus news, STEM achievements, and admission announcements.
            </p>
            <div className="relative space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20">
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Nagarjuna School. All Rights Reserved. Affiliated with CBSE, New Delhi.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-800">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-800">Terms of Admission</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-800">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
