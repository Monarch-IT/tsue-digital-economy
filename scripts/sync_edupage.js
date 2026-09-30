const https = require('https');
const fs = require('fs');
const path = require('path');

const payload = JSON.stringify({ "__args": [null, "94"], "__gsh": "00000000" });

const req = https.request("https://tsue.edupage.org/timetable/server/regulartt.js?__func=regularttGetData", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload)
  }
}, (res) => {
  let body = "";
  res.on("data", c => body += c);
  res.on("end", () => {
    try {
      const data = JSON.parse(body);
      const tables = data.r.dbiAccessorRes.tables;
      const getT = id => tables.find(t => t.id === id)?.data_rows || [];

      const classes = getT("classes");
      const teachers = getT("teachers");
      const classrooms = getT("classrooms");
      const subjects = getT("subjects");
      const lessons = getT("lessons");
      const cards = getT("cards");

      const tMap = Object.fromEntries(teachers.map(t => [t.id, t.name || t.short]));
      const rMap = Object.fromEntries(classrooms.map(r => [r.id, r.name || r.short]));
      const sMap = Object.fromEntries(subjects.map(s => [s.id, s.name || s.short]));
      const sColorMap = Object.fromEntries(subjects.map(s => [s.id, s.color || '']));
      const lMap = Object.fromEntries(lessons.map(l => [l.id, l]));

      const targetClasses = classes.filter(c => {
        const num = parseInt(c.id.replace("*", ""), 10);
        return num >= 414 && num <= 537;
      });

      console.log("Found", targetClasses.length, "faculty classes in EduPage (414-537)");

      const scheduleResult = {};

      targetClasses.forEach(cls => {
        const gName = cls.name.trim();

        let course = 1;
        if (gName.includes('/26')) course = 1;
        else if (gName.includes('/25')) course = 2;
        else if (gName.includes('/24')) course = 3;
        else if (gName.includes('/23')) course = 4;

        scheduleResult[gName] = {
          name: gName,
          edupageClassId: cls.id,
          course: course,
          odd: { 0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{} },
          even: { 0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{} }
        };
      });

      let mappedCards = 0;
      cards.forEach(card => {
        const lesson = lMap[card.lessonid];
        if (!lesson) return;

        const classIds = lesson.classids || [];
        classIds.forEach(clsId => {
          const cls = targetClasses.find(c => c.id === clsId);
          if (!cls) return;

          const gName = cls.name.trim();
          const targetObj = scheduleResult[gName];
          if (!targetObj) return;

          let dayIdx = 0;
          if (card.days) {
            const idx = card.days.indexOf("1");
            if (idx >= 0) dayIdx = idx;
          }

          const slotIdx = (parseInt(card.period, 10) || 1) - 1;
          const weeks = card.weeks || '';
          const isOdd  = !weeks || weeks[0] === '1';
          const isEven = !weeks || weeks[1] === '1';

          const subjectName = (sMap[lesson.subjectid] || 'Занятие').trim();
          const teacherName = (lesson.teacherids || []).map(tid => tMap[tid]).filter(Boolean).join(', ') || '';
          const roomName = (card.classroomids || []).map(rid => rMap[rid]).filter(Boolean).join(', ') || '';
          const edupageColor = sColorMap[lesson.subjectid] || '';

          let type = 'lecture';
          const sLower = subjectName.toLowerCase();
          if (sLower.includes('lab') || sLower.includes('лаб')) {
            type = 'lab';
          } else if (sLower.includes('sem') || sLower.includes('сем')) {
            type = 'seminar';
          } else if (sLower.includes('amaliy') || sLower.includes('am)') || sLower.includes('прак')) {
            type = 'practice';
          } else if (sLower.includes('naviyo') || sLower.includes('ma\u2018naviyat') || sLower.includes('kelajak')) {
            type = 'naviyat';
          } else if (sLower.includes('sport') || sLower.includes('jismoniy')) {
            type = 'sport';
          } else if (sLower.includes('ma)') || sLower.includes('ma\'') || sLower.includes('lek') || sLower.includes('лек')) {
            type = 'lecture';
          }

          const lessonCard = {
            subject: subjectName,
            type: type,
            teacher: teacherName,
            room: roomName,
            color: edupageColor
          };

          if (isOdd && targetObj.odd[dayIdx] && !targetObj.odd[dayIdx][slotIdx]) {
            targetObj.odd[dayIdx][slotIdx] = lessonCard;
          }
          if (isEven && targetObj.even[dayIdx] && !targetObj.even[dayIdx][slotIdx]) {
            targetObj.even[dayIdx][slotIdx] = lessonCard;
          }
          mappedCards++;
        });
      });

      const outDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      const outPath = path.join(outDir, 'edupage_schedule.json');
      fs.writeFileSync(outPath, JSON.stringify(scheduleResult, null, 2), 'utf-8');

      const jsPath = path.join(__dirname, '..', 'js', 'edupage_data.js');
      fs.writeFileSync(jsPath, 'const EDUPAGE_SCHEDULE_DATA = ' + JSON.stringify(scheduleResult) + ';\n', 'utf-8');

      console.log(`Saved schedule for ${Object.keys(scheduleResult).length} groups (${mappedCards} card placements) to ${outPath} and ${jsPath}`);
    } catch(e) {
      console.error("Error processing EduPage data:", e);
    }
  });
});

req.on("error", (e) => {
  console.error("HTTP error:", e);
});

req.write(payload);
req.end();
