import React, { useState } from 'react';
import { Briefcase, CheckCircle2, XCircle, Star, ArrowRight, UserCheck, HelpCircle } from 'lucide-react';
import { Language, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { casesData } from '../data/casesData';
import { MascotSifatoy } from './MascotSifatoy';
import { sounds } from '../services/audio';

interface CasesSectionProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  lang: Language;
}

export const CasesSection: React.FC<CasesSectionProps> = ({
  student,
  onUpdateStudent,
  lang
}) => {
  const t = getTranslation(lang);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<Record<string, string>>({});
  const [feedbackState, setFeedbackState] = useState<Record<string, { isCorrect: boolean; feedback: string }>>({});

  const currentCase = casesData[selectedCaseIdx];

  const handleSelectCaseOption = (optId: string, isCorrect: boolean, feedback: string) => {
    sounds.playClick();
    setSelectedOptionId(prev => ({ ...prev, [currentCase.id]: optId }));
    setFeedbackState(prev => ({ ...prev, [currentCase.id]: { isCorrect, feedback } }));

    if (isCorrect) {
      sounds.playFanfare();
      if (!student.completedCases.includes(currentCase.id)) {
        onUpdateStudent({
          completedCases: [...student.completedCases, currentCase.id],
          stars: student.stars + 1,
          totalScore: student.totalScore + 20
        });
      }
    } else {
      sounds.playWrong();
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            {t.casesHeader}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.casesSub}
          </p>
        </div>

        <MascotSifatoy
          mood="thinking"
          speechText="Hayotiy vaziyatlarda sifatlar juda muhim rol o'ynaydi. Har bir keysni diqqat bilan tahlil qiling!"
          size="sm"
        />
      </div>

      {/* Case Navigator Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {casesData.map((c, idx) => {
          const isDone = student.completedCases.includes(c.id);
          const isActive = idx === selectedCaseIdx;
          return (
            <button
              key={c.id}
              onClick={() => {
                sounds.playClick();
                setSelectedCaseIdx(idx);
              }}
              className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs scale-102'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <span>{idx + 1}-Keys</span>
                {isDone && <Star className="w-3 h-3 fill-amber-400 text-amber-500" />}
              </div>
              <span className="truncate block font-normal opacity-90">{c.titleUz.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Case Study Details */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        {/* Title and Role Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div>
            <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white">
              {lang === 'en' ? currentCase.titleEn : lang === 'ru' ? currentCase.titleRu : currentCase.titleUz}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-500">{t.caseRole}:</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200">
                {lang === 'en' ? currentCase.roleEn : lang === 'ru' ? currentCase.roleRu : currentCase.roleUz}
              </span>
            </div>
          </div>
        </div>

        {/* Story Scenario */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-slate-900/60 border border-amber-200/80 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
            📖 Vaziyat tavsifi:
          </span>
          <p className="text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200">
            {currentCase.storyUz}
          </p>
        </div>

        {/* Objective / Task */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            🎯 {t.caseTask}:
          </span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {currentCase.taskUz}
          </p>
        </div>

        {/* Solution Options */}
        {currentCase.optionsUz && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 block">
              Variantlardan eng to'g'risini tanlang:
            </span>
            <div className="grid grid-cols-1 gap-3">
              {currentCase.optionsUz.map((opt) => {
                const isSelected = selectedOptionId[currentCase.id] === opt.id;
                const feedback = feedbackState[currentCase.id];

                let cardStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400';
                if (isSelected && feedback) {
                  cardStyle = feedback.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectCaseOption(opt.id, opt.isCorrect, opt.feedback)}
                    className={`p-4 rounded-2xl border text-left text-sm transition-all flex items-start justify-between gap-3 cursor-pointer ${cardStyle}`}
                  >
                    <span className="font-medium">{opt.text}</span>
                    {isSelected && feedback && (
                      feedback.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {feedbackState[currentCase.id] && (
          <div
            className={`p-4 rounded-2xl border text-sm animate-in fade-in duration-200 ${
              feedbackState[currentCase.id].isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="font-bold mb-1">
              {feedbackState[currentCase.id].isCorrect ? '✅ To\'g\'ri yechim!' : '❌ Qaytadan o\'ylab ko\'ring:'}
            </div>
            <div>{feedbackState[currentCase.id].feedback}</div>
          </div>
        )}

        {/* Pedagogical Explanation Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Metodik izoh:</span>
          {currentCase.explanationUz}
        </div>
      </div>
    </div>
  );
};
