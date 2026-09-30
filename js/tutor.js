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
  } catch (e) { }
  return [];
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
          <th>Дата рожд. / Адрес</th>
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
              <div style="font-size:11px; font-weight:600; color:#0f766e;"><i class="fa-solid fa-cake-candles"></i> ${escapeHtml(st.birth_date || '—')}</div>
              <div style="font-size:11px; color:#64748b; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeHtml(st.permanent_address || '')}">
                <i class="fa-solid fa-location-dot"></i> ${escapeHtml(st.permanent_address || '—')}
              </div>
            </td>
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
  const groups = new Set(tutorStudents.map(s => s.group_name).filter(Boolean));
  if (groupsEl) {
    groupsEl.textContent = groups.size > 0 ? Array.from(groups).join(', ') : '—';
  }

  const attendGroupFilter = document.getElementById('tcAttendGroupFilter');
  if (attendGroupFilter) {
    const curVal = attendGroupFilter.value;
    const sortedGroups = Array.from(groups).sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }));
    attendGroupFilter.innerHTML = '<option value="">— Все группы —</option>' +
      sortedGroups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
    if (sortedGroups.includes(curVal)) attendGroupFilter.value = curVal;
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
  const bInp = document.getElementById('studentBirthDateInput');
  if (bInp) bInp.value = '';
  const aInp = document.getElementById('studentAddressInput');
  if (aInp) aInp.value = '';
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
  const bInp = document.getElementById('studentBirthDateInput');
  if (bInp) bInp.value = st.birth_date || '';
  const aInp = document.getElementById('studentAddressInput');
  if (aInp) aInp.value = st.permanent_address || '';
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
  const birthDate = (document.getElementById('studentBirthDateInput')?.value || '').trim();
  const address = (document.getElementById('studentAddressInput')?.value || '').trim();
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
    birth_date: birthDate,
    permanent_address: address,
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

      let headerRowIdx = -1;
      let colIdxName = 0;
      let colIdxGroup = -1;
      let colIdxSubgroup = -1;
      let colIdxPhone = -1;
      let colIdxEmail = -1;
      let colIdxHemis = -1;

      let detectedGroup = firstSheetName && firstSheetName.length < 15 && !firstSheetName.toLowerCase().includes('sheet') ? firstSheetName : '';

      for (let r = 0; r < Math.min(rows.length, 10); r++) {
        const row = rows[r];
        if (!row) continue;
        const rowStr = row.map(c => String(c || '')).join(' ').toLowerCase();

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
          for (let c = 0; c < Math.min(row.length, 5); c++) {
            const v = String(row[c] || '').trim();
            if (v && isNaN(v) && v.length > 5 && (v.includes(' ') || v.length > 8)) {
              fullName = v;
              break;
            }
          }
        }

        if (!fullName || fullName.length < 3) continue;
        const lowerName = fullName.toLowerCase();
        if (lowerName.includes('fish') || lowerName.includes('фио') || lowerName.includes('fakulteti') || lowerName.includes('davomati')) continue;

        let phone = colIdxPhone >= 0 && row[colIdxPhone] ? String(row[colIdxPhone]).trim() : '';
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

function exportStudentsExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Библиотека XLSX ещё загружается, подождите пару секунд...');
    return;
  }
  if (!tutorStudents || tutorStudents.length === 0) {
    alert('Реестр студентов пуст. Нет данных для экспорта.');
    return;
  }

  const rows = [
    ['ТОШКЕНТ ДАВЛАТ ИҚТИСОДИЁТ УНИВЕРСИТЕТИ'],
    ['РАҚАМЛИ ИҚТИСОДИЁТ ФАКУЛЬТЕТИ ТАЛАБАЛАР РЕЕСТРИ'],
    ['Шакллантирилган сана: ' + new Date().toLocaleDateString('ru-RU')],
    [],
    ['№', 'Ф.И.Ш. Студент', 'Гуруҳ', 'Подгуруҳ', 'HEMIS ID', 'Туғилган санаси', 'Доимий манзил', 'Телефон', 'Email', 'Қайдлар']
  ];

  tutorStudents.forEach((st, idx) => {
    rows.push([
      idx + 1,
      st.full_name || st.student_name || '—',
      st.group_name || '—',
      st.subgroup || '1',
      st.hemis_id || '—',
      st.birth_date || '—',
      st.permanent_address || '—',
      st.phone || '—',
      st.email || '—',
      st.notes || ''
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 5 },
    { wch: 38 },
    { wch: 14 },
    { wch: 10 },
    { wch: 16 },
    { wch: 16 },
    { wch: 35 },
    { wch: 18 },
    { wch: 26 },
    { wch: 25 }
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Talabalar_Royxati');
  XLSX.writeFile(wb, `TSUE_Talabalar_Reestri_${new Date().toISOString().split('T')[0]}.xlsx`);
}

function exportStudentsPDF() {
  if (!tutorStudents || tutorStudents.length === 0) {
    alert('Реестр студентов пуст. Нет данных для печати.');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const rowsHtml = tutorStudents.map((st, idx) => `
    <tr>
      <td style="text-align:center;">${idx + 1}</td>
      <td style="font-weight:600;">${escapeHtml(st.full_name || st.student_name || '—')}</td>
      <td style="text-align:center;">${escapeHtml(st.group_name || '—')}</td>
      <td style="text-align:center;">${escapeHtml(st.subgroup || '1')}</td>
      <td style="text-align:center;">${escapeHtml(st.hemis_id || '—')}</td>
      <td>${escapeHtml(st.birth_date || '—')}</td>
      <td>${escapeHtml(st.permanent_address || '—')}</td>
      <td>${escapeHtml(st.phone || '—')}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Реестр студентов — ТГЭУ Факультет Цифровой Экономики</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 24px; color: #1e293b; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #0f766e; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { font-size: 16px; margin: 0 0 4px; text-transform: uppercase; color: #0f172a; }
        .header h2 { font-size: 14px; margin: 0 0 6px; color: #0f766e; }
        .header p { font-size: 11px; margin: 0; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
        tr:nth-child(even) { background: #f8fafc; }
        .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 12px; page-break-inside: avoid; }
        .sign-block { width: 250px; border-top: 1px solid #000; padding-top: 4px; text-align: center; }
        @media print { body { margin: 10mm; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI</h1>
        <h2>RAQAMLI IQTISODIYOT FAKULTETI</h2>
        <p>Talabalar rasmiy reestri • Sana: ${new Date().toLocaleDateString('ru-RU')}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:25px;">#</th>
            <th>Ф.И.Ш. Студент</th>
            <th style="width:70px;text-align:center;">Гуруҳ</th>
            <th style="width:40px;text-align:center;">П/г</th>
            <th style="width:90px;text-align:center;">HEMIS ID</th>
            <th style="width:80px;">Туғилган сана</th>
            <th>Доимий манзил</th>
            <th style="width:100px;">Телефон</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
      <div class="footer">
        <div>
          <div style="font-weight:bold; margin-bottom:40px;">Декан факультета:</div>
          <div class="sign-block">Акбаров Нодир Гафурович</div>
        </div>
        <div>
          <div style="font-weight:bold; margin-bottom:40px;">Тьютор курса:</div>
          <div class="sign-block">${escapeHtml(currentUser?.name || 'Вахидова Дилрабо')}</div>
        </div>
      </div>
      <script>
        window.onload = function() { window.print(); };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function exportAttendancePDF() {
  const container = document.getElementById('tcStatsContent');
  const table = container?.querySelector('table');
  if (!table) {
    alert('Нет рассчитанных данных по посещаемости для экспорта.');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const periodText = document.getElementById('tcStatsPeriod')?.selectedOptions[0]?.text || '30 дней';
  const groupText = document.getElementById('tcStatsGroupFilter')?.selectedOptions[0]?.text || 'Все группы';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Ведомость посещаемости и НБ — ТГЭУ</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 24px; color: #1e293b; font-size: 12px; }
        .header { text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { font-size: 16px; margin: 0 0 4px; text-transform: uppercase; color: #0f172a; }
        .header h2 { font-size: 13px; margin: 0 0 6px; color: #1e3a8a; }
        .header p { font-size: 11px; margin: 0; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11px; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
        th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
        tr:nth-child(even) { background: #f8fafc; }
        .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; page-break-inside: avoid; }
        .sign-block { width: 250px; border-top: 1px solid #000; padding-top: 4px; text-align: center; }
        @media print { body { margin: 10mm; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI</h1>
        <h2>RAQAMLI IQTISODIYOT FAKULTETI • TALABALAR DAVOMATI VA NB VEDOMOSTI</h2>
        <p>Фильтр: ${escapeHtml(groupText)} • Период: ${escapeHtml(periodText)} • Дата выгрузки: ${new Date().toLocaleDateString('ru-RU')}</p>
      </div>
      ${table.outerHTML}
      <div class="footer">
        <div>
          <div style="font-weight:bold; margin-bottom:40px;">Декан факультета:</div>
          <div class="sign-block">Акбаров Нодир Гафурович</div>
        </div>
        <div>
          <div style="font-weight:bold; margin-bottom:40px;">Тьютор курса:</div>
          <div class="sign-block">${escapeHtml(currentUser?.name || 'Вахидова Дилрабо')}</div>
        </div>
      </div>
      <script>
        window.onload = function() { window.print(); };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function downloadTutorTemplateExcel(isStats = false) {
  if (typeof XLSX === 'undefined') {
    alert('Библиотека XLSX ещё загружается, подождите пару секунд...');
    return;
  }

  if (isStats) {
    const days = parseInt(document.getElementById('tcStatsPeriod')?.value || '30', 10);
    const groupFilter = document.getElementById('tcStatsGroupFilter')?.value || '';
    const filteredStudents = groupFilter
      ? tutorStudents.filter(s => s.group_name === groupFilter)
      : tutorStudents;

    const rows = [
      ['ТОШКЕНТ ДАВЛАТ ИҚТИСОДИЁТ УНИВЕРСИТЕТИ'],
      ['РАҚАМЛИ ИҚТИСОДИЁТ ФАКУЛЬТЕТИ ТАЛАБАЛАРИНИНГ ДАВОМАТ ВА НБ ВЕДОМОСТИ'],
      ['Шакллантирилган сана: ' + new Date().toLocaleDateString('ru-RU') + ' (Ҳисобланган давр: сўнгги ' + days + ' кун)'],
      [],
      ['№', 'Ф.И.Ш. Студент', 'Гуруҳ', 'Подгуруҳ', 'HEMIS ID', 'Ўтказилган жуфтликлар (Пар)', 'Жами НБ соати', 'НБ қайд этилган кунлар', 'HEMIS регламент ҳолати']
    ];

    filteredStudents.forEach((st, idx) => {
      let totalNbHours = 0;
      let totalNbPairs = 0;
      let daysWithNb = 0;

      for (let d = 0; d < days; d++) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - d);
        const dateStr = targetDate.toISOString().split('T')[0];
        try {
          const dayRaw = localStorage.getItem(`tsue_hemis_attend_${dateStr}`);
          if (dayRaw) {
            const dayMap = JSON.parse(dayRaw);
            const stData = dayMap[st.id];
            if (stData) {
              let dayNb = 0;
              ['1', '2', '3', '4'].forEach(p => {
                if (stData[p] === 2) {
                  totalNbHours += 2;
                  totalNbPairs += 1;
                  dayNb += 2;
                }
              });
              if (dayNb > 0) daysWithNb += 1;
            }
          }
        } catch (e) { }
      }

      let statusStr = '0-6 соат (Нормада)';
      if (totalNbHours >= 26) statusStr = '26+ соат (Критик / Четлатиш)';
      else if (totalNbHours >= 16) statusStr = '16-24 соат (Юқори хавф)';
      else if (totalNbHours >= 8) statusStr = '8-14 соат (Огоҳлантириш)';

      rows.push([
        idx + 1,
        st.full_name || st.student_name || '—',
        st.group_name || '—',
        st.subgroup || '1',
        st.hemis_id || '—',
        totalNbPairs,
        totalNbHours + ' соат',
        daysWithNb,
        statusStr
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [
      { wch: 5 },
      { wch: 38 },
      { wch: 14 },
      { wch: 10 },
      { wch: 16 },
      { wch: 25 },
      { wch: 16 },
      { wch: 22 },
      { wch: 28 }
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'HEMIS_Davomat_Vedomost');
    XLSX.writeFile(wb, `HEMIS_Davomat_TSUE_${new Date().toISOString().split('T')[0]}.xlsx`);
    return;
  }

  const sampleData = [
    ['TDIU Raqamli iqtisodiyot fakulteti talabalarini import qilish uchun SHABLON'],
    [],
    ['№', 'FISH', 'Guruh', 'Podguruh', 'Tel', 'Email', 'HEMIS ID', 'Tugilgan_sana', 'Manzil'],
    [1, 'МАХМУДЖОНОВА ХУШНОРА МУХТОРЖОН КИЗИ', 'AT 31', '1', '+998901234561', 'kh.makhmudjonova@tsue.uz', '394210001', '2004-05-12', 'г. Ташкент'],
    [2, 'АНВАРЖОНОВ ДИЁРБЕК РУСТАМОВИЧ', 'AT 31', '1', '+998940021163', 'd.anvarjonov@tsue.uz', '394210002', '2004-08-20', 'г. Самарканд']
  ];

  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  ws['!cols'] = [
    { wch: 5 },
    { wch: 42 },
    { wch: 14 },
    { wch: 10 },
    { wch: 18 },
    { wch: 28 },
    { wch: 14 },
    { wch: 15 },
    { wch: 25 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Shablon_Import');
  XLSX.writeFile(wb, 'Shablon_Talabalar_TSUE.xlsx');
}

let teacherAttendData = {};
let teacherSubjectGroups = {};

function initTeacherCabinet() {
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('teacherAttendDate');
  if (dateEl) dateEl.value = today;

  buildTeacherSubjectGroups();
  populateTeacherSubjectSelect();
}

function buildTeacherSubjectGroups() {
  teacherSubjectGroups = {};

  if (typeof EDUPAGE_SCHEDULE_DATA !== 'undefined') {
    Object.entries(EDUPAGE_SCHEDULE_DATA).forEach(([groupName, gData]) => {
      ['odd', 'even'].forEach(w => {
        Object.values(gData[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(lesson => {
            if (!lesson || !lesson.subject) return;
            const subj = lesson.subject.trim();
            if (!teacherSubjectGroups[subj]) teacherSubjectGroups[subj] = new Set();
            teacherSubjectGroups[subj].add(groupName);
          });
        });
      });
    });
  }

  if (typeof scheduleData !== 'undefined') {
    Object.entries(scheduleData).forEach(([groupName, gData]) => {
      ['odd', 'even'].forEach(w => {
        Object.values(gData[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(lesson => {
            if (!lesson || !lesson.subject) return;
            const subj = lesson.subject.trim();
            if (!teacherSubjectGroups[subj]) teacherSubjectGroups[subj] = new Set();
            teacherSubjectGroups[subj].add(groupName);
          });
        });
      });
    });
  }
}

function populateTeacherSubjectSelect() {
  const sel = document.getElementById('teacherSubjectSelect');
  if (!sel) return;
  const subjects = Object.keys(teacherSubjectGroups).sort();
  sel.innerHTML = '<option value="">— Выберите предмет —</option>' +
    subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
}

function onTeacherSubjectChange() {
  const subj = document.getElementById('teacherSubjectSelect')?.value || '';
  const groupSel = document.getElementById('teacherGroupSelect');
  const statsSel = document.getElementById('teacherStatsGroupSelect');
  const searchInp = document.getElementById('teacherGroupSearchInput');
  if (searchInp) searchInp.value = '';
  const statsSearchInp = document.getElementById('teacherStatsGroupSearchInput');
  if (statsSearchInp) statsSearchInp.value = '';

  const groups = subj ? [...(teacherSubjectGroups[subj] || [])].sort((a,b) => a.localeCompare(b, 'ru', { numeric: true })) : [];

  if (groupSel) {
    groupSel.innerHTML = '<option value="">— Группа —</option>' +
      groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
  }

  if (statsSel) {
    statsSel.innerHTML = '<option value="">— Все группы —</option>' +
      groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
  }

  loadTeacherAttendance();
}

function filterTeacherGroupSelect(query) {
  const subj = document.getElementById('teacherSubjectSelect')?.value || '';
  const groupSel = document.getElementById('teacherGroupSelect');
  if (!groupSel) return;
  const q = (query || '').trim().toLowerCase();

  let groups = subj
    ? [...(teacherSubjectGroups[subj] || [])].sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }))
    : Object.keys(typeof EDUPAGE_SCHEDULE_DATA !== 'undefined' ? EDUPAGE_SCHEDULE_DATA : {}).sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }));

  if (q) {
    groups = groups.filter(g => g.toLowerCase().includes(q));
  }

  const prevVal = groupSel.value;
  groupSel.innerHTML = '<option value="">— Группа —</option>' +
    groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');

  if (groups.includes(prevVal)) {
    groupSel.value = prevVal;
  } else if (groups.length === 1 && q) {
    groupSel.value = groups[0];
    loadTeacherAttendance();
  } else {
    loadTeacherAttendance();
  }
}

function filterTeacherStatsGroupSelect(query) {
  const subj = document.getElementById('teacherSubjectSelect')?.value || '';
  const statsSel = document.getElementById('teacherStatsGroupSelect');
  if (!statsSel) return;
  const q = (query || '').trim().toLowerCase();

  let groups = subj
    ? [...(teacherSubjectGroups[subj] || [])].sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }))
    : Object.keys(typeof EDUPAGE_SCHEDULE_DATA !== 'undefined' ? EDUPAGE_SCHEDULE_DATA : {}).sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }));

  if (q) {
    groups = groups.filter(g => g.toLowerCase().includes(q));
  }

  const prevVal = statsSel.value;
  statsSel.innerHTML = '<option value="">— Все группы —</option>' +
    groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');

  if (groups.includes(prevVal)) {
    statsSel.value = prevVal;
  } else if (groups.length === 1 && q) {
    statsSel.value = groups[0];
    loadTeacherStats();
  } else {
    loadTeacherStats();
  }
}

function filterTutorAttendGroupSelect(query) {
  const filterSel = document.getElementById('tcAttendGroupFilter');
  if (!filterSel) return;
  const q = (query || '').trim().toLowerCase();

  const allGroups = Array.from(new Set((tutorStudents || []).map(s => s.group_name).filter(Boolean)))
    .sort((a,b) => a.localeCompare(b, 'ru', { numeric: true }));

  let groups = allGroups;
  if (q) {
    groups = groups.filter(g => g.toLowerCase().includes(q));
  }

  const prevVal = filterSel.value;
  filterSel.innerHTML = '<option value="">— Все группы —</option>' +
    groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');

  if (groups.includes(prevVal)) {
    filterSel.value = prevVal;
  } else if (groups.length === 1 && q) {
    filterSel.value = groups[0];
  } else {
    filterSel.value = '';
  }

  loadAttendanceForDate(document.getElementById('tcAttendDate')?.value);
}

function switchTeacherTab(tab) {
  document.querySelectorAll('#teacherCabinetModule .tc-tab-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`#teacherCabinetModule .tc-tab-btn[data-tc-tab="${tab}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  document.getElementById('tcTeacherTab-attend').style.display = tab === 'teacher-attend' ? '' : 'none';
  document.getElementById('tcTeacherTab-stats').style.display = tab === 'teacher-stats' ? '' : 'none';

  if (tab === 'teacher-stats') loadTeacherStats();
}

function getTeacherStorageKey(subject, group, date) {
  const safeSubj = (subject || '').replace(/[^a-zA-Z0-9а-яёА-ЯЁ]/gi, '_');
  return `tsue_teacher_attend_${safeSubj}_${group}_${date}`;
}

function loadTeacherAttendance() {
  const subject = document.getElementById('teacherSubjectSelect')?.value || '';
  const group = document.getElementById('teacherGroupSelect')?.value || '';
  const date = document.getElementById('teacherAttendDate')?.value || '';
  const listEl = document.getElementById('teacherAttendList');
  if (!listEl) return;

  if (!subject || !group || !date) {
    listEl.innerHTML = '<div class="tc-empty-state"><i class="fa-solid fa-chalkboard-user"></i><p>Выберите предмет, группу и дату.</p></div>';
    return;
  }

  const students = (tutorStudents || []).filter(s => (s.group_name || '') === group);

  if (students.length === 0) {
    listEl.innerHTML = `<div class="tc-empty-state"><i class="fa-solid fa-users-slash"></i><p>В группе <b>${escapeHtml(group)}</b> нет студентов в реестре тьютора.<br><small>Данные по группе загружаются тьютором.</small></p></div>`;
    return;
  }

  let saved = {};
  try {
    const raw = localStorage.getItem(getTeacherStorageKey(subject, group, date));
    if (raw) saved = JSON.parse(raw);
  } catch (e) {}

  teacherAttendData = {};
  students.forEach(st => {
    teacherAttendData[st.id] = saved[st.id] !== undefined ? saved[st.id] : 0;
  });

  renderTeacherAttendList(students, group, date);
}

function renderTeacherAttendList(students, group, date) {
  const listEl = document.getElementById('teacherAttendList');
  if (!listEl) return;

  const dateLabel = date ? new Date(date + 'T00:00:00').toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  let html = `<div style="padding:10px 0 6px; font-size:12px; color:#94a3b8; font-weight:600; letter-spacing:.04em; text-transform:uppercase;">${escapeHtml(group)} · ${escapeHtml(dateLabel)}</div>`;

  students.forEach((st, idx) => {
    const val = teacherAttendData[st.id] ?? 0;
    const isAbsent = val > 0;
    html += `
      <div class="tc-attend-row${isAbsent ? ' tc-attend-row--absent' : ''}" id="teacherRow_${st.id}">
        <div class="tc-attend-num">${idx + 1}</div>
        <div class="tc-attend-name">
          <div class="tc-student-name">${escapeHtml(st.full_name || st.student_name || '—')}</div>
          <div class="tc-student-meta">${escapeHtml(st.hemis_id || '')}${st.subgroup ? ' · п/г ' + st.subgroup : ''}</div>
        </div>
        <div class="tc-attend-controls">
          <button class="tc-attend-btn tc-attend-btn--present${!isAbsent ? ' active' : ''}" onclick="setTeacherAttend('${st.id}', 0)" title="Присутствует">
            <i class="fa-solid fa-circle-check"></i>
          </button>
          <button class="tc-attend-btn tc-attend-btn--absent${isAbsent ? ' active' : ''}" onclick="setTeacherAttend('${st.id}', 2)" title="НБ — 2 часа">
            <i class="fa-solid fa-circle-xmark"></i> НБ
          </button>
        </div>
        <div class="tc-attend-hours" id="teacherHours_${st.id}" style="color:${isAbsent ? '#f87171' : '#22c55e'}; font-weight:700; min-width:40px; text-align:center;">
          ${isAbsent ? '2ч' : '0ч'}
        </div>
      </div>`;
  });

  listEl.innerHTML = html;
}

function setTeacherAttend(studentId, val) {
  teacherAttendData[studentId] = val;
  const row = document.getElementById(`teacherRow_${studentId}`);
  const hours = document.getElementById(`teacherHours_${studentId}`);
  if (row) {
    row.classList.toggle('tc-attend-row--absent', val > 0);
    row.querySelectorAll('.tc-attend-btn--present').forEach(b => b.classList.toggle('active', val === 0));
    row.querySelectorAll('.tc-attend-btn--absent').forEach(b => b.classList.toggle('active', val > 0));
  }
  if (hours) {
    hours.textContent = val > 0 ? `${val}ч` : '0ч';
    hours.style.color = val > 0 ? '#f87171' : '#22c55e';
  }
}

async function saveTeacherAttendance() {
  const subject = document.getElementById('teacherSubjectSelect')?.value || '';
  const group = document.getElementById('teacherGroupSelect')?.value || '';
  const date = document.getElementById('teacherAttendDate')?.value || '';
  const lessonType = document.getElementById('teacherLessonType')?.value || 'lecture';

  if (!subject || !group || !date) {
    alert('Заполните предмет, группу и дату перед сохранением.');
    return;
  }

  try {
    localStorage.setItem(getTeacherStorageKey(subject, group, date), JSON.stringify(teacherAttendData));
  } catch (e) {}

  if (supabaseClient) {
    try {
      const teacherId = currentUser?.id || 'teacher-main';
      const records = Object.entries(teacherAttendData).map(([studentId, nbHours]) => ({
        student_id: studentId,
        tutor_id: teacherId,
        date: date,
        subject: subject,
        lesson_type: lessonType,
        group_name: group,
        nb_hours: nbHours,
        pair_num: 0
      }));

      const { error } = await supabaseClient
        .from('tutor_attendance')
        .upsert(records, { onConflict: 'student_id,date,subject,pair_num' });

      if (error) console.warn('Supabase save:', error.message);
    } catch (e) {
      console.warn('Supabase teacher attendance save error:', e);
    }
  }

  const btn = document.querySelector('#teacherCabinetModule .sched-btn--primary');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Сохранено!';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
  }
}

function loadTeacherStats() {
  const subject = document.getElementById('teacherSubjectSelect')?.value || '';
  const groupFilter = document.getElementById('teacherStatsGroupSelect')?.value || '';
  const container = document.getElementById('teacherStatsContent');
  if (!container) return;

  if (!subject) {
    container.innerHTML = '<div class="tc-empty-state"><i class="fa-solid fa-chart-pie"></i><p>Выберите предмет.</p></div>';
    return;
  }

  const groups = groupFilter
    ? [groupFilter]
    : [...(teacherSubjectGroups[subject] || [])];

  const allStudents = (tutorStudents || []).filter(s => groups.includes(s.group_name || ''));

  if (allStudents.length === 0) {
    container.innerHTML = '<div class="tc-empty-state"><i class="fa-solid fa-users-slash"></i><p>Нет студентов в реестре для выбранных групп.</p></div>';
    return;
  }

  const statsMap = {};
  allStudents.forEach(st => { statsMap[st.id] = { student: st, total: 0 }; });

  groups.forEach(grp => {
    for (let d = 0; d < 90; d++) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - d);
      const dateStr = targetDate.toISOString().split('T')[0];
      try {
        const raw = localStorage.getItem(getTeacherStorageKey(subject, grp, dateStr));
        if (!raw) continue;
        const dayMap = JSON.parse(raw);
        Object.entries(dayMap).forEach(([sid, nb]) => {
          if (statsMap[sid]) statsMap[sid].total += (nb || 0);
        });
      } catch (e) {}
    }
  });

  let rows = '';
  let totalNb = 0;
  Object.values(statsMap).forEach((entry, idx) => {
    const { student: st, total } = entry;
    totalNb += total;
    let status = '<span style="color:#22c55e; font-weight:700;">В норме</span>';
    if (total >= 26) status = '<span style="color:#f87171; font-weight:700;">Критично</span>';
    else if (total >= 16) status = '<span style="color:#fb923c; font-weight:700;">Высокий риск</span>';
    else if (total >= 8) status = '<span style="color:#fbbf24; font-weight:700;">Предупреждение</span>';

    rows += `<tr style="border-bottom:1px solid #1e293b;">
      <td style="padding:8px 6px; color:#64748b; font-weight:700;">${idx + 1}</td>
      <td style="padding:8px 6px; font-weight:600; color:#e2e8f0;">${escapeHtml(st.full_name || '—')}</td>
      <td style="padding:8px 6px; text-align:center;"><span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:#1e3a5f;color:#7dd3fc;">${escapeHtml(st.group_name || '—')}</span></td>
      <td style="padding:8px 6px; text-align:center; color:#f87171; font-weight:700;">${total}ч</td>
      <td style="padding:8px 6px; text-align:center;">${status}</td>
    </tr>`;
  });

  container.innerHTML = `
    <div style="margin-bottom:14px; font-size:13px; color:#94a3b8; font-weight:600;">
      Предмет: <span style="color:#7dd3fc;">${escapeHtml(subject)}</span> &nbsp;·&nbsp;
      Студентов: <span style="color:#e2e8f0;">${allStudents.length}</span> &nbsp;·&nbsp;
      Всего НБ: <span style="color:#f87171;">${totalNb}ч</span>
    </div>
    <div style="overflow-x:auto;">
    <table style="width:100%; border-collapse:collapse; font-size:13px;">
      <thead>
        <tr style="background:#0f172a; color:#94a3b8; font-size:11px; text-transform:uppercase; letter-spacing:.04em;">
          <th style="padding:8px 6px; text-align:left; width:35px;">№</th>
          <th style="padding:8px 6px; text-align:left;">Ф.И.О.</th>
          <th style="padding:8px 6px; text-align:center; width:90px;">Группа</th>
          <th style="padding:8px 6px; text-align:center; width:70px;">НБ (ч)</th>
          <th style="padding:8px 6px; text-align:center; width:130px;">Статус</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    </div>`;
}

function exportTeacherStatsPDF() {
  const subject = document.getElementById('teacherSubjectSelect')?.value || '';
  const container = document.getElementById('teacherStatsContent');
  const table = container?.querySelector('table');
  if (!table) { alert('Нет данных для экспорта. Сначала откройте вкладку «Сводка по группе».'); return; }

  const printWindow = window.open('', '_blank');
  if (!printWindow) { window.print(); return; }

  printWindow.document.write(`<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8">
    <title>Ведомость НБ — ${escapeHtml(subject)}</title>
    <style>
      body { font-family:'Segoe UI',Arial,sans-serif; margin:24px; color:#1e293b; font-size:12px; }
      .header { text-align:center; border-bottom:2px solid #1e3a8a; padding-bottom:12px; margin-bottom:16px; }
      h1 { font-size:15px; margin:0 0 4px; text-transform:uppercase; }
      h2 { font-size:13px; margin:0 0 6px; color:#1e3a8a; }
      p { font-size:11px; margin:0; color:#64748b; }
      table { width:100%; border-collapse:collapse; font-size:11px; }
      th,td { border:1px solid #cbd5e1; padding:6px 8px; text-align:left; }
      th { background:#f1f5f9; font-weight:700; }
      tr:nth-child(even) { background:#f8fafc; }
      .footer { margin-top:30px; display:flex; justify-content:space-between; font-size:12px; }
      .sign-block { width:240px; border-top:1px solid #000; padding-top:4px; text-align:center; }
      @media print { body { margin:10mm; } }
    </style></head><body>
    <div class="header">
      <h1>TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI</h1>
      <h2>RAQAMLI IQTISODIYOT FAKULTETI · DARS QOLDIRISH VEDOMOSTI (NB)</h2>
      <p>Fan: ${escapeHtml(subject)} · Sana: ${new Date().toLocaleDateString('ru-RU')}</p>
    </div>
    ${table.outerHTML}
    <div class="footer">
      <div><div style="font-weight:bold;margin-bottom:38px;">O'qituvchi:</div><div class="sign-block">${escapeHtml(currentUser?.name || '—')}</div></div>
      <div><div style="font-weight:bold;margin-bottom:38px;">Dekan:</div><div class="sign-block">Akbarov Nodir G'ofurovich</div></div>
    </div>
    <script>window.onload=function(){window.print()};<\/script>
    </body></html>`);
  printWindow.document.close();
}

function exportTeacherStatsExcel() {
  if (typeof XLSX === 'undefined') { alert('XLSX загружается...'); return; }
  const subject = document.getElementById('teacherSubjectSelect')?.value || '';
  const groupFilter = document.getElementById('teacherStatsGroupSelect')?.value || '';

  const groups = groupFilter
    ? [groupFilter]
    : [...(teacherSubjectGroups[subject] || [])];

  const allStudents = (tutorStudents || []).filter(s => groups.includes(s.group_name || ''));

  const rows = [
    ['TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI'],
    ['RAQAMLI IQTISODIYOT FAKULTETI — DARS QOLDIRISH (NB) VEDOMOSTI'],
    [`Fan: ${subject} · Sana: ${new Date().toLocaleDateString('ru-RU')}`],
    [],
    ['№', 'F.I.Sh.', 'Guruh', 'NB soat', 'Holat']
  ];

  allStudents.forEach((st, idx) => {
    let total = 0;
    groups.forEach(grp => {
      for (let d = 0; d < 90; d++) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - d);
        const dateStr = targetDate.toISOString().split('T')[0];
        try {
          const raw = localStorage.getItem(getTeacherStorageKey(subject, grp, dateStr));
          if (!raw) continue;
          const dayMap = JSON.parse(raw);
          total += dayMap[st.id] || 0;
        } catch (e) {}
      }
    });

    let status = 'Normada';
    if (total >= 26) status = 'Kritik / Chetlatish';
    else if (total >= 16) status = 'Yuqori xavf';
    else if (total >= 8) status = 'Ogohlantirish';

    rows.push([idx + 1, st.full_name || '—', st.group_name || '—', `${total} soat`, status]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 5 }, { wch: 38 }, { wch: 14 }, { wch: 12 }, { wch: 22 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'NB_Vedomost');
  XLSX.writeFile(wb, `NB_${(subject || 'Subject').replace(/[^a-zA-Z0-9а-яёА-ЯЁ]/gi, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
}
