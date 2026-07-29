import React from 'react';
import { GraduationCap, Award, Mail, BookOpen } from 'lucide-react';
import { FACULTY_MEMBERS } from '../data/schoolData';

export const FacultySection: React.FC = () => {
  return (
    <section id="faculty" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Mentors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Distinguished Faculty & Leadership
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Over 180 highly qualified educators, researchers, IIT alumni, and M.Tech experts guiding young minds toward excellence.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACULTY_MEMBERS.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white/75 backdrop-blur-xl rounded-3xl overflow-hidden border border-white hover:bg-white transition-all group shadow-md hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white shadow-xs">
                    {faculty.experience}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {faculty.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600">{faculty.role}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{faculty.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{faculty.subject}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    "{faculty.bio}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
