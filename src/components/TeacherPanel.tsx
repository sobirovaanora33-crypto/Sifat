import React, { useState } from 'react';
import { 
  Lock, KeyRound, Download, Trash2, Monitor, Shield, Users, 
  CheckCircle2, AlertTriangle, Search 
} from 'lucide-react';
import { Language, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { sounds } from '../services/audio';

interface TeacherPanelProps {
  studentsList: StudentProfile[];
  onClearStudents: () => void;
  isProjector: boolean;
  onToggleProjector: () => void;
  lang: Language;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  studentsList,
  onClearStudents,
  isProjector,
  onToggleProjector,
  lang
}) => {
  const t = getTranslation(lang);
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const correctPin = '7777';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === correctPin) {
      sounds.playCorrect();
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      sounds.playWrong();
      setErrorMsg(t.wrongPin);
    }
  };

  const handleExportCsv = () => {
    sounds.playClick();
    if (studentsList.length === 0) return;

    // Build CSV content
    const headers = ["Ismi", "Sinfi", "Yulduzlar", "Umumiy Ball", "Oxirgi Baho", "Sana"];
    const rows = studentsList.map(s => {
      const lastAttempt = s.testAttempts[s.testAttempts.length - 1];
      const grade = lastAttempt ? lastAttempt.grade : '-';
      const date = lastAttempt ? lastAttempt.date : s.lastActive;
      return [
        `"${s.name}"`,
        `"${s.grade}"`,
        s.stars,
        s.totalScore,
        grade,
        `"${date}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Oquvchilar_Natijalari_Sifatoy_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearWithConfirm = () => {
    if (window.confirm(t.clearConfirm)) {
      sounds.playClick();
      onClearStudents();
    }
  };

  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            <span>{t.teacherTitle}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sinf o'quvchilari natijalari jurnali, CSV eksport va proyektor rejimi
          </p>
        </div>

        {/* Projector Mode quick switch */}
        <button
          onClick={onToggleProjector}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
            isProjector
              ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>{isProjector ? t.exitProjector : t.projectorMode}</span>
        </button>
      </div>

      {!isAuthenticated ? (
        /* PIN Login Modal / Card */
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Xavfsizlik tekshiruvi
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.teacherPinLabel}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full text-center tracking-widest text-2xl font-mono py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              {t.teacherPinSubmit}
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            Standart o'qituvchi PIN-kodi: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">7777</span>
          </p>
        </div>
      ) : (
        /* Authenticated Dashboard */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          {/* Action toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O'quvchini qidirish..."
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                disabled={studentsList.length === 0}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.exportCsv}</span>
              </button>

              <button
                onClick={handleClearWithConfirm}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearData}</span>
              </button>
            </div>
          </div>

          {/* Students Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">{t.tableColName}</th>
                  <th className="py-3 px-4">{t.tableColClass}</th>
                  <th className="py-3 px-4">Yulduzlar</th>
                  <th className="py-3 px-4">{t.tableColScore}</th>
                  <th className="py-3 px-4">{t.tableColGrade}</th>
                  <th className="py-3 px-4">{t.tableColDate}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => {
                    const lastAttempt = s.testAttempts[s.testAttempts.length - 1];
                    const grade = lastAttempt ? lastAttempt.grade : '-';
                    const gradeColor =
                      grade === 5
                        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                        : grade === 4
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60'
                        : grade === 3
                        ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-slate-500 bg-slate-100 dark:bg-slate-800';

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {s.name}
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                          {s.grade}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-amber-600">
                          ⭐ {s.stars}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {s.totalScore}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${gradeColor}`}>
                            {grade !== '-' ? `${grade} baho` : 'Topshirmagan'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-xs">
                          {lastAttempt ? lastAttempt.date : s.lastActive}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      {t.noRecords}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
