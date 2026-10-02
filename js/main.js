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
  'partials/tabs/directions.html',
  'partials/tabs/forum.html',
  'partials/tabs/history.html',
  'partials/tabs/schedule.html',
  'partials/tabs/tutors.html',
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
    topSchedLink.classList.toggle('active', tabId === 'schedule');
  }

  updateBreadcrumbCurrentTab(currentLang);

  if (window.scrollY > 400) window.scrollTo({ top: 380, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabId}`);

  if (tabId === 'schedule') renderScheduleGrid();
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
    checkSavedAuthSession();
    loadTutorsFromSupabase();
    loadNotificationsFromSupabase();

    newsAutoInterval = setInterval(() => rotateNewsWheel(1), 6000);

    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'leadership', 'departments', 'directions', 'tutors', 'forum', 'history', 'schedule', 'system', 'cabinet', 'starosta', 'student-reg'];
    if (hash && validTabs.includes(hash)) {
      switchTab(hash);
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

  const dismissed = localStorage.getItem('tsue_pwa_dismissed') === 'true';

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredPrompt = e;
    if (!dismissed) {
      showPwaBanner();
    }
  });

  const isMobileScreen = window.innerWidth <= 768 || _isIos;
  if (isMobileScreen && !dismissed) {
    setTimeout(showPwaBanner, 3000);
  }
}

function showPwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner && !_isStandalone) {
    banner.style.display = 'flex';
  }
}

function dismissPwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  localStorage.setItem('tsue_pwa_dismissed', 'true');
}

function handlePwaInstallClick() {
  if (_deferredPrompt) {
    _deferredPrompt.prompt();
    _deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult && choiceResult.outcome === 'accepted') {
        dismissPwaBanner();
      }
      _deferredPrompt = null;
    }).catch(() => {
      _deferredPrompt = null;
    });
    return;
  }

  if (_isIos) {
    openIosInstallModal();
  } else {
    openAndroidInstallModal();
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

