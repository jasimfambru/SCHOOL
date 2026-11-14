import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { EnquiryForm } from './EnquiryForm';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#fffaf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <small className="text-[#c8202f] font-extrabold tracking-[0.25em] text-xs">CONTACT</small>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f1f4d] mt-2">Visit us or send an enquiry</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#0f1f4d]/5">
            <h3 className="text-xl font-black text-[#0f1f4d] mb-5">Get in touch</h3>
            <div className="space-y-4 text-slate-700">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL_INFO.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-blue-700"
              >
                <MapPin className="w-5 h-5 text-[#c8202f] shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </a>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#c8202f] shrink-0 mt-0.5" />
                <span className="flex flex-wrap gap-x-4 font-semibold">
                  <a href={`tel:${SCHOOL_INFO.phoneRaw}`} className="hover:text-blue-700">{SCHOOL_INFO.phone}</a>
                  <a href={`tel:${SCHOOL_INFO.phone2Raw}`} className="hover:text-blue-700">{SCHOOL_INFO.phone2}</a>
                </span>
              </div>
              <a
                href={`https://wa.me/${SCHOOL_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-emerald-700"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9]">
              <iframe
                title="Nagarjuna Public School location, Kandukur"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SCHOOL_INFO.mapQuery)}&z=16&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div id="admissions" className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#0f1f4d]/5 scroll-mt-28">
            <h3 className="text-xl font-black text-[#0f1f4d] mb-5">Admission enquiry</h3>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
