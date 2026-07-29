import React from 'react';
import {
  FileText,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenApplyModal: () => void;
  onOpenFeeModal: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  onOpenApplyModal,
  onOpenFeeModal,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Enquiry & Registration',
      desc: 'Submit our simple online enquiry form or connect directly with our admissions counselor.',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Campus Interaction Visit',
      desc: 'Tour our 15-acre green campus, smart classrooms, robotics lab, and athletic complex.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Application Submission',
      desc: 'Upload required student documents, birth certificate, previous school report card, and photos.',
      icon: ClipboardList,
    },
    {
      step: '04',
      title: 'Interactive Assessment',
      desc: 'Friendly student interaction and baseline readiness evaluation tailored for age-appropriate grade.',
      icon: Sparkles,
    },
    {
      step: '05',
      title: 'Seat Confirmation',
      desc: 'Receive formal admission offer letter, complete fee installment, and join the Nagarjuna family!',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="admissions" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Admissions Session 2026-27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            5-Step Seamless Admission Journey
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            We welcome students from Pre-Primary (Nursery) to Class XII. Experience a simple, transparent, and student-friendly admission process.
          </p>
        </div>

        {/* Step Flowchart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white hover:bg-white transition-all flex flex-col justify-between relative group shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-amber-500">
                      {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900">
              Ready to Give Your Child the Nagarjuna Advantage?
            </h3>
            <p className="text-sm text-slate-600">
              Limited seats available for Pre-Primary, Primary, and STEM Senior Secondary tracks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenFeeModal}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-800 bg-white/90 hover:bg-slate-50 border border-slate-200/80 px-5 py-3.5 rounded-2xl transition-all shadow-xs"
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Fee Structure & Payment</span>
            </button>

            <button
              onClick={onOpenApplyModal}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
            >
              <span>Apply Online Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
