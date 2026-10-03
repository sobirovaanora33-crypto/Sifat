import React, { useState } from 'react';
import { X, FileText, Copy, Check, Printer, RefreshCw } from 'lucide-react';
import { StudentProfile } from '../types';
import { sounds } from '../services/audio';

interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const HomeworkModal: React.FC<HomeworkModalProps> = ({
  isOpen,
  onClose,
  student
}) => {
  const [copied, setCopied] = useState(false);
  const [topicIndex, setTopicIndex] = useState(0);

  if (!isOpen) return null;

  const homeworkSets = [
    {
      topic: "Sifat darajalari bo'yicha mustaqil ish",
      tasks: [
        "1. 'shirin, qizil, baland, yangi' sifatlarini oddiy, qiyosiy, orttirma va ozaytirma darajalarda yozing.",
        "2. Sintetik usulda yasalgan 4 ta orttirma darajadagi sifatga (masalan: qip-qizil) gap tuzing.",
        "3. Qiyosiy daraja qo'shimchasi (-roq) qatnashgan 3 ta maqol topib daftaringizga ko'chiring.",
        "4. 'och yashil' va 'ko'kimtir' sifatlarining ma'no farqini tushuntirib bering.",
        "5. Matndan faqat darajalangan sifatlarni ajratib ko'chiring."
      ]
    },
    {
      topic: "Sifat yasalishi bo'yicha mashqlar",
      tasks: [
        "1. -li, -siz, -chan, -dor qo'shimchalari yordamida uchtadan yangi sifat yasang.",
        "2. be-, ba-, no-, ser- old qo'shimchalari (prefikslar) bilan sifatlar hosil qiling.",
        "3. Fe'ldan sifat yasovchi qo'shimchalar (-oq, -gir, -ma) ishtirokida 4 ta misol yozing.",
        "4. 'kuchli' va 'kuchsiz' sifatlarini gap ichida qarama-qarshi qo'llang.",
        "5. Quyidagi so'zlarning o'zagini va qo'shimchasini ajrating: bilimdon, mevali, hosildor."
      ]
    },
    {
      topic: "Sifatlarning ma'no turlari va sintaktik vazifasi",
      tasks: [
        "1. Rang-tus, maza-ta'm va shakl sifatlariga ikkitadan misol keltirib jadval to'ldiring.",
        "2. Sifat gapda kesim vazifasida kelgan 3 ta gap tuzing.",
        "3. 'Yaxshidan ot qoladi' maqolidagi sifatning qanday vazifada kelganini tahlil qiling.",
        "4. Inson xarakterini ifodalovchi 5 ta ijobiy va 5 ta salbiy sifat yozing.",
        "5. 'Kuzgi salqin havo' birikmasidagi sifatning ma'no turini aniqlang."
      ]
    }
  ];

  const currentSet = homeworkSets[topicIndex];

  const handleCopy = () => {
    sounds.playClick();
    const textToCopy = `UYGA VAZIFA (${student.name} - ${student.grade})\nMavzu: ${currentSet.topic}\n\n` + 
      currentSet.tasks.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Uyga vazifa generatori
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-500">Mavzuni tanlang:</span>
          <div className="flex gap-1">
            {homeworkSets.map((_, i) => (
              <button
                key={i}
                onClick={() => setTopicIndex(i)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                  topicIndex === i
                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                {i + 1}-Variant
              </button>
            ))}
          </div>
        </div>

        {/* Exercises list */}
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 space-y-3">
          <h3 className="font-display font-bold text-base text-amber-900 dark:text-amber-200">
            {currentSet.topic}
          </h3>
          <ol className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
            {currentSet.tasks.map((task, idx) => (
              <li key={idx} className="leading-relaxed">
                {task}
              </li>
            ))}
          </ol>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Chop etish (Print)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
