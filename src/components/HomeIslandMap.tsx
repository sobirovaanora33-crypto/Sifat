import React, { useState } from 'react';
import { Star, Award, BookOpen, Gamepad2, Briefcase, FileQuestion, ArrowRight, UserCheck, Sparkles, Volume2 } from 'lucide-react';
import { Language, SectionType, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { MascotSifatoy } from './MascotSifatoy';
import { dailyAdjectiveList } from '../data/proverbsData';
import { sounds, speakWord } from '../services/audio';

interface HomeIslandMapProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onNavigate: (section: SectionType) => void;
  lang: Language;
}

export const HomeIslandMap: React.FC<HomeIslandMapProps> = ({
  student,
  onUpdateStudent,
  onNavigate,
  lang
}) => {
  const t = getTranslation(lang);
  const [isEditingProfile, setIsEditingProfile] = useState(!student.name);
  const [tempName, setTempName] = useState(student.name || '');
  const [tempGrade, setTempGrade] = useState(student.grade || '7-B');

  // Daily adjective (pick based on day of month)
  const todayAdjective = dailyAdjectiveList[new Date().getDate() % dailyAdjectiveList.length];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    onUpdateStudent({
      name: tempName.trim(),
      grade: tempGrade.trim() || '7-sinf'
    });
    setIsEditingProfile(false);
    sounds.playFanfare();
  };

  // Learning stages / Islands
  const islands = [
    {
      id: 'theory',
      titleUz: "Nazariya oroli",
      titleEn: "Theory Island",
      titleRu: "Остров теории",
      descUz: "Sifat so'z turkumining barcha 7 qoidasi va tezkor savollari",
      descEn: "All 7 core rules of Uzbek adjectives with quick check quizzes",
      descRu: "Все 7 правил имени прилагательного и быстрые тесты",
      icon: BookOpen,
      color: "from-sky-500 to-blue-600",
      isUnlocked: true,
      starsTarget: 7,
      completedCount: student.completedLessons.length
    },
    {
      id: 'games',
      titleUz: "O'yinlar vodiysi",
      titleEn: "Games Valley",
      titleRu: "Долина игр",
      descUz: "8 ta interaktiv o'yin: sifat ushlash, daraja narvoni, savatlar...",
      descEn: "8 engaging games: catch adjectives, degree ladder, baskets...",
      descRu: "8 интерактивных игр: поймай качество, лестница степеней...",
      icon: Gamepad2,
      color: "from-emerald-500 to-teal-600",
      isUnlocked: true,
      starsTarget: 8,
      completedCount: student.completedGames.length
    },
    {
      id: 'cases',
      titleUz: "Detektiv & Keyslar qo'rg'oni",
      titleEn: "Detective & Cases Fortress",
      titleRu: "Крепость кейсов",
      descUz: "6 ta hayotiy vaziyat: detektiv, reklama, ob-havo, menyu...",
      descEn: "6 real-world cases: lost cat detective, market ads, weather...",
      descRu: "6 жизненных кейсов: детектив, реклама яблок, прогноз погоды...",
      icon: Briefcase,
      color: "from-amber-500 to-orange-600",
      isUnlocked: student.completedLessons.length >= 2,
      starsTarget: 6,
      completedCount: student.completedCases.length
    },
    {
      id: 'test',
      titleUz: "Sinov cho'qqisi (Test)",
      titleEn: "Summit of Trials (Test)",
      titleRu: "Вершина испытаний (Тест)",
      descUz: "50 ta savoldan 20 tasiga javob berib, 5 baho va sertifikat oling!",
      descEn: "Randomized 20 questions out of 50 to earn your official 5-grade certificate!",
      descRu: "20 случайных вопросов из 50 для получения сертификата!",
      icon: FileQuestion,
      color: "from-rose-500 to-red-600",
      isUnlocked: student.completedLessons.length >= 4,
      starsTarget: 5,
      completedCount: student.testAttempts.length
    }
  ];

  // Calculate overall progress percentage
  const totalTasks = 7 + 8 + 6 + 1; // theory (7) + games (8) + cases (6) + final test (1)
  const completedTasks = student.completedLessons.length + student.completedGames.length + student.completedCases.length + (student.testAttempts.length > 0 ? 1 : 0);
  const progressPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Welcome & Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-100/60 dark:from-slate-800 dark:via-slate-800/90 dark:to-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Sifatoy Mascot Intro */}
          <div className="flex-1">
            <MascotSifatoy
              mood="cheering"
              speechText={
                student.name
                  ? `Salom, ${student.name}! ${t.sifatoyIntro}`
                  : t.sifatoyIntro
              }
              size="lg"
            />
          </div>

          {/* Student Profile Quick View / Edit */}
          <div className="w-full lg:w-80 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs">
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-500" />
                  <span>O'quvchi ma'lumoti</span>
                </h3>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    {t.classLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={tempGrade}
                    onChange={(e) => setTempGrade(e.target.value)}
                    placeholder={t.classPlaceholder}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg text-sm transition-colors shadow-xs"
                >
                  {t.startLearning}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {student.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {student.grade} o'quvchisi
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setIsEditingProfile(true);
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {t.editProfile}
                  </button>
                </div>

                {/* Score & Stars Counters */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{t.starsCount}</span>
                    </div>
                    <span className="font-display font-bold text-xl text-amber-900 dark:text-amber-200">
                      {student.stars} ⭐
                    </span>
                  </div>

                  <div className="bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/30">
                    <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>{t.totalScore}</span>
                    </div>
                    <span className="font-display font-bold text-xl text-rose-900 dark:text-rose-200">
                      {student.totalScore}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-amber-200/60 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
            <span>Umumiy bilim o'zlashtirish darajasi:</span>
            <span className="font-bold font-mono text-amber-600 dark:text-amber-400">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Adjective Card: "Bugungi sifat" */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
              🌟 Bugungi kun sifati
            </span>
            <button
              onClick={() => speakWord(todayAdjective.word)}
              title="Ovozli eshitish"
              className="p-1 rounded text-indigo-600 hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <h4 className="font-display font-bold text-2xl text-indigo-950 dark:text-indigo-200">
            {todayAdjective.word}
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium text-indigo-700 dark:text-indigo-300">
              {todayAdjective.typeUz}
            </span>{' '}
            — {todayAdjective.meaningUz}
          </p>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
            Darajalanishi: {todayAdjective.degreeLadder}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 max-w-sm text-xs md:text-sm text-slate-700 dark:text-slate-300 italic">
          {todayAdjective.quoteUz}
        </div>
      </div>

      {/* Interactive Island Learning Path */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              {t.islandTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.islandDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {islands.map((island) => {
            const IconComponent = island.icon;
            return (
              <div
                key={island.id}
                className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-300 ${
                  island.isUnlocked
                    ? 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${island.color} flex items-center justify-center text-white shadow-sm`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {island.completedCount} / {island.starsTarget}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {lang === 'en'
                      ? island.titleEn
                      : lang === 'ru'
                      ? island.titleRu
                      : island.titleUz}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {lang === 'en'
                      ? island.descEn
                      : lang === 'ru'
                      ? island.descRu
                      : island.descUz}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-700/60">
                  {island.isUnlocked ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onNavigate(island.id as SectionType);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors"
                    >
                      <span>{t.btnExplore}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center py-2">
                      🔒 {t.lockedIsland}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
