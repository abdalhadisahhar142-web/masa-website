/* ==========================================================
   MASA — Home page (index.html)
   ========================================================== */
(() => {
  'use strict';
  const { $, pad, wa, ICON, ph, setBg } = K;

  function render() {
    // Hero
    $('[data-hero-word]').textContent = HOME.hero.word;
    $('[data-hero-sub]').textContent = HOME.hero.sub;
    $('[data-hero-btn]').textContent = HOME.hero.button;
    setBg($('[data-hero-img]'), HOME.hero.image, HOME.hero.fallback);

    // Services (each links to its page)
    const sv = $('[data-services]');
    sv.classList.add('stagger');
    sv.innerHTML = SERVICES.map((s, i) => `
      <a class="svc" href="${s.href}" style="--i:${i % 3}">
        <div class="svc__top"><h3>${s.title}</h3><span>/ ${s.meta}</span></div>
        ${ph(s.image, s.fallback, s.title)}
        <span class="svc__go">التفاصيل ${ICON.arrow}</span>
      </a>`).join('');

    // About
    const ab = HOME.about;
    $('[data-about-img]').innerHTML = `<img alt="" data-src="${ab.image}" data-fallback="${ab.fallback}">`;
    $('[data-about-text]').textContent = ab.text;
    $('[data-stats]').innerHTML = ab.stats.map((s) => `
      <div class="stat reveal"><b data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</b><span>${s.label}</span></div>`).join('');
    const items = ab.ribbon.map((r) => `<span>${r}</span>`).join('<span aria-hidden="true">·</span>');
    $('[data-ribbon]').innerHTML = `${items}<span aria-hidden="true">·</span>${items.replace(/<span>/g, '<span aria-hidden="true">')}<span aria-hidden="true">·</span>`;

    // Upcoming trips
    const fe = $('[data-featured]');
    fe.classList.add('stagger');
    fe.innerHTML = TRIPS.map((t, i) => `
      <article class="route" style="--i:${i % 2}">
        <div class="route__info">
          ${t.badge ? `<span class="route__badge">${t.badge}</span>` : ''}
          <h3 class="route__title">${t.title}</h3>
          <p class="route__airline">${t.type === 'داخلية' ? 'رحلة داخلية' : 'رحلة خارجية'}</p>
          <ul class="route__meta">
            <li><span>${t.date}</span>${ICON.cal}</li>
            <li><span>${t.duration}</span>${ICON.pin}</li>
            <li><span class="dim">${t.price || 'اسأل عن السعر'}</span>${ICON.tag}</li>
            <li><a class="dim" href="trips.html#${t.id}">البرنامج الكامل ←</a>${ICON.doc}</li>
          </ul>
          <a class="pill pill--main pill--block" href="${wa(`مرحباً، بدي احجز رحلة ${t.title}`)}" target="_blank" rel="noopener">احجز مقعدك <span class="pill__icon" aria-hidden="true"></span></a>
        </div>
        ${ph(t.image, t.fallback, t.title)}
      </article>`).join('');

    // Combine
    const co = HOME.combine;
    setBg($('[data-combine-bg]'), co.image, co.fallback);
    $('[data-extras]').innerHTML = co.extras.map((x, i) => `<li style="--i:${i}"><span>+</span>${x}</li>`).join('');
    $('[data-combine-text]').textContent = co.text;
    const st = $('[data-combine-steps]');
    st.classList.add('stagger');
    st.innerHTML = co.steps.map((s, i) => `<li style="--i:${i}"><div><b>${pad(i + 1)}</b><small>خطوة</small></div><h3>${s}</h3></li>`).join('');

    // Map
    DotMap.render($('[data-map]'), DESTINATIONS);

    // Why us
    const why = $('[data-why]');
    why.classList.add('stagger');
    why.innerHTML = HOME.why.map((w, i) => `
      <li style="--i:${i}">
        <div class="how__icon">${ICON[w.icon] || ICON.plane}<small>${pad(i + 1)}</small></div>
        <h3>${w.title}</h3><p>${w.text}</p>
      </li>`).join('');

    // Office
    const of = $('[data-office]');
    of.classList.add('stagger');
    of.parentElement.classList.add('branches--single');
    of.innerHTML = `
      <article class="branch" style="--i:0">
        <div class="branch__img branch__img--empty" data-office-img><span>MASA</span>
          <div class="branch__cap"><h3>مكتب دمشق</h3><p>شارع الفردوس</p></div>
        </div>
        <div class="branch__body">
          <span>${SITE.address}</span>
          ${SITE.hours ? `<span>${SITE.hours}</span>` : ''}
          ${SITE.phones.map((p) => `<a href="${p.wa ? wa() : `tel:${p.number}`}">${p.number}</a>`).join('')}
        </div>
        <a class="pill pill--main pill--block" href="${wa(SITE.defaultMsg)}" target="_blank" rel="noopener">راسلنا عالواتساب <span class="pill__icon" aria-hidden="true"></span></a>
      </article>`;
    const probe = new Image();
    probe.onload = () => {
      const box = $('[data-office-img]');
      box.classList.remove('branch__img--empty');
      box.querySelector('span').outerHTML = `<div class="ph"><img class="is-loaded" alt="مكتب ماسة" src="${OFFICE.image}"></div>`;
    };
    probe.src = OFFICE.image;
  }

  K.boot('home', render);
})();
