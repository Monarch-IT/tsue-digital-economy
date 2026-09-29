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
