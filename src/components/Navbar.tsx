import React from 'react';
import { Volume2, VolumeX, Sun, Moon, Monitor, BookOpen } from 'lucide-react';
import { Language, SectionType } from '../types';
import { getTranslation } from '../i18n/translations';
import { sounds } from '../services/audio';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isProjector: boolean;
  onToggleProjector: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  lang,
  onLanguageChange,
  isDark,
  onToggleDark,
  isMuted,
  onToggleMute,
  isProjector,
  onToggleProjector,
  onOpenGlossary
}) => {
  const t = getTranslation(lang);

  const navLinks: { id: SectionType; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'theory', label: t.navTheory },
    { id: 'games', label: t.navGames },
    { id: 'cases', label: t.navCases },
    { id: 'test', label: t.navTest },
    { id: 'evaluation', label: t.navResults },
    { id: 'teacher', label: t.navTeacher }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm font-display font-bold text-lg group-hover:scale-105 transition-transform">
            S
          </span>
          <span className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight">
            Sifatoy
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(link.id);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              sounds.playClick();
              onOpenGlossary();
            }}
            className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>{t.navGlossary}</span>
          </button>
        </nav>

        {/* Zone 3: Functional Actions (Language, Theme, Sound, Projector) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tri-lingual Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                sounds.playClick();
                onLanguageChange('uz');
              }}
              title="O'zbek tili"
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                lang === 'uz'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              🇺🇿 UZ
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onLanguageChange('en');
              }}
              title="English"
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                lang === 'en'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onLanguageChange('ru');
              }}
              title="Русский"
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                lang === 'ru'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              🇷🇺 RU
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleMute();
            }}
            title={isMuted ? t.soundOff : t.soundOn}
            aria-label={isMuted ? t.soundOff : t.soundOn}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleDark();
            }}
            title={isDark ? t.lightMode : t.darkMode}
            aria-label={isDark ? t.lightMode : t.darkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Projector Mode Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleProjector();
            }}
            title={isProjector ? t.exitProjector : t.projectorMode}
            className={`p-2 rounded-lg transition-colors hidden sm:flex items-center ${
              isProjector
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Subnav */}
      <div className="lg:hidden overflow-x-auto flex items-center gap-1 px-4 py-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              sounds.playClick();
              onNavigate(link.id);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              currentSection === link.id
                ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenGlossary();
          }}
          className="px-3 py-1 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 flex items-center gap-1"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.navGlossary}</span>
        </button>
      </div>
    </header>
  );
};
