const scheduleList = [];
const announcements = [];
const attendanceRecords = [];
let role = 'student'; // Default role

// Switch role and update UI visibility
function switchRole(newRole) {
  role = newRole;
  document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.faculty-only').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.student-only').forEach(el => el.classList.add('hidden'));
  
  if (role === 'admin') {
    document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'faculty') {
    document.querySelectorAll('.faculty-only').forEach(el => el.classList.remove('hidden'));
  } else if (role === 'student') {
    document.querySelectorAll('.student-only').forEach(el => el.classList.remove('hidden'));
    renderStudentView();
  }
}

// Add a new schedule item
function addSchedule(event) {
  event.preventDefault();
  const course = document.getElementById('course').value;
  const faculty = document.getElementById('faculty').value;
  const day = document.getElementById('day').value;
  const time = document.getElementById('time').value;

  const conflict = scheduleList.find(s => s.day === day && s.time === time);
  if (conflict) {
    alert("Schedule conflict detected!");
    return;
  }

  scheduleList.push({ course, faculty, day, time });
  renderScheduleList();
  document.getElementById('schedule-form').reset();
}

// Render the schedule list
function renderScheduleList() {
  const scheduleListElement = document.getElementById('schedule-list');
  scheduleListElement.innerHTML = scheduleList.map(s => 
    `<div>${s.course} on ${s.day} at ${s.time} by ${s.faculty}</div>`
  ).join('');
}

// Post a new announcement
function postAnnouncement(event) {
  event.preventDefault();
  const text = document.getElementById('announcement-text').value;
  announcements.push(text);
  renderAnnouncements();
  document.getElementById('announcement-form').reset();
}

// Render the announcement list
function renderAnnouncements() {
  const announcementListElement = document.getElementById('announcement-list');
  announcementListElement.innerHTML = announcements.map(a => `<div>${a}</div>`).join('');
}

// Mark attendance for a student
function markAttendance(event) {
  event.preventDefault();
  const courseName = document.getElementById('course-name').value;
  const date = document.getElementById('attendance-date').value;
  const studentName = document.getElementById('student-name').value; // Corrected ID
  const status = document.getElementById('attendance-status').value;

  if (!courseName || !date || !studentName || !status) {
    alert("Please fill in all fields.");
    return;
  }

  attendanceRecords.push({ courseName, date, studentName, status });
  renderAttendanceList();
  document.getElementById('attendance-form').reset();
}

// Render the attendance list
function renderAttendanceList() {
  const attendanceListElement = document.getElementById('attendance-list');
  attendanceListElement.innerHTML = attendanceRecords.map(a =>
    `<div>${a.date} - ${a.courseName}: ${a.studentName} is ${a.status}</div>`
  ).join('');
}

// Render the student view
function renderStudentView() {
  const studentScheduleElement = document.getElementById('student-schedule');
  studentScheduleElement.innerHTML = scheduleList.map(s => 
    `<div>${s.course} on ${s.day} at ${s.time} by ${s.faculty}</div>`).join('');
  
  const studentAnnouncementsElement = document.getElementById('student-announcements');
  studentAnnouncementsElement.innerHTML = announcements.map(a => 
    `<div>${a}</div>`).join('');
}

// Initialize the interface
switchRole(role);