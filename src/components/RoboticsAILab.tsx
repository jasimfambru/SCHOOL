import React, { useState } from 'react';
import {
  Bot,
  Cpu,
  Zap,
  Code,
  Trophy,
  Sparkles,
  CircuitBoard,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const RoboticsAILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lego' | 'arduino' | 'raspberry' | 'ai' | 'iot'>('lego');

  const topics = [
    {
      id: 'lego' as const,
      name: 'LEGO Mindstorms',
      tag: 'Grades 3-7',
      title: 'Modular Mechanical & Sensor Robotics',
      desc: 'Younger students construct autonomous buggies, color-sorting arms, and gear mechanisms using EV3/SPIKE Prime kits.',
      specs: ['Ultrasonic Distance Sensors', 'Gyroscopic Balancers', 'Scratch Block Coding', 'Line Following Competitions'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'arduino' as const,
      name: 'Arduino Microcontrollers',
      tag: 'Grades 6-10',
      title: 'Embedded Systems & C++ Mechatronics',
      desc: 'Students solder circuits, interface OLED screens, stepper motors, and Bluetooth modules to build real-world devices.',
      specs: ['Embedded C++ Programming', 'PWM Motor Controllers', 'IR & RFID Access Control', 'Solar Tracking Panels'],
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'raspberry' as const,
      name: 'Raspberry Pi Computing',
      tag: 'Grades 8-12',
      title: 'Single-Board Computing & Linux',
      desc: 'High schoolers deploy Linux servers, computer vision camera modules, and web API integrations on quad-core boards.',
      specs: ['Linux Shell Scripting', 'OpenCV Vision Processing', 'Local Web Servers', 'GPIO Pin Interfacing'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'ai' as const,
      name: 'Artificial Intelligence',
      tag: 'Grades 9-12',
      title: 'Machine Learning & Python Neural Networks',
      desc: 'Building gesture recognition bots, text sentiment analyzer models, and predictive weather sensors using Python.',
      specs: ['Python & NumPy/Pandas', 'TensorFlow Lite for Microcontrollers', 'Face & Emotion Detection', 'Voice Assistants'],
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'iot' as const,
      name: 'IoT Projects',
      tag: 'Advanced STEM',
      title: 'Smart City & Automation Systems',
      desc: 'Students construct automated greenhouse irrigation, Wi-Fi smart power meters, and air-quality monitoring stations.',
      specs: ['ESP32 Wi-Fi Modules', 'Cloud Dashboard Analytics', 'MQTT Messaging', 'Automated Environmental Control'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTab) || topics[0];

  return (
    <section id="robotics-ai" className="py-20 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-4 h-4 text-blue-600" />
            <span>Futuristic Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            World-Class Robotics & AI Laboratory
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Where imagination transforms into autonomous hardware and intelligent algorithms. Nagarjuna School students design, program, and innovate with cutting-edge technology.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl shadow-blue-500/20 scale-105'
                  : 'bg-white/80 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-white shadow-xs'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 bg-white/75 backdrop-blur-xl rounded-[2.5rem] border border-white p-6 sm:p-10 shadow-2xl">
          {/* Left Text Detail */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3.5 py-1 rounded-full border border-blue-100">
              {currentTopic.tag}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentTopic.title}
            </h3>

            <p className="text-slate-600 text-base leading-relaxed">
              {currentTopic.desc}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Key Curriculum Modules</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTopic.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-slate-100 shadow-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white shadow-xl group">
              <img
                src={currentTopic.image}
                alt={currentTopic.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white flex items-center justify-between shadow-lg">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span>Hands-on STEM Lab Module</span>
                </span>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">ACTIVE WORKSHOP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Robotics Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white text-center shadow-md">
            <div className="text-3xl font-black text-blue-600">120+</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">Autonomous Robot Projects Built</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white text-center shadow-md">
            <div className="text-3xl font-black text-amber-500">45+</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">National & State STEM Trophies</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white text-center shadow-md">
            <div className="text-3xl font-black text-emerald-500">2,500+</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">Students Trained in Coding & Robotics</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white text-center shadow-md">
            <div className="text-3xl font-black text-purple-600">18+</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">Patent-Pending Student Inventions</div>
          </div>
        </div>
      </div>
    </section>
  );
};
