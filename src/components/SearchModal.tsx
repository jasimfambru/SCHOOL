import React, { useState } from 'react';
import { X, Search, ChevronRight, BookOpen, Trophy, Laptop, Phone } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Robotics & AI Lab Curriculum', href: '#robotics-ai', category: 'STEM & Tech' },
    { label: 'Online Admission Application 2026', href: '#admissions', category: 'Admissions' },
    { label: 'High-Speed Computer Laboratories', href: '#computer-lab', category: 'Labs' },
    { label: 'FIFA Football & Sports Complex', href: '#sports', category: 'Athletics' },
    { label: 'Digital Library & Catalog', href: '#library', category: 'Academics' },
    { label: 'School Bus GPS Route Map', href: '#transport', category: 'Transport' },
    { label: 'Faculty Directory & Mentors', href: '#faculty', category: 'Leadership' },
    { label: 'Contact Admissions Office', href: '#contact', category: 'Helpline' },
  ];

  const filteredLinks = quickLinks.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-start justify-center p-4 pt-20">
      <div className="bg-white/85 backdrop-blur-2xl border border-white rounded-[2rem] w-full max-w-xl p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative mb-4">
          <Search className="w-5 h-5 text-blue-600 absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything at Nagarjuna School..."
            className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
            autoFocus
          />
        </div>

        <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
          {filteredLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/60 hover:border-blue-300 transition-colors text-xs shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                  {item.category}
                </span>
                <span className="font-bold text-slate-900">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
