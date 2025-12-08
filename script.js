// Smooth scrolling for nav links and buttons
const scrollLinks = document.querySelectorAll('a[href^="#"], [data-scroll-target]');

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href') || link.getAttribute('data-scroll-target');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Simple accordion behavior
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const panel = header.nextElementSibling;
    const isOpen = header.getAttribute('aria-expanded') === 'true';

    header.setAttribute('aria-expanded', String(!isOpen));
    panel.hidden = isOpen;
  });
});

// Modal behavior for case study cards
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');

// Ensure modals start hidden even if cache removed attribute
modals.forEach((modal) => {
  modal.hidden = true;
});

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
};

const closeModal = (modal) => {
  modal.hidden = true;
  document.body.style.overflow = '';
};

modalTriggers.forEach((card) => {
  card.addEventListener('click', () => {
    const targetId = card.getAttribute('data-modal-target');
    openModal(targetId);
  });
});

modals.forEach((modal) => {
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modals.forEach((modal) => {
      if (!modal.hidden) {
        closeModal(modal);
      }
    });
  }
});
