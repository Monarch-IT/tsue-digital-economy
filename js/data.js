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
    url: 'https://digital.uz',
    coopLink: 'https://digital.uz',
    ru: { name: 'Министерство цифровых технологий' },
    uz: { name: 'Raqamli texnologiyalar vazirligi' },
    en: { name: 'Ministry of Digital Technologies' }
  },
  {
    id: 'itpark',
    logo: 'assets/logos/itpark.svg',
    url: 'https://itpark.uz',
    coopLink: 'https://itpark.uz',
    ru: { name: 'IT Park Uzbekistan' },
    uz: { name: "IT Park O\u2019zbekiston" },
    en: { name: 'IT Park Uzbekistan' }
  },
  {
    id: 'mef',
    logo: 'assets/logos/mef.png',
    url: 'https://mf.uz',
    coopLink: 'https://mf.uz',
    ru: { name: 'Министерство экономики и финансов' },
    uz: { name: 'Iqtisodiyot va moliya vazirligi' },
    en: { name: 'Ministry of Economy and Finance' }
  },
  {
    id: 'cb',
    logo: 'assets/logos/cbu.svg',
    url: 'https://cbu.uz',
    coopLink: 'https://cbu.uz',
    ru: { name: 'Центральный банк Узбекистана' },
    uz: { name: "O\u2018zbekiston Markaziy banki" },
    en: { name: 'Central Bank of Uzbekistan' }
  },
  {
    id: 'stat',
    logo: 'assets/logos/stat.png',
    url: 'https://stat.uz',
    coopLink: 'https://stat.uz',
    ru: { name: 'Агентство по статистике' },
    uz: { name: 'Statistika agentligi' },
    en: { name: 'Statistics Agency' }
  },
  {
    id: 'mvoni',
    logo: 'assets/logos/edu.png',
    url: 'https://edu.uz',
    coopLink: 'https://edu.uz',
    ru: { name: 'Министерство высшего образования и науки' },
    uz: { name: "Oliy ta\u2018lim, fan va innovatsiyalar vazirligi" },
    en: { name: 'Ministry of Higher Education & Science' }
  },
  {
    id: 'mipt',
    logo: 'assets/logos/miit.svg',
    url: 'https://miit.uz',
    coopLink: 'https://miit.uz',
    ru: { name: 'Министерство инвестиций и торговли' },
    uz: { name: 'Investitsiyalar, sanoat va savdo vazirligi' },
    en: { name: 'Ministry of Investments & Trade' }
  },
  {
    id: 'lyceum',
    logo: 'assets/logos/lyceum.png',
    url: 'https://ict-academy.uz',
    coopLink: 'https://ict-academy.uz',
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
    author: 'Руководство факультета (Акбаров Н.Г.)',
    avatar: 'fa-solid fa-building-columns',
    replies: 28,
    views: 890,
    ru: {
      category: 'Объявления',
      title: 'Официальный запуск приёма заявок на стажировку в IT Park и Центробанке РУз',
      text: 'Студенты 3 и 4 курсов бакалавриата могут подать портфолио в администрацию факультета для прохождения оплачиваемой практики с последующим трудоустройством.',
      time: '2 дня назад'
    },
    uz: {
      category: 'E‘lonlar',
      title: 'IT Park va O‘zbekiston Markaziy bankida stajirovka o‘tash uchun arizalar qabuli boshlandi',
      text: '3 va 4-kurs talabalari haq to‘lanadigan ishlab chiqarish amaliyoti va kelgusida ishga joylashish uchun fakultet ma‘muriyatiga o‘z portfoliosini topshirishlari mumkin.',
      time: '2 kun oldin'
    },
    en: {
      category: 'Announcements',
      title: 'Applications Open: Prestigious Internships at IT Park and the Central Bank of Uzbekistan',
      text: 'Senior undergraduates (Years 3 & 4) are invited to submit portfolios to the Faculty Administration for paid corporate placements leading to full-time roles.',
      time: '2 days ago'
    }
  }
];

