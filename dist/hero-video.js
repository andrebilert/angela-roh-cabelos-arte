/* Local, muted background video respecting visibility and motion preference. */
(() => {
  const video = document.querySelector('.hero-video');
  if (!video) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let failed = false;
  let revision = 0;
  video.muted = true;
  function shouldPause() {
    return reducedMotion.matches || !visible || document.hidden || failed || document.body.classList.contains('dialog-open');
  }
  async function update() {
    const current = ++revision;
    if (shouldPause()) {
      video.pause();
      return;
    }
    try {
      await video.play();
      if (current !== revision && shouldPause()) video.pause();
    } catch {
      // Keep the poster if the device blocks muted autoplay.
    }
  }
  video.addEventListener('error', () => {
    failed = true;
    video.hidden = true;
  });
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', update);
  new MutationObserver(update).observe(document.body, {attributes: true, attributeFilter: ['class']});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, {threshold: .1})
      .observe(document.querySelector('.hero'));
  }
  update();
})();
