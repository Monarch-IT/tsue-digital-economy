/* =====================================================================
   cabinet.js — Этап 3: Кабинет студента и родителя
   ===================================================================== */

const ST_CONTACT_KEY = 'tsue_st_contact_';

function getStudentContactOverride(userId) {
  try {
    return JSON.parse(localStorage.getItem(ST_CONTACT_KEY + userId) || 'null');
  } catch (e) { return null; }
}

function openStudentEditModal() {
  if (!currentUser) return;
  const overlay = document.getElementById('studentEditModalOverlay');
  if (!overlay) return;
  const override = getStudentContactOverride(currentUser.id || currentUser.username) || {};
  const phone = document.getElementById('stEditPhone');
  const email = document.getElementById('stEditEmail');
  if (phone) phone.value = override.phone || currentUser.phone || '';
  if (email) email.value = override.email || currentUser.email || '';
  const msg = document.getElementById('stEditMsg');
  if (msg) msg.style.display = 'none';
  overlay.classList.add('active');
  overlay.style.display = 'flex';
  setTimeout(() => { if (phone) phone.focus(); }, 60);
}

function closeStudentEditModal(e) {
  if (e && e.target && e.target.id !== 'studentEditModalOverlay') return;
  const overlay = document.getElementById('studentEditModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
}

function saveStudentContact() {
  if (!currentUser) return;
  const phone = (document.getElementById('stEditPhone')?.value || '').trim();
  const email = (document.getElementById('stEditEmail')?.value || '').trim();
  const key = ST_CONTACT_KEY + (currentUser.id || currentUser.username);
  try { localStorage.setItem(key, JSON.stringify({ phone, email })); } catch (e) {}
  currentUser.phone = phone || currentUser.phone;
  currentUser.email = email || currentUser.email;
  try { localStorage.setItem('tsue_auth_user', JSON.stringify(currentUser)); } catch (e) {}
  const ph = document.getElementById('stInfoPhone');
  const em = document.getElementById('stInfoEmail');
  if (ph) ph.textContent = phone || '—';
  if (em) em.textContent = email || '—';
  const msg = document.getElementById('stEditMsg');
  if (msg) {
    msg.style.display = 'flex';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);
  }
  setTimeout(() => {
    const ov = document.getElementById('studentEditModalOverlay');
    if (ov) {
      ov.classList.remove('active');
      ov.style.display = 'none';
    }
  }, 1100);
}

function switchToMySchedule() {
  if (!currentUser) { switchTab('schedule'); return; }
  const roleType = (currentUser.role_type || '').toLowerCase();
  const rawRole = (currentUser.role || '').toLowerCase();
  const isStudent = roleType === 'student' || rawRole.includes('студент');
  const isParent = roleType === 'parent' || rawRole.includes('родитель');
  let group = (isStudent || isParent) ? currentUser.group : null;
  switchTab('schedule');
  if (group) {
    setTimeout(() => {
      const select = document.getElementById('schedGroupSelect');
      if (!select) return;
      const match = Array.from(select.options).find(o => o.value === group || o.value.toLowerCase() === group.toLowerCase());
      if (match) {
        select.value = match.value;
        if (typeof onScheduleGroupChange === 'function') onScheduleGroupChange(match.value);
        else if (typeof renderScheduleGrid === 'function') { window.currentGroup = match.value; renderScheduleGrid(); }
      }
    }, 150);
  }
}

const TYPE_LABELS_CAB = {
  lecture: 'Лекция', practice: 'Практика', lab: 'Лаборат.',
  seminar: 'Семинар', naviyat: 'Навиёт', sport: 'Спорт', other: 'Другое'
};

function getWeekTypeForDate(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((date - start) / 86400000 + start.getDay() + 1) / 7);
  return weekNum % 2 === 0 ? 'even' : 'odd';
}

function findNextLesson(group) {
  if (!group || typeof scheduleData === 'undefined' || !scheduleData[group]) return null;
  const now = new Date();
  const todayJs = now.getDay();
  const dayIdx = todayJs === 0 ? 6 : todayJs - 1;
  const weekType = getWeekTypeForDate(now);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const slotTimes = [[8,0],[9,30],[11,0],[13,0],[14,30],[16,0],[17,30],[19,0]];
  const slotLabels = ['08:00–09:20','09:30–10:50','11:00–12:20','13:00–14:20','14:30–15:50','16:00–17:20','17:30–18:50','19:00–20:20'];
  const DAYS = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const gData = scheduleData[group];
  function findInDay(dIdx, wType, afterMin) {
    const dayData = gData?.[wType]?.[dIdx] || {};
    for (let s = 0; s < slotTimes.length; s++) {
      const slotMin = slotTimes[s][0] * 60 + slotTimes[s][1];
      if (afterMin !== null && slotMin <= afterMin) continue;
      const cell = dayData[s];
      if (!cell || !cell.subject) continue;
      return { slotLabel: slotLabels[s], cell };
    }
    return null;
  }
  let res = findInDay(dayIdx, weekType, nowMin);
  if (res) { res.dayName = 'Сегодня'; return res; }
  let curWeek = weekType;
  for (let delta = 1; delta <= 6; delta++) {
    const nextDay = (dayIdx + delta) % 7;
    if (nextDay === 6) { curWeek = curWeek === 'odd' ? 'even' : 'odd'; continue; }
    res = findInDay(nextDay, curWeek, null);
    if (res) { res.dayName = delta === 1 ? 'Завтра' : DAYS[nextDay]; return res; }
  }
  return null;
}

function renderNextLessonWidget(group, prefix) {
  const widget = document.getElementById(prefix + 'NextLessonWidget');
  const empty = document.getElementById(prefix + 'NoNextLesson');
  if (!widget || !empty) return;
  const lesson = findNextLesson(group);
  if (!lesson) { widget.style.display = 'none'; empty.style.display = 'flex'; return; }
  const { slotLabel, cell, dayName } = lesson;
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set(prefix + 'NextLessonTime', esc(dayName ? dayName + ' · ' + slotLabel : slotLabel));
  set(prefix + 'NextLessonSubj', esc(cell.subject || '—'));
  set(prefix + 'NextLessonRoom', '<i class=fa-solid fa-door-open></i> ' + esc(cell.room || 'Ауд. не указана'));
  set(prefix + 'NextLessonTeacher', '<i class=fa-solid fa-chalkboard-user></i> ' + esc(cell.teacher || '—'));
  set(prefix + 'NextLessonType', '<i class=fa-solid fa-tag></i> ' + esc(TYPE_LABELS_CAB[cell.type] || cell.type || '—'));
  widget.style.display = 'block'; empty.style.display = 'none';
}

function loadParentTutorMessages(studentHemisId) {
  const container = document.getElementById('prTutorMessagesList');
  if (!container) return;
  let messages = [];
  try { const raw = localStorage.getItem('tsue_parent_notifications_' + studentHemisId); if (raw) messages = JSON.parse(raw); } catch (e) {}
  if (!messages || !messages.length) {
    container.innerHTML = '<div class=tc-empty-state><i class=fa-solid fa-envelope></i><p>Нет входящих сообщений от тьютора.</p></div>';
    return;
  }
  messages.sort((a, b) => (b.ts || 0) - (a.ts || 0));
  container.innerHTML = messages.map(msg => {
    const dt = msg.ts ? new Date(msg.ts).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
    const urgent = msg.urgent || (msg.nbHours && msg.nbHours >= 16);
    return '<div class=pr-message-item' + (urgent ? ' pr-message-item--urgent' : '') + '>' +
      '<div class=pr-message-head>' +
        '<span class=pr-message-from><i class=fa-solid fa-user-tie></i> ' + esc(msg.tutorName || 'Dilrabo Vahidovna') + '</span>' +
        '<span class=pr-message-date>' + dt + '</span>' +
        (urgent ? '<span class=pr-message-badge-urgent><i class=fa-solid fa-triangle-exclamation></i> Срочно</span>' : '') +
      '</div>' +
      '<div class=pr-message-text>' + esc(msg.text || '') + '</div>' +
      (msg.nbHours ? '<div class=pr-message-nb><i class=fa-solid fa-clock></i> Часов НБ: <b>' + msg.nbHours + '</b></div>' : '') +
      '</div>';
  }).join('');
}

function initStudentCabinet(user) {
  const override = getStudentContactOverride(user.id || user.username) || {};
  const phone = override.phone || user.phone || '—';
  const email = override.email || user.email || '—';
  const ph = document.getElementById('stInfoPhone');
  const em = document.getElementById('stInfoEmail');
  if (ph) ph.textContent = phone;
  if (em) em.textContent = email;
  const group = user.group || '';
  if (group && typeof scheduleData !== 'undefined') renderNextLessonWidget(group, 'st');
  else { const w=document.getElementById('stNextLessonWidget'); const e2=document.getElementById('stNoNextLesson'); if(w) w.style.display='none'; if(e2) e2.style.display='flex'; }
}

function initParentCabinet(user) {
  const group = user.group || '';
  if (group && typeof scheduleData !== 'undefined') renderNextLessonWidget(group, 'pr');
  else { const w=document.getElementById('prNextLessonWidget'); const e2=document.getElementById('prNoNextLesson'); if(w) w.style.display='none'; if(e2) e2.style.display='flex'; }
  loadParentTutorMessages(user.student_hemis_id || '');
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
