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
  const desktopQuery = window.matchMedia('(min-width: 1281px)');
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
  document.addEventListener('click', event => {
      const button = event.target.closest('[data-image]');
      if (!button) return;
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (!supportsDialogs) {
        if (button.tagName !== 'A') window.open(button.dataset.image, '_blank', 'noopener,noreferrer');
        return;
      }
      event.preventDefault();
      const image = document.getElementById('gallery-image');
      image.src = button.dataset.image;
      image.alt = button.dataset.caption;
      image.removeAttribute('width');
      image.removeAttribute('height');
      document.getElementById('gallery-caption').textContent = button.dataset.caption;
      const returnFocus = button.closest('[data-carousel-copy]')
        ? document.getElementById('credentials-viewport') : button;
      openDialog(gallery, returnFocus);
  });
  document.querySelector('[data-open-privacy]').addEventListener('click', event => openDialog(privacy, event.currentTarget));
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
