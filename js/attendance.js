let starostaAllStudents = [];
let starostaFilteredStudents = [];
let starostaAttendanceMap = {};

async function initStarostaModule() {
  const dateInput = document.getElementById('starostaAttendDate');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  await loadAllStudentsForStarosta();
  sgRefreshGroupDropdown();
}

function showStarostaSubTab(panel) {
  const panels = ['attend', 'group'];
  panels.forEach(p => {
    const el = document.getElementById(`starostaPanel-${p}`);
    const btn = document.getElementById(`starostaTab${p.charAt(0).toUpperCase() + p.slice(1)}`);
    if (el) el.style.display = p === panel ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', p === panel);
  });
}

let sgDraftStudents = [];
let sgCurrentGroup = '';

function sgRefreshGroupDropdown() {
  const sel = document.getElementById('sgGroupSelect');
  if (!sel) return;

  const groupsSet = new Set();
  const local = getCombinedLocalStudents();
  local.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  if (starostaAllStudents) {
    starostaAllStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }

  const arr = Array.from(groupsSet).sort();
  sel.innerHTML = `
    <option value="">— Выбрать существующую или создать новую —</option>
    ${arr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}
    <option value="__NEW__">+ Создать новую группу...</option>
  `;

  if (sgCurrentGroup && arr.includes(sgCurrentGroup)) {
    sel.value = sgCurrentGroup;
  }
}

function sgOnGroupSelect(val) {
  const nameInput = document.getElementById('sgNewGroupName');
  if (!nameInput) return;

  if (val === '__NEW__') {
    nameInput.style.display = 'block';
    nameInput.focus();
    sgCurrentGroup = '';
  } else {
    nameInput.style.display = 'none';
    sgCurrentGroup = val;
    if (val) {
      const existing = starostaAllStudents.filter(s => s.group_name === val);
      sgDraftStudents = existing.map(s => ({ id: s.id, name: s.full_name || s.student_name || '—', subgroup: s.subgroup || '1', synced: true }));
    } else {
      sgDraftStudents = [];
    }
    sgRenderDraftList();
  }
}

function sgAddStudentRow() {
  const inp = document.getElementById('sgNewStudentName');
  const name = (inp?.value || '').trim();
  if (!name) { inp?.focus(); return; }

  const existingCount = sgDraftStudents.filter(s => !s._deleted).length;
  const subgroup = Math.floor(existingCount / 13) % 2 === 0 ? '1' : '2';

  sgDraftStudents.push({ id: null, name, subgroup, synced: false });
  sgRenderDraftList();
  if (inp) { inp.value = ''; inp.focus(); }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.activeElement?.id === 'sgNewStudentName') {
    e.preventDefault();
    sgAddStudentRow();
  }
});

function sgRemoveStudent(idx) {
  if (sgDraftStudents[idx]) {
    sgDraftStudents.splice(idx, 1);
    sgRenderDraftList();
  }
}

function sgRenderDraftList() {
  const container = document.getElementById('sgStudentListPreview');
  if (!container) return;

  const active = sgDraftStudents.filter(s => !s._deleted);

  if (active.length === 0) {
    container.innerHTML = `
      <div class="tc-empty-state" style="padding:20px;">
        <i class="fa-solid fa-user-group"></i>
        <p>Студенты добавятся здесь</p>
      </div>`;
    return;
  }

  const bySubgroup = {};
  active.forEach((s, idx) => {
    const sg = s.subgroup || '1';
    if (!bySubgroup[sg]) bySubgroup[sg] = [];
    bySubgroup[sg].push({ ...s, _origIdx: sgDraftStudents.indexOf(s) });
  });

  container.innerHTML = Object.keys(bySubgroup).sort().map(sg => `
    <div class="sg-subgroup-block">
      <div class="sg-subgroup-label"><i class="fa-solid fa-people-group"></i> ${escapeHtml(sg)}-я подгруппа (${bySubgroup[sg].length} чел.)</div>
      ${bySubgroup[sg].map(s => `
        <div class="sg-student-row ${s.synced ? 'sg-row-synced' : ''}">
          <span class="sg-student-num">${bySubgroup[sg].indexOf(s) + 1}</span>
          <span class="sg-student-name">${escapeHtml(s.name)}</span>
          ${s.synced ? '<span class="sg-synced-badge"><i class="fa-solid fa-cloud-check"></i> Сохранён</span>' : ''}
          <button type="button" class="sg-remove-btn" onclick="sgRemoveStudent(${s._origIdx})" title="Удалить">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

async function sgSaveGroupAndStudents() {
  const sel = document.getElementById('sgGroupSelect');
  const nameInp = document.getElementById('sgNewGroupName');
  const feedback = document.getElementById('sgSaveFeedback');

  let groupName = '';
  if (sel?.value === '__NEW__') {
    groupName = (nameInp?.value || '').trim().toUpperCase();
  } else if (sel?.value) {
    groupName = sel.value.trim().toUpperCase();
  } else if (nameInp?.value) {
    groupName = nameInp.value.trim().toUpperCase();
  }

  if (!groupName) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Укажите или выберите название группы.';
    }
    return;
  }

  const unsaved = sgDraftStudents.filter(s => !s.synced);
  if (unsaved.length === 0) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'sreg-info-alert';
      feedback.style.cssText = 'display:block; background:#fef9c3; border-color:#fde047; color:#713f12; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.textContent = 'Нет новых студентов для сохранения.';
    }
    return;
  }

  if (feedback) {
    feedback.style.display = 'block';
    feedback.className = '';
    feedback.style.cssText = 'display:block; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.3); color: var(--primary-dark); padding:12px; border-radius:10px; margin-top:14px;';
    feedback.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Сохранение студентов...';
  }

  let savedCount = 0;
  const errors = [];
  let tutorList = loadLocalTutorStudents('tutor-dilrabo-vahidovna');
  if (!Array.isArray(tutorList)) tutorList = [];

  for (let i = 0; i < sgDraftStudents.length; i++) {
    const s = sgDraftStudents[i];
    if (s.synced || !s.name) continue;

    const subgroup = s.subgroup || (Math.floor(i / 13) % 2 === 0 ? '1' : '2');

    const record = {
      full_name: s.name,
      student_name: s.name,
      group_name: groupName,
      subgroup: subgroup,
      tutor_id: 'tutor-dilrabo-vahidovna',
      notes: 'Добавлен старостой (модуль создания группы)'
    };

    try {
      if (window._supabaseClient) {
        const { data, error } = await window._supabaseClient
          .from('tutor_students')
          .insert([record])
          .select();
        if (!error && data && data[0]) {
          sgDraftStudents[i].id = data[0].id;
          sgDraftStudents[i].synced = true;
          tutorList.push({ ...record, id: data[0].id });
          savedCount++;
        } else {
          // Fallback to local
          const localId = 'st_sg_' + Date.now() + '_' + i;
          sgDraftStudents[i].id = localId;
          sgDraftStudents[i].synced = true;
          tutorList.push({ ...record, id: localId });
          savedCount++;
        }
      } else {
        const localId = 'st_sg_' + Date.now() + '_' + i;
        sgDraftStudents[i].id = localId;
        sgDraftStudents[i].synced = true;
        tutorList.push({ ...record, id: localId });
        savedCount++;
      }
    } catch (err) {
      const localId = 'st_sg_' + Date.now() + '_' + i;
      sgDraftStudents[i].id = localId;
      sgDraftStudents[i].synced = true;
      tutorList.push({ ...record, id: localId });
      savedCount++;
    }
  }

  saveLocalTutorStudents('tutor-dilrabo-vahidovna', tutorList);
  tutorStudents = tutorList;

  sgCurrentGroup = groupName;
  await loadAllStudentsForStarosta();
  sgRefreshGroupDropdown();
  sgRenderDraftList();

  if (feedback) {
    if (errors.length === 0) {
      feedback.style.cssText = 'display:block; background:#dcfce7; border:1px solid #86efac; color:#15803d; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Готово!</strong> ${savedCount} студентов сохранены в группе «${escapeHtml(groupName)}» и переданы тьютору Дилрабо Вахидовне.`;
    } else {
      feedback.style.cssText = 'display:block; background:#fef9c3; border:1px solid #fde047; color:#713f12; padding:12px; border-radius:10px; margin-top:14px;';
      feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Сохранено: ${savedCount}. Ошибки: ${errors.join('; ')}`;
    }
  }
}

function sgClearAll() {
  sgDraftStudents = [];
  sgCurrentGroup = '';
  const sel = document.getElementById('sgGroupSelect');
  if (sel) sel.value = '';
  const nameInp = document.getElementById('sgNewGroupName');
  if (nameInp) { nameInp.value = ''; nameInp.style.display = 'none'; }
  const feedback = document.getElementById('sgSaveFeedback');
  if (feedback) feedback.style.display = 'none';
  sgRenderDraftList();
}


async function loadAllStudentsForStarosta() {
  const groupSelect = document.getElementById('starostaGroupSelect');
  if (!groupSelect) return;

  try {
    if (window._supabaseClient) {
      const { data, error } = await window._supabaseClient
        .from('tutor_students')
        .select('*')
        .order('full_name', { ascending: true });
      if (!error && data && data.length > 0) {
        starostaAllStudents = data.map(st => ({
          ...st,
          full_name: st.full_name || st.student_name || '—'
        }));
      } else {
        starostaAllStudents = getCombinedLocalStudents();
      }
    } else {
      starostaAllStudents = getCombinedLocalStudents();
    }
  } catch (e) {
    starostaAllStudents = getCombinedLocalStudents();
  }

  const groupsSet = new Set(starostaAllStudents.map(s => s.group_name).filter(Boolean));

  const groupsArr = Array.from(groupsSet).sort();
  if (groupsArr.length > 0) {
    groupSelect.innerHTML = groupsArr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('');
    groupSelect.value = groupsArr[0];
    onStarostaGroupChange();
  } else {
    groupSelect.innerHTML = '<option value="">— Нет групп. Создайте группу во вкладке «Создание группы» —</option>';
  }
}

function getCombinedLocalStudents() {
  const res = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tsue_tutor_students_')) {
        const arr = JSON.parse(localStorage.getItem(k) || '[]');
        if (Array.isArray(arr)) res.push(...arr);
      }
    }
    const selfReg = JSON.parse(localStorage.getItem('tsue_self_registered_students') || '[]');
    res.push(...selfReg);
  } catch (e) { }
  return res;
}

function onStarostaGroupChange() {
  const selectedGroup = document.getElementById('starostaGroupSelect')?.value;
  starostaFilteredStudents = starostaAllStudents.filter(st => st.group_name === selectedGroup);
  loadStarostaAttendance();
}

let starostaCurrentHemisMap = {};

async function loadStarostaAttendance() {
  const dateStr = document.getElementById('starostaAttendDate')?.value || new Date().toISOString().split('T')[0];
  starostaCurrentHemisMap = await getHemisDayAttendance(dateStr);
  renderStarostaStudentList();
  updateStarostaSummary();
}

function renderStarostaStudentList() {
  const listEl = document.getElementById('starostaStudentList');
  if (!listEl) return;
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const isTutor = currentUser && (currentUser.id === 'tutor-dilrabo-vahidovna' || currentUser.role === 'tutor' || currentUser.role === 'admin');

  if (starostaFilteredStudents.length === 0) {
    listEl.innerHTML = `
      <div class="tc-empty-state">
        <i class="fa-solid fa-users-slash"></i>
        <p>В этой группе пока нет зарегистрированных студентов.</p>
        <small>Добавьте студентов через вкладку «Создание группы»</small>
      </div>
    `;
    return;
  }

  const sorted = [...starostaFilteredStudents].sort((a, b) => {
    if ((a.subgroup || '1') !== (b.subgroup || '1')) {
      return (a.subgroup || '1').localeCompare(b.subgroup || '1');
    }
    return (a.full_name || '').localeCompare(b.full_name || '');
  });

  const rows = sorted.map((st, idx) => {
    const stData = starostaCurrentHemisMap[st.id] || {};
    const curHours = parseInt(stData[pair], 10) || 0;
    let todayTotalNb = 0;
    for (let p = 1; p <= 8; p++) {
      todayTotalNb += (parseInt(stData[String(p)], 10) || 0);
    }
    const rowClass = curHours > 0 ? 'starosta-tr--nb' : '';
    const deleteBtn = isTutor
      ? `<td class="starosta-td--del"><button class="starosta-del-btn" onclick="starostaDeleteStudent('${escapeHtml(String(st.id))}')" title="Удалить студента из группы"><i class="fa-solid fa-trash-can"></i></button></td>`
      : '<td></td>';
    return `
      <tr class="${rowClass}">
        <td class="starosta-td--num">${idx + 1}</td>
        <td class="starosta-td--name">
          <span class="starosta-student-name">${escapeHtml(st.full_name)}</span>
          ${st.hemis_id ? `<span class="starosta-hemis-id">ID: ${escapeHtml(st.hemis_id)}</span>` : ''}
        </td>
        <td class="starosta-td--group">
          <span class="starosta-group-badge">${escapeHtml(st.group_name || '—')}</span>
          <span class="starosta-subgroup">${st.subgroup ? st.subgroup + '-п/г' : '1-п/г'}</span>
        </td>
        <td class="starosta-td--hours">
          <div class="starosta-hours-wrap">
            <input type="number" min="0" max="8" step="1"
              class="starosta-hours-input ${curHours > 0 ? 'is-nb' : ''}"
              value="${curHours}"
              onchange="setStarostaHours('${escapeHtml(String(st.id))}', this.value)"
              oninput="setStarostaHours('${escapeHtml(String(st.id))}', this.value)"
              title="0 = присутствует, 2 = 1 пара НБ">
            <span class="starosta-hours-unit">ч.</span>
          </div>
        </td>
        <td class="starosta-td--today">
          <span class="starosta-today-nb ${todayTotalNb > 0 ? 'is-nb' : ''}">${todayTotalNb > 0 ? todayTotalNb + ' ч. НБ' : 'норма'}</span>
        </td>
        ${deleteBtn}
      </tr>
    `;
  }).join('');

  const delHeader = isTutor ? '<th class="starosta-th--del"></th>' : '<th></th>';

  listEl.innerHTML = `
    <table class="starosta-register-table">
      <thead>
        <tr>
          <th class="starosta-th--num">№</th>
          <th class="starosta-th--name">Ф.И.О. Студента</th>
          <th class="starosta-th--group">Группа / П/гр</th>
          <th class="starosta-th--hours">Часы НБ (пара ${pair})</th>
          <th class="starosta-th--today">Итого сегодня</th>
          ${delHeader}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

async function starostaDeleteStudent(studentId) {
  if (!confirm('Удалить этого студента из группы и журнала?')) return;
  const tutorId = currentUser?.id || 'tutor-dilrabo-vahidovna';
  try {
    if (window._supabaseClient && !String(studentId).startsWith('loc_') && !String(studentId).startsWith('st_')) {
      const { error } = await window._supabaseClient
        .from('tutor_students')
        .delete()
        .eq('id', studentId);
      if (error) throw error;
    } else {
      let localList = loadLocalTutorStudents(tutorId);
      if (!Array.isArray(localList)) localList = [];
      localList = localList.filter(s => String(s.id) !== String(studentId));
      saveLocalTutorStudents(tutorId, localList);
      tutorStudents = localList;
    }
    await loadAllStudentsForStarosta();
    if (typeof loadTutorStudents === 'function') await loadTutorStudents();
  } catch (err) {
    alert('Ошибка при удалении студента: ' + (err.message || 'Сбой'));
  }
}

function setStarostaHours(studentId, hoursVal) {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const hours = Math.max(0, parseInt(hoursVal, 10) || 0);
  if (!starostaCurrentHemisMap[studentId]) starostaCurrentHemisMap[studentId] = {};
  starostaCurrentHemisMap[studentId][pair] = hours;
  updateStarostaSummary();
}

function setStarostaStudentStatus(studentId, hours) {
  setStarostaHours(studentId, hours);
  renderStarostaStudentList();
}

function setAllStarostaStatus(hours) {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const numHours = Math.max(0, parseInt(hours, 10) || 0);
  starostaFilteredStudents.forEach(st => {
    if (!starostaCurrentHemisMap[st.id]) starostaCurrentHemisMap[st.id] = {};
    starostaCurrentHemisMap[st.id][pair] = numHours;
  });
  renderStarostaStudentList();
  updateStarostaSummary();
}

function updateStarostaSummary() {
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  let present = 0, absent = 0, totalHours = 0;
  starostaFilteredStudents.forEach(st => {
    const stData = starostaCurrentHemisMap[st.id] || {};
    const curHours = parseInt(stData[pair], 10) || 0;
    if (curHours === 0) {
      present++;
    } else {
      absent++;
      totalHours += curHours;
    }
  });

  const totalEl = document.getElementById('starostaCountTotal');
  const presEl = document.getElementById('starostaCountPresent');
  const absEl = document.getElementById('starostaCountAbsent');
  const hoursEl = document.getElementById('starostaCountHours');

  if (totalEl) totalEl.textContent = starostaFilteredStudents.length;
  if (presEl) presEl.textContent = present;
  if (absEl) absEl.textContent = absent;
  if (hoursEl) hoursEl.textContent = totalHours + ' ч';
}

async function saveStarostaAttendance() {
  const dateStr = document.getElementById('starostaAttendDate')?.value || new Date().toISOString().split('T')[0];
  const pair = document.getElementById('starostaPairSelect')?.value || '1';
  const subject = document.getElementById('starostaSubject')?.value || '';

  if (subject) {
    starostaFilteredStudents.forEach(st => {
      if (starostaCurrentHemisMap[st.id]) {
        starostaCurrentHemisMap[st.id][`subject_${pair}`] = subject;
      }
    });
  }

  await saveHemisDayAttendance(dateStr, starostaCurrentHemisMap, 'tutor-dilrabo-vahidovna');
  alert(`✅ Отметки за ${pair}-ю пару (${dateStr}) успешно сохранены в системе HEMIS и переданы тьютору Дилрабо Вахидовне!`);
}

function initStudentRegModule() {
  refreshStudentRegGroups();
}

function refreshStudentRegGroups() {
  const select = document.getElementById('sregGroupSelect');
  if (!select) return;

  const currentVal = select.value;
  const groupsSet = new Set();

  // Get groups from real tutor students database
  if (typeof tutorStudents !== 'undefined' && Array.isArray(tutorStudents)) {
    tutorStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }
  if (typeof starostaAllStudents !== 'undefined' && Array.isArray(starostaAllStudents)) {
    starostaAllStudents.forEach(s => { if (s.group_name) groupsSet.add(s.group_name.trim()); });
  }

  const localList = getCombinedLocalStudents();
  localList.forEach(s => {
    if (s.group_name) groupsSet.add(s.group_name.trim());
  });

  const arr = Array.from(groupsSet).sort();
  select.innerHTML = `
    <option value="">— Выберите группу —</option>
    ${arr.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}
    <option value="__NEW__">+ Другая (Создать новую группу)...</option>
  `;

  if (currentVal && arr.includes(currentVal)) {
    select.value = currentVal;
  }
}


function toggleCustomGroupInput(val) {
  const wrap = document.getElementById('sregCustomGroupWrap');
  if (wrap) {
    wrap.style.display = val === '__NEW__' ? 'block' : 'none';
    if (val === '__NEW__') {
      const inp = document.getElementById('sregCustomGroup');
      if (inp) inp.focus();
    }
  }
}

async function handleStudentSelfRegistration(event) {
  event.preventDefault();
  const feedback = document.getElementById('sregFeedback');
  const submitBtn = document.getElementById('sregSubmitBtn');

  const fullName = (document.getElementById('sregFullName')?.value || '').trim();
  let group = document.getElementById('sregGroupSelect')?.value;
  if (group === '__NEW__') {
    group = (document.getElementById('sregCustomGroup')?.value || '').trim().toUpperCase();
  }
  const hemis = (document.getElementById('sregHemisId')?.value || '').trim();
  const phone = (document.getElementById('sregPhone')?.value || '').trim();
  const email = (document.getElementById('sregEmail')?.value || '').trim();
  const notes = (document.getElementById('sregNotes')?.value || '').trim();

  if (!fullName || !group) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Пожалуйста, заполните Ф.И.О. и выберите или укажите группу.';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Регистрация...';
  }

  let existingGroupStudents = [];
  try {
    if (window._supabaseClient) {
      const { data } = await window._supabaseClient
        .from('tutor_students')
        .select('*')
        .eq('group_name', group);
      if (data) existingGroupStudents = data;
    }
  } catch (e) { }

  if (existingGroupStudents.length === 0) {
    const allLocal = getCombinedLocalStudents();
    existingGroupStudents = allLocal.filter(s => s.group_name === group);
  }

  const groupTotal = existingGroupStudents.length;
  const calculatedSubgroup = (groupTotal % 26) < 13 ? '1' : '2';

  const newStudent = {
    full_name: fullName,
    student_name: fullName,
    group_name: group,
    subgroup: calculatedSubgroup,
    hemis_id: hemis,
    phone: phone,
    email: email,
    notes: notes || 'Самостоятельная регистрация студента',
    tutor_id: 'tutor-dilrabo-vahidovna'
  };

  try {
    let savedId = 'st_self_' + Date.now();
    if (window._supabaseClient) {
      const { data, error } = await window._supabaseClient
        .from('tutor_students')
        .insert([newStudent])
        .select();
      if (!error && data && data[0]) {
        savedId = data[0].id;
      }
    }

    newStudent.id = savedId;

    const selfList = JSON.parse(localStorage.getItem('tsue_self_registered_students') || '[]');
    selfList.push(newStudent);
    localStorage.setItem('tsue_self_registered_students', JSON.stringify(selfList));

    let tutorList = loadLocalTutorStudents('tutor-dilrabo-vahidovna');
    if (!Array.isArray(tutorList)) tutorList = [];
    tutorList.push(newStudent);
    saveLocalTutorStudents('tutor-dilrabo-vahidovna', tutorList);
    tutorStudents = tutorList;

    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'sreg-info-alert';
      feedback.style.background = '#dcfce7';
      feedback.style.borderColor = '#86efac';
      feedback.style.color = '#15803d';
      feedback.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <div>
          <strong>Вы успешно зарегистрированы!</strong><br>
          Группа: <strong>${escapeHtml(group)}</strong> · Вам автоматически присвоена <strong>${calculatedSubgroup}-я подгруппа</strong> (по правилу 13 человек на подгруппу).
          Данные переданы тьюторам и в мобильный журнал старосты.
        </div>
      `;
    }

    document.getElementById('studentSelfRegForm').reset();
    document.getElementById('sregCustomGroupWrap').style.display = 'none';

    await loadAllStudentsForStarosta();
    refreshStudentRegGroups();
  } catch (err) {
    console.error('Self-reg error:', err);
    if (feedback) {
      feedback.style.display = 'block';
      feedback.className = 'auth-modal-error';
      feedback.textContent = 'Ошибка регистрации: ' + (err.message || 'Сбой сети');
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> Зарегистрироваться в реестре группы';
    }
  }
}

