let currentLang = localStorage.getItem('lang') || 'ru';
let currentNewsOffset = 0;
let newsAutoInterval = null;

const i18n = {
  ru: {
    langLabel: 'РУССКИЙ',
    brandUniv: 'Ташкентский государственный<br>экономический университет',
    brandFaculty: 'Факультет Цифровой Экономики',
    headerMotto: 'Создатели будущего',
    headerCallcenter: 'Колл-центр:',
    topHemis: 'HEMIS',
    topStudyUz: 'Study in Uzbekistan',
    topBachelor: 'Бакалавриат',
    topMaster: 'Магистратура',
    topSchedule: 'Расписание занятий',
    topEmail: 'Эл. почта',

    navHome: 'Главная (Обзор)',
    navLeadership: 'Руководство и Деканат',
    navDepartments: 'Кафедры',
    navDirections: 'Направления обучения',
    navForum: 'Форум Факультета',
    navHistory: 'История и Инновации',
    navReception: 'Приём деканата',

    breadHome: 'Главная',
    breadFaculties: 'Факультеты',
    breadDefault: 'Факультет цифровой экономики',
    breadLeadership: 'Руководство и Деканат',
    breadDepartments: 'Кафедры факультета',
    breadDirections: 'Направления обучения',
    breadForum: 'Форум Факультета',
    breadHistory: 'История и Инновации',

    heroCluster: 'Инновационный кластер ТГЭУ',
    heroTitle: 'Факультет Цифровой Экономики',
    heroLead: 'Флагманский научно-образовательный центр Центральной Азии по подготовке лидеров цифровой трансформации, аналитиков больших данных, архитекторов финансовых систем и специалистов кибербезопасности.',
    metricStudents: 'Студентов бакалавриата и магистратуры',
    metricDepts: 'Профильных передовых кафедр',
    metricFounded: 'Основание кибернетической школы',
    btnLeadership: 'Руководство факультета',
    btnForum: 'Форум студентов',

    dossierTag: 'Руководство факультета',
    dossierStatus: 'Приёмный день',
    dossierRole: 'Декан факультета',
    dossierDegree: 'Доктор философии (PhD) по экономическим наукам, доцент',
    dossierName: 'Акбаров Нодир Гафурович',
    dossierReception: 'Пн — Пт: 14:00 – 17:00',
    dossierBtn: 'Записаться на официальный приём',

    newsSectionTitle: 'События и новости факультета',
    newsPrev: 'Назад',
    newsNext: 'Вперёд',
    newsRead: 'Читать',

    homeLeadTitle: 'Руководство факультета',
    homeLeadSub: 'Деканат и координаторы академического развития',
    btnViewAllLeaders: 'Посмотреть весь состав',

    leaderDean: 'ДЕКАН ФАКУЛЬТЕТА',
    leaderInstitution: 'ТГЭУ • Факультет цифровой экономики',

    tabLeadTitle: 'Руководство и Деканат',
    tabLeadSub: 'Официальные контакты, график приёма и направления работы руководящего состава',
    tabLeadStat1: 'Руководителей',
    tabLeadStat2: 'Приёмные дни',
    tabLeadStat2Val: 'Пн–Пт',

    tabDeptTitle: 'Кафедры факультета',
    tabDeptSub: 'Научно-исследовательские кафедры, лаборатории и профессорско-преподавательский состав',
    tabDeptStat1: 'Кафедр',
    tabDeptStat2: 'Студентов',
    deptProgramsLabel: 'Направления кафедры:',
    deptStudentsSuffix: 'студентов',

    tabDirTitle: 'Направления обучения',
    tabDirSub: 'Государственные образовательные шифры и профили подготовки специалистов цифровой экономики',
    tabDirStat1: 'Направлений',
    tabDirStat2: 'Бакалавриат',
    tabDirStat2Val: '4 года',
    dirQualLabel: 'Квалификация:',
    dirDurationLabel: '4 года',

    tabForumTitle: 'Форум Факультета',
    tabForumSub: 'Открытая площадка для дискуссий, стартап-идей и взаимопомощи студентов и преподавателей',
    tabForumStat1: 'Открыт',
    tabForumStat2: 'Обсуждений',
    forumTopicsHeading: 'Актуальные обсуждения студентов и преподавателей',
    forumNewBtn: 'Создать тему',
    forumReplies: 'ответов',
    forumViews: 'просм.',

    tabHistTitle: 'История факультета',
    tabHistSub: 'От первых советских ЭВМ до современных нейросетей и распределённых реестров',
    tabHistStat1: 'Год основания',
    tabHistStat2: 'Лет традиций',
    historyLead: {
      badge: 'Летопись научно-образовательной школы',
      heading: 'Более полувека на острие вычислительных технологий и кибернетики',
      text1: 'История Факультета Цифровой Экономики Ташкентского государственного экономического университета берёт своё начало в <strong>1963 году</strong> — в эпоху зарождения компьютерной индустрии, когда в Ташкентском институте народного хозяйства (ныне ТГЭУ) впервые в Средней Азии был организован приём студентов по специальности «Организация механизированной обработки экономической информации».',
      text2: 'Уже через пять лет, в <strong>1968 году</strong>, на базе растущего научного потенциала был создан самостоятельный факультет <strong>«Экономическая кибернетика»</strong>. На протяжении десятилетий факультет являлся кузницей лучших экономистов-математиков, программистов, аналитиков и проектировщиков автоматизированных систем управления (АСУ) для ключевых отраслей промышленности, государственного планирования, банковского сектора и академических институтов.'
    },
    historyEpochs: [
      {
        period: '1963 — 1979',
        title: 'Зарождение кибернетической школы',
        desc: 'Внедрение перфокарт, первых ЭВМ серий «Минск» и «БЭСМ». Разработка первых алгоритмов оптимального отраслевого планирования и экономико-математических моделей региональной экономики.',
        tag: 'Истоки информатизации',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '1980 — 1999',
        title: 'Эпоха АСУ и вычислительных сетей',
        desc: 'Массовое внедрение персональных компьютеров, локальных сетей и автоматизированных рабочих мест (АРМ). Подготовка инженеров-экономистов для ведущих министерств и предприятий Узбекистана.',
        tag: 'Индустриальные АСУ',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2000 — 2019',
        title: 'Информационные системы и эконометрика',
        desc: 'Переход на современные стандарты веб-технологий, баз данных Oracle/SQL, эконометрического моделирования, финансовой безопасности и корпоративных ERP-систем.',
        tag: 'Информационная эра',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2020 — Настоящее время',
        title: 'Эра Цифровой Экономики & AI',
        desc: 'Масштабная трансформация в Факультет Цифровой Экономики в рамках Стратегии «Цифровой Узбекистан – 2030». Внедрение Data Science, FinTech, блокчейна, машинного обучения и партнерство с IT Park.',
        tag: 'Индустрия 4.0',
        tagIcon: 'fa-solid fa-sparkles'
      }
    ],
    historyTimelineHeader: {
      title: 'Хронология ключевых вех развития',
      sub: 'Основные исторические этапы и эволюция образовательных направлений'
    },
    historyTimeline: [
      {
        year: '1963',
        title: 'Первый прием и основание школы',
        meta: 'Ташкентский институт народного хозяйства',
        desc: 'Открытие приёма на специальность «Организация механизированной обработки экономической информации». Начат набор первых групп будущих специалистов по машинно-счётным станциям и вычислительным комплексам.'
      },
      {
        year: '1968',
        title: 'Учреждение факультета «Экономическая кибернетика»',
        meta: 'Официальный статус самостоятельного факультета',
        desc: 'Приказом Министерства высшего и среднего специального образования создан факультет «Экономическая кибернетика». Сформированы первые специализированные кафедры математического моделирования и вычислительной техники в экономике.'
      },
      {
        year: '1975',
        title: 'Создание вычислительного центра и развитие АСУ',
        meta: 'Научно-производственная база института',
        desc: 'Ввод в эксплуатацию университетского вычислительного центра на базе ЭВМ второго и третьего поколений. Факультет становится флагманом по проектированию региональных и отраслевых систем АСУ Госплана УзССР.'
      },
      {
        year: '1991',
        title: 'Эпоха независимости: ТГЭУ и новые вызовы',
        meta: 'Модернизация экономического образования',
        desc: 'С образованием независимого Узбекистана и преобразованием института в Ташкентский государственный экономический университет (ТГЭУ), кафедры факультета переориентировали учебные программы на рыночную экономику, международные финансово-банковские системы и микрокомпьютерные платформы.'
      },
      {
        year: '2005',
        title: 'Информационные технологии в экономике',
        meta: 'Кафедры информатики и моделирования',
        desc: 'Интеграция сетевых технологий, систем управления базами данных (СУБД), бизнес-информатики и дисциплин компьютерной безопасности в подготовку экономистов нового поколения.'
      },
      {
        year: '2020',
        title: 'Реорганизация в «Факультет Цифровой Экономики»',
        meta: 'Новая эра: Индустрия 4.0 и государственная стратегия',
        desc: 'В соответствии с курсом руководства страны на форсированную цифровую трансформацию факультет получил название «Факультет Цифровой Экономики». Открыты новые направления: Цифровая экономика, Информационные системы и технологии, Бизнес-информатика и Экономическая безопасность.'
      },
      {
        year: '2024',
        title: 'Партнёрская экосистема и IT-кластер',
        meta: 'Сотрудничество с ключевыми министерствами и IT Park',
        desc: 'Заключение прямых соглашений о дуальном обучении и стажировках с Министерством цифровых технологий РУз, IT Park, Центральным банком, Минэкономфином, Агентством статистики и зарубежными университетами.'
      },
      {
        year: '2026',
        title: 'QS World Rankings & Инновационные лаборатории AI',
        meta: 'Международное академическое признание',
        desc: 'Вхождение программ ТГЭУ в международные предметные рейтинги QS Top 300 By Subject. Запуск современных лабораторий искусственного интеллекта, прикладной эконометрики и Big Data аналитики для подготовки глобально конкурентоспособных специалистов.'
      }
    ],
    historyStats: [
      { val: '60+', desc: 'Лет непрерывных научных и образовательных традиций' },
      { val: '15 000+', desc: 'Выпускников-кибернетиков и IT-экономистов' },
      { val: '5', desc: 'Специализированных научно-исследовательских кафедр' },
      { val: '25+', desc: 'Докторантов и соискателей учёных степеней PhD / DSc' }
    ],

    partnersTitle: 'Партнёры факультета и',
    partnersIT: 'IT-экосистема',

    footerUnivName: 'Ташкентский государственный экономический университет',
    footerUnivDesc: 'Факультет Цифровой Экономики и Информационных Технологий — передовой образовательный центр ТГЭУ.',
    footerAddress: 'г. Ташкент, Чиланзарский р-н, ул. Ислама Каримова, 49',
    footerPhone: '+998 71 239-01-29 (Деканат)',
    footerFaculty: 'Факультет',
    footerPortals: 'Университетские порталы',
    footerRatings: 'Рейтинги и статус',
    footerOverview: 'Обзор факультета',
    footerLeadership: 'Руководство и деканат',
    footerDepts: 'Кафедры',
    footerDirs: 'Направления бакалавриата',
    footerForum: 'Форум факультета',
    footerHistory: 'История кибернетики',
    footerCopyright: '© 2026 Факультет Цифровой Экономики | Ташкентский государственный экономический университет. Все права защищены.',
    footerDev: 'Разработано в инновационной лаборатории ТГЭУ',

    modalTitle: 'Новая тема на форуме',
    modalCatLabel: 'Категория',
    modalTitleLabel: 'Заголовок темы',
    modalTextLabel: 'Текст сообщения',
    modalTitlePlaceholder: 'Краткое описание вопроса...',
    modalTextPlaceholder: 'Подробное описание...',
    modalCancel: 'Отмена',
    modalPublish: 'Опубликовать',
    modalCatOptions: ['Стартапы и ИИ', 'Учебный процесс', 'Наука и публикации', 'Объявления'],

    receptionAlert: "График приёма деканата:\nПонедельник — Пятница: 14:00 - 17:00\nТелефон для записи: +998 71 239-01-29\nЭл. почта: nodir.akbarov@tsue.uz",
  },

  uz: {
    langLabel: 'O‘ZBEKCHA',
    brandUniv: 'Toshkent davlat<br>iqtisodiyot universiteti',
    brandFaculty: 'Raqamli Iqtisodiyot Fakulteti',
    headerMotto: 'Kelajak yaratuvchilari',
    headerCallcenter: 'Qo‘ng‘iroq markazi:',
    topHemis: 'HEMIS',
    topStudyUz: 'Study in Uzbekistan',
    topBachelor: 'Bakalavriat',
    topMaster: 'Magistratura',
    topSchedule: 'Dars jadvali',
    topEmail: 'Elektron pochta',

    navHome: 'Bosh sahifa (Umumiy)',
    navLeadership: 'Rahbariyat va Dekanat',
    navDepartments: 'Kafedralar',
    navDirections: 'Ta‘lim yo‘nalishlari',
    navForum: 'Fakultet Forumi',
    navHistory: 'Tarix va Innovatsiyalar',
    navReception: 'Dekanat qabulxonasi',

    breadHome: 'Bosh sahifa',
    breadFaculties: 'Fakultetlar',
    breadDefault: 'Raqamli iqtisodiyot fakulteti',
    breadLeadership: 'Rahbariyat va Dekanat',
    breadDepartments: 'Fakultet kafedralari',
    breadDirections: 'Ta‘lim yo‘nalishlari',
    breadForum: 'Fakultet Forumi',
    breadHistory: 'Tarix va Innovatsiyalar',

    heroCluster: 'TDIU INNOVATSION KLASTERI',
    heroTitle: 'Raqamli Iqtisodiyot Fakulteti',
    heroLead: 'Markaziy Osiyoda raqamli transformatsiya yetakchilarini, katta ma‘lumotlar tahlilchilarini, moliyaviy tizim me‘morlarini va kiberxavfsizlik mutaxassislarini tayyorlashning flagman ilmiy-ta‘lim markazi.',
    metricStudents: 'Bakalavr va magistratura talabalari',
    metricDepts: 'Ixtisoslashgan ilg‘or kafedralar',
    metricFounded: 'Kibernetika maktabining asoschisi',
    btnLeadership: 'Fakultet rahbariyati',
    btnForum: 'Talabalar forumi',

    dossierTag: 'Fakultet rahbariyati',
    dossierStatus: 'Qabul kuni',
    dossierRole: 'Fakultet dekani',
    dossierDegree: 'Iqtisodiyot fanlari bo‘yicha falsafa doktori (PhD), dotsent',
    dossierName: 'Akbarov Nodir G‘afurovich',
    dossierReception: 'Dushanba — Juma: 14:00 – 17:00',
    dossierBtn: 'Rasmiy qabulga yozilish',

    newsSectionTitle: 'Fakultet tadbirlari va yangiliklari',
    newsPrev: 'Oldingi',
    newsNext: 'Keyingi',
    newsRead: 'Batafsil',

    homeLeadTitle: 'Fakultet rahbariyati',
    homeLeadSub: 'Dekanat va akademik rivojlanish koordinatori',
    btnViewAllLeaders: 'Barcha tarkibni ko‘rish',

    leaderDean: 'FAKULTET DEKANI',
    leaderInstitution: 'TDIU • Raqamli iqtisodiyot fakulteti',

    tabLeadTitle: 'Rahbariyat va Dekanat',
    tabLeadSub: 'Rasmiy kontaktlar, qabul jadvali va rahbarlar faoliyati yo‘nalishlari',
    tabLeadStat1: 'Rahbarlar',
    tabLeadStat2: 'Qabul kunlari',
    tabLeadStat2Val: 'Dush–Jum',

    tabDeptTitle: 'Fakultet kafedralari',
    tabDeptSub: 'Ilmiy-tadqiqot kafedralari, laboratoriyalar va professor-o‘qituvchilar tarkibi',
    tabDeptStat1: 'Kafedralar',
    tabDeptStat2: 'Talabalar',
    deptProgramsLabel: 'Kafedra yo‘nalishlari:',
    deptStudentsSuffix: 'talaba',

    tabDirTitle: 'Ta‘lim yo‘nalishlari',
    tabDirSub: 'Raqamli iqtisodiyot mutaxassislarini tayyorlashning davlat ta‘lim kodlari va profillari',
    tabDirStat1: 'Yo‘nalishlar',
    tabDirStat2: 'Bakalavriat',
    tabDirStat2Val: '4 yil',
    dirQualLabel: 'Malaka:',
    dirDurationLabel: '4 yil',

    tabForumTitle: 'Fakultet Forumi',
    tabForumSub: 'Talabalar va o‘qituvchilar uchun muhokama, startap-g‘oyalar va o‘zaro yordam maydoni',
    tabForumStat1: 'Ochiq',
    tabForumStat2: 'Muhokamalar',
    forumTopicsHeading: 'Talabalar va o‘qituvchilarning dolzarb muhokamalari',
    forumNewBtn: 'Mavzu yaratish',
    forumReplies: 'javoblar',
    forumViews: 'ko‘rishlar',

    tabHistTitle: 'Fakultet tarixi',
    tabHistSub: 'Ilk hisoblash mashinalaridan (EHM) zamonaviy neyron tarmoqlar va sun‘iy intellektgacha',
    tabHistStat1: 'Asos solingan yil',
    tabHistStat2: 'Yillik an‘analar',
    historyLead: {
      badge: 'Ilmiy-pedagogik maktab solnomasi',
      heading: 'Yarim asrdan ortiq hisoblash texnologiyalari va kibernetika cho‘qqisida',
      text1: 'Toshkent davlat iqtisodiyot universiteti Raqamli iqtisodiyot fakulteti o‘z tarixini <strong>1963 yilda</strong> — Markaziy Osiyoda birinchi bo‘lib Toshkent xalq xo‘jaligi institutida (hozirgi TDIU) «Iqtisodiy axborotlarni avtomatlashtirilgan usulda qayta ishlashni tashkil etish» mutaxassisligi bo‘yicha talabalar qabuli yo‘lga qo‘yilgan davrdan boshlaydi.',
      text2: 'Besh yil o‘tib, <strong>1968 yilda</strong>, yuqori ilmiy salohiyat asosida mustaqil <strong>«Iqtisodiy kibernetika»</strong> fakulteti tashkil etildi. O‘n yilliklar davomida fakultet mamlakatimiz sanoatining muhim tarmoqlari, davlat rejalashtirish organlari, bank tizimi va ilmiy markazlari uchun yetakchi iqtisodchi-matematiklar, dasturchilar va tahlilchilarni yetishtirib beruvchi maskan bo‘lib keldi.'
    },
    historyEpochs: [
      {
        period: '1963 — 1979',
        title: 'Kibernetika maktabining shakllanishi',
        desc: 'Perfokartalar, ilk «Minsk» va «BESM» elektron hisoblash mashinalarining (EHM) joriy etilishi. Mintaqaviy iqtisodiyotni optimal tarmoq rejalashtirishning ilk algoritmlari va iqtisodiy-matematik modellari ishlab chiqildi.',
        tag: 'Axborotlashtirish ibtidosi',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '1980 — 1999',
        title: 'ASU va hisoblash tarmoqlari davri',
        desc: 'Shaxsiy kompyuterlar, mahalliy tarmoqlar va avtomatlashtirilgan ish joylarining (AIJ) keng joriy etilishi. O‘zbekiston vazirliklari va yirik korxonalari uchun muhandis-iqtisodchilar tayyorlash.',
        tag: 'Sanoat ASU tizimlari',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2000 — 2019',
        title: 'Axborot tizimlari va ekonometrika',
        desc: 'Zamonaviy veb-texnologiyalar, Oracle/SQL ma‘lumotlar bazalari, ekonometrik modellashtirish, iqtisodiy xavfsizlik va korporativ ERP-tizimlar standartlariga o‘tish.',
        tag: 'Axborot asri',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2020 — Hozirgi vaqt',
        title: 'Raqamli Iqtisodiyot & AI davri',
        desc: '«Raqamli O‘zbekiston – 2030» strategiyasi doirasida Raqamli iqtisodiyot fakultetiga aylantirildi. Data Science, FinTech, blokcheyn, mashinali o‘rganish va IT Park bilan hamkorlik yo‘lga qo‘yildi.',
        tag: 'Industriya 4.0',
        tagIcon: 'fa-solid fa-sparkles'
      }
    ],
    historyTimelineHeader: {
      title: 'Rivojlanishning asosiy bosqichlari xronologiyasi',
      sub: 'Tarixiy muhim bosqichlar va ta‘lim yo‘nalishlarining evolyutsiyasi'
    },
    historyTimeline: [
      {
        year: '1963',
        title: 'Ilk qabul va maktabning tashkil etilishi',
        meta: 'Toshkent xalq xo‘jaligi instituti',
        desc: '«Iqtisodiy axborotlarni mexanizatsiyalashgan qayta ishlashni tashkil etish» mutaxassisligiga qabul ochildi. Mashina-hisoblash stansiyalari bo‘yicha ilk mutaxassislar guruhi qabul qilindi.'
      },
      {
        year: '1968',
        title: '«Iqtisodiy kibernetika» fakultetining ta‘sis etilishi',
        meta: 'Mustaqil fakultet maqomi',
        desc: 'Oliy va o‘rta maxsus ta‘lim vazirligi buyrug‘i bilan «Iqtisodiy kibernetika» fakulteti tashkil etildi. Iqtisodiyotda matematik modellashtirish va hisoblash texnikasi kafedralari shakllantirildi.'
      },
      {
        year: '1975',
        title: 'Hisoblash markazining ochilishi va ASU rivoji',
        meta: 'Institutning ilmiy-ishlab chiqarish bazasi',
        desc: 'Ikkinchi va uchinchi avlod EHMlari bazasida universitet hisoblash markazi ishga tushirildi. Fakultet hududiy va tarmoq ASU tizimlarini loyihalashtirish markaziga aylandi.'
      },
      {
        year: '1991',
        title: 'Mustaqillik davri: TDIU va yangi vazifalar',
        meta: 'Iqtisodiy ta‘limni modernizatsiya qilish',
        desc: 'O‘zbekiston mustaqillikka erishishi va institutning TDIUga aylantirilishi bilan ta‘lim dasturlari bozor iqtisodiyoti, bank-moliya axborot tizimlari va mikrokompyuterlarga moslashtirildi.'
      },
      {
        year: '2005',
        title: 'Iqtisodiyotda axborot texnologiyalari',
        meta: 'Informatika va modellashtirish kafedralari',
        desc: 'Yangi avlod iqtisodchilarini tayyorlashda tarmoq texnologiyalari, ma‘lumotlar bazalarini boshqarish (MBBT), biznes-informatika va axborot xavfsizligi fanlari joriy etildi.'
      },
      {
        year: '2020',
        title: '«Raqamli iqtisodiyot fakulteti» sifatida qayta tashkil etish',
        meta: 'Yangi davr: Industriya 4.0 va davlat strategiyasi',
        desc: 'Mamlakatimizda raqamli transformatsiyani jadallashtirish maqsadida fakultet «Raqamli iqtisodiyot» nomini oldi. Axborot tizimlari, Raqamli iqtisodiyot va Iqtisodiy xavfsizlik yo‘nalishlari ochildi.'
      },
      {
        year: '2024',
        title: 'Hamkorlik ekotizimi va IT-klaster',
        meta: 'Vazirliklar va IT Park bilan strategik hamkorlik',
        desc: 'Raqamli texnologiyalar vazirligi, IT Park, Markaziy bank, Iqtisodiyot va moliya vazirligi hamda xorijiy universitetlar bilan dual ta‘lim va amaliyot bo‘yicha to‘g‘ridan-to‘g‘ri shartnomalar tuzildi.'
      },
      {
        year: '2026',
        title: 'QS World Rankings & Innovatsion AI laboratoriyalari',
        meta: 'Xalqaro akademik e‘tirof',
        desc: 'TDIU ta‘lim yo‘nalishlarining QS Top 300 By Subject xalqaro reytingiga kirishi. Sun‘iy intellekt, amaliy ekonometrika va Big Data laboratoriyalari ishga tushirildi.'
      }
    ],
    historyStats: [
      { val: '60+', desc: 'Yillik uzluksiz ilmiy va ta‘limiy an‘analar' },
      { val: '15 000+', desc: 'Yetishib chiqqan kibernetik va IT-iqtisodchi bitiruvchilar' },
      { val: '5', desc: 'Ixtisoslashtirilgan ilmiy-tadqiqot kafedralari' },
      { val: '25+', desc: 'Doktorantlar va ilmiy daraja izlanuvchilari (PhD / DSc)' }
    ],

    partnersTitle: 'Fakultet hamkorlari va',
    partnersIT: 'IT-ekotizim',

    footerUnivName: 'Toshkent davlat iqtisodiyot universiteti',
    footerUnivDesc: 'Raqamli iqtisodiyot va axborot texnologiyalari fakulteti — TDIU ning ilg‘or ta‘lim markazi.',
    footerAddress: 'Toshkent shahri, Chilonzor tumani, Islom Karimov ko‘chasi, 49',
    footerPhone: '+998 71 239-01-29 (Dekanat)',
    footerFaculty: 'Fakultet',
    footerPortals: 'Universitet portallari',
    footerRatings: 'Reytinglar va maqom',
    footerOverview: 'Fakultet sharhi',
    footerLeadership: 'Rahbariyat va dekanat',
    footerDepts: 'Kafedralar',
    footerDirs: 'Bakalavriat yo‘nalishlari',
    footerForum: 'Fakultet forumi',
    footerHistory: 'Kibernetika tarixi',
    footerCopyright: '© 2026 Raqamli Iqtisodiyot Fakulteti | Toshkent davlat iqtisodiyot universiteti. Barcha huquqlar himoyalangan.',
    footerDev: 'TDIU innovatsion laboratoriyasida ishlab chiqilgan',

    modalTitle: 'Forum uchun yangi mavzu',
    modalCatLabel: 'Toifa',
    modalTitleLabel: 'Mavzu sarlavhasi',
    modalTextLabel: 'Xabar matni',
    modalTitlePlaceholder: 'Savolning qisqacha tavsifi...',
    modalTextPlaceholder: 'Batafsil tavsif...',
    modalCancel: 'Bekor qilish',
    modalPublish: 'Nashr etish',
    modalCatOptions: ['Startaplar va AI', 'O‘quv jarayoni', 'Ilm-fan va nashrlar', 'E‘lonlar'],

    receptionAlert: "Dekanat rasmiy qabul soatlari:\nDushanba — Juma: 14:00 - 17:00\nQabul uchun telefon: +998 71 239-01-29\nElektron pochta: nodir.akbarov@tsue.uz",
  },

  en: {
    langLabel: 'ENGLISH',
    brandUniv: 'Tashkent State<br>University of Economics',
    brandFaculty: 'Faculty of Digital Economy',
    headerMotto: 'Creators of the Future',
    headerCallcenter: 'Call Center:',
    topHemis: 'HEMIS',
    topStudyUz: 'Study in Uzbekistan',
    topBachelor: 'Bachelor’s',
    topMaster: 'Master’s',
    topSchedule: 'Class Timetable',
    topEmail: 'E-mail',

    navHome: 'Home (Overview)',
    navLeadership: 'Leadership & Dean’s Office',
    navDepartments: 'Departments',
    navDirections: 'Study Programs',
    navForum: 'Faculty Forum',
    navHistory: 'History & Innovations',
    navReception: 'Dean’s Reception',

    breadHome: 'Home',
    breadFaculties: 'Faculties',
    breadDefault: 'Faculty of Digital Economy',
    breadLeadership: 'Leadership & Dean’s Office',
    breadDepartments: 'Faculty Departments',
    breadDirections: 'Study Programs',
    breadForum: 'Faculty Forum',
    breadHistory: 'History & Innovations',

    heroCluster: 'TSUE INNOVATION CLUSTER',
    heroTitle: 'Faculty of Digital Economy',
    heroLead: 'The premier scientific and educational center of Central Asia for training leaders of digital transformation, big data analysts, financial system architects, and cybersecurity specialists.',
    metricStudents: 'Bachelor’s & Master’s Students',
    metricDepts: 'Specialized Advanced Departments',
    metricFounded: 'Founded as Cybernetics School',
    btnLeadership: 'Faculty Leadership',
    btnForum: 'Student Forum',

    dossierTag: 'Faculty Leadership',
    dossierStatus: 'Reception Day',
    dossierRole: 'Dean of the Faculty',
    dossierDegree: 'Doctor of Philosophy (PhD) in Economics, Associate Professor',
    dossierName: 'Nodir Akbarov',
    dossierReception: 'Mon — Fri: 14:00 – 17:00',
    dossierBtn: 'Schedule an Official Appointment',

    newsSectionTitle: 'Faculty Events and News',
    newsPrev: 'Previous',
    newsNext: 'Next',
    newsRead: 'Read More',

    homeLeadTitle: 'Faculty Leadership',
    homeLeadSub: 'Dean’s Office and Academic Development Coordinators',
    btnViewAllLeaders: 'View All Leadership',

    leaderDean: 'DEAN OF THE FACULTY',
    leaderInstitution: 'TSUE • Faculty of Digital Economy',

    tabLeadTitle: 'Leadership & Dean’s Office',
    tabLeadSub: 'Official contacts, reception schedule, and academic leadership profiles',
    tabLeadStat1: 'Leaders',
    tabLeadStat2: 'Reception Days',
    tabLeadStat2Val: 'Mon–Fri',

    tabDeptTitle: 'Faculty Departments',
    tabDeptSub: 'Research-focused departments, high-tech laboratories, and academic faculty',
    tabDeptStat1: 'Departments',
    tabDeptStat2: 'Students',
    deptProgramsLabel: 'Department Programs:',
    deptStudentsSuffix: 'students',

    tabDirTitle: 'Study Programs',
    tabDirSub: 'National degree codes and specialized academic curriculum in the digital economy',
    tabDirStat1: 'Programs',
    tabDirStat2: 'Bachelor’s',
    tabDirStat2Val: '4 years',
    dirQualLabel: 'Qualification:',
    dirDurationLabel: '4 years',

    tabForumTitle: 'Faculty Forum',
    tabForumSub: 'An open collaborative platform for student discussions, startup ideas, and peer support',
    tabForumStat1: 'Open 24/7',
    tabForumStat2: 'Discussions',
    forumTopicsHeading: 'Recent Discussions by Students and Faculty',
    forumNewBtn: 'New Topic',
    forumReplies: 'replies',
    forumViews: 'views',

    tabHistTitle: 'Faculty History',
    tabHistSub: 'From the early computer systems of the 1960s to advanced neural networks and distributed ledgers',
    tabHistStat1: 'Founded Year',
    tabHistStat2: 'Years of Tradition',
    historyLead: {
      badge: 'Chronicle of the Academic School',
      heading: 'Over Half a Century at the Vanguard of Computing and Cybernetics',
      text1: 'The history of the Faculty of Digital Economy at Tashkent State University of Economics began in <strong>1963</strong>, at the dawn of the computing era, when the Tashkent Institute of National Economy (now TSUE) became the first in Central Asia to offer admissions to the degree in "Organization of Automated Processing of Economic Information".',
      text2: 'Five years later, in <strong>1968</strong>, on the foundation of rapidly advancing scientific capacity, the independent faculty of <strong>"Economic Cybernetics"</strong> was established. For decades, the faculty has served as the cradle for top mathematical economists, software engineers, data analysts, and designers of automated management systems (AMS) for leading industries, national planning bodies, banking institutions, and research centers.'
    },
    historyEpochs: [
      {
        period: '1963 — 1979',
        title: 'Genesis of the Cybernetics School',
        desc: 'Adoption of punched cards, early Minsk and BESM mainframe computers. Formulation of optimal sector planning algorithms and mathematical-economic regional modeling.',
        tag: 'Informatization Origins',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '1980 — 1999',
        title: 'Era of Automated Systems & Networks',
        desc: 'Large-scale rollout of personal computers, local area networks, and automated workstations (AWS). Training economics engineers for ministries and industrial enterprises across Uzbekistan.',
        tag: 'Industrial AMS',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2000 — 2019',
        title: 'Information Systems & Econometrics',
        desc: 'Transition to modern web technologies, Oracle/SQL database architectures, applied econometrics, financial security, and corporate enterprise ERP platforms.',
        tag: 'Information Age',
        tagIcon: 'fa-solid fa-check'
      },
      {
        period: '2020 — Present Day',
        title: 'Digital Economy & AI Era',
        desc: 'Reorganized as the Faculty of Digital Economy under the national "Digital Uzbekistan – 2030" strategy. Pioneering Data Science, FinTech, blockchain, machine learning, and IT Park alliances.',
        tag: 'Industry 4.0',
        tagIcon: 'fa-solid fa-sparkles'
      }
    ],
    historyTimelineHeader: {
      title: 'Milestones & Development Chronology',
      sub: 'Key historical epochs and the evolution of digital academic disciplines'
    },
    historyTimeline: [
      {
        year: '1963',
        title: 'First Admissions & School Foundation',
        meta: 'Tashkent Institute of National Economy',
        desc: 'Inauguration of admissions to the degree in Automated Processing of Economic Data. Training the very first cohort of specialists for computer stations and computing centers.'
      },
      {
        year: '1968',
        title: 'Establishment of the "Economic Cybernetics" Faculty',
        meta: 'Autonomous Faculty Accreditation',
        desc: 'Officially decreed by the Ministry of Higher Education as an independent faculty. Inauguration of specialized departments in mathematical modeling and computing in economics.'
      },
      {
        year: '1975',
        title: 'Computing Center Launch & AMS Expansion',
        meta: 'Institute Research & Production Hub',
        desc: 'Commissioning of the university computing center equipped with 2nd and 3rd-generation mainframes. The faculty spearheaded regional and sector-wide planning systems.'
      },
      {
        year: '1991',
        title: 'Independence Era: TSUE & Modern Challenges',
        meta: 'Modernization of Higher Economic Education',
        desc: 'With Uzbekistan’s sovereignty and the institute’s reconstitution as TSUE, curricula adapted to market economic dynamics, international banking protocols, and personal computing.'
      },
      {
        year: '2005',
        title: 'Information Technologies in Business',
        meta: 'Departments of Informatics & Modeling',
        desc: 'Integration of network architectures, enterprise DBMS, business informatics, and cyber information security into the training of next-generation economists.'
      },
      {
        year: '2020',
        title: 'Reorganized into the "Faculty of Digital Economy"',
        meta: 'New Era: Industry 4.0 & National Digital Agenda',
        desc: 'In alignment with the national digital roadmap, the faculty adopted its modern title, introducing state-of-the-art curricula in Digital Economy, Information Systems, and Economic Security.'
      },
      {
        year: '2024',
        title: 'Partner Ecosystem & IT Park Cluster',
        meta: 'Alliance with Key Ministries and Tech Incubators',
        desc: 'Formalized dual-education and internship agreements with the Ministry of Digital Technologies, IT Park, Central Bank, Ministry of Economy & Finance, and global universities.'
      },
      {
        year: '2026',
        title: 'QS World Rankings & AI Innovation Labs',
        meta: 'Global Academic Recognition',
        desc: 'Inclusion in the QS Top 300 By Subject rankings. Inauguration of modern AI, applied econometrics, and Big Data laboratories for globally competitive graduates.'
      }
    ],
    historyStats: [
      { val: '60+', desc: 'Years of Continuous Academic and Research Traditions' },
      { val: '15,000+', desc: 'Graduates in Cybernetics and IT Economics' },
      { val: '5', desc: 'Specialized Research and Teaching Departments' },
      { val: '25+', desc: 'PhD and DSc Doctoral Researchers' }
    ],

    partnersTitle: 'Faculty Partners &',
    partnersIT: 'IT Ecosystem',

    footerUnivName: 'Tashkent State University of Economics',
    footerUnivDesc: 'Faculty of Digital Economy and Information Technologies — TSUE’s flagship educational center.',
    footerAddress: '49 Islam Karimov Street, Chilanzar District, Tashkent, Uzbekistan',
    footerPhone: '+998 71 239-01-29 (Dean’s Office)',
    footerFaculty: 'Faculty',
    footerPortals: 'University Portals',
    footerRatings: 'Rankings & Status',
    footerOverview: 'Faculty Overview',
    footerLeadership: 'Leadership & Dean’s Office',
    footerDepts: 'Departments',
    footerDirs: 'Bachelor’s Programs',
    footerForum: 'Faculty Forum',
    footerHistory: 'History of Cybernetics',
    footerCopyright: '© 2026 Faculty of Digital Economy | Tashkent State University of Economics. All rights reserved.',
    footerDev: 'Engineered at TSUE Innovation Lab',

    modalTitle: 'Start a New Forum Topic',
    modalCatLabel: 'Category',
    modalTitleLabel: 'Topic Title',
    modalTextLabel: 'Message Content',
    modalTitlePlaceholder: 'Brief description of your question...',
    modalTextPlaceholder: 'Detailed discussion or proposal...',
    modalCancel: 'Cancel',
    modalPublish: 'Publish',
    modalCatOptions: ['Startups & AI', 'Academic Process', 'Research & Publications', 'Announcements'],

    receptionAlert: "Official Dean's Office Hours:\nMonday — Friday: 14:00 - 17:00\nPhone appointment: +998 71 239-01-29\nEmail: nodir.akbarov@tsue.uz",
  }
};

const LEADERS_DATA = [
  {
    id: 'akbarov',
    photo: 'assets/images/photo_akbarov.jpeg',
    phone: '+998 71 239-01-29',
    email: 'nodir.akbarov@tsue.uz',
    ru: {
      fullName: 'Акбаров Нодир Гафурович',
      role: 'Декан факультета',
      degree: 'Доктор философии (PhD) по экономическим наукам, доцент',
      reception: 'Пн – Пт: 14:00 – 17:00',
      bio: 'Руководит научно-образовательной, исследовательской и инновационной деятельностью факультета цифровой экономики и информационных технологий.'
    },
    uz: {
      fullName: 'Akbarov Nodir G‘afurovich',
      role: 'Fakultet dekani',
      degree: 'Iqtisodiyot fanlari bo‘yicha falsafa doktori (PhD), dotsent',
      reception: 'Dushanba — Juma: 14:00 – 17:00',
      bio: 'Raqamli iqtisodiyot va axborot texnologiyalari fakultetining ilmiy-ta‘limiy, tadqiqot va innovatsion faoliyatiga rahbarlik qiladi.'
    },
    en: {
      fullName: 'Nodir Akbarov',
      role: 'Dean of the Faculty',
      degree: 'Doctor of Philosophy (PhD) in Economics, Associate Professor',
      reception: 'Mon – Fri: 14:00 – 17:00',
      bio: 'Directs the academic, research, and innovation activities of the Faculty of Digital Economy and Information Technologies.'
    }
  },
  {
    id: 'yuldoshev',
    photo: 'assets/images/photo_yuldoshev.png',
    phone: '+998 97 740-16-66',
    email: 'u.yuldoshevtsue@gmail.com',
    ru: {
      fullName: 'Юлдошев Улугбек Аскар угли',
      role: 'Заместитель декана по учебной работе',
      degree: 'Заместитель декана по учебным вопросам, PhD',
      reception: 'Пн – Пт: 14:00 – 18:00',
      bio: 'Организует учебный процесс на факультете, координирует внедрение кредитно-модульной системы ECTS и контролирует академическую успеваемость студентов.'
    },
    uz: {
      fullName: 'Yo‘ldoshev Ulug‘bek Asqar o‘g‘li',
      role: 'O‘quv ishlari bo‘yicha dekan o‘rinbosari',
      degree: 'O‘quv ishlari bo‘yicha dekan o‘rinbosari, PhD',
      reception: 'Dushanba — Juma: 14:00 – 18:00',
      bio: 'Fakultetda o‘quv jarayonini tashkil etadi, ECTS kredit-modul tizimini joriy qilishni muvofiqlashtiradi va talabalar o‘zlashtirishini nazorat qiladi.'
    },
    en: {
      fullName: 'Ulugbek Yuldoshev',
      role: 'Vice Dean for Academic Affairs',
      degree: 'Vice Dean for Academic Affairs, PhD',
      reception: 'Mon – Fri: 14:00 – 18:00',
      bio: 'Coordinates curriculum delivery, oversees ECTS credit-modular system operations, and monitors undergraduate student achievement.'
    }
  },
  {
    id: 'amonov',
    photo: 'assets/images/photo_amonov.png',
    phone: '+998 71 239-01-29',
    email: 'alisher-amonov@bk.ru',
    ru: {
      fullName: 'Амонов Алишер Раджаб угли',
      role: 'Заместитель декана по работе с молодёжью',
      degree: 'Зам. декана по духовно-просветительской работе',
      reception: 'Пн – Пт: 14:00 – 18:00',
      bio: 'Отвечает за развитие студенческой экосистемы, духовно-просветительские инициативы, студенческие хакатоны, олимпиады и стартап-проекты.'
    },
    uz: {
      fullName: 'Amonov Alisher Radjab o‘g‘li',
      role: 'Yoshlar bilan ishlash bo‘yicha dekan o‘rinbosari',
      degree: 'Ma‘naviy-ma‘rifiy ishlar bo‘yicha dekan o‘rinbosari',
      reception: 'Dushanba — Juma: 14:00 – 18:00',
      bio: 'Talabalar ekotizimini rivojlantirish, ma‘naviy-ma‘rifiy tashabbuslar, talabalar xakatonlari, olimpiadalar va startap loyihalariga mas‘ul.'
    },
    en: {
      fullName: 'Alisher Amonov',
      role: 'Vice Dean for Youth Affairs',
      degree: 'Vice Dean for Youth & Social Development',
      reception: 'Mon – Fri: 14:00 – 18:00',
      bio: 'Manages student initiatives, cultural-educational development programs, national student hackathons, and youth venture incubators.'
    }
  },
  {
    id: 'maxamadjanov',
    photo: 'assets/images/photo_maxamadjanov.jpeg',
    phone: '+998 97 734-25-55',
    email: 'akbar.max@gmail.com',
    ru: {
      fullName: 'Махамаджанов Акбар Махамадалиевич',
      role: 'Заместитель декана по научной работе',
      degree: 'Заместитель декана, доцент',
      reception: 'Пн – Пт: 10:00 – 16:00',
      bio: 'Курирует научно-методическую деятельность, разработку современных учебных курсов и интеграцию индустриальных практик с ведущими IT-компаниями.'
    },
    uz: {
      fullName: 'Maxamadjanov Akbar Maxamadalievich',
      role: 'Ilmiy ishlar bo‘yicha dekan o‘rinbosari',
      degree: 'Dekan o‘rinbosari, dotsent',
      reception: 'Dushanba — Juma: 10:00 – 16:00',
      bio: 'Ilmiy-uslubiy faoliyat, zamonaviy o‘quv kurslarini yaratish va yetakchi IT-kompaniyalar bilan sanoat amaliyotlarini integratsiyalashga rahbarlik qiladi.'
    },
    en: {
      fullName: 'Akbar Makhamadjanov',
      role: 'Vice Dean for Scientific Research',
      degree: 'Vice Dean, Associate Professor',
      reception: 'Mon – Fri: 10:00 – 16:00',
      bio: 'Supervises academic research, publication output, and applied industry collaboration programs with domestic and global IT partners.'
    }
  },
  {
    id: 'xasanov',
    photo: 'assets/images/photo_xasanov.jpeg',
    phone: '+998 97 706-65-55',
    email: 'nodir.khasanov@gmail.com',
    ru: {
      fullName: 'Хасанов Нодир Еркинович',
      role: 'Заместитель декана по контролю качества',
      degree: 'Заместитель декана, доцент',
      reception: 'Пн – Пт: 11:00 – 17:00',
      bio: 'Руководит системой внутреннего контроля качества образования, сопровождением одарённых студентов и развитием профильных исследовательских кружков.'
    },
    uz: {
      fullName: 'Xasanov Nodir Erkinovich',
      role: 'Ta‘lim sifati nazorati bo‘yicha dekan o‘rinbosari',
      degree: 'Dekan o‘rinbosari, dotsent',
      reception: 'Dushanba — Juma: 11:00 – 17:00',
      bio: 'Ta‘lim sifatini ichki nazorat qilish tizimiga, iqtidorli talabalar bilan ishlash dasturlariga va ilmiy to‘garaklar faoliyatiga rahbarlik qiladi.'
    },
    en: {
      fullName: 'Nodir Khasanov',
      role: 'Vice Dean for Quality Assurance',
      degree: 'Vice Dean, Associate Professor',
      reception: 'Mon – Fri: 11:00 – 17:00',
      bio: 'Directs internal academic audits, education quality standards, honors mentorship tracks, and specialized student scientific circles.'
    }
  }
];

const DEPARTMENTS_DATA = [
  {
    id: 'dep-digital-econ',
    icon: 'fa-solid fa-laptop-code',
    studentsCount: '850+',
    labs: 'Smart Economy Lab, AI & Data Lab',
    ru: {
      name: 'Цифровая экономика и информационные технологии',
      head: 'Профессорско-преподавательский состав',
      description: 'Флагманская кафедра подготовки специалистов по Data Science, веб-разработке, блокчейн-технологиям и ERP-системам.',
      programs: ['5234100 – Цифровая экономика', '5230200 – Информационные системы и технологии']
    },
    uz: {
      name: 'Raqamli iqtisodiyot va axborot texnologiyalari',
      head: 'Professor-o‘qituvchilar tarkibi',
      description: 'Data Science, veb-dasturlash, blokcheyn texnologiyalari va ERP-tizimlari bo‘yicha yetakchi mutaxassislarni tayyorlash kafedrasi.',
      programs: ['5234100 – Raqamli iqtisodiyot', '5230200 – Axborot tizimlari va texnologiyalari']
    },
    en: {
      name: 'Digital Economy and Information Technologies',
      head: 'Department Faculty & Professorial Staff',
      description: 'Flagship academic department delivering advanced training in Data Science, Web Engineering, Blockchain architectures, and enterprise ERP systems.',
      programs: ['5234100 – Digital Economy', '5230200 – Information Systems and Technologies']
    }
  },
  {
    id: 'dep-math-methods',
    icon: 'fa-solid fa-chart-line',
    studentsCount: '520+',
    labs: 'Quantitative Econometrics Center',
    ru: {
      name: 'Математические методы в экономике',
      head: 'Профессорско-преподавательский состав',
      description: 'Углубленное эконометрическое моделирование, количественные финансы, актуарные расчеты и прогнозирование макроэкономики.',
      programs: ['5232200 – Эконометрика', '5232600 – Бизнес-информатика']
    },
    uz: {
      name: 'Iqtisodiyotda matematik metodlar',
      head: 'Professor-o‘qituvchilar tarkibi',
      description: 'Chuqurlashtirilgan ekonometrik modellashtirish, miqdoriy moliya, aktuar hisob-kitoblar va makroiqtisodiy prognozlash.',
      programs: ['5232200 – Ekonometrika', '5232600 – Biznes-informatika']
    },
    en: {
      name: 'Mathematical Methods in Economics',
      head: 'Department Faculty & Professorial Staff',
      description: 'Advanced econometric estimation, quantitative finance, computational risk modeling, and macroeconomic forecasting.',
      programs: ['5232200 – Econometrics', '5232600 – Business Informatics']
    }
  },
  {
    id: 'dep-applied-math',
    icon: 'fa-solid fa-square-root-variable',
    studentsCount: '430+',
    labs: 'Computer Science & Algorithmic Hub',
    ru: {
      name: 'Прикладная математика',
      head: 'Профессорско-преподавательский состав',
      description: 'Фундаментальная подготовка в области прикладного программирования, вычислительных методов и алгоритмов оптимизации.',
      programs: ['5330200 – Информатика и ИТ в экономике']
    },
    uz: {
      name: 'Amaliy matematika',
      head: 'Professor-o‘qituvchilar tarkibi',
      description: 'Amaliy dasturlash, hisoblash usullari va optimallashtirish algoritmlari sohasida fundamental tayyorgarlik.',
      programs: ['5330200 – Informatika va axborot texnologiyalari (iqtisodiyot)']
    },
    en: {
      name: 'Applied Mathematics',
      head: 'Department Faculty & Professorial Staff',
      description: 'Foundational curriculum in applied software engineering, numerical methods, optimization algorithms, and scientific computing.',
      programs: ['5330200 – Informatics and IT in Economics']
    }
  },
  {
    id: 'dep-econ-security',
    icon: 'fa-solid fa-user-shield',
    studentsCount: '380+',
    labs: 'Cyber Security & Financial Audit Lab',
    ru: {
      name: 'Экономическая безопасность',
      head: 'Профессорско-преподавательский состав',
      description: 'Изучение комплаенс-контроля, финансового мониторинга, противодействия киберпреступлениям и аудита рисков.',
      programs: ['5232400 – Экономическая безопасность']
    },
    uz: {
      name: 'Iqtisodiy xavfsizlik',
      head: 'Professor-o‘qituvchilar tarkibi',
      description: 'Komplayens-nazorat, moliyaviy monitoring, kiberjinoyatlarga qarshi kurash va moliyaviy xavflar auditi.',
      programs: ['5232400 – Iqtisodiy xavfsizlik']
    },
    en: {
      name: 'Economic Security',
      head: 'Department Faculty & Professorial Staff',
      description: 'In-depth study of regulatory compliance, anti-fraud intelligence, financial cyber forensics, and corporate risk audit.',
      programs: ['5232400 – Economic Security']
    }
  },
  {
    id: 'dep-innovative-edu',
    icon: 'fa-solid fa-lightbulb',
    studentsCount: '320+',
    labs: 'EdTech Innovation Center',
    ru: {
      name: 'Инновационное образование',
      head: 'Профессорско-преподавательский состав',
      description: 'Цифровизация образовательных технологий, EdTech платформы, модульное интерактивное обучение будущего.',
      programs: ['60112400 – Профессиональное образование (экономика)']
    },
    uz: {
      name: 'Innovatsion ta‘lim',
      head: 'Professor-o‘qituvchilar tarkibi',
      description: 'Ta‘lim texnologiyalarini raqamlashtirish, EdTech platformalari, interaktiv va modulli o‘qitish metodikasi.',
      programs: ['60112400 – Professional ta‘lim: iqtisodiyot']
    },
    en: {
      name: 'Innovative Education',
      head: 'Department Faculty & Professorial Staff',
      description: 'Educational technology digitalization, intelligent EdTech platforms, pedagogical design, and interactive learning systems.',
      programs: ['60112400 – Vocational Education: Economics']
    }
  }
];

const DIRECTIONS_DATA = [
  {
    code: '5234100',
    icon: 'fa-solid fa-code',
    ru: {
      title: '5234100 – Цифровая экономика',
      head: 'Бакалавриат / Очное, Дистанционное',
      desc: 'Подготовка архитекторов цифровой трансформации предприятий, разработчиков бизнес-моделей на основе ИИ, блокчейна и автоматизации процессов.',
      qual: 'Экономист',
      duration: '4 года'
    },
    uz: {
      title: '5234100 – Raqamli iqtisodiyot',
      head: 'Bakalavriat / Kunduzgi, Masofaviy',
      desc: 'Korxonalarni raqamli transformatsiya qilish arxitektorlari, AI, blokcheyn va jarayonlarni avtomatlashtirish asosidagi biznes modellar ishlab chiquvchilari.',
      qual: 'Iqtisodchi',
      duration: '4 yil'
    },
    en: {
      title: '5234100 – Digital Economy',
      head: 'Bachelor’s Degree / Full-Time, Distance',
      desc: 'Training enterprise digital transformation architects, AI-driven business strategists, and fintech automation consultants.',
      qual: 'Economist',
      duration: '4 years'
    }
  },
  {
    code: '5230200',
    icon: 'fa-solid fa-network-wired',
    ru: {
      title: '5230200 – Информационные системы и технологии',
      head: 'Бакалавриат / Очное',
      desc: 'Проектирование и внедрение корпоративных баз данных, распределенных облачных сервисов, аналитических ERP-платформ в финансовом секторе.',
      qual: 'ИТ-инженер',
      duration: '4 года'
    },
    uz: {
      title: '5230200 – Axborot tizimlari va texnologiyalari',
      head: 'Bakalavriat / Kunduzgi',
      desc: 'Korporativ ma‘lumotlar bazalari, bulutli xizmatlar va moliya sektorida tahliliy ERP-platformalarni loyihalash hamda tatbiq etish.',
      qual: 'IT-muhandis',
      duration: '4 yil'
    },
    en: {
      title: '5230200 – Information Systems and Technologies',
      head: 'Bachelor’s Degree / Full-Time',
      desc: 'Architecting corporate distributed databases, cloud infrastructure, and financial analytical ERP platforms.',
      qual: 'IT Systems Engineer',
      duration: '4 years'
    }
  },
  {
    code: '5232400',
    icon: 'fa-solid fa-shield-virus',
    ru: {
      title: '5232400 – Экономическая безопасность',
      head: 'Бакалавриат / Очное',
      desc: 'Анализ финансовых и цифровых угроз, предотвращение кибермошенничества, защита интеллектуальной собственности и комплаенс-контроль.',
      qual: 'Специалист по безопасности',
      duration: '4 года'
    },
    uz: {
      title: '5232400 – Iqtisodiy xavfsizlik',
      head: 'Bakalavriat / Kunduzgi',
      desc: 'Moliyaviy va raqamli tahdidlarni tahlil qilish, kiberfiribgarlikning oldini olish, intellektual mulk himoyasi va komplayens nazorat.',
      qual: 'Iqtisodiy xavfsizlik mutaxassisi',
      duration: '4 yil'
    },
    en: {
      title: '5232400 – Economic Security',
      head: 'Bachelor’s Degree / Full-Time',
      desc: 'Enterprise risk modeling, anti-money laundering, corporate financial cybersecurity, and compliance auditing.',
      qual: 'Economic Security Specialist',
      duration: '4 years'
    }
  },
  {
    code: '5232200',
    icon: 'fa-solid fa-chart-pie',
    ru: {
      title: '5232200 – Эконометрика',
      head: 'Бакалавриат / Очное',
      desc: 'Математико-статистический анализ макроэкономических рядов, количественный риск-менеджмент, прогнозирование для ЦБ и фондовых рынков.',
      qual: 'Эконометрист-аналитик',
      duration: '4 года'
    },
    uz: {
      title: '5232200 – Ekonometrika',
      head: 'Bakalavriat / Kunduzgi',
      desc: 'Makroiqtisodiy jarayonlarni matematik-statistik tahlil qilish, miqdoriy risk-menejment, Markaziy bank va fond bozorlari uchun tahliliy modellar.',
      qual: 'Ekonometrist-tahlilchi',
      duration: '4 yil'
    },
    en: {
      title: '5232200 – Econometrics',
      head: 'Bachelor’s Degree / Full-Time',
      desc: 'Statistical econometrics, macroeconomic time-series estimation, quantitative market forecasting for central banks and securities exchanges.',
      qual: 'Econometrician / Data Analyst',
      duration: '4 years'
    }
  },
  {
    code: '5232600',
    icon: 'fa-solid fa-briefcase',
    ru: {
      title: '5232600 – Бизнес-информатика',
      head: 'Бакалавриат / Очное',
      desc: 'Стык менеджмента и программных технологий: бизнес-анализ, управление продуктом (Product Management), моделирование архитектуры предприятий.',
      qual: 'Бизнес-информатик',
      duration: '4 года'
    },
    uz: {
      title: '5232600 – Biznes-informatika',
      head: 'Bakalavriat / Kunduzgi',
      desc: 'Menejment va dasturiy texnologiyalar uyg‘unligi: biznes-tahlil, mahsulot boshqaruvi (Product Management) va korxona IT-arxitekturasi.',
      qual: 'Biznes-informatik',
      duration: '4 yil'
    },
    en: {
      title: '5232600 – Business Informatics',
      head: 'Bachelor’s Degree / Full-Time',
      desc: 'Bridge between business management and software: IT product ownership, enterprise process engineering, and data-driven systems design.',
      qual: 'Business Informatics Specialist',
      duration: '4 years'
    }
  },
  {
    code: '60112400',
    icon: 'fa-solid fa-chalkboard-user',
    ru: {
      title: '60112400 – Профессиональное образование (Экономика)',
      head: 'Бакалавриат / Очное',
      desc: 'Инновационные методики преподавания цифровой экономики, цифровые платформы и педагогический дизайн нового поколения.',
      qual: 'Педагог-экономист',
      duration: '4 года'
    },
    uz: {
      title: '60112400 – Professional ta‘lim: iqtisodiyot',
      head: 'Bakalavriat / Kunduzgi',
      desc: 'Raqamli iqtisodiyot fanlarini o‘qitishning innovatsion metodikasi, yangi avlod raqamli platformalari va pedagogik dizayn.',
      qual: 'Iqtisodchi-pedagog',
      duration: '4 yil'
    },
    en: {
      title: '60112400 – Vocational Education: Economics',
      head: 'Bachelor’s Degree / Full-Time',
      desc: 'Modern methodology for teaching quantitative economics, next-generation digital learning environments, and pedagogical EdTech design.',
      qual: 'Economics Educator',
      duration: '4 years'
    }
  }
];

const NEWS_DATA = [
  {
    id: 'news-4845',
    image: 'https://tsue.uz/media/news/616A0274.JPG',
    link: 'https://tsue.uz/ru/news/davlat-auditi-oliy-maktabi-talabalarining-hisob-palatasi-xodimlari-bilan-ilk-uchrashuvi-bolib-otdi',
    ru: {
      title: 'Встреча студентов Высшей школы госаудита с сотрудниками Счётной палаты',
      tag: 'Событие',
      date: '16 сентября 2026'
    },
    uz: {
      title: 'Davlat auditi oliy maktabi talabalarining Hisob palatasi xodimlari bilan ilk uchrashuvi bo‘lib o‘tdi',
      tag: 'Voqea',
      date: '2026-yil 16-sentabr'
    },
    en: {
      title: 'Meeting of State Audit School Students with the Chamber of Accounts Officials',
      tag: 'Event',
      date: 'September 16, 2026'
    }
  },
  {
    id: 'news-4844',
    image: 'https://tsue.uz/media/news/photo_2026-09-16_09-51-20.jpg',
    link: 'https://tsue.uz/ru/news/xalqaro-ekspert-ishtirokida-talim-jarayonida-suniy-intellektni-qollash-mavzusida-oquv-mahorat-seminari-bolib-otdi',
    ru: {
      title: 'Мастер-класс «Применение ИИ в образовательном процессе» с международным экспертом',
      tag: 'Наука',
      date: '16 сентября 2026'
    },
    uz: {
      title: 'Xalqaro ekspert ishtirokida “Ta’lim jarayonida sun’iy intellektni qo‘llash” mavzusida mahorat darsi',
      tag: 'Ilm-fan',
      date: '2026-yil 16-sentabr'
    },
    en: {
      title: 'Masterclass “AI Applications in Education” with International Visiting Expert',
      tag: 'Science',
      date: 'September 16, 2026'
    }
  },
  {
    id: 'news-4843',
    image: 'https://tsue.uz/media/news/photo_2026-09-07_17-10-11_jNxqW2n.jpg',
    link: 'https://tsue.uz/ru/news/toshkent-davlat-iqtisodiyot-universitetida-navbatdagi-sayyor-qabul-otkaziladi',
    ru: {
      title: 'В ТГЭУ пройдёт очередной выездной приём для абитуриентов',
      tag: 'Приёмная кампания',
      date: '15 сентября 2026'
    },
    uz: {
      title: 'Toshkent davlat iqtisodiyot universitetida navbatdagi sayyor qabul o‘tkaziladi',
      tag: 'Qabul',
      date: '2026-yil 15-sentabr'
    },
    en: {
      title: 'TSUE to Host Regional Mobile Open-Door Admissions Reception',
      tag: 'Admissions',
      date: 'September 15, 2026'
    }
  },
  {
    id: 'news-4842',
    image: 'https://tsue.uz/media/news/5_HqzhtvQ.jpg',
    link: 'https://tsue.uz/ru/news/toshkent-davlat-iqtisodiyot-universiteti-bitiruvchilari-sifati-boyicha-yuqori-natijani-qayd-etdi',
    ru: {
      title: 'ТГЭУ показал высокие результаты по качеству выпускников',
      tag: 'Рейтинг',
      date: '14 сентября 2026'
    },
    uz: {
      title: 'TDIU bitiruvchilar sifati va ish bilan ta‘minlanishi bo‘yicha yuqori natijani qayd etdi',
      tag: 'Reyting',
      date: '2026-yil 14-sentabr'
    },
    en: {
      title: 'TSUE Demonstrated Outstanding Quality & High Employability of Graduates',
      tag: 'Ranking',
      date: 'September 14, 2026'
    }
  },
  {
    id: 'news-4841',
    image: 'https://tsue.uz/media/news/7_PogwerB.jpg',
    link: 'https://tsue.uz/ru/news/tdiuda-akkreditatsiya-va-talim-sifatini-taminlashning-xalqaro-tajribasi-muhokama-qilinmoqda',
    ru: {
      title: 'Обсуждается международный опыт по аккредитации и обеспечению качества образования',
      tag: 'Сотрудничество',
      date: '14 сентября 2026'
    },
    uz: {
      title: 'TDIUda xalqaro akkreditatsiya va ta‘lim sifatini ta‘minlash tajribasi muhokama qilinmoqda',
      tag: 'Xalqaro hamkorlik',
      date: '2026-yil 14-sentabr'
    },
    en: {
      title: 'International Accreditation and Higher Education Quality Assurance Forum at TSUE',
      tag: 'Global',
      date: 'September 14, 2026'
    }
  },
  {
    id: 'news-4840',
    image: 'https://tsue.uz/media/news/0U8A80.jpg',
    link: 'https://tsue.uz/ru/news/tdiu-va-mifi-ortasida-yangi-qoshma-talim-dasturini-tashkil-etish-istiqbollari-muhokama-qilindi',
    ru: {
      title: 'Перспективы совместной образовательной программы ТГЭУ и МИФИ',
      tag: 'Партнёрство',
      date: '14 сентября 2026'
    },
    uz: {
      title: 'TDIU va MIFI o‘rtasida yangi qo‘shma ta‘lim dasturini tashkil etish istiqbollari',
      tag: 'Hamkorlik',
      date: '2026-yil 14-sentabr'
    },
    en: {
      title: 'Prospects for Dual-Degree Engineering & Economics Program with MEPhI',
      tag: 'Partnership',
      date: 'September 14, 2026'
    }
  },
  {
    id: 'news-4839',
    image: 'https://tsue.uz/media/news/0Q3A8626.JPG',
    link: 'https://tsue.uz/ru/news/ozbekiston-respublikasi-mustaqilligining-35-yilligiga-bagishlab-mustaqillik-kubogi2026-sport-musobaqalari-otkazildi',
    ru: {
      title: 'Спортивные соревнования «Кубок Независимости–2026» в ТГЭУ',
      tag: 'Спорт',
      date: '11 сентября 2026'
    },
    uz: {
      title: 'Mustaqillikning 35 yilligiga bag‘ishlangan “Mustaqillik kubogi–2026” sport musobaqalari',
      tag: 'Sport',
      date: '2026-yil 11-sentabr'
    },
    en: {
      title: '“Independence Cup–2026” Sports Competitions Celebrated at TSUE',
      tag: 'Sports',
      date: 'September 11, 2026'
    }
  },
  {
    id: 'news-4838',
    image: 'https://tsue.uz/media/news/photo_2026-09-11_15-50-48.jpg',
    link: 'https://tsue.uz/ru/news/eco-activists-are-you-ready-for-the-new-academic-year',
    ru: {
      title: 'Эко-активисты ТГЭУ готовы к новому учебному году!',
      tag: 'Студенты',
      date: '11 сентября 2026'
    },
    uz: {
      title: 'TDIU eko-faollari yangi o‘quv yiliga to‘liq tayyor!',
      tag: 'Talabalar hayoti',
      date: '2026-yil 11-sentabr'
    },
    en: {
      title: 'TSUE Green Campus & Eco-Activists Ready for the Academic Year',
      tag: 'Campus Life',
      date: 'September 11, 2026'
    }
  }
];

const PARTNERS_DATA = [
  {
    id: 'mct',
    logo: 'assets/logos/digital.png',
    url: 'https://mict.uz',
    coopLink: 'https://mict.uz/uz/lists/view/1',
    ru: { name: 'Министерство цифровых технологий' },
    uz: { name: 'Raqamli texnologiyalar vazirligi' },
    en: { name: 'Ministry of Digital Technologies' }
  },
  {
    id: 'itpark',
    logo: 'assets/logos/itpark.svg',
    url: 'https://itpark.uz',
    coopLink: 'https://itpark.uz/ru/partners',
    ru: { name: 'IT Park Uzbekistan' },
    uz: { name: "IT Park O\u2019zbekiston" },
    en: { name: 'IT Park Uzbekistan' }
  },
  {
    id: 'mef',
    logo: 'assets/logos/mef.png',
    url: 'https://mf.uz',
    coopLink: 'https://mf.uz/ru/links',
    ru: { name: 'Министерство экономики и финансов' },
    uz: { name: 'Iqtisodiyot va moliya vazirligi' },
    en: { name: 'Ministry of Economy and Finance' }
  },
  {
    id: 'cb',
    logo: 'assets/logos/cbu.svg',
    url: 'https://cbu.uz',
    coopLink: 'https://cbu.uz/ru/contents/other/useful_links/',
    ru: { name: 'Центральный банк Узбекистана' },
    uz: { name: "O\u2018zbekiston Markaziy banki" },
    en: { name: 'Central Bank of Uzbekistan' }
  },
  {
    id: 'stat',
    logo: 'assets/logos/stat.png',
    url: 'https://stat.uz',
    coopLink: 'https://stat.uz/ru/',
    ru: { name: 'Агентство по статистике' },
    uz: { name: 'Statistika agentligi' },
    en: { name: 'Statistics Agency' }
  },
  {
    id: 'mvoni',
    logo: 'assets/logos/edu.png',
    url: 'https://edu.uz',
    coopLink: 'https://edu.uz/ru/pages/view/about',
    ru: { name: 'Министерство высшего образования и науки' },
    uz: { name: "Oliy ta\u2018lim, fan va innovatsiyalar vazirligi" },
    en: { name: 'Ministry of Higher Education & Science' }
  },
  {
    id: 'mipt',
    logo: 'assets/logos/miit.svg',
    url: 'https://mift.uz',
    coopLink: 'https://mift.uz/ru/',
    ru: { name: 'Министерство инвестиций и торговли' },
    uz: { name: 'Investitsiyalar, sanoat va savdo vazirligi' },
    en: { name: 'Ministry of Investments & Trade' }
  },
  {
    id: 'lyceum',
    logo: 'assets/logos/lyceum.png',
    url: 'https://ict-academy.uz',
    coopLink: 'https://ict-academy.uz/ru/about',
    ru: { name: 'Лицей ИКТ аль-Хорезми' },
    uz: { name: 'Al-Xorazmiy AKT litseyi' },
    en: { name: 'Al-Khwarizmi ICT Lyceum' }
  }
];

const FORUM_TOPICS_DATA = [
  {
    id: 'forum-1',
    author: 'Azizbek Rahimov (4-kurs)',
    avatar: 'fa-solid fa-user-graduate',
    replies: 14,
    views: 310,
    ru: {
      category: 'Стартапы и ИИ',
      title: 'Кто участвует в хакатоне FinTech AI Hackathon 2026? Ищем ML-инженера в команду',
      text: 'Формируем междисциплинарную команду от факультета для создания системы оценки кредитного риска на базе LLM. Проект уже прошёл менторство.',
      time: '2 часа назад'
    },
    uz: {
      category: 'Startaplar va AI',
      title: 'FinTech AI Hackathon 2026 da kimlar qatnashyapti? Jamoamizga ML-muhandis qidirmoqdamiz',
      text: 'LLM texnologiyalari yordamida kredit riskini baholash tizimini yaratish bo‘yicha fakultetimizdan jamoa tuzmoqdamiz. Mentorlik bosqichidan o‘tganmiz.',
      time: '2 soat oldin'
    },
    en: {
      category: 'Startups & AI',
      title: 'Who is participating in FinTech AI Hackathon 2026? Looking for an ML Engineer',
      text: 'Assembling a cross-functional faculty team to build an LLM-based credit risk assessment agent. Initial mentorship stage passed.',
      time: '2 hours ago'
    }
  },
  {
    id: 'forum-2',
    author: 'Dildora Karimova (3-kurs)',
    avatar: 'fa-solid fa-circle-user',
    replies: 9,
    views: 185,
    ru: {
      category: 'Учебный процесс',
      title: 'Материалы и кейсы по дисциплине «Эконометрическое моделирование во временных рядах»',
      text: 'Поделитесь, пожалуйста, практическими ноутбуками Jupyter и датасетами с семинаров кафедры прикладной математики за этот семестр.',
      time: 'Вчера'
    },
    uz: {
      category: 'O‘quv jarayoni',
      title: '«Vaqtli qatorlarda ekonometrik modellashtirish» fanidan seminar materiallari va keyslar',
      text: 'Iltimos, amaliy matematika kafedrasining ushbu semestr bo‘yicha amaliy Jupyter daftarlari va ma‘lumotlar to‘plamlarini ulashing.',
      time: 'Kecha'
    },
    en: {
      category: 'Academic Process',
      title: 'Lecture materials and datasets for “Time Series Econometric Modeling”',
      text: 'Could anyone share Jupyter notebooks and laboratory assignment datasets from this semester’s applied econometrics course?',
      time: 'Yesterday'
    }
  },
  {
    id: 'forum-3',
    author: 'Деканат (Акбаров Н.Г.)',
    avatar: 'fa-solid fa-building-columns',
    replies: 28,
    views: 890,
    ru: {
      category: 'Объявления',
      title: 'Официальный запуск приёма заявок на стажировку в IT Park и Центробанке РУз',
      text: 'Студенты 3 и 4 курсов бакалавриата могут подать портфолио в деканат для прохождения оплачиваемой практики с последующим трудоустройством.',
      time: '2 дня назад'
    },
    uz: {
      category: 'E‘lonlar',
      title: 'IT Park va O‘zbekiston Markaziy bankida stajirovka o‘tash uchun arizalar qabuli boshlandi',
      text: '3 va 4-kurs talabalari haq to‘lanadigan ishlab chiqarish amaliyoti va kelgusida ishga joylashish uchun dekanatga o‘z portfoliosini topshirishlari mumkin.',
      time: '2 kun oldin'
    },
    en: {
      category: 'Announcements',
      title: 'Applications Open: Prestigious Internships at IT Park and the Central Bank of Uzbekistan',
      text: 'Senior undergraduates (Years 3 & 4) are invited to submit portfolios to the Dean’s Office for paid corporate placements leading to full-time roles.',
      time: '2 days ago'
    }
  }
];

function setLanguage(lang) {
  if (!i18n[lang]) lang = 'ru';
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  const t = i18n[lang];

  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) langLabel.textContent = t.langLabel;

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  const topLinks = document.querySelectorAll('.top-quick-links .top-link');
  if (topLinks[0]) topLinks[0].textContent = t.topHemis;
  if (topLinks[1]) topLinks[1].textContent = t.topStudyUz;
  if (topLinks[2]) topLinks[2].textContent = t.topBachelor;
  if (topLinks[3]) topLinks[3].textContent = t.topMaster;
  if (topLinks[4]) topLinks[4].textContent = t.topSchedule;
  if (topLinks[5]) topLinks[5].textContent = t.topEmail;

  const brandUnivTitle = document.getElementById('brandUnivTitle');
  if (brandUnivTitle) brandUnivTitle.innerHTML = t.brandUniv;

  const brandFacultyBadge = document.getElementById('brandFacultyBadge');
  if (brandFacultyBadge) brandFacultyBadge.textContent = t.brandFaculty;

  const headerMotto = document.getElementById('headerMotto');
  if (headerMotto) headerMotto.textContent = t.headerMotto;

  const headerCallcenterLabel = document.getElementById('headerCallcenterLabel');
  if (headerCallcenterLabel) headerCallcenterLabel.textContent = t.headerCallcenter;

  const navBtns = document.querySelectorAll('.nav-menu-list .nav-item-btn');
  const navIcons = [
    'fa-solid fa-house-chimney',
    'fa-solid fa-user-tie',
    'fa-solid fa-diagram-project',
    'fa-solid fa-graduation-cap',
    'fa-solid fa-comments',
    'fa-solid fa-landmark'
  ];
  const navKeys = [t.navHome, t.navLeadership, t.navDepartments, t.navDirections, t.navForum, t.navHistory];
  navBtns.forEach((btn, i) => {
    if (navKeys[i]) btn.innerHTML = `<i class="${navIcons[i]}"></i> ${navKeys[i]}`;
  });

  const navReceptionBtnText = document.getElementById('navReceptionBtnText');
  if (navReceptionBtnText) navReceptionBtnText.textContent = t.navReception;

  const breadHome = document.getElementById('breadcrumbHome');
  if (breadHome) breadHome.innerHTML = `<i class="fa-solid fa-house"></i> ${t.breadHome}`;

  const breadFaculties = document.getElementById('breadcrumbFaculties');
  if (breadFaculties) breadFaculties.textContent = t.breadFaculties;

  updateBreadcrumbCurrentTab(lang);

  const heroStatusText = document.querySelector('.hero-status-text');
  if (heroStatusText) heroStatusText.textContent = t.heroCluster;

  const heroMainTitle = document.querySelector('.hero-main-title');
  if (heroMainTitle) heroMainTitle.textContent = t.heroTitle;

  const heroLeadText = document.querySelector('.hero-lead-text');
  if (heroLeadText) heroLeadText.textContent = t.heroLead;

  const heroMetricCaptions = document.querySelectorAll('.hero-metric-tile .metric-caption');
  if (heroMetricCaptions[0]) heroMetricCaptions[0].textContent = t.metricStudents;
  if (heroMetricCaptions[1]) heroMetricCaptions[1].textContent = t.metricDepts;
  if (heroMetricCaptions[2]) heroMetricCaptions[2].textContent = t.metricFounded;

  const heroCtaBtns = document.querySelectorAll('.hero-cta-group button');
  if (heroCtaBtns[0]) heroCtaBtns[0].querySelector('span').textContent = t.btnLeadership;
  if (heroCtaBtns[1]) heroCtaBtns[1].textContent = t.btnForum;

  const dossierTag = document.querySelector('.dossier-tag');
  if (dossierTag) dossierTag.textContent = t.dossierTag;

  const dossierStatus = document.querySelector('.dossier-status');
  if (dossierStatus) dossierStatus.innerHTML = `<span class="pulse-dot"></span>${t.dossierStatus}`;

  const dossierRoleLabel = document.querySelector('.dossier-role-label');
  if (dossierRoleLabel) dossierRoleLabel.textContent = t.dossierRole;

  const dossierFullName = document.getElementById('dossierFullName');
  if (dossierFullName) dossierFullName.textContent = t.dossierName;

  const dossierDegree = document.getElementById('dossierDegree');
  if (dossierDegree) dossierDegree.textContent = t.dossierDegree;

  const dossierReception = document.getElementById('dossierReception');
  if (dossierReception) dossierReception.textContent = t.dossierReception;

  const dossierBtnSpan = document.querySelector('.dossier-reception-btn span');
  if (dossierBtnSpan) dossierBtnSpan.textContent = t.dossierBtn;

  const tickerTitleText = document.getElementById('tickerTitleText');
  if (tickerTitleText) tickerTitleText.textContent = t.newsSectionTitle;

  const homeLeadTitle = document.getElementById('homeLeadershipTitle');
  if (homeLeadTitle) homeLeadTitle.textContent = t.homeLeadTitle;

  const homeLeadSub = document.getElementById('homeLeadershipSubtitle');
  if (homeLeadSub) homeLeadSub.textContent = t.homeLeadSub;

  const btnViewAllLeaders = document.getElementById('btnViewAllLeaders');
  if (btnViewAllLeaders) {
    const span = btnViewAllLeaders.querySelector('span');
    if (span) span.textContent = t.btnViewAllLeaders;
  }

  updateTabBanners(t);

  if (t.historyLead) {
    const leadBadge = document.querySelector('.history-lead-badge');
    const leadHeading = document.querySelector('.history-section-heading');
    const leadText1 = document.querySelector('.history-text');
    const leadText2 = document.querySelector('.history-text-secondary');
    if (leadBadge) leadBadge.innerHTML = `<i class="fa-solid fa-scroll"></i> ${t.historyLead.badge}`;
    if (leadHeading) leadHeading.textContent = t.historyLead.heading;
    if (leadText1) leadText1.innerHTML = t.historyLead.text1;
    if (leadText2) leadText2.innerHTML = t.historyLead.text2;

    const epochCards = document.querySelectorAll('.epoch-card');
    if (t.historyEpochs) {
      epochCards.forEach((card, idx) => {
        const ep = t.historyEpochs[idx];
        if (ep) {
          const pPeriod = card.querySelector('.epoch-period');
          const hTitle = card.querySelector('.epoch-title');
          const pDesc = card.querySelector('.epoch-desc');
          const tag = card.querySelector('.epoch-tag');
          if (pPeriod) pPeriod.textContent = ep.period;
          if (hTitle) hTitle.textContent = ep.title;
          if (pDesc) pDesc.textContent = ep.desc;
          if (tag) tag.innerHTML = `<i class="${ep.tagIcon || 'fa-solid fa-check'}"></i> ${ep.tag}`;
        }
      });
    }

    const tlHeading = document.querySelector('.timeline-header-title');
    const tlSub = document.querySelector('.timeline-header-sub');
    if (tlHeading && t.historyTimelineHeader) tlHeading.textContent = t.historyTimelineHeader.title;
    if (tlSub && t.historyTimelineHeader) tlSub.textContent = t.historyTimelineHeader.sub;

    const timelineItems = document.querySelectorAll('.history-timeline .timeline-item');
    if (t.historyTimeline) {
      timelineItems.forEach((item, idx) => {
        const tl = t.historyTimeline[idx];
        if (tl) {
          const yearBadge = item.querySelector('.timeline-year-badge');
          const h4 = item.querySelector('.timeline-card h4');
          const meta = item.querySelector('.timeline-card-meta');
          const p = item.querySelector('.timeline-card p');
          if (yearBadge) yearBadge.textContent = tl.year;
          if (h4) h4.textContent = tl.title;
          if (meta) meta.textContent = tl.meta;
          if (p) p.textContent = tl.desc;
        }
      });
    }

    const statTiles = document.querySelectorAll('.history-stats-bar .h-stat-tile');
    if (t.historyStats) {
      statTiles.forEach((tile, idx) => {
        const st = t.historyStats[idx];
        if (st) {
          const val = tile.querySelector('.h-stat-val');
          const desc = tile.querySelector('.h-stat-desc');
          if (val) val.textContent = st.val;
          if (desc) desc.textContent = st.desc;
        }
      });
    }
  }

  const forumControlsLabel = document.querySelector('.forum-controls-bar div');
  if (forumControlsLabel) {
    forumControlsLabel.innerHTML = `<i class="fa-solid fa-comments"></i> ${t.forumTopicsHeading}`;
  }
  const forumNewBtn = document.querySelector('.btn-forum-new');
  if (forumNewBtn) {
    forumNewBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> ${t.forumNewBtn}`;
  }

  const partnersTitle = document.getElementById('partnersSectionTitle');
  if (partnersTitle) {
    partnersTitle.innerHTML = `${t.partnersTitle} <span>${t.partnersIT}</span>`;
  }

  updateFooter(t);
  updateModal(t);
  renderLeadership(lang);
  renderDepartments(lang);
  renderDirections(lang);
  renderNews(lang);
  renderPartners(lang);
  renderForumTopics(lang);
}

function updateTabBanners(t) {
  const leadBanner = document.querySelector('.tab-banner-leadership');
  if (leadBanner) {
    const h2 = leadBanner.querySelector('h2');
    const p = leadBanner.querySelector('p');
    if (h2) h2.textContent = t.tabLeadTitle;
    if (p) p.textContent = t.tabLeadSub;
    const statLabels = leadBanner.querySelectorAll('.tab-stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.tabLeadStat1;
    if (statLabels[1]) statLabels[1].textContent = t.tabLeadStat2;
    const statNums = leadBanner.querySelectorAll('.tab-stat-num');
    if (statNums[1]) statNums[1].textContent = t.tabLeadStat2Val;
  }

  const deptBanner = document.querySelector('.tab-banner-departments');
  if (deptBanner) {
    const h2 = deptBanner.querySelector('h2');
    const p = deptBanner.querySelector('p');
    if (h2) h2.textContent = t.tabDeptTitle;
    if (p) p.textContent = t.tabDeptSub;
    const statLabels = deptBanner.querySelectorAll('.tab-stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.tabDeptStat1;
    if (statLabels[1]) statLabels[1].textContent = t.tabDeptStat2;
  }

  const dirBanner = document.querySelector('.tab-banner-directions');
  if (dirBanner) {
    const h2 = dirBanner.querySelector('h2');
    const p = dirBanner.querySelector('p');
    if (h2) h2.textContent = t.tabDirTitle;
    if (p) p.textContent = t.tabDirSub;
    const statLabels = dirBanner.querySelectorAll('.tab-stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.tabDirStat1;
    if (statLabels[1]) statLabels[1].textContent = t.tabDirStat2;
    const statNums = dirBanner.querySelectorAll('.tab-stat-num');
    if (statNums[1]) statNums[1].textContent = t.tabDirStat2Val;
  }

  const forumBanner = document.querySelector('.tab-banner-forum');
  if (forumBanner) {
    const h2 = forumBanner.querySelector('h2');
    const p = forumBanner.querySelector('p');
    if (h2) h2.textContent = t.tabForumTitle;
    if (p) p.textContent = t.tabForumSub;
    const statLabels = forumBanner.querySelectorAll('.tab-stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.tabForumStat1;
    if (statLabels[1]) statLabels[1].textContent = t.tabForumStat2;
  }

  const histBanner = document.querySelector('.tab-banner-history');
  if (histBanner) {
    const h2 = histBanner.querySelector('h2');
    const p = histBanner.querySelector('p');
    if (h2) h2.textContent = t.tabHistTitle;
    if (p) p.textContent = t.tabHistSub;
    const statLabels = histBanner.querySelectorAll('.tab-stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.tabHistStat1;
    if (statLabels[1]) statLabels[1].textContent = t.tabHistStat2;
  }
}

function updateFooter(t) {
  const brandH3 = document.querySelector('#footerBrand h3');
  if (brandH3) brandH3.textContent = t.footerUnivName;

  const brandP = document.querySelector('#footerBrand p');
  if (brandP) brandP.textContent = t.footerUnivDesc;

  const footerAddress = document.getElementById('footerAddress');
  if (footerAddress) footerAddress.textContent = t.footerAddress;

  const footerPhone = document.getElementById('footerPhone');
  if (footerPhone) footerPhone.textContent = t.footerPhone;

  const cols = document.querySelectorAll('.footer-col h4');
  if (cols[0]) cols[0].textContent = t.footerFaculty;
  if (cols[1]) cols[1].textContent = t.footerPortals;
  if (cols[2]) cols[2].textContent = t.footerRatings;

  const facultyLinks = document.querySelectorAll('.footer-col:nth-child(2) .footer-links-list a');
  const linkKeys = [t.footerOverview, t.footerLeadership, t.footerDepts, t.footerDirs, t.footerForum, t.footerHistory];
  facultyLinks.forEach((a, i) => {
    if (linkKeys[i]) a.textContent = linkKeys[i];
  });

  const footerCopyright = document.getElementById('footerCopyright');
  if (footerCopyright) footerCopyright.textContent = t.footerCopyright;

  const footerDev = document.getElementById('footerDev');
  if (footerDev) footerDev.textContent = t.footerDev;
}

function updateModal(t) {
  const modalH3 = document.querySelector('.forum-modal-card h3');
  if (modalH3) modalH3.textContent = t.modalTitle;

  const labels = document.querySelectorAll('.forum-form-group label');
  if (labels[0]) labels[0].textContent = t.modalCatLabel;
  if (labels[1]) labels[1].textContent = t.modalTitleLabel;
  if (labels[2]) labels[2].textContent = t.modalTextLabel;

  const titleInput = document.getElementById('newTopicTitle');
  if (titleInput) titleInput.placeholder = t.modalTitlePlaceholder;

  const textInput = document.getElementById('newTopicText');
  if (textInput) textInput.placeholder = t.modalTextPlaceholder;

  const catSelect = document.getElementById('newTopicCategory');
  if (catSelect && t.modalCatOptions) {
    const currentVal = catSelect.selectedIndex;
    catSelect.innerHTML = t.modalCatOptions.map(opt => `<option>${opt}</option>`).join('');
    if (currentVal >= 0 && currentVal < t.modalCatOptions.length) {
      catSelect.selectedIndex = currentVal;
    }
  }

  const cancelBtn = document.querySelector('.forum-modal-actions .filter-btn');
  if (cancelBtn) cancelBtn.textContent = t.modalCancel;

  const publishBtn = document.querySelector('.forum-modal-actions .btn-forum-new');
  if (publishBtn) publishBtn.textContent = t.modalPublish;
}

function updateBreadcrumbCurrentTab(lang) {
  const t = i18n[lang];
  const breadcrumb = document.getElementById('breadcrumbCurrent');
  if (!breadcrumb) return;

  const currentTab = (window.location.hash.replace('#', '') || 'home');
  const labels = {
    home: t.breadDefault,
    leadership: t.breadLeadership,
    departments: t.breadDepartments,
    directions: t.breadDirections,
    forum: t.breadForum,
    history: t.breadHistory,
  };
  if (labels[currentTab]) breadcrumb.textContent = labels[currentTab];
}

function createLeaderCarouselCard(leader, lang) {
  const t = i18n[lang];
  const l = leader[lang] || leader.ru;
  const isDean = leader.id === 'akbarov';
  const roleTag = isDean ? t.leaderDean : l.role.toUpperCase();
  const cleanedPhone = leader.phone.replace(/[^0-9+]/g, '');

  return `
    <div class="lcc-slide">
      <div class="lcc-content">
        <div class="lcc-top-row">
          <span class="lcc-role-tag">${roleTag}</span>
          <span class="lcc-institution">${t.leaderInstitution}</span>
        </div>
        <h2 class="lcc-name">${l.fullName}</h2>
        <div class="lcc-degree">${l.degree}</div>

        <div class="lcc-contacts">
          <a class="lcc-contact-row" href="tel:${cleanedPhone}">
            <span class="lcc-icon"><i class="fa-solid fa-phone"></i></span>
            <span>${leader.phone}</span>
          </a>
          <a class="lcc-contact-row" href="mailto:${leader.email}">
            <span class="lcc-icon"><i class="fa-solid fa-envelope"></i></span>
            <span>${leader.email}</span>
          </a>
          <div class="lcc-contact-row">
            <span class="lcc-icon"><i class="fa-regular fa-calendar"></i></span>
            <span>${l.reception}</span>
          </div>
        </div>

        <p class="lcc-bio">${l.bio}</p>
      </div>

      <div class="lcc-photo-col">
        <img src="${leader.photo}" alt="${l.fullName}" loading="lazy"
          onerror="this.parentElement.style.background='linear-gradient(160deg,#002855,#001428)';this.style.display='none'">
      </div>
    </div>
  `;
}

function renderLeaderCarousel(containerId, lang) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  const slidesHtml = LEADERS_DATA.map(l => createLeaderCarouselCard(l, lang)).join('');
  const dotsHtml = LEADERS_DATA.map((_, i) => `<button class="lcc-dot ${i === 0 ? 'active' : ''}" onclick="goToLeader('${containerId}', ${i})" aria-label="Slide ${i+1}"></button>`).join('');

  wrap.innerHTML = `
    <div class="lcc-wrapper">
      <div class="lcc-track" id="lccTrack_${containerId}">
        ${slidesHtml}
      </div>
      <div class="lcc-nav">
        <button class="lcc-nav-btn" onclick="shiftLeader('${containerId}', -1)" aria-label="Previous Leader">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="lcc-dots" id="lccDots_${containerId}">
          ${dotsHtml}
        </div>
        <button class="lcc-nav-btn" onclick="shiftLeader('${containerId}', 1)" aria-label="Next Leader">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;

  wrap._leaderIndex = 0;
}

function shiftLeader(containerId, dir) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const track = document.getElementById('lccTrack_' + containerId);
  const dots = document.querySelectorAll(`#lccDots_${containerId} .lcc-dot`);
  if (!track || !dots.length) return;

  const total = track.children.length;
  wrap._leaderIndex = ((wrap._leaderIndex || 0) + dir + total) % total;
  const idx = wrap._leaderIndex;

  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function goToLeader(containerId, idx) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const track = document.getElementById('lccTrack_' + containerId);
  const dots = document.querySelectorAll(`#lccDots_${containerId} .lcc-dot`);
  if (!track || !dots.length) return;

  wrap._leaderIndex = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function renderLeadership(lang) {
  renderLeaderCarousel('fullLeadershipGrid', lang);
  renderLeaderCarousel('homeLeadershipPreview', lang);
}

function renderDepartments(lang) {
  const container = document.getElementById('departmentsContainer');
  if (!container) return;

  const t = i18n[lang];

  container.innerHTML = DEPARTMENTS_DATA.map(dept => {
    const d = dept[lang] || dept.ru;
    return `
      <div class="dept-card">
        <div class="dept-icon-badge"><i class="${dept.icon}"></i></div>
        <h3 class="dept-title">${d.name}</h3>
        <div class="dept-head"><i class="fa-solid fa-user-tie"></i> ${d.head}</div>
        <p class="dept-desc">${d.description}</p>
        <div class="dept-programs-label">${t.deptProgramsLabel}</div>
        <div class="dept-programs-chips">
          ${d.programs.map(p => `<span class="program-chip">${p}</span>`).join('')}
        </div>
        <div class="dept-footer-meta">
          <span><i class="fa-solid fa-users"></i> ${dept.studentsCount} ${t.deptStudentsSuffix}</span>
          <span><i class="fa-solid fa-flask"></i> ${dept.labs}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderDirections(lang) {
  const container = document.getElementById('directionsContainer');
  if (!container) return;

  const t = i18n[lang];

  container.innerHTML = DIRECTIONS_DATA.map(dir => {
    const d = dir[lang] || dir.ru;
    return `
      <div class="dept-card">
        <div class="dept-icon-badge"><i class="${dir.icon}"></i></div>
        <h3 class="dept-title">${d.title}</h3>
        <div class="dept-head">${d.head}</div>
        <p class="dept-desc">${d.desc}</p>
        <div class="dept-footer-meta">
          <span><i class="fa-solid fa-book-open"></i> ${t.dirQualLabel} ${d.qual}</span>
          <span><i class="fa-regular fa-clock"></i> ${d.duration}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderNews(lang) {
  const track = document.getElementById('newsWheelTrack');
  if (!track) return;

  const t = i18n[lang];

  track.innerHTML = NEWS_DATA.map(item => {
    const n = item[lang] || item.ru;
    return `
      <a class="news-wheel-card" href="${item.link}" target="_blank" rel="noopener">
        <div class="news-card-thumb-wrap">
          <img src="${item.image}" alt="${n.title}" loading="lazy"
            onerror="this.parentElement.classList.add('no-img');this.style.display='none'">
          <span class="news-card-tag-overlay">${n.tag}</span>
        </div>
        <div class="news-card-body">
          <h4 class="news-card-title">${n.title}</h4>
          <div class="news-card-footer">
            <span><i class="fa-regular fa-calendar"></i> ${n.date}</span>
            <span class="news-read-link">${t.newsRead} <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

function rotateNewsWheel(dir) {
  const track = document.getElementById('newsWheelTrack');
  if (!track || !NEWS_DATA.length) return;

  const cardWidth = 330;
  const maxOffset = Math.max(0, NEWS_DATA.length - 3);

  currentNewsOffset = Math.max(0, Math.min(currentNewsOffset + dir, maxOffset));
  track.style.transform = `translateX(-${currentNewsOffset * cardWidth}px)`;
}

function renderPartners(lang) {
  const track = document.getElementById('partnersWheelTrack');
  if (!track) return;

  const doubled = [...PARTNERS_DATA, ...PARTNERS_DATA];
  track.innerHTML = doubled.map(p => {
    const l = p[lang] || p.ru;
    const linkHref = p.coopLink || p.url || '#';
    return `
      <a class="partner-logo-item" href="${linkHref}" target="_blank" rel="noopener noreferrer" aria-label="${l.name}">
        <div class="partner-logo-img-wrap">
          <img src="${p.logo}" alt="${l.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="partner-hover-overlay">
          <span class="partner-hover-name">${l.name}</span>
          <span class="partner-hover-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
        </div>
      </a>
    `;
  }).join('');
}

function renderForumTopics(lang) {
  const container = document.getElementById('forumTopicsList');
  if (!container) return;

  const t = i18n[lang];

  container.innerHTML = FORUM_TOPICS_DATA.map(topic => {
    const f = topic[lang] || topic.ru;
    return `
      <div class="forum-topic-card">
        <div class="forum-topic-left">
          <div class="forum-topic-meta">
            <span class="forum-cat-badge">${f.category}</span>
            <span><i class="${topic.avatar}"></i> ${topic.author}</span>
            <span><i class="fa-regular fa-clock"></i> ${f.time}</span>
          </div>
          <h4 class="forum-topic-title">${f.title}</h4>
          <p class="forum-topic-text">${f.text}</p>
        </div>
        <div class="forum-topic-stats">
          <span class="forum-stats-pill"><i class="fa-solid fa-comment-dots"></i> ${topic.replies} ${t.forumReplies}</span>
          <span><i class="fa-regular fa-eye"></i> ${topic.views} ${t.forumViews}</span>
        </div>
      </div>
    `;
  }).join('');
}

function toggleForumModal(show) {
  const modal = document.getElementById('forumNewModal');
  if (modal) modal.classList.toggle('active', show);
}

function publishForumTopic() {
  const cat = document.getElementById('newTopicCategory').value;
  const title = document.getElementById('newTopicTitle').value.trim();
  const text = document.getElementById('newTopicText').value.trim();

  if (!title || !text) {
    alert(i18n[currentLang].modalTitlePlaceholder);
    return;
  }

  const authorName = currentLang === 'uz' ? 'Siz (TDIU Talabasi)' : currentLang === 'en' ? 'You (TSUE Student)' : 'Вы (Студент ТГЭУ)';
  const justNow = currentLang === 'uz' ? 'Hozir' : currentLang === 'en' ? 'Just now' : 'Только что';

  const newTopic = {
    id: `forum-${Date.now()}`,
    author: authorName,
    avatar: 'fa-solid fa-circle-user',
    replies: 0,
    views: 1,
    ru: { category: cat, title, text, time: justNow },
    uz: { category: cat, title, text, time: justNow },
    en: { category: cat, title, text, time: justNow }
  };

  FORUM_TOPICS_DATA.unshift(newTopic);
  renderForumTopics(currentLang);
  document.getElementById('newTopicTitle').value = '';
  document.getElementById('newTopicText').value = '';
  toggleForumModal(false);
}

function switchTab(tabId) {
  document.querySelectorAll('.page-tab-section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('.nav-item-btn').forEach(btn => btn.classList.remove('active'));

  const targetSection = document.getElementById(`tab-${tabId}`);
  if (targetSection) targetSection.classList.add('active');

  const activeBtn = document.querySelector(`.nav-item-btn[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  updateBreadcrumbCurrentTab(currentLang);

  if (window.scrollY > 400) window.scrollTo({ top: 380, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabId}`);
}

function openReceptionModal() {
  switchTab('leadership');
  alert(i18n[currentLang].receptionAlert);
}

function initAccessibility() {
  const btn = document.getElementById('accessibilityBtn');
  if (!btn) return;

  const saved = localStorage.getItem('highContrast') === 'true';
  if (saved) {
    document.body.classList.add('high-contrast');
    btn.classList.add('active');
  }

  btn.addEventListener('click', () => {
    const isOn = document.body.classList.toggle('high-contrast');
    btn.classList.toggle('active', isOn);
    localStorage.setItem('highContrast', isOn);
  });
}

function initLangSelector() {
  const selector = document.getElementById('langSelector');
  const dropdown = document.getElementById('langDropdown');
  if (!selector || !dropdown) return;

  selector.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      setLanguage(opt.dataset.lang);
      dropdown.classList.remove('show');
    });
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });
}

function initApp() {
  initAccessibility();
  initLangSelector();
  setLanguage(currentLang);

  newsAutoInterval = setInterval(() => rotateNewsWheel(1), 6000);

  const hash = window.location.hash.replace('#', '');
  if (hash && ['home', 'leadership', 'departments', 'directions', 'forum', 'history'].includes(hash)) {
    switchTab(hash);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
