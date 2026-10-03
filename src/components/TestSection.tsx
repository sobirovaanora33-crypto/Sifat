import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Timer, Award, AlertCircle, CheckCircle2, XCircle, RotateCcw, 
  ArrowRight, ArrowLeft, Volume2, Sparkles 
} from 'lucide-react';
import { Language, Question, StudentProfile, TestAttempt } from '../types';
import { getTranslation } from '../i18n/translations';
import { questionBank } from '../data/questionsData';
import { MascotSifatoy } from './MascotSifatoy';
import { sounds, speakWord } from '../services/audio';

interface TestSectionProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onCompleteTest: (result: TestAttempt) => void;
  lang: Language;
}

export const TestSection: React.FC<TestSectionProps> = ({
  student,
  onUpdateStudent,
  onCompleteTest,
  lang
}) => {
  const t = getTranslation(lang);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<TestAttempt | null>(null);

  // Timer settings
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes default
  const timerRef = useRef<any>(null);

  // Match type temporary selections: leftIdx -> rightIdx
  const [tempMatch, setTempMatch] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  // Sentence tap selection
  const [tappedWord, setTappedWord] = useState<string | null>(null);

  // Start / Reset test
  const startNewTest = () => {
    sounds.playFanfare();
    // Shuffle and pick 20 questions
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5).slice(0, 20);
    setTestQuestions(shuffled);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsTestCompleted(false);
    setTestResult(null);
    setTimeRemaining(20 * 60);
    setTempMatch({});
    setTappedWord(null);

    if (timerRef.current) clearInterval(timerRef.current);
    if (isTimerEnabled) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    startNewTest();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQ = testQuestions[currentIdx];

  const handleSelectOption = (ans: any) => {
    sounds.playClick();
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleMultiToggle = (idx: number) => {
    sounds.playClick();
    const existing = (userAnswers[currentQ.id] as number[]) || [];
    let updated: number[];
    if (existing.includes(idx)) {
      updated = existing.filter(i => i !== idx);
    } else {
      updated = [...existing, idx];
    }
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: updated }));
  };

  const handleMatchSelect = (leftVal: string, rightVal: string) => {
    sounds.playClick();
    const updated = { ...tempMatch, [leftVal]: rightVal };
    setTempMatch(updated);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: updated }));
    setSelectedLeft(null);
  };

  const handleSentenceTap = (word: string) => {
    sounds.playClick();
    const cleanWord = word.replace(/[.,'"]/g, '');
    setTappedWord(cleanWord);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: cleanWord }));
  };

  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    const topicBreakdown: Record<string, { correct: number; total: number }> = {};

    testQuestions.forEach((q) => {
      if (!topicBreakdown[q.topic]) {
        topicBreakdown[q.topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[q.topic].total += 1;

      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'single' || q.type === 'true_false' || q.type === 'fill_blank') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'sentence_tap') {
        isCorrect = typeof userAns === 'string' && typeof q.correctAnswer === 'string' &&
          userAns.toLowerCase().includes(q.correctAnswer.toLowerCase());
      } else if (q.type === 'multiple') {
        if (Array.isArray(userAns) && Array.isArray(q.correctAnswer)) {
          isCorrect = userAns.length === q.correctAnswer.length &&
            userAns.every(val => q.correctAnswer.includes(val));
        }
      } else if (q.type === 'match') {
        // compare object pairs
        if (userAns && typeof userAns === 'object') {
          isCorrect = Object.keys(q.correctAnswer).every(
            k => userAns[k] === q.correctAnswer[k]
          );
        }
      }

      if (isCorrect) {
        correctCount += 1;
        topicBreakdown[q.topic].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / testQuestions.length) * 100);

    // 5-Grade school scale: 86-100 = 5, 71-85 = 4, 56-70 = 3, <55 = 2
    let grade = 2;
    if (percentage >= 86) grade = 5;
    else if (percentage >= 71) grade = 4;
    else if (percentage >= 56) grade = 3;

    const attemptResult: TestAttempt = {
      id: `test_${Date.now()}`,
      date: new Date().toLocaleDateString('uz-UZ'),
      score: correctCount * 5,
      totalQuestions: testQuestions.length,
      percentage,
      grade,
      timeSpentSeconds: 20 * 60 - timeRemaining,
      topicBreakdown
    };

    setTestResult(attemptResult);
    setIsTestCompleted(true);
    onCompleteTest(attemptResult);

    // Earn badge for perfect test
    if (percentage >= 86 && !student.badges.includes('badge_perfect_test')) {
      onUpdateStudent({
        badges: [...student.badges, 'badge_perfect_test'],
        stars: student.stars + 2,
        totalScore: student.totalScore + 50
      });
    }

    if (grade >= 4) {
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      sounds.playWrong();
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (testQuestions.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500">
        Savollar yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header with Timer and Progress */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            {t.testHeader}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.testSub}
          </p>
        </div>

        {!isTestCompleted && (
          <div className="flex items-center gap-3">
            {isTimerEnabled && (
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-200 font-mono font-bold text-sm">
                <Timer className="w-4 h-4 text-amber-600" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}

            <button
              onClick={() => setIsTimerEnabled(!isTimerEnabled)}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              {isTimerEnabled ? "Vaqtni o'chirish" : "Vaqtni yoqish"}
            </button>
          </div>
        )}
      </div>

      {/* When Test is Completed: Report Card */}
      {isTestCompleted && testResult ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8 animate-in zoom-in-95">
          <div className="text-center space-y-3">
            <span className="text-5xl block">
              {testResult.grade === 5 ? '🌟🥇🌟' : testResult.grade === 4 ? '🥈' : '🥉'}
            </span>
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              {testResult.grade === 5
                ? "A'lo natija! (5 baho)"
                : testResult.grade === 4
                ? "Yaxshi natija! (4 baho)"
                : testResult.grade === 3
                ? "Qoniqarli natija (3 baho)"
                : "Qoniqarsiz natija (2 baho)"}
            </h2>
            <p className="text-sm text-slate-500">
              {testResult.grade >= 4 ? t.passedCongrats : "Nazariyani yana bir bor takrorlash tavsiya etiladi."}
            </p>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-center">
              <span className="text-xs text-amber-700 font-bold block mb-1">To'g'ri javoblar</span>
              <span className="font-display font-bold text-2xl text-amber-950 dark:text-amber-200">
                {Math.round((testResult.percentage / 100) * testResult.totalQuestions)} / {testResult.totalQuestions}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-700 font-bold block mb-1">Foiz ko'rsatkichi</span>
              <span className="font-display font-bold text-2xl text-emerald-950 dark:text-emerald-200">
                {testResult.percentage}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 text-center">
              <span className="text-xs text-blue-700 font-bold block mb-1">Maktab bahosi</span>
              <span className="font-display font-bold text-3xl text-blue-950 dark:text-blue-200">
                {testResult.grade}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 text-center">
              <span className="text-xs text-purple-700 font-bold block mb-1">Sarflangan vaqt</span>
              <span className="font-display font-bold text-xl text-purple-950 dark:text-purple-200 font-mono">
                {formatTime(testResult.timeSpentSeconds)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={startNewTest}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-xs inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testni qayta topshirish</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Test Question Card */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          {/* Question Counter & Difficulty */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-xs font-bold font-mono text-slate-500">
              Savol {currentIdx + 1} / {testQuestions.length}
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentQ.difficulty === 'easy'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : currentQ.difficulty === 'medium'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {currentQ.difficulty === 'easy' ? '🟢 Oson' : currentQ.difficulty === 'medium' ? '🟡 O\'rta' : '🔴 Qiyin'}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-snug">
              {lang === 'en' ? currentQ.questionEn : lang === 'ru' ? currentQ.questionRu : currentQ.questionUz}
            </h2>
            <button
              onClick={() => speakWord(currentQ.questionUz)}
              title="Ovozli eshitish"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors shrink-0"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Question Interactive Options based on type */}
          <div className="space-y-3 pt-2">
            {/* 1. Single / True_False / Fill_Blank */}
            {(currentQ.type === 'single' || currentQ.type === 'true_false' || currentQ.type === 'fill_blank') && currentQ.optionsUz && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.optionsUz.map((opt, oIdx) => {
                  const isSelected = userAnswers[currentQ.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-100 font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Multiple choice */}
            {currentQ.type === 'multiple' && currentQ.optionsUz && (
              <div className="space-y-2">
                <span className="text-xs text-slate-400 block mb-1">
                  (Bir nechta variantni belgilashingiz mumkin):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.optionsUz.map((opt, oIdx) => {
                    const selectedList = (userAnswers[currentQ.id] as number[]) || [];
                    const isChecked = selectedList.includes(oIdx);
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleMultiToggle(oIdx)}
                        className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-100 font-bold shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{opt}</span>
                        <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300'}`}>
                          {isChecked && '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Sentence Tap */}
            {currentQ.type === 'sentence_tap' && currentQ.sentenceWords && (
              <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700 text-center space-y-3">
                <span className="text-xs text-slate-500 block">
                  Gapdagi kerakli so'zni bosing:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {currentQ.sentenceWords.map((word, wIdx) => {
                    const clean = word.replace(/[.,'"]/g, '');
                    const isTapped = userAnswers[currentQ.id] === clean;
                    return (
                      <button
                        key={wIdx}
                        onClick={() => handleSentenceTap(word)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-sm md:text-base border transition-transform active:scale-95 ${
                          isTapped
                            ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Match type */}
            {currentQ.type === 'match' && currentQ.matchingPairs && (
              <div className="space-y-4">
                <span className="text-xs text-slate-500 block">
                  Chap tomondagi so'zni bosib, o'ng tomondagi mos ma'noga ulang:
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {currentQ.matchingPairs.map((pair, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setSelectedLeft(pair.left)}
                        className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-colors ${
                          selectedLeft === pair.left
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : tempMatch[pair.left]
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {pair.left} {tempMatch[pair.left] && `➡️ ${tempMatch[pair.left]}`}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {currentQ.matchingPairs.map((pair, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          if (selectedLeft) {
                            handleMatchSelect(selectedLeft, pair.right);
                          }
                        }}
                        disabled={!selectedLeft}
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm font-semibold text-left hover:border-amber-400 disabled:opacity-50"
                      >
                        {pair.right}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
            <button
              disabled={currentIdx === 0}
              onClick={() => {
                sounds.playClick();
                setCurrentIdx(prev => prev - 1);
              }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 disabled:opacity-40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.btnPrev}</span>
            </button>

            {currentIdx < testQuestions.length - 1 ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentIdx(prev => prev + 1);
                }}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs"
              >
                <span>{t.btnNext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Testni yakunlash</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
