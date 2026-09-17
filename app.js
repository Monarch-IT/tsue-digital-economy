let facultyData = null;
let currentNewsOffset = 0;
let newsAutoInterval = null;
let leaderIndex = 0;
let allLeaders = [];

function switchTab(tabId) {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  const sections = document.querySelectorAll('.page-tab-section');
  sections.forEach(sec => {
    sec.classList.toggle('active', sec.id === `tab-${tabId}`);
  });

  const breadcrumb = document.getElementById('breadcrumbCurrent');
  const labels = {
    home: 'Факультет цифровой экономики',
    leadership: 'Руководство и Деканат',
    departments: 'Кафедры факультета',
    directions: 'Направления обучения',
    forum: 'Форум Факультета',
    history: 'История и Инновации'
  };
  if (breadcrumb && labels[tabId]) breadcrumb.textContent = labels[tabId];
  if (window.scrollY > 400) window.scrollTo({ top: 380, behavior: 'smooth' });
  history.replaceState(null, '', `#${tabId}`);
}

function createLeaderCarouselCard(leader) {
  const isDean = leader.id === 'akbarov';
  const roleTag = isDean ? 'ДЕКАН ФАКУЛЬТЕТА' : leader.role.toUpperCase();
  const cleanedPhone = leader.phone.replace(/[^0-9+]/g, '');

  return `
    <div class="lcc-slide">
      <div class="lcc-content">
        <div class="lcc-top-row">
          <span class="lcc-role-tag">${roleTag}</span>
          <span class="lcc-institution">ТГЭУ • Факультет цифровой экономики</span>
        </div>
        <h2 class="lcc-name">${leader.fullName}</h2>
        <div class="lcc-degree">${leader.degree}</div>

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
            <span>${leader.reception}</span>
          </div>
          ${leader.room ? `<div class="lcc-contact-row">
            <span class="lcc-icon"><i class="fa-solid fa-building"></i></span>
            <span>${leader.room}</span>
          </div>` : ''}
        </div>

        <p class="lcc-bio">${leader.bio}</p>
      </div>

      <div class="lcc-photo-col">
        <img src="${leader.photo}" alt="${leader.fullName}" loading="lazy"
          onerror="this.parentElement.style.background='linear-gradient(160deg,#002855,#001428)';this.style.display='none'">
      </div>
    </div>
  `;
}

function renderLeaderCarousel(containerId, leaders) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  wrap.innerHTML = `
    <div class="lcc-wrapper">
      <div class="lcc-track" id="lccTrack_${containerId}">
        ${leaders.map(l => createLeaderCarouselCard(l)).join('')}
      </div>
      <div class="lcc-nav">
        <button class="lcc-nav-btn" onclick="shiftLeader('${containerId}', -1)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="lcc-dots" id="lccDots_${containerId}">
          ${leaders.map((_, i) => `<button class="lcc-dot ${i === 0 ? 'active' : ''}" onclick="goToLeader('${containerId}', ${i})"></button>`).join('')}
        </div>
        <button class="lcc-nav-btn" onclick="shiftLeader('${containerId}', 1)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;

  // Store index per container
  wrap._leaderIndex = 0;
}

function shiftLeader(containerId, dir) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const track = document.getElementById('lccTrack_' + containerId);
  const dots = document.querySelectorAll(`#lccDots_${containerId} .lcc-dot`);
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

  wrap._leaderIndex = idx;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

function renderLeadership(leaders) {
  renderLeaderCarousel('fullLeadershipGrid', leaders);
  renderLeaderCarousel('homeLeadershipPreview', leaders);
}

function renderDepartments(departments) {
  const container = document.getElementById('departmentsContainer');
  if (!container) return;

  const icons = [
    'fa-solid fa-laptop-code',
    'fa-solid fa-chart-line',
    'fa-solid fa-square-root-variable',
    'fa-solid fa-user-shield',
    'fa-solid fa-lightbulb'
  ];

  container.innerHTML = departments.map((d, index) => {
    const icon = icons[index % icons.length];
    return `
      <div class="dept-card">
        <div class="dept-icon-badge"><i class="${icon}"></i></div>
        <h3 class="dept-title">${d.name}</h3>
        <div class="dept-head"><i class="fa-solid fa-user-tie"></i> ${d.head}</div>
        <p class="dept-desc">${d.description}</p>
        <div class="dept-programs-label">Направления кафедры:</div>
        <div class="dept-programs-chips">
          ${d.programs.map(p => `<span class="program-chip">${p}</span>`).join('')}
        </div>
        <div class="dept-footer-meta">
          <span><i class="fa-solid fa-users"></i> ${d.studentsCount} студентов</span>
          <span><i class="fa-solid fa-flask"></i> ${d.labs}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderNews(newsList) {
  const track = document.getElementById('newsWheelTrack');
  if (!track || !newsList) return;

  track.innerHTML = newsList.map(n => `
    <a class="news-wheel-card" href="${n.link || '#'}" target="_blank" rel="noopener">
      <div class="news-card-thumb-wrap">
        <img src="${n.image}" alt="${n.title}" loading="lazy"
          onerror="this.parentElement.classList.add('no-img');this.style.display='none'">
        <span class="news-card-tag-overlay">${n.tag || 'Новость'}</span>
      </div>
      <div class="news-card-body">
        <h4 class="news-card-title">${n.title}</h4>
        <div class="news-card-footer">
          <span><i class="fa-regular fa-calendar"></i> ${n.date}</span>
          <span class="news-read-link">Читать <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    </a>
  `).join('');
}

function rotateNewsWheel(dir) {
  const track = document.getElementById('newsWheelTrack');
  if (!track || !facultyData || !facultyData.news) return;

  const cardWidth = 416;
  const visibleCards = window.innerWidth < 900 ? 1 : (window.innerWidth < 1200 ? 2 : 3);
  const total = facultyData.news.length;
  const maxOffset = Math.max(0, (total - visibleCards) * cardWidth);

  currentNewsOffset += dir * cardWidth;
  if (currentNewsOffset < 0) currentNewsOffset = maxOffset;
  if (currentNewsOffset > maxOffset) currentNewsOffset = 0;

  track.style.transform = `translateX(-${currentNewsOffset}px)`;
}

function renderPartners(partnersList) {
  const track = document.getElementById('partnersWheelTrack');
  if (!track || !partnersList) return;

  const doubled = [...partnersList, ...partnersList];
  track.innerHTML = doubled.map(p => `
    <div class="partner-logo-item">
      <div class="partner-icon-circ" style="background:${p.color}18;color:${p.color};border-color:${p.color}40;">
        <i class="${p.icon}"></i>
      </div>
      <div class="partner-text-box">
        <span class="partner-name">${p.name}</span>
        <span class="partner-short">${p.shortName}</span>
      </div>
    </div>
  `).join('');
}

function renderForumTopics(topics) {
  const container = document.getElementById('forumTopicsList');
  if (!container || !topics) return;

  container.innerHTML = topics.map(t => `
    <div class="forum-topic-card">
      <div class="forum-topic-left">
        <div class="forum-topic-meta">
          <span class="forum-cat-badge">${t.category}</span>
          <span><i class="${t.avatar}"></i> ${t.author}</span>
          <span><i class="fa-regular fa-clock"></i> ${t.time}</span>
        </div>
        <h4 class="forum-topic-title">${t.title}</h4>
        <p class="forum-topic-text">${t.text}</p>
      </div>
      <div class="forum-topic-stats">
        <span class="forum-stats-pill"><i class="fa-solid fa-comment-dots"></i> ${t.replies} ответов</span>
        <span><i class="fa-regular fa-eye"></i> ${t.views} просм.</span>
      </div>
    </div>
  `).join('');
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
    alert('Пожалуйста, заполните заголовок и текст темы.');
    return;
  }

  const newTopic = {
    id: `forum-${Date.now()}`,
    author: 'Вы (Студент ТГЭУ)',
    avatar: 'fa-solid fa-circle-user',
    category: cat,
    title,
    replies: 0,
    views: 1,
    time: 'Только что',
    text
  };

  facultyData.forumTopics.unshift(newTopic);
  renderForumTopics(facultyData.forumTopics);
  document.getElementById('newTopicTitle').value = '';
  document.getElementById('newTopicText').value = '';
  toggleForumModal(false);
}

function openReceptionModal() {
  switchTab('leadership');
  alert('Приёмные часы деканата:\nПонедельник — Пятница: 14:00 - 17:00\nТелефон для записи: +998 71 239-01-29\nГлавный корпус ТГЭУ, каб. 214');
}

async function initApp() {
  try {
    const response = await fetch('faculty_curated.json');
    facultyData = await response.json();

    renderLeadership(facultyData.leaders);
    renderDepartments(facultyData.departments);
    renderNews(facultyData.news);
    renderPartners(facultyData.partners);
    renderForumTopics(facultyData.forumTopics);

    newsAutoInterval = setInterval(() => rotateNewsWheel(1), 5000);

    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'leadership', 'departments', 'directions', 'forum', 'history'].includes(hash)) {
      switchTab(hash);
    }
  } catch (error) {
    console.error('Failed to load faculty data:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);
