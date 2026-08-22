(() => {
  'use strict';

  if (!window.Lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  window.__lenis = lenis;

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    const [path, hash] = link.getAttribute('href').split('#');
    if (!hash || (path && path !== currentFile)) return;
    link.addEventListener('click', (event) => {
      const target = document.getElementById(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
    });
  });
})();
