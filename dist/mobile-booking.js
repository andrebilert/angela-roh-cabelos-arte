/* Show the mobile contact bar only after the main booking button has passed. */
(() => {
  const bar = document.querySelector('.mobile-booking');
  const primary = document.querySelector('.hero-actions [data-book]');
  const header = document.querySelector('.header');
  if (!bar || !primary || !header) return;
  const mobile = matchMedia('(max-width: 720px)');
  const root = document.documentElement;
  let frame = 0;

  function update() {
    frame = 0;
    const visible = mobile.matches &&
      primary.getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom;
    bar.hidden = !visible;
    const height = visible ? Math.ceil(bar.getBoundingClientRect().height) : 0;
    root.style.setProperty('--mobile-booking-height', `${height}px`);
    root.classList.toggle('has-mobile-booking', visible);
  }
  function queue() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  addEventListener('scroll', queue, {passive: true});
  addEventListener('resize', queue);
  addEventListener('pageshow', queue);
  mobile.addEventListener('change', queue);
  window.visualViewport?.addEventListener('resize', queue);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(queue);
    [bar, header, primary.closest('.hero-copy')].forEach(element => observer.observe(element));
  }
  document.fonts?.ready.then(queue);
  update();
})();
