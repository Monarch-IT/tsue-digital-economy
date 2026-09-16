let facultyData = null;
let currentNewsOffset = 0;
let newsAutoInterval = null;

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

function createLeaderCard(leader, index) {
  const isDean = leader.id === 'akbarov';
  const badgeClass = isDean ? 'leader-badge-dean' : 'leader-badge-deputy';
  const cleanedPhone = leader.phone.replace(/[^0-9+]/g, '');

  return `
    <div class="leader-dossier-card" data-category="${leader.category || 'deanery'}">
      <div class="leader-photo-column">
        <div class="leader-photo-frame">
          <img src="${leader.photo}" alt="${leader.fullName}" loading="lazy"
            onerror="this.parentElement.style.background='#002855';this.style.display='none'">
        </div>
      </div>

      <div class="leader-info-column">
        <div class="leader-status-row">
          <span class="leader-role-tag ${badgeClass}">${leader.role}</span>
          <span class="leader-division-tag">ТГЭУ • Факультет цифровой экономики</span>
        </div>

        <h3 class="leader-full-name">${leader.fullName}</h3>
        <div class="leader-degree-line">${leader.degree}</div>

        <div class="leader-contacts-row">
          <a class="leader-contact-chip" href="tel:${cleanedPhone}">
            <i class="fa-solid fa-phone"></i>
            <span>${leader.phone}</span>
          </a>
          <a class="leader-contact-chip" href="mailto:${leader.email}">
            <i class="fa-solid fa-envelope"></i>
            <span>${leader.email}</span>
          </a>
          <div class="leader-contact-chip">
            <i class="fa-regular fa-clock"></i>
            <span>${leader.reception}</span>
          </div>
          <div class="leader-contact-chip">
            <i class="fa-solid fa-building"></i>
            <span>${leader.room}</span>
          </div>
        </div>

        <p class="leader-bio-paragraph">${leader.bio}</p>
      </div>
    </div>
  `;
}

function renderLeadership(leaders) {
  const fullGrid = document.getElementById('fullLeadershipGrid');
  const homePreview = document.getElementById('homeLeadershipPreview');

  const html = leaders.map((l, i) => createLeaderCard(l, i)).join('');
  if (fullGrid) fullGrid.innerHTML = html;
  if (homePreview) homePreview.innerHTML = html;

  setTimeout(() => {
    document.querySelectorAll('.leader-dossier-card').forEach((el, i) => {
      setTimeout(() => el.classList.add('leader-visible'), i * 70);
    });
  }, 50);
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

  const cardWidth = 346;
  const total = facultyData.news.length;
  const maxOffset = Math.max(0, (total - 3) * cardWidth);

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
