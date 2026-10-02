const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const SLOTS = [
  '08:00–09:20', '09:30–10:50', '11:00–12:20',
  '13:00–14:20', '14:30–15:50', '16:00–17:20',
  '17:30–18:50', '19:00–20:20'
];
const TYPE_LABELS = {
  lecture: 'Лекция', practice: 'Практика',
  lab: 'Лаборат.', seminar: 'Семинар',
  naviyat: 'Навиёт', sport: 'Спорт', other: 'Другое'
};

const DEFAULT_SCHEDULE = {};

let scheduleData = {};
let currentGroup = '';
let currentSearchMode = 'group';
let currentScheduleViewFilter = null;

let currentCourseFilter = 'all';

function syncScheduleGroupsFromDatabase() {
  if (typeof EDUPAGE_SCHEDULE_DATA !== 'undefined' && EDUPAGE_SCHEDULE_DATA) {
    Object.keys(EDUPAGE_SCHEDULE_DATA).forEach(k => {
      if (!scheduleData[k]) {
        scheduleData[k] = JSON.parse(JSON.stringify(EDUPAGE_SCHEDULE_DATA[k]));
      } else {
        ['odd', 'even'].forEach(w => {
          if (!scheduleData[k][w]) scheduleData[k][w] = {};
          for (let d = 0; d < 6; d++) {
            if (!scheduleData[k][w][d]) scheduleData[k][w][d] = {};
            const eduDay = EDUPAGE_SCHEDULE_DATA[k]?.[w]?.[d] || {};
            Object.keys(eduDay).forEach(s => {
              scheduleData[k][w][d][s] = eduDay[s];
            });
          }
        });
      }
    });
  }

  const allGroups = new Set();
  if (typeof starostaAllStudents !== 'undefined' && Array.isArray(starostaAllStudents)) {
    starostaAllStudents.forEach(st => {
      if (st.group_name) allGroups.add(st.group_name);
    });
  }
  if (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) {
    tutorStudents.forEach(st => {
      if (st.group_name) allGroups.add(st.group_name);
    });
  }
  if (typeof starostaLocalGroups !== 'undefined' && Array.isArray(starostaLocalGroups)) {
    starostaLocalGroups.forEach(g => {
      if (g.name) allGroups.add(g.name);
    });
  }

  Object.keys(scheduleData).forEach(g => allGroups.add(g));

  allGroups.forEach(g => {
    if (!scheduleData[g]) {
      scheduleData[g] = { odd: {}, even: {} };
      for (let d = 0; d < 6; d++) {
        scheduleData[g].odd[d] = {};
        scheduleData[g].even[d] = {};
      }
    }
  });

  populateScheduleGroupDropdown();
}

function filterScheduleByCourse(courseVal) {
  currentCourseFilter = courseVal;
  populateScheduleGroupDropdown();
  renderScheduleGrid();
}

function populateScheduleGroupDropdown() {
  const select = document.getElementById('schedGroupSelect');
  if (!select) return;

  const prevVal = select.value;
  let allGroups = Object.keys(scheduleData);

  if (currentCourseFilter !== 'all') {
    const courseNum = parseInt(currentCourseFilter, 10);
    allGroups = allGroups.filter(g => {
      const item = scheduleData[g];
      if (item && item.course === courseNum) return true;
      if (courseNum === 1 && (g.includes('/26') || g.includes('1-kurs'))) return true;
      if (courseNum === 2 && (g.includes('/25') || g.includes('2-kurs') || g.includes('31'))) return true;
      if (courseNum === 3 && (g.includes('/24') || g.includes('3-kurs'))) return true;
      if (courseNum === 4 && (g.includes('/23') || g.includes('4-kurs'))) return true;
      return false;
    });
  }

  allGroups.sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));

  if (allGroups.length > 0) {
    select.innerHTML = allGroups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('') +
      `<option value="custom" id="schedOptCustom">— Редактировать расписание —</option>`;
    if (allGroups.includes(prevVal)) {
      select.value = prevVal;
      currentGroup = prevVal;
    } else {
      select.value = allGroups[0];
      currentGroup = allGroups[0];
    }
  } else {
    select.innerHTML = `<option value="custom" id="schedOptCustom">— Нет групп для выбранного курса —</option>`;
    currentGroup = 'custom';
  }
}

function setScheduleSearchMode(mode) {
  currentSearchMode = mode;
  document.querySelectorAll('.sched-smode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.smode === mode);
  });
  const inp = document.getElementById('schedSearchInput');
  if (inp) {
    inp.value = '';
    const placeholders = {
      group: 'Поиск по номеру группы (напр. AT-900, ЦЭ-21, AT 31)...',
      teacher: 'Поиск по преподавателю...',
      room: 'Поиск по номеру аудитории (напр. 220, 312)...'
    };
    inp.placeholder = placeholders[mode] || 'Поиск по расписанию...';
    inp.focus();
  }
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';
}

function onScheduleSearchInput(query) {
  const q = (query || '').trim().toLowerCase();
  const resEl = document.getElementById('schedSearchResults');
  const clearBtn = document.querySelector('.sched-search-clear-btn');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
  if (!resEl) return;

  if (!q) {
    resEl.style.display = 'none';
    currentScheduleViewFilter = null;
    renderScheduleGrid();
    return;
  }

  const results = [];

  if (currentSearchMode === 'group') {
    const allGroups = Object.keys(scheduleData);
    allGroups.forEach(g => {
      if (g.toLowerCase().includes(q)) {
        results.push({ label: `Группа ${g}`, type: 'group', value: g });
      }
    });
  } else if (currentSearchMode === 'teacher') {
    const teachers = new Set();
    Object.values(scheduleData).forEach(gSched => {
      ['odd', 'even'].forEach(w => {
        Object.values(gSched[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(les => {
            if (les.teacher) teachers.add(les.teacher);
          });
        });
      });
    });
    teachers.forEach(t => {
      if (t.toLowerCase().includes(q)) {
        results.push({ label: `Преподаватель: ${t}`, type: 'teacher', value: t });
      }
    });
  } else if (currentSearchMode === 'room') {
    const rooms = new Set();
    Object.values(scheduleData).forEach(gSched => {
      ['odd', 'even'].forEach(w => {
        Object.values(gSched[w] || {}).forEach(day => {
          Object.values(day || {}).forEach(les => {
            if (les.room) rooms.add(les.room);
          });
        });
      });
    });
    rooms.forEach(r => {
      if (r.toLowerCase().includes(q)) {
        results.push({ label: `Аудитория: ${r}`, type: 'room', value: r });
      }
    });
  }

  if (results.length === 0) {
    resEl.style.display = 'block';
    resEl.innerHTML = `<div style="padding:8px 14px; color:#94a3b8; font-size:12px;">Ничего не найдено по запросу «${escapeHtml(q)}»</div>`;
    return;
  }

  resEl.style.display = 'flex';
  resEl.innerHTML = results.slice(0, 30).map(r => `
    <div class="sched-sres-item" onclick="selectScheduleSearchResult('${escapeHtml(r.type)}', '${escapeHtml(r.value)}')">
      ${escapeHtml(r.label)}
    </div>
  `).join('');
}

function selectScheduleSearchResult(type, value) {
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';

  if (type === 'group' || type === 'student') {
    currentScheduleViewFilter = null;
    let targetGroup = value;
    if (!scheduleData[targetGroup]) {
      const match = Object.keys(scheduleData).find(g =>
        g.toLowerCase() === value.toLowerCase() ||
        g.toLowerCase().startsWith(value.toLowerCase()) ||
        g.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
      );
      if (match) targetGroup = match;
    }
    currentGroup = targetGroup;
    const select = document.getElementById('schedGroupSelect');
    if (select) select.value = currentGroup;
    const inp = document.getElementById('schedSearchInput');
    if (inp) inp.value = currentGroup;
  } else if (type === 'teacher') {
    currentScheduleViewFilter = { type: 'teacher', value: value };
  } else if (type === 'room') {
    currentScheduleViewFilter = { type: 'room', value: value };
  }

  renderScheduleGrid();
  const weekTypeSelect = document.getElementById('schedWeekType');
  const weekType = weekTypeSelect ? weekTypeSelect.value : 'odd';
  renderMobileScheduleCards(weekType);
}

function clearScheduleSearch() {
  const inp = document.getElementById('schedSearchInput');
  if (inp) inp.value = '';
  const clearBtn = document.querySelector('.sched-search-clear-btn');
  if (clearBtn) clearBtn.style.display = 'none';
  const resEl = document.getElementById('schedSearchResults');
  if (resEl) resEl.style.display = 'none';
  currentScheduleViewFilter = null;
  renderScheduleGrid();
  const weekTypeSelect = document.getElementById('schedWeekType');
  const weekType = weekTypeSelect ? weekTypeSelect.value : 'odd';
  renderMobileScheduleCards(weekType);
}

function saveScheduleToStorage() {
  try {
    localStorage.setItem('tsue_schedule_v1', JSON.stringify(scheduleData));
  } catch (e) { }
}
function loadScheduleFromStorage() {
  try {
    const raw = localStorage.getItem('tsue_schedule_v1');
    if (raw) scheduleData = JSON.parse(raw);
  } catch (e) { }
}

function loadGroupSchedule(groupId) {
  currentScheduleViewFilter = null;
  if (groupId === 'custom') {
    currentGroup = 'custom';
    if (!scheduleData['custom']) {
      scheduleData['custom'] = { odd: {}, even: {} };
      for (let d = 0; d < 6; d++) {
        scheduleData['custom'].odd[d] = {};
        scheduleData['custom'].even[d] = {};
      }
    }
  } else {
    currentGroup = groupId;
  }
  renderScheduleGrid();
}

function renderScheduleGrid() {
  const container = document.getElementById('schedGridContainer');
  if (!container) return;

  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const isAdmin = currentUser !== null;
  const dayNames = (t && t.schedDays && Array.isArray(t.schedDays) && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const typeMap = t.schedTypes || TYPE_LABELS;
  const addHint = t.schedCellAddHint || '+ Добавить';
  const delTitle = t.schedBtnDelete || 'Удалить';

  let html = '<table class="sched-table" id="schedTable">';

  html += '<thead><tr>';
  html += '<th style="width:42px;">№</th>';
  for (const day of dayNames) {
    html += `<th class="sched-th-day">${day}</th>`;
  }
  html += '</tr></thead>';

  html += '<tbody>';
  for (let s = 0; s < 8; s++) {
    html += `<tr>`;
    html += `<td class="sched-td-num">
      <div class="stn">${s + 1}</div>
      <div class="stv">${SLOTS[s]}</div>
    </td>`;
    for (let d = 0; d < 6; d++) {
      let lesson = null;
      if (currentScheduleViewFilter) {
        for (const gKey of Object.keys(scheduleData)) {
          const l = scheduleData[gKey]?.[weekType]?.[d]?.[s];
          if (l) {
            if (currentScheduleViewFilter.type === 'teacher' && l.teacher === currentScheduleViewFilter.value) {
              lesson = { ...l, subject: `${l.subject} (${gKey})` };
              break;
            } else if (currentScheduleViewFilter.type === 'room' && l.room === currentScheduleViewFilter.value) {
              lesson = { ...l, subject: `${l.subject} (${gKey})` };
              break;
            }
          }
        }
      } else {
        let activeGroupKey = currentGroup;
    if (!scheduleData[activeGroupKey] && activeGroupKey) {
      const normalized = activeGroupKey.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const found = Object.keys(scheduleData).find(k => 
        k.toLowerCase() === activeGroupKey.toLowerCase() ||
        k.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === normalized
      );
      if (found) activeGroupKey = found;
    }
    const groupData = scheduleData[activeGroupKey]?.[weekType] || {};
        lesson = groupData[d]?.[s] || null;
      }

      const adminClass = isAdmin ? ' is-admin' : '';
      if (lesson) {
        const typeLabel = typeMap[lesson.type] || lesson.type;
        html += `<td>
          <div class="sched-cell has-lesson${adminClass}" data-day="${d}" data-slot="${s}">
            <div class="lesson-card">
              <span class="lesson-type-badge ltype-${lesson.type}">${typeLabel}</span>
              <div class="lesson-subject">${escapeHtml(lesson.subject)}</div>
              <div class="lesson-teacher">${escapeHtml(lesson.teacher)}</div>
              <div class="lesson-room">${escapeHtml(lesson.room)}</div>
            </div>
            ${isAdmin ? `<button class="lesson-delete-btn" onclick="deleteLesson(${d},${s},event)" title="${delTitle}">×</button>` : ''}
          </div>
        </td>`;
      } else {
        html += `<td>
          <div class="sched-cell${adminClass}" data-day="${d}" data-slot="${s}" ${isAdmin ? `onclick="openAddLessonModal(${d},${s})"` : ''}>
            <div class="sched-cell-empty">
              <span class="sched-cell-add-hint">${addHint}</span>
            </div>
          </div>
        </td>`;
      }
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  container.innerHTML = html;

  renderMobileScheduleCards(weekType);
}

let currentMobileDay = (function() {
  const day = new Date().getDay();
  return (day >= 1 && day <= 5) ? day - 1 : 0;
})();
let currentMobileViewMode = 'cards';

function setScheduleMobileView(mode) {
  currentMobileViewMode = mode;
  const tabCards = document.getElementById('schedMvTabCards');
  const tabGrid = document.getElementById('schedMvTabGrid');
  const dayTabs = document.getElementById('schedMobileDayTabs');
  const cardsWrap = document.getElementById('schedMobileCardsWrap');
  const gridContainer = document.getElementById('schedGridContainer');

  if (tabCards) tabCards.classList.toggle('active', mode === 'cards');
  if (tabGrid) tabGrid.classList.toggle('active', mode === 'grid');

  if (mode === 'cards') {
    if (dayTabs) dayTabs.style.display = 'flex';
    if (cardsWrap) cardsWrap.style.display = 'flex';
    if (gridContainer) gridContainer.classList.remove('force-desktop-grid');
  } else {
    if (dayTabs) dayTabs.style.display = 'none';
    if (cardsWrap) cardsWrap.style.display = 'none';
    if (gridContainer) gridContainer.classList.add('force-desktop-grid');
  }
}

function selectScheduleMobileDay(dayIdx) {
  currentMobileDay = dayIdx;
  document.querySelectorAll('.sched-mday-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.day, 10) === dayIdx);
  });
  const weekTypeSelect = document.getElementById('schedWeekType');
  const weekType = weekTypeSelect ? weekTypeSelect.value : 'odd';
  renderMobileScheduleCards(weekType);
}

function renderMobileScheduleCards(weekType) {
  const cardsWrap = document.getElementById('schedMobileCardsWrap');
  if (!cardsWrap) return;

  const typeMap = {
    lecture: i18n[currentLang].schedTypeLecture,
    practice: i18n[currentLang].schedTypePractice,
    lab: i18n[currentLang].schedTypeLab,
    seminar: i18n[currentLang].schedTypeSeminar
  };

  const t = i18n[currentLang] || i18n.ru;
  const dayNames = (t && t.schedDays && Array.isArray(t.schedDays) && t.schedDays.length >= 6)
    ? t.schedDays
    : DAYS;

  const d = currentMobileDay;
  let lessonsCount = 0;
  let cardsHtml = '';

  for (let s = 0; s < 8; s++) {
    let lesson = null;
    if (currentScheduleViewFilter) {
      for (const gKey of Object.keys(scheduleData)) {
        const l = scheduleData[gKey]?.[weekType]?.[d]?.[s];
        if (l) {
          if (currentScheduleViewFilter.type === 'teacher' && l.teacher === currentScheduleViewFilter.value) {
            lesson = { ...l, subject: `${l.subject} (${gKey})` };
            break;
          } else if (currentScheduleViewFilter.type === 'room' && l.room === currentScheduleViewFilter.value) {
            lesson = { ...l, subject: `${l.subject} (${gKey})` };
            break;
          }
        }
      }
    } else {
      let activeGroupKey = currentGroup;
    if (!scheduleData[activeGroupKey] && activeGroupKey) {
      const normalized = activeGroupKey.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const found = Object.keys(scheduleData).find(k => 
        k.toLowerCase() === activeGroupKey.toLowerCase() ||
        k.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === normalized
      );
      if (found) activeGroupKey = found;
    }
    const groupData = scheduleData[activeGroupKey]?.[weekType] || {};
      lesson = groupData[d]?.[s] || null;
    }

    if (lesson) {
      lessonsCount++;
      const typeLabel = typeMap[lesson.type] || lesson.type;
      cardsHtml += `
        <div class="sched-mcard ltype-${lesson.type}">
          <div class="sched-mcard-top">
            <span class="sched-mcard-pair">${s + 1} пара · ${SLOTS[s]}</span>
            <span class="lesson-type-badge ltype-${lesson.type}">${typeLabel}</span>
          </div>
          <div class="sched-mcard-title">${escapeHtml(lesson.subject)}</div>
          <div class="sched-mcard-details">
            <div class="sched-mcard-item"><i class="fa-solid fa-user-tie"></i> <span>${escapeHtml(lesson.teacher)}</span></div>
            <div class="sched-mcard-item sched-mcard-room"><i class="fa-solid fa-door-open"></i> <span>${escapeHtml(lesson.room)}</span></div>
          </div>
        </div>
      `;
    }
  }

  if (lessonsCount === 0) {
    cardsHtml = `
      <div class="sched-mcard-empty">
        <i class="fa-solid fa-mug-hot"></i>
        <div class="sched-mcard-empty-title">В этот день занятий нет</div>
        <div class="sched-mcard-empty-sub">${dayNames[d]}, свободный день для самостоятельной подготовки</div>
      </div>
    `;
  }

  cardsWrap.innerHTML = cardsHtml;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let _pendingDay = null, _pendingSlot = null;

function openAddLessonModal(day, slot) {
  _pendingDay = (day !== undefined) ? day : null;
  _pendingSlot = (slot !== undefined) ? slot : null;

  if (_pendingDay !== null) {
    document.getElementById('lf-day').value = _pendingDay;
    document.getElementById('lf-slot').value = _pendingSlot;
  }

  document.getElementById('lf-subject').value = '';
  document.getElementById('lf-teacher').value = '';
  document.getElementById('lf-room').value = '';
  document.getElementById('lf-type').value = 'lecture';
  document.getElementById('lf-week').value = 'both';

  document.getElementById('lessonModalOverlay').classList.add('active');
  setTimeout(() => document.getElementById('lf-subject').focus(), 80);
}

function closeLessonModal() {
  document.getElementById('lessonModalOverlay').classList.remove('active');
  _pendingDay = null; _pendingSlot = null;
}

function closeLessonModalOnOverlay(e) {
  if (e.target.id === 'lessonModalOverlay') closeLessonModal();
}

function saveLessonFromModal() {
  const t = i18n[currentLang] || i18n.ru;
  const day = parseInt(document.getElementById('lf-day').value);
  const slot = parseInt(document.getElementById('lf-slot').value);
  const subject = document.getElementById('lf-subject').value.trim();
  const type = document.getElementById('lf-type').value;
  const room = document.getElementById('lf-room').value.trim();
  const teacher = document.getElementById('lf-teacher').value.trim();
  const week = document.getElementById('lf-week').value;

  if (!subject) { alert(t.schedAlertSubject || 'Укажите название дисциплины.'); return; }

  const lesson = { subject, type, teacher: teacher || '—', room: room || '—' };

  const weeks = week === 'both' ? ['odd', 'even'] : [week];
  weeks.forEach(wt => {
    if (!scheduleData[currentGroup]) scheduleData[currentGroup] = { odd: {}, even: {} };
    if (!scheduleData[currentGroup][wt][day]) scheduleData[currentGroup][wt][day] = {};
    scheduleData[currentGroup][wt][day][slot] = lesson;
  });

  saveScheduleToStorage();
  closeLessonModal();
  renderScheduleGrid();
}

function deleteLesson(day, slot, event) {
  event.stopPropagation();
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  if (scheduleData[currentGroup]?.[weekType]?.[day]) {
    delete scheduleData[currentGroup][weekType][day][slot];
    saveScheduleToStorage();
    renderScheduleGrid();
  }
}

function clearDaySchedule() {
  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const dayNames = (t && t.schedDays && Array.isArray(t.schedDays) && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const promptMsg = `${t.schedPromptClearDay || 'Очистить расписание для какого дня?'}\n${dayNames.map((d, i) => `${i}: ${d}`).join('\n')}\n\n(0-5):`;
  const sel = prompt(promptMsg);
  if (sel === null) return;
  const idx = parseInt(sel);
  if (isNaN(idx) || idx < 0 || idx > 5) { alert(t.schedPromptInvalidNum || 'Неверный номер.'); return; }
  const weekStr = weekType === 'odd' ? (t.schedOptOdd || 'нечётная') : (t.schedOptEven || 'чётная');
  if (!confirm(`${t.schedConfirmClearDay || 'Очистить расписание'}: ${dayNames[idx]} (${weekStr})?`)) return;
  if (scheduleData[currentGroup]?.[weekType]) {
    scheduleData[currentGroup][weekType][idx] = {};
    saveScheduleToStorage();
    renderScheduleGrid();
  }
}

async function exportScheduleToPDF() {
  const t = i18n[currentLang] || i18n.ru;
  const weekType = document.getElementById('schedWeekType')?.value || 'odd';
  const weekLabel = weekType === 'odd' ? (t.schedPdfWeekOdd || 'Нечётная неделя') : (t.schedPdfWeekEven || 'Чётная неделя');
  const groupLabel = currentGroup.replace(/-/g, '/').replace(/\//g, '/');
  let activeGroupKey = currentGroup;
    if (!scheduleData[activeGroupKey] && activeGroupKey) {
      const normalized = activeGroupKey.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const found = Object.keys(scheduleData).find(k => 
        k.toLowerCase() === activeGroupKey.toLowerCase() ||
        k.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === normalized
      );
      if (found) activeGroupKey = found;
    }
    const groupData = scheduleData[activeGroupKey]?.[weekType] || {};
  const dayNames = (t && t.schedDays && Array.isArray(t.schedDays) && t.schedDays.length >= 6) ? t.schedDays : DAYS;
  const typeMap = t.schedTypes || TYPE_LABELS;
  const dateLocale = currentLang === 'en' ? 'en-US' : (currentLang === 'uz' ? 'uz-UZ' : 'ru-RU');

  const printEl = document.createElement('div');
  printEl.style.position = 'fixed';
  printEl.style.left = '-9999px';
  printEl.style.top = '0';
  printEl.style.width = '1200px';
  printEl.style.background = '#ffffff';
  printEl.style.color = '#0f172a';
  printEl.style.fontFamily = 'Arial, "Segoe UI", sans-serif';
  printEl.style.padding = '24px 30px';
  printEl.style.boxSizing = 'border-box';
  printEl.style.zIndex = '-9999';

  let tableRows = '';
  for (let s = 0; s < 8; s++) {
    tableRows += `<tr style="border-bottom: 1px solid #cbd5e1; height: 56px;">`;
    tableRows += `<td style="border: 1px solid #cbd5e1; background: #f1f5f9; text-align: center; width: 90px; padding: 4px;">
      <div style="font-size: 14px; font-weight: 800; color: #003875;">${s + 1}</div>
      <div style="font-size: 10px; color: #475569; margin-top: 2px;">${SLOTS[s]}</div>
    </td>`;
    for (let d = 0; d < 6; d++) {
      const lesson = groupData[d]?.[s] || null;
      if (lesson) {
        const typeBg = lesson.type === 'lecture' ? '#dbeafe' : (lesson.type === 'practice' ? '#dcfce7' : (lesson.type === 'lab' ? '#fef9c3' : '#f3e8ff'));
        const typeColor = lesson.type === 'lecture' ? '#1d4ed8' : (lesson.type === 'practice' ? '#166534' : (lesson.type === 'lab' ? '#854d0e' : '#7e22ce'));
        const typeLabel = typeMap[lesson.type] || lesson.type;
        tableRows += `<td style="border: 1px solid #cbd5e1; background: #f8fafc; padding: 6px 8px; vertical-align: top; width: 175px;">
          <div style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; background: ${typeBg}; color: ${typeColor}; text-transform: uppercase; margin-bottom: 4px;">${typeLabel}</div>
          <div style="font-size: 11.5px; font-weight: 700; color: #0f172a; line-height: 1.25; margin-bottom: 2px;">${escHtml(lesson.subject)}</div>
          <div style="font-size: 9.5px; color: #475569; margin-bottom: 2px;">${escHtml(lesson.teacher)}</div>
          <div style="font-size: 9.5px; font-weight: 700; color: #0369a1;">${escHtml(lesson.room)}</div>
        </td>`;
      } else {
        tableRows += `<td style="border: 1px solid #cbd5e1; background: #ffffff; width: 175px;"></td>`;
      }
    }
    tableRows += `</tr>`;
  }

  let dayThs = '';
  for (const day of dayNames) {
    dayThs += `<th style="border: 1px solid #002d62; font-size: 11.5px; text-transform: uppercase;">${day}</th>`;
  }

  printEl.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #003875; padding-bottom: 12px; margin-bottom: 16px;">
      <div>
        <div style="font-size: 18px; font-weight: 800; color: #002d62;">${t.pdfSchedUnivTitle || 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ'}</div>
        <div style="font-size: 13px; font-weight: 700; color: #004899; margin-top: 3px;">${t.pdfSchedFacultyTitle || 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · РАСПИСАНИЕ УЧЕБНЫХ ЗАНЯТИЙ'}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 800; color: #002d62;">${t.pdfSchedGroup || 'ГРУППА'} ${groupLabel}</div>
        <div style="font-size: 12px; font-weight: 600; color: #475569;">${weekLabel} · ${t.pdfSchedSemester || '2026–2027 учебный год'}</div>
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background: #002d62; color: #ffffff; height: 34px;">
          <th style="border: 1px solid #002d62; font-size: 11.5px; text-transform: uppercase; width: 90px;">${t.pdfSchedTimeTh || 'Время'}</th>
          ${dayThs}
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-size: 10.5px; color: #64748b; border-top: 1px solid #cbd5e1; padding-top: 10px;">
      <div>${t.pdfSchedFooterLeft || 'Официальное расписание учебного процесса ТГЭУ · Сформировано:'} ${new Date().toLocaleDateString(dateLocale)}</div>
      <div>${t.pdfSchedFooterRight || 'Руководство Факультета Цифровой Экономики ТГЭУ'}</div>
    </div>
  `;

  document.body.appendChild(printEl);

  try {
    const canvas = await html2canvas(printEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const { jsPDF } = window.jspdf || window;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, Math.min(pdfH, pdf.internal.pageSize.getHeight()));
    const fnPrefix = t.pdfSchedFileName || 'Schedule';
    pdf.save(`${fnPrefix}_${groupLabel.replace(/\//g, '-')}_${weekLabel.replace(/ /g, '_')}.pdf`);
  } catch (err) {
    console.error('PDF error:', err);
    window.print();
  } finally {
    printEl.remove();
  }
}

function renderStudentsTable() {
  const tbody = document.getElementById('sysStudentsTableBody');
  if (!tbody) return;

  const list = (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) ? tutorStudents : [];
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:#94a3b8; font-style:italic;">Нет данных. Студенты появятся здесь после загрузки через кабинет тьютора.</td></tr>';
    return;
  }

  let html = '';
  list.forEach((st, idx) => {
    const subgroup = st.subgroup ? `${escapeHtml(st.subgroup)}-п/г` : '—';
    html += `<tr>
      <td style="font-weight:700; color:#64748b;">${idx + 1}</td>
      <td style="color:#94a3b8; font-weight:600; text-align:center; font-family:monospace;">${escapeHtml(st.hemis_id || '—')}</td>
      <td style="font-weight:700; color:#0f172a;">${escapeHtml(st.full_name || '—')}</td>
      <td><span style="display:inline-block; padding:2px 8px; border-radius:4px; font-size:11.5px; font-weight:700; background:#e0f2fe; color:#0369a1;">${escapeHtml(st.group_name || '—')}</span></td>
      <td style="text-align:center; font-weight:700; color:#0369a1;">${subgroup}</td>
      <td style="color:#475569;">${escapeHtml(st.phone || '—')}</td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

function renderSystemTab() {
  if (currentUser) {
    const guestState = document.getElementById('systemGuestState');
    const loggedState = document.getElementById('systemLoggedState');
    if (guestState) guestState.style.display = 'none';
    if (loggedState) loggedState.style.display = 'flex';
    renderStudentsTable();
  } else {
    const guestState = document.getElementById('systemGuestState');
    const loggedState = document.getElementById('systemLoggedState');
    if (guestState) guestState.style.display = 'block';
    if (loggedState) loggedState.style.display = 'none';
  }
}

async function exportStudentsListPDF() {
  const t = i18n[currentLang] || i18n.ru;
  const dateLocale = currentLang === 'en' ? 'en-US' : (currentLang === 'uz' ? 'uz-UZ' : 'ru-RU');

  const printEl = document.createElement('div');
  printEl.style.position = 'fixed';
  printEl.style.left = '-9999px';
  printEl.style.top = '0';
  printEl.style.width = '920px';
  printEl.style.background = '#ffffff';
  printEl.style.color = '#0f172a';
  printEl.style.fontFamily = 'Arial, "Segoe UI", sans-serif';
  printEl.style.padding = '28px 36px';
  printEl.style.boxSizing = 'border-box';
  printEl.style.zIndex = '-9999';

  const studentList = (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) ? tutorStudents : [];
  let rows = '';
  studentList.forEach((st, idx) => {
    const bg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    const subgroup = st.subgroup ? `${st.subgroup}-подгруппа` : '—';
    rows += `
      <tr style="background: ${bg}; border-bottom: 1px solid #cbd5e1; height: 28px;">
        <td style="border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #64748b; font-size: 11px; padding: 4px;">${idx + 1}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; color: #334155; font-size: 11px; font-family:monospace; padding: 4px;">${escapeHtml(st.hemis_id || '—')}</td>
        <td style="border: 1px solid #cbd5e1; font-weight: bold; color: #0f172a; font-size: 12px; padding: 4px 10px;">${escapeHtml(st.full_name || '—')}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; font-size: 11px; font-weight: bold; color: #0369a1; padding: 4px;">${escapeHtml(st.group_name || '—')}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; font-size: 11px; font-weight: bold; color: #0369a1; padding: 4px;">${escapeHtml(subgroup)}</td>
        <td style="border: 1px solid #cbd5e1; font-size: 11px; color: #334155; padding: 4px;">${escapeHtml(st.phone || '—')}</td>
      </tr>
    `;
  });

  printEl.innerHTML = `
    <div style="border-bottom: 3px solid #003875; padding-bottom: 12px; margin-bottom: 14px;">
      <div style="font-size: 17px; font-weight: 800; color: #002d62; text-align: center;">${t.pdfVedomUnivTitle || 'ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ЭКОНОМИЧЕСКИЙ УНИВЕРСИТЕТ'}</div>
      <div style="font-size: 13px; font-weight: 700; color: #004899; text-align: center; margin-top: 3px;">${t.pdfVedomFacultyTitle || 'ФАКУЛЬТЕТ ЦИФРОВОЙ ЭКОНОМИКИ · АКАДЕМИЧЕСКАЯ ВЕДОМОСТЬ'}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 11.5px; font-weight: 600; color: #334155;">
        <div>${(t.pdfVedomGroupPrefix || 'Учебная группа:') + ' ' + (typeof currentGroup !== 'undefined' ? currentGroup.replace(/-/g, '/').replace(/\/\//g, '/') : 'АТ-31/25r')}</div>
        <div>${t.pdfVedomSemesterLabel || 'Учебный год: 2026–2027'}</div>
        <div><strong>${t.pdfVedomExportDate || 'Дата выгрузки:'}</strong> ${new Date().toLocaleDateString(dateLocale)}</div>
      </div>
    </div>
    <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background: #002d62; color: #ffffff; height: 30px;">
          <th style="border: 1px solid #002d62; font-size: 11px; width: 35px;">${t.pdfVedomThNum || '№'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 70px;">${t.pdfVedomThHemis || 'HEMIS ID'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; text-align: left; padding-left: 10px;">${t.pdfVedomThName || 'Ф.И.О. Студента'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 105px;">${t.pdfVedomThSubgroup || 'Подгруппа'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 75px;">${t.pdfVedomThType || 'Форма'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 60px;">${t.pdfVedomThGpa || 'GPA'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 65px;">${t.pdfVedomThAttend || 'Посещ.'}</th>
          <th style="border: 1px solid #002d62; font-size: 11px; width: 140px;">${t.pdfVedomThStatus || 'Статус'}</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 22px; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; padding-top: 12px;">
      <div>${t.pdfVedomSignCurator || 'Подпись куратора группы: ________________'}</div>
      <div>${t.pdfVedomSignDean || 'Декан Факультета Цифровой Экономики: ________________'}</div>
    </div>
  `;

  document.body.appendChild(printEl);

  try {
    const canvas = await html2canvas(printEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const { jsPDF } = window.jspdf || window;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, Math.min(pdfH, pdf.internal.pageSize.getHeight()));
    const fn = t.pdfVedomFileName || 'Academic_Roster_AT-31-25r.pdf';
    pdf.save(fn);
  } catch (err) {
    console.error('PDF error:', err);
    window.print();
  } finally {
    printEl.remove();
  }
}

function initScheduleModule() {
  loadScheduleFromStorage();
  syncScheduleGroupsFromDatabase();
  renderScheduleGrid();
}
