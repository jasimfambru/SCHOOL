import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 bg-white rounded-3xl overflow-hidden shadow-2xl shadow-[#0f1f4d]/10">
          <img
            src="/photos/principal/principal-at-office-desk.webp"
            alt="Our Principal at her desk"
            loading="lazy"
            className="w-full h-full object-cover md:col-span-2 min-h-[280px]"
          />
          <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
            <small className="text-[#c8202f] font-extrabold tracking-[0.25em] text-xs">LEADERSHIP</small>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f1f4d] mt-2 mb-4">Our Principal</h2>
            <p className="text-slate-600 leading-relaxed">
              At {SCHOOL_INFO.name}, students and parents can speak openly with the school's leadership. Through the
              "Talk and Heal" platform, Class X students share their concerns with the Director and get them sorted out
              quickly.
            </p>
            <a href="#contact" className="mt-6 inline-flex w-fit bg-[#0f1f4d] hover:bg-blue-900 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors">
              Contact the School
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-8 items-center">
          <img
            src="/photos/banners/school-banner-directors.webp"
            alt="Nagarjuna Public School, Kandukur: Skandapuri Educational Society"
            loading="lazy"
            className="w-full rounded-3xl shadow-lg"
          />
          <img
            src="/photos/banners/school-banner-dark.webp"
            alt="Nagarjuna Public School, Kandukur: AI-Powered English Language Lab and LEAD Curriculum"
            loading="lazy"
            className="w-full rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
