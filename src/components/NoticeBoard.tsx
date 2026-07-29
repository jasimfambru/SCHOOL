import React from 'react';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';
import { NEWS_ITEMS } from '../data/schoolData';

interface NoticeBoardProps {
  onOpenApplyModal: () => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ onOpenApplyModal }) => {
  return (
    <div className="bg-white/60 backdrop-blur-md border-b border-white/80 text-slate-800 text-xs py-2 px-4 relative z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <span className="bg-amber-100/80 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider shrink-0 border border-amber-200/80 flex items-center gap-1 shadow-xs">
            <Bell className="w-3 h-3 text-amber-600" />
            <span>Latest Notice</span>
          </span>

          <div className="truncate text-slate-700 font-medium text-[11px]">
            {NEWS_ITEMS[0].title} — <span className="text-blue-600 font-bold">{NEWS_ITEMS[0].date}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <button
            onClick={onOpenApplyModal}
            className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 transition-colors"
          >
            <span>Admissions Open 2026-27</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
