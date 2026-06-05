document.getElementById('year').textContent = new Date().getFullYear();

const phrases = [
  'Yazılım Geliştirici',
  'Flutter & Mobil Dev',
  'Spring Boot Backend Dev',
  'Node.js / TypeScript Dev',
  'Full-Stack Geliştirici',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const el = document.getElementById('typed');
const TYPING_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE = 1800;

function type() {
  const current = phrases[phraseIndex];

  if (deleting) {
    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, DELETE_SPEED);
  } else {
    charIndex++;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, PAUSE);
      return;
    }
    setTimeout(type, TYPING_SPEED);
  }
}

type();

const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.1 }
);

document.querySelectorAll('.skill-card, .project-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule('.visible { opacity: 1 !important; transform: translateY(0) !important; }', styleSheet.cssRules.length);
} catch (_) {}
