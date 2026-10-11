/* Native touch gallery with optional arrows and keyboard navigation. */
(() => {
  const track = document.getElementById('results-track');
  if (!track) return;
  const controls = track.parentElement.querySelector('.results-controls');
  const previous = controls.querySelector('[data-results-step="-1"]');
  const next = controls.querySelector('[data-results-step="1"]');
  const cards = [...track.children];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const offset = card => card.offsetLeft - cards[0].offsetLeft;
  function update() {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function go(left) {
    track.scrollTo({left, behavior: preference.matches ? 'instant' : 'smooth'});
  }
  function step(direction) {
    const points = cards.map(offset);
    const target = direction > 0
      ? points.find(left => left > track.scrollLeft + 4)
      : points.findLast(left => left < track.scrollLeft - 4);
    if (target !== undefined) go(target);
  }
  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  track.addEventListener('scroll', update, {passive: true});
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') go(0);
    else if (event.key === 'End') go(track.scrollWidth);
    else step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  new ResizeObserver(update).observe(track);
  controls.hidden = false;
  update();
})();
