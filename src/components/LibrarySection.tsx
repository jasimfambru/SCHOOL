import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Book,
  Sparkles,
  Bookmark,
  ExternalLink,
  Laptop,
} from 'lucide-react';

export const LibrarySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleBooks = [
    { title: 'The Art of Robotics & AI Engineering', author: 'Dr. E. K. Sharma', category: 'STEM', status: 'Available' },
    { title: 'CBSE Physics Exemplar & Quantum Concepts', author: 'NCERT Board', category: 'Academics', status: 'Available' },
    { title: 'Wings of Fire: An Autobiography', author: 'Dr. A.P.J. Abdul Kalam', category: 'Inspiration', status: 'Available' },
    { title: 'Python Programming for Young Minds', author: 'Guido van Rossum Series', category: 'Coding', status: 'Digital E-Book' },
    { title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History', status: 'Available' },
  ];

  const filteredBooks = sampleBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="library" className="py-20 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Knowledge Sanctuary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Luxury Library & Digital Knowledge Center
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Housing over 25,000 physical volumes, 100,000+ digital e-books, academic research journals, and quiet ergonomic reading bays.
          </p>
        </div>

        {/* Overview & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl group bg-white/70 backdrop-blur-xl p-3">
              <div className="rounded-[2rem] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                  alt="Nagarjuna School Library"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">E-Learning Research Pods</h4>
                      <p className="text-xs text-slate-600">Equipped with kindle devices, e-readers, and high-speed research terminals</p>
                    </div>
                    <span className="text-indigo-600 font-black text-xl">25,000+ Books</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-2xl font-black text-slate-900">
              Cultivating Lifelong Reading & Scientific Inquiry
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our library features genre-specific reading zones: Primary Junior Corner, High School STEM Research, Young Adults Fiction, and Competitive Exam Reference.
            </p>

            <div className="space-y-3 pt-2">
              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-md flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Daily Reading Challenge</h4>
                  <p className="text-[11px] text-slate-600">Structured 20-minute daily reading period for all grades</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-md flex items-center gap-3">
                <Laptop className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Digital Library Catalog</h4>
                  <p className="text-[11px] text-slate-600">Online book reservation and digital PDF access via parent portal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Catalog Search Simulator */}
        <div className="bg-white/75 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] border border-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                <span>Search Online Library Catalog</span>
              </h3>
              <p className="text-xs text-slate-600">Search books, competitive study guides, or e-journals</p>
            </div>

            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, topic..."
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-xs font-medium"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{book.title}</h4>
                      <p className="text-[11px] text-slate-500">Author: {book.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                      {book.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {book.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-xs text-slate-500 text-center">No matching books found in catalog.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
