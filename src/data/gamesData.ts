export interface WordItem {
  word: string;
  isAdjective: boolean;
  type?: string;
  translationEn?: string;
  translationRu?: string;
}

export const fallingWordsData: WordItem[] = [
  // Adjectives (correct targets)
  { word: "shirin", isAdjective: true, translationEn: "sweet", translationRu: "сладкий" },
  { word: "ko'k", isAdjective: true, translationEn: "blue", translationRu: "синий" },
  { word: "aqlli", isAdjective: true, translationEn: "smart", translationRu: "умный" },
  { word: "chiroyli", isAdjective: true, translationEn: "beautiful", translationRu: "красивый" },
  { word: "katta", isAdjective: true, translationEn: "big", translationRu: "большой" },
  { word: "mehribon", isAdjective: true, translationEn: "kind", translationRu: "добрый" },
  { word: "og'ir", isAdjective: true, translationEn: "heavy", translationRu: "тяжелый" },
  { word: "achchiq", isAdjective: true, translationEn: "spicy/bitter", translationRu: "горький" },
  { word: "qip-qizil", isAdjective: true, translationEn: "bright red", translationRu: "ярко-красный" },
  { word: "balandroq", isAdjective: true, translationEn: "higher", translationRu: "выше" },
  { word: "kuzgi", isAdjective: true, translationEn: "autumnal", translationRu: "осенний" },
  { word: "oqish", isAdjective: true, translationEn: "whitish", translationRu: "беловатый" },
  { word: "sersuv", isAdjective: true, translationEn: "juicy", translationRu: "сочный" },
  { word: "kamtar", isAdjective: true, translationEn: "humble", translationRu: "скромный" },
  { word: "dumaloq", isAdjective: true, translationEn: "round", translationRu: "круглый" },

  // Distractors (Nouns, Verbs, Adverbs)
  { word: "kitob", isAdjective: false, translationEn: "book (noun)", translationRu: "книга (сущ.)" },
  { word: "yugurmoq", isAdjective: false, translationEn: "to run (verb)", translationRu: "бежать (глагол)" },
  { word: "tezda", isAdjective: false, translationEn: "quickly (adverb)", translationRu: "быстро (наречие)" },
  { word: "qalam", isAdjective: false, translationEn: "pencil (noun)", translationRu: "карандаш (сущ.)" },
  { word: "o'qidi", isAdjective: false, translationEn: "read (verb)", translationRu: "читал (глагол)" },
  { word: "kecha", isAdjective: false, translationEn: "yesterday (adverb)", translationRu: "вчера (наречие)" },
  { word: "daryo", isAdjective: false, translationEn: "river (noun)", translationRu: "река (сущ.)" },
  { word: "kuldi", isAdjective: false, translationEn: "laughed (verb)", translationRu: "смеялся (глагол)" },
  { word: "sekin", isAdjective: false, translationEn: "slowly (adverb)", translationRu: "медленно (наречие)" },
  { word: "quyosh", isAdjective: false, translationEn: "sun (noun)", translationRu: "солнце (сущ.)" },
  { word: "yozmoq", isAdjective: false, translationEn: "to write (verb)", translationRu: "писать (глагол)" }
];

export const degreeLadderSets = [
  {
    id: "set_white",
    baseWord: "oq (white)",
    items: [
      { id: "1", word: "oqish", degree: "ozaytirma", label: "Ozaytirma (Diminutive)" },
      { id: "2", word: "oq", degree: "oddiy", label: "Oddiy (Base)" },
      { id: "3", word: "oqroq", degree: "qiyosiy", label: "Qiyosiy (Comparative)" },
      { id: "4", word: "op-oq", degree: "orttirma", label: "Orttirma (Superlative)" }
    ]
  },
  {
    id: "set_sweet",
    baseWord: "shirin (sweet)",
    items: [
      { id: "1", word: "sal shirin", degree: "ozaytirma", label: "Ozaytirma (Diminutive)" },
      { id: "2", word: "shirin", degree: "oddiy", label: "Oddiy (Base)" },
      { id: "3", word: "shirinroq", degree: "qiyosiy", label: "Qiyosiy (Comparative)" },
      { id: "4", word: "eng shirin", degree: "orttirma", label: "Orttirma (Superlative)" }
    ]
  },
  {
    id: "set_red",
    baseWord: "qizil (red)",
    items: [
      { id: "1", word: "qizg'ish", degree: "ozaytirma", label: "Ozaytirma (Diminutive)" },
      { id: "2", word: "qizil", degree: "oddiy", label: "Oddiy (Base)" },
      { id: "3", word: "qizilroq", degree: "qiyosiy", label: "Qiyosiy (Comparative)" },
      { id: "4", word: "qip-qizil", degree: "orttirma", label: "Orttirma (Superlative)" }
    ]
  }
];

export const meaningBasketsData = {
  baskets: [
    { id: "rang", nameUz: "Rang-tus", nameEn: "Color", icon: "🎨", color: "border-rose-400 bg-rose-50 dark:bg-rose-950/30" },
    { id: "tam", nameUz: "Maza-ta'm", nameEn: "Taste", icon: "🍯", color: "border-amber-400 bg-amber-50 dark:bg-amber-950/30" },
    { id: "shakl", nameUz: "Shakl-ko'rinish", nameEn: "Shape", icon: "🔷", color: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30" },
    { id: "xarakter", nameUz: "Xususiyat-xarakter", nameEn: "Character", icon: "🤝", color: "border-cyan-400 bg-cyan-50 dark:bg-cyan-950/30" }
  ],
  words: [
    { word: "sariq", basketId: "rang", hint: "rang" },
    { word: "nordon", basketId: "tam", hint: "ta'm" },
    { word: "dumaloq", basketId: "shakl", hint: "shakl" },
    { word: "mehribon", basketId: "xarakter", hint: "xarakter" },
    { word: "yashil", basketId: "rang", hint: "rang" },
    { word: "achchiq", basketId: "tam", hint: "ta'm" },
    { word: "yassi", basketId: "shakl", hint: "shakl" },
    { word: "kamtar", basketId: "xarakter", hint: "xarakter" },
    { word: "ko'k", basketId: "rang", hint: "rang" },
    { word: "shirin", basketId: "tam", hint: "ta'm" },
    { word: "to'rtburchak", basketId: "shakl", hint: "shakl" },
    { word: "dangasa", basketId: "xarakter", hint: "xarakter" }
  ]
};

export const memoryCardPairs = [
  { id: 1, textA: "issiq (hot)", textB: "sovuq (cold)", pairKey: "temp" },
  { id: 2, textA: "baland (high)", textB: "past (low)", pairKey: "height" },
  { id: 3, textA: "aqlli (smart)", textB: "nodon (foolish)", pairKey: "wisdom" },
  { id: 4, textA: "shirin (sweet)", textB: "achchiq (bitter)", pairKey: "taste" },
  { id: 5, textA: "katta (large)", textB: "kichik (small)", pairKey: "size" },
  { id: 6, textA: "yosh (young)", textB: "qari (old)", pairKey: "age" }
];

export const fairytaleBlankData = {
  titleUz: "Sehrli vodiy ertagi",
  titleEn: "The Tale of the Enchanted Valley",
  segments: [
    { textBefore: "Bir bor ekan, bir yo'q ekan, qadim zamonlarda bir ", placeholder: "___", answer: "go'zal", options: ["go'zal", "kulmoq", "kecha"], hint: "chiroy bildiruvchi sifat" },
    { textBefore: " vodiy bor ekan. Bu vodiyda doimo ", placeholder: "___", answer: "xushbo'y", options: ["xushbo'y", "yugurdi", "tez"], hint: "hid bildiruvchi sifat" },
    { textBefore: " gullar o'sar va daryoda esa ", placeholder: "___", answer: "muzdek", options: ["muzdek", "kitob", "asta"], hint: "harorat bildiruvchi sifat" },
    { textBefore: " suvlar oqardi. U yerda yashovchi odamlar juda ", placeholder: "___", answer: "mehribon", options: ["mehribon", "yotdi", "qalam"], hint: "xarakter bildiruvchi sifat" },
    { textBefore: " va oqko'ngil edilar. Ular har doim ", placeholder: "___", answer: "shirin", options: ["shirin", "ertalab", "uchdi"], hint: "ta'm bildiruvchi sifat" },
    { textBefore: " mevalar yetishtirishar edi.", placeholder: "", answer: "", options: [], hint: "" }
  ]
};

export const fortuneWheelTasks = [
  { id: 1, taskUz: "Maza-ta'mni bildiruvchi 3 ta sifat ayting va gap tuzing!", points: 20 },
  { id: 2, taskUz: "'Katta' sifatining barcha 4 darajasini ayting!", points: 25 },
  { id: 3, taskUz: "Inson xarakterini bildiruvchi 3 ta sifat toping!", points: 20 },
  { id: 4, taskUz: "'-li' qo'shimchasi bilan 3 ta yangi sifat yasang!", points: 30 },
  { id: 5, taskUz: "Juft sifatlarga 2 ta misol keltiring va doskaga yozing!", points: 25 },
  { id: 6, taskUz: "Otlashgan sifat qatnashgan bitta maqol ayting!", points: 35 },
  { id: 7, taskUz: "'qip-qizil' va 'ko'kimtir' sifatlarining darajalarini ayting!", points: 25 },
  { id: 8, taskUz: "Sifatning gapdagi 2 ta asosiy sintaktik vazifasini ayting!", points: 30 }
];
