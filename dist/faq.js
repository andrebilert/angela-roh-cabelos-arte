/* Native details with smooth, interruptible transitions and one expanded answer. */
(() => {
  const list = document.querySelector('.faq-list');
  if (!list) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const items = [...list.querySelectorAll('details')];
  const states = new Map(items.map(item => [item, {
    expanded: item.open, animation: null, contentAnimation: null
  }]));
  list.classList.add('is-enhanced');

  function settle(item) {
    const state = states.get(item);
    item.open = state.expanded;
    state.animation?.cancel();
    state.contentAnimation?.cancel();
    state.animation = state.contentAnimation = null;
    item.style.removeProperty('overflow');
  }
  function change(item, expanded) {
    const state = states.get(item);
    const start = item.getBoundingClientRect().height;
    state.animation?.cancel();
    state.contentAnimation?.cancel();
    state.expanded = expanded;
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-expanded', String(expanded));
    if (preference.matches || !item.animate) { settle(item); return; }

    item.open = true;
    const borders = getComputedStyle(item);
    const end = expanded ? item.getBoundingClientRect().height :
      summary.offsetHeight + parseFloat(borders.borderTopWidth) + parseFloat(borders.borderBottomWidth);
    item.style.overflow = 'hidden';
    const animation = item.animate([{height: `${start}px`}, {height: `${end}px`}], {
      duration: 360, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both'
    });
    state.animation = animation;
    const answer = item.querySelector('p');
    if (answer) state.contentAnimation = answer.animate(expanded ? [
      {opacity: 0, transform: 'translateY(-6px)'}, {opacity: 1, transform: 'none'}
    ] : [{opacity: 1}, {opacity: 0}], {duration: 260, easing: 'ease-out', fill: 'both'});
    animation.onfinish = () => {
      if (state.animation === animation) settle(item);
    };
  }
  for (const item of items) {
    const summary = item.querySelector('summary');
    summary.setAttribute('aria-expanded', String(item.open));
    summary.addEventListener('click', event => {
      event.preventDefault();
      const expanded = !states.get(item).expanded;
      if (expanded) items.forEach(other => {
        if (other !== item && states.get(other).expanded) change(other, false);
      });
      change(item, expanded);
    });
  }
  preference.addEventListener('change', () => {
    if (preference.matches) items.forEach(settle);
  });
  addEventListener('resize', () => items.forEach(settle));
})();
