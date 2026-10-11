function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    topAuthLogin: 'Вход',
    topAuthCabinet: 'Личный Кабинет',

    navHome: 'Главная (Обзор)',
    navLeadership: 'Руководство факультета',
    navDepartments: 'Кафедры',
    navDirections: 'Направления обучения',
    navForum: 'Форум Факультета',
    navHistory: 'История и Инновации',
    navTutors: 'Тьюторы',
    navReception: 'Приём руководства',

    breadHome: 'Главная',
    breadFaculties: 'Факультеты',
    breadDefault: 'Факультет цифровой экономики',
    breadLeadership: 'Руководство факультета',
    breadDepartments: 'Кафедры факультета',
    breadDirections: 'Направления обучения',
    breadTutors: 'Отдел Тьюторов',
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
    homeLeadSub: 'Руководство и координаторы академического развития',
    btnViewAllLeaders: 'Посмотреть весь состав',

    leaderDean: 'ДЕКАН ФАКУЛЬТЕТА',
    leaderInstitution: 'ТГЭУ • Факультет цифровой экономики',

    tabLeadTitle: 'Руководство факультета',
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
    footerPhone: '+998 71 239-01-29 (Приёмная факультета)',
    footerFaculty: 'Факультет',
    footerPortals: 'Университетские порталы',
    footerRatings: 'Рейтинги и статус',
    footerOverview: 'Обзор факультета',
    footerLeadership: 'Руководство факультета',
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

    receptionAlert: "График приёма руководства факультета:\nПонедельник — Пятница: 14:00 - 17:00\nТелефон для записи: +998 71 239-01-29\nЭл. почта: nodir.akbarov@tsue.uz",

    schedTitle: 'Расписание занятий',
    schedSubtitle: 'Учебное расписание группы АТ-31/25r',
    schedHeaderTitle: 'Модуль Расписания',
    schedHeaderSub: 'Факультет Цифровой Экономики · ТГЭУ',
    schedGroupLabel: 'Учебная группа',
    schedOptCustom: '— Новая группа —',
    schedWeekTypeLabel: 'Тип недели',
    schedOptOdd: 'Нечётная',
    schedOptEven: 'Чётная',
    schedMetaSemesterKey: 'Семестр:',
    schedSemesterVal: 'I семестр 2025–2026',
    schedMetaDeptKey: 'Кафедра:',
    schedMetaDeptVal: 'Информационные технологии в экономике',
    schedMetaFormKey: 'Форма:',
    schedMetaFormVal: 'Очная',
    schedMetaLangKey: 'Язык обучения:',
    schedMetaLangVal: 'Русский',
    schedWeekOdd: 'Нечётная неделя',
    schedWeekEven: 'Чётная неделя',
    schedBothWeeks: 'Обе недели',
    schedGroup1: 'Подгруппа 1',
    schedGroup2: 'Подгруппа 2',
    schedBtnAddLesson: 'Добавить занятие',
    schedBtnClearDay: 'Очистить день',
    schedBtnExportPDF: 'Скачать PDF',
    schedViewBtnExportPDF: 'Скачать расписание PDF',
    schedBtnSave: 'Сохранить',
    schedModalTitle: 'Добавить занятие',
    schedSubjectLabel: 'Дисциплина',
    schedTeacherLabel: 'Преподаватель',
    schedRoomLabel: 'Аудитория',
    schedTypeLabel: 'Тип занятия',
    schedWeekLabel: 'Тип недели',
    schedDayLabel: 'День недели',
    schedSlotLabel: 'Пара (№)',
    schedBtnSaveLesson: 'Сохранить',
    schedBtnDelete: 'Удалить',
    schedBtnCancel: 'Отмена',
    schedEmpty: 'Пара не запланирована',
    schedCellAddHint: '+ Добавить',
    schedPdfTitle: 'Расписание занятий — АТ-31/25r',
    schedPdfWeekOdd: 'Нечётная неделя',
    schedPdfWeekEven: 'Чётная неделя',
    schedDays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    schedTypes: {
      lecture: 'Лекция',
      practice: 'Практика',
      lab: 'Лаборат.',
      seminar: 'Семинар'
    },
    schedAlertSubject: 'Укажите название дисциплины.',
    schedPromptClearDay: 'Очистить расписание для какого дня?',
    schedPromptInvalidNum: 'Неверный номер.',
    schedConfirmClearDay: 'Очистить расписание',

    loginTitle: 'Вход в систему',
    loginSubtitle: 'Факультет Цифровой Экономики · ТГЭУ',
    loginUserLabel: 'Имя пользователя (Логин)',
    loginUserPlaceholder: 'Введите имя пользователя',
    loginPassLabel: 'Пароль',
    loginPassPlaceholder: 'Введите пароль',
    loginSubmitBtn: 'Войти в систему',
    loginErrorEmpty: 'Пожалуйста, укажите имя пользователя и пароль.',
    loginErrorWrong: 'Неверный логин или пароль. Проверьте данные или выберите аккаунт выше.',
    loginNote: 'Доступ предоставляется только авторизованным сотрудникам факультета и администраторам.<br>Самостоятельная регистрация студентов временно отключена.',

    cabTitle: 'Личный Кабинет',
    cabAccessBadge: 'Авторизованный доступ',
    cabGuestTitle: 'Личный Кабинет',
    cabGuestDesc: 'Войдите в систему, чтобы получить доступ к личному кабинету сотрудника факультета. Здесь вы сможете управлять своим профилем, отслеживать академические показатели и взаимодействовать с кафедрой.',
    cabGuestLoginBtn: 'Войти в систему',
    cabAccessActive: 'Доступ активен',
    cabLogout: 'Выйти',
    cabActionSchedule: 'Расписание занятий',
    cabActionScheduleDesc: 'Просмотр и редактирование учебного расписания группы АТ-31/25r',
    cabActionSystem: 'Цифровая система',
    cabActionSystemDesc: 'Административная панель: ведомости, контингент, управление группами',
    cabActionDekan: 'Руководство факультета',
    cabActionDekanDesc: 'Контакты и приёмные часы руководства факультета',
    cabActionExport: 'Экспорт ведомости',
    cabActionExportDesc: 'Сформировать и скачать академическую ведомость группы в PDF',
    cabInfoGroup: 'Учебная группа',
    cabInfoGroupVal: 'АТ-31/25r · Направление: Цифровая экономика',
    cabInfoYear: 'Учебный год',
    cabInfoYearVal: '2025–2026, I семестр',
    cabInfoFaculty: 'Факультет',
    cabInfoFacultyVal: 'Факультет Цифровой Экономики — ТГЭУ (ТДИУ)',
    cabInfoStudents: 'Кол-во студентов',
    cabInfoStudentsVal: '25 человек · Подгруппа 1: 13 чел. · Подгруппа 2: 12 чел.',

    sysBadge: 'Единая цифровая инфраструктура',
    sysTitle: 'Информационная система Факультета Цифровой Экономики',
    sysDesc: 'Централизованная экосистема ТГЭУ: интеграция с университетским реестром HEMIS, управление учебными потоками, конструктор академического расписания, электронные ведомости и верификация студентов.',
    sysFeatHemisTitle: 'Интеграция с HEMIS',
    sysFeatHemisSub: 'Синхронизация контингента студентов, рейтинговых баллов и дисциплин в режиме реального времени.',
    sysFeatSchedTitle: 'Конструктор расписания',
    sysFeatSchedSub: 'Оперативное распределение аудиторного фонда, смена типов недель и моментальный экспорт расписания.',
    sysFeatDbTitle: 'База данных факультета',
    sysFeatDbSub: 'Аналитика по направлениям подготовки, кураторские профили и учет академической успеваемости.',
    sysFeatVedomTitle: 'Электронные ведомости',
    sysFeatVedomSub: 'Формирование экзаменационных и зачетных ведомостей с цифровым подтверждением руководства факультета.',
    sysLoginBtn: 'Войти в личный кабинет системы',
    sysOpenSched: 'Открыть расписание занятий',
    sysSchedBuilder: 'Конструктор расписания',
    sysBtnLogout: 'Выход',
    sysAccessVerified: 'Доступ подтверждён',
    sysMetricSubgroups: 'Деление на подгруппы',
    sysMetricSubgroupsVal: '2 подгруппы',
    sysMetricSubgroupsNote: 'Подгруппа 1 (1–13) · Подгруппа 2 (14–25)',
    sysMetricGroup: 'Активная группа',
    sysMetricGroupNote: '25 студентов · Цифровая экономика',
    sysMetricSemester: 'Учебный семестр',
    sysMetricSemesterVal: 'I (2025–2026)',
    sysMetricSemesterNote: 'Расписание сформировано',
    sysMetricGpa: 'Средний рейтинг группы',
    sysMetricGpaNote: 'Тестовый контингент студентов',
    sysTableTitle: 'Контингент группы АТ-31/25r (Распределение по подгруппам)',
    sysExportBtn: 'Экспорт ведомости (PDF)',
    sysThNum: '№',
    sysThHemis: 'HEMIS ID',
    sysThName: 'Ф.И.О. Студента',
    sysThSubgroup: 'Подгруппа',
    sysThType: 'Форма',
    sysThGpa: 'Рейтинг (GPA)',
    sysThAttend: 'Посещаемость',
    sysThStatus: 'Статус',
    sysSubgroup1: '1 подгруппа',
    sysSubgroup2: '2 подгруппа',
    sysTypeGrant: 'Грант',
    sysTypeContract: 'Контракт',
    sysStatusStudying: 'Обучается',
    sysStatusHead1: 'Староста (1 п/гр)',
    sysStatusHead2: 'Зам. старосты (2 п/гр)',
    sysManageSched: 'Управление расписанием',
    sysManageSchedDesc: 'Редактирование пар для нечётной и чётной недели, смена аудиторий и преподавателей.',
    sysGoBtn: 'Перейти',
    sysExamTitle: 'Экзаменационные ведомости',
    sysExamDesc: 'Формирование протоколов рубежного и итогового контроля для руководства факультета.',
    sysGenerateBtn: 'Сформировать',
    sysRoleSuperAdmin: 'Супер-администратор',
    sysRoleDeanHead: 'Руководитель факультета',
    sysRoleAdmin: 'Администратор',
    sysRoleStaff: 'Сотрудник',
    sysCuratorGroup: 'Куратор группы: АТ-31/25r',
    sysAllDirections: 'Все направления факультета',

    pdfSchedUnivTitle: 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ',
    pdfSchedFacultyTitle: 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · РАСПИСАНИЕ УЧЕБНЫХ ЗАНЯТИЙ',
    pdfSchedGroup: 'ГРУППА',
    pdfSchedSemester: 'I семестр 2025–2026',
    pdfSchedTimeTh: 'Время',
    pdfSchedFooterLeft: 'Официальное расписание учебного процесса ТГЭУ · Сформировано:',
    pdfSchedFooterRight: 'Руководство Факультета Цифровой Экономики ТГЭУ',
    pdfSchedFileName: 'Расписание',

    pdfVedomUnivTitle: 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ',
    pdfVedomFacultyTitle: 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · АКАДЕМИЧЕСКАЯ ВЕДОМОСТЬ',
    pdfVedomGroupLabel: 'Учебная группа: АТ-31/25r (Цифровая экономика)',
    pdfVedomSemesterLabel: 'Семестр: I семестр (2025–2026)',
    pdfVedomExportDate: 'Дата выгрузки:',
    pdfVedomThNum: '№',
    pdfVedomThHemis: 'HEMIS ID',
    pdfVedomThName: 'Ф.И.О. Студента',
    pdfVedomThSubgroup: 'Подгруппа',
    pdfVedomThType: 'Форма',
    pdfVedomThGpa: 'GPA',
    pdfVedomThAttend: 'Посещ.',
    pdfVedomThStatus: 'Статус',
    pdfVedomSignCurator: 'Подпись куратора группы: ________________',
    pdfVedomSignDean: 'Декан Факультета Цифровой Экономики: ________________',
    pdfVedomFileName: 'Ведомость_АТ-31-25r.pdf',

    notifBtnLabel: 'Уведомления',
    notifDrawerTitle: 'УВЕДОМЛЕНИЯ',
    notifDrawerSubtitle: 'Система оперативных событий · TSUE Digital',
    notifMarkAll: 'Прочитано',
    notifTabAll: 'Все',
    notifTabUnread: 'Непрочитанные',
    notifTabRequests: 'Заявки тьюторов',
    notifEmpty: 'Нет уведомлений в этой категории',
    notifTypeRequest: 'Заявка тьютора',
    notifTypeSystem: 'Система',
    notifGoToRequest: 'Перейти к заявке',
    notifFooterBtn: 'Перейти в панель управления системой'
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
    topAuthLogin: 'Kirish',
    topAuthCabinet: 'Shaxsiy Kabinet',

    navHome: 'Bosh sahifa (Umumiy)',
    navLeadership: 'Fakultet rahbariyati',
    navDepartments: 'Kafedralar',
    navDirections: 'Ta‘lim yo‘nalishlari',
    navForum: 'Fakultet Forumi',
    navHistory: 'Tarix va Innovatsiyalar',
    navTutors: 'Tyutorlar',
    navReception: 'Rahbariyat qabuli',

    breadHome: 'Bosh sahifa',
    breadFaculties: 'Fakultetlar',
    breadDefault: 'Raqamli iqtisodiyot fakulteti',
    breadLeadership: 'Fakultet rahbariyati',
    breadDepartments: 'Fakultet kafedralari',
    breadDirections: 'Ta‘lim yo‘nalishlari',
    breadTutors: 'Tyutorlar otdeli',
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
    homeLeadSub: 'Fakultet rahbariyati va akademik rivojlanish koordinatori',
    btnViewAllLeaders: 'Barcha tarkibni ko‘rish',

    leaderDean: 'FAKULTET DEKANI',
    leaderInstitution: 'TDIU • Raqamli iqtisodiyot fakulteti',

    tabLeadTitle: 'Fakultet rahbariyati',
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
    footerPhone: '+998 71 239-01-29 (Fakultet qabulxonasi)',
    footerFaculty: 'Fakultet',
    footerPortals: 'Universitet portallari',
    footerRatings: 'Reytinglar va maqom',
    footerOverview: 'Fakultet sharhi',
    footerLeadership: 'Fakultet rahbariyati',
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

    receptionAlert: "Fakultet rahbariyati rasmiy qabul soatlari:\nDushanba — Juma: 14:00 - 17:00\nQabul uchun telefon: +998 71 239-01-29\nElektron pochta: nodir.akbarov@tsue.uz",

    schedTitle: 'Dars jadvali',
    schedSubtitle: 'AT-31/25r guruhi o\'quv jadvali',
    schedHeaderTitle: 'Dars Jadvali Moduli',
    schedHeaderSub: 'Raqamli Iqtisodiyot Fakulteti · TDIU',
    schedGroupLabel: 'O\'quv guruhi',
    schedOptCustom: '— Yangi guruh —',
    schedWeekTypeLabel: 'Hafta turi',
    schedOptOdd: 'Toq hafta',
    schedOptEven: 'Juft hafta',
    schedMetaSemesterKey: 'Semestr:',
    schedSemesterVal: 'I semestr 2025–2026',
    schedMetaDeptKey: 'Kafedra:',
    schedMetaDeptVal: 'Iqtisodiyotda axborot texnologiyalari',
    schedMetaFormKey: 'Ta\'lim shakli:',
    schedMetaFormVal: 'Kunduzgi',
    schedMetaLangKey: 'Ta\'lim tili:',
    schedMetaLangVal: 'Rus tili',
    schedWeekOdd: 'Toq hafta',
    schedWeekEven: 'Juft hafta',
    schedBothWeeks: 'Ikkala hafta',
    schedGroup1: '1-kichik guruh',
    schedGroup2: '2-kichik guruh',
    schedBtnAddLesson: 'Dars qo\'shish',
    schedBtnClearDay: 'Kuni tozalash',
    schedBtnExportPDF: 'PDF yuklab olish',
    schedViewBtnExportPDF: 'Jadvalni PDF yuklab olish',
    schedBtnSave: 'Saqlash',
    schedModalTitle: 'Dars qo\'shish',
    schedSubjectLabel: 'Fan nomi',
    schedTeacherLabel: 'O\'qituvchi',
    schedRoomLabel: 'Xona',
    schedTypeLabel: 'Dars turi',
    schedWeekLabel: 'Hafta turi',
    schedDayLabel: 'Hafta kuni',
    schedSlotLabel: 'Para (№)',
    schedBtnSaveLesson: 'Saqlash',
    schedBtnDelete: 'O\'chirish',
    schedBtnCancel: 'Bekor qilish',
    schedEmpty: 'Dars rejalashtirilmagan',
    schedCellAddHint: '+ Qo\'shish',
    schedPdfTitle: 'Dars jadvali — AT-31/25r',
    schedPdfWeekOdd: 'Toq hafta',
    schedPdfWeekEven: 'Juft hafta',
    schedDays: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
    schedTypes: {
      lecture: 'Ma\'ruza',
      practice: 'Amaliyot',
      lab: 'Laborat.',
      seminar: 'Seminar'
    },
    schedAlertSubject: 'Fan nomini kiriting.',
    schedPromptClearDay: 'Qaysi kun jadvalini tozalamoqchisiz?',
    schedPromptInvalidNum: 'Noto\'g\'ri raqam kiritildi.',
    schedConfirmClearDay: 'Jadvalni tozalash',

    loginTitle: 'Tizimga kirish',
    loginSubtitle: 'Raqamli Iqtisodiyot Fakulteti · TDIU',
    loginUserLabel: 'Foydalanuvchi nomi (Login)',
    loginUserPlaceholder: 'Foydalanuvchi nomini kiriting',
    loginPassLabel: 'Parol',
    loginPassPlaceholder: 'Parolni kiriting',
    loginSubmitBtn: 'Tizimga kirish',
    loginErrorEmpty: 'Iltimos, foydalanuvchi nomi va parolni kiriting.',
    loginErrorWrong: 'Noto\'g\'ri login yoki parol. Ma\'lumotlarni tekshiring yoki yuqoridagi hisoblardan birini tanlang.',
    loginNote: 'Faqat fakultet vakolatli xodimlari va administratorlarga ruxsat beriladi.<br>Talabalar mustaqil ro\'yxatdan o\'tishi vaqtincha to\'xtatilgan.',

    cabTitle: 'Shaxsiy Kabinet',
    cabAccessBadge: 'Vakolatli kirish',
    cabGuestTitle: 'Shaxsiy Kabinet',
    cabGuestDesc: 'Fakultet xodimining shaxsiy kabinetiga kirish uchun tizimga kiring. Bu yerda siz profilingizni boshqarishingiz, akademik ko\'rsatkichlarni kuzatishingiz va kafedra bilan aloqada bo\'lishingiz mumkin.',
    cabGuestLoginBtn: 'Tizimga kirish',
    cabAccessActive: 'Kirish faol',
    cabLogout: 'Chiqish',
    cabActionSchedule: 'Dars jadvali',
    cabActionScheduleDesc: 'AT-31/25r guruhi o\'quv jadvalini ko\'rish va tahrirlash',
    cabActionSystem: 'Raqamli tizim',
    cabActionSystemDesc: 'Administrativ panel: hisobotlar, kontingent, guruhlarni boshqarish',
    cabActionDekan: 'Fakultet rahbariyati',
    cabActionDekanDesc: 'Fakultet rahbariyati kontaktlari va qabul soatlari',
    cabActionExport: 'Hisobotni eksport qilish',
    cabActionExportDesc: 'Guruh akademik hisobotini PDF ko\'rinishida shakllantirish',
    cabInfoGroup: 'O\'quv guruhi',
    cabInfoGroupVal: 'AT-31/25r · Yo\'nalish: Raqamli iqtisodiyot',
    cabInfoYear: 'O\'quv yili',
    cabInfoYearVal: '2025–2026, I semestr',
    cabInfoFaculty: 'Fakultet',
    cabInfoFacultyVal: 'Raqamli Iqtisodiyot Fakulteti — TDIU',
    cabInfoStudents: 'Talabalar soni',
    cabInfoStudentsVal: '25 kishi · 1-kichik guruh: 13 kishi · 2-kichik guruh: 12 kishi',

    sysBadge: 'Yagona raqamli infratuzilma',
    sysTitle: 'Raqamli Iqtisodiyot Fakultetining Axborot Tizimi',
    sysDesc: 'TDIU markazlashtirilgan ekotizimi: HEMIS universitet reyestri bilan integratsiya, o\'quv oqimlarini boshqarish, akademik jadval konstruktori, elektron qaydnomalar va talabalar verifikatsiyasi.',
    sysFeatHemisTitle: 'HEMIS bilan integratsiya',
    sysFeatHemisSub: 'Talabalar kontingenti, reyting ballari va fanlarni real vaqt rejimida sinxronlashtirish.',
    sysFeatSchedTitle: 'Jadval konstruktori',
    sysFeatSchedSub: 'Auditoriya fondini tezkor taqsimlash, hafta turlarini o\'zgartirish va jadvalni tezkor eksport qilish.',
    sysFeatDbTitle: 'Fakultet ma\'lumotlar bazasi',
    sysFeatDbSub: 'Ta\'lim yo\'nalishlari tahlili, kuratorlik profillari va akademik o\'zlashtirish hisobi.',
    sysFeatVedomTitle: 'Elektron hisobotlar',
    sysFeatVedomSub: 'Imtihon va sinov qaydnomalarini fakultet rahbariyati raqamli tasdig\'i bilan shakllantirish.',
    sysLoginBtn: 'Tizimga kirish',
    sysOpenSched: 'Dars jadvalini ochish',
    sysSchedBuilder: 'Jadval konstruktori',
    sysBtnLogout: 'Chiqish',
    sysAccessVerified: 'Kirish tasdiqlangan',
    sysMetricSubgroups: 'Kichik guruhlarga bo\'linish',
    sysMetricSubgroupsVal: '2 kichik guruh',
    sysMetricSubgroupsNote: '1-kichik guruh (1–13) · 2-kichik guruh (14–25)',
    sysMetricGroup: 'Faol guruh',
    sysMetricGroupNote: '25 talaba · Raqamli iqtisodiyot',
    sysMetricSemester: 'O\'quv semestri',
    sysMetricSemesterVal: 'I (2025–2026)',
    sysMetricSemesterNote: 'Jadval shakllantirilgan',
    sysMetricGpa: 'Guruh o\'rtacha reytingi',
    sysMetricGpaNote: 'Talabalar sinov kontingenti',
    sysTableTitle: 'AT-31/25r guruhi kontingenti (Kichik guruhlar bo\'yicha taqsimot)',
    sysExportBtn: 'Hisobotni eksport qilish (PDF)',
    sysThNum: '№',
    sysThHemis: 'HEMIS ID',
    sysThName: 'Talaba F.I.Sh.',
    sysThSubgroup: 'Kichik guruh',
    sysThType: 'Ta\'lim shakli',
    sysThGpa: 'Reyting (GPA)',
    sysThAttend: 'Davomat',
    sysThStatus: 'Holat',
    sysSubgroup1: '1-kichik guruh',
    sysSubgroup2: '2-kichik guruh',
    sysTypeGrant: 'Davlat granti',
    sysTypeContract: 'To\'lov-kontrakt',
    sysStatusStudying: 'O\'qimoqda',
    sysStatusHead1: 'Guruh sardori (1-k/g)',
    sysStatusHead2: 'Sardor o\'rinbosari (2-k/g)',
    sysManageSched: 'Jadvalni boshqarish',
    sysManageSchedDesc: 'Toq va juft haftalarga dars joylashtirish, xona va o\'qituvchilarni almashtirish.',
    sysGoBtn: 'O\'tish',
    sysExamTitle: 'Imtihon qaydnomalari',
    sysExamDesc: 'Fakultet rahbariyati uchun oraliq va yakuniy nazorat protokollarini shakllantirish.',
    sysGenerateBtn: 'Shakllantirish',
    sysRoleSuperAdmin: 'Super-administrator',
    sysRoleDeanHead: 'Fakultet rahbari',
    sysRoleAdmin: 'Administrator',
    sysRoleStaff: 'Xodim',
    sysCuratorGroup: 'Guruh kuratori: AT-31/25r',
    sysAllDirections: 'Fakultetning barcha yo\'nalishlari',

    pdfSchedUnivTitle: 'TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI',
    pdfSchedFacultyTitle: 'RAQAMLI IQTISODIYOT FAKULTETI · O\'QUV MASHG\'ULOTLARI JADVALI',
    pdfSchedGroup: 'GURUH',
    pdfSchedSemester: 'I semestr 2025–2026',
    pdfSchedTimeTh: 'Vaqt',
    pdfSchedFooterLeft: 'TDIU o\'quv jarayonining rasmiy dars jadvali · Shakllantirildi:',
    pdfSchedFooterRight: 'TDIU Raqamli Iqtisodiyot Fakulteti Rahbariyati',
    pdfSchedFileName: 'Dars_jadvali',

    pdfVedomUnivTitle: 'TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI',
    pdfVedomFacultyTitle: 'RAQAMLI IQTISODIYOT FAKULTETI · AKADEMIK HISOBOT',
    pdfVedomGroupLabel: 'O\'quv guruhi: AT-31/25r (Raqamli iqtisodiyot)',
    pdfVedomSemesterLabel: 'Semestr: I semestr (2025–2026)',
    pdfVedomExportDate: 'Yuklab olingan sana:',
    pdfVedomThNum: '№',
    pdfVedomThHemis: 'HEMIS ID',
    pdfVedomThName: 'Talaba F.I.Sh.',
    pdfVedomThSubgroup: 'Kichik guruh',
    pdfVedomThType: 'Shakl',
    pdfVedomThGpa: 'GPA',
    pdfVedomThAttend: 'Davomat',
    pdfVedomThStatus: 'Holat',
    pdfVedomSignCurator: 'Guruh kuratori imzosi: ________________',
    pdfVedomSignDean: 'Raqamli Iqtisodiyot Fakulteti Dekani: ________________',
    pdfVedomFileName: 'Qaydnomasi_AT-31-25r.pdf',

    // --- Bildirishnomalar ---
    notifBtnLabel: 'Bildirishnomalar',
    notifDrawerTitle: 'BILDIRISHNOMALAR',
    notifDrawerSubtitle: 'Operativ voqealar tizimi · TSUE Digital',
    notifMarkAll: 'O\'qildi',
    notifTabAll: 'Barchasi',
    notifTabUnread: 'O\'qilmagan',
    notifTabRequests: 'Tyutor arizalari',
    notifEmpty: 'Bu bo\'limda bildirishnomalar yo\'q',
    notifTypeRequest: 'Tyutor arizasi',
    notifTypeSystem: 'Tizim',
    notifGoToRequest: 'Arizaga o\'tish',
    notifFooterBtn: 'Tizim boshqaruv paneliga o\'tish'
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
    topAuthLogin: 'Log In',
    topAuthCabinet: 'Cabinet',

    navHome: 'Home (Overview)',
    navLeadership: 'Faculty Leadership',
    navDepartments: 'Departments',
    navDirections: 'Study Programs',
    navForum: 'Faculty Forum',
    navHistory: 'History & Innovations',
    navReception: 'Leadership Reception',

    breadHome: 'Home',
    breadFaculties: 'Faculties',
    breadDefault: 'Faculty of Digital Economy',
    breadLeadership: 'Faculty Leadership',
    breadDepartments: 'Faculty Departments',
    breadDirections: 'Study Programs',
    breadTutors: 'Tutors Department',
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
    homeLeadSub: 'Faculty Leadership & Academic Development Coordinators',
    btnViewAllLeaders: 'View All Leadership',

    leaderDean: 'DEAN OF THE FACULTY',
    leaderInstitution: 'TSUE • Faculty of Digital Economy',

    tabLeadTitle: 'Faculty Leadership',
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
    footerPhone: '+998 71 239-01-29 (Faculty Office)',
    footerFaculty: 'Faculty',
    footerPortals: 'University Portals',
    footerRatings: 'Rankings & Status',
    footerOverview: 'Faculty Overview',
    footerLeadership: 'Faculty Leadership',
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

    receptionAlert: "Official Faculty Leadership Reception Hours:\nMonday — Friday: 14:00 - 17:00\nPhone appointment: +998 71 239-01-29\nEmail: nodir.akbarov@tsue.uz",

    schedTitle: 'Class Timetable',
    schedSubtitle: 'AT-31/25r Group Academic Schedule',
    schedHeaderTitle: 'Timetable Module',
    schedHeaderSub: 'Faculty of Digital Economy · TSUE',
    schedGroupLabel: 'Study Group',
    schedOptCustom: '— New Group —',
    schedWeekTypeLabel: 'Week Type',
    schedOptOdd: 'Odd Week',
    schedOptEven: 'Even Week',
    schedMetaSemesterKey: 'Semester:',
    schedSemesterVal: 'Semester I 2025–2026',
    schedMetaDeptKey: 'Department:',
    schedMetaDeptVal: 'Information Technologies in Economics',
    schedMetaFormKey: 'Study Mode:',
    schedMetaFormVal: 'Full-time',
    schedMetaLangKey: 'Language of Study:',
    schedMetaLangVal: 'Russian',
    schedWeekOdd: 'Odd Week',
    schedWeekEven: 'Even Week',
    schedBothWeeks: 'Both Weeks',
    schedGroup1: 'Subgroup 1',
    schedGroup2: 'Subgroup 2',
    schedBtnAddLesson: 'Add Lesson',
    schedBtnClearDay: 'Clear Day',
    schedBtnExportPDF: 'Download PDF',
    schedViewBtnExportPDF: 'Download Timetable PDF',
    schedBtnSave: 'Save',
    schedModalTitle: 'Add Lesson',
    schedSubjectLabel: 'Subject',
    schedTeacherLabel: 'Instructor',
    schedRoomLabel: 'Room',
    schedTypeLabel: 'Lesson Type',
    schedWeekLabel: 'Week Type',
    schedDayLabel: 'Day of Week',
    schedSlotLabel: 'Slot (No.)',
    schedBtnSaveLesson: 'Save',
    schedBtnDelete: 'Delete',
    schedBtnCancel: 'Cancel',
    schedEmpty: 'No lesson scheduled',
    schedCellAddHint: '+ Add',
    schedPdfTitle: 'Class Timetable — AT-31/25r',
    schedPdfWeekOdd: 'Odd Week',
    schedPdfWeekEven: 'Even Week',
    schedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    schedTypes: {
      lecture: 'Lecture',
      practice: 'Practice',
      lab: 'Lab',
      seminar: 'Seminar'
    },
    schedAlertSubject: 'Please specify the subject name.',
    schedPromptClearDay: 'Which day\'s schedule would you like to clear?',
    schedPromptInvalidNum: 'Invalid day number.',
    schedConfirmClearDay: 'Clear schedule for',

    loginTitle: 'Sign In',
    loginSubtitle: 'Faculty of Digital Economy · TSUE',
    loginUserLabel: 'Username (Login)',
    loginUserPlaceholder: 'Enter your username',
    loginPassLabel: 'Password',
    loginPassPlaceholder: 'Enter your password',
    loginSubmitBtn: 'Sign In to System',
    loginErrorEmpty: 'Please enter your username and password.',
    loginErrorWrong: 'Invalid username or password. Please verify credentials or select an account above.',
    loginNote: 'Access is restricted to authorized faculty staff and administrators.<br>Student self-registration is temporarily disabled.',

    cabTitle: 'Personal Cabinet',
    cabAccessBadge: 'Authorized Access',
    cabGuestTitle: 'Personal Cabinet',
    cabGuestDesc: 'Sign in to access your personal faculty cabinet. Manage your profile, monitor academic performance indicators, and interact with the faculty department.',
    cabGuestLoginBtn: 'Sign In to System',
    cabAccessActive: 'Access Active',
    cabLogout: 'Sign Out',
    cabActionSchedule: 'Class Timetable',
    cabActionScheduleDesc: 'View and edit the academic schedule for group AT-31/25r',
    cabActionSystem: 'Digital System',
    cabActionSystemDesc: 'Admin panel: records, student roster, group management',
    cabActionDekan: 'Faculty Leadership',
    cabActionDekanDesc: 'Faculty leadership contacts and reception hours',
    cabActionExport: 'Export Records',
    cabActionExportDesc: 'Generate and download the group academic record sheet as PDF',
    cabInfoGroup: 'Study Group',
    cabInfoGroupVal: 'AT-31/25r · Program: Digital Economy',
    cabInfoYear: 'Academic Year',
    cabInfoYearVal: '2025–2026, Semester I',
    cabInfoFaculty: 'Faculty',
    cabInfoFacultyVal: 'Faculty of Digital Economy — TSUE (TDIU)',
    cabInfoStudents: 'Student Count',
    cabInfoStudentsVal: '25 students · Subgroup 1: 13 · Subgroup 2: 12',

    sysBadge: 'Unified Digital Infrastructure',
    sysTitle: 'Faculty of Digital Economy Information System',
    sysDesc: 'TSUE centralized ecosystem: integration with HEMIS university registry, study stream management, academic timetable builder, electronic grade books, and student verification.',
    sysFeatHemisTitle: 'Integration with HEMIS',
    sysFeatHemisSub: 'Real-time synchronization of student roster, GPA ratings, and course curriculums.',
    sysFeatSchedTitle: 'Timetable Builder',
    sysFeatSchedSub: 'Fast room allocation, week-type alternation, and instantaneous timetable export.',
    sysFeatDbTitle: 'Faculty Database',
    sysFeatDbSub: 'Specialty analytics, curator profile dossiers, and academic progress tracking.',
    sysFeatVedomTitle: 'Electronic Records',
    sysFeatVedomSub: 'Generation of midterm and final exam protocols with official faculty digital verification.',
    sysLoginBtn: 'Sign In to System',
    sysOpenSched: 'Open Class Timetable',
    sysSchedBuilder: 'Schedule Builder',
    sysBtnLogout: 'Sign Out',
    sysAccessVerified: 'Access Verified',
    sysMetricSubgroups: 'Subgroup Division',
    sysMetricSubgroupsVal: '2 subgroups',
    sysMetricSubgroupsNote: 'Subgroup 1 (1–13) · Subgroup 2 (14–25)',
    sysMetricGroup: 'Active Group',
    sysMetricGroupNote: '25 students · Digital Economy',
    sysMetricSemester: 'Academic Semester',
    sysMetricSemesterVal: 'I (2025–2026)',
    sysMetricSemesterNote: 'Timetable configured',
    sysMetricGpa: 'Group Average GPA',
    sysMetricGpaNote: 'Test student contingent',
    sysTableTitle: 'AT-31/25r Group Student Roster (Subgroup Division)',
    sysExportBtn: 'Export Records (PDF)',
    sysThNum: 'No.',
    sysThHemis: 'HEMIS ID',
    sysThName: 'Student Full Name',
    sysThSubgroup: 'Subgroup',
    sysThType: 'Enrolment Type',
    sysThGpa: 'GPA',
    sysThAttend: 'Attendance',
    sysThStatus: 'Status',
    sysSubgroup1: 'Subgroup 1',
    sysSubgroup2: 'Subgroup 2',
    sysTypeGrant: 'State Grant',
    sysTypeContract: 'Contract',
    sysStatusStudying: 'Enrolled',
    sysStatusHead1: 'Head Student (Subgr. 1)',
    sysStatusHead2: 'Deputy Head (Subgr. 2)',
    sysManageSched: 'Schedule Management',
    sysManageSchedDesc: 'Edit lessons for odd/even weeks, swap rooms and instructors.',
    sysGoBtn: 'Go',
    sysExamTitle: 'Examination Records',
    sysExamDesc: 'Generate midterm and final assessment protocols for faculty leadership.',
    sysGenerateBtn: 'Generate',
    sysRoleSuperAdmin: 'Super-Administrator',
    sysRoleDeanHead: 'Faculty Leader',
    sysRoleAdmin: 'Administrator',
    sysRoleStaff: 'Staff Member',
    sysCuratorGroup: 'Group Curator: AT-31/25r',
    sysAllDirections: 'All Faculty Study Programs',

    pdfSchedUnivTitle: 'TASHKENT STATE UNIVERSITY OF ECONOMICS',
    pdfSchedFacultyTitle: 'FACULTY OF DIGITAL ECONOMY · ACADEMIC TIMETABLE',
    pdfSchedGroup: 'GROUP',
    pdfSchedSemester: 'Semester I 2025–2026',
    pdfSchedTimeTh: 'Time',
    pdfSchedFooterLeft: 'Official academic schedule of TSUE · Generated:',
    pdfSchedFooterRight: 'Leadership, Faculty of Digital Economy TSUE',
    pdfSchedFileName: 'Timetable',

    pdfVedomUnivTitle: 'TASHKENT STATE UNIVERSITY OF ECONOMICS',
    pdfVedomFacultyTitle: 'FACULTY OF DIGITAL ECONOMY · ACADEMIC RECORD SHEET',
    pdfVedomGroupLabel: 'Study Group: AT-31/25r (Digital Economy)',
    pdfVedomSemesterLabel: 'Semester: Semester I (2025–2026)',
    pdfVedomExportDate: 'Export Date:',
    pdfVedomThNum: 'No.',
    pdfVedomThHemis: 'HEMIS ID',
    pdfVedomThName: 'Student Full Name',
    pdfVedomThSubgroup: 'Subgroup',
    pdfVedomThType: 'Mode',
    pdfVedomThGpa: 'GPA',
    pdfVedomThAttend: 'Attend.',
    pdfVedomThStatus: 'Status',
    pdfVedomSignCurator: 'Group Curator Signature: ________________',
    pdfVedomSignDean: 'Dean of Faculty of Digital Economy: ________________',
    pdfVedomFileName: 'Record_Sheet_AT-31-25r.pdf',

    // --- Notifications ---
    notifBtnLabel: 'Notifications',
    notifDrawerTitle: 'NOTIFICATIONS',
    notifDrawerSubtitle: 'Live event system · TSUE Digital',
    notifMarkAll: 'Mark read',
    notifTabAll: 'All',
    notifTabUnread: 'Unread',
    notifTabRequests: 'Tutor requests',
    notifEmpty: 'No notifications in this category',
    notifTypeRequest: 'Tutor request',
    notifTypeSystem: 'System',
    notifGoToRequest: 'View request',
    notifFooterBtn: 'Go to system control panel'
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

  const topAuthBtnText = document.getElementById('topAuthBtnText');
  if (topAuthBtnText) {
    topAuthBtnText.textContent = currentUser ? (t.topAuthCabinet || 'Личный Кабинет') : (t.topAuthLogin || 'Вход');
  }

  const topNotifBtnText = document.getElementById('topNotifBtnText');
  if (topNotifBtnText) topNotifBtnText.textContent = t.notifBtnLabel || 'Уведомления';

  const notifDrawerTitle = document.getElementById('notifDrawerTitle');
  if (notifDrawerTitle) notifDrawerTitle.textContent = t.notifDrawerTitle || 'УВЕДОМЛЕНИЯ';

  const notifDrawerSubtitle = document.getElementById('notifDrawerSubtitle');
  if (notifDrawerSubtitle) notifDrawerSubtitle.textContent = t.notifDrawerSubtitle || 'Система оперативных событий · TSUE Digital';

  const notifDrawerMarkAll = document.getElementById('notifDrawerMarkAll');
  if (notifDrawerMarkAll) notifDrawerMarkAll.innerHTML = `<i class="fa-solid fa-check-double"></i> <span>${t.notifMarkAll || 'Прочитано'}</span>`;

  const ndTabBtns = document.querySelectorAll('.nd-tab-btn');
  const tabLabels = [t.notifTabAll || 'Все', t.notifTabUnread || 'Непрочитанные', t.notifTabRequests || 'Заявки тьюторов'];
  ndTabBtns.forEach((btn, i) => {
    if (tabLabels[i] !== undefined) {
      const filter = btn.dataset.filter;
      if (filter === 'all') btn.innerHTML = `${t.notifTabAll || 'Все'} (<span id="notifCountAll">${document.getElementById('notifCountAll')?.textContent || 0}</span>)`;
      else if (filter === 'unread') btn.innerHTML = `${t.notifTabUnread || 'Непрочитанные'} (<span id="notifCountUnread">${document.getElementById('notifCountUnread')?.textContent || 0}</span>)`;
      else if (filter === 'requests') btn.textContent = t.notifTabRequests || 'Заявки тьюторов';
    }
  });

  if (cachedNotifications.length > 0) renderNotificationsUI();

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
    'fa-solid fa-landmark',
    'fa-solid fa-calendar-days',
    'fa-solid fa-chalkboard-user'
  ];
  const navKeys = [t.navHome, t.navLeadership, t.navDepartments, t.navDirections, t.navHistory, t.topSchedule, t.navTutors || 'Тьюторы'];
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
  updateNewModulesI18n(t);
  renderLeadership(lang);
  renderDepartments(lang);
  renderDirections(lang);
  renderNews(lang);
  renderPartners(lang);
  renderForumTopics(lang);
  renderScheduleGrid();
  if (currentUser) {
    onUserLoggedIn(true);
  }
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

function updateNewModulesI18n(t) {
  const setTxt = (id, text) => {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  };
  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el && html !== undefined) el.innerHTML = html;
  };

  setTxt('schedHeaderTitle', t.schedHeaderTitle);
  setTxt('schedHeaderSub', t.schedHeaderSub);
  setTxt('schedGroupLabel', t.schedGroupLabel);
  setTxt('schedOptCustom', t.schedOptCustom);
  setTxt('schedWeekTypeLabel', t.schedWeekTypeLabel);
  setTxt('schedOptOdd', t.schedOptOdd);
  setTxt('schedOptEven', t.schedOptEven);
  setTxt('schedMetaSemesterKey', t.schedMetaSemesterKey);
  setTxt('schedSemester', t.schedSemesterVal);
  setTxt('schedMetaDeptKey', t.schedMetaDeptKey);
  setTxt('schedMetaDeptVal', t.schedMetaDeptVal);
  setTxt('schedMetaFormKey', t.schedMetaFormKey);
  setTxt('schedMetaFormVal', t.schedMetaFormVal);
  setTxt('schedMetaLangKey', t.schedMetaLangKey);
  setTxt('schedMetaLangVal', t.schedMetaLangVal);

  setTxt('schedBtnAddLesson', t.schedBtnAddLesson);
  setTxt('schedBtnClearDay', t.schedBtnClearDay);
  setTxt('schedBtnExportPDF', t.schedBtnExportPDF);
  setTxt('schedViewBtnExportPDF', t.schedViewBtnExportPDF);

  setTxt('lessonModalTitle', t.schedModalTitle);
  setTxt('lfLabelDay', t.schedDayLabel);
  if (t.schedDays && t.schedDays.length >= 6) {
    setTxt('lfDayOpt0', t.schedDays[0]);
    setTxt('lfDayOpt1', t.schedDays[1]);
    setTxt('lfDayOpt2', t.schedDays[2]);
    setTxt('lfDayOpt3', t.schedDays[3]);
    setTxt('lfDayOpt4', t.schedDays[4]);
    setTxt('lfDayOpt5', t.schedDays[5]);
  }
  setTxt('lfLabelSlot', t.schedSlotLabel);
  setTxt('lfLabelSubject', t.schedSubjectLabel);
  setTxt('lfLabelType', t.schedTypeLabel);
  if (t.schedTypes) {
    setTxt('lfTypeOptLecture', t.schedTypes.lecture);
    setTxt('lfTypeOptPractice', t.schedTypes.practice);
    setTxt('lfTypeOptLab', t.schedTypes.lab);
    setTxt('lfTypeOptSeminar', t.schedTypes.seminar);
  }
  setTxt('lfLabelRoom', t.schedRoomLabel);
  setTxt('lfLabelTeacher', t.schedTeacherLabel);
  setTxt('lfLabelWeek', t.schedWeekLabel);
  setTxt('lfWeekOptBoth', t.schedBothWeeks);
  setTxt('lfWeekOptOdd', t.schedOptOdd);
  setTxt('lfWeekOptEven', t.schedOptEven);
  setTxt('lfBtnCancel', t.schedBtnCancel);
  setTxt('lfBtnSave', t.schedBtnSaveLesson || t.schedBtnSave);

  setHtml('cabGuestBadge', `<i class="fa-solid fa-user-lock"></i> ${t.cabAccessBadge}`);
  setTxt('cabGuestTitle', t.cabGuestTitle);
  setTxt('cabGuestDesc', t.cabGuestDesc);
  setHtml('cabGuestLoginBtn', `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${t.cabGuestLoginBtn}`);
  setHtml('cabAccessActivePill', `<i class="fa-solid fa-circle-check"></i> ${t.cabAccessActive}`);
  setHtml('cabBtnLogout', `<i class="fa-solid fa-right-from-bracket"></i> ${t.cabLogout}`);
  setTxt('cabCardSchedTitle', t.cabActionSchedule);
  setTxt('cabCardSchedDesc', t.cabActionScheduleDesc);
  setTxt('cabCardSysTitle', t.cabActionSystem);
  setTxt('cabCardSysDesc', t.cabActionSystemDesc);
  setTxt('cabCardDekanTitle', t.cabActionDekan);
  setTxt('cabCardDekanDesc', t.cabActionDekanDesc);
  setTxt('cabCardExportTitle', t.cabActionExport);
  setTxt('cabCardExportDesc', t.cabActionExportDesc);
  setTxt('cabLabelGroup', t.cabInfoGroup);
  setTxt('cabValGroup', t.cabInfoGroupVal);
  setTxt('cabLabelYear', t.cabInfoYear);
  setTxt('cabValYear', t.cabInfoYearVal);
  setTxt('cabLabelFaculty', t.cabInfoFaculty);
  setTxt('cabValFaculty', t.cabInfoFacultyVal);
  setTxt('cabLabelStudents', t.cabInfoStudents);
  setTxt('cabValStudents', t.cabInfoStudentsVal);

  setHtml('sysGuestBadge', `<i class="fa-solid fa-shield-halved"></i> ${t.sysBadge}`);
  setTxt('sysGuestTitle', t.sysTitle);
  setTxt('sysGuestDesc', t.sysDesc);
  setTxt('sysFeatHemisTitle', t.sysFeatHemisTitle);
  setTxt('sysFeatHemisSub', t.sysFeatHemisSub);
  setTxt('sysFeatSchedTitle', t.sysFeatSchedTitle);
  setTxt('sysFeatSchedSub', t.sysFeatSchedSub);
  setTxt('sysFeatDbTitle', t.sysFeatDbTitle);
  setTxt('sysFeatDbSub', t.sysFeatDbSub);
  setTxt('sysFeatVedomTitle', t.sysFeatVedomTitle);
  setTxt('sysFeatVedomSub', t.sysFeatVedomSub);
  setHtml('sysGuestLoginBtn', `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${t.sysLoginBtn}`);
  setHtml('sysGuestOpenSchedBtn', `<i class="fa-solid fa-calendar-days"></i> ${t.sysOpenSched}`);
  setHtml('sysAccessVerifiedPill', `<i class="fa-solid fa-circle-check"></i> ${t.sysAccessVerified}`);
  setHtml('sysBtnSchedBuilder', `<i class="fa-solid fa-pen-to-square"></i> ${t.sysSchedBuilder}`);
  setHtml('sysBtnLogout', `<i class="fa-solid fa-right-from-bracket"></i> ${t.sysBtnLogout}`);
  setTxt('sysMetricSubgroupsLabel', t.sysMetricSubgroups);
  setTxt('sysMetricSubgroupsVal', t.sysMetricSubgroupsVal);
  setTxt('sysMetricSubgroupsNote', t.sysMetricSubgroupsNote);
  setTxt('sysMetricGroupLabel', t.sysMetricGroup);
  setTxt('sysMetricGroupNote', t.sysMetricGroupNote);
  setTxt('sysMetricSemesterLabel', t.sysMetricSemester);
  setTxt('sysMetricSemesterVal', t.sysMetricSemesterVal);
  setTxt('sysMetricSemesterNote', t.sysMetricSemesterNote);
  setTxt('sysMetricGpaLabel', t.sysMetricGpa);
  setTxt('sysMetricGpaNote', t.sysMetricGpaNote);
  setHtml('sysCardTitle', `<i class="fa-solid fa-users-viewfinder"></i> ${t.sysTableTitle}`);
  setHtml('sysBtnExportVedom', `<i class="fa-solid fa-file-pdf"></i> ${t.sysExportBtn}`);
  setTxt('sysThNum', t.sysThNum);
  setTxt('sysThName', t.sysThName);
  setTxt('sysThSubgroup', t.sysThSubgroup);
  setTxt('sysThType', t.sysThType);
  setTxt('sysThGpa', t.sysThGpa);
  setTxt('sysThAttend', t.sysThAttend);
  setTxt('sysThStatus', t.sysThStatus);
  setTxt('sqhManageSchedTitle', t.sysManageSched);
  setTxt('sqhManageSchedDesc', t.sysManageSchedDesc);
  setTxt('sqhManageSchedBtn', t.sysGoBtn);
  setTxt('sqhExamTitle', t.sysExamTitle);
  setTxt('sqhExamDesc', t.sysExamDesc);
  setTxt('sqhExamBtn', t.sysGenerateBtn);

  setTxt('loginModalTitle', t.loginTitle);
  setTxt('loginModalSubtitle', t.loginSubtitle);
  setTxt('loginLabelUsername', t.loginUserLabel);
  setTxt('loginLabelPassword', t.loginPassLabel);
  setTxt('loginSubmitBtnText', t.loginSubmitBtn);
  setHtml('loginAuthNote', t.loginNote);

  const uInput = document.getElementById('loginUsername');
  if (uInput && t.loginUserPlaceholder) uInput.placeholder = t.loginUserPlaceholder;
  const pInput = document.getElementById('loginPassword');
  if (pInput && t.loginPassPlaceholder) pInput.placeholder = t.loginPassPlaceholder;
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
    tutors: t.breadTutors || 'Отдел Тьюторов',
    forum: t.breadForum,
    history: t.breadHistory,
    schedule: t.schedTitle || 'Расписание занятий',
    system: t.cabActionSystem || 'Цифровая система',
    cabinet: t.cabTitle || 'Личный Кабинет'
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
  const dotsHtml = LEADERS_DATA.map((_, i) => `<button class="lcc-dot ${i === 0 ? 'active' : ''}" onclick="goToLeader('${containerId}', ${i})" aria-label="Slide ${i + 1}"></button>`).join('');

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

  const topSchedLink = document.getElementById('topScheduleLink');
  if (topSchedLink) {
    if (tabId === 'schedule') {
      topSchedLink.classList.add('active');
    } else {
      topSchedLink.classList.remove('active');
    }
  }

  updateBreadcrumbCurrentTab(currentLang);

  if (window.scrollY > 400) window.scrollTo({ top: 380, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabId}`);

  if (tabId === 'schedule') {
    renderScheduleGrid();
  }
  if (tabId === 'system') {
    renderSystemTab();
    loadTutorRequestsFromSupabase();
  }
  if (tabId === 'tutors') {
    loadTutorsFromSupabase();
  }
  if (tabId === 'starosta') {
    initStarostaModule();
  }
  if (tabId === 'student-reg') {
    initStudentRegModule();
  }

  if (tabId === 'cabinet' && currentUser) {
    const cabinetGuest = document.getElementById('cabinetGuestState');
    const cabinetLogged = document.getElementById('cabinetLoggedState');
    if (cabinetGuest) cabinetGuest.style.display = 'none';
    if (cabinetLogged) cabinetLogged.style.display = 'block';
  }
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

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('tsue_theme', isDark ? 'dark' : 'light');
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

function initApp() {
  const savedTheme = localStorage.getItem('tsue_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  initAccessibility();
  initLangSelector();
  setLanguage(currentLang);
  initScheduleModule();
  checkSavedAuthSession();
  loadTutorsFromSupabase();
  loadNotificationsFromSupabase();

  newsAutoInterval = setInterval(() => rotateNewsWheel(1), 6000);

  const hash = window.location.hash.replace('#', '');
  if (hash && ['home', 'leadership', 'departments', 'directions', 'tutors', 'forum', 'history', 'schedule', 'system', 'cabinet', 'starosta', 'student-reg'].includes(hash)) {
    switchTab(hash);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

const ADMIN_ACCOUNTS = {
  'tsue-monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Куратор группы: АТ-31/25r' },
  'riat-monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Куратор группы: АТ-31/25r' },
  'monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Куратор группы: АТ-31/25r' },
  'tsue-dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'riat-dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'dilrabo': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: АТ-31/25r, ЦЭ-21/24', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' },
  'dilrabo-vahidovna': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: АТ-31/25r, ЦЭ-21/24', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' },
  'tutor-dilrabo': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: АТ-31/25r, ЦЭ-21/24', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' }
};

let currentUser = null;

function fillQuickAuth(username, password) {
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  const err = document.getElementById('loginError');
  if (u) u.value = username;
  if (p) p.value = password;
  if (err) err.textContent = '';
  const btn = document.getElementById('loginSubmitBtn');
  if (btn) btn.focus();
}

function checkSavedAuthSession() {
  try {
    const raw = localStorage.getItem('tsue_auth_user');
    if (raw) {
      currentUser = JSON.parse(raw);
      onUserLoggedIn(true);
    }
  } catch (e) { }
}

function openLoginModal() {
  const overlay = document.getElementById('loginModalOverlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      const u = document.getElementById('loginUsername');
      if (u) u.focus();
    }, 80);

    document.getElementById('loginPassword').onkeydown = (e) => {
      if (e.key === 'Enter') submitLogin();
    };
    document.getElementById('loginUsername').onkeydown = (e) => {
      if (e.key === 'Enter') document.getElementById('loginPassword').focus();
    };
  }
}

function closeLoginModal() {
  const overlay = document.getElementById('loginModalOverlay');
  if (overlay) overlay.classList.remove('active');
  const errEl = document.getElementById('loginError');
  if (errEl) errEl.textContent = '';
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  if (u) u.value = '';
  if (p) p.value = '';
}

function closeLoginModalOnOverlay(e) {
  if (e.target.id === 'loginModalOverlay') closeLoginModal();
}

function submitLogin() {
  const t = i18n[currentLang] || i18n.ru;
  const usernameInput = document.getElementById('loginUsername').value.trim();
  const passwordInput = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');

  if (!usernameInput || !passwordInput) {
    errEl.textContent = t.loginErrorEmpty || 'Пожалуйста, укажите имя пользователя и пароль.';
    return;
  }

  const key = usernameInput.toLowerCase();
  const acc = ADMIN_ACCOUNTS[key];

  if (acc && acc.pass === passwordInput) {
    currentUser = {
      id: acc.id || acc.user,
      username: acc.user,
      name: acc.name,
      role: acc.role,
      group: acc.group,
      email: acc.email || null
    };
    try {
      localStorage.setItem('tsue_auth_user', JSON.stringify(currentUser));
    } catch (e) { }

    closeLoginModal();
    onUserLoggedIn(false);
    return;
  }

  if (window._supabaseClient) {
    errEl.textContent = 'Проверка учетной записи в Supabase...';
    window._supabaseClient
      .from('profiles')
      .select('*')
      .or(`email.ilike.${key},full_name.ilike.%${key}%`)
      .eq('is_active', true)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const profile = data[0];
          currentUser = {
            id: profile.id,
            username: profile.email.split('@')[0],
            name: profile.full_name,
            role: profile.role === 'superadmin' ? 'Супер-администратор' : profile.role === 'admin' ? 'Администратор' : 'Тьютор факультета',
            group: profile.department || 'Тьюторский отдел',
            email: profile.email
          };
          try {
            localStorage.setItem('tsue_auth_user', JSON.stringify(currentUser));
          } catch (e) { }
          closeLoginModal();
          onUserLoggedIn(false);
        } else {
          errEl.textContent = t.loginErrorWrong || 'Неверный логин или пароль. Либо заявка тьютора еще не одобрена администратором.';
          document.getElementById('loginPassword').value = '';
        }
      })
      .catch(() => {
        errEl.textContent = t.loginErrorWrong || 'Ошибка проверки аккаунта.';
      });
  } else {
    errEl.textContent = t.loginErrorWrong || 'Неверный логин или пароль. Проверьте данные.';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginPassword').focus();
  }
}

function handleTopAuthClick() {
  if (currentUser) {
    switchTab('cabinet');
  } else {
    openLoginModal();
  }
}

function logoutUser() {
  currentUser = null;
  try {
    localStorage.removeItem('tsue_auth_user');
  } catch (e) { }
  onUserLoggedOut();
}

function onUserLoggedIn(isRestore = false) {
  if (!currentUser) return;

  const t = i18n[currentLang] || i18n.ru;

  const topAuthBtn = document.getElementById('topAuthBtn');
  const topLogoutBtn = document.getElementById('topLogoutBtn');
  if (topAuthBtn) {
    topAuthBtn.classList.add('top-auth-btn--logged');
    topAuthBtn.innerHTML = `<span id="topAuthBtnText">${t.topAuthCabinet || 'Личный Кабинет'}</span>`;
    topAuthBtn.title = currentUser.name || currentUser.username;
  }

  const rawRole = (currentUser.role || '').toLowerCase();
  const isAdmin = rawRole.includes('админ') || rawRole.includes('руковод') || rawRole.includes('admin') || rawRole.includes('bosh');

  let localizedRole = currentUser.role || t.sysRoleStaff || 'Сотрудник';
  let localizedGroup = currentUser.group || '—';
  if (rawRole.includes('супер') || rawRole.includes('super')) {
    localizedRole = t.sysRoleSuperAdmin || currentUser.role;
    localizedGroup = t.sysCuratorGroup || currentUser.group;
  } else if (rawRole.includes('руковод') || rawRole.includes('dean') || rawRole.includes('rahbar')) {
    localizedRole = t.sysRoleDeanHead || currentUser.role;
    localizedGroup = t.sysAllDirections || currentUser.group;
  }

  const cabinetGuest = document.getElementById('cabinetGuestState');
  const cabinetLogged = document.getElementById('cabinetLoggedState');
  if (cabinetGuest) cabinetGuest.style.display = 'none';
  if (cabinetLogged) cabinetLogged.style.display = 'block';
  const cabUserName = document.getElementById('cabUserName');
  const cabUserRole = document.getElementById('cabUserRole');
  const cabUserGroup = document.getElementById('cabUserGroup');
  const cabSystemCard = document.getElementById('cabSystemCard');
  if (cabUserName) cabUserName.textContent = currentUser.name || currentUser.username;
  if (cabUserRole) cabUserRole.textContent = localizedRole;
  if (cabUserGroup) cabUserGroup.textContent = localizedGroup;
  if (cabSystemCard) cabSystemCard.style.display = isAdmin ? 'block' : 'none';

  const isTutor = rawRole.includes('tutor') || rawRole.includes('тьютор');
  const tutorModule = document.getElementById('tutorCabinetModule');
  if (tutorModule) {
    tutorModule.style.display = isTutor ? 'block' : 'none';
    if (isTutor) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById('tcAttendDate');
      if (dateInput) dateInput.value = today;
      loadTutorStudents();
    }
  }

  const notifWrap = document.getElementById('topNotifWrap');
  if (notifWrap) {
    notifWrap.style.display = isAdmin ? 'inline-flex' : 'none';
    if (isAdmin) loadNotificationsFromSupabase();
  }

  const loginBtn = document.getElementById('navLoginBtn');
  const logoutBtn = document.getElementById('navLogoutBtn');
  const userLabel = document.getElementById('navLoggedUserLabel');
  if (loginBtn) loginBtn.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  if (userLabel) userLabel.textContent = currentUser.username;

  const adminBar = document.getElementById('schedActionBar');
  const viewBar = document.getElementById('schedViewBar');
  if (adminBar) adminBar.style.display = 'flex';
  if (viewBar) viewBar.style.display = 'none';

  document.querySelectorAll('.sched-cell').forEach(c => c.classList.add('is-admin'));

  const guestState = document.getElementById('systemGuestState');
  const loggedState = document.getElementById('systemLoggedState');
  if (guestState) guestState.style.display = 'none';
  if (loggedState) loggedState.style.display = 'flex';

  const uName = document.getElementById('sysUserName');
  const uRole = document.getElementById('sysUserRole');
  const uGroup = document.getElementById('sysUserGroup');
  if (uName) uName.textContent = currentUser.name || currentUser.username;
  if (uRole) uRole.textContent = localizedRole;
  if (uGroup) uGroup.textContent = localizedGroup;

  renderStudentsTable();

  if (!isRestore) {
    switchTab('cabinet');
  } else {
    renderScheduleGrid();
  }
}

function onUserLoggedOut() {
  const t = i18n[currentLang] || i18n.ru;

  const topAuthBtn = document.getElementById('topAuthBtn');
  const topLogoutBtn = document.getElementById('topLogoutBtn');
  const notifWrap = document.getElementById('topNotifWrap');
  if (notifWrap) notifWrap.style.display = 'none';
  const notifDd = document.getElementById('notifDropdown');
  if (notifDd) notifDd.style.display = 'none';
  if (topAuthBtn) {
    topAuthBtn.classList.remove('top-auth-btn--logged');
    topAuthBtn.innerHTML = `<span id="topAuthBtnText">${t.topAuthLogin || 'Вход'}</span>`;
    topAuthBtn.title = 'Авторизация';
  }

  const cabinetGuest = document.getElementById('cabinetGuestState');
  const cabinetLogged = document.getElementById('cabinetLoggedState');
  if (cabinetGuest) cabinetGuest.style.display = 'block';
  if (cabinetLogged) cabinetLogged.style.display = 'none';

  const loginBtn = document.getElementById('navLoginBtn');
  const logoutBtn = document.getElementById('navLogoutBtn');
  if (loginBtn) loginBtn.style.display = 'inline-flex';
  if (logoutBtn) logoutBtn.style.display = 'none';

  const adminBar = document.getElementById('schedActionBar');
  const viewBar = document.getElementById('schedViewBar');
  if (adminBar) adminBar.style.display = 'none';
  if (viewBar) viewBar.style.display = 'flex';

  document.querySelectorAll('.sched-cell').forEach(c => c.classList.remove('is-admin'));

  const guestState = document.getElementById('systemGuestState');
  const loggedState = document.getElementById('systemLoggedState');
  if (guestState) guestState.style.display = 'block';
  if (loggedState) loggedState.style.display = 'none';

  switchTab('home');
}

const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const SLOTS = [
  '08:00–09:20', '09:30–10:50', '11:00–12:20',
  '13:00–14:20', '14:30–15:50', '16:00–17:20',
  '17:30–18:50', '19:00–20:20'
];
const TYPE_LABELS = {
  lecture: 'Лекция', practice: 'Практика',
  lab: 'Лаборат.', seminar: 'Семинар'
};

const DEFAULT_SCHEDULE = {};

let scheduleData = {};
let currentGroup = '';
let currentSearchMode = 'group';
let currentScheduleViewFilter = null;

function syncScheduleGroupsFromDatabase() {
  const allGroups = new Set();
  
  if (typeof starostaAllStudents !== 'undefined' && Array.isArray(starostaAllStudents)) {
    starostaAllStudents.forEach(st => {
      if (st.group_name) allGroups.add(st.group_name);
    });
  }
  if (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) {
    tutorStudents.forEach(st => {
      if (st.group_name) allGroups.add(st.group_name);
    });
  }
  if (typeof starostaLocalGroups !== 'undefined' && Array.isArray(starostaLocalGroups)) {
    starostaLocalGroups.forEach(g => {
      if (g.name) allGroups.add(g.name);
    });
  }

  allGroups.forEach(g => {
    if (!scheduleData[g]) {
      scheduleData[g] = { odd: {}, even: {} };
      for (let d = 0; d < 6; d++) {
        scheduleData[g].odd[d] = {};
        scheduleData[g].even[d] = {};
      }
    }
  });

  const select = document.getElementById('schedGroupSelect');
  if (select) {
    const prevVal = select.value;
    const groupArr = Array.from(allGroups);
    if (groupArr.length > 0) {
      select.innerHTML = groupArr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('') +
        `<option value="custom" id="schedOptCustom">— Редактировать расписание —</option>`;
      if (groupArr.includes(prevVal)) {
        select.value = prevVal;
        currentGroup = prevVal;
      } else {
        select.value = groupArr[0];
        currentGroup = groupArr[0];
      }
    } else {
      select.innerHTML = `<option value="custom" id="schedOptCustom">— Создать / Редактировать расписание —</option>`;
      currentGroup = 'custom';
    }
  }
}

function setScheduleSearchMode(mode) {
  currentSearchMode = mode;
  document.querySelectorAll('.sched-smode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.smode === mode);
  });
  
  const inp = document.getElementById('schedSearchInput');
  if (inp) {
    inp.value = '';
    const placeholders = {
      group: 'Поиск по номеру группы...',
      teacher: 'Поиск по преподавателю...',
      room: 'Поиск по аудитории...',
      student: 'Поиск по Ф.И.О. или HEMIS ID студента...'
    };
    inp.placeholder = placeholders[mode] || 'Поиск по расписанию...';
    inp.focus();
  }
  
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';
}

function onScheduleSearchInput(query) {
  const q = (query || '').trim().toLowerCase();
  const resEl = document.getElementById('schedSearchResults');
  const clearBtn = document.querySelector('.sched-search-clear-btn');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
  if (!resEl) return;

  if (!q) {
    resEl.style.display = 'none';
    currentScheduleViewFilter = null;
    renderScheduleGrid();
    return;
  }

  const results = [];

  if (currentSearchMode === 'group') {
    const allGroups = Object.keys(scheduleData);
    allGroups.forEach(g => {
      if (g.toLowerCase().includes(q)) {
        results.push({ label: `Группа ${g}`, type: 'group', value: g });
      }
    });
  } else if (currentSearchMode === 'teacher') {
    const teachers = new Set();
    Object.values(scheduleData).forEach(gSched => {
      ['odd', 'even'].forEach(w => {
        Object.values(gSched[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(les => {
            if (les.teacher) teachers.add(les.teacher);
          });
        });
      });
    });
    teachers.forEach(t => {
      if (t.toLowerCase().includes(q)) {
        results.push({ label: `Преподаватель: ${t}`, type: 'teacher', value: t });
      }
    });
  } else if (currentSearchMode === 'room') {
    const rooms = new Set();
    Object.values(scheduleData).forEach(gSched => {
      ['odd', 'even'].forEach(w => {
        Object.values(gSched[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(les => {
            if (les.room) rooms.add(les.room);
          });
        });
      });
    });
    rooms.forEach(r => {
      if (r.toLowerCase().includes(q)) {
        results.push({ label: `Аудитория: ${r}`, type: 'room', value: r });
      }
    });
  } else if (currentSearchMode === 'student') {
    const allStudents = (typeof starostaAllStudents !== 'undefined' && starostaAllStudents.length > 0)
      ? starostaAllStudents
      : (typeof tutorStudents !== 'undefined' ? tutorStudents : []);
    
    allStudents.forEach(st => {
      const name = st.full_name || st.student_name || '';
      if (name.toLowerCase().includes(q) || (st.hemis_id && st.hemis_id.includes(q))) {
        results.push({
          label: `Студент: ${name} (${st.group_name || '—'})`,
          type: 'student',
          value: st.group_name,
          studentName: name
        });
      }
    });
  }

  if (results.length === 0) {
    resEl.style.display = 'block';
    resEl.innerHTML = `<div style="padding:6px 12px; color:#94a3b8; font-size:12px;">Ничего не найдено по запросу «${escapeHtml(q)}»</div>`;
    return;
  }

  resEl.style.display = 'flex';
  resEl.innerHTML = results.map(r => `
    <div class="sched-sres-item" onclick="selectScheduleSearchResult('${escapeHtml(r.type)}', '${escapeHtml(r.value)}')">
      ${escapeHtml(r.label)}
    </div>
  `).join('');
}

function selectScheduleSearchResult(type, value) {
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';

  if (type === 'group' || type === 'student') {
    currentScheduleViewFilter = null;
    const groupKey = value.replace('/', '-').replace(' ', '-');
    currentGroup = scheduleData[groupKey] ? groupKey : (scheduleData[value] ? value : value);
    const select = document.getElementById('schedGroupSelect');
    if (select) select.value = currentGroup;
  } else if (type === 'teacher') {
    currentScheduleViewFilter = { type: 'teacher', value: value };
  } else if (type === 'room') {
    currentScheduleViewFilter = { type: 'room', value: value };
  }

  renderScheduleGrid();
}

function clearScheduleSearch() {
  const inp = document.getElementById('schedSearchInput');
  if (inp) inp.value = '';
  const clearBtn = document.querySelector('.sched-search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';
  currentScheduleViewFilter = null;
  renderScheduleGrid();
}

function saveScheduleToStorage() {
  try {
    localStorage.setItem('tsue_schedule_v1', JSON.stringify(scheduleData));
  } catch (e) { }
}
function loadScheduleFromStorage() {
  try {
    const raw = localStorage.getItem('tsue_schedule_v1');
    if (raw) scheduleData = JSON.parse(raw);
  } catch (e) { }
}

function loadGroupSchedule(groupId) {
  currentScheduleViewFilter = null;
  if (groupId === 'custom') {
    currentGroup = 'custom';
    if (!scheduleData['custom']) {
      scheduleData['custom'] = { odd: {}, even: {} };
      for (let d = 0; d < 6; d++) {
        scheduleData['custom'].odd[d] = {};
        scheduleData['custom'].even[d] = {};
      }
    }
  } else {
    currentGroup = groupId;
  }
  renderScheduleGrid();
}

function renderScheduleGrid() {
  const container = document.getElementById('schedGridContainer');
  if (!container) return;

  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const isAdmin = currentUser !== null;
  const dayNames = (t.schedDays && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const typeMap = t.schedTypes || TYPE_LABELS;
  const addHint = t.schedCellAddHint || '+ Добавить';
  const delTitle = t.schedBtnDelete || 'Удалить';

  let html = '<table class="sched-table" id="schedTable">';

  html += '<thead><tr>';
  html += '<th style="width:42px;">№</th>';
  for (const day of dayNames) {
    html += `<th class="sched-th-day">${day}</th>`;
  }
  html += '</tr></thead>';

  html += '<tbody>';
  for (let s = 0; s < 8; s++) {
    html += `<tr>`;
    html += `<td class="sched-td-num">
      <div class="stn">${s + 1}</div>
      <div class="stv">${SLOTS[s]}</div>
    </td>`;
    for (let d = 0; d < 6; d++) {
      let lesson = null;
      if (currentScheduleViewFilter) {
        // Search across all groups
        for (const gKey of Object.keys(scheduleData)) {
          const l = scheduleData[gKey]?.[weekType]?.[d]?.[s];
          if (l) {
            if (currentScheduleViewFilter.type === 'teacher' && l.teacher === currentScheduleViewFilter.value) {
              lesson = { ...l, subject: `${l.subject} (${gKey})` };
              break;
            } else if (currentScheduleViewFilter.type === 'room' && l.room === currentScheduleViewFilter.value) {
              lesson = { ...l, subject: `${l.subject} (${gKey})` };
              break;
            }
          }
        }
      } else {
        const groupData = scheduleData[currentGroup]?.[weekType] || {};
        lesson = groupData[d]?.[s] || null;
      }

      const adminClass = isAdmin ? ' is-admin' : '';
      if (lesson) {
        const typeLabel = typeMap[lesson.type] || lesson.type;
        html += `<td>
          <div class="sched-cell has-lesson${adminClass}" data-day="${d}" data-slot="${s}">
            <div class="lesson-card">
              <span class="lesson-type-badge ltype-${lesson.type}">${typeLabel}</span>
              <div class="lesson-subject">${escapeHtml(lesson.subject)}</div>
              <div class="lesson-teacher">${escapeHtml(lesson.teacher)}</div>
              <div class="lesson-room">${escapeHtml(lesson.room)}</div>
            </div>
            ${isAdmin ? `<button class="lesson-delete-btn" onclick="deleteLesson(${d},${s},event)" title="${delTitle}">×</button>` : ''}
          </div>
        </td>`;
      } else {
        html += `<td>
          <div class="sched-cell${adminClass}" data-day="${d}" data-slot="${s}" ${isAdmin ? `onclick="openAddLessonModal(${d},${s})"` : ''}>
            <div class="sched-cell-empty">
              <span class="sched-cell-add-hint">${addHint}</span>
            </div>
          </div>
        </td>`;
      }
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  container.innerHTML = html;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let _pendingDay = null, _pendingSlot = null;

function openAddLessonModal(day, slot) {
  _pendingDay = (day !== undefined) ? day : null;
  _pendingSlot = (slot !== undefined) ? slot : null;

  if (_pendingDay !== null) {
    document.getElementById('lf-day').value = _pendingDay;
    document.getElementById('lf-slot').value = _pendingSlot;
  }

  document.getElementById('lf-subject').value = '';
  document.getElementById('lf-teacher').value = '';
  document.getElementById('lf-room').value = '';
  document.getElementById('lf-type').value = 'lecture';
  document.getElementById('lf-week').value = 'both';

  document.getElementById('lessonModalOverlay').classList.add('active');
  setTimeout(() => document.getElementById('lf-subject').focus(), 80);
}

function closeLessonModal() {
  document.getElementById('lessonModalOverlay').classList.remove('active');
  _pendingDay = null; _pendingSlot = null;
}

function closeLessonModalOnOverlay(e) {
  if (e.target.id === 'lessonModalOverlay') closeLessonModal();
}

function saveLessonFromModal() {
  const t = i18n[currentLang] || i18n.ru;
  const day = parseInt(document.getElementById('lf-day').value);
  const slot = parseInt(document.getElementById('lf-slot').value);
  const subject = document.getElementById('lf-subject').value.trim();
  const type = document.getElementById('lf-type').value;
  const room = document.getElementById('lf-room').value.trim();
  const teacher = document.getElementById('lf-teacher').value.trim();
  const week = document.getElementById('lf-week').value;

  if (!subject) { alert(t.schedAlertSubject || 'Укажите название дисциплины.'); return; }

  const lesson = { subject, type, teacher: teacher || '—', room: room || '—' };

  const weeks = week === 'both' ? ['odd', 'even'] : [week];
  weeks.forEach(wt => {
    if (!scheduleData[currentGroup]) scheduleData[currentGroup] = { odd: {}, even: {} };
    if (!scheduleData[currentGroup][wt][day]) scheduleData[currentGroup][wt][day] = {};
    scheduleData[currentGroup][wt][day][slot] = lesson;
  });

  saveScheduleToStorage();
  closeLessonModal();
  renderScheduleGrid();
}

function deleteLesson(day, slot, event) {
  event.stopPropagation();
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  if (scheduleData[currentGroup]?.[weekType]?.[day]) {
    delete scheduleData[currentGroup][weekType][day][slot];
    saveScheduleToStorage();
    renderScheduleGrid();
  }
}

function clearDaySchedule() {
  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const dayNames = (t.schedDays && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const promptMsg = `${t.schedPromptClearDay || 'Очистить расписание для какого дня?'}\n${dayNames.map((d, i) => `${i}: ${d}`).join('\n')}\n\n(0-5):`;
  const sel = prompt(promptMsg);
  if (sel === null) return;
  const idx = parseInt(sel);
  if (isNaN(idx) || idx < 0 || idx > 5) { alert(t.schedPromptInvalidNum || 'Неверный номер.'); return; }
  const weekStr = weekType === 'odd' ? (t.schedOptOdd || 'нечётная') : (t.schedOptEven || 'чётная');
  if (!confirm(`${t.schedConfirmClearDay || 'Очистить расписание'}: ${dayNames[idx]} (${weekStr})?`)) return;
  if (scheduleData[currentGroup]?.[weekType]) {
    scheduleData[currentGroup][weekType][idx] = {};
    saveScheduleToStorage();
    renderScheduleGrid();
  }
}

async function exportScheduleToPDF() {
  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const weekLabel = weekType === 'odd' ? (t.schedPdfWeekOdd || 'Нечётная неделя') : (t.schedPdfWeekEven || 'Чётная неделя');
  const groupLabel = currentGroup === 'AT-31-25r' ? 'АТ-31/25r' : currentGroup;
  const groupData = scheduleData[currentGroup]?.[weekType] || {};
  const dayNames = (t.schedDays && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const typeMap = t.schedTypes || TYPE_LABELS;
  const dateLocale = currentLang === 'en' ? 'en-US' : (currentLang === 'uz' ? 'uz-UZ' : 'ru-RU');

  const printEl = document.createElement('div');
  printEl.style.position = 'fixed';
  printEl.style.left = '-9999px';
  printEl.style.top = '0';
  printEl.style.width = '1200px';
  printEl.style.background = '#ffffff';
  printEl.style.color = '#0f172a';
  printEl.style.fontFamily = 'Arial, "Segoe UI", sans-serif';
  printEl.style.padding = '24px 30px';
  printEl.style.boxSizing = 'border-box';
  printEl.style.zIndex = '-9999';

  let tableRows = '';
  for (let s = 0; s < 8; s++) {
    tableRows += `<tr style="border-bottom: 1px solid #cbd5e1; height: 56px;">`;
    tableRows += `<td style="border: 1px solid #cbd5e1; background: #f1f5f9; text-align: center; width: 90px; padding: 4px;">
      <div style="font-size: 14px; font-weight: 800; color: #003875;">${s + 1}</div>
      <div style="font-size: 10px; color: #475569; margin-top: 2px;">${SLOTS[s]}</div>
    </td>`;
    for (let d = 0; d < 6; d++) {
      const lesson = groupData[d]?.[s] || null;
      if (lesson) {
        const typeBg = lesson.type === 'lecture' ? '#dbeafe' : (lesson.type === 'practice' ? '#dcfce7' : (lesson.type === 'lab' ? '#fef9c3' : '#f3e8ff'));
        const typeColor = lesson.type === 'lecture' ? '#1d4ed8' : (lesson.type === 'practice' ? '#166534' : (lesson.type === 'lab' ? '#854d0e' : '#7e22ce'));
        const typeLabel = typeMap[lesson.type] || lesson.type;
        tableRows += `<td style="border: 1px solid #cbd5e1; background: #f8fafc; padding: 6px 8px; vertical-align: top; width: 175px;">
          <div style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; background: ${typeBg}; color: ${typeColor}; text-transform: uppercase; margin-bottom: 4px;">${typeLabel}</div>
          <div style="font-size: 11.5px; font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 2px;">${escHtml(lesson.subject)}</div>
          <div style="font-size: 9.5px; color: #475569; margin-bottom: 2px;">${escHtml(lesson.teacher)}</div>
          <div style="font-size: 9.5px; font-weight: 700; color: #0369a1;">${escHtml(lesson.room)}</div>
        </td>`;
      } else {
        tableRows += `<td style="border: 1px solid #cbd5e1; background: #ffffff; width: 175px;"></td>`;
      }
    }
    tableRows += `</tr>`;
  }

  let dayThs = '';
  for (const day of dayNames) {
    dayThs += `<th style="border: 1px solid #002d62; font-size: 11.5px; text-transform: uppercase;">${day}</th>`;
  }

  printEl.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #003875; padding-bottom: 12px; margin-bottom: 16px;">
      <div>
        <div style="font-size: 18px; font-weight: 800; color: #002d62;">${t.pdfSchedUnivTitle || 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ'}</div>
        <div style="font-size: 13px; font-weight: 700; color: #004899; margin-top: 3px;">${t.pdfSchedFacultyTitle || 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · РАСПИСАНИЕ УЧЕБНЫХ ЗАНЯТИЙ'}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 800; color: #002d62;">${t.pdfSchedGroup || 'ГРУППА'} ${groupLabel}</div>
        <div style="font-size: 12px; font-weight: 600; color: #475569;">${weekLabel} · ${t.pdfSchedSemester || 'I семестр 2025–2026'}</div>
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background: #002d62; color: #ffffff; height: 34px;">
          <th style="border: 1px solid #002d62; font-size: 11.5px; text-transform: uppercase; width: 90px;">${t.pdfSchedTimeTh || 'Время'}</th>
          ${dayThs}
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 10.5px; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 10px;">
      <div>${t.pdfSchedFooterLeft || 'Официальное расписание учебного процесса ТГЭУ · Сформировано:'} ${new Date().toLocaleDateString(dateLocale)}</div>
      <div>${t.pdfSchedFooterRight || 'Руководство Факультета Цифровой Экономики ТГЭУ'}</div>
    </div>
  `;

  document.body.appendChild(printEl);

  try {
    const canvas = await html2canvas(printEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const { jsPDF } = window.jspdf || window;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, Math.min(pdfH, pdf.internal.pageSize.getHeight()));
    const fnPrefix = t.pdfSchedFileName || 'Schedule';
    pdf.save(`${fnPrefix}_${groupLabel.replace(/\//g, '-')}_${weekLabel.replace(/ /g, '_')}.pdf`);
  } catch (err) {
    console.error('PDF error:', err);
    window.print();
  } finally {
    printEl.remove();
  }
}

function renderStudentsTable() {
  const tbody = document.getElementById('sysStudentsTableBody');
  if (!tbody) return;

  const list = (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) ? tutorStudents : [];
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:#94a3b8; font-style:italic;">Нет данных. Студенты появятся здесь после загрузки через кабинет тьютора.</td></tr>';
    return;
  }

  let html = '';
  list.forEach((st, idx) => {
    const subgroup = st.subgroup ? `${escapeHtml(st.subgroup)}-п/г` : '—';
    html += `<tr>
      <td style="font-weight:700; color:#64748b;">${idx + 1}</td>
      <td style="color:#94a3b8; font-weight:600; text-align:center; font-family:monospace;">${escapeHtml(st.hemis_id || '—')}</td>
      <td style="font-weight:700; color:#0f172a;">${escapeHtml(st.full_name || '—')}</td>
      <td><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:11.5px; font-weight:700; background:#e0f2fe; color:#0369a1;">${escapeHtml(st.group_name || '—')}</span></td>
      <td style="text-align:center; font-weight:700; color:#0369a1;">${subgroup}</td>
      <td style="color:#475569;">${escapeHtml(st.phone || '—')}</td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

function renderSystemTab() {
  if (currentUser) {
    const guestState = document.getElementById('systemGuestState');
    const loggedState = document.getElementById('systemLoggedState');
    if (guestState) guestState.style.display = 'none';
    if (loggedState) loggedState.style.display = 'flex';
    renderStudentsTable();
  } else {
    const guestState = document.getElementById('systemGuestState');
    const loggedState = document.getElementById('systemLoggedState');
    if (guestState) guestState.style.display = 'block';
    if (loggedState) loggedState.style.display = 'none';
  }
}

async function exportStudentsListPDF() {
  const t = i18n[currentLang] || i18n.ru;
  const dateLocale = currentLang === 'en' ? 'en-US' : (currentLang === 'uz' ? 'uz-UZ' : 'ru-RU');

  const printEl = document.createElement('div');
  printEl.style.position = 'fixed';
  printEl.style.left = '-9999px';
  printEl.style.top = '0';
  printEl.style.width = '920px';
  printEl.style.background = '#ffffff';
  printEl.style.color = '#0f172a';
  printEl.style.fontFamily = 'Arial, "Segoe UI", sans-serif';
  printEl.style.padding = '28px 36px';
  printEl.style.boxSizing = 'border-box';
  printEl.style.zIndex = '-9999';

  const studentList = (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) ? tutorStudents : [];
  let rows = '';
  studentList.forEach((st, idx) => {
    const bg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const subgroup = st.subgroup ? `${st.subgroup}-подгруппа` : '—';
    rows += `
      <tr style="background: ${bg}; border-bottom: 1px solid #cbd5e1; height: 28px;">
        <td style="border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #64748b; font-size: 11px; padding: 4px;">${idx + 1}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; color: #334155; font-size: 11px; font-family:monospace; padding: 4px;">${escapeHtml(st.hemis_id || '—')}</td>
        <td style="border: 1px solid #cbd5e1; font-weight: bold; color: #0f172a; font-size: 12px; padding: 4px 10px;">${escapeHtml(st.full_name || '—')}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; font-size: 11px; font-weight: bold; color: #0369a1; padding: 4px;">${escapeHtml(st.group_name || '—')}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; font-size: 11px; font-weight: bold; color: #0369a1; padding: 4px;">${escapeHtml(subgroup)}</td>
        <td style="border: 1px solid #cbd5e1; font-size: 11px; color: #334155; padding: 4px;">${escapeHtml(st.phone || '—')}</td>
      </tr>
    `;
  });

  printEl.innerHTML = `
    <div style="border-bottom: 3px solid #003875; padding-bottom: 12px; margin-bottom: 14px;">
      <div style="font-size: 17px; font-weight: 800; color: #002d62; text-align: center;">${t.pdfVedomUnivTitle || 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ'}</div>
      <div style="font-size: 13px; font-weight: 700; color: #004899; text-align: center; margin-top: 3px;">${t.pdfVedomFacultyTitle || 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · АКАДЕМИЧЕСКАЯ ВЕДОМОСТЬ'}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 11.5px; font-weight: 600; color: #334155;">
        <div>${t.pdfVedomGroupLabel || 'Учебная группа: АТ-31/25r (Цифровая экономика)'}</div>
        <div>${t.pdfVedomSemesterLabel || 'Семестр: I семестр (2025–2026)'}</div>
        <div><strong>${t.pdfVedomExportDate || 'Дата выгрузки:'}</strong> ${new Date().toLocaleDateString(dateLocale)}</div>
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background: #002d62; color: #ffffff; height: 30px;">
          <th style="border: 1px solid #002d62; font-size: 11px; width: 35px;">${t.pdfVedomThNum || '№'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 70px;">${t.pdfVedomThHemis || 'HEMIS ID'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; text-align: left; padding-left: 10px;">${t.pdfVedomThName || 'Ф.И.О. Студента'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 105px;">${t.pdfVedomThSubgroup || 'Подгруппа'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 75px;">${t.pdfVedomThType || 'Форма'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 60px;">${t.pdfVedomThGpa || 'GPA'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 65px;">${t.pdfVedomThAttend || 'Посещ.'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 140px;">${t.pdfVedomThStatus || 'Статус'}</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 22px; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; padding-top: 12px;">
      <div>${t.pdfVedomSignCurator || 'Подпись куратора группы: ________________'}</div>
      <div>${t.pdfVedomSignDean || 'Декан Факультета Цифровой Экономики: ________________'}</div>
    </div>
  `;

  document.body.appendChild(printEl);

  try {
    const canvas = await html2canvas(printEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const { jsPDF } = window.jspdf || window;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, Math.min(pdfH, pdf.internal.pageSize.getHeight()));
    const fn = t.pdfVedomFileName || 'Academic_Roster_AT-31-25r.pdf';
    pdf.save(fn);
  } catch (err) {
    console.error('PDF error:', err);
    window.print();
  } finally {
    printEl.remove();
  }
}

function initScheduleModule() {
  loadScheduleFromStorage();
  syncScheduleGroupsFromDatabase();
  renderScheduleGrid();
}

const SUPABASE_URL = 'https://qngiieztqecrkywnstom.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZ2lpZXp0cWVjcmt5d25zdG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMjQ4OTcsImV4cCI6MjEwNTgwMDg5N30.xogkvq8w0dgYbIt9gzMGE9BLpxxPBSgtge9wQOwmuOk';

let supabaseClient = null;
try {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window._supabaseClient = supabaseClient;
  }
} catch (e) {
  console.error('Supabase initialization failed:', e);
}

let cachedTutors = [];
let cachedNotifications = [];

function openTutorRegModal() {
  const modal = document.getElementById('tutorRegModalOverlay');
  if (modal) {
    modal.classList.add('active');
    const err = document.getElementById('tutorRegError');
    if (err) err.textContent = '';
  }
}

function closeTutorRegModal() {
  const modal = document.getElementById('tutorRegModalOverlay');
  if (modal) modal.classList.remove('active');
}

function closeTutorRegModalOnOverlay(e) {
  if (e.target.id === 'tutorRegModalOverlay') closeTutorRegModal();
}

async function submitTutorRegistration() {
  const fullName = document.getElementById('tutorRegFullName').value.trim();
  const email = document.getElementById('tutorRegEmail').value.trim();
  const phone = document.getElementById('tutorRegPhone').value.trim();
  const dept = document.getElementById('tutorRegDept').value;
  const bio = document.getElementById('tutorRegBio').value.trim();
  const motivation = document.getElementById('tutorRegMotivation').value.trim();
  const errEl = document.getElementById('tutorRegError');
  const submitBtn = document.getElementById('tutorRegSubmitBtn');

  if (!fullName || !email || !phone) {
    if (errEl) errEl.textContent = 'Пожалуйста, заполните все обязательные поля: Ф.И.О., Email и Телефон.';
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Отправка заявки...';
  }

  try {
    if (!supabaseClient) throw new Error('Supabase клиент недоступен');

    const { data, error } = await supabaseClient
      .from('tutor_registration_requests')
      .insert([
        {
          full_name: fullName,
          email: email,
          phone: phone,
          department: dept,
          bio: bio,
          motivation: motivation,
          status: 'pending'
        }
      ])
      .select();

    if (error) throw error;

    alert('Заявка на статус тьютора успешно отправлена! Администрация факультета рассмотрит ее в ближайшее время.');
    closeTutorRegModal();

    document.getElementById('tutorRegFullName').value = '';
    document.getElementById('tutorRegEmail').value = '';
    document.getElementById('tutorRegPhone').value = '';
    document.getElementById('tutorRegBio').value = '';
    document.getElementById('tutorRegMotivation').value = '';

    loadNotificationsFromSupabase();
    loadTutorRequestsFromSupabase();
  } catch (err) {
    console.error('Registration request error:', err);
    if (errEl) errEl.textContent = 'Ошибка отправки заявки: ' + (err.message || 'Сбой соединения');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span id="tutorRegSubmitBtnText">Отправить заявку на рассмотрение</span>';
    }
  }
}

async function loadTutorsFromSupabase() {
  const grid = document.getElementById('tutorsGrid');
  if (!grid) return;

  grid.innerHTML = '<div class="tutors-loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i> Синхронизация с реестром Supabase...</div>';

  try {
    if (!supabaseClient) throw new Error('Supabase клиент не инициализирован');

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('role', 'tutor')
      .eq('is_active', true)
      .order('full_name', { ascending: true });

    const constTutor = {
      id: 'tutor-dilrabo-vahidovna',
      full_name: 'Dilrabo Vahidovna',
      role: 'tutor',
      department: 'Информационные технологии в экономике',
      bio: 'Старший тьютор-наставник академических групп факультета, содействие в адаптации студентов, мониторинг посещаемости и учебной дисциплины.',
      phone: '+998 90 998-11-22',
      email: 'dilrabo.vahidovna@tsue.uz',
      is_active: true
    };

    let list = data || [];
    if (!list.some(t => (t.full_name || '').toLowerCase().includes('dilrabo'))) {
      list = [constTutor, ...list];
    }

    cachedTutors = list;
    renderTutorsCards(cachedTutors);
    const countEl = document.getElementById('statTutorsCount');
    if (countEl) countEl.textContent = cachedTutors.length;
  } catch (err) {
    console.warn('Ошибка загрузки тьюторов:', err);
    cachedTutors = [{
      id: 'tutor-dilrabo-vahidovna',
      full_name: 'Dilrabo Vahidovna',
      role: 'tutor',
      department: 'Информационные технологии в экономике',
      bio: 'Старший тьютор-наставник академических групп факультета, содействие в адаптации студентов, мониторинг посещаемости и учебной дисциплины.',
      phone: '+998 90 998-11-22',
      email: 'dilrabo.vahidovna@tsue.uz',
      is_active: true
    }];
    renderTutorsCards(cachedTutors);
    const countEl = document.getElementById('statTutorsCount');
    if (countEl) countEl.textContent = cachedTutors.length;
  }
}


function renderTutorsCards(tutorsList) {
  const grid = document.getElementById('tutorsGrid');
  if (!grid) return;

  if (tutorsList.length === 0) {
    grid.innerHTML = '<div class="tutors-loading-state">Тьюторы по заданному критерию не найдены.</div>';
    return;
  }

  grid.innerHTML = tutorsList.map(tutor => {
    const initials = tutor.full_name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();

    return `
      <div class="tutor-card">
        <div class="tutor-card-head">
          <div class="tutor-avatar">${initials || '<i class="fa-solid fa-user"></i>'}</div>
          <div class="tutor-meta">
            <div class="tutor-name">${tutor.full_name}</div>
            <span class="tutor-role-pill">Академический Тьютор</span>
            <div class="tutor-dept"><i class="fa-solid fa-building-columns"></i> ${tutor.department || 'Факультет Цифровой Экономики'}</div>
          </div>
        </div>
        <div class="tutor-bio">
          ${tutor.bio || 'Куратор академических групп факультета, содействие в образовательном процессе и проектной деятельности.'}
        </div>
        <div class="tutor-contacts">
          ${tutor.phone ? `
            <a href="tel:${tutor.phone.replace(/[^0-9+]/g, '')}" class="tutor-contact-link">
              <i class="fa-solid fa-phone"></i> ${tutor.phone}
            </a>
          ` : ''}
          ${tutor.email ? `
            <a href="mailto:${tutor.email}" class="tutor-contact-link">
              <i class="fa-solid fa-envelope"></i> ${tutor.email}
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function filterTutorsList() {
  const query = (document.getElementById('tutorSearchInput')?.value || '').toLowerCase().trim();
  if (!query) {
    renderTutorsCards(cachedTutors);
    return;
  }
  const filtered = cachedTutors.filter(t =>
    (t.full_name || '').toLowerCase().includes(query) ||
    (t.department || '').toLowerCase().includes(query) ||
    (t.bio || '').toLowerCase().includes(query) ||
    (t.email || '').toLowerCase().includes(query)
  );
  renderTutorsCards(filtered);
}

async function loadNotificationsFromSupabase() {
  if (!supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) throw error;

    cachedNotifications = data || [];
    renderNotificationsUI();
  } catch (err) {
    console.error('Failed to load notifications:', err);
  }
}

let currentNotifFilter = 'all';

function renderNotificationsUI(filter) {
  if (filter !== undefined) currentNotifFilter = filter;
  const t = i18n[currentLang] || i18n.ru;
  const badge = document.getElementById('topNotifBadge');
  const unreadCount = cachedNotifications.filter(n => !n.is_read).length;
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  const cntAll = document.getElementById('notifCountAll');
  const cntUnread = document.getElementById('notifCountUnread');
  if (cntAll) cntAll.textContent = cachedNotifications.length;
  if (cntUnread) cntUnread.textContent = unreadCount;

  const list = document.getElementById('notifDrawerList');
  if (!list) return;

  let items = cachedNotifications;
  if (currentNotifFilter === 'unread') items = items.filter(n => !n.is_read);
  if (currentNotifFilter === 'requests') items = items.filter(n => n.type === 'tutor_registration_request');

  if (items.length === 0) {
    list.innerHTML = `<div class="notif-empty">
      <i class="fa-regular fa-bell-slash" style="font-size:32px;display:block;margin-bottom:12px;color:#94a3b8;"></i>
      <span>${t.notifEmpty || 'Нет уведомлений в этой категории'}</span>
    </div>`;
    return;
  }

  list.innerHTML = items.map(n => {
    const timeAgo = formatTimeAgo(new Date(n.created_at));
    const unreadCls = !n.is_read ? 'unread' : '';
    const isTutorReq = n.type === 'tutor_registration_request';
    const typeBadgeClass = isTutorReq ? 'nd-item-type-badge--request' : '';
    const typeLabel = isTutorReq ? (t.notifTypeRequest || 'Заявка тьютора') : (t.notifTypeSystem || 'Система');
    const goToLabel = t.notifGoToRequest || 'Перейти к заявке';
    return `
      <div class="nd-item ${unreadCls}" onclick="handleNotificationClick('${n.id}')">
        <div class="nd-item-top">
          <div class="nd-item-title">${n.title}</div>
          <div class="nd-item-time"><i class="fa-regular fa-clock"></i> ${timeAgo}</div>
        </div>
        <div class="nd-item-body">${n.body || ''}</div>
        <div class="nd-item-action-row">
          <span class="nd-item-type-badge ${typeBadgeClass}">${typeLabel}</span>
          ${isTutorReq ? `<span class="nd-item-link-btn"><i class="fa-solid fa-arrow-right"></i> ${goToLabel}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleNotificationsMenu(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('notifDrawerPanel');
  const backdrop = document.getElementById('notifDrawerBackdrop');
  if (!panel) return;
  const isOpen = panel.classList.contains('active');
  if (isOpen) {
    closeNotificationsDrawer();
  } else {
    panel.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadNotificationsFromSupabase();
  }
}

function closeNotificationsDrawer() {
  const panel = document.getElementById('notifDrawerPanel');
  const backdrop = document.getElementById('notifDrawerBackdrop');
  if (panel) panel.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function filterNotifications(filter) {
  currentNotifFilter = filter;
  // Update active tab button
  document.querySelectorAll('.nd-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderNotificationsUI(filter);
}

async function markAllNotificationsRead() {
  if (!supabaseClient || cachedNotifications.length === 0) return;
  try {
    await supabaseClient
      .from('notifications')
      .update({ is_read: true })
      .eq('is_read', false);
    cachedNotifications.forEach(n => n.is_read = true);
    renderNotificationsUI();
  } catch (e) {
    console.error('Error marking notifications as read:', e);
  }
}

async function handleNotificationClick(notifId) {
  const notif = cachedNotifications.find(n => n.id === notifId);
  if (!notif) return;

  if (!notif.is_read && supabaseClient) {
    await supabaseClient
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notifId);
    notif.is_read = true;
    renderNotificationsUI();
  }

  if (notif.type === 'tutor_registration_request') {
    closeNotificationsDrawer();
    switchTab('system');
    loadTutorRequestsFromSupabase();
  }
}

async function loadTutorRequestsFromSupabase() {
  const tbody = document.getElementById('sysTutorRequestsTableBody');
  const badge = document.getElementById('sysPendingReqBadge');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 24px; color:#888;"><i class="fa-solid fa-circle-notch fa-spin"></i> Загрузка заявок...</td></tr>';

  try {
    if (!supabaseClient) throw new Error('Supabase клиент недоступен');

    const { data, error } = await supabaseClient
      .from('tutor_registration_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const pendingCount = (data || []).filter(r => r.status === 'pending').length;
    if (badge) {
      badge.textContent = `${pendingCount} на рассмотрении`;
      badge.className = pendingCount > 0 ? 'sys-meta-pill sys-meta-pill--warning' : 'sys-meta-pill';
    }

    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 24px; color:#888;">Заявок на регистрацию пока нет.</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(req => {
      const dateStr = new Date(req.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      let statusBadge = '<span class="tutor-status-badge tutor-status-badge--pending">Ожидает</span>';
      if (req.status === 'approved') statusBadge = '<span class="tutor-status-badge tutor-status-badge--approved">Одобрено</span>';
      if (req.status === 'rejected') statusBadge = '<span class="tutor-status-badge tutor-status-badge--rejected">Отклонено</span>';

      const actions = req.status === 'pending' ? `
        <div style="display:flex; gap:6px;">
          <button class="sched-btn sched-btn--primary" style="padding:4px 10px; font-size:11px;" onclick="approveTutorRequest('${req.id}')" title="Одобрить заявку">
            <i class="fa-solid fa-check"></i> Принять
          </button>
          <button class="sched-btn sched-btn--danger" style="padding:4px 10px; font-size:11px;" onclick="rejectTutorRequest('${req.id}')" title="Отклонить">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      ` : `<span style="font-size:12px; color:#888;">Обработано</span>`;

      return `
        <tr>
          <td style="font-size:11px; color:#64748b; white-space:nowrap;">${dateStr}</td>
          <td><strong>${req.full_name}</strong><br><small style="color:#64748b;">${req.bio || ''}</small></td>
          <td><a href="mailto:${req.email}">${req.email}</a></td>
          <td style="white-space:nowrap;">${req.phone || '—'}</td>
          <td>${req.department || '—'}</td>
          <td>${statusBadge}</td>
          <td>${actions}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load tutor requests:', err);
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color:#ef4444;">Ошибка загрузки: ${err.message}</td></tr>`;
  }
}

async function approveTutorRequest(requestId) {
  if (!confirm('Одобрить заявку и зарегистрировать пользователя в качестве тьютора факультета?')) return;

  try {
    if (!supabaseClient) throw new Error('Supabase клиент недоступен');

    const { data, error } = await supabaseClient.rpc('approve_tutor_request', {
      req_id: requestId,
      admin_id: currentUser?.id || null
    });

    if (error) throw error;

    alert('Заявка успешно одобрена! Пользователь добавлен в активный реестр тьюторов.');
    loadTutorRequestsFromSupabase();
    loadTutorsFromSupabase();
    loadNotificationsFromSupabase();
  } catch (err) {
    console.error('Approve error:', err);
    alert('Ошибка при одобрении заявки: ' + err.message);
  }
}

async function rejectTutorRequest(requestId) {
  const reason = prompt('Укажите причину отклонения (опционально):', 'Несоответствие академическим требованиям');
  if (reason === null) return;

  try {
    if (!supabaseClient) throw new Error('Supabase клиент недоступен');

    const { data, error } = await supabaseClient.rpc('reject_tutor_request', {
      req_id: requestId,
      comment_text: reason,
      admin_id: currentUser?.id || null
    });

    if (error) throw error;

    alert('Заявка отклонена.');
    loadTutorRequestsFromSupabase();
  } catch (err) {
    console.error('Reject error:', err);
    alert('Ошибка при отклонении: ' + err.message);
  }
}

function formatTimeAgo(date) {
  const sec = Math.floor((new Date() - date) / 1000);
  if (sec < 60) return 'только что';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин. назад`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ч. назад`;
  const days = Math.floor(hr / 24);
  return `${days} дн. назад`;
}

let tutorStudents = [];
let currentAttendanceDate = new Date().toISOString().split('T')[0];
let currentAttendanceMap = {};

function switchTutorTab(tabName) {
  document.querySelectorAll('.tc-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tcTab === tabName);
  });
  document.querySelectorAll('.tc-tab-panel').forEach(panel => {
    panel.style.display = 'none';
  });
  const activePanel = document.getElementById(`tcTab-${tabName}`);
  if (activePanel) activePanel.style.display = 'block';

  if (tabName === 'attendance') {
    const dateInput = document.getElementById('tcAttendDate');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    loadAttendanceForDate(dateInput ? dateInput.value : currentAttendanceDate);
  } else if (tabName === 'stats') {
    loadAttendanceStats();
  }
}

async function loadTutorStudents() {
  if (!currentUser) return;
  const tutorId = currentUser.id;

  try {
    if (window._supabaseClient && tutorId) {
      const { data, error } = await window._supabaseClient
        .from('tutor_students')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        const filtered = String(tutorId).includes('dilrabo')
          ? data.filter(st => !st.tutor_id || String(st.tutor_id).includes('dilrabo') || st.tutor_id === 'default')
          : data.filter(st => st.tutor_id === tutorId);

        const localList = loadLocalTutorStudents(tutorId);
        const map = new Map();
        filtered.forEach(st => {
          const key = (st.full_name || st.student_name || '').trim().toLowerCase() + '_' + (st.group_name || '').trim();
          map.set(key, { ...st, full_name: st.full_name || st.student_name || '—' });
        });
        localList.forEach(st => {
          const key = (st.full_name || st.student_name || '').trim().toLowerCase() + '_' + (st.group_name || '').trim();
          if (!map.has(key)) {
            map.set(key, { ...st, full_name: st.full_name || st.student_name || '—' });
          }
        });
        tutorStudents = Array.from(map.values());
      } else {
        tutorStudents = loadLocalTutorStudents(tutorId);
        if (tutorStudents.length > 0) {
          syncLocalStudentsToSupabase(tutorId, tutorStudents);
        }
      }
    } else {
      tutorStudents = loadLocalTutorStudents(tutorId || 'default');
    }
  } catch (e) {
    tutorStudents = loadLocalTutorStudents(tutorId || 'default');
  }

  // Merge any self-registered students into Dilrabo's view
  if (tutorId && String(tutorId).includes('dilrabo')) {
    try {
      const selfReg = JSON.parse(localStorage.getItem('tsue_self_registered_students') || '[]');
      if (Array.isArray(selfReg) && selfReg.length > 0) {
        const existingKeys = new Set(tutorStudents.map(st => (st.full_name || st.student_name || '').trim().toLowerCase() + '_' + (st.group_name || '').trim()));
        selfReg.forEach(st => {
          const key = (st.full_name || st.student_name || '').trim().toLowerCase() + '_' + (st.group_name || '').trim();
          if (!existingKeys.has(key)) {
            tutorStudents.push({ ...st, full_name: st.full_name || st.student_name || '—' });
            existingKeys.add(key);
          }
        });
      }
    } catch (e) { }
  }

  renderRegistryList();
  updateRegistryStats();
}

async function syncLocalStudentsToSupabase(tutorId, list) {
  if (!window._supabaseClient || !tutorId || tutorId === 'default') return;
  try {
    const payload = list.map(st => ({
      tutor_id: tutorId,
      full_name: st.full_name,
      student_name: st.full_name,
      group_name: st.group_name || '',
      subgroup: st.subgroup || '1',
      hemis_id: st.hemis_id || '',
      phone: st.phone || '',
      email: st.email || '',
      notes: st.notes || ''
    }));
    await window._supabaseClient.from('tutor_students').insert(payload);
  } catch (e) {
    console.warn('Sync local students warning:', e);
  }
}

function loadLocalTutorStudents(tutorId) {
  try {
    const raw = localStorage.getItem(`tsue_tutor_students_${tutorId}`);
    if (raw) return JSON.parse(raw);
    if (String(tutorId).includes('dilrabo')) {
      const initialStudents = [
        { id: 'st_dil_1', full_name: 'Абдуллаев Жасур Бахтиёрович', group_name: 'АТ-31/25r', subgroup: '1', hemis_id: '394210041', phone: '+998 90 111-22-33', email: 'j.abdullaev@tsue.uz', tutor_id: tutorId },
        { id: 'st_dil_2', full_name: 'Каримова Мадина Рустамовна', group_name: 'АТ-31/25r', subgroup: '1', hemis_id: '394210042', phone: '+998 93 222-33-44', email: 'm.karimova@tsue.uz', tutor_id: tutorId },
        { id: 'st_dil_3', full_name: 'Рахимов Сардор Олимович', group_name: 'АТ-31/25r', subgroup: '2', hemis_id: '394210043', phone: '+998 97 333-44-55', email: 's.rahimov@tsue.uz', tutor_id: tutorId },
        { id: 'st_dil_4', full_name: 'Умарова Нигора Илхомовна', group_name: 'ЦЭ-21/24', subgroup: '1', hemis_id: '394210088', phone: '+998 94 444-55-66', email: 'n.umarova@tsue.uz', tutor_id: tutorId },
        { id: 'st_dil_5', full_name: 'Юсупов Ботир Шавкатович', group_name: 'ЦЭ-21/24', subgroup: '2', hemis_id: '394210089', phone: '+998 99 555-66-77', email: 'b.yusupov@tsue.uz', tutor_id: tutorId }
      ];
      localStorage.setItem(`tsue_tutor_students_${tutorId}`, JSON.stringify(initialStudents));
      return initialStudents;
    }
    return [];
  } catch (e) {
    return [];
  }
}

function saveLocalTutorStudents(tutorId, list) {
  try {
    localStorage.setItem(`tsue_tutor_students_${tutorId}`, JSON.stringify(list));
  } catch (e) { }
}

function renderRegistryList(list = tutorStudents) {
  const container = document.getElementById('tcRegistryList');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="tc-empty-state">
        <i class="fa-solid fa-users-slash"></i>
        <p>Реестр пуст. Добавьте студентов вручную или импортируйте список из Excel/CSV файла.</p>
        <small>Формат Excel/CSV: ФИО, Группа, Подгруппа, Телефон, Email, HEMIS ID</small>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <table class="tc-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ф.И.О. Студента</th>
          <th>Группа</th>
          <th>Подгруппа</th>
          <th>HEMIS ID</th>
          <th>Контакты</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((st, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${escapeHtml(st.full_name || '—')}</strong></td>
            <td><span class="tc-badge-grp">${escapeHtml(st.group_name || '—')}</span></td>
            <td>${st.subgroup ? `${escapeHtml(st.subgroup)}-п/г` : '—'}</td>
            <td><code>${escapeHtml(st.hemis_id || '—')}</code></td>
            <td>
              ${st.phone ? `<a href="tel:${escapeHtml(st.phone)}" class="tc-contact-icon" title="${escapeHtml(st.phone)}"><i class="fa-solid fa-phone"></i></a> ` : ''}
              ${st.email ? `<a href="mailto:${escapeHtml(st.email)}" class="tc-contact-icon" title="${escapeHtml(st.email)}"><i class="fa-solid fa-envelope"></i></a>` : ''}
              ${!st.phone && !st.email ? '—' : ''}
            </td>
            <td>
              <button class="tc-action-btn" title="Редактировать" onclick="openEditStudentModal('${st.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="tc-action-btn tc-action-btn--del" title="Удалить" onclick="deleteStudent('${st.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function updateRegistryStats() {
  const totalEl = document.getElementById('tcStatTotal');
  const groupsEl = document.getElementById('tcStatGroups');
  if (totalEl) totalEl.textContent = tutorStudents.length;
  if (groupsEl) {
    const groups = new Set(tutorStudents.map(s => s.group_name).filter(Boolean));
    groupsEl.textContent = groups.size > 0 ? Array.from(groups).join(', ') : '—';
  }
}

function filterRegistryList() {
  const query = (document.getElementById('tcStudentSearch')?.value || '').trim().toLowerCase();
  if (!query) {
    renderRegistryList(tutorStudents);
    return;
  }
  const filtered = tutorStudents.filter(st => {
    return (st.full_name || '').toLowerCase().includes(query) ||
      (st.group_name || '').toLowerCase().includes(query) ||
      (st.hemis_id || '').toLowerCase().includes(query) ||
      (st.phone || '').toLowerCase().includes(query);
  });
  renderRegistryList(filtered);
}

function openAddStudentModal() {
  document.getElementById('editStudentId').value = '';
  document.getElementById('studentNameInput').value = '';
  document.getElementById('studentGroupInput').value = '';
  document.getElementById('studentSubgroupInput').value = '';
  document.getElementById('studentHemisInput').value = '';
  document.getElementById('studentPhoneInput').value = '';
  document.getElementById('studentEmailInput').value = '';
  document.getElementById('studentNotesInput').value = '';
  const errEl = document.getElementById('addStudentError');
  if (errEl) errEl.style.display = 'none';

  const overlay = document.getElementById('addStudentModalOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function openEditStudentModal(studentId) {
  const st = tutorStudents.find(s => String(s.id) === String(studentId));
  if (!st) return;

  document.getElementById('editStudentId').value = st.id;
  document.getElementById('studentNameInput').value = st.full_name || '';
  document.getElementById('studentGroupInput').value = st.group_name || '';
  document.getElementById('studentSubgroupInput').value = st.subgroup || '';
  document.getElementById('studentHemisInput').value = st.hemis_id || '';
  document.getElementById('studentPhoneInput').value = st.phone || '';
  document.getElementById('studentEmailInput').value = st.email || '';
  document.getElementById('studentNotesInput').value = st.notes || '';
  const errEl = document.getElementById('addStudentError');
  if (errEl) errEl.style.display = 'none';

  const overlay = document.getElementById('addStudentModalOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function closeAddStudentModal() {
  const overlay = document.getElementById('addStudentModalOverlay');
  if (overlay) overlay.style.display = 'none';
}

function closeAddStudentModalOnOverlay(e) {
  if (e.target.id === 'addStudentModalOverlay') {
    closeAddStudentModal();
  }
}

async function saveStudent() {
  const tutorId = currentUser?.id || 'default';
  const editId = document.getElementById('editStudentId').value;
  const fullName = (document.getElementById('studentNameInput').value || '').trim();
  const group = (document.getElementById('studentGroupInput').value || '').trim();
  const subgroup = (document.getElementById('studentSubgroupInput').value || '').trim();
  const hemis = (document.getElementById('studentHemisInput').value || '').trim();
  const phone = (document.getElementById('studentPhoneInput').value || '').trim();
  const email = (document.getElementById('studentEmailInput').value || '').trim();
  const notes = (document.getElementById('studentNotesInput').value || '').trim();

  const errEl = document.getElementById('addStudentError');
  if (!fullName) {
    if (errEl) {
      errEl.textContent = 'Пожалуйста, введите Ф.И.О. студента.';
      errEl.style.display = 'block';
    }
    return;
  }

  const studentObj = {
    full_name: fullName,
    student_name: fullName,
    group_name: group,
    subgroup: subgroup || '1',
    hemis_id: hemis,
    phone: phone,
    email: email,
    notes: notes,
    tutor_id: tutorId
  };

  try {
    if (window._supabaseClient && tutorId && tutorId !== 'default') {
      if (editId) {
        const { error } = await window._supabaseClient
          .from('tutor_students')
          .update(studentObj)
          .eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await window._supabaseClient
          .from('tutor_students')
          .insert([studentObj]);
        if (error) throw error;
      }
    } else {
      // Local fallback
      if (editId) {
        const idx = tutorStudents.findIndex(s => String(s.id) === String(editId));
        if (idx !== -1) tutorStudents[idx] = { ...tutorStudents[idx], ...studentObj };
      } else {
        studentObj.id = 'loc_' + Date.now();
        tutorStudents.push(studentObj);
      }
      saveLocalTutorStudents(tutorId, tutorStudents);
    }
    closeAddStudentModal();
    await loadTutorStudents();
  } catch (err) {
    console.error('Error saving student:', err);
    if (errEl) {
      errEl.textContent = 'Ошибка сохранения: ' + (err.message || 'Сбой сети');
      errEl.style.display = 'block';
    }
  }
}

async function deleteStudent(studentId) {
  if (!confirm('Вы уверены, что хотите удалить этого студента из реестра?')) return;
  const tutorId = currentUser?.id || 'default';

  try {
    if (window._supabaseClient && tutorId && tutorId !== 'default' && !String(studentId).startsWith('loc_')) {
      const { error } = await window._supabaseClient
        .from('tutor_students')
        .delete()
        .eq('id', studentId);
      if (error) throw error;
    } else {
      tutorStudents = tutorStudents.filter(s => String(s.id) !== String(studentId));
      saveLocalTutorStudents(tutorId, tutorStudents);
    }
    await loadTutorStudents();
  } catch (err) {
    alert('Ошибка при удалении: ' + (err.message || 'Сбой сети'));
  }
}

function importStudentsFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      if (typeof XLSX === 'undefined') {
        alert('Библиотека Excel еще загружается, попробуйте через пару секунд.');
        return;
      }
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      if (!rows || rows.length === 0) {
        alert('Файл пуст или имеет неверный формат.');
        return;
      }

      // Detect header row or faculty davomati sheet structure
      // e.g. Sheet with title "TDIU Raqamli iqtisodiyot..." or columns [№, FISH, Tel, ...]
      let headerRowIdx = -1;
      let colIdxName = 0;
      let colIdxGroup = -1;
      let colIdxSubgroup = -1;
      let colIdxPhone = -1;
      let colIdxEmail = -1;
      let colIdxHemis = -1;

      // Extract group name from sheet name or text in first few rows if available
      let detectedGroup = firstSheetName && firstSheetName.length < 15 && !firstSheetName.toLowerCase().includes('sheet') ? firstSheetName : '';

      for (let r = 0; r < Math.min(rows.length, 10); r++) {
        const row = rows[r];
        if (!row) continue;
        const rowStr = row.map(c => String(c || '')).join(' ').toLowerCase();

        // Check if group code is present in header text, e.g. "2-kurs talabalari", "AT-31/25r"
        if (!detectedGroup) {
          const grpMatch = rowStr.match(/([a-zа-я]{2,4}[-\s]?\d{1,2}\/\d{2,4}[a-zа-я]?)/i);
          if (grpMatch) detectedGroup = grpMatch[1].toUpperCase();
        }

        for (let c = 0; c < row.length; c++) {
          const val = String(row[c] || '').trim().toLowerCase();
          if (val === 'fish' || val === 'ф.и.о.' || val === 'фио' || val === 'fio' || val.includes('фамилия') || val.includes('имя студента')) {
            headerRowIdx = r;
            colIdxName = c;
          }
          if (val === 'tel' || val.includes('телефон') || val.includes('phone') || val.includes('nomer')) {
            colIdxPhone = c;
          }
          if (val === 'guruh' || val.includes('группа') || val.includes('group')) {
            colIdxGroup = c;
          }
          if (val.includes('подгруппа') || val.includes('subgroup')) {
            colIdxSubgroup = c;
          }
          if (val.includes('hemis') || val.includes('id')) {
            colIdxHemis = c;
          }
          if (val.includes('email') || val.includes('почта')) {
            colIdxEmail = c;
          }
        }
        if (headerRowIdx !== -1) break;
      }

      // Default start row if no explicit header found
      const startRow = headerRowIdx !== -1 ? headerRowIdx + 1 : 0;
      const imported = [];
      const tutorId = currentUser?.id || 'default';

      for (let i = startRow; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0) continue;

        let fullName = '';
        if (colIdxName >= 0 && row[colIdxName]) {
          fullName = String(row[colIdxName]).trim();
        } else {
          // Find first text cell that looks like a name (contains space and letters, not a number)
          for (let c = 0; c < Math.min(row.length, 5); c++) {
            const v = String(row[c] || '').trim();
            if (v && isNaN(v) && v.length > 5 && (v.includes(' ') || v.length > 8)) {
              fullName = v;
              break;
            }
          }
        }

        if (!fullName || fullName.length < 3) continue;
        // Skip subheaders or non-name rows
        const lowerName = fullName.toLowerCase();
        if (lowerName.includes('fish') || lowerName.includes('фио') || lowerName.includes('fakulteti') || lowerName.includes('davomati')) continue;

        let phone = colIdxPhone >= 0 && row[colIdxPhone] ? String(row[colIdxPhone]).trim() : '';
        // Look for phone in row if not found by column
        if (!phone) {
          for (let c = 0; c < row.length; c++) {
            const v = String(row[c] || '').trim().replace(/[\s\-\(\)]/g, '');
            if (/^\+?\d{7,13}$/.test(v)) {
              phone = String(row[c]).trim();
              break;
            }
          }
        }

        let groupName = colIdxGroup >= 0 && row[colIdxGroup] ? String(row[colIdxGroup]).trim() : detectedGroup;
        if (!groupName) groupName = currentUser?.group?.split(':')?.[1]?.trim() || 'АТ-31/25r';

        // Auto split subgroups: first 13 students in group get subgroup 1, next get subgroup 2
        const groupCount = imported.filter(st => st.group_name === groupName).length;
        const autoSubgroup = (groupCount % 26) < 13 ? '1' : '2';

        imported.push({
          full_name: fullName,
          student_name: fullName,
          group_name: groupName,
          subgroup: (colIdxSubgroup >= 0 && row[colIdxSubgroup]) ? String(row[colIdxSubgroup]).trim() : autoSubgroup,
          phone: phone,
          email: colIdxEmail >= 0 && row[colIdxEmail] ? String(row[colIdxEmail]).trim() : '',
          hemis_id: colIdxHemis >= 0 && row[colIdxHemis] ? String(row[colIdxHemis]).trim() : '',
          tutor_id: tutorId
        });
      }

      if (imported.length === 0) {
        alert('Не найдено записей для импорта. Убедитесь, что в файле есть колонка FISH или Ф.И.О.');
        return;
      }

      if (window._supabaseClient && tutorId && tutorId !== 'default') {
        const { error } = await window._supabaseClient
          .from('tutor_students')
          .insert(imported);
        if (error) throw error;
      } else {
        imported.forEach((s, idx) => {
          s.id = 'loc_imp_' + Date.now() + '_' + idx;
          tutorStudents.push(s);
        });
        saveLocalTutorStudents(tutorId, tutorStudents);
      }

      alert(`Успешно импортировано студентов: ${imported.length}! Группы автоматически распределены по подгруппам (по 13 чел).`);
      await loadTutorStudents();
    } catch (err) {
      console.error('Import error:', err);
      alert('Ошибка при импорте файла: ' + (err.message || 'Проверьте структуру файла'));
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsArrayBuffer(file);
}

async function getHemisDayAttendance(dateStr) {
  const result = {};
  try {
    if (window._supabaseClient) {
      const { data, error } = await window._supabaseClient
        .from('tutor_attendance')
        .select('*')
        .eq('attendance_date', dateStr);
      if (!error && data) {
        data.forEach(item => {
          if (!result[item.student_id]) result[item.student_id] = {};
          if (item.status && typeof item.status === 'string' && item.status.startsWith('{')) {
            try {
              const parsed = JSON.parse(item.status);
              Object.assign(result[item.student_id], parsed);
            } catch (e) { }
          } else if (item.status && typeof item.status === 'string' && item.status.includes('pair_')) {
            const parts = item.status.split('_');
            result[item.student_id][parts[1]] = parseInt(parts[2], 10) || 0;
          } else {
            result[item.student_id]["1"] = item.status === 'absent' ? 2 : 0;
          }
        });
      }
    }
  } catch (e) { }

  try {
    const localRaw = localStorage.getItem(`tsue_hemis_attend_${dateStr}`);
    if (localRaw) {
      const localData = JSON.parse(localRaw);
      Object.keys(localData).forEach(stId => {
        if (!result[stId]) result[stId] = {};
        Object.assign(result[stId], localData[stId]);
      });
    }
  } catch (e) { }

  return result;
}

async function saveHemisDayAttendance(dateStr, dataMap, tutorId = 'tutor-dilrabo-vahidovna') {
  try {
    localStorage.setItem(`tsue_hemis_attend_${dateStr}`, JSON.stringify(dataMap));
  } catch (e) { }
  if (window._supabaseClient) {
    try {
      const records = Object.keys(dataMap).map(stId => ({
        tutor_id: tutorId,
        student_id: stId,
        attendance_date: dateStr,
        status: JSON.stringify(dataMap[stId])
      }));
      if (records.length > 0) {
        await window._supabaseClient
          .from('tutor_attendance')
          .upsert(records, { onConflict: 'student_id,attendance_date' });
      }
    } catch (e) {
      console.warn('Supabase attend save warning:', e);
    }
  }
}

let tutorDayHemisMap = {};

async function loadAttendanceForDate(dateStr) {
  currentAttendanceDate = dateStr || new Date().toISOString().split('T')[0];
  const label = document.getElementById('tcAttendDateLabel');
  if (label) {
    const d = new Date(currentAttendanceDate);
    const dateFormatted = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    label.textContent = `Дата занятия: ${dateFormatted} (1 пара = 2 академических часа)`;
  }

  tutorDayHemisMap = await getHemisDayAttendance(currentAttendanceDate);
  renderAttendanceList();
}

function renderAttendanceList() {
  const container = document.getElementById('tcAttendList');
  if (!container) return;

  const groupFilter = document.getElementById('tcAttendGroupFilter')?.value || '';
  const filteredStudents = groupFilter
    ? tutorStudents.filter(s => s.group_name === groupFilter)
    : tutorStudents;

  if (filteredStudents.length === 0) {
    container.innerHTML = `
      <div class="tc-empty-state">
        <i class="fa-solid fa-users-slash"></i>
        <p>Нет студентов в выбранной группе.</p>
      </div>
    `;
    return;
  }

  let totalDayNbHours = 0;
  let totalMissedPairs = 0;

  const rowsHtml = filteredStudents.map((st, idx) => {
    const stData = tutorDayHemisMap[st.id] || {};
    const p1 = stData['1'] === 2 ? 2 : 0;
    const p2 = stData['2'] === 2 ? 2 : 0;
    const p3 = stData['3'] === 2 ? 2 : 0;
    const p4 = stData['4'] === 2 ? 2 : 0;
    const studentTotalDayNb = p1 + p2 + p3 + p4;

    totalDayNbHours += studentTotalDayNb;
    totalMissedPairs += (p1 ? 1 : 0) + (p2 ? 1 : 0) + (p3 ? 1 : 0) + (p4 ? 1 : 0);

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${escapeHtml(st.full_name)}</strong></td>
        <td><span class="tc-badge-grp">${escapeHtml(st.group_name || '—')}</span></td>
        <td>
          <span class="tc-pair-badge tc-pair-badge--${p1}" onclick="toggleTutorStudentPair('${st.id}', '1')" title="Нажмите для переключения (0ч / 2ч НБ)">
            ${p1 === 2 ? '<i class="fa-solid fa-xmark"></i> 2ч НБ' : '<i class="fa-solid fa-check"></i> 0ч'}
          </span>
        </td>
        <td>
          <span class="tc-pair-badge tc-pair-badge--${p2}" onclick="toggleTutorStudentPair('${st.id}', '2')" title="Нажмите для переключения (0ч / 2ч НБ)">
            ${p2 === 2 ? '<i class="fa-solid fa-xmark"></i> 2ч НБ' : '<i class="fa-solid fa-check"></i> 0ч'}
          </span>
        </td>
        <td>
          <span class="tc-pair-badge tc-pair-badge--${p3}" onclick="toggleTutorStudentPair('${st.id}', '3')" title="Нажмите для переключения (0ч / 2ч НБ)">
            ${p3 === 2 ? '<i class="fa-solid fa-xmark"></i> 2ч НБ' : '<i class="fa-solid fa-check"></i> 0ч'}
          </span>
        </td>
        <td>
          <span class="tc-pair-badge tc-pair-badge--${p4}" onclick="toggleTutorStudentPair('${st.id}', '4')" title="Нажмите для переключения (0ч / 2ч НБ)">
            ${p4 === 2 ? '<i class="fa-solid fa-xmark"></i> 2ч НБ' : '<i class="fa-solid fa-check"></i> 0ч'}
          </span>
        </td>
        <td>
          <span class="tc-total-nb-badge ${studentTotalDayNb > 0 ? 'tc-total-nb-badge--some' : 'tc-total-nb-badge--zero'}">
            ${studentTotalDayNb > 0 ? `${studentTotalDayNb} ч. НБ` : '0 ч. (норма)'}
          </span>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="tc-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ф.И.О. Студента</th>
          <th>Группа</th>
          <th>1-я пара<br><small style="font-weight:normal; opacity:0.8;">08:00–09:20</small></th>
          <th>2-я пара<br><small style="font-weight:normal; opacity:0.8;">09:30–10:50</small></th>
          <th>3-я пара<br><small style="font-weight:normal; opacity:0.8;">11:00–12:20</small></th>
          <th>4-я пара<br><small style="font-weight:normal; opacity:0.8;">13:00–14:20</small></th>
          <th>Итого НБ за день</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;

  const summaryBar = document.getElementById('tcDaySummaryBar');
  if (summaryBar) {
    summaryBar.style.display = 'flex';
    summaryBar.className = 'starosta-summary-bar';
    summaryBar.innerHTML = `
      <div class="ss-item ss-all">Студентов в списке: <strong>${filteredStudents.length}</strong></div>
      <div class="ss-item ss-present">Всего пар НБ: <strong>${totalMissedPairs}</strong></div>
      <div class="ss-item ss-hours">Итого часов НБ за день: <strong>${totalDayNbHours} ч.</strong></div>
    `;
  }
}

function toggleTutorStudentPair(studentId, pair) {
  if (!tutorDayHemisMap[studentId]) tutorDayHemisMap[studentId] = {};
  const cur = tutorDayHemisMap[studentId][pair] === 2 ? 2 : 0;
  tutorDayHemisMap[studentId][pair] = cur === 2 ? 0 : 2;
  renderAttendanceList();
}

async function saveAttendance() {
  const tutorId = currentUser?.id || 'tutor-dilrabo-vahidovna';
  const dateStr = currentAttendanceDate || new Date().toISOString().split('T')[0];
  await saveHemisDayAttendance(dateStr, tutorDayHemisMap, tutorId);
  alert('✅ Журнал посещаемости HEMIS успешно сохранен!');
}

async function loadAttendanceStats() {
  const container = document.getElementById('tcStatsContent');
  if (!container) return;

  const days = parseInt(document.getElementById('tcStatsPeriod')?.value || '30', 10);
  const groupFilter = document.getElementById('tcStatsGroupFilter')?.value || '';
  const filteredStudents = groupFilter
    ? tutorStudents.filter(s => s.group_name === groupFilter)
    : tutorStudents;

  if (filteredStudents.length === 0) {
    container.innerHTML = `
      <div class="tc-empty-state">
        <i class="fa-solid fa-chart-pie"></i>
        <p>Нет студентов в выбранной группе для расчета статистики.</p>
      </div>
    `;
    return;
  }

  const stats = {};
  filteredStudents.forEach(st => {
    stats[st.id] = { student: st, totalNbHours: 0, totalNbPairs: 0, daysWithNb: 0 };
  });

  for (let d = 0; d < days; d++) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - d);
    const dateStr = targetDate.toISOString().split('T')[0];

    try {
      const dayRaw = localStorage.getItem(`tsue_hemis_attend_${dateStr}`);
      if (dayRaw) {
        const dayMap = JSON.parse(dayRaw);
        filteredStudents.forEach(st => {
          const stData = dayMap[st.id];
          if (stData) {
            let dayNb = 0;
            ['1', '2', '3', '4'].forEach(p => {
              if (stData[p] === 2) {
                stats[st.id].totalNbHours += 2;
                stats[st.id].totalNbPairs += 1;
                dayNb += 2;
              }
            });
            if (dayNb > 0) stats[st.id].daysWithNb += 1;
          }
        });
      }
    } catch (e) { }
  }

  const statsList = Object.values(stats);
  statsList.sort((a, b) => b.totalNbHours - a.totalNbHours);

  let totalNbAll = 0;
  let totalPairsAll = 0;
  let countRiskWarn = 0;
  let countRiskDanger = 0;

  statsList.forEach(item => {
    totalNbAll += item.totalNbHours;
    totalPairsAll += item.totalNbPairs;
    if (item.totalNbHours >= 16) countRiskDanger++;
    else if (item.totalNbHours >= 8) countRiskWarn++;
  });

  const nbTotEl = document.getElementById('tcStatNbTotal');
  const nbPairsEl = document.getElementById('tcStatNbPairs');
  const riskWarnEl = document.getElementById('tcStatRiskWarn');
  const riskDangEl = document.getElementById('tcStatRiskDanger');

  if (nbTotEl) nbTotEl.textContent = totalNbAll + ' ч.';
  if (nbPairsEl) nbPairsEl.textContent = totalPairsAll;
  if (riskWarnEl) riskWarnEl.textContent = countRiskWarn;
  if (riskDangEl) riskDangEl.textContent = countRiskDanger;

  container.innerHTML = `
    <table class="tc-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ф.И.О. Студента</th>
          <th>Группа</th>
          <th>Пропущено пар</th>
          <th>Всего часов НБ (соат)</th>
          <th>Дней с пропусками</th>
          <th>Статус по регламенту HEMIS</th>
        </tr>
      </thead>
      <tbody>
        ${statsList.map((item, idx) => {
    let riskBadge = '<span class="tc-risk-pill tc-risk--ok"><i class="fa-solid fa-circle-check"></i> 0-6ч (В норме)</span>';
    if (item.totalNbHours >= 26) {
      riskBadge = '<span class="tc-risk-pill tc-risk--danger"><i class="fa-solid fa-triangle-exclamation"></i> 26+ ч. (Критично / Отчисление)</span>';
    } else if (item.totalNbHours >= 16) {
      riskBadge = '<span class="tc-risk-pill tc-risk--high"><i class="fa-solid fa-circle-exclamation"></i> 16-24 ч. (Высокий риск)</span>';
    } else if (item.totalNbHours >= 8) {
      riskBadge = '<span class="tc-risk-pill tc-risk--warn"><i class="fa-solid fa-circle-exclamation"></i> 8-14 ч. (Предупреждение)</span>';
    }

    return `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${escapeHtml(item.student.full_name)}</strong></td>
              <td><span class="tc-badge-grp">${escapeHtml(item.student.group_name || '—')}</span></td>
              <td><strong style="color: ${item.totalNbPairs > 0 ? '#ef4444' : 'inherit'}">${item.totalNbPairs} пар</strong></td>
              <td><strong style="font-size:14px; color: ${item.totalNbHours >= 8 ? '#ef4444' : '#10b981'}">${item.totalNbHours} ч.</strong></td>
              <td>${item.daysWithNb} дн.</td>
              <td>${riskBadge}</td>
            </tr>
          `;
  }).join('')}
      </tbody>
    </table>
  `;
}

function exportAttendancePDF() {
  window.print();
}

function downloadTutorTemplateExcel(isStats = false) {
  if (typeof XLSX === 'undefined') {
    alert('Библиотека XLSX ещё загружается, подождите пару секунд...');
    return;
  }

  if (isStats) {
    const rows = [
      ['TDIU Raqamli iqtisodiyot fakulteti talabalarining HEMIS DAVOMAT va NB vedomosti'],
      ['Shakllantirilgan sana: ' + new Date().toLocaleDateString('ru-RU')],
      [],
      ['№', 'F.I.SH.', 'Guruh', 'Podguruh', 'Otkazilgan juftliklar (Par)', 'Jami NB soati', 'HEMIS holati']
    ];

    tutorStudents.forEach((st, idx) => {
      rows.push([
        idx + 1,
        st.full_name || st.student_name || '—',
        st.group_name || '—',
        st.subgroup || '1',
        0,
        '0 soat',
        '0-6 soat (Norma)'
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 5 }, { wch: 40 }, { wch: 14 }, { wch: 10 }, { wch: 25 }, { wch: 16 }, { wch: 22 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'HEMIS_Davomat_Vedomost');
    XLSX.writeFile(wb, `HEMIS_Davomat_TDIU_${new Date().toISOString().split('T')[0]}.xlsx`);
    return;
  }

  const sampleData = [
    ['TDIU Raqamli iqtisodiyot va axborot texnologiyalari fakulteti talabalari DAVOMATI'],
    [],
    ['№', 'FISH', 'Guruh', 'Podguruh', 'Tel', 'Email', 'HEMIS ID'],
    [1, 'МАХМУДЖОНОВА ХУШНОРА МУХТОРЖОН КИЗИ', 'АТ-31/25r', '1', '+998901234561', 'kh.makhmudjonova@tsue.uz', '394210001'],
    [2, 'АНВАРЖОНОВ ДИЁРБЕК РУСТАМОВИЧ', 'АТ-31/25r', '1', '+998940021163', 'd.anvarjonov@tsue.uz', '394210002'],
    [3, 'АНВАРОВ МУХАММАДАЛИ ДИЛЬШОД УГЛИ', 'АТ-31/25r', '1', '+998953982884', 'm.anvarov@tsue.uz', '394210003'],
    [4, 'АЗИМОВ АЛИАКБАР АБРОР УГЛИ', 'АТ-31/25r', '1', '+998902222248', 'a.azimov@tsue.uz', '394210004'],
    [5, 'ДОНИЁРОВ АЗИЗБЕК РУСТАМБЕК УГЛИ', 'АТ-31/25r', '1', '+998909004002', 'a.doniyorov@tsue.uz', '394210005'],
    [6, 'ХОДЖИЕВ САРДОР МИРЗОХИД УГЛИ', 'АТ-31/25r', '1', '+998935042255', 's.khojiev@tsue.uz', '394210006'],
    [7, 'МАХМУДОВ ДИЛШОД ШАВКАТ УГЛИ', 'АТ-31/25r', '1', '+998971134907', 'd.makhmudov@tsue.uz', '394210007'],
    [8, 'МЕЛИБОЕВ ФАРРУХ МУРОДЖОН УГЛИ', 'АТ-31/25r', '1', '+998971123104', 'f.meliboev@tsue.uz', '394210008'],
    [9, 'КАРИМОВ ДУРБЕК ДИЛШОД УГЛИ', 'АТ-31/25r', '1', '+998990728232', 'd.karimov@tsue.uz', '394210009'],
    [10, 'ЁЛДОШЕВ АНВАРХОН БАХТИЁР УГЛИ', 'АТ-31/25r', '1', '+998908124904', 'a.yoldoshev@tsue.uz', '394210010'],
    [11, 'АЛИЕВ ДОНИЁР РАФАЭЛЕВИЧ', 'АТ-31/25r', '1', '+998903467604', 'd.aliev@tsue.uz', '394210011'],
    [12, 'ЖОРАБЕКОВ СУЛТОНБЕК УЛУГБЕК УГЛИ', 'АТ-31/25r', '1', '+998990575020', 's.jorabekov@tsue.uz', '394210012'],
    [13, 'КОСИМХОНОВ АЗИЗБЕК МУЗАФФАРХОН', 'АТ-31/25r', '1', '+998900258958', 'a.qosimxonov@tsue.uz', '394210013'],
    [14, 'ЮСУПОВ ЖАВОХИРБЕК АНВАР УГЛИ', 'АТ-31/25r', '2', '+998907753653', 'j.yusupov@tsue.uz', '394210014'],
    [15, 'АБРОРОВ ШАХРИЁР ШИНГИЗ БАТЫРОВИЧ', 'АТ-31/25r', '2', '+998936023220', 'sh.abrorov@tsue.uz', '394210015'],
    [16, 'АБДУРАСУЛОВА ДИЛЬРАБОХОН БАХОДИР КИЗИ', 'АТ-31/25r', '2', '+998948203005', 'd.abdurasulova@tsue.uz', '394210016']
  ];

  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  ws['!cols'] = [
    { wch: 5 },
    { wch: 42 },
    { wch: 14 },
    { wch: 10 },
    { wch: 18 },
    { wch: 28 },
    { wch: 14 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'AT-31_25r');
  XLSX.writeFile(wb, 'Shablon_Davomati_FCE_TSUE.xlsx');
}

let starostaAllStudents = [];
let starostaFilteredStudents = [];
let starostaAttendanceMap = {};

async function initStarostaModule() {
  const dateInput = document.getElementById('starostaAttendDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  await loadAllStudentsForStarosta();
  sgRefreshGroupDropdown();
}

function showStarostaSubTab(panel) {
  const panels = ['attend', 'group'];
  panels.forEach(p => {
    const el = document.getElementById(`starostaPanel-${p}`);
    const btn = document.getElementById(`starostaTab${p.charAt(0).toUpperCase() + p.slice(1)}`);
    if (el) el.style.display = p === panel ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', p === panel);
  });
}

let sgDraftStudents = [];
let sgCurrentGroup = '';

function sgRefreshGroupDropdown() {
  const sel = document.getElementById('sgGroupSelect');
  if (!sel) return;

  const groupsSet = new Set();
  const local = getCombinedLocalStudents();
  local.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  if (starostaAllStudents) {
    starostaAllStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }

  const arr = Array.from(groupsSet).sort();
  sel.innerHTML = `
    <option value="">— Выбрать существующую или создать новую —</option>
    ${arr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}
    <option value="__NEW__">+ Создать новую группу...</option>
  `;

  if (sgCurrentGroup && arr.includes(sgCurrentGroup)) {
    sel.value = sgCurrentGroup;
  }
}

function sgOnGroupSelect(val) {
  const nameInput = document.getElementById('sgNewGroupName');
  if (!nameInput) return;

  if (val === '__NEW__') {
    nameInput.style.display = 'block';
    nameInput.focus();
    sgCurrentGroup = '';
  } else {
    nameInput.style.display = 'none';
    sgCurrentGroup = val;
    if (val) {
      const existing = starostaAllStudents.filter(s => s.group_name === val);
      sgDraftStudents = existing.map(s => ({ id: s.id, name: s.full_name || s.student_name || '—', subgroup: s.subgroup || '1', synced: true }));
    } else {
      sgDraftStudents = [];
    }
    sgRenderDraftList();
  }
}

function sgAddStudentRow() {
  const inp = document.getElementById('sgNewStudentName');
  const name = (inp?.value || '').trim();
  if (!name) { inp?.focus(); return; }

  const existingCount = sgDraftStudents.filter(s => !s._deleted).length;
  const subgroup = Math.floor(existingCount / 13) % 2 === 0 ? '1' : '2';

  sgDraftStudents.push({ id: null, name, subgroup, synced: false });
  sgRenderDraftList();
  if (inp) { inp.value = ''; inp.focus(); }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.activeElement?.id === 'sgNewStudentName') {
    e.preventDefault();
    sgAddStudentRow();
  }
});

function sgRemoveStudent(idx) {
  if (sgDraftStudents[idx]) {
    sgDraftStudents.splice(idx, 1);
    sgRenderDraftList();
  }
}

function sgRenderDraftList() {
  const container = document.getElementById('sgStudentListPreview');
  if (!container) return;

  const active = sgDraftStudents.filter(s => !s._deleted);

  if (active.length === 0) {
    container.innerHTML = `
      <div class="tc-empty-state" style="padding:20px;">
        <i class="fa-solid fa-user-group"></i>
        <p>Студенты добавятся здесь</p>
      </div>`;
    return;
  }

  const bySubgroup = {};
  active.forEach((s, idx) => {
    const sg = s.subgroup || '1';
    if (!bySubgroup[sg]) bySubgroup[sg] = [];
    bySubgroup[sg].push({ ...s, _origIdx: sgDraftStudents.indexOf(s) });
  });

  container.innerHTML = Object.keys(bySubgroup).sort().map(sg => `
    <div class="sg-subgroup-block">
      <div class="sg-subgroup-label"><i class="fa-solid fa-people-group"></i> ${escapeHtml(sg)}-я подгруппа (${bySubgroup[sg].length} чел.)</div>
      ${bySubgroup[sg].map(s => `
        <div class="sg-student-row ${s.synced ? 'sg-row-synced' : ''}">
          <span class="sg-student-num">${bySubgroup[sg].indexOf(s) + 1}</span>
          <span class="sg-student-name">${escapeHtml(s.name)}</span>
          ${s.synced ? '<span class="sg-synced-badge"><i class="fa-solid fa-cloud-check"></i> Сохранён</span>' : ''}
          <button type="button" class="sg-remove-btn" onclick="sgRemoveStudent(${s._origIdx})" title="Удалить">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

async function sgSaveGroupAndStudents() {
  const sel = document.getElementById('sgGroupSelect');
  const nameInp = document.getElementById('sgNewGroupName');
  const feedback = document.getElementById('sgSaveFeedback');

  let groupName = '';
  if (sel?.value === '__NEW__') {
    groupName = (nameInp?.value || '').trim().toUpperCase();
  } else if (sel?.value) {
    groupName = sel.value.trim().toUpperCase();
  } else if (nameInp?.value) {
    groupName = nameInp.value.trim().toUpperCase();
  }

  if (!groupName) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Укажите или выберите название группы.';
    }
    return;
  }

  const unsaved = sgDraftStudents.filter(s => !s.synced);
  if (unsaved.length === 0) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'sreg-info-alert';
      feedback.style.cssText = 'display:block; background:#fef9c3; border-color:#fde047; color:#713f12; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.textContent = 'Нет новых студентов для сохранения.';
    }
    return;
  }

  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = '';
    feedback.style.cssText = 'display:block; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.3); color: var(--primary-dark); padding:12px; border-radius:10px; margin-top:14px;';
    feedback.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Сохранение студентов...';
  }

  let savedCount = 0;
  const errors = [];
  let tutorList = loadLocalTutorStudents('tutor-dilrabo-vahidovna');
  if (!Array.isArray(tutorList)) tutorList = [];

  for (let i = 0; i < sgDraftStudents.length; i++) {
    const s = sgDraftStudents[i];
    if (s.synced || !s.name) continue;

    const subgroup = s.subgroup || (Math.floor(i / 13) % 2 === 0 ? '1' : '2');

    const record = {
      full_name: s.name,
      student_name: s.name,
      group_name: groupName,
      subgroup: subgroup,
      tutor_id: 'tutor-dilrabo-vahidovna',
      notes: 'Добавлен старостой (модуль создания группы)'
    };

    try {
      if (window._supabaseClient) {
        const { data, error } = await window._supabaseClient
          .from('tutor_students')
          .insert([record])
          .select();
        if (!error && data && data[0]) {
          sgDraftStudents[i].id = data[0].id;
          sgDraftStudents[i].synced = true;
          tutorList.push({ ...record, id: data[0].id });
          savedCount++;
        } else {
          // Fallback to local
          const localId = 'st_sg_' + Date.now() + '_' + i;
          sgDraftStudents[i].id = localId;
          sgDraftStudents[i].synced = true;
          tutorList.push({ ...record, id: localId });
          savedCount++;
        }
      } else {
        const localId = 'st_sg_' + Date.now() + '_' + i;
        sgDraftStudents[i].id = localId;
        sgDraftStudents[i].synced = true;
        tutorList.push({ ...record, id: localId });
        savedCount++;
      }
    } catch (err) {
      const localId = 'st_sg_' + Date.now() + '_' + i;
      sgDraftStudents[i].id = localId;
      sgDraftStudents[i].synced = true;
      tutorList.push({ ...record, id: localId });
      savedCount++;
    }
  }

  saveLocalTutorStudents('tutor-dilrabo-vahidovna', tutorList);
  tutorStudents = tutorList;

  sgCurrentGroup = groupName;
  await loadAllStudentsForStarosta();
  sgRefreshGroupDropdown();
  sgRenderDraftList();

  if (feedback) {
    if (errors.length === 0) {
      feedback.style.cssText = 'display:block; background:#dcfce7; border:1px solid #86efac; color:#15803d; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Готово!</strong> ${savedCount} студентов сохранены в группе «${escapeHtml(groupName)}» и переданы тьютору Дилрабо Вахидовне.`;
    } else {
      feedback.style.cssText = 'display:block; background:#fef9c3; border:1px solid #fde047; color:#713f12; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Сохранено: ${savedCount}. Ошибки: ${errors.join('; ')}`;
    }
  }
}

function sgClearAll() {
  sgDraftStudents = [];
  sgCurrentGroup = '';
  const sel = document.getElementById('sgGroupSelect');
  if (sel) sel.value = '';
  const nameInp = document.getElementById('sgNewGroupName');
  if (nameInp) { nameInp.value = ''; nameInp.style.display = 'none'; }
  const feedback = document.getElementById('sgSaveFeedback');
  if (feedback) feedback.style.display = 'none';
  sgRenderDraftList();
}


async function loadAllStudentsForStarosta() {
  const groupSelect = document.getElementById('starostaGroupSelect');
  if (!groupSelect) return;

  try {
    if (window._supabaseClient) {
      const { data, error } = await window._supabaseClient
        .from('tutor_students')
        .select('*')
        .order('full_name', { ascending: true });
      if (!error && data && data.length > 0) {
        starostaAllStudents = data.map(st => ({
          ...st,
          full_name: st.full_name || st.student_name || '—'
        }));
      } else {
        starostaAllStudents = getCombinedLocalStudents();
      }
    } else {
      starostaAllStudents = getCombinedLocalStudents();
    }
  } catch (e) {
    starostaAllStudents = getCombinedLocalStudents();
  }

  const groupsSet = new Set(starostaAllStudents.map(s => s.group_name).filter(Boolean));

  const groupsArr = Array.from(groupsSet).sort();
  if (groupsArr.length > 0) {
    groupSelect.innerHTML = groupsArr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
    groupSelect.value = groupsArr[0];
    onStarostaGroupChange();
  } else {
    groupSelect.innerHTML = '<option value="">— Нет групп. Создайте группу во вкладке «Создание группы» —</option>';
  }
}

function getCombinedLocalStudents() {
  const res = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tsue_tutor_students_')) {
        const arr = JSON.parse(localStorage.getItem(k) || '[]');
        if (Array.isArray(arr)) res.push(...arr);
      }
    }
    const selfReg = JSON.parse(localStorage.getItem('tsue_self_registered_students') || '[]');
    res.push(...selfReg);
  } catch (e) { }
  return res;
}

function onStarostaGroupChange() {
  const selectedGroup = document.getElementById('starostaGroupSelect')?.value;
  starostaFilteredStudents = starostaAllStudents.filter(st => st.group_name === selectedGroup);
  loadStarostaAttendance();
}

let starostaCurrentHemisMap = {};

async function loadStarostaAttendance() {
  const dateStr = document.getElementById('starostaAttendDate')?.value || new Date().toISOString().split('T')[0];
  starostaCurrentHemisMap = await getHemisDayAttendance(dateStr);
  renderStarostaStudentList();
  updateStarostaSummary();
}

function renderStarostaStudentList() {
  const listEl = document.getElementById('starostaStudentList');
  if (!listEl) return;
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const isTutor = currentUser && (currentUser.id === 'tutor-dilrabo-vahidovna' || currentUser.role === 'tutor' || currentUser.role === 'admin');

  if (starostaFilteredStudents.length === 0) {
    listEl.innerHTML = `
      <div class="tc-empty-state">
        <i class="fa-solid fa-users-slash"></i>
        <p>В этой группе пока нет зарегистрированных студентов.</p>
        <small>Добавьте студентов через вкладку «Создание группы»</small>
      </div>
    `;
    return;
  }

  const sorted = [...starostaFilteredStudents].sort((a, b) => {
    if ((a.subgroup || '1') !== (b.subgroup || '1')) {
      return (a.subgroup || '1').localeCompare(b.subgroup || '1');
    }
    return (a.full_name || '').localeCompare(b.full_name || '');
  });

  const rows = sorted.map((st, idx) => {
    const stData = starostaCurrentHemisMap[st.id] || {};
    const curHours = parseInt(stData[pair], 10) || 0;
    const rowClass = curHours > 0 ? 'starosta-tr--nb' : '';
    const deleteBtn = isTutor
      ? `<td class="starosta-td--del"><button class="starosta-del-btn" onclick="starostaDeleteStudent('${escapeHtml(String(st.id))}')" title="Удалить студента из группы"><i class="fa-solid fa-trash-can"></i></button></td>`
      : '';
    return `
      <tr class="${rowClass}">
        <td class="starosta-td--num">${idx + 1}</td>
        <td class="starosta-td--name">
          <span class="starosta-student-name">${escapeHtml(st.full_name)}</span>
          ${st.hemis_id ? `<span class="starosta-hemis-id">ID: ${escapeHtml(st.hemis_id)}</span>` : ''}
        </td>
        <td class="starosta-td--group">
          <span class="starosta-group-badge">${escapeHtml(st.group_name || '—')}</span>
          <span class="starosta-subgroup">${st.subgroup ? st.subgroup + '-п/г' : '1-п/г'}</span>
        </td>
        <td class="starosta-td--hours">
          <div class="starosta-hours-wrap">
            <input type="number" min="0" max="2" step="2"
              class="starosta-hours-input ${curHours > 0 ? 'is-nb' : ''}"
              value="${curHours}"
              onkeydown="handleStarostaHoursKey(event, this, '${escapeHtml(String(st.id))}')"
              onchange="setStarostaHours('${escapeHtml(String(st.id))}', this.value, this)"
              oninput="setStarostaHours('${escapeHtml(String(st.id))}', this.value, this)"
              title="0 = присутствует, 2 = 1 пара НБ">
            <span class="starosta-hours-unit">ч.</span>
          </div>
        </td>
        ${deleteBtn}
      </tr>
    `;
  }).join('');

  const delHeader = isTutor ? '<th class="starosta-th--del"></th>' : '';

  listEl.innerHTML = `
    <div class="starosta-register-table-wrap">
      <table class="starosta-register-table">
        <thead>
          <tr>
            <th class="starosta-th--num">№</th>
            <th class="starosta-th--name">Ф.И.О. Студента</th>
            <th class="starosta-th--group">Группа / П/гр</th>
            <th class="starosta-th--hours">Часы НБ (пара ${pair})</th>
            ${delHeader}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function handleStarostaHoursKey(e, inputEl, studentId) {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setStarostaHours(studentId, 2, inputEl);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    setStarostaHours(studentId, 0, inputEl);
  }
}

async function starostaDeleteStudent(studentId) {
  if (!confirm('Удалить этого студента из группы и журнала?')) return;
  const tutorId = currentUser?.id || 'tutor-dilrabo-vahidovna';
  try {
    if (window._supabaseClient && !String(studentId).startsWith('loc_') && !String(studentId).startsWith('st_')) {
      const { error } = await window._supabaseClient
        .from('tutor_students')
        .delete()
        .eq('id', studentId);
      if (error) throw error;
    } else {
      let localList = loadLocalTutorStudents(tutorId);
      if (!Array.isArray(localList)) localList = [];
      localList = localList.filter(s => String(s.id) !== String(studentId));
      saveLocalTutorStudents(tutorId, localList);
      tutorStudents = localList;
    }
    await loadAllStudentsForStarosta();
    if (typeof loadTutorStudents === 'function') await loadTutorStudents();
  } catch (err) {
    alert('Ошибка при удалении студента: ' + (err.message || 'Сбой'));
  }
}

function setStarostaHours(studentId, hoursVal, inputEl) {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  let raw = parseInt(hoursVal, 10);
  let hours = isNaN(raw) || raw <= 0 ? 0 : 2;
  if (inputEl && inputEl.value !== String(hours)) {
    inputEl.value = hours;
  }
  if (inputEl) {
    if (hours > 0) inputEl.classList.add('is-nb');
    else inputEl.classList.remove('is-nb');
    const tr = inputEl.closest('tr');
    if (tr) {
      if (hours > 0) tr.classList.add('starosta-tr--nb');
      else tr.classList.remove('starosta-tr--nb');
    }
  }
  if (!starostaCurrentHemisMap[studentId]) starostaCurrentHemisMap[studentId] = {};
  starostaCurrentHemisMap[studentId][pair] = hours;
  if (inputEl) {
    const tr = inputEl.closest('tr');
    const todayEl = tr?.querySelector('.starosta-today-nb');
    if (todayEl) {
      let todayTotalNb = 0;
      for (let p = 1; p <= 8; p++) {
        todayTotalNb += (parseInt(starostaCurrentHemisMap[studentId][String(p)], 10) || 0);
      }
      todayEl.textContent = todayTotalNb > 0 ? todayTotalNb + ' ч. НБ' : 'норма';
      if (todayTotalNb > 0) todayEl.classList.add('is-nb');
      else todayEl.classList.remove('is-nb');
    }
  }
  updateStarostaSummary();
}

function setStarostaStudentStatus(studentId, hours) {
  setStarostaHours(studentId, hours);
  renderStarostaStudentList();
}

function setAllStarostaStatus(hours) {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const raw = parseInt(hours, 10);
  const numHours = isNaN(raw) || raw <= 0 ? 0 : 2;
  starostaFilteredStudents.forEach(st => {
    if (!starostaCurrentHemisMap[st.id]) starostaCurrentHemisMap[st.id] = {};
    starostaCurrentHemisMap[st.id][pair] = numHours;
  });
  renderStarostaStudentList();
  updateStarostaSummary();
}

function updateStarostaSummary() {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  let present = 0, absent = 0, totalHours = 0;
  starostaFilteredStudents.forEach(st => {
    const stData = starostaCurrentHemisMap[st.id] || {};
    const curHours = parseInt(stData[pair], 10) || 0;
    if (curHours === 0) {
      present++;
    } else {
      absent++;
      totalHours += curHours;
    }
  });

  const totalEl = document.getElementById('starostaCountTotal');
  const presEl = document.getElementById('starostaCountPresent');
  const absEl = document.getElementById('starostaCountAbsent');
  const hoursEl = document.getElementById('starostaCountHours');

  if (totalEl) totalEl.textContent = starostaFilteredStudents.length;
  if (presEl) presEl.textContent = present;
  if (absEl) absEl.textContent = absent;
  if (hoursEl) hoursEl.textContent = totalHours + ' ч';
}

async function saveStarostaAttendance() {
  const dateStr = document.getElementById('starostaAttendDate')?.value || new Date().toISOString().split('T')[0];
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const subject = document.getElementById('starostaSubject')?.value || '';

  if (subject) {
    starostaFilteredStudents.forEach(st => {
      if (starostaCurrentHemisMap[st.id]) {
        starostaCurrentHemisMap[st.id][`subject_${pair}`] = subject;
      }
    });
  }

  await saveHemisDayAttendance(dateStr, starostaCurrentHemisMap, 'tutor-dilrabo-vahidovna');
  alert(`✅ Отметки за ${pair}-ю пару (${dateStr}) успешно сохранены в системе HEMIS и переданы тьютору Дилрабо Вахидовне!`);
}

function initStudentRegModule() {
  refreshStudentRegGroups();
}

function refreshStudentRegGroups() {
  const select = document.getElementById('sregGroupSelect');
  if (!select) return;

  const currentVal = select.value;
  const groupsSet = new Set();

  // Get groups from real tutor students database
  if (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) {
    tutorStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }
  if (typeof starostaAllStudents !== 'undefined' && Array.isArray(starostaAllStudents)) {
    starostaAllStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }

  const localList = getCombinedLocalStudents();
  localList.forEach(s => {
    if (s.group_name) groupsSet.add(s.group_name.trim());
  });

  const arr = Array.from(groupsSet).sort();
  select.innerHTML = `
    <option value="">— Выберите группу —</option>
    ${arr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}
    <option value="__NEW__">+ Другая (Создать новую группу)...</option>
  `;

  if (currentVal && arr.includes(currentVal)) {
    select.value = currentVal;
  }
}


function toggleCustomGroupInput(val) {
  const wrap = document.getElementById('sregCustomGroupWrap');
  if (wrap) {
    wrap.style.display = val === '__NEW__' ? 'block' : 'none';
    if (val === '__NEW__') {
      const inp = document.getElementById('sregCustomGroup');
      if (inp) inp.focus();
    }
  }
}

async function handleStudentSelfRegistration(event) {
  event.preventDefault();
  const feedback = document.getElementById('sregFeedback');
  const submitBtn = document.getElementById('sregSubmitBtn');

  const fullName = (document.getElementById('sregFullName')?.value || '').trim();
  let group = document.getElementById('sregGroupSelect')?.value;
  if (group === '__NEW__') {
    group = (document.getElementById('sregCustomGroup')?.value || '').trim().toUpperCase();
  }
  const hemis = (document.getElementById('sregHemisId')?.value || '').trim();
  const phone = (document.getElementById('sregPhone')?.value || '').trim();
  const email = (document.getElementById('sregEmail')?.value || '').trim();
  const notes = (document.getElementById('sregNotes')?.value || '').trim();

  if (!fullName || !group) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Пожалуйста, заполните Ф.И.О. и выберите или укажите группу.';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Регистрация...';
  }

  let existingGroupStudents = [];
  try {
    if (window._supabaseClient) {
      const { data } = await window._supabaseClient
        .from('tutor_students')
        .select('*')
        .eq('group_name', group);
      if (data) existingGroupStudents = data;
    }
  } catch (e) { }

  if (existingGroupStudents.length === 0) {
    const allLocal = getCombinedLocalStudents();
    existingGroupStudents = allLocal.filter(s => s.group_name === group);
  }

  const groupTotal = existingGroupStudents.length;
  const calculatedSubgroup = (groupTotal % 26) < 13 ? '1' : '2';

  const newStudent = {
    full_name: fullName,
    student_name: fullName,
    group_name: group,
    subgroup: calculatedSubgroup,
    hemis_id: hemis,
    phone: phone,
    email: email,
    notes: notes || 'Самостоятельная регистрация студента',
    tutor_id: 'tutor-dilrabo-vahidovna'
  };

  try {
    let savedId = 'st_self_' + Date.now();
    if (window._supabaseClient) {
      const { data, error } = await window._supabaseClient
        .from('tutor_students')
        .insert([newStudent])
        .select();
      if (!error && data && data[0]) {
        savedId = data[0].id;
      }
    }

    newStudent.id = savedId;

    const selfList = JSON.parse(localStorage.getItem('tsue_self_registered_students') || '[]');
    selfList.push(newStudent);
    localStorage.setItem('tsue_self_registered_students', JSON.stringify(selfList));

    let tutorList = loadLocalTutorStudents('tutor-dilrabo-vahidovna');
    if (!Array.isArray(tutorList)) tutorList = [];
    tutorList.push(newStudent);
    saveLocalTutorStudents('tutor-dilrabo-vahidovna', tutorList);
    tutorStudents = tutorList;

    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'sreg-info-alert';
      feedback.style.background = '#dcfce7';
      feedback.style.borderColor = '#86efac';
      feedback.style.color = '#15803d';
      feedback.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <div>
          <strong>Вы успешно зарегистрированы!</strong><br>
          Группа: <strong>${escapeHtml(group)}</strong> · Вам автоматически присвоена <strong>${calculatedSubgroup}-я подгруппа</strong> (по правилу 13 человек на подгруппу).
          Данные переданы тьюторам и в мобильный журнал старосты.
        </div>
      `;
    }

    document.getElementById('studentSelfRegForm').reset();
    document.getElementById('sregCustomGroupWrap').style.display = 'none';

    await loadAllStudentsForStarosta();
    refreshStudentRegGroups();
  } catch (err) {
    console.error('Self-reg error:', err);
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Ошибка регистрации: ' + (err.message || 'Сбой сети');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> Зарегистрироваться в реестре группы';
    }
  }
}

