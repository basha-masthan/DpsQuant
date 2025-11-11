/* ====== Utilities & State (mock data) ====== */
const courses = [
  {
    id: 'apt-101',
    title: 'Quantitative Aptitude',
    tags: ['Math', 'Logic', 'Reasoning'],
    level: 'beginner',
    lessons: 45,
    duration: '8h',
    progress: 25
  },
  {
    id: 'dsa-201',
    title: 'Data Structures & Algorithms',
    tags: ['Arrays', 'Trees', 'Graphs', 'DP'],
    level: 'intermediate',
    lessons: 70,
    duration: '15h',
    progress: 40
  },
  {
    id: 'com-110',
    title: 'Communication Skills',
    tags: ['Presentation', 'GD', 'HR', 'Email'],
    level: 'beginner',
    lessons: 35,
    duration: '6h',
    progress: 15
  },
  {
    id: 'ps-210',
    title: 'Problem Solving Techniques',
    tags: ['Logic', 'Patterns', 'Puzzles'],
    level: 'intermediate',
    lessons: 28,
    duration: '5h',
    progress: 55
  },
  {
    id: 'cs-301',
    title: 'Company-Specific Preparation',
    tags: ['TCS', 'Infosys', 'Wipro', 'Mock Tests'],
    level: 'advanced',
    lessons: 40,
    duration: '8h',
    progress: 10
  },
  {
    id: 'mock-401',
    title: 'Mock Interviews & Assessment',
    tags: ['Technical', 'HR', 'Resume Review'],
    level: 'advanced',
    lessons: 12,
    duration: '3h',
    progress: 5
  }
];

const events = [
  { title: 'Quantitative Aptitude Workshop', date: 'Fri, 15 Nov · 7:00 PM', info: 'Advanced problem-solving techniques', type: 'Live' },
  { title: 'Coding Challenge #15', date: 'Sun, 17 Nov · 6:00 PM', info: 'Data Structures & Algorithms, 90 mins', type: 'Contest' },
  { title: 'Communication Skills Session', date: 'Wed, 20 Nov · 5:30 PM', info: 'Interview communication & body language', type: 'Workshop' },
  { title: 'Company-Specific Mock Tests', date: 'Sat, 23 Nov · 11:00 AM', info: 'TCS, Infosys & Wipro patterns', type: 'Prep' }
];

/* ====== DOM Helpers ====== */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

/* ====== Drawer (mobile nav) ====== */
const drawer = $('#drawer');
const drawerBackdrop = $('#drawerBackdrop');
$('#openDrawer')?.addEventListener('click', () => {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('show');
});
$('#closeDrawer')?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);
$$('.drawer__link').forEach(a => a.addEventListener('click', closeDrawer));
function closeDrawer(){
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('show');
}

/* ====== Login Modal ====== */
const loginModal = $('#loginModal');
const loginBackdrop = $('#loginBackdrop');
['loginBtn','loginBtnCard','loginBtnDrawer'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('click', () => {
    loginModal.classList.add('show');
    loginBackdrop.classList.add('show');
  });
});
$('#closeLogin')?.addEventListener('click', closeLogin);
loginBackdrop?.addEventListener('click', closeLogin);
function closeLogin(){
  loginModal.classList.remove('show');
  loginBackdrop.classList.remove('show');
}
$('#loginForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('This is a demo login. Hook up your backend auth here.');
  closeLogin();
});

/* ====== Year in footer ====== */
$('#year').textContent = new Date().getFullYear();

/* ====== Populate Snapshot ====== */
(function buildSnapshot(){
  const list = $('#snapshotList');
  const top3 = courses.slice(0,3);
  let total = 0;
  top3.forEach(c=>{
    total += c.progress;
    const li = document.createElement('li');
    li.className = 'mini';
    li.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong>${c.title}</strong>
        <span class="badge">${c.progress}%</span>
      </div>
      <div class="progress__bar" style="margin-top:6px"><span style="width:${c.progress}%"></span></div>
    `;
    list.appendChild(li);
  });
  const avg = Math.round(total / top3.length);
  $('#totalProgressLabel').textContent = avg + '%';
  $('#totalProgressBar').style.width = avg + '%';
})();

/* ====== Build Course Cards ====== */
function courseTagHTML(tags){
  return tags.map(t=>`<span class="tag">${t}</span>`).join(' ');
}
function levelBadge(level){
  const map = { beginner:'Beginner', intermediate:'Intermediate', advanced:'Advanced' };
  return `<span class="badge">${map[level]||'Level'}</span>`;
}
function courseCard(c){
  return `
  <article class="course reveal" data-level="${c.level}" data-title="${c.title.toLowerCase()} ${c.tags.join(' ').toLowerCase()}">
    <div class="course__head">
      <div class="course__title">${c.title}</div>
      ${levelBadge(c.level)}
    </div>
    <div class="course__meta">
      <span>🧩 ${c.lessons} lessons</span>
      <span>⏱ ${c.duration}</span>
    </div>
    <div class="course__tags">${courseTagHTML(c.tags)}</div>
    <div class="course__progress">
      <div class="progress__label"><span>Progress</span><span>${c.progress}%</span></div>
      <div class="progress__bar"><span style="width:${c.progress}%"></span></div>
    </div>
    <div class="course__actions">
      <button class="btn btn--ghost" data-enroll="${c.id}">Preview</button>
      <button class="btn btn--primary" data-enroll="${c.id}">Enroll</button>
    </div>
  </article>`;
}
function buildCourses(list){
  const grid = $('#courseGrid');
  grid.innerHTML = list.map(courseCard).join('');
}
buildCourses(courses);

/* ====== Filters & Search ====== */
const searchInput = $('#searchInput');
const levelChips = $$('#levelChips .chip');
const sortSelect = $('#sortSelect');

let state = {
  level: 'all',
  search: '',
  sort: 'recommended'
};

function applyFilters(){
  let list = courses.filter(c=>{
    const matchLevel = state.level==='all' || c.level===state.level;
    const text = (c.title + ' ' + c.tags.join(' ')).toLowerCase();
    const matchSearch = text.includes(state.search.toLowerCase());
    return matchLevel && matchSearch;
  });

  if(state.sort==='new'){
    list = list.slice().reverse();
  }else if(state.sort==='progress'){
    list = list.slice().sort((a,b)=>b.progress-a.progress);
  }

  buildCourses(list);
  // re-run reveal for new nodes
  observeReveals();
}

searchInput.addEventListener('input', (e)=>{
  state.search = e.target.value.trim();
  applyFilters();
});
levelChips.forEach(ch=>{
  ch.addEventListener('click', ()=>{
    levelChips.forEach(c=>c.classList.remove('chip--active'));
    ch.classList.add('chip--active');
    state.level = ch.dataset.level;
    applyFilters();
  });
});
sortSelect.addEventListener('change', (e)=>{
  state.sort = e.target.value;
  applyFilters();
});

/* ====== Timeline (Announcements) ====== */
(function buildTimeline(){
  const root = $('#timeline');
  root.innerHTML = events.map(ev => `
    <div class="event reveal">
      <div class="event__dot"></div>
      <div>
        <strong>${ev.title}</strong>
        <div class="muted">${ev.info}</div>
      </div>
      <div class="event__time">${ev.date}</div>
    </div>
  `).join('');
})();

/* ====== Reveal on Scroll (IntersectionObserver) ====== */
let revealObserver;
function observeReveals(){
  if(revealObserver) revealObserver.disconnect();
  const items = $$('.reveal');
  revealObserver = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el=>revealObserver.observe(el));
}
observeReveals();

/* ====== Fun animated counters in Stats ====== */
function animateNumber(el){
  const target = el.getAttribute('data-count');
  // Keep non-digits (like "+" or "%")
  const match = target.match(/([\d,\.]+)/);
  const suffix = target.replace(match[1], '');
  const goal = Number(match[1].replace(/,/g,''));
  let now = 0;
  const step = Math.max(1, Math.round(goal / 60));
  const t = setInterval(()=>{
    now += step;
    if(now >= goal){
      now = goal;
      clearInterval(t);
      el.setAttribute('data-animated', 'true');
      setTimeout(() => el.removeAttribute('data-animated'), 600);
    }
    el.textContent = now.toLocaleString() + suffix;
  }, 16);
}
$$('.stat__num').forEach(el=>{
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){ animateNumber(el); io.unobserve(el); }
    });
  }, {threshold: .6});
  io.observe(el);
});

/* ====== Enroll / Preview demo handlers ====== */
document.body.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-enroll]');
  if(!btn) return;
  const id = btn.getAttribute('data-enroll');
  const course = courses.find(c=>c.id===id);
  if(!course) return;
  alert(`Demo action: "${btn.textContent}" for "${course.title}".\nHook this to your real course route.`);
});
