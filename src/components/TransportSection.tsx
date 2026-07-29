import React from 'react';
import { Bus, MapPin, ShieldCheck, Phone, Compass, Navigation } from 'lucide-react';
import { BUS_ROUTES } from '../data/schoolData';

interface TransportSectionProps {
  onOpenRouteTrackerModal: () => void;
}

export const TransportSection: React.FC<TransportSectionProps> = ({
  onOpenRouteTrackerModal,
}) => {
  return (
    <section id="transport" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Bus className="w-4 h-4 text-blue-600" />
            <span>Smart School Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Safe, AC & GPS-Enabled Transport
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Operating 25+ modern air-conditioned buses fitted with live GPS tracking, speed governors, female attendants, and CCTV safety cameras.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-md hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Live Parent GPS App</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Parents receive real-time bus location notifications, estimated arrival times, and stop alerts on mobile devices.
            </p>
          </div>

          <div className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-md hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Verified Safe Drivers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Background-checked drivers with over 10+ years heavy transport experience and mandatory regular breathalyzer tests.
            </p>
          </div>

          <div className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-md hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">CCTV & Female Attendants</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dual interior CCTV cameras monitor seating areas, accompanied by trained female staff on every single route.
            </p>
          </div>

          <div className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-md hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">25+ City Pickup Routes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extensive route coverage connecting major residential colonies, apartment complexes, and metro stations.
            </p>
          </div>
        </div>

        {/* Live Route Sample Box */}
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bus className="w-5 h-5 text-blue-600" />
                <span>School Bus Fleet Live Status</span>
              </h3>
              <p className="text-xs text-slate-600">Sample active routes monitored by our Central Transport Control Room</p>
            </div>

            <button
              onClick={onOpenRouteTrackerModal}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Live GPS Map Tracker</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BUS_ROUTES.map((route, idx) => (
              <div key={idx} className="bg-white/90 p-4 rounded-2xl border border-slate-100 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    Route {route.routeNo}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {route.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{route.name}</h4>
                <p className="text-[11px] text-slate-500">Driver: {route.driver}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                  📍 {route.currentLocation} (ETA: {route.etaMinutes} mins)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
