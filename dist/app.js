/* Progressive enhancement: content and contact links work without JavaScript. */
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  const desktopQuery = window.matchMedia('(min-width: 1001px)');
  desktopQuery.addEventListener('change', () => setMenu(false));

  const booking = document.getElementById('booking-dialog');
  const gallery = document.getElementById('gallery-dialog');
  const privacy = document.getElementById('privacy-dialog');
  const dialogs = [booking, gallery, privacy];
  const supportsDialogs = typeof booking.showModal === 'function';
  let lastTrigger;
  function openDialog(dialog, trigger) {
    if (!supportsDialogs) return false;
    lastTrigger = trigger;
    setMenu(false);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    return true;
  }
  for (const dialog of dialogs) {
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      const anotherIsOpen = dialogs.some(item => item.open);
      document.body.classList.toggle('dialog-open', anotherIsOpen);
      if (!anotherIsOpen) lastTrigger?.focus();
    });
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
  }
  document.querySelectorAll('[data-book]').forEach(link => {
    link.addEventListener('click', event => {
      if (!supportsDialogs || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      document.getElementById('booking-service').value = link.dataset.book;
      openDialog(booking, link);
    });
  });
  document.getElementById('booking-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const service = String(data.get('service') || 'Avaliação personalizada');
    const details = String(data.get('message') || '').trim();
    const text = `Olá, Angela!${name ? ` O meu nome é ${name}.` : ''}\nGostaria de saber mais sobre: ${service}.\n${details ? `${details}\n` : ''}Pode informar-me sobre a avaliação, os valores e a disponibilidade?`;
    const whatsapp = `https://wa.me/351960016973?text=${encodeURIComponent(text)}`;
    // Open directly from the user gesture; no background submission or local storage.
    const opened = window.open(whatsapp, '_blank');
    if (opened) opened.opener = null;
    else window.location.assign(whatsapp);
    booking.close();
  });
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      const image = document.getElementById('gallery-image');
      image.src = button.dataset.image;
      image.alt = button.dataset.caption;
      image.removeAttribute('width');
      image.removeAttribute('height');
      document.getElementById('gallery-caption').textContent = button.dataset.caption;
      if (!openDialog(gallery, button)) window.open(button.dataset.image, '_blank', 'noopener,noreferrer');
    });
  });
  document.querySelector('[data-open-privacy]').addEventListener('click', event => openDialog(privacy, event.currentTarget));
  const viewport = document.getElementById('credentials-viewport');
  if (viewport) {
    const cards = [...viewport.querySelectorAll('.credential-card')];
    const controls = document.querySelector('.credentials-controls');
    const previous = controls.querySelector('[data-carousel-step="-1"]');
    const next = controls.querySelector('[data-carousel-step="1"]');
    const counter = controls.querySelector('.credentials-count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const positionOf = card => card.offsetLeft - cards[0].offsetLeft;
    function updateCarousel() {
      const first = Math.max(0, cards.findIndex(card => positionOf(card) + card.offsetWidth > viewport.scrollLeft + 8));
      const visible = cards.filter(card => positionOf(card) < viewport.scrollLeft + viewport.clientWidth - 8 && positionOf(card) + card.offsetWidth > viewport.scrollLeft + 8);
      const last = cards.indexOf(visible.at(-1));
      const text = `${first + 1}${last > first ? `–${last + 1}` : ''} de ${cards.length}`;
      if (counter.textContent !== text) counter.textContent = text;
      previous.disabled = viewport.scrollLeft < 8;
      next.disabled = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 8;
    }
    function goTo(left) {
      viewport.scrollTo({left, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    }
    function step(direction) {
      const closest = cards.reduce((best, card, i) => Math.abs(positionOf(card) - viewport.scrollLeft) < Math.abs(positionOf(cards[best]) - viewport.scrollLeft) ? i : best, 0);
      const target = Math.min(cards.length - 1, Math.max(0, closest + direction));
      goTo(positionOf(cards[target]));
    }
    controls.hidden = false;
    previous.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    viewport.addEventListener('scroll', updateCarousel, {passive: true});
    viewport.addEventListener('keydown', event => {
      if (event.target !== viewport) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') goTo(0);
      else if (event.key === 'End') goTo(viewport.scrollWidth);
      else step(event.key === 'ArrowLeft' ? -1 : 1);
    });
    new ResizeObserver(updateCarousel).observe(viewport);
    updateCarousel();
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
