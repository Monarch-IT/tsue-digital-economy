let starostaAllStudents = [];
let starostaFilteredStudents = [];
let starostaAttendanceMap = {};

async function initStarostaModule() {
  const dateInput = document.getElementById("starostaAttendDate");
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
  await loadAllStudentsForStarosta();
}

function showStarostaSubTab(panel) {
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
    groupSelect.value = groupsArr[0];
    onStarostaGroupChange();
  } else {
    groupSelect.innerHTML = '<option value="">— Нет групп в базе данных —</option>';
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
        <p>В этой группе пока нет студентов в базе данных.</p>
        <small>Студенты загружаются администратором через систему управления базой данных.</small>
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

  const tutorId = currentUser?.id || 'tutor-dilrabo-vahidovna';
  await saveHemisDayAttendance(dateStr, starostaCurrentHemisMap, tutorId);
  alert(`✅ Отметки за ${pair}-ю пару (${dateStr}) успешно сохранены в журнале HEMIS!`);
}

function initStudentRegModule() {
  refreshStudentRegGroups();
}

function refreshStudentRegGroups() {
  const select = document.getElementById('sregGroupSelect');
  if (!select) return;

  const currentVal = select.value;
  const groupsSet = new Set();

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
  `;

  if (currentVal && arr.includes(currentVal)) {
    select.value = currentVal;
  }
}

function toggleCustomGroupInput(val) {
}

async function handleStudentSelfRegistration(event) {
  event.preventDefault();
  const feedback = document.getElementById('sregFeedback');
  const submitBtn = document.getElementById('sregSubmitBtn');

  const fullName = (document.getElementById('sregFullName')?.value || '').trim();
  const group = (document.getElementById('sregGroupSelect')?.value || '').trim();
  const hemis = (document.getElementById('sregHemisId')?.value || '').trim();
  const phone = (document.getElementById('sregPhone')?.value || '').trim();
  const email = (document.getElementById('sregEmail')?.value || '').trim();
  const birthDate = (document.getElementById('sregBirthDate')?.value || '').trim();
  const address = (document.getElementById('sregAddress')?.value || '').trim();
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
    birth_date: birthDate,
    permanent_address: address,
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

