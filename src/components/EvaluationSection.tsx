import React, { useRef } from 'react';
import { 
  Award, Download, Star, CheckCircle, AlertTriangle, ArrowRight, 
  Sparkles, BookOpen, ShieldCheck 
} from 'lucide-react';
import { Language, SectionType, StudentProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { badgesList } from '../data/glossaryData';
import { theoryChapters } from '../data/theoryData';
import { sounds } from '../services/audio';

interface EvaluationSectionProps {
  student: StudentProfile;
  onNavigate: (section: SectionType) => void;
  lang: Language;
}

export const EvaluationSection: React.FC<EvaluationSectionProps> = ({
  student,
  onNavigate,
  lang
}) => {
  const t = getTranslation(lang);
  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const lastTest = student.testAttempts[student.testAttempts.length - 1];

  // Helper to draw and download Certificate as PNG
  const handleDownloadCertificate = () => {
    sounds.playFanfare();
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 850);
    bgGrad.addColorStop(0, '#fdfcfb');
    bgGrad.addColorStop(0.5, '#fef9f3');
    bgGrad.addColorStop(1, '#fef0e2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 850);

    // Decorative Borders
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, 1108, 758);

    // Corner Ornaments
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(60, 60, 16, 0, Math.PI * 2);
    ctx.arc(1140, 60, 16, 0, Math.PI * 2);
    ctx.arc(60, 790, 16, 0, Math.PI * 2);
    ctx.arc(1140, 790, 16, 0, Math.PI * 2);
    ctx.fill();

    // Title: SERTIFIKAT
    ctx.textAlign = 'center';
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 50px "Fredoka", sans-serif';
    ctx.fillText("MUAFFAQIYAT SERTIFIKATI", 600, 150);

    ctx.fillStyle = '#b45309';
    ctx.font = 'italic 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("O'zbek tili fani: 'Sifat so'z turkumi' o'quv moduli", 600, 195);

    // Body Text
    ctx.fillStyle = '#475569';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("Ushbu sertifikat bilan taqdirlanadi:", 600, 270);

    // Student Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 52px "Fredoka", sans-serif';
    ctx.fillText(student.name || "Aziza Karomova", 600, 345);

    // Class / School info
    ctx.fillStyle = '#64748b';
    ctx.font = '24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`7-sinf o'quvchisi (${student.grade || '7-B'})`, 600, 395);

    // Description
    ctx.fillStyle = '#334155';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("Sifat so'z turkumi, uning ma'no turlari, darajalanishi, yasalishi hamda sintaktik", 600, 465);
    ctx.fillText("vazifalarini mukammal o'zlashtirgani va testlarni a'lo bahoga bajargani uchun.", 600, 498);

    // Result metrics line
    const gradeText = lastTest ? `${lastTest.grade} baho (${lastTest.percentage}%)` : "A'lo daraja (100%)";
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Yakuniy ko'rsatkich: ${gradeText}`, 600, 565);

    // Signatures & Stamp
    // Left: Date
    const today = new Date().toLocaleDateString('uz-UZ');
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Berilgan sana: ${today}`, 120, 710);
    ctx.fillText(`Sertifikat ID: SIF-${student.id.slice(0, 8).toUpperCase()}`, 120, 735);

    // Right: Sifatoy Mascot Stamp
    ctx.textAlign = 'right';
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 22px "Fredoka", sans-serif';
    ctx.fillText("Sifatoy Ta'lim Portali", 1080, 705);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("Metodik Kengash Muhrlandi ✔️", 1080, 735);

    // Trigger PNG download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Sertifikat_${student.name || 'Oquvchi'}_Sifatoy.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-white">
            {t.resultsHeader}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            To'plangan ballar, nishonlar va rasmiy yutuq sertifikati
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-200 text-amber-900 dark:text-amber-200 font-display font-bold text-lg">
            ⭐ {student.stars} Yulduz
          </div>
          <div className="bg-rose-50 dark:bg-rose-950/40 px-4 py-2 rounded-xl border border-rose-200 text-rose-900 dark:text-rose-200 font-display font-bold text-lg">
            🏆 {student.totalScore} Ball
          </div>
        </div>
      </div>

      {/* Official Certificate Card Preview */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/40 dark:from-slate-800 dark:via-slate-800 dark:to-amber-950/20 rounded-3xl p-6 md:p-8 border-2 border-amber-300 dark:border-amber-900/60 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200 dark:border-slate-700 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-600 block">
              🎓 Rasmiy Hujjat
            </span>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              {t.certificateTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.certificateDesc}
            </p>
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{t.btnDownloadCert}</span>
          </button>
        </div>

        {/* Certificate Display Layout */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-amber-200 dark:border-slate-700 text-center space-y-4 shadow-xs">
          <span className="text-4xl block">🏅</span>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-amber-950 dark:text-amber-300">
            {student.name || "Aziza Karomova"}
          </h3>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {student.grade || "7-B"} o'quvchisi
          </p>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            O'zbek tili fani bo'yicha sifat so'z turkumining ma'no turlari, darajalanishi, yasalishi va gapdagi sintaktik vazifalarini to'liq o'zlashtirdi.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              Baho: {lastTest ? `${lastTest.grade} baho (${lastTest.percentage}%)` : "5 baho (A'lo)"}
            </span>
          </div>
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
          📊 Mavzular bo'yicha o'zlashtirish tahlili
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {theoryChapters.map((chap) => {
            const isCompleted = student.completedLessons.includes(chap.id);
            return (
              <div
                key={chap.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {chap.titleUz}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {isCompleted ? "O'zlashtirilgan (A'lo)" : "Takrorlash tavsiya etiladi"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      100%
                    </span>
                  ) : (
                    <button
                      onClick={() => onNavigate('theory')}
                      className="text-xs text-amber-600 font-semibold hover:underline"
                    >
                      O'rganish ➡️
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Earned Showcase */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <span>{t.badgesEarned}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badgesList.map((badge) => {
            const isEarned = student.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isEarned
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-50'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-200 dark:bg-amber-900 flex items-center justify-center text-2xl mx-auto mb-2">
                  {badge.id === 'badge_colors' ? '🎨' : badge.id === 'badge_degrees' ? '🪜' : badge.id === 'badge_engineer' ? '⚙️' : badge.id === 'badge_speed' ? '⚡' : '🌟'}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {lang === 'en' ? badge.titleEn : lang === 'ru' ? badge.titleRu : badge.titleUz}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {lang === 'en' ? badge.descEn : lang === 'ru' ? badge.descRu : badge.descUz}
                </p>
                <span className="text-[10px] font-bold block mt-2 text-amber-700 dark:text-amber-400">
                  {isEarned ? '✅ Qo\'lga kiritildi' : '🔒 Qulflangan'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
