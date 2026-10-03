import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, Sparkles, AlertCircle, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Language, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { theoryChapters, semanticTypesDetail, interactiveDegreeData, affixConstructorData } from '../data/theoryData';
import { MascotSifatoy, MascotMood } from './MascotSifatoy';
import { sounds, speakWord } from '../services/audio';

interface TheorySectionProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  lang: Language;
}

export const TheorySection: React.FC<TheorySectionProps> = ({
  student,
  onUpdateStudent,
  lang
}) => {
  const t = getTranslation(lang);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [mascotQuote, setMascotQuote] = useState<string>("Darsni diqqat bilan o'rganing va har bir qoidani mustahkamlab boring!");

  // Interactive Affix Constructor state
  const [selectedRoot, setSelectedRoot] = useState(affixConstructorData.roots[0].word);
  const [selectedAffix, setSelectedAffix] = useState(affixConstructorData.affixes[0].affix);
  const [constructorResult, setConstructorResult] = useState<{ isValid: boolean; word: string; def?: string } | null>(null);

  // Interactive Degree Thermometer state
  const [activeDegreeIdx, setActiveDegreeIdx] = useState(1); // 1 = Oddiy

  const currentChapter = theoryChapters[activeChapterIdx];

  const handleSelectAnswer = (qId: string, optIdx: number, correctIdx: number) => {
    sounds.playClick();
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    if (optIdx === correctIdx) {
      sounds.playCorrect();
      setMascotMood('cheering');
      setMascotQuote(t.sifatoyCorrect);

      // Record completed lesson if not already
      if (!student.completedLessons.includes(currentChapter.id)) {
        const newCompleted = [...student.completedLessons, currentChapter.id];
        onUpdateStudent({
          completedLessons: newCompleted,
          stars: student.stars + 1,
          totalScore: student.totalScore + 10
        });
      }
    } else {
      sounds.playWrong();
      setMascotMood('encouraging');
      setMascotQuote(t.sifatoyWrong);
    }
  };

  const handleBuildAffix = () => {
    sounds.playClick();
    const combo = affixConstructorData.validCombos.find(
      c => c.root === selectedRoot && c.affix === selectedAffix
    );

    if (combo) {
      sounds.playCorrect();
      setConstructorResult({
        isValid: true,
        word: combo.result,
        def: combo.def
      });
      setMascotMood('cheering');
      setMascotQuote(`Ajoyib! '${combo.result}' sifatini yasadik!`);
    } else {
      sounds.playWrong();
      setConstructorResult({
        isValid: false,
        word: `${selectedRoot} + ${selectedAffix}`
      });
      setMascotMood('thinking');
      setMascotQuote("Bu o'zak va qo'shimcha birikmasi o'zbek tilida mavjud emas. Boshqasini sinab ko'ring!");
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header and Mascot Callout */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            {t.theoryHeader}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.theorySub}
          </p>
        </div>

        <MascotSifatoy
          mood={mascotMood}
          speechText={mascotQuote}
          size="md"
        />
      </div>

      {/* Chapters Horizontal Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {theoryChapters.map((chap, idx) => {
          const isDone = student.completedLessons.includes(chap.id);
          const isActive = idx === activeChapterIdx;
          return (
            <button
              key={chap.id}
              onClick={() => {
                sounds.playClick();
                setActiveChapterIdx(idx);
                setMascotMood('happy');
                setMascotQuote(`Keling, '${chap.titleUz}' mavzusini batafsil ko'rib chiqamiz!`);
              }}
              className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
              }`}
            >
              <span>{lang === 'en' ? chap.titleEn : lang === 'ru' ? chap.titleRu : chap.titleUz}</span>
              {isDone && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />}
            </button>
          );
        })}
      </div>

      {/* Chapter Content Details */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
        {/* Title and Voice Narration */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              {lang === 'en' ? currentChapter.titleEn : lang === 'ru' ? currentChapter.titleRu : currentChapter.titleUz}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-1">
              {lang === 'en' ? currentChapter.summaryEn : lang === 'ru' ? currentChapter.summaryRu : currentChapter.summaryUz}
            </p>
          </div>
          <button
            onClick={() => speakWord(currentChapter.summaryUz)}
            title="Qoidani ovozli eshitish"
            aria-label="Qoidani ovozli eshitish"
            className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors shrink-0"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Definition Detail */}
        {currentChapter.id === 'definition' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">Qanday? (What kind?)</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">Predmetning sifatini so'raydi: <span className="font-semibold text-amber-700 dark:text-amber-400">chiroyli</span> gul, <span className="font-semibold text-amber-700 dark:text-amber-400">aqlli</span> bola.</p>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/40">
                <span className="font-bold text-sky-900 dark:text-sky-300 block mb-1">Qanaqa? (Which sort?)</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">Belgining xususiyatini so'raydi: <span className="font-semibold text-sky-700 dark:text-sky-400">yumaloq</span> tosh, <span className="font-semibold text-sky-700 dark:text-sky-400">issiq</span> choy.</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">Qaysi? (Which one?)</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">Ajratib ko'rsatuvchi belgi: <span className="font-semibold text-emerald-700 dark:text-emerald-400">kuzgi</span> meva, <span className="font-semibold text-emerald-700 dark:text-emerald-400">oldingi</span> qator.</p>
              </div>
            </div>

            {/* Remember box */}
            <div className="p-4 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 border-l-4 border-amber-500 text-slate-800 dark:text-slate-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <span className="font-bold">{t.rememberBox}</span>
                <p>Sifat har doim o'zi bog'langan otga tobe bo'ladi va gapda uning belgisini oydinlashtiradi (aniqlovchi bo'ladi). Sifatlar turlanmaydi, ya'ni rus tilidagidek jins (rod) yoki kelishikda o'zgarmaydi!</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Semantic Types Detail */}
        {currentChapter.id === 'types' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Sifatlar predmetning qanday xususiyatini ko'rsatishiga qarab quyidagi 9 guruhga ajratiladi. Har bir kartochkadagi ovoz tugmasi orqali so'zlarni tinglashingiz mumkin:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {semanticTypesDetail.map((st, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col justify-between hover:border-amber-400 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{st.icon}</span>
                      <button
                        onClick={() => speakWord(st.examplesUz)}
                        title="Misollarni tinglash"
                        className="p-1 rounded text-slate-400 hover:text-amber-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {lang === 'en' ? st.typeEn : lang === 'ru' ? st.typeRu : st.typeUz}
                    </h4>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      {st.examplesUz}
                    </p>
                    {lang !== 'uz' && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {lang === 'en' ? st.examplesEn : st.examplesRu}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Asliy va nisbiy sifatlar */}
        {currentChapter.id === 'asliy_nisbiy' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-3">
                <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  Asliy sifatlar (Qualitative)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Belgini bevosita bildiradi. Belgining ortiq-kamligini ko'rsatish (darajalanish) xususiyatiga ega:
                </p>
                <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                  <li>Darajalanadi: <span className="font-semibold text-emerald-700">oq — oqroq — oppoq</span></li>
                  <li>Antonimi bo'ladi: <span className="font-semibold text-emerald-700">katta ↔ kichik, issiq ↔ sovuq</span></li>
                  <li>Takroriy shakl yasaydi: <span className="font-semibold text-emerald-700">katta-katta, mayda-mayda</span></li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
                <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  Nisbiy sifatlar (Relational)
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Belgini boshqa biror narsaga, materialga, o'rin yoki vaqtga nisbat berib bildiradi:
                </p>
                <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                  <li>Darajalanmaydi: <span className="font-semibold text-indigo-700">tilla soat</span> (eng tilla soat deb bo'lmaydi)</li>
                  <li>Antonimi bo'lmaydi: <span className="font-semibold text-indigo-700">qishloqi, g'ishtli</span></li>
                  <li>Otdan yasalgan bo'ladi: <span className="font-semibold text-indigo-700">paxtali to'n, kuzgi bug'doy</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 4. Sifat darajalari (Interactive Thermometer) */}
        {currentChapter.id === 'degrees' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{t.thermometerTitle}</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Bosqichlarni bosib, sifatning qanday o'zgarishini kuzating!
              </p>
            </div>

            {/* Interactive Thermometer Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interactiveDegreeData.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.playClick();
                    setActiveDegreeIdx(idx);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    activeDegreeIdx === idx
                      ? `${item.color} shadow-md scale-102 font-bold`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wider block opacity-70 mb-1">
                    {idx === 0 ? '1. Past me\'yor' : idx === 1 ? '2. Odatiy me\'yor' : idx === 2 ? '3. Qiyoslash' : '4. Yuqori me\'yor'}
                  </span>
                  <span className="font-display font-bold text-base block">
                    {item.degree}
                  </span>
                  <span className="text-xs opacity-90 block mt-1">
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Degree Word Showcase */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">
                {interactiveDegreeData[activeDegreeIdx].degree}ga oid misollar:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {interactiveDegreeData[activeDegreeIdx].examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-base block">
                        {ex.form}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {ex.expl}
                      </span>
                    </div>
                    <button
                      onClick={() => speakWord(ex.form)}
                      title="Ovozli eshitish"
                      className="p-1 rounded text-slate-400 hover:text-amber-500"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Formation (Affix Constructor) */}
        {currentChapter.id === 'formation' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{t.affixConstructorTitle}</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                O'zak so'zni va qo'shimchani tanlang, so'ngra 'Tekshirish' tugmasi bilan sifat yasang:
              </p>
            </div>

            {/* Constructor Playground */}
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border border-amber-200/80 dark:border-slate-700 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Root selector */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {t.rootWord}:
                  </label>
                  <select
                    value={selectedRoot}
                    onChange={(e) => setSelectedRoot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    {affixConstructorData.roots.map((r, i) => (
                      <option key={i} value={r.word}>
                        {r.word} ({r.meaning})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Affix selector */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {t.affixWord}:
                  </label>
                  <select
                    value={selectedAffix}
                    onChange={(e) => setSelectedAffix(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-amber-500"
                  >
                    {affixConstructorData.affixes.map((a, i) => (
                      <option key={i} value={a.affix}>
                        {a.affix} ({a.desc})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Combine action */}
                <div className="sm:pt-5">
                  <button
                    onClick={handleBuildAffix}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-xs"
                  >
                    Sifatni yasash ⚙️
                  </button>
                </div>
              </div>

              {/* Construction feedback */}
              {constructorResult && (
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                    constructorResult.isValid
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {constructorResult.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-base block font-display">
                        {constructorResult.word}
                      </span>
                      <span className="text-xs">
                        {constructorResult.isValid
                          ? constructorResult.def
                          : t.invalidWord}
                      </span>
                    </div>
                  </div>

                  {constructorResult.isValid && (
                    <button
                      onClick={() => speakWord(constructorResult.word)}
                      title="Tinglash"
                      className="p-1 rounded text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. Structure Detail */}
        {currentChapter.id === 'structure' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">1. Sodda sifatlar</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Bitta o'zakdan iborat: <span className="font-semibold">yaxshi, baland, keng, oq.</span></p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">2. Qo'shma sifatlar</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Ikki o'zak qo'shilib bitta ma'no beradi (qo'shib yoziladi): <span className="font-semibold">sofdil, toshbag'ir, oqko'ngil.</span></p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">3. Juft sifatlar</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Zid yoki ma'nodosh so'zlardan (chiziqcha bilan): <span className="font-semibold">katta-kichik, achchiq-chuchuk, oq-qora.</span></p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">4. Takroriy sifatlar</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Bitta so'zning aynan takrorlanishi (chiziqcha bilan): <span className="font-semibold">katta-katta, uzun-uzun, mayda-mayda.</span></p>
              </div>
            </div>
          </div>
        )}

        {/* 7. Syntax Detail */}
        {currentChapter.id === 'syntax' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">1. Aniqlovchi (asosiy vazifasi):</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <span className="underline decoration-wavy decoration-amber-500 font-semibold">Qizil</span> olma shoxda pishdi. (Qanday olma? — Qizil olma).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">2. Kesim vazifasida:</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Toshkent ko'chalari <span className="underline decoration-double decoration-amber-500 font-semibold">keng va ravondir</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">3. Otlashganda (Ega yoki To'ldiruvchi):</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <span className="underline font-semibold">Yaxshidan</span> ot qoladi, <span className="underline font-semibold">yomondan</span> dod qoladi. (Kimdan? — Yaxshidan, to'ldiruvchi).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Check Quizzes (2-3 questions per chapter) */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>📝 {t.quickCheckTitle}</span>
          </h3>

          <div className="space-y-4">
            {currentChapter.quickQuestions.map((q) => {
              const selectedOpt = answers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIdx;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                    {q.questionUz}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.optionsUz.map((opt, optIdx) => {
                      let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300';
                      if (isAnswered) {
                        if (optIdx === q.correctIdx) {
                          btnStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectAnswer(q.id, optIdx, q.correctIdx)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === q.correctIdx && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                          )}
                          {isAnswered && optIdx === selectedOpt && optIdx !== q.correctIdx && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation[q.id] && (
                    <div
                      className={`text-xs p-3 rounded-xl border animate-in fade-in duration-200 ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      <span className="font-bold">{isCorrect ? '✅ To\'g\'ri!' : '❌ Xato:'} </span>
                      <span>{q.explanationUz}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons: Prev / Next chapter */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            disabled={activeChapterIdx === 0}
            onClick={() => {
              sounds.playClick();
              setActiveChapterIdx(prev => prev - 1);
            }}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.btnPrev}</span>
          </button>

          <span className="text-xs text-slate-500 font-mono">
            {activeChapterIdx + 1} / {theoryChapters.length}
          </span>

          <button
            disabled={activeChapterIdx === theoryChapters.length - 1}
            onClick={() => {
              sounds.playClick();
              setActiveChapterIdx(prev => prev + 1);
            }}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span>{t.btnNext}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
