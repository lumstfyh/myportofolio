/* ===== THEME ===== */
const html     = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const icon     = document.getElementById('themeIcon');
const saved    = localStorage.getItem('theme') ||
                 (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
setTheme(saved);

function setTheme(t) {
  html.dataset.theme = t;
  icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', t);
}
themeBtn.addEventListener('click', () =>
  setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  // lock body scroll when menu open
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// close menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', closeMenu));

// close menu when clicking the backdrop
navLinks.addEventListener('click', e => {
  if (e.target === navLinks) closeMenu();
});

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-link');

function onScroll() {
  const y = window.scrollY + 90;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      links.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (a) a.classList.add('active');
    }
  });
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ===== BACK TO TOP ===== */
document.getElementById('btt').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== SMOOTH TYPEWRITER EFFECT ===== */
const roles = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
const typed  = document.getElementById('typedText');

let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
let isPaused    = false;

// Speeds (ms per frame)
const TYPE_SPEED   = 80;   // typing speed
const DELETE_SPEED = 45;   // deleting speed (faster)
const PAUSE_AFTER  = 2000; // pause when word complete
const PAUSE_BEFORE = 350;  // pause before typing next word

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (isPaused) return; // pausing handled via setTimeout

  if (!isDeleting) {
    // Typing forward
    charIndex++;
    typed.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      // Word fully typed — pause before deleting
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        isDeleting = true;
        requestAnimationFrame(tick);
      }, PAUSE_AFTER);
      return;
    }
  } else {
    // Deleting
    charIndex--;
    typed.textContent = currentRole.slice(0, charIndex);

    if (charIndex === 0) {
      // Word fully deleted — move to next word, pause briefly
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        requestAnimationFrame(tick);
      }, PAUSE_BEFORE);
      return;
    }
  }

  requestAnimationFrame(tick);
}

let lastTime = 0;
function tick(timestamp = 0) {
  if (isPaused) return;
  const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
  if (timestamp - lastTime >= speed) {
    lastTime = timestamp;
    typeWriter();
  } else {
    requestAnimationFrame(tick);
  }
}

// Start after brief delay
setTimeout(() => requestAnimationFrame(tick), 700);

/* ===== REVEAL ON SCROLL ===== */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal, .stagger').forEach(el => revealObs.observe(el));

/* ===== SKILL BARS ===== */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar__fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: .25 });
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));