/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Language, SectionType, StudentProfile, TestAttempt 
} from './types';
import { Navbar } from './components/Navbar';
import { HomeIslandMap } from './components/HomeIslandMap';
import { TheorySection } from './components/TheorySection';
import { GamesSection } from './components/GamesSection';
import { CasesSection } from './components/CasesSection';
import { TestSection } from './components/TestSection';
import { EvaluationSection } from './components/EvaluationSection';
import { TeacherPanel } from './components/TeacherPanel';
import { ProverbsSection } from './components/ProverbsSection';
import { GlossaryModal } from './components/GlossaryModal';
import { HomeworkModal } from './components/HomeworkModal';
import { sounds } from './services/audio';

const STORAGE_KEY_STUDENT = 'sifatoy_active_student';
const STORAGE_KEY_ALL_STUDENTS = 'sifatoy_all_students_records';
const STORAGE_KEY_THEME = 'sifatoy_theme_is_dark';
const STORAGE_KEY_LANG = 'sifatoy_language';

const initialStudent: StudentProfile = {
  id: `std_${Date.now()}`,
  name: 'Aziza Karomova',
  grade: '7-B',
  stars: 3,
  totalScore: 50,
  completedLessons: ['definition'],
  completedGames: [],
  completedCases: [],
  badges: [],
  lastActive: new Date().toLocaleDateString('uz-UZ'),
  testAttempts: []
};

export default function App() {
  // Navigation
  const [currentSection, setCurrentSection] = useState<SectionType>('home');

  // Modals
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);

  // Settings: Audio, Dark Theme, Language, Projector
  const [isMuted, setIsMuted] = useState(sounds.isMuted);
  const [isProjector, setIsProjector] = useState(false);

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved === 'en' || saved === 'ru' || saved === 'uz') ? saved : 'uz';
  });

  // Dark mode state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Active student profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialStudent;
  });

  // All student records for Teacher Panel
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALL_STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [initialStudent];
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, String(isDark));
  }, [isDark]);

  // Sync projector mode class
  useEffect(() => {
    if (isProjector) {
      document.body.classList.add('projector-mode');
    } else {
      document.body.classList.remove('projector-mode');
    }
  }, [isProjector]);

  // Persist language
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY_LANG, newLang);
  };

  // Persist student updates
  const handleUpdateStudent = (updated: Partial<StudentProfile>) => {
    setStudent(prev => {
      const nextStudent = { ...prev, ...updated, lastActive: new Date().toLocaleDateString('uz-UZ') };
      localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(nextStudent));

      // Also update in allStudents list
      setAllStudents(prevList => {
        const existingIdx = prevList.findIndex(s => s.id === nextStudent.id);
        let updatedList: StudentProfile[];
        if (existingIdx >= 0) {
          updatedList = [...prevList];
          updatedList[existingIdx] = nextStudent;
        } else {
          updatedList = [...prevList, nextStudent];
        }
        localStorage.setItem(STORAGE_KEY_ALL_STUDENTS, JSON.stringify(updatedList));
        return updatedList;
      });

      return nextStudent;
    });
  };

  // When student finishes test
  const handleCompleteTest = (result: TestAttempt) => {
    handleUpdateStudent({
      testAttempts: [...student.testAttempts, result],
      totalScore: student.totalScore + result.score,
      stars: student.stars + (result.grade >= 4 ? 2 : 1)
    });
  };

  // Teacher clear records
  const handleClearStudents = () => {
    setAllStudents([]);
    localStorage.removeItem(STORAGE_KEY_ALL_STUDENTS);
  };

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  const handleToggleDark = () => {
    setIsDark(!isDark);
  };

  const handleToggleProjector = () => {
    sounds.playClick();
    setIsProjector(!isProjector);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-amber-200 selection:text-amber-900">
      {/* Navbar with 3-zone Top Bar Contract */}
      <Navbar
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onToggleDark={handleToggleDark}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isProjector={isProjector}
        onToggleProjector={handleToggleProjector}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentSection === 'home' && (
          <HomeIslandMap
            student={student}
            onUpdateStudent={handleUpdateStudent}
            onNavigate={setCurrentSection}
            lang={lang}
          />
        )}

        {currentSection === 'theory' && (
          <TheorySection
            student={student}
            onUpdateStudent={handleUpdateStudent}
            lang={lang}
          />
        )}

        {currentSection === 'games' && (
          <GamesSection
            student={student}
            onUpdateStudent={handleUpdateStudent}
            lang={lang}
          />
        )}

        {currentSection === 'cases' && (
          <CasesSection
            student={student}
            onUpdateStudent={handleUpdateStudent}
            lang={lang}
          />
        )}

        {currentSection === 'test' && (
          <TestSection
            student={student}
            onUpdateStudent={handleUpdateStudent}
            onCompleteTest={handleCompleteTest}
            lang={lang}
          />
        )}

        {currentSection === 'evaluation' && (
          <EvaluationSection
            student={student}
            onNavigate={setCurrentSection}
            lang={lang}
          />
        )}

        {currentSection === 'teacher' && (
          <TeacherPanel
            studentsList={allStudents}
            onClearStudents={handleClearStudents}
            isProjector={isProjector}
            onToggleProjector={handleToggleProjector}
            lang={lang}
          />
        )}

        {currentSection === 'proverbs' && (
          <ProverbsSection
            student={student}
            onUpdateStudent={handleUpdateStudent}
            lang={lang}
          />
        )}
      </main>

      {/* Quick Action Dock */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            sounds.playClick();
            setIsHomeworkOpen(true);
          }}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <span>📚 Uyga vazifa olish</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setCurrentSection('proverbs');
          }}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <span>📜 Maqollar</span>
        </button>
      </div>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        lang={lang}
      />

      <HomeworkModal
        isOpen={isHomeworkOpen}
        onClose={() => setIsHomeworkOpen(false)}
        student={student}
      />

      {/* Footer conforming to anti-slop rules (unboxed metadata, clean text) */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Sifatoy</span>
            <span>·</span>
            <span>7-sinf Ona tili</span>
            <span>·</span>
            <span>O'zbekiston Respublikasi Xalq ta'limi dasturi</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Grammatik Lug'at
            </button>
            <span>·</span>
            <button
              onClick={() => setIsHomeworkOpen(true)}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Vazifalar generatori
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentSection('teacher')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              O'qituvchi boshqaruvi
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
