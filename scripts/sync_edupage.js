 

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function postJSON(url, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(new Error(`Failed to parse JSON: ${err.message}`));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function getActiveTimetableId() {
  try {
    const currentYear = new Date().getFullYear();
    const resp = await postJSON('https://tsue.edupage.org/timetable/server/ttviewer.js?__func=getTTViewerData', {
      __args: [null, currentYear],
      __gsh: '00000000'
    });
    if (resp?.r?.regular?.default_num) {
      console.log(`Discovered active EduPage timetable ID: ${resp.r.regular.default_num}`);
      return String(resp.r.regular.default_num);
    }
  } catch (e) {
    console.warn('Could not discover timetable ID dynamically, falling back to 94:', e.message);
  }
  return '94';
}

async function syncAllFacultiesSchedule() {
  console.log(`[${new Date().toISOString()}] Starting EduPage Full Schedule Sync...`);
  const ttId = await getActiveTimetableId();

  const data = await postJSON('https://tsue.edupage.org/timetable/server/regulartt.js?__func=regularttGetData', {
    __args: [null, ttId],
    __gsh: '00000000'
  });

  if (!data?.r?.dbiAccessorRes?.tables) {
    throw new Error('Invalid response structure from EduPage regularttGetData');
  }

  const tables = data.r.dbiAccessorRes.tables;
  const getT = id => tables.find(t => t.id === id)?.data_rows || [];

  const classes = getT('classes');
  const teachers = getT('teachers');
  const classrooms = getT('classrooms');
  const subjects = getT('subjects');
  const lessons = getT('lessons');
  const cards = getT('cards');

  const tMap = Object.fromEntries(teachers.map(t => [t.id, t.name || t.short]));
  const rMap = Object.fromEntries(classrooms.map(r => {
    let nm = (r.short || r.name || '').trim();
    nm = nm.replace(/\/{2,}/g, '/');  
    return [r.id, nm];
  }));
  const sMap = Object.fromEntries(subjects.map(s => [s.id, s.name || s.short]));
  const sColorMap = Object.fromEntries(subjects.map(s => [s.id, s.color || '']));
  const lMap = Object.fromEntries(lessons.map(l => [l.id, l]));

  let currentFaculty = 'Umumiy';
  const classFacultyMap = {};
  const validClasses = [];

  classes.forEach(c => {
    const n = (c.name || '').trim();
    const upper = n.toUpperCase();

    if (upper.includes('MENEJMENT')) currentFaculty = 'Menejment fakulteti';
    else if (upper === 'IQTISODIYOT') currentFaculty = 'Iqtisodiyot fakulteti';
    else if (upper.includes('RAQAMLI')) currentFaculty = 'Raqamli iqtisodiyot fakulteti';
    else if (upper.includes('BUXGALTERIYA')) currentFaculty = 'Buxgalteriya fakulteti';
    else if (upper.includes('SOLIQ')) currentFaculty = 'Moliya va soliq fakulteti';
    else if (upper.includes('MASOFAVIY')) currentFaculty = 'Masofaviy ta\'lim fakulteti';

    if (!n || n === '-' || n === '.' || n === '---' || upper.includes('FAKULTET') || upper.includes('KURS') || upper === 'RAQAMLI IQT' || upper === 'IQTISODIYOT') {
      return;
    }

    classFacultyMap[c.id] = currentFaculty;
    validClasses.push(c);
  });

  console.log(`Discovered ${validClasses.length} valid study groups across all faculties.`);

  const scheduleResult = {};
  validClasses.forEach(cls => {
    const gName = cls.name.trim();
    let course = 1;
    if (gName.includes('/26') || gName.includes('-1') || gName.includes('1-kurs')) course = 1;
    else if (gName.includes('/25') || gName.includes('2-kurs')) course = 2;
    else if (gName.includes('/24') || gName.includes('3-kurs')) course = 3;
    else if (gName.includes('/23') || gName.includes('4-kurs')) course = 4;

    scheduleResult[gName] = {
      name: gName,
      edupageClassId: cls.id,
      course: course,
      faculty: classFacultyMap[cls.id] || 'Raqamli iqtisodiyot fakulteti',
      odd: { 0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{} },
      even: { 0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{} }
    };
  });

  let mappedCards = 0;
  cards.forEach(card => {
    if (!card.period || !card.days || !card.days.includes('1')) return;
    const lesson = lMap[card.lessonid];
    if (!lesson) return;

    const classIds = lesson.classids || [];
    classIds.forEach(clsId => {
      const targetCls = validClasses.find(c => c.id === clsId);
      if (!targetCls) return;
      const gName = targetCls.name.trim();
      const targetObj = scheduleResult[gName];
      if (!targetObj) return;

      const dayIdx = card.days.indexOf('1');
      if (dayIdx < 0 || dayIdx > 5) return;
      const slotIdx = (parseInt(card.period, 10) || 1) - 1;
      if (slotIdx < 0 || slotIdx > 7) return;

      const weeks = card.weeks || '';
      const isOdd  = !weeks || weeks[0] === '1';
      const isEven = !weeks || weeks[1] === '1';

      const rawSubject = (sMap[lesson.subjectid] || 'Dars').trim();
      const teacherName = (lesson.teacherids || []).map(tid => tMap[tid]).filter(Boolean).join(', ') || '';
      const roomName = (card.classroomids || [])
        .map(rid => rMap[rid] || '')
        .filter(Boolean)
        .join(', ') || '';
      const edupageColor = sColorMap[lesson.subjectid] || '';

      let type = 'lecture';
      const sLower = rawSubject.toLowerCase();
      if (sLower.includes('lab') || sLower.includes('лаб')) type = 'lab';
      else if (sLower.includes('sem') || sLower.includes('сем')) type = 'seminar';
      else if (sLower.includes('amaliy') || sLower.includes('am)') || sLower.includes('прак')) type = 'practice';
      else if (sLower.includes('kelajak') || sLower.includes('naviyo') || sLower.includes('ma\u2018naviyat')) type = 'naviyat';
      else if (sLower.includes('sport') || sLower.includes('jismoniy')) type = 'sport';
      else if (sLower.includes('(ma)') || sLower.includes('lek') || sLower.includes('лек')) type = 'lecture';

      const lessonCard = {
        subject: rawSubject,
        type: type,
        teacher: teacherName,
        room: roomName,
        color: edupageColor
      };

      if (isOdd) targetObj.odd[dayIdx][slotIdx] = lessonCard;
      if (isEven) targetObj.even[dayIdx][slotIdx] = lessonCard;
      mappedCards++;
    });
  });

  const baseDir = path.resolve(__dirname, '..');
  const outDir = path.join(baseDir, 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const scheduleContent = JSON.stringify(scheduleResult);
  const outPath = path.join(outDir, 'edupage_schedule.json');
  fs.writeFileSync(outPath, scheduleContent, 'utf-8');

  const jsPath = path.join(baseDir, 'js', 'edupage_data.js');
  fs.writeFileSync(jsPath, 'const EDUPAGE_SCHEDULE_DATA = ' + scheduleContent + ';\n', 'utf-8');

   
  const sha256 = crypto.createHash('sha256').update(scheduleContent).digest('hex');
  const stat = fs.statSync(outPath);
  const now = new Date();

  const manifest = {
    schema_version: '2.0.0',
    app: 'TSUE Digital Economy & Mobile Ecosystem',
    timetable_version_id: String(ttId),
    updated_at: now.toISOString(),
    timestamp: now.getTime(),
    sha256: sha256,
    size_bytes: stat.size,
    total_groups: Object.keys(scheduleResult).length,
    total_cards: mappedCards,
    remote_endpoints: {
      schedule_json: 'https://tsue-digital-economy.web.app/data/edupage_schedule.json',
      schedule_js: 'https://tsue-digital-economy.web.app/js/edupage_data.js',
      manifest_json: 'https://tsue-digital-economy.web.app/data/schedule_manifest.json'
    },
    sync_policy: {
      cron_nightly_runs: ['00:00', '02:00'],
      timezone: 'Asia/Tashkent',
      cache_ttl_seconds: 3600
    }
  };

  const manifestPath = path.join(outDir, 'schedule_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Wrote schedule manifest to ${manifestPath}`);

   
  const targets = [
    {
      dir: '/home/monarch/Projects/TSUE-Ecosystem_Local',
      json: '/home/monarch/Projects/TSUE-Ecosystem_Local/data/edupage_schedule.json',
      js: '/home/monarch/Projects/TSUE-Ecosystem_Local/js/edupage_data.js',
      manifest: '/home/monarch/Projects/TSUE-Ecosystem_Local/data/schedule_manifest.json'
    },
    {
      dir: '/home/monarch/Projects/riat-android/app/src/main/assets/web',
      json: '/home/monarch/Projects/riat-android/app/src/main/assets/web/data/edupage_schedule.json',
      js: '/home/monarch/Projects/riat-android/app/src/main/assets/web/js/edupage_data.js',
      manifest: '/home/monarch/Projects/riat-android/app/src/main/assets/web/data/schedule_manifest.json'
    }
  ];

  for (const t of targets) {
    if (fs.existsSync(t.dir)) {
      try {
        const jDir = path.dirname(t.json);
        if (!fs.existsSync(jDir)) fs.mkdirSync(jDir, { recursive: true });
        fs.copyFileSync(outPath, t.json);

        const sDir = path.dirname(t.js);
        if (!fs.existsSync(sDir)) fs.mkdirSync(sDir, { recursive: true });
        fs.copyFileSync(jsPath, t.js);

        if (t.manifest) {
          const mDir = path.dirname(t.manifest);
          if (!fs.existsSync(mDir)) fs.mkdirSync(mDir, { recursive: true });
          fs.copyFileSync(manifestPath, t.manifest);
        }
        console.log(`Synced schedule & manifest to ${t.dir}`);
      } catch (err) {
        console.warn(`Could not sync to ${t.dir}:`, err.message);
      }
    }
  }

  console.log(`[${now.toISOString()}] Successfully synchronized ${Object.keys(scheduleResult).length} groups (${mappedCards} active card placements). SHA256: ${sha256}`);
  return { scheduleResult, manifest };
}

if (require.main === module) {
  syncAllFacultiesSchedule()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('EduPage Sync Error:', err);
      process.exit(1);
    });
}

module.exports = { syncAllFacultiesSchedule };
