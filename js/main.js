const PARTIALS = [
  'partials/header.html',
  'partials/nav.html',
  'partials/partners.html',
  'partials/footer.html',
  'partials/modals.html',
];
const TAB_PARTIALS = [
  'partials/tabs/home.html',
  'partials/tabs/leadership.html',
  'partials/tabs/departments.html',
  'partials/tabs/forum.html',
  'partials/tabs/history.html',
  'partials/tabs/schedule.html',
  'partials/tabs/cabinet.html',
  'partials/tabs/system.html',
  'partials/tabs/starosta.html',
  'partials/tabs/student-reg.html',
];
async function fetchPartial(url) {
  const res = await fetch(url + '?v=' + (window._TSUE_BUILD_TS || Date.now()));
  if (!res.ok) throw new Error(`Failed to load partial: ${url} (${res.status})`);
  return res.text();
}
async function loadAllPartials() {
  const htmlParts = await Promise.all(PARTIALS.map(fetchPartial));
  const tabHtmlParts = await Promise.all(TAB_PARTIALS.map(fetchPartial));
  const mainContent = `
    <main class="main-content-layout">
      ${tabHtmlParts.join('\n')}
    </main>
  `;
  const fullHTML =
    htmlParts[0] + 
    htmlParts[1] +  
    mainContent +
    htmlParts[2] +  
    htmlParts[3] +  
    htmlParts[4];   
  const root = document.getElementById('app-root');
  if (root) root.remove();
  const temp = document.createElement('div');
  temp.innerHTML = fullHTML;
  while (temp.firstChild) {
    document.body.appendChild(temp.firstChild);
  }
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
   
  if (container.children && container.children.length >= 5) {
    return;
  }
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
   
  const doubled = [...NEWS_DATA, ...NEWS_DATA];
  track.innerHTML = doubled.map(item => {
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
  track.style.animation = 'none';
  track.offsetHeight; 
  track.style.animation = '';
}
function rotateNewsWheel(dir) {}
let currentPartnerIndex = 0;
let partnerAutoPlayTimer = null;

window.goToPartnerSlide = function(idx) {
  currentPartnerIndex = idx;
  updatePartnersArcPositions();
};

function updatePartnersArcPositions() {
  const cards = document.querySelectorAll('.parc-card');
  const count = PARTNERS_DATA.length;
  if (!cards.length) return;

  const lang = window.currentLang || localStorage.getItem('lang') || localStorage.getItem('tsue_lang') || 'ru';

  cards.forEach((card, i) => {
    let diff = (i - currentPartnerIndex);
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    card.className = 'parc-card';
    card.onclick = () => window.goToPartnerSlide(i);

    const absDiff = Math.abs(diff);

     
    if (absDiff <= 3) {
       
      const stepX = 135; 
      const x = diff * stepX;
       
      const y = Math.pow(diff, 2) * 8; 
       
      const scale = Math.max(0.72, 1 - absDiff * 0.095);
       
      const rotY = -diff * 9;
       
      const opacity = Math.max(0.4, 1 - absDiff * 0.2);
      const zIndex = 10 - absDiff;

      card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${-absDiff * 35}px) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity = opacity.toString();
      card.style.zIndex = zIndex.toString();
      card.style.pointerEvents = 'auto';

      if (diff === 0) {
        card.classList.add('parc-active');
      }
    } else {
       
      const side = diff > 0 ? 1 : -1;
      card.style.transform = `translate(-50%, -50%) translate3d(${side * 550}px, 90px, -200px) scale(0.5)`;
      card.style.opacity = '0';
      card.style.zIndex = '0';
      card.style.pointerEvents = 'none';
    }
  });

  const cur = PARTNERS_DATA[currentPartnerIndex];
  const name = cur ? ((cur[lang] && cur[lang].name) || (cur.ru && cur.ru.name) || '') : '';
  const cap = document.getElementById('partnersCaptionText');
  if (cap) {
    cap.textContent = name;
  }
}

function renderPartners(lang) {
  const stage = document.getElementById('partnersArchStage');
  if (!stage) return;
  
  stage.innerHTML = PARTNERS_DATA.map((p, idx) => {
    const l = p[lang] || p.ru;
    return `
      <div class="parc-card" data-index="${idx}" title="${l.name}">
        <div class="parc-card-inner">
          <img src="${p.logo}" alt="${l.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
      </div>
    `;
  }).join('');

  updatePartnersArcPositions();

  if (partnerAutoPlayTimer) clearInterval(partnerAutoPlayTimer);
  partnerAutoPlayTimer = setInterval(() => {
    const count = PARTNERS_DATA.length;
    currentPartnerIndex = (currentPartnerIndex + 1) % count;
    updatePartnersArcPositions();
  }, 1500);

  const wrapper = document.querySelector('.partners-arch-wrapper');
  if (wrapper) {
    wrapper.onmouseenter = () => clearInterval(partnerAutoPlayTimer);
    wrapper.onmouseleave = () => {
      clearInterval(partnerAutoPlayTimer);
      partnerAutoPlayTimer = setInterval(() => {
        const count = PARTNERS_DATA.length;
        currentPartnerIndex = (currentPartnerIndex + 1) % count;
        updatePartnersArcPositions();
      }, 1500);
    };
  }
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
    topSchedLink.classList.toggle('active', tabId === 'schedule');
  }
  updateBreadcrumbCurrentTab(currentLang);
  if (window.scrollY > 400) window.scrollTo({ top: 380, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabId}`);
  if (tabId === 'schedule') renderScheduleGrid();
  if (tabId === 'departments' && typeof renderTeachersRoster === 'function') renderTeachersRoster();
  if (tabId === 'system') {
    renderSystemTab();
    loadTutorRequestsFromSupabase();
  }
  if (tabId === 'tutors') loadTutorsFromSupabase();
  if (tabId === 'starosta') initStarostaModule();
  if (tabId === 'student-reg') initStudentRegModule();
  if (tabId === 'cabinet' && currentUser) {
    const cabinetGuest = document.getElementById('cabinetGuestState');
    const cabinetLogged = document.getElementById('cabinetLoggedState');
    if (cabinetGuest) cabinetGuest.style.display = 'none';
    if (cabinetLogged) cabinetLogged.style.display = 'block';
  }
  document.querySelectorAll('.mb-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
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
let currentDepId = 'dep-raqamli';
let currentDegreeFilter = 'all';

window.selectDepartmentTab = function(depId) {
  currentDepId = depId;
  document.querySelectorAll('.dept-nav-pill').forEach(btn => {
    const isCur = btn.getAttribute('data-depid') === depId;
    btn.style.border = isCur ? '1.5px solid #003B81' : '1.5px solid #e2e8f0';
    btn.style.background = isCur ? '#003B81' : '#ffffff';
    btn.style.color = isCur ? '#ffffff' : '#0b1a3d';
  });
  document.querySelectorAll('.dept-info-panel').forEach(p => {
    p.style.display = p.id === ('info-' + depId) ? 'block' : 'none';
  });
  renderTeachersRoster();
};

window.setTeacherDegreeFilter = function(filter) {
  currentDegreeFilter = filter;
  ['all', 'prof', 'doc'].forEach(f => {
    const el = document.getElementById('degFilter-' + f);
    if (el) {
      el.style.background = f === filter ? '#003B81' : '#fff';
      el.style.color = f === filter ? '#fff' : '#0b1a3d';
      el.style.borderColor = f === filter ? '#003B81' : '#e2e8f0';
    }
  });
  renderTeachersRoster();
};

window.filterTeachers = function() {
  renderTeachersRoster();
};

window.renderTeachersRoster = function() {
  const grid = document.getElementById('teachersRosterGrid');
  if (!grid) return;
  const ktData = window.TSUE_KAFEDRA_DATA || {};
  const teachers = ktData.teachers || [];
  const search = (document.getElementById('teacherSearchInput') ? document.getElementById('teacherSearchInput').value : '').toLowerCase().trim();
  const lang = (window.currentLang || localStorage.getItem('tsue_lang') || 'ru');

  const cardI18n = {
    ru: {
      articles: 'Статей',
      patents: 'Патентов',
      openDossier: 'Открыть досье →',
      notFound: 'Преподаватели по заданным критериям не найдены.'
    },
    uz: {
      articles: 'Maqolalar',
      patents: 'Patentlar',
      openDossier: 'Profilni ochish →',
      notFound: 'Kiritilgan mezonlar bo‘yicha o‘qituvchilar topilmadi.'
    },
    en: {
      articles: 'Articles',
      patents: 'Patents',
      openDossier: 'View Dossier →',
      notFound: 'No faculty members found matching the criteria.'
    }
  };
  const ci = cardI18n[lang] || cardI18n.ru;

  const filtered = teachers.filter(t => {
    const matchDep = !search ? (t.depId === currentDepId) : true;
    if (!matchDep) return false;

    if (currentDegreeFilter === 'prof') {
      const pos = (t.position + ' ' + t.degree).toLowerCase();
      if (!pos.includes('prof') && !pos.includes('проф')) return false;
    } else if (currentDegreeFilter === 'doc') {
      const pos = (t.position + ' ' + t.degree).toLowerCase();
      if (!pos.includes('doc') && !pos.includes('phd') && !pos.includes('dots') && !pos.includes('доц')) return false;
    }

    if (search) {
      const hay = (t.fullName + ' ' + (t.subjects||[]).join(' ') + ' ' + t.room + ' ' + t.depName).toLowerCase();
      return hay.includes(search);
    }
    return true;
  });

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 20px;background:#f8fafc;border-radius:18px;color:#64748b;font-weight:600">${ci.notFound}</div>`;
    return;
  }

  grid.innerHTML = filtered.map(tch => {
    const sa = tch.scientificAchievements || {};
    const posText = (tch.position_i18n && tch.position_i18n[lang]) || tch.position || 'O‘qituvchi';
    const depDisplay = (tch.depName_i18n && tch.depName_i18n[lang]) || tch.depName || 'TDIU';
    return `
      <div class="teacher-mini-card teacher-card-clickable" onclick="openTeacherProfileModal('${tch.id}')"
        style="background:#ffffff;border:1px solid rgba(0,59,129,0.12);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 3px 12px rgba(0,0,0,0.03);position:relative">
        <div style="display:flex;gap:14px;align-items:center">
          <img src="${tch.photo}" alt="${tch.fullName}" 
            style="width:64px;height:64px;border-radius:14px;object-fit:cover;border:2.5px solid #003B81;flex:none;background:#e2e8f0;box-shadow:0 4px 10px rgba(0,0,0,0.08)"
            onerror="this.src='assets/images/faculty_logo.png';this.style.objectFit='contain';this.style.padding='4px'">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;font-size:14.5px;color:#0b1a3d;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden" title="${tch.fullName}">
              ${tch.fullName}
            </div>
            <div style="font-size:12px;color:#0056b3;font-weight:700;margin:3px 0">${posText}</div>
            <div style="font-size:11.5px;color:#64748b;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden"><i class="fa-solid fa-graduation-cap" style="margin-right:4px"></i>${depDisplay}</div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid #f1f5f9;font-size:12px">
          <span style="color:#0056b3;font-weight:700">${ci.openDossier}</span>
          <span style="color:#94a3b8"><i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `;
  }).join('');
};


window.openTeacherProfileModal = function(teacherId) {
  const ktData = window.TSUE_KAFEDRA_DATA || {};
  const t = (ktData.teachers || []).find(x => x.id === teacherId);
  if (!t) return;
  const sa = t.scientificAchievements || {};
  const lang = (window.currentLang || localStorage.getItem('tsue_lang') || 'ru');

  const modal = document.getElementById('teacherProfileModal');
  const body = document.getElementById('teacherProfileBody');
  if (!modal || !body) return;

   
  const modalI18n = {
    ru: {
      bioTitle: 'Краткая биография и деятельность',
      achieveTitle: 'Наукометрические показатели и публикации',
      scopusH: 'Scopus h-index',
      scholarH: 'Google Scholar h-index',
      articles: 'Научных публикаций',
      scopusMono: 'Scopus / Монографий',
      cabinet: 'Кабинет на факультете',
      consultation: 'Часы консультаций со студентами',
      pubsTitle: 'Основные научные труды и публикации:',
      subjectsTitle: 'Преподаваемые дисциплины:',
      viewSched: 'Посмотреть в расписании',
      officialProfile: 'Академический профиль ТГЭУ',
      noOrcid: 'ORCID на верификации'
    },
    uz: {
      bioTitle: 'Qisqacha biografiya va faoliyat',
      achieveTitle: 'Ilmiy-metrik ko‘rsatkichlar va nashrlar',
      scopusH: 'Scopus h-indeks',
      scholarH: 'Google Scholar h-indeks',
      articles: 'Ilmiy nashrlar',
      scopusMono: 'Scopus / Monografiyalar',
      cabinet: 'Fakultetdagi xona',
      consultation: 'Talabalar bilan maslahat soatlari',
      pubsTitle: 'Asosiy ilmiy ishlar va nashrlar:',
      subjectsTitle: 'O‘qitadigan fanlari:',
      viewSched: 'Dars jadvalida ko‘rish',
      officialProfile: 'TDIU Akademik profili',
      noOrcid: 'ORCID tasdiqlanmoqda'
    },
    en: {
      bioTitle: 'Biography & Academic Profile',
      achieveTitle: 'Scientometric Indicators & Publications',
      scopusH: 'Scopus h-index',
      scholarH: 'Google Scholar h-index',
      articles: 'Scientific Publications',
      scopusMono: 'Scopus / Monographs',
      cabinet: 'Faculty Office',
      consultation: 'Student Consultation Hours',
      pubsTitle: 'Selected Scientific Publications:',
      subjectsTitle: 'Taught Subjects & Courses:',
      viewSched: 'View in Timetable',
      officialProfile: 'TSUE Academic Profile',
      noOrcid: 'ORCID Verification in progress'
    }
  };

  const mi = modalI18n[lang] || modalI18n.ru;
  const posText = (t.position_i18n && t.position_i18n[lang]) || t.position || 'O‘qituvchi';
  const degText = (t.degree_i18n && t.degree_i18n[lang]) || t.degree || 'PhD';
  const bioText = (t.bio_i18n && t.bio_i18n[lang]) || t.bio || (t.fullName + ' — TDIU professor-o‘qituvchisi.');

   
  let linksHtml = '';
  if (sa.orcid) {
    const orcidUrl = 'https://orcid.org/' + sa.orcid;
    linksHtml += `<a href="${orcidUrl}" target="_blank" rel="noopener" style="color:#0056b3;text-decoration:none;font-weight:700;display:flex;align-items:center;gap:5px;background:#eef6ff;padding:4px 10px;border-radius:8px">
      <i class="fa-brands fa-orcid" style="color:#a6ce39;font-size:16px"></i> ORCID: ${sa.orcid} ↗
    </a>`;
  }
  if (sa.scopusAuthorId) {
    const scopusUrl = 'https://www.scopus.com/authid/detail.uri?authorId=' + sa.scopusAuthorId;
    linksHtml += `<a href="${scopusUrl}" target="_blank" rel="noopener" style="color:#ea580c;text-decoration:none;font-weight:700;display:flex;align-items:center;gap:5px;background:#fff7ed;padding:4px 10px;border-radius:8px">
      <i class="fa-solid fa-graduation-cap"></i> Scopus Profile ↗
    </a>`;
  }
  if (!linksHtml) {
    linksHtml = `<span style="color:#64748b;font-size:12px;font-weight:600;display:flex;align-items:center;gap:6px">
      <i class="fa-solid fa-circle-check" style="color:#059669"></i> ${mi.officialProfile}
    </span>`;
  }

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;border-bottom:2px solid #eef2f6;padding-bottom:16px">
      <div style="display:flex;gap:18px;align-items:center">
        <img src="${t.photo}" alt="${t.fullName}" 
          style="width:84px;height:84px;border-radius:18px;object-fit:cover;border:3px solid #003B81;box-shadow:0 6px 16px rgba(0,59,129,0.2)"
          onerror="this.src='assets/images/faculty_logo.png'">
        <div>
          <div style="font-size:12px;font-weight:800;color:#0056b3;text-transform:uppercase;letter-spacing:0.5px">${t.depName}</div>
          <h2 style="font-size:22px;font-weight:800;margin:4px 0;color:#0b1a3d">${t.fullName}</h2>
          <div style="font-size:14px;color:#475569;font-weight:600">${posText} · ${degText}</div>
          <div style="font-size:12px;color:#64748b;margin-top:8px;display:flex;gap:10px;flex-wrap:wrap">
            ${linksHtml}
          </div>
        </div>
      </div>
      <button onclick="closeTeacherProfileModal()" style="border:0;background:#f1f5f9;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;cursor:pointer;font-size:18px;color:#334155"><i class="fa-solid fa-xmark"></i></button>
    </div>

    <!-- КРАТКАЯ БИОГРАФИЯ -->
    <div style="background:#f8fafc;border-left:4px solid #003B81;padding:14px 16px;border-radius:10px;font-size:13.5px;color:#334155;margin-bottom:18px;line-height:1.6">
      ${bioText}
    </div>

    <!-- НАУКОМЕТРИЧЕСКИЕ ПОКАЗАТЕЛИ -->
    <div style="font-size:14px;font-weight:800;margin-bottom:8px;color:#0b1a3d;display:flex;align-items:center;gap:8px">
      <i class="fa-solid fa-award" style="color:#d97706"></i> ${mi.achieveTitle}
    </div>
    <div class="teacher-achieve-grid">
      <div class="teacher-achieve-box">
        <div class="teacher-achieve-val" style="color:#047857">${sa.scopusHIndex || 2}</div>
        <div class="teacher-achieve-lbl">${mi.scopusH}</div>
      </div>
      <div class="teacher-achieve-box">
        <div class="teacher-achieve-val" style="color:#1D4ED8">${sa.googleScholarHIndex || 5}</div>
        <div class="teacher-achieve-lbl">${mi.scholarH}</div>
      </div>
      <div class="teacher-achieve-box">
        <div class="teacher-achieve-val">${sa.articlesCount || 16}</div>
        <div class="teacher-achieve-lbl">${mi.articles}</div>
      </div>
      <div class="teacher-achieve-box">
        <div class="teacher-achieve-val" style="color:#003B81">${sa.scopusArticles || 2} / ${sa.monographsCount || 1}</div>
        <div class="teacher-achieve-lbl">${mi.scopusMono}</div>
      </div>
    </div>

    <!-- КАФЕДРА И СТАТУС -->
    <div style="background:#f8fafc;padding:12px 14px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div>
        <div style="color:#64748b;font-size:11.5px;font-weight:700">${lang === 'ru' ? 'Кафедра факультета' : (lang === 'uz' ? 'Fakultet kafedrasi' : 'Faculty Department')}</div>
        <b style="color:#0b1a3d;font-size:13.5px"><i class="fa-solid fa-graduation-cap" style="color:#0056b3;margin-right:6px"></i>${t.depName || 'Raqamli iqtisodiyot fakulteti'}</b>
      </div>
      <div style="text-align:right">
        <div style="color:#64748b;font-size:11.5px;font-weight:700">${lang === 'ru' ? 'Статус' : (lang === 'uz' ? 'Holati' : 'Status')}</div>
        <span style="display:inline-flex;align-items:center;gap:5px;font-weight:700;font-size:12px;color:#047857;background:#ecfdf5;padding:3px 8px;border-radius:6px">
          <i class="fa-solid fa-circle-check"></i> ${lang === 'ru' ? 'Активный' : (lang === 'uz' ? 'Faol' : 'Active')}
        </span>
      </div>
    </div>

    <!-- ОСНОВНЫЕ НАУЧНЫЕ ТРУДЫ И ПУБЛИКАЦИИ -->
    <div style="margin-bottom:18px">
      <div style="font-size:13.5px;font-weight:800;margin-bottom:8px;color:#0b1a3d">${mi.pubsTitle}</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${(sa.recentPublications || [
          '«Raqamli iqtisodiyot va axborot texnologiyalari sohasidagi tadqiqotlar» // TDIU Axborotnomasi, 2024',
          '«Modern digital architecture and security models in economic processes» // Scientific Journal, 2023'
        ]).map(p => `
          <div style="font-size:12.5px;padding:8px 12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;color:#334155;line-height:1.4">
            <i class="fa-solid fa-book-bookmark" style="color:#0056b3;margin-right:6px"></i>${p}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ПРЕПОДАВАЕМЫЕ ДИСЦИПЛИНЫ -->
    <div style="margin-bottom:20px">
      <div style="font-size:13.5px;font-weight:800;margin-bottom:8px;color:#0b1a3d">${mi.subjectsTitle}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${(t.subjects || ['Цифровая экономика', 'Информационные технологии']).map(s => `
          <span style="font-size:12px;padding:6px 12px;background:rgba(0,59,129,0.08);color:#003B81;font-weight:700;border-radius:20px">${s}</span>
        `).join('')}
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid #e2e8f0;font-size:13px">
      <span><i class="fa-solid fa-envelope" style="color:#0056b3;margin-right:6px"></i><b style="color:#0b1a3d">${t.email || (t.id + '@tsue.uz')}</b></span>
      <button class="btn sm" onclick="closeTeacherProfileModal();switchTab('schedule');" style="background:#003B81;color:#fff;border-radius:20px;padding:8px 18px;font-weight:700;border:0;cursor:pointer">
        <i class="fa-solid fa-calendar-day" style="margin-right:6px"></i>${mi.viewSched}
      </button>
    </div>
  `;
  modal.classList.add('open');
};


window.closeTeacherProfileModal = function() {
  const modal = document.getElementById('teacherProfileModal');
  if (modal) modal.classList.remove('open');
};

 
setTimeout(function() {
  if (typeof renderTeachersRoster === 'function') renderTeachersRoster();
}, 100);


async function initApp() {
  const savedTheme = localStorage.getItem('tsue_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
  try {
    await loadAllPartials();
    if (savedTheme === 'dark') {
      const icon = document.getElementById('themeIcon');
      if (icon) icon.className = 'fa-solid fa-sun';
    }
    initAccessibility();
    initLangSelector();
    setLanguage(currentLang);
    initScheduleModule();
    if (typeof initTimetableWidget === 'function') {
      initTimetableWidget();
    }
    checkSavedAuthSession();
    loadTutorsFromSupabase();
    loadNotificationsFromSupabase();
    newsAutoInterval = setInterval(() => rotateNewsWheel(1), 6000);
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'leadership', 'departments', 'forum', 'history', 'schedule', 'system', 'cabinet', 'starosta', 'student-reg'];
    if (hash && validTabs.includes(hash)) {
      switchTab(hash);
      if (hash === 'departments' && typeof renderTeachersRoster === 'function') {
        renderTeachersRoster();
      }
    }
    initPwaController();
  } catch (err) {
    console.error('[TSUE] Failed to load application partials:', err);
    const loadingScreen = document.getElementById('app-loading-screen');
    if (loadingScreen) {
      loadingScreen.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100vh;
          flex-direction:column;gap:16px;background:#0a1628;color:#ef4444;
          font-family:'Outfit',sans-serif;text-align:center;padding:32px;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size:48px;"></i>
          <h2 style="margin:0;">Ошибка загрузки портала</h2>
          <p style="color:#94a3b8;max-width:480px;">
            Не удалось загрузить компоненты приложения. Убедитесь, что вы работаете через веб-сервер (не открываете файл напрямую через file://).
          </p>
          <button onclick="location.reload()" style="
            background:#2563eb;color:#fff;border:none;padding:12px 28px;
            border-radius:8px;font-size:15px;cursor:pointer;font-family:inherit;">
            Перезагрузить
          </button>
        </div>
      `;
    }
  }
}
function toggleMobileDrawer() {
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (!overlay) return;
  overlay.classList.toggle('active');
  document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
}
function closeMobileDrawer() {
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
function closeMobileDrawerOnOverlay(e) {
  if (e.target.id === 'mobileDrawerOverlay') {
    closeMobileDrawer();
  }
}
function mobileSwitchTab(tabId) {
  switchTab(tabId);
  closeMobileDrawer();
}
let _deferredPrompt = null;
let _isIos = false;
let _isStandalone = false;
function initPwaController() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.warn('[PWA] Service worker registration failed:', err);
    });
  }
  const userAgent = (window.navigator.userAgent || '').toLowerCase();
  _isIos = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
  _isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (_isStandalone) return;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredPrompt = e;
    showPwaBanner();
  });
  const isMobileScreen = window.innerWidth <= 768 || _isIos;
  if (isMobileScreen) {
    setTimeout(showPwaBanner, 1500);
  }
}
function showPwaBanner() {
  const isNative = window.isNativeApp || window.Android || /wv|AndroidApp|RIAT_iOS/i.test(navigator.userAgent);
  if (isNative || _isStandalone) return;
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) {
    banner.style.display = 'flex';
  }
}
function dismissPwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
}
function handlePwaInstallClick() {
  if (_isIos) {
    if (_deferredPrompt) {
      _deferredPrompt.prompt();
      _deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult && choiceResult.outcome === 'accepted') {
          dismissPwaBanner();
        }
      }).catch(() => {});
      return;
    }
    openIosInstallModal();
  } else {
    const link = document.createElement('a');
    link.href = '/app/latest.apk';
    link.download = 'riat-tdiu.apk';
    document.body.appendChild(link);
    link.click();
    link.remove();
    dismissPwaBanner();
  }
}
function openIosInstallModal() {
  const overlay = document.getElementById('iosInstallModalOverlay');
  if (overlay) overlay.classList.add('active');
}
function closeIosInstallModal() {
  const overlay = document.getElementById('iosInstallModalOverlay');
  if (overlay) overlay.classList.remove('active');
}
function closeIosInstallModalOnOverlay(e) {
  if (e.target.id === 'iosInstallModalOverlay') {
    closeIosInstallModal();
  }
}
function openAndroidInstallModal() {
  const overlay = document.getElementById('androidInstallModalOverlay');
  if (overlay) overlay.classList.add('active');
}
function closeAndroidInstallModal() {
  const overlay = document.getElementById('androidInstallModalOverlay');
  if (overlay) overlay.classList.remove('active');
}
function closeAndroidInstallModalOnOverlay(e) {
  if (e.target.id === 'androidInstallModalOverlay') {
    closeAndroidInstallModal();
  }
}
document.addEventListener('DOMContentLoaded', initApp);



