import React from 'react';
import { Youtube, Instagram, Facebook } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface SocialButtonsProps {
  /** "full" shows icon + name (big buttons). "icons" shows round icon buttons. */
  variant?: 'full' | 'icons';
  className?: string;
  /** Use light styling when the buttons sit on a dark background. */
  onDark?: boolean;
}

const items = [
  {
    key: 'youtube',
    label: 'YouTube',
    url: SCHOOL_INFO.youtube,
    Icon: Youtube,
    color: 'bg-red-600 hover:bg-red-700 text-white',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    url: SCHOOL_INFO.instagram,
    Icon: Instagram,
    color: 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 hover:opacity-90 text-white',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    url: SCHOOL_INFO.facebook,
    Icon: Facebook,
    color: 'bg-blue-700 hover:bg-blue-800 text-white',
  },
];

// A button works as soon as its link is filled in SCHOOL_INFO (src/data/schoolData.ts).
// Until then it is shown greyed out and does nothing.
export const SocialButtons: React.FC<SocialButtonsProps> = ({
  variant = 'full',
  className = '',
  onDark = false,
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map(({ key, label, url, Icon, color }) => {
        const base =
          variant === 'full'
            ? 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all'
            : 'inline-flex items-center justify-center w-9 h-9 rounded-full transition-all';

        if (!url) {
          const muted = onDark
            ? 'bg-white/10 text-white/50 border border-white/15'
            : 'bg-slate-200 text-slate-500';
          return (
            <button
              key={key}
              type="button"
              disabled
              title={`${label} link coming soon`}
              aria-label={`${label} (link coming soon)`}
              className={`${base} ${muted} cursor-not-allowed`}
            >
              <Icon className={variant === 'full' ? 'w-4 h-4' : 'w-4 h-4'} />
              {variant === 'full' && (
                <span>
                  {label} <span className="font-medium opacity-80">(coming soon)</span>
                </span>
              )}
            </button>
          );
        }

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className={`${base} ${color} ${variant === 'full' ? 'hover:scale-105' : ''}`}
          >
            <Icon className="w-4 h-4" />
            {variant === 'full' && <span>{label}</span>}
          </a>
        );
      })}
    </div>
  );
};
