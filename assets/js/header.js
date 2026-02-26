/* ================================================
   header.js — Interactions du header
   ================================================ */

function initHeader() {

  /* ---- Dropdown toggle au clic ---- */
  window.toggleNav = function(id) {
    const item = document.getElementById(id);
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };

  /* ---- Fermer si clic en dehors ---- */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('open'));
    }
  });

  /* ---- Ombre sticky au scroll ---- */
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* Header est dans index.html directement — on l'appelle au chargement */
document.addEventListener('DOMContentLoaded', initHeader);