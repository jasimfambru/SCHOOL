import React from 'react';
import {
  Target,
  Eye,
  Award,
  CheckCircle2,
  Users,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Heart,
  Compass,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const AboutSection: React.FC = () => {
  const coreValues = [
    { title: 'Quality Education', desc: 'Rigorous CBSE & IB integrated curriculum tailored for global competitive excellence.', icon: GraduationCap },
    { title: 'Discipline', desc: 'Cultivating time management, self-control, and respect in everyday school life.', icon: ShieldCheck },
    { title: 'Innovation', desc: 'Hands-on AI coding, robotics, hands-on scientific research, and creative problem solving.', icon: Sparkles },
    { title: 'Integrity', desc: 'Instilling ethical values, honesty, and moral courage in every young student.', icon: CheckCircle2 },
    { title: 'Leadership', desc: 'Empowering student councils, public speaking, debates, and community initiatives.', icon: Compass },
    { title: 'Compassion', desc: 'Encouraging empathy, social responsibility, eco-awareness, and peer support.', icon: Heart },
  ];

  const counters = [
    { value: '28+', label: 'Years of Excellence', icon: Award, color: 'text-amber-600 bg-amber-100/80' },
    { value: '5,000+', label: 'Enrolled Students', icon: Users, color: 'text-blue-600 bg-blue-100/80' },
    { value: '180+', label: 'Expert Teachers', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-100/80' },
    { value: '100%', label: 'CBSE Pass Rate', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100/80' },
    { value: '350+', label: 'Awards & Honors', icon: Sparkles, color: 'text-purple-600 bg-purple-100/80' },
  ];

  return (
    <section id="about" className="py-20 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Discover Nagarjuna School</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Nurturing Future Innovators & Ethical Citizens
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Founded in 1998, Nagarjuna School stands as a beacon of academic brilliance, technological innovation, and holistic student development in India.
          </p>
        </div>

        {/* Two-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Campus Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl group bg-white/70 backdrop-blur-xl p-3">
              <div className="rounded-[2rem] overflow-hidden relative">
                <img
                  src="/photos/campus/school-building-welcome-back.webp"
                  alt="Nagarjuna School Campus"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg text-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-slate-900 font-bold text-base">State-of-the-Art Infrastructure</h4>
                      <p className="text-xs text-slate-600">15-Acre Smart Green Campus with Wi-Fi & Solar Energy</p>
                    </div>
                    <span className="text-blue-600 font-black text-lg">Est. 1998</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text & Mission / Vision */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Where Academic Rigor Meets Technological Excellence
            </h3>

            <p className="text-slate-600 text-base leading-relaxed">
              At Nagarjuna School, we believe that education extends beyond textbooks. We empower students through inquiry-based learning, futuristic robotics and AI laboratories, smart interactive classrooms, high-tech science facilities, and comprehensive sports training.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-md hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Our Mission</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide transformative education that integrates scientific knowledge, technological capability, character, and ethical leadership.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-md hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Our Vision</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be globally recognized as a premier school inspiring lifelong learning, technological innovation, and compassionate global citizenship.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Principal */}
        <div className="mb-16 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-5">
          <img
            src="/photos/principal/principal-at-office-desk.webp"
            alt="Our Principal at her desk"
            loading="lazy"
            className="w-full h-full object-cover md:col-span-2 min-h-[260px]"
          />
          <div className="p-8 md:col-span-3 flex flex-col justify-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Leadership</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">Our Principal</h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Nagarjuna Public School is guided by a Principal who knows every child and is always available to listen to students, parents and teachers.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8">
            Core Values That Define Nagarjuna School
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-md hover:shadow-lg hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{value.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-12">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated Statistics Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {counters.map((counter, idx) => {
            const Icon = counter.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white shadow-md text-center hover:scale-[1.03] transition-transform"
              >
                <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3 ${counter.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{counter.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-semibold">{counter.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
