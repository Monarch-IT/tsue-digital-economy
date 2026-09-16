const fs = require("fs");

const leaders = [
  {
    id: "akbarov",
    fullName: "Акбаров Нодир Гафурович",
    role: "Факультет декани",
    degree: "Иқтисод фанлари бўйича фалсафа доктори (PhD), доцент",
    photo: "https://tsue.uz/media/staff/image1_zYasYGW.jpeg",
    phone: "+998 71 239-01-29",
    email: "nodir.akbarov@tsue.uz",
    reception: "Ҳар куни: 14:00 – 17:00",
    room: "Корпус 2, Кабинет 214",
    bio: "Рақамли иқтисодиёт ва ахборот технологиялари факультетининг илмий-таълимий ва инновацион фаолиятига раҳбарлик қилади."
  },
  {
    id: "yuldoshev",
    fullName: "Юлдошев Улугбек Аскар угли",
    role: "O‘quv ishlari bo‘yicha dekan o‘rinbosari",
    degree: "Ўқув ишлари бўйича декан ўринбосари",
    photo: "assets/images/card_yuldoshev.png",
    phone: "+998 97 740-16-66",
    email: "u.yuldoshevtsue@gmail.com",
    reception: "Душанба — Жума: 14:00 – 18:00",
    room: "Корпус 2, Кабинет 212",
    bio: "Факультетда ўқув жараёнини ташкил этиш, модул тизими ва талабаларнинг академик ўзлаштиришини мувофиқлаштиради."
  },
  {
    id: "amonov",
    fullName: "Амонов Алишер Раджаб угли",
    role: "Yoshlar masalalari va ma'naviy-ma'rifiy ishlar bo'yicha dekan muovini",
    degree: "Ёшлар масалалари ва маънавий-маърифий ишлар бўйича декан муовини",
    photo: "assets/images/card_amonov.png",
    phone: "+998 71 239-01-29",
    email: "alisher-amonov@bk.ru",
    reception: "Душанба — Жума: 14:00 – 18:00",
    room: "Корпус 2, Кабинет 215",
    bio: "Талабалар ҳаёти, маънавий-маърифий тадбирлар, стартаплар, олимпиадалар ва ёшлар ташаббусларини ривожлантиради."
  },
  {
    id: "maxamadjanov",
    fullName: "Махамаджанов Акбар Махамадалиевич",
    role: "Факультет декан ўринбосари",
    degree: "Декан ўринбосари, доцент",
    photo: "https://tsue.uz/media/staff/image3_KOkKByU.jpeg",
    phone: "+998 97 734-25-55",
    email: "akbar.max@gmail.com",
    reception: "Душанба — Жума: 10:00 – 16:00",
    room: "Корпус 2, Кабинет 213",
    bio: "Ўқув-услубий ишлар ва таълим дастурларини ишлаб чиқиш, амалиёт ва стажировкаларни ташкил этиш координатори."
  },
  {
    id: "xasanov",
    fullName: "Хасанов Нодир Еркинович",
    role: "Факультет декан ўринбосари",
    degree: "Декан ўринбосари, доцент",
    photo: "https://tsue.uz/media/staff/image4_ecmfh0E.jpeg",
    phone: "+998 97 706-65-55",
    email: "nodir.khasanov@gmail.com",
    reception: "Душанба — Жума: 11:00 – 17:00",
    room: "Корпус 2, Кабинет 216",
    bio: "Таълим сифатини назорат қилиш, иқтидорли талабалар билан ишлаш ва илмий тўгаракларни ташкил қилиш куратори."
  }
];

const departments = [
  {
    id: "dep-digital-econ",
    name: "Цифровая экономика и информационные технологии",
    head: "Профессорско-преподавательский состав",
    description: "Флагманская кафедра подготовки специалистов по Data Science, веб-разработке, блокчейн-технологиям и ERP-системам.",
    programs: ["5234100 – Цифровая экономика", "5230200 – Информационные системы и технологии"],
    studentsCount: "850+",
    labs: "Smart Economy Lab, AI & Data Lab"
  },
  {
    id: "dep-math-methods",
    name: "Математические методы в экономике",
    head: "Профессорско-преподавательский состав",
    description: "Углубленное эконометрическое моделирование, количественные финансы, актуарные расчеты и прогнозирование макроэкономики.",
    programs: ["5232200 – Эконометрика", "5232600 – Бизнес-информатика"],
    studentsCount: "520+",
    labs: "Quantitative Econometrics Center"
  },
  {
    id: "dep-applied-math",
    name: "Прикладная математика",
    head: "Профессорско-преподавательский состав",
    description: "Фундаментальная подготовка в области прикладного программирования, вычислительных методов и алгоритмов оптимизации.",
    programs: ["5330200 – Информатика и ИТ в экономике"],
    studentsCount: "430+",
    labs: "Computer Science & Algorithmic Hub"
  },
  {
    id: "dep-econ-security",
    name: "Экономическая безопасность",
    head: "Профессорско-преподавательский состав",
    description: "Изучение комплаенс-контроля, финансового мониторинга, противодействия киберпреступлениям и аудита рисков.",
    programs: ["5232400 – Экономическая безопасность"],
    studentsCount: "380+",
    labs: "Cyber Security & Financial Audit Lab"
  },
  {
    id: "dep-innovative-edu",
    name: "Инновационное образование",
    head: "Профессорско-преподавательский состав",
    description: "Цифровизация образовательных технологий, EdTech платформы, модульное интерактивное обучение будущего.",
    programs: ["60112400 – Профессиональное образование (экономика)"],
    studentsCount: "320+",
    labs: "EdTech Innovation Center"
  }
];

const partners = [
  { name: "O‘zbekiston Respublikasi Raqamli texnologiyalar vazirligi" },
  { name: "Dasturiy mahsulotlar va axborot texnologiyalari texnologik parki (IT Park)" },
  { name: "O‘zbekiston Respublikasi Iqtisodiyot va moliya vazirligi" },
  { name: "O‘zbekiston Respublikasi Markaziy banki" },
  { name: "O‘zbekiston Respublikasi Prezidenti huzuridagi Statistika agentligi" },
  { name: "Oliy ta’lim, fan va innovatsiyalar vazirligi" },
  { name: "Investitsiyalar, sanoat va savdo vazirligi" },
  { name: "Muhammad al-Xorazmiy nomidagi axborot-kommunikatsiya texnologiyalari litseyi" }
];

let news = [];
try {
  const live = JSON.parse(fs.readFileSync("live_news.json", "utf8"));
  news = (live.results || []).slice(0, 10).map(n => ({
    id: `news-${n.id}`,
    title: n.title,
    image: n.thumbnail_url || "https://tsue.uz/image/tsue-cover.jpg",
    date: (n.publish_date || "").slice(0, 10),
    slug: n.slug,
    link: `https://tsue.uz/ru/news/${n.slug}`
  }));
} catch (e) {
  news = [];
}

const forumTopics = [
  {
    id: "forum-1",
    author: "Азиз Каримов (4 курс)",
    avatar: "fa-solid fa-user-astronaut",
    category: "Стартапы и ИИ",
    title: "Кто пишет ВКР по машинному обучению в кредитном скоринге?",
    replies: 14,
    views: 340,
    time: "2 часа назад",
    text: "Ищу единомышленников для тестирования датасетов реальных банковских транзакций. Есть доступ к серверу лаборатории AI Lab."
  },
  {
    id: "forum-2",
    author: "Малика Рустамова (2 курс)",
    avatar: "fa-solid fa-user-graduate",
    category: "Учебный процесс",
    title: "Практика в IT Park: вопросы по согласованию с учебным отделом",
    replies: 9,
    views: 215,
    time: "5 часов назад",
    text: "Подскажите, какие документы подавать в деканат для зачета стажировки в финтех-компании вместо стандартной производственной практики?"
  },
  {
    id: "forum-3",
    author: "Деканат Факультета (Модератор)",
    avatar: "fa-solid fa-shield",
    category: "Объявления",
    title: "Регистрация на осенний турнир по кибербезопасности и CTF ТГЭУ",
    replies: 28,
    views: 890,
    time: "Вчера",
    text: "Приглашаются студенты 1-4 курсов направления «Экономическая безопасность» и «Информационные системы». Регистрация открыта до конца недели."
  }
];

const facultyData = {
  facultyName: "Факультет Цифровой Экономики и Информационных Технологий",
  universityName: "Ташкентский государственный экономический университет (ТГЭУ)",
  shortName: "TDIU Raqamli Iqtisodiyot",
  yearFounded: 1963,
  studentsCount: "2 500+",
  professorsCount: "120+",
  topRanking: "QS 5 Stars (Top 300 By Subject)",
  leaders,
  departments,
  partners,
  news,
  forumTopics
};

fs.writeFileSync("faculty_curated.json", JSON.stringify(facultyData, null, 2), "utf8");
