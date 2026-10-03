import { TheoryChapter } from '../types';

export const theoryChapters: TheoryChapter[] = [
  {
    id: 'definition',
    titleUz: "1. Sifat nima?",
    titleEn: "1. What is an Adjective?",
    titleRu: "1. Что такое имя прилагательное?",
    icon: "Sparkles",
    summaryUz: "Predmetning belgisini (rangi, mazasi, shakli, xarakteri, o'lchovini) bildirib, qanday?, qanaqa?, qaysi? so'roqlariga javob bo'ladigan mustaqil so'z turkumi sifat deyiladi.",
    summaryEn: "An independent part of speech in Uzbek that denotes the attribute of an object and answers the questions: qanday? (what kind?), qanaqa?, qaysi? (which?).",
    summaryRu: "Самостоятельная часть речи, обозначающая признак предмета и отвечающая на вопросы: qanday? (какой?), qanaqa?, qaysi? (который?).",
    quickQuestions: [
      {
        id: 'q_def_1',
        questionUz: "Sifat so'z turkumi qanday so'roqlarga javob bo'ladi?",
        optionsUz: ["kim?, nima?", "qanday?, qanaqa?, qaysi?", "qancha?, nechanchi?", "nima qildi?, nima qilyapti?"],
        correctIdx: 1,
        explanationUz: "Sifat predmetning belgisini bildirib, 'qanday?', 'qanaqa?', 'qaysi?' so'roqlariga javob bo'ladi."
      },
      {
        id: 'q_def_2',
        questionUz: "Quyidagi qatordan faqat sifatlar berilgan qatorni toping:",
        optionsUz: ["kitob, qalam, daftar", "yugurmoq, o'qimoq, kulmoq", "shirin, baland, ko'k", "tezda, sekin, kecha"],
        correctIdx: 2,
        explanationUz: "'shirin', 'baland', 'ko'k' so'zlari predmetning belgisini bildiradi va 'qanday?' so'rog'iga javob bo'ladi."
      }
    ]
  },
  {
    id: 'types',
    titleUz: "2. Sifatning ma'no turlari",
    titleEn: "2. Semantic Types of Adjectives",
    titleRu: "2. Лексико-семантические разряды",
    icon: "Palette",
    summaryUz: "Sifatlar qanday belgini bildirishiga ko'ra 9 ta asosiy ma'no turiga bo'linadi: rang-tus, maza-ta'm, shakl-ko'rinish, hajm-o'lchov, vazn, hid, xususiyat-xarakter, holat, o'rin-payt.",
    summaryEn: "Adjectives are grouped into 9 semantic categories: color, taste, shape, dimension/size, weight, smell, character/trait, state/condition, and time/location.",
    summaryRu: "Прилагательные делятся на 9 смысловых категорий: цвет, вкус, форма, размер, вес, запах, характер/свойство, состояние, место/время.",
    quickQuestions: [
      {
        id: 'q_type_1',
        questionUz: "'Kamtar, mehribon, saxiy' so'zlari qaysi ma'no turiga kiradi?",
        optionsUz: ["rang-tus", "xususiyat-xarakter", "maza-ta'm", "o'rin-payt"],
        correctIdx: 1,
        explanationUz: "Insonning ichki fazilatlari va xulq-atvorini bildiruvchi so'zlar xususiyat-xarakter sifatlaridir."
      },
      {
        id: 'q_type_2',
        questionUz: "'Kuzgi shamol, ertalabki shabada' birikmalaridagi sifatlar qaysi ma'noni bildiradi?",
        optionsUz: ["shakl-ko'rinish", "vazn", "o'rin-payt", "hid"],
        correctIdx: 2,
        explanationUz: "'Kuzgi' va 'ertalabki' so'zlari belgining vaqt/mavsumga tegishli ekanligini, ya'ni o'rin-payt ma'nosini bildiradi."
      }
    ]
  },
  {
    id: 'asliy_nisbiy',
    titleUz: "3. Asliy va nisbiy sifatlar",
    titleEn: "3. Qualitative (Asliy) vs Relational (Nisbiy)",
    titleRu: "3. Качественные и относительные прилагательные",
    icon: "Layers",
    summaryUz: "Asliy sifatlar belgini bevosita bildiradi, daraja hosil qiladi va antonimga ega (oq, katta, aqlli). Nisbiy sifatlar belgini boshqa predmet yoki tushunchaga nisbatan bildiradi va darajalanmaydi (tilla uzuk, qishki kiyim).",
    summaryEn: "Asliy (qualitative) adjectives express inherent qualities directly and have degrees (oq - op-oq). Nisbiy (relational) adjectives express attributes through relations and lack degrees (tilla uzuk).",
    summaryRu: "Asliy (качественные) выражают признак непосредственно и имеют степени (oq - op-oq). Nisbiy (относительные) выражают признак через отношение к предмету и не имеют степеней (tilla uzuk).",
    quickQuestions: [
      {
        id: 'q_asliy_1',
        questionUz: "Quyidagilardan qaysi biri nisbiy sifat hisoblanadi?",
        optionsUz: ["qizil", "yog'ochli", "issiq", "shirin"],
        correctIdx: 1,
        explanationUz: "'Yog'ochli' so'zi yog'och predmetiga nisbat berib yasalgan nisbiy sifatdir, uni darajalab bo'lmaydi (eng yog'ochli deb bo'lmaydi)."
      },
      {
        id: 'q_asliy_2',
        questionUz: "Asliy sifatlarning asosiy xususiyati nima?",
        optionsUz: ["Hech qachon darajalanmaydi", "Daraja hosil qila oladi va antonimi bo'ladi", "Faqat fe'ldan yasaladi", "Faqat son bilan birikadi"],
        correctIdx: 1,
        explanationUz: "Asliy sifatlar belgining darajasini ko'rsata oladi (oq, oqroq, oppoq) va qarama-qarshi juftlikka (katta - kichik) ega bo'ladi."
      }
    ]
  },
  {
    id: 'degrees',
    titleUz: "4. Sifat darajalari",
    titleEn: "4. Degrees of Comparison",
    titleRu: "4. Степени сравнения качеств",
    icon: "TrendingUp",
    summaryUz: "Sifat darajalari 4 xil bo'ladi: Oddiy (qizil), Qiyosiy (-roq: qizilroq), Orttirma (eng, juda, g'oyat yoki qip-qizil), Ozaytirma (-(i)sh, -imtir yoki och, sal: qizg'ish, och qizil).",
    summaryEn: "4 degrees of comparison: Oddiy (base: shirin), Qiyosiy (comparative: shirinroq), Orttirma (superlative: eng shirin, qip-qizil), Ozaytirma (diminutive: shirinroq / oqish, och sariq).",
    summaryRu: "4 степени: Oddiy (положительная: shirin), Qiyosiy (сравнительная: shirinroq), Orttirma (превосходная: eng shirin, qip-qizil), Ozaytirma (уменьшительная: oqish, och sariq).",
    quickQuestions: [
      {
        id: 'q_deg_1',
        questionUz: "'Qip-qizil, tim-qora, yap-yangi' so'zlari sifatning qaysi darajasida?",
        optionsUz: ["Oddiy daraja", "Qiyosiy daraja", "Orttirma daraja", "Ozaytirma daraja"],
        correctIdx: 2,
        explanationUz: "Bosh bo'g'inni takrorlab 'p' yoki 'm' qo'shish orqali sifatning orttirma darajasi sintetik usulda yasaladi."
      },
      {
        id: 'q_deg_2',
        questionUz: "'Ko'kimtir, sarg'ish, och yashil' so'zlari qaysi darajaga mansub?",
        optionsUz: ["Ozaytirma daraja", "Orttirma daraja", "Qiyosiy daraja", "Oddiy daraja"],
        correctIdx: 0,
        explanationUz: "-imtir, -ish, -g'ish qo'shimchalari va 'och', 'sal' so'zlari belgining me'yordan ozligini bildiradi (ozaytirma daraja)."
      }
    ]
  },
  {
    id: 'formation',
    titleUz: "5. Sifat yasalishi",
    titleEn: "5. Adjective Word Formation",
    titleRu: "5. Словообразование прилагательных",
    icon: "Wrench",
    summaryUz: "Sifatlar ot va fe'llarga qo'shimchalar qo'shish orqali yasaladi: -li, -siz, -gi/-ki/-qi, -chan, -kor, -dor, -iy hamda prefikslar: be-, ba-, no-, ser-.",
    summaryEn: "Adjectives are formed from nouns and verbs using suffixes (-li, -siz, -gi, -chan, -dor) and prefixes (be-, ba-, no-, ser-).",
    summaryRu: "Прилагательные образуются от существительных и глаголов с помощью суффиксов (-li, -siz, -gi, -chan) и приставок (be-, ba-, no-, ser-).",
    quickQuestions: [
      {
        id: 'q_form_1',
        questionUz: "'Serhosil' va 'bebaho' so'zlaridagi 'ser-' va 'be-' qismlari nima?",
        optionsUz: ["Fe'l yasovchi qo'shimcha", "Sifat yasovchi old qo'shimcha (prefiks)", "Kelishik qo'shimchasi", "Egalik qo'shimchasi"],
        correctIdx: 1,
        explanationUz: "'ser-', 'be-', 'ba-', 'no-' tojikcha/forscha o'zlashgan sifat yasovchi old qo'shimchalar (prefiksoidlar)dir."
      },
      {
        id: 'q_form_2',
        questionUz: "Qaysi qo'shimcha 'ega emaslik, yetishmaslik' ma'nosidagi sifat yasaydi?",
        optionsUz: ["-li", "-siz", "-dor", "-kor"],
        correctIdx: 1,
        explanationUz: "-siz qo'shimchasi belgining yo'qligini bildiradi (kuchsiz, tuzsiz, aqlsiz)."
      }
    ]
  },
  {
    id: 'structure',
    titleUz: "6. Tuzilishiga ko'ra turlari",
    titleEn: "6. Morphological Structure",
    titleRu: "6. Строение прилагательных",
    icon: "Boxes",
    summaryUz: "Sifatlar tuzilishiga ko'ra 4 xil bo'ladi: Sodda (yaxshi, keng), Qo'shma (sofdil, toshbag'ir, oqko'ngil), Juft (katta-kichik, achchiq-chuchuk), Takroriy (katta-katta, baland-baland).",
    summaryEn: "By structure: Sodda (simple: yaxshi), Qo'shma (compound: sofdil), Juft (paired: oq-qora), Takroriy (reduplicated: baland-baland).",
    summaryRu: "По строению: Sodda (простые: yaxshi), Qo'shma (сложные: sofdil), Juft (парные: oq-qora), Takroriy (повторные: baland-baland).",
    quickQuestions: [
      {
        id: 'q_struct_1',
        questionUz: "'Shirin-shakar, achchiq-chuchuk' qanday sifatlar sirasiga kiradi?",
        optionsUz: ["Sodda sifat", "Qo'shma sifat", "Juft sifat", "Takroriy sifat"],
        correctIdx: 2,
        explanationUz: "O'zaro ma'nodosh yoki zid ikki xil so'zning chiziqcha bilan birikishidan juft sifatlar hosil bo'ladi."
      },
      {
        id: 'q_struct_2',
        questionUz: "'Yaxshi-yaxshi tilaklar' birikmasidagi sifat tuzilishiga ko'ra qaysi tur?",
        optionsUz: ["Takroriy sifat", "Qo'shma sifat", "Sodda sifat", "Nisbiy sifat"],
        correctIdx: 0,
        explanationUz: "Bir so'zning aynan takrorlanishidan (chiziqcha bilan yoziladigan) takroriy sifat hosil bo'ladi."
      }
    ]
  },
  {
    id: 'syntax',
    titleUz: "7. Sifatning gapdagi vazifasi",
    titleEn: "7. Syntactic Role in Sentences",
    titleRu: "7. Синтаксическая роль в предложении",
    icon: "Target",
    summaryUz: "Sifat gapda asosan aniqlovchi (Qizil olma tushdi) va kesim (Bu bino juda baland) vazifasida keladi. Otlashganda esa ega yoki to'ldiruvchi bo'lib keladi (Yaxshidan ot qoladi).",
    summaryEn: "Adjectives usually act as attributes (aniqlovchi) or predicates (kesim). When substantivized (otlashganda), they act as subjects (ega) or objects (to'ldiruvchi).",
    summaryRu: "Обычно выступают в роли определения (aniqlovchi) или сказуемого (kesim). При субстантивации становятся подлежащим (ega) или дополнением (to'ldiruvchi).",
    quickQuestions: [
      {
        id: 'q_syn_1',
        questionUz: "'Kuzgi salqin havo vujudni yayratadi' gapida 'kuzgi' so'zi qaysi gap bo'lagi?",
        optionsUz: ["Ega", "Kesim", "Aniqlovchi", "To'ldiruvchi"],
        correctIdx: 2,
        explanationUz: "'Kuzgi' so'zi 'qanday havo?' so'rog'iga javob bo'lib, otni aniqlab kelmoqda (aniqlovchi, to'lqinli chiziq bilan chiziladi)."
      },
      {
        id: 'q_syn_2',
        questionUz: "'Yaxshilar davrada e'zozlanadi' gapida 'yaxshilar' sifati qanday vazifada kelgan?",
        optionsUz: ["Aniqlovchi", "Ega (otlashgan)", "Kesim", "Hol"],
        correctIdx: 1,
        explanationUz: "'Yaxshilar' sifati ko'plik qo'shimchasini olib otlashgan va 'kimlar?' so'rog'iga javob bo'lib ega vazifasida kelgan."
      }
    ]
  }
];

export const semanticTypesDetail = [
  {
    typeUz: "Rang-tus sifatlari",
    typeEn: "Color Adjectives",
    typeRu: "Прилагательные цвета",
    examplesUz: "oq, qora, qizil, ko'k, sariq, yashil, nimrang, qoramtir",
    examplesEn: "white, black, red, blue, yellow, green, pale, darkish",
    examplesRu: "белый, черный, красный, синий, желтый, зеленый, бледный",
    color: "from-rose-500 to-amber-500",
    badge: "Rang",
    icon: "🎨"
  },
  {
    typeUz: "Maza-ta'm sifatlari",
    typeEn: "Taste Adjectives",
    typeRu: "Прилагательные вкуса",
    examplesUz: "shirin, achchiq, nordon, sho'r, chuchuk, taxir, bemaza",
    examplesEn: "sweet, spicy/bitter, sour, salty, fresh, astringent, tasteless",
    examplesRu: "сладкий, горький/острый, кислый, соленый, пресный, невкусный",
    color: "from-amber-500 to-orange-500",
    badge: "Ta'm",
    icon: "🍯"
  },
  {
    typeUz: "Shakl-ko'rinish sifatlari",
    typeEn: "Shape & Appearance",
    typeRu: "Форма и вид",
    examplesUz: "dumaloq, yassi, qiyshiq, to'rtburchak, egri, tekis, yapaloq",
    examplesEn: "round, flat, crooked, square, curved, even, flattened",
    examplesRu: "круглый, плоский, кривой, квадратный, изогнутый, ровный",
    color: "from-emerald-500 to-teal-500",
    badge: "Shakl",
    icon: "🔷"
  },
  {
    typeUz: "Hajm-o'lchov sifatlari",
    typeEn: "Size & Dimensions",
    typeRu: "Размер и габариты",
    examplesUz: "katta, kichik, uzun, qisqa, keng, tor, chuqur, sayoz",
    examplesEn: "big, small, long, short, wide, narrow, deep, shallow",
    examplesRu: "большой, маленький, длинный, короткий, широкий, узкий, глубокий",
    color: "from-blue-500 to-indigo-500",
    badge: "Hajm",
    icon: "📏"
  },
  {
    typeUz: "Vazn sifatlari",
    typeEn: "Weight Adjectives",
    typeRu: "Прилагательные веса",
    examplesUz: "og'ir, yengil, vazmin, yengil-yelpi",
    examplesEn: "heavy, light, weighty",
    examplesRu: "тяжелый, легкий, увесистый",
    color: "from-violet-500 to-purple-500",
    badge: "Vazn",
    icon: "⚖️"
  },
  {
    typeUz: "Hid sifatlari",
    typeEn: "Smell / Scent",
    typeRu: "Прилагательные запаха",
    examplesUz: "xushbo'y, muattar, badbo'y, sasigan, qo'lansa",
    examplesEn: "fragrant, aromatic, foul-smelling, rotten",
    examplesRu: "ароматный, благоуханный, зловонный, тухлый",
    color: "from-pink-500 to-rose-500",
    badge: "Hid",
    icon: "🌸"
  },
  {
    typeUz: "Xususiyat-xarakter sifatlari",
    typeEn: "Character & Traits",
    typeRu: "Черты характера",
    examplesUz: "mehribon, kamtar, saxiy, dangasa, qaysar, chaqqon, samimiy",
    examplesEn: "kind, humble, generous, lazy, stubborn, agile, sincere",
    examplesRu: "добрый, скромный, щедрый, ленивый, упрямый, шустрый, искренний",
    color: "from-teal-500 to-cyan-500",
    badge: "Xarakter",
    icon: "🤝"
  },
  {
    typeUz: "Holat sifatlari",
    typeEn: "State & Condition",
    typeRu: "Состояние предмета/человека",
    examplesUz: "sog', kasal, xursand, g'amgin, tetik, horg'in, uyg'oq",
    examplesEn: "healthy, sick, joyful, sorrowful, vigorous, weary, awake",
    examplesRu: "здоровый, больной, радостный, грустный, бодрый, усталый, бодрствующий",
    color: "from-cyan-500 to-blue-500",
    badge: "Holat",
    icon: "🌟"
  },
  {
    typeUz: "O'rin-payt sifatlari",
    typeEn: "Time & Space Adjectives",
    typeRu: "Прилагательные места и времени",
    examplesUz: "kuzgi, bahorgi, ertalabki, kechki, tungi, qishloqi, shaharli, tog'li",
    examplesEn: "autumnal, spring, morning, evening, nocturnal, rural, urban, mountainous",
    examplesRu: "осенний, весенний, утренний, вечерний, ночной, деревенский, городской, горный",
    color: "from-amber-600 to-stone-500",
    badge: "O'rin-payt",
    icon: "⏰"
  }
];

export const interactiveDegreeData = [
  {
    degree: "Ozaytirma daraja",
    sub: "Belgi me'yordan kam",
    examples: [
      { base: "oq", form: "oqish", expl: "oq rangdan kamroq, oqqa moyil" },
      { base: "qizil", form: "qizg'ish", expl: "qizil tusga yaqin" },
      { base: "ko'k", form: "ko'kimtir", expl: "och ko'k rang" },
      { base: "sariq", form: "och sariq", expl: "'och' analitik so'zi bilan" }
    ],
    color: "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
  },
  {
    degree: "Oddiy daraja",
    sub: "Me'yordagi odatiy belgi (qo'shimchasiz)",
    examples: [
      { base: "oq", form: "oq", expl: "oddiy tabiiy oq rang" },
      { base: "shirin", form: "shirin", expl: "odatiy shirin ta'm" },
      { base: "katta", form: "katta", expl: "me'yoriy hajm" },
      { base: "baland", form: "baland", expl: "me'yordagi balandlik" }
    ],
    color: "bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
  },
  {
    degree: "Qiyosiy daraja",
    sub: "-roq qo'shimchasi orqali taqqoslash",
    examples: [
      { base: "oq", form: "oqroq", expl: "boshqa oqqa nisbatan oq" },
      { base: "shirin", form: "shirinroq", expl: "taqqoslaganda shirini ko'p" },
      { base: "katta", form: "kattaroq", expl: "boshqasidan katta" },
      { base: "baland", form: "balandroq", expl: "nisbatan baland" }
    ],
    color: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
  },
  {
    degree: "Orttirma daraja",
    sub: "Belgi me'yordan ancha ortiq",
    examples: [
      { base: "oq", form: "op-oq / eng oq", expl: "sintetik (p) va analitik (eng)" },
      { base: "qizil", form: "qip-qizil / juda qizil", expl: "chiziqcha bilan takror" },
      { base: "yangi", form: "yap-yangi / o'ta yangi", expl: "yuqori darajadagi belgi" },
      { base: "toza", form: "top-toza / g'oyat toza", expl: "nihoyatda toza" }
    ],
    color: "bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
  }
];

export const affixConstructorData = {
  roots: [
    { word: "aql", type: "ot", meaning: "mind, intelligence" },
    { word: "tuz", type: "ot", meaning: "salt" },
    { word: "ish", type: "ot", meaning: "work, deed" },
    { word: "meva", type: "ot", meaning: "fruit" },
    { word: "ijod", type: "ot", meaning: "creation" },
    { word: "ilm", type: "ot", meaning: "science" },
    { word: "kuch", type: "ot", meaning: "strength" },
    { word: "bahor", type: "ot", meaning: "spring" },
    { word: "kecha", type: "ot", meaning: "night/yesterday" },
    { word: "qo'rq", type: "fe'l", meaning: "fear" }
  ],
  affixes: [
    { affix: "-li", type: "suffix", desc: "belgiga egalik" },
    { affix: "-siz", type: "suffix", desc: "belgidan mahrumlik" },
    { affix: "-dor", type: "suffix", desc: "mavjudlik" },
    { affix: "-chan", type: "suffix", desc: "moyillik" },
    { affix: "-kor", type: "suffix", desc: "kasb/xususiyat" },
    { affix: "-iy", type: "suffix", desc: "munosabat" },
    { affix: "-gi", type: "suffix", desc: "paytga aloqadorlik" },
    { affix: "-oq", type: "suffix", desc: "harakatdan belgi" },
    { affix: "be-", type: "prefix", desc: "mahrumlik" },
    { affix: "ba-", type: "prefix", desc: "egalik" }
  ],
  validCombos: [
    { root: "aql", affix: "-li", result: "aqlli", def: "Aqli bor, dono (intelligent / умный)" },
    { root: "aql", affix: "-siz", result: "aqlsiz", def: "Aqli yetishmaydigan (mindless / неразумный)" },
    { root: "tuz", affix: "-li", result: "tuzli", def: "Tuzi bor, mazali (salty / соленый)" },
    { root: "tuz", affix: "-siz", result: "tuzsiz", def: "Tuzi yo'q, bemaza (saltless / несоленый)" },
    { root: "ish", affix: "-chan", result: "ishchan", def: "Mehnatsevar, g'ayratli (hardworking / трудолюбивый)" },
    { root: "meva", affix: "-dor", result: "mevador", def: "Ko'p meva beradigan (fruitful / плодоносный)" },
    { root: "ijod", affix: "-kor", result: "ijodkor", def: "Ijod qiluvchi (creative / творческий)" },
    { root: "ilm", affix: "-iy", result: "ilmiy", def: "Ilm-fanga asoslangan (scientific / научный)" },
    { root: "kuch", affix: "-li", result: "kuchli", def: "Quvvatli, baquvvat (strong / сильный)" },
    { root: "kuch", affix: "-siz", result: "kuchsiz", def: "Majoli yo'q, ojiz (weak / слабый)" },
    { root: "bahor", affix: "-gi", result: "bahorgi", def: "Bahor fasliga tegishli (spring / весенний)" },
    { root: "kecha", affix: "-gi", result: "kechagi", def: "Kechagi kunga oid (yesterday's / вчерашний)" },
    { root: "qo'rq", affix: "-oq", result: "qo'rqoq", def: "Tez cho'chiydigan (fearful, coward / трусливый)" },
    { root: "kuch", affix: "ba-", result: "baquvvat", def: "Kuch-quvvatga ega (mighty / могучий)" }
  ]
};
