const ADMIN_ACCOUNTS = {
  'tsue-monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Факультет цифровой экономики', id: 'TSUE-Monarch' },
  'riat-monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Факультет цифровой экономики', id: 'TSUE-Monarch' },
  'monarch': { user: 'TSUE-Monarch', pass: 'Dodash2008', name: 'Monarch (Администратор системы)', role: 'Супер-администратор', group: 'Факультет цифровой экономики', id: 'TSUE-Monarch' },
  'tsue-dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'riat-dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'dekan': { user: 'TSUE-Dekan', pass: 'TSUE-RIAT', name: 'Руководство (ФЦЭ ТГЭУ)', role: 'Руководитель факультета', group: 'Все направления факультета' },
  'dilrabo': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: AT 31', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' },
  'dilrabo-vahidovna': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: AT 31', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' },
  'tutor-dilrabo': { user: 'dilrabo', pass: 'tutor2025', name: 'Dilrabo Vahidovna', role: 'Тьютор факультета', group: 'Куратор групп: AT 31', email: 'dilrabo.vahidovna@tsue.uz', id: 'tutor-dilrabo-vahidovna' },
  'teacher': { user: 'teacher', pass: 'teacher2025', name: 'Test Teacher', role: 'Преподаватель кафедры', group: 'Кафедра «Цифровая экономика»', email: 'teacher@tsue.uz', id: 'teacher-main' },
  'oqituvchi': { user: 'teacher', pass: 'teacher2025', name: 'Test Teacher', role: 'Преподаватель кафедры', group: 'Кафедра «Цифровая экономика»', email: 'teacher@tsue.uz', id: 'teacher-main' },
  'tsue-teacher': { user: 'teacher', pass: 'teacher2025', name: 'Test Teacher', role: 'Преподаватель кафедры', group: 'Кафедра «Цифровая экономика»', email: 'teacher@tsue.uz', id: 'teacher-main' }
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
  if (!localStorage.getItem('tsue_data_migrated')) {
    localStorage.removeItem('tsue_tutor_students_tutor-dilrabo-vahidovna');
    localStorage.removeItem('tsue_tutor_students_dilrabo');
    localStorage.removeItem('tsue_tutor_students_TSUE-Monarch');
    localStorage.removeItem('tsue_self_registered_students');
    localStorage.setItem('tsue_data_migrated', '1');
  }

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

  const isTeacher = rawRole.includes('преподават') || rawRole.includes('teacher') || rawRole.includes('o‘qituvchi') || rawRole.includes('oqituvchi');
  const isTutor = rawRole.includes('tutor') || rawRole.includes('тьютор');

  const cabTeacherCard = document.getElementById('cabTeacherCard');
  if (cabTeacherCard) {
    cabTeacherCard.style.display = (isTeacher || isTutor || isAdmin) ? 'flex' : 'none';
  }

  const tutorModule = document.getElementById('tutorCabinetModule');
  if (tutorModule) {
    tutorModule.style.display = (isTutor || isAdmin) ? 'block' : 'none';
    if (isTutor || isAdmin) {
      const today = new Date().toISOString().split('T')[0];
      const dateInput = document.getElementById('tcAttendDate');
      if (dateInput) dateInput.value = today;
      loadTutorStudents();
    }
  }

  const teacherModule = document.getElementById('teacherCabinetModule');
  if (teacherModule) {
    teacherModule.style.display = isTeacher ? 'block' : 'none';
    if (isTeacher) {
      if (typeof initTeacherCabinet === 'function') initTeacherCabinet();
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
