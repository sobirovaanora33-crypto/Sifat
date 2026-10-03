import { GlossaryTerm, Badge } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    termUz: "Sifat",
    termEn: "Adjective",
    termRu: "Имя прилагательное",
    defUz: "Predmetning belgisini (rangi, ta'mi, shakli, xarakteri, o'lchovini) bildirib, 'qanday?', 'qanaqa?', 'qaysi?' so'roqlariga javob bo'ladigan mustaqil so'z turkumi.",
    defEn: "An independent part of speech describing properties of objects, answering 'what kind?', 'which?'.",
    defRu: "Самостоятельная часть речи, обозначающая признак предмета и отвечающая на вопросы 'какой?', 'чей?'.",
    examplesUz: "qizil, shirin, baland, mehribon"
  },
  {
    termUz: "Asliy sifat",
    termEn: "Qualitative Adjective",
    termRu: "Качественное прилагательное",
    defUz: "Predmetdagi belgini bevosita ifodalovchi, darajalanish xususiyatiga ega bo'lgan va antonimlari mavjud sifatlar.",
    defEn: "Expresses inherent qualities directly; forms degrees of comparison and antonyms.",
    defRu: "Обозначает признак предмета непосредственно; образует степени сравнения и антонимы.",
    examplesUz: "katta, kichik, oq, shirin, yosh"
  },
  {
    termUz: "Nisbiy sifat",
    termEn: "Relational Adjective",
    termRu: "Относительное прилагательное",
    defUz: "Predmetdagi belgini boshqa predmet, harakat, makon yoki zamonga nisbatan ifodalovchi, darajalanmaydigan sifatlar.",
    defEn: "Expresses qualities in relation to other objects, space, time, or materials without degrees.",
    defRu: "Обозначает признак через отношение к другому предмету, месту, времени; не имеет степеней.",
    examplesUz: "tilla uzuk, kuzgi bug'doy, tog'li qishloq"
  },
  {
    termUz: "Oddiy daraja",
    termEn: "Base / Positive Degree",
    termRu: "Положительная степень",
    defUz: "Belgining me'yorda ekanligini bildiruvchi, maxsus daraja ko'rsatkichlariga ega bo'lmagan asosiy shakl.",
    defEn: "The standard baseline quality without comparative suffixes.",
    defRu: "Исходная нормальная степень качества без специальных показателей сравнения.",
    examplesUz: "baland, qizil, sho'r, muloyim"
  },
  {
    termUz: "Qiyosiy daraja",
    termEn: "Comparative Degree",
    termRu: "Сравнительная степень",
    defUz: "Bir predmetdagi belgining boshqa predmetdagi belgidan ortiq yoki kamligini '-roq' qo'shimchasi orqali bildiruvchi daraja.",
    defEn: "Indicates comparative level of quality formed with the suffix '-roq'.",
    defRu: "Обозначает сравнение качества предметов; образуется суффиксом '-roq'.",
    examplesUz: "balandroq, shirinroq, tezroq"
  },
  {
    termUz: "Orttirma daraja",
    termEn: "Superlative Degree",
    termRu: "Превосходная степень",
    defUz: "Belgining me'yordan ancha yuqori ekanligini analitik (eng, juda, g'oyat) yoki sintetik (qip-qizil, yam-yashil) usulda ifodalovchi daraja.",
    defEn: "Expresses supreme intensity either analytically (eng, juda) or synthetically (qip-qizil).",
    defRu: "Выражает наивысшую степень качества аналитически (eng) или синтетически (qip-qizil).",
    examplesUz: "eng yaxshi, yap-yangi, tim-qora, nihoyatda chiroyli"
  },
  {
    termUz: "Ozaytirma daraja",
    termEn: "Diminutive Degree",
    termRu: "Уменьшительная степень",
    defUz: "Belgining me'yordan kamligini, sustligini -(i)sh, -imtir, -g'ish yoki 'och', 'sal' so'zlari orqali bildiruvchi daraja.",
    defEn: "Expresses a reduced or partial intensity of quality (e.g. -ish, -imtir, och).",
    defRu: "Выражает неполноту или ослабленность признака (oqish, ko'kimtir, och ko'k).",
    examplesUz: "oqish, sarg'ish, ko'kimtir, och qizil"
  },
  {
    termUz: "Qo'shma sifat",
    termEn: "Compound Adjective",
    termRu: "Сложное прилагательное",
    defUz: "Ikki yoki undan ortiq o'zakning qo'shilishidan hosil bo'lib, bitta murakkab belgini bildiruvchi va qo'shib yoziladigan sifat.",
    defEn: "Compound formed by merging two roots and written as a single word.",
    defRu: "Образовано слиянием двух корней в одно слово.",
    examplesUz: "sofdil, toshbag'ir, oqko'ngil, kamgap"
  },
  {
    termUz: "Juft sifat",
    termEn: "Paired Adjective",
    termRu: "Парное прилагательное",
    defUz: "O'zaro yaqin, ma'nodosh yoki qarama-qarshi ikki sifatning chiziqcha (defis) bilan birikuvidan hosil bo'lgan sifat.",
    defEn: "Formed by pairing two antonymous or synonymous adjectives with a hyphen.",
    defRu: "Образовано сочетанием двух противоположных или близких слов через дефис.",
    examplesUz: "katta-kichik, oq-qora, achchiq-chuchuk"
  },
  {
    termUz: "Takroriy sifat",
    termEn: "Reduplicated Adjective",
    termRu: "Повторное прилагательное",
    defUz: "Bitta sifat o'zagining kuchaytirish yoki ko'plik ma'nosida aynan takrorlanishidan hosil bo'lgan va chiziqcha bilan yoziladigan sifat.",
    defEn: "Formed by exact word repetition with hyphen to emphasize intensity or plurality.",
    defRu: "Образовано точным повторением одного слова через дефис для усиления значения.",
    examplesUz: "katta-katta, uzun-uzun, mayda-mayda"
  },
  {
    termUz: "Otlashgan sifat",
    termEn: "Substantivized Adjective",
    termRu: "Субстантивированное прилагательное",
    defUz: "Sifatning o'zi aniqlab kelayotgan ot tushib qolganda egalik, kelishik, ko'plik qo'shimchalarini olib, gapda ega yoki to'ldiruvchi bo'lib kelishi.",
    defEn: "When an adjective drops its accompanying noun, takes noun inflections, and acts as subject/object.",
    defRu: "Переход прилагательного в существительное с принятием падежей и окончаний множественности.",
    examplesUz: "Yaxshilar (ega) ko'paysin; Yaxshidan (to'ldiruvchi) ot qoladi"
  }
];

export const badgesList: Badge[] = [
  {
    id: "badge_colors",
    titleUz: "Rang ustasi",
    titleEn: "Color Master",
    titleRu: "Мастер цвета",
    descUz: "Rang-tus va ozaytirma daraja vazifalarini a'lo bajargan o'quvchi!",
    descEn: "Excelled in color and diminutive adjective exercises!",
    descRu: "Отлично справился с заданиями по цветам и оттенкам!",
    icon: "Palette",
    requirement: "Rang sifatlari va darajalarini to'liq o'rganish"
  },
  {
    id: "badge_degrees",
    titleUz: "Daraja chempioni",
    titleEn: "Degree Champion",
    titleRu: "Чемпион степеней",
    descUz: "Sifatning 4 ta darajasini xatosiz aniqlagan va narvon o'yinini yutgan!",
    descEn: "Mastered all 4 comparison degrees and won the Ladder game!",
    descRu: "Безошибочно определил все 4 степени сравнения!",
    icon: "Award",
    requirement: "Darajalar narvoni o'yinini muvaffaqiyatli yakunlash"
  },
  {
    id: "badge_engineer",
    titleUz: "Yasovchi muhandis",
    titleEn: "Affix Engineer",
    titleRu: "Инженер суффиксов",
    descUz: "Qo'shimchalar konstruktorida 5 dan ortiq sifatni muvaffaqiyatli yasagan!",
    descEn: "Constructed more than 5 valid adjectives in the Affix Factory!",
    descRu: "Собрал более 5 верных прилагательных в конструкторе суффиксов!",
    icon: "Wrench",
    requirement: "Konstruktorda kamida 5 ta sifat hosil qilish"
  },
  {
    id: "badge_speed",
    titleUz: "Tezkor o'quvchi",
    titleEn: "Speed Reader",
    titleRu: "Быстрый ум",
    descUz: "'Sifatni ushla' o'yinida 100 balldan yuqori natija ko'rsatgan!",
    descEn: "Scored over 100 points in the 'Catch the Adjective' game!",
    descRu: "Набрал более 100 очков в игре 'Поймай прилагательное'!",
    icon: "Zap",
    requirement: "Sifatni ushla o'yinida 100+ ball to'plash"
  },
  {
    id: "badge_perfect_test",
    titleUz: "Xatosiz sinov",
    titleEn: "Flawless Test",
    titleRu: "Безупречный тест",
    descUz: "Yakuniy nazorat testidan a'lo baho (86% dan yuqori) olgan!",
    descEn: "Passed the final examination with an 'Excellent' (5) grade!",
    descRu: "Сдал итоговый тест на оценку '5' (отлично)!",
    icon: "Sparkles",
    requirement: "Testdan 86% yoki undan yuqori natija qayd etish"
  }
];
