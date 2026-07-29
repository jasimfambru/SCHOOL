import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Back to Top"
      className="fixed bottom-20 right-6 z-30 p-3 rounded-full bg-slate-800/90 border border-slate-700 text-sky-400 hover:text-white hover:bg-slate-700 shadow-xl transition-all hover:scale-105"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
