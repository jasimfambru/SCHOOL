import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childGrade: 'Class I - V (Primary)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Visit Our Campus & Admissions Office
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Our admissions counselors are available Monday to Saturday to answer your questions, schedule campus walk-throughs, and guide registration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/75 backdrop-blur-xl p-6 rounded-3xl border border-white space-y-4 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Campus Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                    {SCHOOL_INFO.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-blue-600 font-bold hover:underline mt-1"
                  >
                    📍 Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">Mobile & WhatsApp Helpline</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <a
                      href={`tel:${SCHOOL_INFO.phoneRaw}`}
                      className="text-xs text-slate-900 font-bold hover:text-blue-600 transition-colors"
                    >
                      {SCHOOL_INFO.phone}
                    </a>
                    <a
                      href={`https://wa.me/${SCHOOL_INFO.whatsapp}?text=Hello%20Nagarjuna%20School,%20I%20would%20like%20to%20know%20details%20of%20the%20school%20and%20admissions.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200 px-2 py-0.5 rounded-md transition-colors"
                    >
                      💬 WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Admissions</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{SCHOOL_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Admissions Desk Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{SCHOOL_INFO.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Google Map Frame */}
            <div className="rounded-3xl overflow-hidden border border-white aspect-[16/9] relative bg-white/50 backdrop-blur-md shadow-md p-2">
              <iframe
                title="Nagarjuna School Campus Location - Kandukur"
                src={`https://maps.google.com/maps?q=Pampu+Road,+NTR+Nagar,+Kandukur+523105,+Andhra+Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 rounded-2xl"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact & Enquiry Form */}
          <div className="lg:col-span-7 bg-white/75 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.parentName}</strong>. Our admissions counselor will call you back within 2 hours at <strong className="text-blue-600">{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-600 underline hover:text-blue-700 pt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-slate-900">
                    Send Admission Enquiry
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 91822 94787"
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Applying Grade / Class *
                    </label>
                    <select
                      value={formData.childGrade}
                      onChange={(e) => setFormData({ ...formData, childGrade: e.target.value })}
                      className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
                    >
                      <option>Nursery / LKG / UKG (Pre-Primary)</option>
                      <option>Class I - V (Primary)</option>
                      <option>Class VI - VIII (Middle)</option>
                      <option>Class IX - X (Secondary CBSE)</option>
                      <option>Class XI - XII (Senior Secondary STEM & AI)</option>
                      <option>Class XI - XII (Commerce / Humanities)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Questions / Campus Visit Request
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your child's interests, requested school tour date, or specific queries..."
                    className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Admissions Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
