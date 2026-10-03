import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, RotateCcw, Award, CheckCircle2, XCircle, Timer, 
  HelpCircle, Volume2, Sparkles, Flame, Users, Trophy
} from 'lucide-react';
import { Language, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  fallingWordsData, degreeLadderSets, meaningBasketsData, 
  memoryCardPairs, fairytaleBlankData, fortuneWheelTasks, WordItem 
} from '../data/gamesData';
import { MascotSifatoy } from './MascotSifatoy';
import { sounds, speakWord } from '../services/audio';

interface GamesSectionProps {
  student: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  lang: Language;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  student,
  onUpdateStudent,
  lang
}) => {
  const t = getTranslation(lang);
  const [activeGame, setActiveGame] = useState<number>(0);

  // 1. GAME: Sifatni ushla (Catch the adjective)
  const [catchTimeLeft, setCatchTimeLeft] = useState(60);
  const [catchIsActive, setCatchIsActive] = useState(false);
  const [catchScore, setCatchScore] = useState(0);
  const [catchStreak, setCatchStreak] = useState(0);
  const [currentFallingWords, setCurrentFallingWords] = useState<(WordItem & { id: number; x: number })[]>([]);
  const catchTimerRef = useRef<any>(null);

  // 2. GAME: Darajalar narvoni
  const [ladderSetIdx, setLadderSetIdx] = useState(0);
  const [placedRungs, setPlacedRungs] = useState<Record<string, string>>({}); // { ozaytirma: word, ... }
  const [availableLadderWords, setAvailableLadderWords] = useState<string[]>([]);
  const [ladderFeedback, setLadderFeedback] = useState<string | null>(null);

  // 3. GAME: Ma'no savatlari
  const [basketWordIdx, setBasketWordIdx] = useState(0);
  const [basketScore, setBasketScore] = useState(0);
  const [basketFeedback, setBasketFeedback] = useState<string | null>(null);

  // 4. GAME: Sifat yasovchi zavod
  const [factoryRoot, setFactoryRoot] = useState("aql");
  const [factoryAffix, setFactoryAffix] = useState("-li");
  const [factoryStatus, setFactoryStatus] = useState<'idle' | 'success' | 'smoke'>('idle');
  const [factoryMessage, setFactoryMessage] = useState("");

  // 5. GAME: Juftini top (Memory match)
  const [memoryCards, setMemoryCards] = useState<{ id: string; text: string; pairKey: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMatchedCount, setMemoryMatchedCount] = useState(0);

  // 6. GAME: Ertakni bo'ya
  const [fairytaleAnswers, setFairytaleAnswers] = useState<Record<number, string>>({});
  const [fairytaleFinished, setFairytaleFinished] = useState(false);

  // 7. GAME: Omad g'ildiragi
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof fortuneWheelTasks[0] | null>(null);

  // 8. GAME: Jamoaviy jang (Classroom Team Battle)
  const [numTeams, setNumTeams] = useState(2);
  const [teamScores, setTeamScores] = useState<number[]>([0, 0, 0, 0]);
  const [currentTeamTurn, setCurrentTeamTurn] = useState(0);
  const [teamQuestionIdx, setTeamQuestionIdx] = useState(0);

  // Game menu
  const gameTabs = [
    { id: 0, title: "1. Sifatni ushla!", icon: "🎯" },
    { id: 1, title: "2. Darajalar narvoni", icon: "🪜" },
    { id: 2, title: "3. Ma'no savatlari", icon: "🧺" },
    { id: 3, title: "4. Sifat yasovchi zavod", icon: "🏭" },
    { id: 4, title: "5. Juftini top (Xotira)", icon: "🃏" },
    { id: 5, title: "6. Ertakni bo'ya", icon: "🎨" },
    { id: 6, title: "7. Omad g'ildiragi", icon: "🎡" },
    { id: 7, title: "8. Jamoaviy jang (Sinf)", icon: "👥" }
  ];

  // Initialize Memory Game Cards
  useEffect(() => {
    initMemoryGame();
    initLadderGame(ladderSetIdx);
  }, []);

  const initMemoryGame = () => {
    const cards: any[] = [];
    memoryCardPairs.forEach((pair) => {
      cards.push({ id: `a_${pair.id}`, text: pair.textA, pairKey: pair.pairKey, isFlipped: false, isMatched: false });
      cards.push({ id: `b_${pair.id}`, text: pair.textB, pairKey: pair.pairKey, isFlipped: false, isMatched: false });
    });
    // Shuffle
    cards.sort(() => Math.random() - 0.5);
    setMemoryCards(cards);
    setFlippedCards([]);
    setMemoryMatchedCount(0);
  };

  const initLadderGame = (setIdx: number) => {
    const currentSet = degreeLadderSets[setIdx];
    const words = [...currentSet.items.map(i => i.word)].sort(() => Math.random() - 0.5);
    setAvailableLadderWords(words);
    setPlacedRungs({});
    setLadderFeedback(null);
  };

  // 1. CATCH GAME HANDLERS
  const startCatchGame = () => {
    sounds.playFanfare();
    setCatchScore(0);
    setCatchStreak(0);
    setCatchTimeLeft(60);
    setCatchIsActive(true);
    setCurrentFallingWords([]);

    if (catchTimerRef.current) clearInterval(catchTimerRef.current);

    catchTimerRef.current = setInterval(() => {
      setCatchTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(catchTimerRef.current);
          setCatchIsActive(false);
          sounds.playFanfare();
          recordGameCompletion('game_catch', 20);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Spawn falling words loop
  useEffect(() => {
    if (!catchIsActive) return;
    const wordInterval = setInterval(() => {
      const randomWord = fallingWordsData[Math.floor(Math.random() * fallingWordsData.length)];
      const randomX = Math.floor(Math.random() * 80) + 5; // 5% to 85%
      setCurrentFallingWords(prev => [
        ...prev.slice(-7), // keep max 8 on screen
        { ...randomWord, id: Date.now() + Math.random(), x: randomX }
      ]);
    }, 1100);

    return () => clearInterval(wordInterval);
  }, [catchIsActive]);

  const handleWordTap = (item: WordItem & { id: number }) => {
    // Remove clicked word
    setCurrentFallingWords(prev => prev.filter(w => w.id !== item.id));

    if (item.isAdjective) {
      sounds.playCorrect();
      const points = 10 + catchStreak * 2;
      setCatchScore(s => s + points);
      setCatchStreak(st => st + 1);
    } else {
      sounds.playWrong();
      setCatchScore(s => Math.max(0, s - 10));
      setCatchStreak(0);
    }
  };

  // Helper to record game completion and award stars
  const recordGameCompletion = (gameId: string, bonusPoints = 15) => {
    if (!student.completedGames.includes(gameId)) {
      onUpdateStudent({
        completedGames: [...student.completedGames, gameId],
        stars: student.stars + 1,
        totalScore: student.totalScore + bonusPoints
      });
    }
  };

  // 2. LADDER GAME HANDLERS
  const handlePlaceLadderWord = (word: string, degreeKey: string) => {
    sounds.playClick();
    const currentSet = degreeLadderSets[ladderSetIdx];
    const targetItem = currentSet.items.find(i => i.degree === degreeKey);

    if (targetItem && targetItem.word === word) {
      sounds.playCorrect();
      setPlacedRungs(prev => ({ ...prev, [degreeKey]: word }));
      setAvailableLadderWords(prev => prev.filter(w => w !== word));

      // Check if all 4 rungs placed
      if (Object.keys(placedRungs).length === 3) {
        sounds.playFanfare();
        setLadderFeedback("Barakalla! Barcha darajalar to'g'ri joylashtirildi!");
        recordGameCompletion('game_ladder', 25);
      }
    } else {
      sounds.playWrong();
      setLadderFeedback(`Xato! '${word}' so'zi ${degreeKey} darajaga mos kelmaydi.`);
    }
  };

  // 3. BASKET GAME HANDLERS
  const handleBasketDrop = (basketId: string) => {
    const currentWord = meaningBasketsData.words[basketWordIdx];
    if (currentWord.basketId === basketId) {
      sounds.playCorrect();
      setBasketScore(s => s + 10);
      setBasketFeedback("To'g'ri savat!");
    } else {
      sounds.playWrong();
      setBasketFeedback("Noto'g'ri savat! Qaytadan o'ylab ko'ring.");
    }

    if (basketWordIdx < meaningBasketsData.words.length - 1) {
      setBasketWordIdx(idx => idx + 1);
    } else {
      sounds.playFanfare();
      setBasketFeedback("Barcha so'zlar savatlarga joylandi! Ofarin!");
      recordGameCompletion('game_baskets', 20);
    }
  };

  // 4. AFFIX FACTORY HANDLER
  const handleFactoryRun = () => {
    sounds.playClick();
    const validMap: Record<string, string[]> = {
      "aql": ["-li", "-siz"],
      "tuz": ["-li", "-siz"],
      "ish": ["-chan"],
      "meva": ["-dor"],
      "ijod": ["-kor"],
      "ilm": ["-iy"],
      "kuch": ["-li", "-siz", "ba-"],
      "kitob": []
    };

    const allowed = validMap[factoryRoot] || [];
    if (allowed.includes(factoryAffix)) {
      sounds.playCorrect();
      setFactoryStatus('success');
      const constructed = factoryAffix.startsWith('-') ? `${factoryRoot}${factoryAffix.replace('-', '')}` : `${factoryAffix}${factoryRoot}`;
      setFactoryMessage(`Mukammal sifat: "${constructed}"!`);
      recordGameCompletion('game_factory', 15);
    } else {
      sounds.playWrong();
      setFactoryStatus('smoke');
      setFactoryMessage(`⚠️ Xato birikma: "${factoryRoot} + ${factoryAffix}" mavjud emas!`);
    }
  };

  // 5. MEMORY GAME HANDLER
  const handleFlipCard = (index: number) => {
    if (flippedCards.length === 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    sounds.playClick();
    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [idx1, idx2] = newFlipped;
      if (newCards[idx1].pairKey === newCards[idx2].pairKey) {
        sounds.playCorrect();
        setTimeout(() => {
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setMemoryCards(newCards);
          setFlippedCards([]);
          setMemoryMatchedCount(c => {
            const next = c + 1;
            if (next === memoryCardPairs.length) {
              sounds.playFanfare();
              recordGameCompletion('game_memory', 25);
            }
            return next;
          });
        }, 500);
      } else {
        sounds.playWrong();
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setMemoryCards(newCards);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  // 6. FAIRYTALE HANDLER
  const handleSelectFairytaleWord = (segIdx: number, word: string) => {
    sounds.playClick();
    setFairytaleAnswers(prev => ({ ...prev, [segIdx]: word }));
  };

  const handleCheckFairytale = () => {
    let allCorrect = true;
    fairytaleBlankData.segments.forEach((seg, idx) => {
      if (seg.answer && fairytaleAnswers[idx] !== seg.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      sounds.playFanfare();
      setFairytaleFinished(true);
      recordGameCompletion('game_fairytale', 30);
    } else {
      sounds.playWrong();
    }
  };

  // 7. FORTUNE WHEEL HANDLER
  const spinWheel = () => {
    if (isSpinning) return;
    sounds.playSpin();
    setIsSpinning(true);
    setSelectedTask(null);

    const randomDeg = Math.floor(Math.random() * 360) + 1440; // at least 4 full rotations
    setWheelRotation(prev => prev + randomDeg);

    setTimeout(() => {
      setIsSpinning(false);
      sounds.playCorrect();
      const taskIndex = Math.floor(Math.random() * fortuneWheelTasks.length);
      setSelectedTask(fortuneWheelTasks[taskIndex]);
    }, 3200);
  };

  // 8. TEAM BATTLE HANDLER
  const handleTeamScoreAdd = (teamIdx: number, pts: number) => {
    sounds.playCorrect();
    const updated = [...teamScores];
    updated[teamIdx] += pts;
    setTeamScores(updated);
    setCurrentTeamTurn((currentTeamTurn + 1) % numTeams);
    setTeamQuestionIdx(idx => idx + 1);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            {t.gamesHeader}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.gamesSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MascotSifatoy
            mood="happy"
            speechText="Qaysi o'yinni tanlasangiz ham, diqqat bilan o'ynang va yangi rekordlar o'rnating!"
            size="sm"
          />
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {gameTabs.map((gt) => (
          <button
            key={gt.id}
            onClick={() => {
              sounds.playClick();
              setActiveGame(gt.id);
            }}
            className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
              activeGame === gt.id
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-xs scale-102'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
            }`}
          >
            <span className="text-base block mb-0.5">{gt.icon}</span>
            <span className="truncate block">{gt.title}</span>
          </button>
        ))}
      </div>

      {/* GAME 1: Sifatni ushla */}
      {activeGame === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                1. "Sifatni ushla!" o'yini 🎯
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Ekranda so'zlar uchadi. Faqat sifatlarni tezda bosing! Ot, fe'l yoki ravishlarni bosmang.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-200 font-bold text-sm font-mono">
                <Timer className="w-4 h-4 text-amber-500" />
                <span>{catchTimeLeft}s</span>
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-200 text-rose-900 dark:text-rose-200 font-bold text-sm font-mono">
                Ball: {catchScore}
              </div>
              {catchStreak > 1 && (
                <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>x{catchStreak}</span>
                </div>
              )}
            </div>
          </div>

          {!catchIsActive && catchTimeLeft === 60 ? (
            <div className="py-16 text-center space-y-4">
              <span className="text-5xl block">🏃‍♂️💨</span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Tayyormisiz?
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                60 soniya ichida imkon qadar ko'p sifatlarni ushlang va eng yuqori ballni to'plang!
              </p>
              <button
                onClick={startCatchGame}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-base shadow-sm inline-flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>O'yinni boshlash!</span>
              </button>
            </div>
          ) : !catchIsActive && catchTimeLeft === 0 ? (
            <div className="py-12 text-center space-y-4">
              <span className="text-5xl block">🏆</span>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Vaqt tugadi!
              </h3>
              <p className="text-lg font-bold text-amber-600 font-mono">
                Sizning yakuniy balingiz: {catchScore} ball!
              </p>
              <button
                onClick={startCatchGame}
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl text-sm inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan o'ynash</span>
              </button>
            </div>
          ) : (
            <div className="relative h-96 bg-gradient-to-b from-sky-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden select-none">
              <div className="absolute inset-0 p-4">
                {currentFallingWords.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleWordTap(item)}
                    style={{ left: `${item.x}%`, top: '45%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm md:text-base rounded-2xl shadow-md border border-slate-200 dark:border-slate-600 hover:scale-110 active:scale-95 transition-transform animate-bounce cursor-pointer"
                  >
                    {item.word}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: Darajalar narvoni */}
      {activeGame === 1 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              2. "Darajalar narvoni" 🪜
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              So'zlarni bosib, ularni narvonning to'g'ri daraja pog'onasiga joylashtiring.
            </p>
          </div>

          {/* Word options available to place */}
          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500">Joylashtirish uchun so'zlar:</span>
            {availableLadderWords.map((w, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-bold rounded-xl text-xs sm:text-sm border border-amber-300"
              >
                {w}
              </span>
            ))}
            {availableLadderWords.length === 0 && (
              <span className="text-xs text-emerald-600 font-bold">Barcha so'zlar narvonga joylandi!</span>
            )}
          </div>

          {/* Ladder Rungs from Superlative down to Diminutive */}
          <div className="space-y-3 max-w-xl mx-auto">
            {['orttirma', 'qiyosiy', 'oddiy', 'ozaytirma'].map((degreeKey) => {
              const label =
                degreeKey === 'orttirma'
                  ? '4. Orttirma daraja (Superlative)'
                  : degreeKey === 'qiyosiy'
                  ? '3. Qiyosiy daraja (Comparative)'
                  : degreeKey === 'oddiy'
                  ? '2. Oddiy daraja (Base)'
                  : '1. Ozaytirma daraja (Diminutive)';

              const placedWord = placedRungs[degreeKey];

              return (
                <div
                  key={degreeKey}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {label}
                    </span>
                    <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {placedWord ? placedWord : '— Bo\'sh pog\'ona —'}
                    </span>
                  </div>

                  {!placedWord && availableLadderWords.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {availableLadderWords.map((w) => (
                        <button
                          key={w}
                          onClick={() => handlePlaceLadderWord(w, degreeKey)}
                          className="px-2.5 py-1 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-amber-50"
                        >
                          + {w}
                        </button>
                      ))}
                    </div>
                  )}

                  {placedWord && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {ladderFeedback && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 rounded-xl text-center text-sm font-medium">
              {ladderFeedback}
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => {
                const nextIdx = (ladderSetIdx + 1) % degreeLadderSets.length;
                setLadderSetIdx(nextIdx);
                initLadderGame(nextIdx);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold"
            >
              Keyingi so'zlar to'plami ➡️
            </button>
          </div>
        </div>
      )}

      {/* GAME 3: Ma'no savatlari */}
      {activeGame === 2 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                3. "Ma'no savatlari" 🧺
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Berilgan sifatni o'zining to'g'ri ma'no turidagi savatga tashlang!
              </p>
            </div>
            <div className="bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 text-sm">
              Ball: {basketScore}
            </div>
          </div>

          {/* Current Word to Sort */}
          {basketWordIdx < meaningBasketsData.words.length ? (
            <div className="p-8 rounded-2xl bg-amber-50/60 dark:bg-slate-900 border border-amber-200 text-center space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Savatga joylanishi kerak bo'lgan sifat ({basketWordIdx + 1} / {meaningBasketsData.words.length}):
              </span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-amber-950 dark:text-amber-200">
                "{meaningBasketsData.words[basketWordIdx].word}"
              </h3>
            </div>
          ) : (
            <div className="p-8 text-center space-y-3">
              <span className="text-4xl block">🎉</span>
              <h3 className="font-bold text-xl">Barcha so'zlar to'g'ri saralandi!</h3>
            </div>
          )}

          {/* Baskets Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {meaningBasketsData.baskets.map((b) => (
              <button
                key={b.id}
                disabled={basketWordIdx >= meaningBasketsData.words.length}
                onClick={() => handleBasketDrop(b.id)}
                className={`p-6 rounded-2xl border-2 text-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer ${b.color}`}
              >
                <span className="text-4xl block mb-2">{b.icon}</span>
                <span className="font-display font-bold text-base block text-slate-900 dark:text-white">
                  {b.nameUz}
                </span>
                <span className="text-xs text-slate-500">Savatga tashlash ⬇️</span>
              </button>
            ))}
          </div>

          {basketFeedback && (
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-center text-sm font-semibold">
              {basketFeedback}
            </div>
          )}
        </div>
      )}

      {/* GAME 4: Sifat yasovchi zavod */}
      {activeGame === 3 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              4. "Sifat yasovchi zavod" 🏭
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              O'zak va qo'shimchalarni birlashtirib mashinani ishga tushiring! Noto'g'ri birikmada zavod mashinasi tutun chiqaradi!
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-center">
                <span className="text-xs text-slate-500 block mb-1 font-bold">1. O'zak so'z</span>
                <select
                  value={factoryRoot}
                  onChange={(e) => setFactoryRoot(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                >
                  <option value="aql">aql (mind)</option>
                  <option value="tuz">tuz (salt)</option>
                  <option value="ish">ish (work)</option>
                  <option value="meva">meva (fruit)</option>
                  <option value="ijod">ijod (create)</option>
                  <option value="ilm">ilm (science)</option>
                  <option value="kuch">kuch (power)</option>
                  <option value="kitob">kitob (book)</option>
                </select>
              </div>

              <span className="text-2xl font-bold text-amber-500">+</span>

              <div className="text-center">
                <span className="text-xs text-slate-500 block mb-1 font-bold">2. Qo'shimcha</span>
                <select
                  value={factoryAffix}
                  onChange={(e) => setFactoryAffix(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                >
                  <option value="-li">-li (egalik)</option>
                  <option value="-siz">-siz (mahrumlik)</option>
                  <option value="-chan">-chan (ishchan)</option>
                  <option value="-dor">-dor (mevador)</option>
                  <option value="-kor">-kor (ijodkor)</option>
                  <option value="-iy">-iy (ilmiy)</option>
                  <option value="ba-">ba- (baquvvat)</option>
                </select>
              </div>

              <div className="sm:pt-5">
                <button
                  onClick={handleFactoryRun}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-xs"
                >
                  Zavodni yoqish ⚙️
                </button>
              </div>
            </div>

            {/* Factory Machine Animation Box */}
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              {factoryStatus === 'idle' ? (
                <div className="text-slate-400 space-y-1">
                  <span className="text-4xl block">🏭</span>
                  <p className="text-xs">Zavod tayyor turibdi. Birikmani tanlab yoqing!</p>
                </div>
              ) : factoryStatus === 'success' ? (
                <div className="space-y-2 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-95">
                  <span className="text-5xl block animate-bounce">✨💎✨</span>
                  <h3 className="font-display font-bold text-2xl">{factoryMessage}</h3>
                </div>
              ) : (
                <div className="space-y-2 text-rose-600 dark:text-rose-400 animate-in shake">
                  <span className="text-5xl block">💨💥💨</span>
                  <h3 className="font-display font-bold text-xl">{factoryMessage}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GAME 5: Juftini top (Memory game) */}
      {activeGame === 4 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                5. "Juftini top" (Antonimlar xotira o'yini) 🃏
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Kartochkalarni ochib, qarama-qarshi ma'noli sifatlar juftini moslashtiring (masalan: issiq — sovuq).
              </p>
            </div>
            <div className="text-sm font-bold text-amber-600">
              Topilgan juftlar: {memoryMatchedCount} / {memoryCardPairs.length}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleFlipCard(idx)}
                className={`h-24 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 p-2 flex items-center justify-center text-center cursor-pointer border ${
                  card.isMatched
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : card.isFlipped
                    ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-950 dark:text-amber-100 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-transparent hover:border-amber-400'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <span>{card.text}</span>
                ) : (
                  <span className="text-2xl text-slate-400">❓</span>
                )}
              </button>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={initMemoryGame}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
            >
              Kartalarni qayta aralashtirish 🔄
            </button>
          </div>
        </div>
      )}

      {/* GAME 6: Ertakni bo'ya */}
      {activeGame === 5 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              6. "Ertakni bo'ya" 🎨
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Sifatlarsiz zerikarli matnga mos sifatlarni tanlang. Sifatlar bilan ertak jonli va rang-barang holga keladi!
            </p>
          </div>

          <div className={`p-6 rounded-2xl transition-all duration-500 border ${
            fairytaleFinished 
              ? 'bg-gradient-to-r from-pink-50 via-amber-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 border-amber-300 shadow-md' 
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
          }`}>
            <h3 className="font-display font-bold text-lg text-amber-900 dark:text-amber-200 mb-4 text-center">
              {fairytaleBlankData.titleUz}
            </h3>

            <div className="text-sm md:text-base leading-relaxed text-slate-800 dark:text-slate-200 space-y-3">
              {fairytaleBlankData.segments.map((seg, idx) => (
                <span key={idx}>
                  {seg.textBefore}
                  {seg.options && seg.options.length > 0 && (
                    <select
                      value={fairytaleAnswers[idx] || ""}
                      onChange={(e) => handleSelectFairytaleWord(idx, e.target.value)}
                      className="mx-1 px-2 py-1 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 font-bold text-amber-700 dark:text-amber-300 text-xs sm:text-sm"
                    >
                      <option value="">(sifat tanlang)</option>
                      {seg.options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleCheckFairytale}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-xs"
              >
                Ertakni tekshirish ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME 7: Omad g'ildiragi */}
      {activeGame === 6 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              7. "Omad g'ildiragi" 🎡
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              G'ildirakni aylantiring va tasodifiy tushgan topshiriqni bajaring!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            {/* Spinning Wheel SVG */}
            <div className="relative">
              {/* Pointer indicator */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-2xl">
                🔻
              </div>

              <div
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: 'transform 3.2s cubic-bezier(0.15, 0.9, 0.2, 1)'
                }}
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-amber-400 shadow-lg flex items-center justify-center bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 overflow-hidden text-white font-bold"
              >
                <div className="text-center p-4">
                  <span className="text-3xl block">🎯</span>
                  <span className="font-display font-bold text-lg">SIFAT</span>
                </div>
              </div>
            </div>

            <button
              disabled={isSpinning}
              onClick={spinWheel}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-display font-bold text-lg rounded-2xl shadow-md transition-transform active:scale-95"
            >
              {isSpinning ? "Aylanmoqda..." : "G'ildirakni aylantirish! 🎰"}
            </button>

            {selectedTask && (
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 max-w-md text-center space-y-2 animate-in zoom-in-95">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Sizning topshirig'ingiz:
                </span>
                <p className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {selectedTask.taskUz}
                </p>
                <span className="inline-block text-xs font-semibold px-2.5 py-1 bg-amber-200 dark:bg-amber-900 rounded-full text-amber-950 dark:text-amber-100">
                  +{selectedTask.points} ball
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GAME 8: Jamoaviy jang (Classroom Team Battle) */}
      {activeGame === 7 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span>8. "Jamoaviy jang" (Sinf rejimi)</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                Sinfni 2, 3 yoki 4 jamoaga bo'lib, navbatma-navbat savollarga javob berish va doskada hisobni yuritish rejimi!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Jamoalar:</span>
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumTeams(num)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    numTeams === num ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {num} ta
                </button>
              ))}
            </div>
          </div>

          {/* Teams Scoreboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: numTeams }).map((_, idx) => {
              const isTurn = currentTeamTurn === idx;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isTurn
                      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm scale-102'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      {idx + 1}-Jamoa
                    </span>
                    {isTurn && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white animate-pulse">
                        Navbat
                      </span>
                    )}
                  </div>
                  <div className="font-display font-bold text-3xl text-slate-900 dark:text-white">
                    {teamScores[idx]} <span className="text-sm font-normal text-slate-500">ball</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <button
                      onClick={() => handleTeamScoreAdd(idx, 10)}
                      className="flex-1 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                    >
                      +10 (To'g'ri)
                    </button>
                    <button
                      onClick={() => handleTeamScoreAdd(idx, 0)}
                      className="py-1 px-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold"
                    >
                      O'tkazish
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Question for Team */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
              Doskadagi joriy savol ({currentTeamTurn + 1}-jamoa uchun):
            </span>
            <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white">
              {fortuneWheelTasks[teamQuestionIdx % fortuneWheelTasks.length].taskUz}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};
