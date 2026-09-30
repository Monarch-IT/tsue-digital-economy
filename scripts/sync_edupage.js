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
      const lMap = Object.fromEntries(lessons.map(l => [l.id, l]));

      // Filter classes between *414 and *537
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
          const isOdd = !card.weeks || card.weeks.includes("1") || card.weeks === "10";
          const isEven = !card.weeks || card.weeks === "01" || card.weeks === "11" || card.weeks === "";

          const subjectName = (sMap[lesson.subjectid] || "Занятие").trim();
          const teacherName = (lesson.teacherids || []).map(tid => tMap[tid]).filter(Boolean).join(", ") || "";
          const roomName = (card.classroomids || []).map(rid => rMap[rid]).filter(Boolean).join(", ") || "";

          let type = "lecture";
          const sLower = subjectName.toLowerCase();
          if (sLower.includes("прак") || sLower.includes("amaliy")) type = "practice";
          else if (sLower.includes("лаб") || sLower.includes("laborat")) type = "lab";
          else if (sLower.includes("сем") || sLower.includes("seminar")) type = "seminar";

          const lessonCard = {
            subject: subjectName,
            type: type,
            teacher: teacherName,
            room: roomName
          };

          if (isOdd && targetObj.odd[dayIdx]) {
            targetObj.odd[dayIdx][slotIdx] = lessonCard;
          }
          if (isEven && targetObj.even[dayIdx]) {
            targetObj.even[dayIdx][slotIdx] = lessonCard;
          }
          mappedCards++;
        });
      });

      const outDir = path.join(__dirname, '..', 'data');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      const outPath = path.join(outDir, 'edupage_schedule.json');
      fs.writeFileSync(outPath, JSON.stringify(scheduleResult, null, 2), 'utf-8');
      console.log(`Saved schedule for ${Object.keys(scheduleResult).length} groups (${mappedCards} card placements) to ${outPath}`);
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
