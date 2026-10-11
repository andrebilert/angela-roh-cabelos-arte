/* Seamless looping track; visual copies do not add awards to the accessible list. */
(() => {
  const viewport = document.getElementById('credentials-viewport');
  if (!viewport) return;
  const carousel = viewport.closest('.credentials-carousel');
  const track = viewport.querySelector('.credentials-track');
  const cards = [...track.children];
  const controls = carousel.querySelector('.credentials-controls');
  const previous = controls.querySelector('[data-carousel-step="-1"]');
  const next = controls.querySelector('[data-carousel-step="1"]');
  const counter = controls.querySelector('.credentials-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const copySet = () => cards.map(card => {
    const copy = card.cloneNode(true);
    copy.dataset.carouselCopy = 'true';
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    copy.querySelectorAll('button, a, [tabindex]').forEach(element => element.tabIndex = -1);
    return copy;
  });
  const before = copySet();
  const after = copySet();
  track.prepend(...before);
  track.append(...after);
  const allCards = [...track.children];
  const offset = card => card.offsetLeft - before[0].offsetLeft;
  let origin = 0;
  let period = 0;
  let position = 0;
  let inView = false;
  let keyboardFocus = false;
  let dragging = false;
  let arrowDirection = 0;
  let frame = 0;
  let lastTime = 0;
  let manualUntil = 0;
  let resumeTimer;
  const modulo = (value, length) => ((value % length) + length) % length;

  function normalize() {
    if (!period) return;
    const wrapped = origin + modulo(position - origin, period);
    if (Math.abs(wrapped - position) > .1) {
      position = wrapped;
      viewport.scrollLeft = position;
    }
  }
  function update() {
    if (!period) return;
    const relative = modulo(viewport.scrollLeft - origin, period);
    const index = cards.findLastIndex(card => offset(card) - origin <= relative + 6);
    const text = `${Math.max(0, index) + 1} de ${cards.length}`;
    if (counter.textContent !== text) counter.textContent = text;
    previous.disabled = false;
    next.disabled = false;
  }
  function canMove() {
    if (reducedMotion.matches || !inView || dragging || document.hidden || !period ||
        document.body.classList.contains('dialog-open') || performance.now() < manualUntil) return false;
    if (arrowDirection) return true;
    return !(keyboardFocus && carousel.contains(document.activeElement));
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    carousel.classList.remove('is-moving');
  }
  function tick(time) {
    frame = 0;
    if (!canMove()) { stop(); return; }
    const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : 0;
    lastTime = time;
    position += (arrowDirection || 1) * (arrowDirection ? 210 : 32) * delta;
    normalize();
    viewport.scrollLeft = position;
    counter.setAttribute('aria-live', 'off');
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (!canMove()) { stop(); return; }
    if (frame) return;
    position = viewport.scrollLeft;
    normalize();
    lastTime = 0;
    carousel.classList.add('is-moving');
    frame = requestAnimationFrame(tick);
  }
  function goTo(left) {
    stop();
    clearTimeout(resumeTimer);
    manualUntil = performance.now() + 850;
    counter.setAttribute('aria-live', 'polite');
    viewport.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    resumeTimer = setTimeout(() => {
      position = viewport.scrollLeft;
      normalize();
      update();
      schedule();
    }, 870);
  }
  function step(heading) {
    position = viewport.scrollLeft;
    normalize();
    const destinations = allCards.map(offset);
    const target = heading > 0
      ? destinations.find(value => value > position + 6)
      : destinations.findLast(value => value < position - 6);
    if (target !== undefined) goTo(target);
  }
  for (const [button, heading] of [[previous, -1], [next, 1]]) {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse') return;
      arrowDirection = heading;
      schedule();
    });
    button.addEventListener('pointerleave', () => { arrowDirection = 0; schedule(); });
    button.addEventListener('click', () => step(heading));
  }
  carousel.addEventListener('pointerleave', () => { arrowDirection = 0; schedule(); });
  document.addEventListener('keydown', () => { keyboardFocus = true; arrowDirection = 0; schedule(); });
  document.addEventListener('pointerdown', () => { keyboardFocus = false; schedule(); });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
  viewport.addEventListener('pointerdown', () => { dragging = true; stop(); });
  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    position = viewport.scrollLeft;
    normalize();
    schedule();
  };
  window.addEventListener('pointerup', finishDrag);
  window.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('scroll', () => {
    if (!frame && !dragging && performance.now() >= manualUntil &&
        !viewport.contains(document.activeElement)) {
      position = viewport.scrollLeft;
      normalize();
    }
    update();
  }, {passive: true});
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') goTo(origin);
    else if (event.key === 'End') goTo(offset(cards.at(-1)));
    else step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  document.addEventListener('visibilitychange', schedule);
  new MutationObserver(schedule).observe(document.body, {attributes: true, attributeFilter: ['class']});
  reducedMotion.addEventListener('change', () => { arrowDirection = 0; schedule(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, {threshold: .15}).observe(carousel);
  }
  function measure() {
    const progress = period ? modulo(position - origin, period) / period : 0;
    stop();
    origin = offset(cards[0]);
    period = offset(after[0]) - origin;
    position = origin + progress * period;
    viewport.scrollLeft = position;
    carousel.style.setProperty('--carousel-arrow-y', `${cards[0].querySelector('.credential-image').offsetHeight / 2 + 4}px`);
    update();
    schedule();
  }
  carousel.classList.add('is-enhanced');
  controls.hidden = false;
  measure();
  new ResizeObserver(measure).observe(viewport);
})();
