/* Light wheel inertia on desktop; native scrolling on touch and reduced motion. */
(() => {
  if (!window.Lenis) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');
  let lenis;

  function reconcile() {
    const enabled = mouse.matches && !reducedMotion.matches;
    if (!enabled) {
      lenis?.destroy();
      lenis = undefined;
      document.documentElement.classList.remove('has-smooth-scroll');
      delete document.documentElement.dataset.smoothScroll;
      return;
    }
    if (!lenis) {
      lenis = new Lenis({
        autoRaf: true,
        lerp: .12,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: node => node.matches?.('dialog, textarea, select, [data-native-scroll]'),
        virtualScroll: ({event, deltaX, deltaY}) => !event.ctrlKey && Math.abs(deltaY) >= Math.abs(deltaX)
      });
      document.documentElement.classList.add('has-smooth-scroll');
      document.documentElement.dataset.smoothScroll = 'enabled';
    }
    if (document.body.classList.contains('dialog-open')) lenis.stop();
    else if (lenis.isStopped) lenis.start();
  }
  document.addEventListener('click', event => {
    if (!lenis || lenis.isStopped || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.target === '_blank') return;
    const id = decodeURIComponent(anchor.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    // Focusing a link can move the native viewport before its click fires.
    lenis.reset();
    if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    lenis.scrollTo(target, {onComplete: () => {
      const hadTabindex = target.hasAttribute('tabindex');
      if (!hadTabindex) target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
      if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once: true});
    }});
  });
  // Stop pending inertia before a native keyboard or scrollbar action.
  document.addEventListener('keydown', event => {
    if (lenis && ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) lenis.reset();
  });
  new MutationObserver(reconcile).observe(document.body, {attributes: true, attributeFilter: ['class']});
  reducedMotion.addEventListener('change', reconcile);
  mouse.addEventListener('change', reconcile);
  addEventListener('pagehide', () => lenis?.destroy());
  addEventListener('pageshow', event => {
    if (event.persisted) { lenis = undefined; reconcile(); }
  });
  reconcile();
})();
