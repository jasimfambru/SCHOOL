import React from 'react';
import { ShieldCheck, Eye, HeartPulse, Flame, UserCheck, PhoneCall, Lock } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const safetyPillars = [
    {
      title: '24/7 CCTV Campus Coverage',
      desc: '350+ high-definition night-vision cameras monitoring all corridors, gates, and play fields.',
      icon: Eye,
    },
    {
      title: 'Biometric Gate Access & ID Cards',
      desc: 'Mandatory RFID biometric entry cards for staff, students, and authorized parents.',
      icon: Lock,
    },
    {
      title: 'Full-Time Medical Infirmary',
      desc: '3-bed air-conditioned medical room staffed by resident doctor & certified nurses with emergency oxygen & ambulance setup.',
      icon: HeartPulse,
    },
    {
      title: 'Certified Fire & Disaster Safety',
      desc: 'Automated smoke detectors, fire sprinklers, monthly evacuation drills, and certified extinguishers.',
      icon: Flame,
    },
    {
      title: 'Digital Visitor Gate Management',
      desc: 'Instant parent OTP gate passes and digital photo verification for all external visitors.',
      icon: UserCheck,
    },
    {
      title: '24/7 Helpline & Anti-Bullying Cell',
      desc: 'Zero-tolerance student helpline, student grievance committee, and professional child psychologist counseling.',
      icon: PhoneCall,
    },
  ];

  return (
    <section className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Uncompromising Safety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            360° Campus Safety & Healthcare Protocol
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Your child's safety, security, mental well-being, and physical health are our absolute highest priorities every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white hover:bg-white transition-all group shadow-md hover:shadow-xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
