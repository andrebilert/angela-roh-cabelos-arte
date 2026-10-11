/* Original, dependency-free adaptations of 21st.dev motion patterns.
   Everything remains visible if scripting or animation is unavailable. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const desktop = matchMedia('(min-width: 1001px)');
  const activeAnimations = new Set();
  const revealed = new WeakSet();
  const header = document.querySelector('.header');
  const visual = document.querySelector('.hero-media');
  const progress = document.createElement('span');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  header.append(progress);
  document.documentElement.classList.add('motion-ready');

  function arrive(element, delay = 0, image = false) {
    if (!element) return;
    if (revealed.has(element)) return;
    revealed.add(element);
    element.dataset.motionSeen = 'true';
    if (preference.matches || !element.animate) return;
    const chapterTitle = element.matches('.section-heading > *, .intro > *, .faq > div:first-child, .story-copy > h2, .visit-copy > h2');
    const animation = element.animate([
      {opacity: 0, transform: image ? 'none' : `translateY(${chapterTitle ? 40 : 24}px)`},
      {opacity: 1, transform: 'none'}
    ], {duration: image ? 1200 : 850, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'});
    activeAnimations.add(animation);
    animation.finished.then(() => activeAnimations.delete(animation), () => activeAnimations.delete(animation));
  }
  const heroParts = document.querySelectorAll('.hero-copy > .eyebrow, .hero-line, .hero-description, .hero-actions');
  heroParts.forEach((element, i) => arrive(element, i * 90));
  arrive(visual, 100, true);

  const targets = document.querySelectorAll('.intro > *, .section-heading > *, .care-item, .additional-care > *, .showcase-figure, .showcase-footer, .story-signature, .story-copy > *, .credentials-carousel, .review-card, .reviews-footer, .steps-grid > li, .faq > div:first-child, .faq details, .visit-copy > *, .visit-panel');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      let delay = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        arrive(entry.target, Math.min(delay, 180));
        delay += 65;
        observer.unobserve(entry.target);
      }
    }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
    targets.forEach(element => observer.observe(element));
  }

  const surfaces = document.querySelectorAll('.care-item, .review-card, .visit-panel');
  surfaces.forEach(element => element.classList.add('spotlight-surface'));
  let pointerFrame = 0;
  let pointer;
  document.addEventListener('pointermove', event => {
    if (preference.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const surface = event.target.closest('.spotlight-surface');
    if (!surface) return;
    pointer = {surface, x: event.clientX, y: event.clientY};
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (preference.matches) return;
      const {surface, x, y} = pointer;
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty('--light-x', `${x - bounds.left}px`);
      surface.style.setProperty('--light-y', `${y - bounds.top}px`);
    });
  }, {passive: true});

  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const available = document.documentElement.scrollHeight - innerHeight;
    const fraction = available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    header.classList.toggle('is-scrolled', scrollY > 35);
  }
  function queueScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  addEventListener('scroll', queueScroll, {passive: true});
  addEventListener('resize', queueScroll, {passive: true});
  if ('ResizeObserver' in window) new ResizeObserver(queueScroll).observe(document.body);
  preference.addEventListener('change', () => {
    if (preference.matches) activeAnimations.forEach(animation => animation.cancel());
    queueScroll();
  });
  finePointer.addEventListener('change', queueScroll);
  desktop.addEventListener('change', queueScroll);
  document.addEventListener('focusin', event => {
    // Keyboard users get immediate, fully visible controls during an entrance.
    activeAnimations.forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  document.querySelectorAll('.faq details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open || preference.matches) return;
      const paragraph = details.querySelector('p');
      revealed.delete(paragraph);
      arrive(paragraph);
    });
  });
  updateScroll();
})();
