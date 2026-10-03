import React from 'react';
import { Volume2, Sparkles, Lightbulb } from 'lucide-react';
import { speakWord } from '../services/audio';

export type MascotMood = 'happy' | 'cheering' | 'thinking' | 'encouraging';

interface MascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeech?: boolean;
}

export const MascotSifatoy: React.FC<MascotProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  showSpeech = true
}) => {
  const getDims = () => {
    switch (size) {
      case 'sm': return { width: 56, height: 72 };
      case 'lg': return { width: 120, height: 150 };
      default: return { width: 84, height: 108 };
    }
  };

  const { width, height } = getDims();

  return (
    <div className="flex items-center gap-3 select-none">
      {/* SVG Brush Mascot */}
      <div className="relative group shrink-0">
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 transform group-hover:scale-105"
        >
          <defs>
            {/* Wooden handle gradient */}
            <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Silver ferrule gradient */}
            <linearGradient id="ferruleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Rainbow / Golden Bristles gradient */}
            <linearGradient id="bristleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Cheek blush */}
            <radialGradient id="blushGrad">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sparkle effect on cheering */}
          {mood === 'cheering' && (
            <>
              <circle cx="18" cy="18" r="3" fill="#facc15" className="animate-ping" />
              <circle cx="82" cy="15" r="4" fill="#ec4899" className="animate-pulse" />
              <path d="M 85 40 L 89 44 L 85 48 L 81 44 Z" fill="#38bdf8" />
            </>
          )}

          {/* Wooden Brush Handle */}
          <path
            d="M 38 72 L 40 120 C 40 126 60 126 60 120 L 62 72 Z"
            fill="url(#handleGrad)"
            stroke="#78350f"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Handle highlight */}
          <path d="M 46 80 L 46 114" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Metal Ferrule (Collar) */}
          <rect
            x="32"
            y="52"
            width="36"
            height="22"
            rx="3"
            fill="url(#ferruleGrad)"
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line x1="33" y1="62" x2="67" y2="62" stroke="#334155" strokeWidth="1.5" />

          {/* Brush Bristles (The Head with Face) */}
          <path
            d="M 28 54 C 24 35 28 8 50 8 C 72 8 76 35 72 54 Z"
            fill="url(#bristleGrad)"
            stroke="#475569"
            strokeWidth="2.5"
          />

          {/* Cheerful Painted Splat Tips */}
          <path d="M 38 8 C 42 2 46 2 50 8 C 54 3 58 3 62 8" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

          {/* Eyes */}
          {mood === 'cheering' ? (
            // Joyful curved squinting eyes
            <>
              <path d="M 38 28 Q 44 21 50 28" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 52 28 Q 58 21 64 28" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'thinking' ? (
            // Looking upward eyes
            <>
              <ellipse cx="43" cy="25" rx="5" ry="6" fill="#1e293b" />
              <circle cx="45" cy="22" r="2" fill="#ffffff" />
              <ellipse cx="57" cy="25" rx="5" ry="6" fill="#1e293b" />
              <circle cx="59" cy="22" r="2" fill="#ffffff" />
            </>
          ) : (
            // Big friendly open eyes
            <>
              <ellipse cx="42" cy="27" rx="5.5" ry="7" fill="#1e293b" />
              <circle cx="44" cy="24" r="2.2" fill="#ffffff" />
              <circle cx="41" cy="29" r="1.1" fill="#ffffff" />

              <ellipse cx="58" cy="27" rx="5.5" ry="7" fill="#1e293b" />
              <circle cx="60" cy="24" r="2.2" fill="#ffffff" />
              <circle cx="57" cy="29" r="1.1" fill="#ffffff" />
            </>
          )}

          {/* Cheeks */}
          <circle cx="34" cy="34" r="6" fill="url(#blushGrad)" />
          <circle cx="66" cy="34" r="6" fill="url(#blushGrad)" />

          {/* Mouth */}
          {mood === 'cheering' ? (
            <path d="M 42 34 Q 50 46 58 34 Z" fill="#e11d48" stroke="#881337" strokeWidth="1.5" />
          ) : mood === 'encouraging' ? (
            <path d="M 44 35 Q 50 42 56 35" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : mood === 'thinking' ? (
            <ellipse cx="50" cy="37" rx="3" ry="2" fill="#1e293b" />
          ) : (
            // Happy smile
            <path d="M 43 34 Q 50 43 57 34" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          )}

          {/* Tiny artist bow or magical star */}
          <circle cx="50" cy="54" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
        </svg>

        {/* Status Mini Icon Badge */}
        <div className="absolute -top-1 -right-1 bg-amber-400 dark:bg-amber-500 text-amber-950 p-1 rounded-full shadow-sm">
          {mood === 'thinking' ? (
            <Lightbulb className="w-3.5 h-3.5" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
          )}
        </div>
      </div>

      {/* Speech Bubble */}
      {showSpeech && speechText && (
        <div className="relative bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-amber-900/40 rounded-2xl px-4 py-2.5 text-sm md:text-base shadow-sm max-w-md animate-in fade-in zoom-in-95 duration-200">
          {/* Arrow pointing to brush */}
          <div className="absolute top-4 -left-2 w-3 h-3 bg-white dark:bg-slate-800 border-l border-b border-amber-200 dark:border-amber-900/40 rotate-45 transform" />

          <div className="flex items-center justify-between gap-2">
            <span className="font-medium leading-snug">{speechText}</span>
            <button
              onClick={() => speakWord(speechText)}
              title="Ovozli o'qish"
              aria-label="Ovozli o'qish"
              className="p-1 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors shrink-0"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
