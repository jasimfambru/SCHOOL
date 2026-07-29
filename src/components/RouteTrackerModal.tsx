import React, { useState } from 'react';
import { X, Bus, Navigation, Phone, CheckCircle2, MapPin } from 'lucide-react';
import { BUS_ROUTES } from '../data/schoolData';

interface RouteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RouteTrackerModal: React.FC<RouteTrackerModalProps> = ({ isOpen, onClose }) => {
  const [selectedRoute, setSelectedRoute] = useState(BUS_ROUTES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-3xl p-6 sm:p-8 text-slate-800 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              School Bus GPS Live Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Real-time telemetry & parent notification portal
            </p>
          </div>
        </div>

        {/* Route Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200/80">
          {BUS_ROUTES.map((r) => (
            <button
              key={r.routeNo}
              onClick={() => setSelectedRoute(r)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRoute.routeNo === r.routeNo
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white/80 border border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 shadow-xs'
              }`}
            >
              Route {r.routeNo}
            </button>
          ))}
        </div>

        {/* Map Simulator & Route Specs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Map Viewport Graphic */}
          <div className="md:col-span-7 bg-blue-50/50 rounded-2xl border border-blue-100 p-4 relative aspect-video flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb15_1px,transparent_1px)] [background-size:1rem_1rem] pointer-events-none"></div>

            {/* Top Status */}
            <div className="flex items-center justify-between z-10 text-xs">
              <span className="bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>LIVE GPS ACTIVE</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px]">
                Speed: 36 km/h
              </span>
            </div>

            {/* Bus Animated Node */}
            <div className="z-10 bg-white/95 border border-blue-200 p-3 rounded-2xl max-w-xs mx-auto shadow-lg text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-blue-600 font-bold text-xs">
                <Navigation className="w-4 h-4 animate-bounce" />
                <span>Bus {selectedRoute.routeNo} En Route</span>
              </div>
              <p className="text-[11px] text-amber-600 font-bold">{selectedRoute.currentLocation}</p>
              <p className="text-[10px] text-slate-500">ETA to Campus: {selectedRoute.etaMinutes} minutes</p>
            </div>

            {/* Bottom Stop Indicator */}
            <div className="z-10 text-[10px] text-slate-500 text-center font-mono">
              Next Stop: {selectedRoute.stops[2] || 'Campus Gate'}
            </div>
          </div>

          {/* Route Details */}
          <div className="md:col-span-5 space-y-4 text-xs">
            <div className="bg-white/80 p-4 rounded-2xl border border-slate-200/60 space-y-1 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm">{selectedRoute.name}</h4>
              <p className="text-slate-600">Driver: {selectedRoute.driver}</p>
              <p className="text-slate-600">Control Room: {selectedRoute.contact}</p>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                Route Pickup Stops
              </h5>
              <div className="space-y-1">
                {selectedRoute.stops.map((stop, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 text-slate-700 font-medium shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Stop #{idx + 1}: {stop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
