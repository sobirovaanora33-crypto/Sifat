import { CaseStudy } from '../types';

export const casesData: CaseStudy[] = [
  {
    id: "case_detective",
    titleUz: "1. Detektiv Sifatoy va yo'qolgan mushukcha",
    titleEn: "1. Detective Sifatoy and the Lost Kitten",
    titleRu: "1. Детектив Сифатой и потерянный котенок",
    roleUz: "Bosh tergovchi va sifat mutaxassisi",
    roleEn: "Chief Detective & Adjective Specialist",
    roleRu: "Главный детектив",
    storyUz: "Shahardagi mashhur xonadonning sevimli mushukchasi adashib qoldi. Guvohlar uni shunday tasvirlashdi: 'Mushukcha oppoq tusda bo'lib, uning quloqlari qoramtir, ko'zlari zangori va dumi kalta-dumaloq edi. U juda chaqqon va qo'rqoq ekan.'",
    taskUz: "Guvohlar bergan sifatlarga qarab, quyidagi 3 ta mushukdan qaysi biri qidirilayotganini aniqlang:",
    type: "select",
    optionsUz: [
      {
        id: "cat_a",
        text: "A mushuk: Qora junli, sariq ko'zli, uzun dumli, erka mushuk.",
        isCorrect: false,
        feedback: "Xato! Guvohlar mushukning rangi oppoq, ko'zlari zangori (moviy) degan edilar."
      },
      {
        id: "cat_b",
        text: "B mushuk: Oppoq junli, quloqlari qoramtir, ko'zlari zangori (moviy), dumi kalta mushukcha.",
        isCorrect: true,
        feedback: "To'ppa-to'g'ri! Barcha sifatlar (oppoq - orttirma rang, qoramtir - ozaytirma rang, zangori - rang, kalta - o'lchov) to'liq mos keldi!"
      },
      {
        id: "cat_c",
        text: "C mushuk: Mallarang, ko'zlari yashil, o'ynoqi katta mushuk.",
        isCorrect: false,
        feedback: "Xato! Rang va ko'z sifatlari mos kelmadi."
      }
    ],
    explanationUz: "Guvohlarning tasvirida sifatlar belgilarni aniq ko'rsatib berdi: 'oppoq' (rang, orttirma), 'qoramtir' (rang, ozaytirma), 'zangori' (rang), 'kalta-dumaloq' (shakl/o'lchov)."
  },
  {
    id: "case_market",
    titleUz: "2. Do'kon reklamasi: Shirin olmalar",
    titleEn: "2. Store Ad: Sweet Apples",
    titleRu: "2. Реклама для магазина: Сладкие яблоки",
    roleUz: "Marketing va reklama mutaxassisi",
    roleEn: "Marketing Copywriter",
    roleRu: "Маркетолог",
    storyUz: "Bog'bon Rustam aka o'z bog'idan terilgan yangi olmalarni sotmoqchi. U xaridorlarni jalb qilish uchun sifatning darajalaridan (oddiy, qiyosiy, orttirma) unumli foydalangan reklama matniga muhtoj.",
    taskUz: "Rustam aka uchun eng jozibador va darajalari to'g'ri qo'llangan reklama shiorini tanlang:",
    type: "select",
    optionsUz: [
      {
        id: "ad_1",
        text: "Bizda olma bor, keling va oling, narxi yaxshi.",
        isCorrect: false,
        feedback: "Juda oddiy va sifatlar yetarli darajada jozibali qo'llanmagan."
      },
      {
        id: "ad_2",
        text: "Bog'imizning qip-qizil va yap-yangi olmalari! Asaldan ham shirinroq, viloyatdagi eng mazali mevalar faqat bizda!",
        isCorrect: true,
        feedback: "Ajoyib tanlov! 'Qip-qizil' va 'yap-yangi' (orttirma sintetik), 'shirinroq' (qiyosiy), 'eng mazali' (orttirma analitik) mukammal qo'llangan!"
      },
      {
        id: "ad_3",
        text: "Olma olma olma, hammaga olma, bugun olma.",
        isCorrect: false,
        feedback: "Bu yerda faqat ot takrorlangan, sifat umuman yo'q!"
      }
    ],
    explanationUz: "Reklamada 'qip-qizil', 'yap-yangi' (orttirma sintetik), 'shirinroq' (qiyosiy), 'eng mazali' (orttirma analitik) kabi darajalanish xaridor diqqatini o'ziga tez tortadi."
  },
  {
    id: "case_letter",
    titleUz: "3. Xato xat: Do'stning maktubi",
    titleEn: "3. Error in the Letter: Friend's Note",
    titleRu: "3. Ошибки в письме друга",
    roleUz: "Bosh muharrir va imlo nazoratchisi",
    roleEn: "Chief Editor & Proofreader",
    roleRu: "Главный редактор",
    storyUz: "Do'stingiz Anvar sizga qishloqdagi taassurotlari haqida xat yozdi, lekin shoshib sifatlarning yozilishida imlo xatolariga yo'l qo'ydi: 'Biz qipqizil olmalar terdik, katta kichik savatlarga joyladik va qorong'i tushgach issiqina choy ichdik.'",
    taskUz: "Maktubdagi sifatlarning imlosiga oid qaysi tuzatish to'g'ri ko'rsatilgan?",
    type: "select",
    optionsUz: [
      {
        id: "fix_1",
        text: "'qip-qizil' (chiziqcha bilan), 'katta-kichik' (chiziqcha bilan juft sifat), 'issiqina' emas, 'issiqgina' deb yozilishi kerak.",
        isCorrect: true,
        feedback: "Barakalla! Orttirma darajadagi 'qip-qizil' va juft sifat 'katta-kichik' har doim chiziqcha bilan yoziladi!"
      },
      {
        id: "fix_2",
        text: "Hech qanday xato yo'q, hamma so'zlar to'g'ri yozilgan.",
        isCorrect: false,
        feedback: "Xato! O'zbek tili imlo qoidalariga ko'ra p/m bilan takrorlangan orttirma sifatlar va juft sifatlar defis (chiziqcha) bilan yoziladi."
      },
      {
        id: "fix_3",
        text: "Faqat 'choy' so'zi noto'g'ri yozilgan.",
        isCorrect: false,
        feedback: "'Choy' to'g'ri, xatolar sifatlarning yozilishida edi."
      }
    ],
    explanationUz: "Imlo qoidasi: 1) Takroriy va juft sifatlar chiziqcha bilan yoziladi (katta-kichik). 2) Birinchi bo'g'ini p, m bilan orttirilgan sifatlar chiziqcha bilan yoziladi (qip-qizil, yap-yangi)."
  },
  {
    id: "case_weather",
    titleUz: "4. Ob-havo diktori: Jonli efir",
    titleEn: "4. Weather Forecaster: Live Broadcast",
    titleRu: "4. Диктор прогноза погоды",
    roleUz: "Televideniye boshlovchisi",
    roleEn: "TV Weather Presenter",
    roleRu: "Ведущий прогноза погоды",
    storyUz: "Bugun siz markaziy telekanalning 'Ob-havo' ko'rsatuvini olib borasiz. Tomoshabinlarga ertangi bahoriy ob-havoni sifatlar orqali chiroyli va tushunarli ifodalashingiz zarur.",
    taskUz: "Qaysi matnda sifatlar eng to'g'ri va boy vositalar bilan ishlatilgan?",
    type: "select",
    optionsUz: [
      {
        id: "w_1",
        text: "Ertaga havo bo'ladi. Yomg'ir yog'adi yoki yog'maydi. Shamol esadi.",
        isCorrect: false,
        feedback: "Sifatlar deyarli ishlatilmagan, nutq zerikarli."
      },
      {
        id: "w_2",
        text: "Ertaga yurtimizda mayin va iliq shabada esib, musaffo osmonda charog'on quyosh charaqlaydi. Tog'li hududlarda esa salqin va sersuv yomg'irlar kutilmoqda.",
        isCorrect: true,
        feedback: "Zo'r! 'mayin', 'iliq', 'musaffo', 'charog'on', 'tog'li', 'salqin', 'sersuv' sifatlari nutqni g'oyat jonlantirdi!"
      },
      {
        id: "w_3",
        text: "Ertaga harorat 20 daraja, keyin 15 daraja, keyin esa 10 daraja bo'ladi.",
        isCorrect: false,
        feedback: "Faqat sonlar berilgan, sifatli tasvir yo'q."
      }
    ],
    explanationUz: "Sifatlar badiiy nutq va axborotni tasviriy, jozibador va aniq qiladi (mayin, iliq, musaffo, charog'on)."
  },
  {
    id: "case_hero",
    titleUz: "5. Sevimli adabiy qahramonim",
    titleEn: "5. My Favorite Literary Hero",
    titleRu: "5. Мой любимый литературный герой",
    roleUz: "Adabiyotshunos va kitobxon",
    roleEn: "Literary Analyst",
    roleRu: "Литературовед",
    storyUz: "'Shum bola' qissasidagi Qoravoy yoki 'Alpomish' dostonidagi Alpomish obrazini xarakter sifatlari yordamida tasvirlash talab etiladi.",
    taskUz: "Alpomish obraziga to'liq mos keladigan sifatlar qatorini aniqlang:",
    type: "select",
    optionsUz: [
      {
        id: "hero_1",
        text: "Qo'rqoq, dangasa, beparvo, nimjon, lapashang.",
        isCorrect: false,
        feedback: "Bu sifatlar xalq qahramoniga mutlaqo zid!"
      },
      {
        id: "hero_2",
        text: "Jasur, mard, vatanparvar, oriyatli, chaqqon va baquvvat.",
        isCorrect: true,
        feedback: "Ofarin! Barcha xarakter va jismoniy sifatlar bahodir Alpomishga to'liq mos keladi!"
      },
      {
        id: "hero_3",
        text: "Sariq, shirin, kechki, uzun, nordon.",
        isCorrect: false,
        feedback: "Bu sifatlar xarakter emas, meva va vaqtga oid."
      }
    ],
    explanationUz: "Insonning ichki ma'naviy fazilatlari xususiyat-xarakter sifatlari orqali (mard, jasur, vatanparvar) yoritiladi."
  },
  {
    id: "case_menu",
    titleUz: "6. Milliy taomlar menyusi",
    titleEn: "6. National Cuisine Menu",
    titleRu: "6. Меню национальной кухни",
    roleUz: "Bosh oshpaz va restoran restavratori",
    roleEn: "Master Chef",
    roleRu: "Шеф-повар",
    storyUz: "Yangi ochilgan 'Ziyorat' milliy restoranida o'zbek palovi va somsasini ta'riflovchi maxsus menyu kartasi yozilishi kerak. Unda maza-ta'm va hid sifatlari uyg'un bo'lishi lozim.",
    taskUz: "Milliy taomlarni eng ishtahaochar tarzda tasvirlagan menyu matnini tanlang:",
    type: "select",
    optionsUz: [
      {
        id: "menu_1",
        text: "Oshda guruch bor, go'sht bor, yog' bor. Somsa ham bor.",
        isCorrect: false,
        feedback: "Faqat mahsulotlar nomi (ot) aytilgan, maza va hid sifatlari yo'q."
      },
      {
        id: "menu_2",
        text: "Zafaron rangli, xushbo'y ziravorli, muloyim go'shtli darmondori palov hamda qarsildoq, shirin-go'shtli tandir somsasi!",
        isCorrect: true,
        feedback: "Ofarin! 'zafaron rangli', 'xushbo'y', 'muloyim', 'qarsildoq' sifatlari taomning mazasini yaqqol ko'rsatib turibdi!"
      },
      {
        id: "menu_3",
        text: "Kechagi qolgan ovqatlar, sovuq sho'rva va sho'r non.",
        isCorrect: false,
        feedback: "Bu sifatlar salbiy va taomni ishtahaochar qilmaydi."
      }
    ],
    explanationUz: "Taom tavsifida maza-ta'm (shirin, darmondori), hid (xushbo'y), holat (muloyim, qarsildoq) sifatlari muhim o'rin tutadi."
  }
];
