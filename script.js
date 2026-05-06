const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

const progress = document.getElementById('progressBar');
const updateProgress = () => {
  const h = document.documentElement;
  const scrollableHeight = h.scrollHeight - h.clientHeight;
  const percentage = scrollableHeight > 0 ? (h.scrollTop / scrollableHeight) * 100 : 0;

  if (progress) progress.style.width = `${percentage}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();

const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window) {
  reveals.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
  });

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1 }
  );

  reveals.forEach((el) => io.observe(el));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallax = [...document.querySelectorAll('[data-parallax]')];
if (!prefersReducedMotion && parallax.length) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    parallax.forEach((el) => {
      const factor = Number(el.dataset.parallax || 0);
      el.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
    });
  });
}

const form = document.querySelector('form');
const note = document.querySelector('.form-note');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (note) {
      note.textContent =
        'Danke. Ihre diskrete Anfrage wurde vorgemerkt. Wir melden uns zeitnah persönlich.';
    }
    form.reset();
  });
}
