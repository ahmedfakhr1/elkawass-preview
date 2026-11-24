/* Elkawass Group: small behaviours only. Bar, hero light, empty media slots, reveal, menu, Arabic pop-up. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var bar = doc.getElementById('bar');
  var hero = doc.querySelector('.hero');
  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  /* ------------------------------------------------ top bar: clear at the top, hides on the way down, glass on the way up */
  var lastY = window.pageYOffset || 0, ticking = false, menuOpen = false;

  function update() {
    ticking = false;
    if (!bar) return;
    var y = window.pageYOffset || 0, dy = y - lastY;
    if (!menuOpen) {
      if (y < 40) {
        bar.classList.remove('is-hidden', 'is-glass');
      } else if (dy > 4) {
        bar.classList.add('is-hidden');
      } else if (dy < -4) {
        bar.classList.remove('is-hidden');
        bar.classList.add('is-glass');
      }
    }
    if (Math.abs(dy) > 4 || y < 40) lastY = y;
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  /* ------------------------------------------------ media slots: a real photograph saved under the slot's file name takes over by itself */
  [].forEach.call(doc.querySelectorAll('[data-slot]'), function (slot) {
    var img = slot.querySelector('img'), vid = slot.querySelector('video');
    function mark() {
      var has = (img && img.naturalWidth > 16) || !!vid;
      slot.classList.toggle('has-photo', has);
      if (slot.parentNode === hero) hero.classList.toggle('has-media', has);
    }
    if (vid) { mark(); }
    if (img) {
      if (img.complete) mark(); else img.addEventListener('load', mark);
    }
  });

  /* ------------------------------------------------ hero: a soft light follows the pointer (mouse devices only) */
  if (hero && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce.matches) {
    var glow = hero.querySelector('.hero__glow');
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty, raf = 0;
    var step = function () {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      glow.style.setProperty('--mx', cx.toFixed(1) + 'px');
      glow.style.setProperty('--my', cy.toFixed(1) + 'px');
      raf = (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) ? window.requestAnimationFrame(step) : 0;
    };
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      hero.classList.add('is-pointer');
      if (!raf) raf = window.requestAnimationFrame(step);
    });
    hero.addEventListener('pointerleave', function () { hero.classList.remove('is-pointer'); });
  }

  /* ------------------------------------------------ reveal: text and cards fade up once */
  var rv = [].slice.call(doc.querySelectorAll('.rv'));
  if (rv.length) {
    if (!('IntersectionObserver' in window) || reduce.matches) {
      rv.forEach(function (e) { e.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      rv.forEach(function (e, i) { e.style.transitionDelay = ((i % 3) * 90) + 'ms'; io.observe(e); });
    }
  }

  /* ------------------------------------------------ full-screen menu */
  var menu = doc.getElementById('menu'), menuBtn = doc.getElementById('menuBtn'), menuClose = doc.getElementById('menuClose');
  function setMenu(open) {
    if (!menu) return;
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    if (open) { menu.removeAttribute('inert'); } else { menu.setAttribute('inert', ''); }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    root.style.overflow = open ? 'hidden' : '';
    if (open && menuClose) { window.setTimeout(function () { menuClose.focus(); }, 60); }
    if (!open && menuBtn && doc.activeElement && menu.contains(doc.activeElement)) menuBtn.focus();
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setMenu(true); });
  if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
  if (menu) {
    [].forEach.call(menu.querySelectorAll('a[href^="#"]'), function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    [].forEach.call(menu.querySelectorAll('[data-ar]'), function (b) {
      b.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ------------------------------------------------ Arabic pop-up */
  var dlg = doc.getElementById('ar');
  function openAr() {
    if (!dlg) return;
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open', ''); }
  }
  function closeAr() {
    if (!dlg) return;
    if (typeof dlg.close === 'function') { dlg.close(); } else { dlg.removeAttribute('open'); }
  }
  [].forEach.call(doc.querySelectorAll('[data-ar]'), function (b) { b.addEventListener('click', openAr); });
  if (dlg) {
    [].forEach.call(dlg.querySelectorAll('[data-close]'), function (b) { b.addEventListener('click', closeAr); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeAr(); });
  }

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) setMenu(false);
  });
  window.addEventListener('resize', function () { if (menuOpen && window.innerWidth >= 900) setMenu(false); });
})();

/* top bar turns light over the light statement section */
(function () {
  var bar = document.querySelector('.bar'), light = document.querySelector('.statement');
  if (!bar || !light) return;
  function tone() {
    var r = light.getBoundingClientRect(), h = bar.offsetHeight / 2, span = r.height * 0.22;
    bar.classList.toggle('on-light', r.top + span < h && r.bottom - span > h);
  }
  window.addEventListener('scroll', tone, { passive: true });
  window.addEventListener('resize', tone);
  tone();
})();
