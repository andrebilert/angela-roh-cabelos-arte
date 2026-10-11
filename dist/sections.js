/* Reveal chapter boundaries and identify the current section in the existing menu. */
(() => {
  const panels = [...document.querySelectorAll('.section-panel')];
  if (!panels.length) return;
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const header = document.querySelector('.header');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  function update() {
    frame = 0;
    const readingLine = header.offsetHeight + Math.min(innerHeight * .28, 220);
    const current = panels.findLast(panel => panel.getBoundingClientRect().top <= readingLine);
    const section = current?.querySelector('section');
    const id = section?.id === 'galeria' ? 'cuidados' : section?.id;
    for (const link of links) {
      const active = Boolean(id) && link.hash === `#${id}`;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-entered');
        observer.unobserve(entry.target);
      }
    }, {rootMargin: '0px 0px -18% 0px', threshold: 0});
    panels.forEach(panel => observer.observe(panel));
    document.documentElement.classList.add('sections-ready');
  } else panels.forEach(panel => panel.classList.add('is-entered'));
  addEventListener('scroll', queue, {passive: true});
  addEventListener('resize', queue);
  preference.addEventListener('change', queue);
  if ('ResizeObserver' in window) new ResizeObserver(queue).observe(document.body);
  update();
})();
