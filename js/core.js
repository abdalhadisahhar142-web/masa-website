/* ==========================================================
   Reisen Center — Shared core (كل الصفحات بتستخدمه)
   helpers · icons · nav/menu/footer/sheet · smooth scroll ·
   reveals · line split · counters · parallax
   ========================================================== */
window.K = (() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const wa = (text = '') => `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

  /* ---------- Icons ---------- */
  const s = (d, w = 1.4) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICON = {
    pin: s('<path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>'),
    cal: s('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'),
    plane: s('<path d="M10.5 13.5 3 11l1.5-1.5 7 1 4-4.5c1-1 2.6-1.4 3.5-.5s.5 2.5-.5 3.5l-4.5 4 1 7L14 21.5l-2.5-7.5-3.5 3V19l-1.5 1-1-3-3-1L4 14.5h2l3-3"/>', 1.2),
    phone: s('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
    chat: s('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>', 1.2),
    shield: s('<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>', 1.2),
    wallet: s('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/>', 1.2),
    bus: s('<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 18v2M16 18v2"/><circle cx="8" cy="14.5" r=".8"/><circle cx="16" cy="14.5" r=".8"/>', 1.2),
    visa: s('<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 17h6"/>', 1.2),
    hotel: s('<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01"/>', 1.2),
    book: s('<path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z"/><path d="M4 20a2 2 0 0 0 2 2h14v-4"/>', 1.2),
    gift: s('<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 4.5 10 8 12 8zm0 0s1.5-5 4-3.5S14 8 12 8z"/>', 1.2),
    swap: s('<path d="M4 7h14M18 7l-3-3M18 7l-3 3M20 17H6M6 17l3-3M6 17l3 3"/>', 1.2),
    tag: s('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>', 1.2),
    stamp: s('<path d="M9 3h6v5l-1 4h4a2 2 0 0 1 2 2v3H4v-3a2 2 0 0 1 2-2h4L9 8z"/><path d="M5 21h14"/>', 1.2),
    doc: s('<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>', 1.2),
    arrow: s('<path d="M19 12H5M11 6l-6 6 6 6"/>', 1.5),
    cap: s('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>', 1.2),
    bank: s('<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>', 1.2),
    lang: s('<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 7 8M11 5c-1 4-4 7-7 8"/><path d="M13 21l4-9 4 9M14.5 18h5"/>', 1.2),
    family: s('<circle cx="8" cy="6.5" r="2.5"/><circle cx="16.5" cy="8" r="2"/><path d="M3 20v-3a5 5 0 0 1 10 0v3M13 20v-2.5a3.5 3.5 0 0 1 7 0V20"/>', 1.2),
    briefcase: s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>', 1.2),
    badge: s('<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7M9.5 9l2 2 3-3.5"/>', 1.2),
    search: s('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>', 1.2),
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>',
    mark: '<svg viewBox="0 0 40 24" aria-hidden="true"><path fill="currentColor" d="M2 14c10-1 20-4 34-11l2 2C28 13 16 17 3 17.5zM26 4.5 36 3l-3 6z"/></svg>',
  };

  /* ---------- Images ---------- */
  const resolve = (src, fallback) => new Promise((done) => {
    if (!src) return done(fallback || '');
    const probe = new Image();
    probe.onload = () => done(src);
    probe.onerror = () => done(fallback || '');
    probe.src = src;
  });
  const ph = (src, fallback, alt = '') =>
    `<div class="ph"><img alt="${alt}" loading="lazy" data-src="${src}" data-fallback="${fallback || ''}"></div>`;
  function loadImages(root = document) {
    $$('img[data-src]', root).forEach((img) => {
      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      resolve(img.dataset.src, img.dataset.fallback).then((url) => { if (url) img.src = url; });
      img.removeAttribute('data-src');
    });
  }
  const setBg = (el, src, fallback) => el && resolve(src, fallback).then((url) => { if (url) el.style.backgroundImage = `url("${url}")`; });

  /* ---------- Layout: nav, menu, footer, sheet ---------- */
  const pill = (label, attrs = '', cls = '') =>
    `<a class="pill ${cls}" ${attrs}>${label} <span class="pill__icon" aria-hidden="true"></span></a>`;

  function brand(kind) {
    // Logo: the M mark (images/logo/mark.png, coloured by CSS) + MASA wordmark
    const text = `<span class="wordmark"><img class="wordmark__mark mk-w" src="images/logo/mark-white.png" alt=""><img class="wordmark__mark mk-c" src="images/logo/mark.png" alt=""><span><b>${SITE.short}</b><small>${SITE.tagline}</small></span></span>`;
    if (kind === 'footer') return `<a class="nav__brand" href="index.html" aria-label="${SITE.name}" data-logo="white">${text}</a>`;
    return `<a class="nav__brand" href="index.html" aria-label="${SITE.name}" data-logo="nav">${text}</a>`;
  }
  function swapInLogos() {
    if (!SITE.useLogoImage) return; // اللوغو مبني من mark.png + نص، ما في داعي للتبديل
    const probe = new Image();
    probe.onload = () => $$('[data-logo]').forEach((el) => {
      el.innerHTML = el.dataset.logo === 'white'
        ? `<img class="brand-logo" src="${SITE.logoWhite}" alt="${SITE.name}">`
        : `<img class="logo-w" src="${SITE.logoWhite}" alt="${SITE.name}"><img class="logo-c" src="${SITE.logo}" alt="">`;
    });
    probe.src = SITE.logo;
  }

  function renderNav(active) {
    const links = NAV.filter((n) => n.id !== 'home');
    $('[data-nav]').innerHTML = `
      ${brand('nav')}
      <nav class="nav__links" aria-label="القائمة الرئيسية">
        ${links.map((n) => `<a href="${n.href}"${n.id === active ? ' class="is-active" aria-current="page"' : ''}>${n.label}</a>`).join('')}
      </nav>
      <button class="nav__cta" type="button" data-book>احجز</button>
      <button class="nav__burger" type="button" aria-label="فتح القائمة" aria-expanded="false" data-menu-open><span></span><span></span></button>`;

    const menu = document.createElement('div');
    menu.className = 'mmenu';
    menu.setAttribute('aria-hidden', 'true');
    menu.dataset.menu = '';
    menu.innerHTML = `
      <nav class="mmenu__links" aria-label="القائمة">
        ${NAV.map((n, i) => `<a href="${n.href}" style="--i:${i}"${n.id === active ? ' class="is-active"' : ''}>${n.label}</a>`).join('')}
      </nav>
      <a class="pill pill--main" href="${wa(SITE.defaultMsg)}" target="_blank" rel="noopener">راسلنا عالواتساب <span class="pill__icon" aria-hidden="true"></span></a>`;
    document.body.append(menu);
  }

  function renderFooter() {
    const el = $('[data-footer]');
    if (!el) return;
    el.innerHTML = `
      <figure class="footer__banner img-reveal ph"><img alt="" data-src="${HOME.footerBanner.image}" data-fallback="${HOME.footerBanner.fallback}"></figure>
      <div class="footer__main">
        <div class="footer__brand">${brand('footer')}<p>${SITE.slogan}<br>${SITE.trust}</p></div>
        <ul class="footer__big">
          ${NAV.filter((n) => n.id !== 'home').map((n) => `<li><a href="${n.href}"><span aria-hidden="true">+</span>${n.label}</a></li>`).join('')}
        </ul>
        <div class="footer__contact">
          ${SITE.phones.map((p) => `<small>${p.label}</small><a class="num" href="${p.wa ? wa() : `tel:${p.number}`}"${p.wa ? ' target="_blank" rel="noopener"' : ''}>${p.number}</a>`).join('')}
          <small>العنوان</small><span>${SITE.address}</span>
        </div>
      </div>
      <div class="footer__bar">
        <p>© ${new Date().getFullYear()} ${SITE.name}. جميع الحقوق محفوظة.</p>
        <span>${SITE.trust}</span>
        <div class="footer__social">${SITE.social.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div>
      </div>`;
  }

  function renderSheet() {
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.setAttribute('aria-hidden', 'true');
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'sheet-title');
    const opts = SHEET;
    sheet.innerHTML = `
      <div class="sheet__backdrop" data-sheet-close></div>
      <div class="sheet__box">
        <button class="sheet__close" type="button" aria-label="إغلاق" data-sheet-close>×</button>
        <h3 id="sheet-title">${SHEET_TITLE}</h3>
        <p class="sheet__note">بيفتحلك واتساب برسالة جاهزة، وفريقنا بيرد عليك.</p>
        <div class="sheet__options">
          ${opts.map(([t, m]) => `<a class="sheet__opt" href="${wa(m)}" target="_blank" rel="noopener"><b>${t}</b>${ICON.whatsapp}</a>`).join('')}
        </div>
      </div>`;
    document.body.append(sheet);
  }

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  function initScroll() {
    if (!reduce && typeof window.Lenis === 'function') {
      lenis = new window.Lenis({ duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname) return;
      const target = url.hash === '#top' ? 0 : $(url.hash);
      if (target === null) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: url.hash === '#top' ? 0 : -70 });
      else (target === 0 ? document.body : target).scrollIntoView({ behavior: 'smooth' });
    });
    // Arriving with a #hash from another page
    if (location.hash && $(location.hash)) {
      setTimeout(() => { if (lenis) lenis.scrollTo($(location.hash), { offset: -70, immediate: true }); }, 60);
    }
  }
  const lock = (on) => {
    if (lenis) on ? lenis.stop() : lenis.start();
    document.body.style.overflow = on ? 'hidden' : '';
  };

  function closeMenu() {
    if (!document.documentElement.classList.contains('menu-open')) return;
    document.documentElement.classList.remove('menu-open');
    $('[data-menu-open]').setAttribute('aria-expanded', 'false');
    $('[data-menu]').setAttribute('aria-hidden', 'true');
    lock(false);
  }
  function initNav() {
    const nav = $('[data-nav]');
    const darkTop = document.body.dataset.hero === 'dark';
    const onScroll = () => nav.classList.toggle('is-solid', !darkTop || scrollY > innerHeight * 0.55);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    $('[data-menu-open]').addEventListener('click', () => {
      if (document.documentElement.classList.contains('menu-open')) return closeMenu();
      document.documentElement.classList.add('menu-open');
      $('[data-menu-open]').setAttribute('aria-expanded', 'true');
      $('[data-menu]').setAttribute('aria-hidden', 'false');
      lock(true);
    });
    matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });
  }

  function initSheet() {
    const sheet = $('.sheet');
    let last;
    const open = () => {
      closeMenu();
      last = document.activeElement;
      sheet.classList.add('is-open');
      sheet.setAttribute('aria-hidden', 'false');
      lock(true);
      $('.sheet__opt', sheet).focus({ preventScroll: true });
    };
    const close = () => {
      sheet.classList.remove('is-open');
      sheet.setAttribute('aria-hidden', 'true');
      lock(false);
      if (last) last.focus({ preventScroll: true });
    };
    document.addEventListener('click', (e) => { if (e.target.closest('[data-book]')) { e.preventDefault(); open(); } });
    $$('[data-sheet-close]', sheet).forEach((b) => b.addEventListener('click', close));
    $$('.sheet__opt', sheet).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (sheet.classList.contains('is-open')) close(); else closeMenu();
    });
  }

  /* ---------- Headings rise line by line ---------- */
  function splitLines(el) {
    const text = el.getAttribute('aria-label') || el.textContent.trim();
    el.innerHTML = text.split(/\s+/).map((w) => `<span class="wd">${w}</span>`).join(' ');
    const rows = [];
    $$('.wd', el).forEach((w) => {
      const top = Math.round(w.offsetTop);
      const last = rows[rows.length - 1];
      if (last && Math.abs(last.top - top) < 4) last.words.push(w.textContent);
      else rows.push({ top, words: [w.textContent] });
    });
    el.innerHTML = rows.map((r, i) => `<span class="ln" style="--l:${i}"><span>${r.words.join(' ')}</span></span>`).join('');
    el.setAttribute('aria-label', text);
  }

  /* ---------- Reveal on scroll ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const to = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = to + suffix; return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1800);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function initReveal() {
    const targets = $$('.reveal, .lines, .img-reveal, .stagger, .extras, .dotmap');
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      $$('[data-count]').forEach(countUp);
      return;
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
      $$('[data-count]', e.target).forEach(countUp);
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Scroll-linked: hero, [data-speed] parallax, word scrub ---------- */
  function initScrollFx() {
    const heroMedia = $('[data-hero-media]');
    const heroContent = $('[data-hero-content]');
    const speeds = $$('[data-speed]');
    const scrubHost = $('[data-scrub]');
    const words = scrubHost ? $$('.w', scrubHost) : [];
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      const y = scrollY;
      if (!reduce) {
        if (heroMedia && y < vh * 1.2) {
          heroMedia.style.transform = `translate3d(0, ${(y * 0.35).toFixed(1)}px, 0)`;
          if (heroContent) {
            heroContent.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
            heroContent.style.opacity = Math.max(0, 1 - y / (vh * 0.7)).toFixed(3);
          }
        }
        speeds.forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
        });
      }
      if (scrubHost) {
        const r = scrubHost.getBoundingClientRect();
        const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.55)));
        const lit = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < lit));
      }
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- Boot (each page passes its own render function) ---------- */
  function boot(pageId, render) {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.id = 'top';
      renderNav(pageId);
      renderFooter();
      renderSheet();
      render();
      loadImages();
      swapInLogos();
      $$('[data-scrub]').forEach((el) => {
        el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
      });

      const go = () => {
        $$('.lines').forEach(splitLines);
        initScroll();
        initNav();
        initSheet();
        initReveal();
        initScrollFx();
        let lastW = innerWidth;
        let t;
        addEventListener('resize', () => {
          clearTimeout(t);
          t = setTimeout(() => {
            if (Math.abs(innerWidth - lastW) < 40) return;
            lastW = innerWidth;
            $$('.lines').forEach(splitLines);
          }, 250);
        });
        requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
      };
      if (document.fonts && document.fonts.ready) {
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(go);
      } else go();
    });
  }

  return { $, $$, pad, wa, ICON, ph, setBg, pill, boot };
})();
