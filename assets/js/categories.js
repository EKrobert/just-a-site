/* ================================================
   categories.js — Slider principal + mini banners
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Fonction générique slider horizontal ---- */
  function createSlider(containerEl, intervalMs) {
    if (!containerEl) return;

    const track  = containerEl.querySelector('.cat-banner-track');
    const slides = containerEl.querySelectorAll('.cat-banner-slide');
    if (!track || !slides.length) return;

    let current = 0;
    let timer;

    function getWidth() {
      return containerEl.getBoundingClientRect().width;
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const w = getWidth();
      slides.forEach(s => { s.style.width = w + 'px'; s.style.minWidth = w + 'px'; });
      track.style.transform = `translateX(-${current * w}px)`;
    }

    function start() { timer = setInterval(() => goTo(current + 1), intervalMs); }
    function stop()  { clearInterval(timer); }

    window.addEventListener('resize', () => goTo(current));

    containerEl.addEventListener('mouseenter', stop);
    containerEl.addEventListener('mouseleave', start);

    goTo(0);
    start();
  }

  /* ---- Slider principal ---- */
  function initMainSlider() {
    const slider  = document.querySelector('.cat-slider');
    const track   = document.querySelector('.cat-slider .slider-track');
    const slides  = document.querySelectorAll('.cat-slider .slide');
    const dots    = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!track || !slides.length) return;

    let current = 0;
    let timer;

    function getWidth() { return slider.getBoundingClientRect().width; }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      const w = getWidth();
      slides.forEach(s => { s.style.width = w + 'px'; s.style.minWidth = w + 'px'; });
      track.style.transform = `translateX(-${current * w}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function start() { timer = setInterval(() => goTo(current + 1), 4500); }
    function stop()  { clearInterval(timer); }
    function reset() { stop(); start(); }

    window.addEventListener('resize', () => goTo(current));

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); reset(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); reset(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); reset(); }));

    if (slider) {
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
    }

    goTo(0);
    start();
  }

  /* ---- Lancer tout ---- */
  initMainSlider();

  /* Mini banners  */
  const banners = document.querySelectorAll('.cat-banner');
  const intervals = [3200, 5100]; /* haut : 3.2s — bas : 5.1s */

  banners.forEach((banner, i) => {
    createSlider(banner, intervals[i] || 4000);
  });

});