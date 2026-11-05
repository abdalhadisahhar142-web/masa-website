/* ==========================================================
   الفرقان — Dotted map (Europe · Middle East · North Africa)
   خريطة منقّطة مرسومة بالكود: ما بتحتاج صورة ولا إنترنت.
   الوجهات بتنضاف من DESTINATIONS بـ js/data.js (خط العرض والطول).
   ========================================================== */
window.DotMap = (() => {
  'use strict';

  // Mercator grid: 156 × 131 cells, lon -14…64, lat 10…60
  const GRID = { cols: 156, rows: 131, lonMin: -14, lonMax: 64, latMin: 10, latMax: 60 };
  const MASK = 'AAAAAMD___8DAMD__________w8AAAAA-P__HwAI____________AAAAAMD___8A8P___________w8AAAIA8J__H4D_____________AAAgAIB__H8A-v___________w8AAAIA-MP_AeD_____________AIA8AAAf-B8A8____________w8A5AEAwID_AQD-____________AAAOAAAA-B8C4P___________w8A6g8AABD_MTj-____________AID-AACA8R-B4____________w8A4A8AABr-EXj_____________AAB9AADg4R_A_____________w8A4AMAAD_-APz_____________AAA-AADw4Q_A_____________w8AwA8AAA8dAPz_____________AID6AQDw3AHA_____________w8Awh8AAPYBAPz_____________APj8AQBgCADA_____________w-AHx4AAM4AGP______________APjhBwDAROD5_____________w_wD_wAADyH________________AH7ADwCA_________________w_wD_wAwP7_________________AP74H4D__________________w_gj_8A_P__________________AP7wf-D__________________w_wB_8H_v__________________AB_8f_D__________________w9wwP8D____________________AADgH_j__________________w8AAP_n____________________AAD4nf___________________w8AwAH4____________________AAACgP___________________w8AAAD-____________________AAAA8____________________w8AAOD_____________________AAAA_v___________________w8AgP______________________AAD4_____________________w8AgP______________________AADA_____________________w8AAPD_____________________AAAA____________P_7__9H__w8AAPD_________v37w__8H_P__AAAA_P_________xA_7_P8D__w8AAMD_________Dzjw__8B_P__AAAA_P__n____3_gg___B8D__w8AAMD____J____B_j__3-A____AAAA_P__H_7__3-Agf__A_z__w8AAOD____B____Awjw_x_g____AAAA_v8PH_j__x8AAPz_B_z__w8AAeD_f-AD____AQCA_3_A____APh__8cBfuD__w8AAPD_B_j__w_A__8_AOAP_P__AAAA_H8A____APz__wNA_AD__wcAAID_D-D__w-A__8_AIYfwP__AAAA-P8A_v__APz__wNA8A_4_w_AAwD_HyD__w_A__8fAAT-gP__Af8A-P8D8v__APj_fwBAAD_4___5f-D_PwD-_w-A__8DAAfgh_9w8P____8H5P__APz_HwBgALz5Dfb______-H__w_A__8AAQaAER_w______8H_P__APz_BwZgABDwA_______f4D__w_g_38AAAYAA37Q______8D-P__AP7_DwAAABDABfz_____PwD__w-A_38AAAAAAfzA______8D8P__APz_BwAAYA6ADfz_____PwD__w_A_z8AAAA-ADjA______8D8P__APz_AACAgAOAA_j______wH__w8A-A-A8z8gADhA______8_8P__AAADwP__AQAAAMDx8P_______w8AAAD__x8QAAAAAAL_________AAAB_P__AwAAAAAA8P_______w8AcOH__z8AAIAXAAz_________AID_____AwAAAABg8P_______w8A-P___x8AAAAAAAD_________AMD_____AAAAAAAA-P_______w8A_v___x8AAAAAAID_________APj_____BwAAAAAA_P_______w_A______8PABwAAMD_________AP7______wPgAwAA_P_______w_g______9_AP8DAOD_________AP_______wfw_wEO_v_______w_w________B___-f__________AP_________x_____________w_g___________________7____AP__________________H_7__w_w______________3____g____wf_____________f_f__H_z__w_-_____________9v____B____-P____________9__f__H_j__8_______________4f___8D_v___v______________8P__f8Dv_-_______________w____8PIPz_________________4P___wDA_________________x_-__9PAPn_________________wf___wUY4Pf______________z_8__9fwAEA________________g____wceAPD______________3_w_____wMA________________B_7_____A_D______________3_A_____z8A________________H_z_____B_D________________D_____38A________________P_z_____B_D________________D_____z8A________________P_j_____AfD_______________8D_____y8A________________f-D___9_APD_______________8H_P___w8A________________f8D___8_APD_______________8P-P___wEA_________________4H___8PAPD_______________8_4P__fwAA_________________wP-__8AAPD_______________8_wP__AQAA_________________wf8_w8AAPD_______________9_wP__AAAA_________________w_8_wEAAPD_________________w_8DAAAA_________________3_8HwAAAPD_________________nz8AAAAA__________________95AAAAAPD_________________PwAAGAAA__________________8HAAAAAPD_________________HwAgAAAA__________________8H8AMAAPD___________________g_AAAA_____________________wMAAAA';

  const RAD = Math.PI / 180;
  const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));
  const cell = ((GRID.lonMax - GRID.lonMin) * RAD) / GRID.cols;
  const yTop = mercY(GRID.latMax);

  /* lat/lon → grid units (same space as the dots) */
  const project = (lat, lon) => ({
    x: ((lon - GRID.lonMin) / (GRID.lonMax - GRID.lonMin)) * GRID.cols,
    y: (yTop - mercY(lat)) / cell,
  });

  function decodeMask() {
    const bin = atob(MASK.replace(/-/g, '+').replace(/_/g, '/'));
    const bits = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bits[i] = bin.charCodeAt(i);
    return (i) => (bits[i >> 3] >> (i & 7)) & 1;
  }

  const NS = 'http://www.w3.org/2000/svg';
  const el = (name, attrs = {}) => {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };

  /* Curved path between two points (arc bends upward) */
  function arc(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    return `M${a.x.toFixed(2)} ${a.y.toFixed(2)} Q${mx.toFixed(2)} ${(my - dist * 0.28).toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
  }

  function render(host, places) {
    const isLand = decodeMask();
    const svg = el('svg', { viewBox: `0 0 ${GRID.cols} ${GRID.rows}`, class: 'dotmap__svg', 'aria-hidden': 'true' });

    // Land dots in one path = fast
    let d = '';
    for (let r = 0; r < GRID.rows; r++) {
      for (let c = 0; c < GRID.cols; c++) {
        if (isLand(r * GRID.cols + c)) d += `M${c + 0.5} ${r + 0.5}h0`;
      }
    }
    svg.append(el('path', { d, class: 'dotmap__land' }));

    // Routes from each branch to every destination
    const pts = places.map((p) => ({ ...p, ...project(p.lat, p.lon) }));
    const hubs = pts.filter((p) => p.branch);
    const routes = el('g', { class: 'dotmap__routes' });
    let n = 0;
    hubs.forEach((h) => pts.filter((p) => !p.branch).forEach((p) => {
      routes.append(el('path', { d: arc(h, p), pathLength: 1, style: `--i:${n++}` }));
    }));
    svg.append(routes);

    // Markers
    const marks = el('g', { class: 'dotmap__marks' });
    pts.forEach((p, i) => {
      const g = el('g', { class: `dotmap__mark${p.branch ? ' is-branch' : ''}`, style: `--i:${i}`, transform: `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})` });
      g.append(el('circle', { r: p.branch ? 3.2 : 2.2, class: 'dotmap__glow' }));
      g.append(el('circle', { r: p.branch ? 1.15 : 0.8, class: 'dotmap__dot' }));
      marks.append(g);
    });
    svg.append(marks);
    host.append(svg);

    // HTML labels (crisp text, positioned in %)
    pts.forEach((p, i) => {
      const label = document.createElement('span');
      label.className = `dotmap__label${p.branch ? ' is-branch' : ''}`;
      label.style.cssText = `--x:${(p.x / GRID.cols) * 100}%;--y:${(p.y / GRID.rows) * 100}%;--i:${i}`;
      label.textContent = p.name;
      host.append(label);
    });
  }

  return { render };
})();
