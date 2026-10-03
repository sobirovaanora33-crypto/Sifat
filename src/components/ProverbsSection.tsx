import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Volume2, ArrowRight, Star } from 'lucide-react';
import { Language, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { proverbsData } from '../data/proverbsData';
import { MascotSifatoy } from './MascotSifatoy';
import { sounds, speakWord } from '../services/audio';

interface ProverbsSectionProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  lang: Language;
}

export const ProverbsSection: React.FC<ProverbsSectionProps> = ({
  student,
  onUpdateStudent,
  lang
}) => {
  const t = getTranslation(lang);
  const [selectedProverbIdx, setSelectedProverbIdx] = useState(0);
  const [foundWords, setFoundWords] = useState<Record<string, string[]>>({}); // proverbId -> words[]
  const [revealedMeanings, setRevealedMeanings] = useState<Record<string, boolean>>({});

  const currentProverb = proverbsData[selectedProverbIdx];
  const wordsInProverb = currentProverb.text.split(' ');

  const handleWordClick = (rawWord: string) => {
    sounds.playClick();
    const clean = rawWord.replace(/[.,—:;!?'"]/g, '');
    const currentFound = foundWords[currentProverb.id] || [];

    const isTargetAdj = currentProverb.adjectives.some(
      adj => adj.toLowerCase() === clean.toLowerCase()
    );

    if (isTargetAdj && !currentFound.includes(clean)) {
      sounds.playCorrect();
      const updated = [...currentFound, clean];
      setFoundWords(prev => ({ ...prev, [currentProverb.id]: updated }));

      // Check if all adjectives found
      if (updated.length >= currentProverb.adjectives.length) {
        sounds.playFanfare();
        setRevealedMeanings(prev => ({ ...prev, [currentProverb.id]: true }));
        onUpdateStudent({
          stars: student.stars + 1,
          totalScore: student.totalScore + 15
        });
      }
    } else if (!isTargetAdj) {
      sounds.playWrong();
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            Xalq maqollarida sifatlar 📜
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Maqoldagi sifatlarni topib bosing va uning chuqur hikmatli ma'nosini oching!
          </p>
        </div>

        <MascotSifatoy
          mood="happy"
          speechText="O'zbek xalq maqollarida sifatlar juda teran ma'no kasb etadi!"
          size="sm"
        />
      </div>

      {/* Proverb Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {proverbsData.map((prv, idx) => {
          const isSolved = (foundWords[prv.id] || []).length >= prv.adjectives.length;
          const isActive = idx === selectedProverbIdx;
          return (
            <button
              key={prv.id}
              onClick={() => {
                sounds.playClick();
                setSelectedProverbIdx(idx);
              }}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{idx + 1}-Maqol</span>
              {isSolved && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />}
            </button>
          );
        })}
      </div>

      {/* Proverb Interactive Board */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <span className="text-xs font-bold text-slate-500">
            Topshiriq: Ushbu maqoldan sifatlarni toping ({ (foundWords[currentProverb.id] || []).length } / { currentProverb.adjectives.length }):
          </span>
          <button
            onClick={() => speakWord(currentProverb.text)}
            title="Maqolni tinglash"
            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-500"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Word buttons inside the proverb text */}
        <div className="p-8 rounded-2xl bg-amber-50/60 dark:bg-slate-900 border border-amber-200/80 dark:border-slate-700 flex flex-wrap items-center justify-center gap-3">
          {wordsInProverb.map((rawWord, wIdx) => {
            const clean = rawWord.replace(/[.,—:;!?'"]/g, '');
            const isFound = (foundWords[currentProverb.id] || []).includes(clean);

            return (
              <button
                key={wIdx}
                onClick={() => handleWordClick(rawWord)}
                className={`px-3.5 py-2 rounded-2xl font-display font-bold text-lg md:text-xl transition-all cursor-pointer ${
                  isFound
                    ? 'bg-emerald-500 text-white shadow-xs scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-amber-400 hover:scale-102'
                }`}
              >
                {rawWord}
              </button>
            );
          })}
        </div>

        {/* Revealed Meaning Box */}
        {revealedMeanings[currentProverb.id] && (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-950 dark:text-emerald-200 space-y-2 animate-in zoom-in-95">
            <div className="flex items-center gap-2 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Maqolning hikmati:</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed">
              {currentProverb.meaningUz}
            </p>
          </div>
        )}

        {/* Next proverb */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              setSelectedProverbIdx((selectedProverbIdx + 1) % proverbsData.length);
            }}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs inline-flex items-center gap-2"
          >
            <span>Keyingi maqol</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
