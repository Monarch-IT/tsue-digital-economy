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
    schedMetaSemesterKey: 'Учебный год:',
    schedSemesterVal: '2026–2027',
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
    cabInfoYearVal: '2026–2027',
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
    sysMetricSemester: 'Учебный год',
    sysMetricSemesterVal: '2026–2027',
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
    pdfSchedSemester: '2026–2027 учебный год',
    pdfSchedTimeTh: 'Время',
    pdfSchedFooterLeft: 'Официальное расписание учебного процесса ТГЭУ · Сформировано:',
    pdfSchedFooterRight: 'Руководство Факультета Цифровой Экономики ТГЭУ',
    pdfSchedFileName: 'Расписание',

    pdfVedomUnivTitle: 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ',
    pdfVedomFacultyTitle: 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · АКАДЕМИЧЕСКАЯ ВЕДОМОСТЬ',
    pdfVedomGroupLabel: 'Учебная группа: АТ-31/25r (Цифровая экономика)',
    pdfVedomSemesterLabel: 'Учебный год: 2026–2027',
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
    notifFooterBtn: 'Перейти в панель управления системой',

    starostaTabAttend: 'Журнал по парам',
    starostaTabGroup: 'Создание группы',
    starostaBadge: 'Электронный журнал занятий (HEMIS)',
    starostaTitle: 'Отметка посещаемости по парам',
    starostaSubtitle: 'Журнал для преподавателей и старост: 1 пара = 2 академических часа (2 соат НБ при пропуске)',
    starostaGroupLabel: 'Учебная группа',
    starostaDateLabel: 'Дата занятия',
    starostaPairLabel: 'Академическая пара',
    starostaSubjectLabel: 'Предмет / Преподаватель',
    starostaSubjectPlaceholder: 'Напр. Цифровая экономика',
    starostaTotalStudents: 'В группе',
    starostaPresentLabel: 'Присутствуют (0ч)',
    starostaAbsentLabel: 'НБ (2ч пропуск)',
    starostaHoursLabel: 'Часов НБ на паре',
    starostaAllPresentBtn: 'Все присутствуют (0ч НБ)',
    starostaAllAbsentBtn: 'Отметить всем 2ч НБ',
    starostaSaveBtn: 'Сохранить отметки пары',
    starostaEmptyState: 'Выберите учебную группу для начала отметки',
    starostaThNum: '№',
    starostaThName: 'Ф.И.О. Студента',
    starostaThGroup: 'Группа / Подгруппа',
    starostaThHours: 'Отметка НБ (часы)',
    starostaThTodayTotal: 'Итого за день',
    starostaThAction: 'Действие',
    starostaDeleteConfirm: 'Удалить студента из состава группы?',

    sregBadge: 'Портал самозаписи студентов',
    sregTitle: 'Электронная анкета студента',
    sregSubtitle: 'Заполните свои данные для включения в электронный журнал посещаемости и ведомости',
    sregInfoAlert: 'Автоматическое распределение по группам: Если вашей группы ещё нет в списке, выберите «+ Новая группа» и введите её код. Система автоматически зарегистрирует группу и при наборе контингента распределит студентов на 2 подгруппы по 13 человек.',
    sregFullNameLabel: 'Фамилия, Имя, Отчество (Ф.И.О.) *',
    sregFullNamePlaceholder: 'Например: Каримов Сардор Олимович',
    sregGroupLabel: 'Учебная группа *',
    sregGroupSelectPlaceholder: '— Выберите группу —',
    sregNewGroupOption: '+ Другая (Создать новую группу)...',
    sregCustomGroupLabel: 'Название новой группы *',
    sregCustomGroupPlaceholder: 'Например: ИИ-12/26',
    sregHemisLabel: 'HEMIS Студенческий ID',
    sregHemisPlaceholder: 'Например: 394210088',
    sregPhoneLabel: 'Номер телефона *',
    sregPhonePlaceholder: '+998 90 123-45-67',
    sregEmailLabel: 'Корпоративный или личный Email',
    sregEmailPlaceholder: 'student@tsue.uz',
    sregNotesLabel: 'Дополнительные сведения / Комментарий',
    sregNotesPlaceholder: 'Например: Староста группы / замстаросты / активист',
    sregSubmitBtn: 'Зарегистрироваться в реестре группы'
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
    schedMetaSemesterKey: 'O\'quv yili:',
    schedSemesterVal: '2026–2027',
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
    cabInfoYearVal: '2026–2027',
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
    sysMetricSemester: 'O\'quv yili',
    sysMetricSemesterVal: '2026–2027',
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
    pdfSchedSemester: '2026–2027 o\'quv yili',
    pdfSchedTimeTh: 'Vaqt',
    pdfSchedFooterLeft: 'TDIU o\'quv jarayonining rasmiy dars jadvali · Shakllantirildi:',
    pdfSchedFooterRight: 'TDIU Raqamli Iqtisodiyot Fakulteti Rahbariyati',
    pdfSchedFileName: 'Dars_jadvali',

    pdfVedomUnivTitle: 'TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI',
    pdfVedomFacultyTitle: 'RAQAMLI IQTISODIYOT FAKULTETI · AKADEMIK HISOBOT',
    pdfVedomGroupLabel: 'O\'quv guruhi: AT-31/25r (Raqamli iqtisodiyot)',
    pdfVedomSemesterLabel: 'O\'quv yili: 2026–2027',
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
    notifFooterBtn: 'Tizim boshqaruv paneliga o\'tish',

    // --- Starosta & HEMIS Davomati ---
    starostaTabAttend: 'Juftliklar bo‘yicha jurnal',
    starostaTabGroup: 'Guruh yaratish',
    starostaBadge: 'Elektron mashg‘ulotlar jurnali (HEMIS)',
    starostaTitle: 'Juftliklar bo‘yicha davomat belgilash',
    starostaSubtitle: 'O‘qituvchilar va guruh sardorlari uchun jurnal: 1 juftlik = 2 akademik soat (dars qoldirganda 2 soat NB)',
    starostaGroupLabel: 'Akademik guruh',
    starostaDateLabel: 'Mashg‘ulot sanasi',
    starostaPairLabel: 'Akademik juftlik',
    starostaSubjectLabel: 'Fan / O‘qituvchi',
    starostaSubjectPlaceholder: 'Masalan: Raqamli iqtisodiyot',
    starostaTotalStudents: 'Guruhda',
    starostaPresentLabel: 'Qatnashganlar (0s)',
    starostaAbsentLabel: 'NB (2s qoldirilgan)',
    starostaHoursLabel: 'Juftlikdagi NB soatlari',
    starostaAllPresentBtn: 'Barchasi qatnashdi (0s NB)',
    starostaAllAbsentBtn: 'Barchaga 2s NB belgilash',
    starostaSaveBtn: 'Juftlik davomatini saqlash',
    starostaEmptyState: 'Davomatni boshlash uchun akademik guruhni tanlang',
    starostaThNum: '№',
    starostaThName: 'Talabaning F.I.SH.',
    starostaThGroup: 'Guruh / Kichik guruh',
    starostaThHours: 'NB belgisi (soat)',
    starostaThTodayTotal: 'Kunlik jami',
    starostaThAction: 'Amal',
    starostaDeleteConfirm: 'Talabani guruh tarkibidan o‘chirmoqchimisiz?',

    // --- Student Self-Registration ---
    sregBadge: 'Talabalarning mustaqil ro‘yxatdan o‘tish portali',
    sregTitle: 'Talabaning elektron so‘rovnomasi',
    sregSubtitle: 'Elektron davomat jurnali va qaydnomalarga kiritilish uchun ma’lumotlaringizni to‘ldiring',
    sregInfoAlert: 'Guruhlar bo‘yicha avtomatik taqsimlash: Agar guruhingiz ro‘yxatda bo‘lmasa, «+ Yangi guruh»ni tanlang va uning kodini kiriting. Tizim guruhni avtomatik ro‘yxatga oladi va 13 nafardan 2 ta kichik guruhga ajratadi.',
    sregFullNameLabel: 'Familiya, Ism, Sharif (F.I.SH.) *',
    sregFullNamePlaceholder: 'Masalan: Karimov Sardor Olimovich',
    sregGroupLabel: 'Akademik guruh *',
    sregGroupSelectPlaceholder: '— Guruhni tanlang —',
    sregNewGroupOption: '+ Boshqa (Yangi guruh yaratish)...',
    sregCustomGroupLabel: 'Yangi guruh nomi *',
    sregCustomGroupPlaceholder: 'Masalan: II-12/26',
    sregHemisLabel: 'HEMIS Talaba ID',
    sregHemisPlaceholder: 'Masalan: 394210088',
    sregPhoneLabel: 'Telefon raqami *',
    sregPhonePlaceholder: '+998 90 123-45-67',
    sregEmailLabel: 'Korporativ yoki shaxsiy Email',
    sregEmailPlaceholder: 'student@tsue.uz',
    sregNotesLabel: 'Qo‘shimcha ma’lumot / Izoh',
    sregNotesPlaceholder: 'Masalan: Guruh sardori / sardor o‘rinbosari / faol',
    sregSubmitBtn: 'Guruh reestriga ro‘yxatdan o‘tish'
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
    schedMetaSemesterKey: 'Academic Year:',
    schedSemesterVal: '2026–2027',
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
    cabInfoYearVal: '2026–2027',
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
    sysMetricSemester: 'Academic Year',
    sysMetricSemesterVal: '2026–2027',
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
    pdfSchedSemester: '2026–2027 Academic Year',
    pdfSchedTimeTh: 'Time',
    pdfSchedFooterLeft: 'Official academic schedule of TSUE · Generated:',
    pdfSchedFooterRight: 'Leadership, Faculty of Digital Economy TSUE',
    pdfSchedFileName: 'Timetable',

    pdfVedomUnivTitle: 'TASHKENT STATE UNIVERSITY OF ECONOMICS',
    pdfVedomFacultyTitle: 'FACULTY OF DIGITAL ECONOMY · ACADEMIC RECORD SHEET',
    pdfVedomGroupLabel: 'Study Group: AT-31/25r (Digital Economy)',
    pdfVedomSemesterLabel: 'Academic Year: 2026–2027',
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
    notifFooterBtn: 'Go to system control panel',

    starostaTabAttend: 'Pair-by-Pair Journal',
    starostaTabGroup: 'Create Group',
    starostaBadge: 'Electronic Class Journal (HEMIS)',
    starostaTitle: 'Pair-by-Pair Attendance Registry',
    starostaSubtitle: 'Academic registry for teachers and group starostas: 1 pair = 2 academic hours (2 hours absent when missed)',
    starostaGroupLabel: 'Academic Group',
    starostaDateLabel: 'Session Date',
    starostaPairLabel: 'Academic Pair',
    starostaSubjectLabel: 'Subject / Teacher',
    starostaSubjectPlaceholder: 'E.g. Digital Economy',
    starostaTotalStudents: 'In group',
    starostaPresentLabel: 'Present (0h)',
    starostaAbsentLabel: 'Absent (2h)',
    starostaHoursLabel: 'Absent hours in pair',
    starostaAllPresentBtn: 'All Present (0h Absent)',
    starostaAllAbsentBtn: 'Mark All 2h Absent',
    starostaSaveBtn: 'Save Pair Attendance',
    starostaEmptyState: 'Select an academic group to begin attendance marking',
    starostaThNum: '№',
    starostaThName: 'Student Full Name',
    starostaThGroup: 'Group / Subgroup',
    starostaThHours: 'Absence mark (hours)',
    starostaThTodayTotal: 'Total Today',
    starostaThAction: 'Action',
    starostaDeleteConfirm: 'Delete this student from the group?',

    sregBadge: 'Student Self-Enrollment Portal',
    sregTitle: 'Electronic Student Questionnaire',
    sregSubtitle: 'Enter your academic credentials for enrollment in the electronic journal and grade sheets',
    sregInfoAlert: 'Automated subgroup division: If your group is not listed, select "+ New group" and enter its code. The system will register it and automatically split students into 2 subgroups of 13 students each.',
    sregFullNameLabel: 'Full Name (Last, First, Middle) *',
    sregFullNamePlaceholder: 'e.g., Karimov Sardor Olimovich',
    sregGroupLabel: 'Academic Group *',
    sregGroupSelectPlaceholder: '— Select Group —',
    sregNewGroupOption: '+ Other (Create new group)...',
    sregCustomGroupLabel: 'New Group Name *',
    sregCustomGroupPlaceholder: 'e.g., AI-12/26',
    sregHemisLabel: 'HEMIS Student ID',
    sregHemisPlaceholder: 'e.g., 394210088',
    sregPhoneLabel: 'Phone Number *',
    sregPhonePlaceholder: '+998 90 123-45-67',
    sregEmailLabel: 'University or Personal Email',
    sregEmailPlaceholder: 'student@tsue.uz',
    sregNotesLabel: 'Additional Info / Role',
    sregNotesPlaceholder: 'e.g., Group Starosta / Vice Starosta / Active student',
    sregSubmitBtn: 'Register in Group Roster'
  }
};

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

  setHtml('starostaTabAttend', `<i class="fa-solid fa-clipboard-check"></i> ${t.starostaTabAttend || 'Журнал по парам'}`);
  const starostaBadge = document.querySelector('#starostaPanel-attend .starosta-badge');
  if (starostaBadge && t.starostaBadge) starostaBadge.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${t.starostaBadge}`;
  const starostaH2 = document.querySelector('#starostaPanel-attend .starosta-header h2');
  if (starostaH2 && t.starostaTitle) starostaH2.textContent = t.starostaTitle;
  const starostaP = document.querySelector('#starostaPanel-attend .starosta-header p');
  if (starostaP && t.starostaSubtitle) starostaP.textContent = t.starostaSubtitle;

  const stLabels = document.querySelectorAll('#starostaPanel-attend .auth-modal-label');
  if (stLabels[0] && t.starostaGroupLabel) stLabels[0].innerHTML = `<i class="fa-solid fa-users"></i> ${t.starostaGroupLabel}`;
  if (stLabels[1] && t.starostaDateLabel) stLabels[1].innerHTML = `<i class="fa-solid fa-calendar-day"></i> ${t.starostaDateLabel}`;
  if (stLabels[2] && t.starostaPairLabel) stLabels[2].innerHTML = `<i class="fa-solid fa-clock"></i> ${t.starostaPairLabel}`;
  if (stLabels[3] && t.starostaSubjectLabel) stLabels[3].innerHTML = `<i class="fa-solid fa-book-open"></i> ${t.starostaSubjectLabel}`;

  const subjInput = document.getElementById('starostaSubject');
  if (subjInput && t.starostaSubjectPlaceholder) subjInput.placeholder = t.starostaSubjectPlaceholder;

  const btnAllPres = document.querySelector('.st-all-present');
  if (btnAllPres && t.starostaAllPresentBtn) btnAllPres.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${t.starostaAllPresentBtn}`;
  const btnAllAbs = document.querySelector('.st-all-absent');
  if (btnAllAbs && t.starostaAllAbsentBtn) btnAllAbs.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${t.starostaAllAbsentBtn}`;
  const btnSaveSt = document.querySelector('.st-save-btn');
  if (btnSaveSt && t.starostaSaveBtn) btnSaveSt.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> ${t.starostaSaveBtn}`;

  // --- Student Self-Registration Translations ---
  const sregBadge = document.querySelector('#tab-student-reg .starosta-badge');
  if (sregBadge && t.sregBadge) sregBadge.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${t.sregBadge}`;
  const sregH2 = document.querySelector('#tab-student-reg .student-reg-header h2');
  if (sregH2 && t.sregTitle) sregH2.textContent = t.sregTitle;
  const sregP = document.querySelector('#tab-student-reg .student-reg-header p');
  if (sregP && t.sregSubtitle) sregP.textContent = t.sregSubtitle;

  const sregAlertText = document.querySelector('#tab-student-reg .sreg-info-alert div');
  if (sregAlertText && t.sregInfoAlert) {
    sregAlertText.innerHTML = `<strong>${currentLang === 'uz' ? 'Akademik guruhga ro‘yxatdan o‘tish:' : currentLang === 'en' ? 'Registration in Academic Group:' : 'Регистрация в академической группе:'}</strong> ${t.sregInfoAlert}`;
  }

  const sregLabels = document.querySelectorAll('#studentSelfRegForm .auth-modal-label');
  if (sregLabels[0] && t.sregFullNameLabel) sregLabels[0].textContent = t.sregFullNameLabel;
  if (sregLabels[1] && t.sregGroupLabel) sregLabels[1].textContent = t.sregGroupLabel;
  if (sregLabels[2] && t.sregHemisLabel) sregLabels[2].textContent = t.sregHemisLabel;
  if (sregLabels[3] && t.sregPhoneLabel) sregLabels[3].textContent = t.sregPhoneLabel;
  if (sregLabels[4] && t.sregEmailLabel) sregLabels[4].textContent = t.sregEmailLabel;
  if (sregLabels[5] && t.sregNotesLabel) sregLabels[5].textContent = t.sregNotesLabel;

  const sregFnInput = document.getElementById('sregFullName');
  if (sregFnInput && t.sregFullNamePlaceholder) sregFnInput.placeholder = t.sregFullNamePlaceholder;
  const sregHemisInput = document.getElementById('sregHemisId');
  if (sregHemisInput && t.sregHemisPlaceholder) sregHemisInput.placeholder = t.sregHemisPlaceholder;
  const sregPhoneInput = document.getElementById('sregPhone');
  if (sregPhoneInput && t.sregPhonePlaceholder) sregPhoneInput.placeholder = t.sregPhonePlaceholder;
  const sregEmailInput = document.getElementById('sregEmail');
  if (sregEmailInput && t.sregEmailPlaceholder) sregEmailInput.placeholder = t.sregEmailPlaceholder;
  const sregNotesInput = document.getElementById('sregNotes');
  if (sregNotesInput && t.sregNotesPlaceholder) sregNotesInput.placeholder = t.sregNotesPlaceholder;

  const sregSubmit = document.getElementById('sregSubmitBtn');
  if (sregSubmit && t.sregSubmitBtn) {
    sregSubmit.innerHTML = `<i class="fa-solid fa-user-check"></i> ${t.sregSubmitBtn}`;
  }
}

function updateBreadcrumbCurrentTab(lang) {
  const t = i18n[lang];
  const breadcrumb = document.getElementById('breadcrumbCurrent');
  if (!breadcrumb) return;

  const currentTab = (window.location.hash.replace('#', '') || document.body.dataset.page || (window.location.pathname.split('/').pop().replace('.html','') || 'home'));
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
    cabinet: t.cabTitle || 'Личный Кабинет',
    starosta: 'Модуль старосты',
    'student-reg': 'Регистрация студентов'
  };
  if (labels[currentTab]) breadcrumb.textContent = labels[currentTab];
}

