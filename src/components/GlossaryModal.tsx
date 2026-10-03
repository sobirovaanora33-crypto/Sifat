import React, { useState } from 'react';
import { X, Search, Volume2, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { glossaryTerms } from '../data/glossaryData';
import { sounds, speakWord } from '../services/audio';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = glossaryTerms.filter(item => 
    item.termUz.toLowerCase().includes(search.toLowerCase()) ||
    item.termEn.toLowerCase().includes(search.toLowerCase()) ||
    item.termRu.toLowerCase().includes(search.toLowerCase()) ||
    item.defUz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Sifat atamalari lug'ati (Glossary)
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Atamani qidirish (o'zbekcha, ruscha, inglizcha)..."
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-amber-600 dark:text-amber-400">
                    {item.termUz}
                  </h3>
                  <span className="text-xs text-slate-400">
                    ({item.termEn} / {item.termRu})
                  </span>
                </div>
                <button
                  onClick={() => speakWord(item.termUz)}
                  title="Tinglash"
                  className="p-1 rounded text-slate-400 hover:text-amber-500"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'en' ? item.defEn : lang === 'ru' ? item.defRu : item.defUz}
              </p>

              <div className="pt-1 text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-600 dark:text-slate-400">Misollar: </span>
                <span className="text-amber-700 dark:text-amber-400">{item.examplesUz}</span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-8 text-xs">
              Hech qanday atama topilmadi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
