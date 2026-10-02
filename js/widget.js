let _widgetConfig = {
  theme: 'glass-light',
  opacity: 88,
  targetType: 'group',
  targetValue: '',
  notifyMinutes: 10,
  soundEnabled: true
};

let _widgetExpanded = false;
let _notifiedSlots = new Set();

const WIDGET_SLOT_TIMES = [
  { pair: 1, start: '08:00', end: '09:20', sMin: 8 * 60, eMin: 9 * 60 + 20 },
  { pair: 2, start: '09:30', end: '10:50', sMin: 9 * 60 + 30, eMin: 10 * 60 + 50 },
  { pair: 3, start: '11:00', end: '12:20', sMin: 11 * 60, eMin: 12 * 60 + 20 },
  { pair: 4, start: '13:00', end: '14:20', sMin: 13 * 60, eMin: 14 * 60 + 20 },
  { pair: 5, start: '14:30', end: '15:50', sMin: 14 * 60 + 30, eMin: 15 * 60 + 50 },
  { pair: 6, start: '16:00', end: '17:20', sMin: 16 * 60, eMin: 17 * 60 + 20 },
  { pair: 7, start: '17:30', end: '18:50', sMin: 17 * 60 + 30, eMin: 18 * 60 + 50 },
  { pair: 8, start: '19:00', end: '20:20', sMin: 19 * 60, eMin: 20 * 60 + 20 }
];

function initTimetableWidget() {
  loadWidgetConfig();
  renderTimetableWidget();
  setInterval(updateTimetableWidgetState, 30000);
}

function loadWidgetConfig() {
  try {
    const saved = localStorage.getItem('riat_widget_config');
    if (saved) {
      _widgetConfig = Object.assign(_widgetConfig, JSON.parse(saved));
    }
  } catch (e) {}

  if (!_widgetConfig.targetValue) {
    if (typeof currentGroup !== 'undefined' && currentGroup) {
      _widgetConfig.targetValue = currentGroup;
    } else if (typeof scheduleData !== 'undefined' && Object.keys(scheduleData).length) {
      _widgetConfig.targetValue = Object.keys(scheduleData)[0];
    } else {
      _widgetConfig.targetValue = 'AT-31/25r';
    }
  }
}

function saveWidgetConfig() {
  try {
    localStorage.setItem('riat_widget_config', JSON.stringify(_widgetConfig));
  } catch (e) {}
}

function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playTone = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };
    playTone(523.25, 0.0, 0.35);
    playTone(659.25, 0.12, 0.35);
    playTone(783.99, 0.24, 0.55);
  } catch (err) {
    console.warn('Audio chime playback failed:', err);
  }
}

function getWidgetScheduleForToday() {
  const now = new Date();
  const rawDay = now.getDay();
  const dayIdx = rawDay === 0 ? 0 : rawDay - 1;

  const isEvenWeek = typeof getCurrentWeekType === 'function' ? getCurrentWeekType() === 'even' : false;
  const weekKey = isEvenWeek ? 'even' : 'odd';

  const type = _widgetConfig.targetType || 'group';
  const val = _widgetConfig.targetValue || '';

  const dayLessons = [];

  if (typeof scheduleData === 'undefined' || !scheduleData) {
    return { dayIdx, weekKey, lessons: [] };
  }

  if (type === 'group') {
    const grp = scheduleData[val];
    const slotsObj = grp?.[weekKey]?.[dayIdx] || grp?.['odd']?.[dayIdx] || {};
    WIDGET_SLOT_TIMES.forEach(slot => {
      const card = slotsObj[slot.pair - 1] || slotsObj[String(slot.pair - 1)];
      if (card && card.subject) {
        dayLessons.push({
          slot,
          ...card,
          group: val
        });
      }
    });
  } else if (type === 'teacher') {
    const tVal = val.toLowerCase();
    const found = {};
    Object.keys(scheduleData).forEach(gName => {
      const grp = scheduleData[gName];
      const slotsObj = grp?.[weekKey]?.[dayIdx] || {};
      Object.keys(slotsObj).forEach(sIdx => {
        const card = slotsObj[sIdx];
        if (card && card.teacher && card.teacher.toLowerCase().includes(tVal)) {
          const p = parseInt(sIdx, 10) + 1;
          const slot = WIDGET_SLOT_TIMES.find(s => s.pair === p);
          if (slot && !found[p]) {
            found[p] = { slot, ...card, group: gName };
          }
        }
      });
    });
    Object.keys(found).sort((a,b) => a-b).forEach(p => dayLessons.push(found[p]));
  } else if (type === 'room') {
    const rVal = val.toLowerCase();
    const found = {};
    Object.keys(scheduleData).forEach(gName => {
      const grp = scheduleData[gName];
      const slotsObj = grp?.[weekKey]?.[dayIdx] || {};
      Object.keys(slotsObj).forEach(sIdx => {
        const card = slotsObj[sIdx];
        if (card && card.room && card.room.toLowerCase().includes(rVal)) {
          const p = parseInt(sIdx, 10) + 1;
          const slot = WIDGET_SLOT_TIMES.find(s => s.pair === p);
          if (slot && !found[p]) {
            found[p] = { slot, ...card, group: gName };
          }
        }
      });
    });
    Object.keys(found).sort((a,b) => a-b).forEach(p => dayLessons.push(found[p]));
  }

  return { dayIdx, weekKey, lessons: dayLessons };
}

function getWidgetCurrentOrNextLesson(lessons) {
  if (!lessons || lessons.length === 0) return null;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const l of lessons) {
    if (currentMinutes >= l.slot.sMin && currentMinutes < l.slot.eMin) {
      return { lesson: l, status: 'current' };
    }
  }

  for (const l of lessons) {
    if (currentMinutes < l.slot.sMin) {
      return { lesson: l, status: 'next' };
    }
  }

  return { lesson: lessons[lessons.length - 1], status: 'finished' };
}

function renderTimetableWidget() {
  const container = document.getElementById('timetableWidgetContainer');
  if (!container) return;

  const { lessons } = getWidgetScheduleForToday();
  const currentInfo = getWidgetCurrentOrNextLesson(lessons);
  const activeLesson = currentInfo ? currentInfo.lesson : null;
  const status = currentInfo ? currentInfo.status : 'empty';

  const opacityRatio = Math.max(0.1, Math.min(1, (_widgetConfig.opacity || 88) / 100));

  let themeClass = 'theme-glass-light';
  if (_widgetConfig.theme === 'glass-dark') themeClass = 'theme-glass-dark';
  if (_widgetConfig.theme === 'glass-oled') themeClass = 'theme-glass-oled';

  const bgStyle = `--widget-opacity: ${opacityRatio};`;

  const totalLessons = lessons.length;
  const targetLabel = _widgetConfig.targetValue || 'Выберите цель';

  let html = `
    <div class="tt-widget-root ${themeClass}" style="${bgStyle}">
      <!-- Header / Target Bar -->
      <div class="tt-widget-header">
        <div class="tt-widget-target-chip" onclick="openWidgetConfigModal()" title="Настроить цель и оформление">
          <i class="fa-solid ${_widgetConfig.targetType === 'teacher' ? 'fa-user-tie' : (_widgetConfig.targetType === 'room' ? 'fa-door-open' : 'fa-users')}"></i>
          <span class="tt-target-text">${escapeHtml(targetLabel)}</span>
          <i class="fa-solid fa-chevron-down tt-chip-arrow"></i>
        </div>
        <div class="tt-widget-actions">
          <button class="tt-widget-icon-btn" onclick="testWidgetSound()" title="Проверить звуковой сигнал">
            <i class="fa-solid fa-bell"></i>
          </button>
          <button class="tt-widget-icon-btn" onclick="openWidgetConfigModal()" title="Настройки виджета">
            <i class="fa-solid fa-gear"></i>
          </button>
        </div>
      </div>

      <!-- Main Lesson Card (Collapsed View) -->
      ${renderWidgetMainCard(activeLesson, status)}

      <!-- Expand Toggle Button -->
      <div class="tt-widget-expand-bar">
        <button class="tt-widget-expand-btn" onclick="toggleWidgetExpand()">
          <span>Все пары на сегодня (${totalLessons})</span>
          <i class="fa-solid fa-chevron-${_widgetExpanded ? 'up' : 'down'}"></i>
        </button>
      </div>

      <!-- Expanded Lessons Drawer -->
      <div class="tt-widget-expanded-drawer ${_widgetExpanded ? 'open' : ''}">
        ${renderWidgetAllLessons(lessons, activeLesson)}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderWidgetMainCard(lesson, status) {
  if (!lesson) {
    return `
      <div class="tt-widget-card empty-card">
        <div class="tt-widget-accent-bar"></div>
        <div class="tt-widget-body">
          <div class="tt-empty-title">Занятий на сегодня нет</div>
          <div class="tt-empty-sub">Отдыхайте или выберите другую группу в настройках</div>
        </div>
      </div>
    `;
  }

  const typeLabel = (lesson.type || 'LECTURE').toUpperCase();
  const pairNum = lesson.slot.pair;
  const timeStr = `${lesson.slot.start}–${lesson.slot.end}`;

  let statusBadge = '';
  if (status === 'current') {
    statusBadge = '<span class="tt-live-pill"><span class="tt-live-dot"></span>ИДЁТ СЕЙЧАС</span>';
  } else if (status === 'finished') {
    statusBadge = '<span class="tt-finished-pill">ЗАВЕРШЕНО</span>';
  }

  return `
    <div class="tt-widget-card ltype-${lesson.type || 'lecture'}">
      <div class="tt-widget-accent-bar"></div>
      <div class="tt-widget-body">
        <div class="tt-widget-top-meta">
          <span class="tt-meta-pair">${pairNum} пара · ${timeStr}</span>
          <div class="tt-meta-tags">
            ${statusBadge}
            <span class="tt-type-badge">${typeLabel}</span>
          </div>
        </div>
        <h3 class="tt-widget-title" title="${escapeHtml(lesson.subject)}">
          ${escapeHtml(lesson.subject)}
        </h3>
        <div class="tt-widget-details-row">
          <div class="tt-detail-item" title="Преподаватель">
            <i class="fa-regular fa-user"></i>
            <span>${escapeHtml(lesson.teacher || 'Преподаватель')}</span>
          </div>
          <div class="tt-detail-item" title="Аудитория">
            <i class="fa-solid fa-chalkboard-user"></i>
            <span>${escapeHtml(lesson.room || 'Кабинет')}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWidgetAllLessons(lessons, activeLesson) {
  if (!lessons || lessons.length === 0) {
    return '<div class="tt-drawer-empty">На сегодня расписание пусто</div>';
  }

  return lessons.map(l => {
    const isActive = activeLesson && activeLesson.slot.pair === l.slot.pair;
    return `
      <div class="tt-drawer-item ${isActive ? 'active-item' : ''} ltype-${l.type || 'lecture'}">
        <div class="tt-di-time">
          <strong>${l.slot.pair} пара</strong>
          <span>${l.slot.start}</span>
        </div>
        <div class="tt-di-body">
          <div class="tt-di-title">${escapeHtml(l.subject)}</div>
          <div class="tt-di-meta">
            <span><i class="fa-regular fa-user"></i> ${escapeHtml(l.teacher || '—')}</span>
            <span><i class="fa-solid fa-chalkboard"></i> ${escapeHtml(l.room || '—')}</span>
          </div>
        </div>
        <span class="tt-di-badge">${(l.type || 'лек').toUpperCase()}</span>
      </div>
    `;
  }).join('');
}

function toggleWidgetExpand() {
  _widgetExpanded = !_widgetExpanded;
  renderTimetableWidget();
}

function testWidgetSound() {
  playNotificationChime();
  if (typeof showToast === 'function') {
    showToast('Звуковой сигнал виджета проверен', 'success');
  }
}

function updateTimetableWidgetState() {
  const { lessons } = getWidgetScheduleForToday();
  const currentInfo = getWidgetCurrentOrNextLesson(lessons);

  if (_widgetConfig.soundEnabled && currentInfo && currentInfo.status === 'next') {
    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const diff = currentInfo.lesson.slot.sMin - currentMin;
    const lead = _widgetConfig.notifyMinutes || 10;

    const slotKey = `${now.toDateString()}_p${currentInfo.lesson.slot.pair}`;
    if (diff > 0 && diff <= lead && !_notifiedSlots.has(slotKey)) {
      _notifiedSlots.add(slotKey);
      playNotificationChime();
      if (typeof showToast === 'function') {
        showToast(`Через ${diff} мин начинается: ${currentInfo.lesson.subject} (${currentInfo.lesson.room})`, 'info');
      }
    }
  }

  renderTimetableWidget();
}

function openWidgetConfigModal() {
  const modal = document.getElementById('timetableWidgetModal');
  if (!modal) return;

  const targetTypeSelect = document.getElementById('ttwTargetType');
  const targetValSelect = document.getElementById('ttwTargetVal');
  const themeSelect = document.getElementById('ttwTheme');
  const opacityInput = document.getElementById('ttwOpacity');
  const opacityValLabel = document.getElementById('ttwOpacityVal');
  const notifySelect = document.getElementById('ttwNotifyMin');
  const soundCheck = document.getElementById('ttwSoundEnabled');

  if (targetTypeSelect) targetTypeSelect.value = _widgetConfig.targetType;
  if (themeSelect) themeSelect.value = _widgetConfig.theme;
  if (opacityInput) {
    opacityInput.value = _widgetConfig.opacity;
    if (opacityValLabel) opacityValLabel.textContent = `${_widgetConfig.opacity}%`;
  }
  if (notifySelect) notifySelect.value = _widgetConfig.notifyMinutes;
  if (soundCheck) soundCheck.checked = _widgetConfig.soundEnabled;

  populateWidgetTargetOptions();
  modal.classList.add('active');
}

function closeWidgetConfigModal() {
  const modal = document.getElementById('timetableWidgetModal');
  if (modal) modal.classList.remove('active');
}

function populateWidgetTargetOptions() {
  const targetTypeSelect = document.getElementById('ttwTargetType');
  const targetValSelect = document.getElementById('ttwTargetVal');
  if (!targetTypeSelect || !targetValSelect) return;

  const tType = targetTypeSelect.value;
  targetValSelect.innerHTML = '';

  if (typeof scheduleData === 'undefined' || !scheduleData) return;

  if (tType === 'group') {
    const groups = Object.keys(scheduleData).sort();
    groups.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      if (g === _widgetConfig.targetValue) opt.selected = true;
      targetValSelect.appendChild(opt);
    });
  } else if (tType === 'teacher') {
    const teachers = new Set();
    Object.values(scheduleData).forEach(grp => {
      ['odd', 'even'].forEach(w => {
        for (let d = 0; d < 6; d++) {
          const slots = grp?.[w]?.[d] || {};
          Object.values(slots).forEach(c => {
            if (c.teacher) teachers.add(c.teacher.trim());
          });
        }
      });
    });
    Array.from(teachers).sort().forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      if (t === _widgetConfig.targetValue) opt.selected = true;
      targetValSelect.appendChild(opt);
    });
  } else if (tType === 'room') {
    const rooms = new Set();
    Object.values(scheduleData).forEach(grp => {
      ['odd', 'even'].forEach(w => {
        for (let d = 0; d < 6; d++) {
          const slots = grp?.[w]?.[d] || {};
          Object.values(slots).forEach(c => {
            if (c.room) rooms.add(c.room.trim());
          });
        }
      });
    });
    Array.from(rooms).sort().forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.textContent = r;
      if (r === _widgetConfig.targetValue) opt.selected = true;
      targetValSelect.appendChild(opt);
    });
  }
}

function saveWidgetSettingsFromModal() {
  const targetTypeSelect = document.getElementById('ttwTargetType');
  const targetValSelect = document.getElementById('ttwTargetVal');
  const themeSelect = document.getElementById('ttwTheme');
  const opacityInput = document.getElementById('ttwOpacity');
  const notifySelect = document.getElementById('ttwNotifyMin');
  const soundCheck = document.getElementById('ttwSoundEnabled');

  if (targetTypeSelect) _widgetConfig.targetType = targetTypeSelect.value;
  if (targetValSelect) _widgetConfig.targetValue = targetValSelect.value;
  if (themeSelect) _widgetConfig.theme = themeSelect.value;
  if (opacityInput) _widgetConfig.opacity = parseInt(opacityInput.value, 10) || 88;
  if (notifySelect) _widgetConfig.notifyMinutes = parseInt(notifySelect.value, 10) || 10;
  if (soundCheck) _widgetConfig.soundEnabled = soundCheck.checked;

  saveWidgetConfig();
  renderTimetableWidget();
  closeWidgetConfigModal();

  if (typeof showToast === 'function') {
    showToast('Настройки виджета сохранены', 'success');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.initTimetableWidget = initTimetableWidget;
window.renderTimetableWidget = renderTimetableWidget;
window.toggleWidgetExpand = toggleWidgetExpand;
window.testWidgetSound = testWidgetSound;
window.openWidgetConfigModal = openWidgetConfigModal;
window.closeWidgetConfigModal = closeWidgetConfigModal;
window.populateWidgetTargetOptions = populateWidgetTargetOptions;
window.saveWidgetSettingsFromModal = saveWidgetSettingsFromModal;
