/* ==========================================================
   MASA — Inner pages (trips, flights, hotels, services, contact)
   الصفحة بتنعرف من <body data-page="...">، والمحتوى من data.js
   ========================================================== */
(() => {
  'use strict';
  const { $, $$, wa, ICON, ph, setBg } = K;
  const page = document.body.dataset.page;
  const TRIP_HERO = { image: TRIPS[0].image, fallback: TRIPS[0].fallback };
  const HEROES = { trips: TRIP_HERO, flights: FLIGHTS.hero, hotels: HOTELS.hero, services: OTHER.hero, contact: HOME.hero };

  const waPill = (label, msg, cls = 'pill--main') =>
    `<a class="pill ${cls}" href="${wa(msg)}" target="_blank" rel="noopener">${label} <span class="pill__icon" aria-hidden="true"></span></a>`;
  const iconCard = (c, i) => `
    <div style="--i:${i % 3}">${ICON[c.icon] || ICON.doc}<h3>${c.title}</h3>${c.text ? `<p>${c.text}</p>` : ''}</div>`;

  /* WhatsApp request forms (flight / hotel) */
  function initForm(kind) {
    const form = $(`[data-form="${kind}"]`);
    if (!form) return;
    const today = new Date().toISOString().slice(0, 10);
    $$('input[type="date"]', form).forEach((d) => { d.min = today; });
    const back = $('[data-return]', form);
    if (back) {
      $$('input[name="trip"]', form).forEach((r) => r.addEventListener('change', () => {
        back.classList.toggle('is-hidden', form.trip.value !== 'ذهاب وإياب');
      }));
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const missing = $$('[data-required]', form).find((f) => !f.value.trim());
      if (missing) {
        $('[data-form-msg]', form).textContent = 'عبّي الحقول الأساسية لو سمحت.';
        missing.focus();
        return;
      }
      const v = (n) => (form[n] ? form[n].value.trim() : '');
      const lines = kind === 'flight'
        ? ['مرحباً، بدي احجز تذكرة طيران:', `• ${v('trip')}`, `• من: ${v('from') || 'دمشق'}`, `• إلى: ${v('to')}`, `• تاريخ الذهاب: ${v('date')}`,
          v('trip') === 'ذهاب وإياب' && v('back') ? `• تاريخ العودة: ${v('back')}` : '', `• عدد المسافرين: ${v('pax')}`,
          v('name') ? `• الاسم: ${v('name')}` : '', v('note') ? `• ملاحظة: ${v('note')}` : '']
        : ['مرحباً، بدي احجز فندق:', `• الوجهة: ${v('city')}`, `• الوصول: ${v('checkin')}`, `• المغادرة: ${v('checkout')}`,
          `• عدد الغرف: ${v('rooms')}`, `• عدد الأشخاص: ${v('guests')}`, v('name') ? `• الاسم: ${v('name')}` : ''];
      window.open(wa(lines.filter(Boolean).join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- الرحلات ---------- */
  function trips() {
    $('[data-trips]').innerHTML = TRIPS.map((t) => `
      <article class="feature" id="${t.id}">
        <div class="feature__media img-reveal">${ph(t.image, t.fallback, t.title)}</div>
        <div class="feature__body reveal">
          ${t.badge ? `<span class="route__badge">${t.badge}</span>` : ''}
          <h3>${t.title}</h3>
          <p>${t.text}</p>
          <div class="stops">
            <div class="stop"><span>${t.duration}</span><small>المدة</small></div>
            <div class="stop"><span>${t.date}</span><small>${t.price || 'اسأل عن السعر'}</small></div>
          </div>
          <ul class="ticks">${t.plan.map((p) => `<li>${p}</li>`).join('')}</ul>
          ${waPill('احجز مقعدك', `مرحباً، بدي احجز رحلة ${t.title} (${t.date})`)}
        </div>
      </article>`).join('');
  }

  function flights() {
    $('[data-airlines]').innerHTML = FLIGHTS.airlines.map((a) => `<span>${a}</span>`).join('');
    $('[data-perks]').innerHTML = FLIGHTS.perks.map(iconCard).join('');
    initForm('flight');
  }

  function hotels() {
    $('[data-perks]').innerHTML = HOTELS.perks.map(iconCard).join('');
    initForm('hotel');
  }

  function services() {
    $('[data-other]').innerHTML = OTHER.items.map((c, i) => `
      <div style="--i:${i % 3}">${ICON[c.icon] || ICON.doc}<h3>${c.title}</h3><p>${c.text}</p>
        <a class="more" href="${wa(`مرحباً، بدي استفسر عن ${c.title}`)}" target="_blank" rel="noopener">اسأل عن التفاصيل ${ICON.arrow}</a></div>`).join('');
  }

  function contact() {
    $('[data-contact]').innerHTML = [
      ...SITE.phones.map((p, i) => `<div style="--i:${i}"><small>${p.label}</small><a href="${p.wa ? wa() : `tel:${p.number}`}"${p.wa ? ' target="_blank" rel="noopener"' : ''}>${p.number}</a></div>`),
      `<div style="--i:4"><small>البريد</small><a href="mailto:${SITE.email}">${SITE.email}</a></div>`,
      `<div style="--i:5"><small>العنوان</small><span class="addr">${SITE.address}</span></div>`,
    ].join('');
    const q = encodeURIComponent(SITE.mapQuery);
    $('[data-map-embed]').innerHTML = `
      <iframe title="موقع المكتب على الخريطة" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://maps.google.com/maps?q=${q}&z=16&output=embed"></iframe>
      <a class="pill pill--main" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">افتح بالخرائط <span class="pill__icon" aria-hidden="true"></span></a>`;
  }

  function render() {
    const hero = HEROES[page] || HOME.hero;
    setBg($('[data-hero-img]'), hero.image, hero.fallback);
    setBg($('[data-cta-bg]'), hero.image, hero.fallback);
    $$('[data-wa-msg]').forEach((a) => { a.href = wa(a.dataset.waMsg); });
    ({ trips, flights, hotels, services, contact }[page] || (() => {}))();
  }

  K.boot(page, render);
})();
