/* eslint-disable */
// @ts-nocheck
// Interactive behaviour for the homepage (ported from the front-end concept).
import {submitForm, formsEnabled, type FormTarget} from '../../contactConfig';
export interface HomeOpts { base: string; img: (name: string) => string; forms: FormTarget; navigate: (path: string) => void; }

export default function initHome(root: HTMLElement, opts: HomeOpts): () => void {

const D = opts.base + 'docs/';
const $ = (s: string): any => root.querySelector(s), $$ = (s: string): any[] => [...root.querySelectorAll(s)];
const offs: Array<() => void> = [];
const on = (t: any, ev: string, fn: any, o?: any) => { t.addEventListener(ev, fn, o); offs.push(() => t.removeEventListener(ev, fn, o)); };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- NAV ---------- */
const nav = $('#nav'), menu = $('#menu'), links = $('#navLinks');
const nightSecs = $$('.night');
function navState() {
  const y = scrollY, solid = y > window.innerHeight * 0.6;
  let onNight = false;
  if (solid) for (const s of nightSecs) { const r = s.getBoundingClientRect(); if (r.top <= 90 && r.bottom > 90) { onNight = true; break; } }
  nav.classList.toggle('solid', solid && !onNight);
  nav.classList.toggle('on-night', solid && onNight);
}
let navTick = false;
on(window, 'scroll', () => { if (!navTick) { navTick = true; requestAnimationFrame(() => { navTick = false; navState(); }); } }, { passive: true });
on(window, 'scrollend', navState); on(window, 'resize', navState); navState();
menu.onclick = () => { const o = links.classList.toggle('open'); menu.setAttribute('aria-expanded', o); };
on(links, 'click', e => { if (e.target.closest('a')) { links.classList.remove('open'); menu.setAttribute('aria-expanded', false); } });
const navMap = Object.fromEntries($$('.nav-links a[href^="#"]').map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$('.nav-links a').forEach(a => a.classList.remove('active')); navMap[e.target.id]?.classList.add('active'); } }), { rootMargin: '-45% 0px -50% 0px' });
Object.keys(navMap).forEach(id => { const el = id && root.querySelector('#' + CSS.escape(id)); el && spy.observe(el); });
offs.push(() => spy.disconnect());

/* ---------- PERSONA ---------- */
const P = {
  resident: { t: 'Live inside the circle', d: 'All-inclusive homes from $500 a month, shared meals, a vote in governance and contribution-based residency tiers.', l: [['#living', 'A day in Light City', 'Rhythm, homes & pricing'], [D + 'project/contribution-based-residency/', 'Contribution-based residency', 'Work-for-living tiers'], [opts.base + 'trust', 'Living here, honestly', 'Promises, exit terms, data rights'], [D + 'project/governance/', 'Governance', 'How decisions are made']] },
  investor: { t: 'Diligence-ready from day one', d: 'A staged raise starting with Stage 2 design, Phase 1 construction around $44M, an open sensitivity table and 8–12% target impact IRR.', l: [[opts.base + 'investors', 'Diligence room', 'Raise, model, comparables, legal path'], ['#invest', 'Scenarios & revenue', 'Low, mid and high cases'], [D + 'project/development-stages/', 'Development stages', 'Timeline, costs, model notes'], [D + 'project/site-locations/', 'Site locations', 'Five candidate regions'], [D + 'project/governance/', 'Governance', 'Decision rights & structure']] },
  builder: { t: 'Proven materials, phased construction', d: 'Timber gridshells, earth and clay, mass timber and building-integrated solar — every system TRL 7–9 unless clearly marked as research.', l: [['#forms', 'Beyond the box', 'Curved, low-cost forms'], ['#technology', 'Technology', 'What we build with'], [D + 'design/architecture/', 'Architecture', 'Domes, spire, layout'], [D + 'technical/technology-catalog/', 'Technology catalog', 'Specs, suppliers, TRLs']] },
  researcher: { t: 'Open science, honest readiness', d: 'Pre-registered, IRB-approved studies with consent and opt-out zones. Engineering and consciousness hypotheses are kept separate.', l: [['#research', 'Research programs', 'Four tracks with TRL levels'], [D + 'research/open-questions/', 'Open questions', 'Where we need help'], [D + 'concepts/energy-systems/', 'Energy systems', 'Two-track measurement model']] },
  curious: { t: 'Start with the story', d: 'An archetypal city of light, translated into something buildable. Begin with the vision, then walk the city ring by ring.', l: [['#vision', 'The vision', 'Three pillars'], ['#city', 'Explore the city', 'Interactive plan'], [D + 'START-HERE/', 'Start here', 'A guided reading path'], [opts.base + 'trust', 'Living here, honestly', 'Our promises in writing']] },
};
const pp = $('#personaPanel');
function persona(k) {
  const p = P[k];
  pp.innerHTML = `<div><h3 style="font:400 var(--text-lg)/1.2 var(--display);color:#fff">${p.t}</h3><p style="margin-top:6px">${p.d}</p></div><div class="persona-links">${p.l.map(([h, a, s]) => `<a href="${h}">${a}<small>${s}</small></a>`).join('')}</div>`;
  pp.classList.remove('swap'); void pp.offsetWidth; pp.classList.add('swap');
}
$$('.persona-tabs button').forEach(b => b.onclick = () => { $$('.persona-tabs button').forEach(x => x.setAttribute('aria-selected', x === b)); persona(b.dataset.p); });
on($('.persona-tabs'), 'keydown', e => {
  if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
  const bs = $$('.persona-tabs button'), i = bs.indexOf(document.activeElement); if (i < 0) return;
  const n = bs[(i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length]; n.focus(); n.click();
});
persona('resident');

/* ---------- CITY PLAN ---------- */
const Z = {
  spire: { k: 'The heart', t: 'Crystal Point Spire & Central Plaza', img: 'spire', d: 'An eight-sided crystal of faceted blue, violet and amber solar glass rising to a sharp glass point, rising from a reflecting plaza, built in sections: the ceremonial heart of the city, with civic halls, an observatory and a wind crown.', s: [['Height', '90 m → 150 m → 240 m'], ['Structure', 'Steel frame, solar glass, concrete core'], ['Energy', 'Solar glass + vortex wind crown (supplemental)'], ['Readiness', 'TRL 4–5 · a new assembly of proven parts']], l: [D + 'design/architecture/', 'Spire design'] },
  inner: { k: 'Inner ring', t: 'Temples & Learning Centers', img: 'dome-interior', d: 'Primary gathering spaces: the temple dome, meditation halls, a school and the community library. Quiet, light-filled and acoustically tuned.', s: [['Uses', 'Temple, meditation, school, library'], ['Form', 'Acoustically tuned earth or timber dome'], ['Character', 'Calm, acoustic, daylit']], l: [D + 'concepts/sacred-geometry/', 'Sacred geometry'] },
  middle: { k: 'Middle ring', t: 'Studios & Collaboration', img: 'research', d: 'Creative studios, workshops, the research pavilion and shared offices — where residents make, build and study together.', s: [['Uses', 'Studios, labs, co-working, makerspace'], ['Research', 'Biophilic health, acoustics, coherence'], ['Access', 'Radial paths from every home']], l: [D + 'research/open-questions/', 'Research questions'] },
  outer: { k: 'Outer ring', t: 'Communospheres & Gardens', img: 'living', d: 'Residential communospheres — each a self-governing neighborhood built for 80–120 people (about 50 in Phase 1) — woven through gardens, with clusters of earth tiny homes between them.', s: [['Domes', '3 in Phase 1 → 12+ at full build'], ['Size', '30–45 m diameter, 80–120 residents'], ['Envelope', 'Timber gridshell + BIPV, clay interiors'], ['Tiny homes', 'Earth clusters of 3–6 around a courtyard']], l: [D + 'concepts/communospheres/', 'Communospheres'] },
  agri: { k: 'Living edge', t: 'Food, Water & Energy Belt', img: 'tech-agroforestry', d: 'Food forests, aquaponics, rainwater catchment, living-machine water treatment and the solar microgrid that powers the city.', s: [['Solar', '2–5 MWp Phase 1 → 15–50 MWp'], ['Food', 'Agroforestry, solar greenhouses, aquaponics'], ['Water', 'Rainwater, living machines, AWG backup']], l: [D + 'concepts/energy-systems/', 'Energy systems'] },
};
const R = [['spire', 0, 42], ['inner', 42, 96], ['middle', 96, 150], ['outer', 150, 206], ['agri', 206, 252]];
const plan = $('#plan'), ns = 'http://www.w3.org/2000/svg';
const ann = (a, b) => a === 0 ? `M${-b} 0a${b} ${b} 0 1 0 ${2 * b} 0a${b} ${b} 0 1 0 ${-2 * b} 0Z` :
  `M${-b} 0a${b} ${b} 0 1 0 ${2 * b} 0a${b} ${b} 0 1 0 ${-2 * b} 0ZM${-a} 0a${a} ${a} 0 1 1 ${2 * a} 0a${a} ${a} 0 1 1 ${-2 * a} 0Z`;
let h = '';
for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; h += `<line class="spoke" x1="${Math.cos(a) * 44}" y1="${Math.sin(a) * 44}" x2="${Math.cos(a) * 252}" y2="${Math.sin(a) * 252}"/>`; }
R.forEach(([k, a, b]) => { h += `<path class="ring" data-z="${k}" d="${ann(a, b)}" fill-rule="evenodd" tabindex="0" role="button" aria-label="${Z[k].t}"/>`; });
// inner ring buildings (8), middle (12 small)
// Temple and learning pavilions at the 3D model's angles (counter-clockwise from east): 3, then 6, then 8
[[105, 1], [225, 1], [345, 1], [45, 2], [165, 2], [285, 2], [15, 3], [195, 3]].forEach(([deg, ph]) => { const a = -deg * Math.PI / 180; h += `<circle class="bldg" data-ph="${ph}" cx="${Math.cos(a) * 69}" cy="${Math.sin(a) * 69}" r="9"/>`; });
for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + .1; h += `<rect class="bldg" data-ph="${i < 4 ? 1 : i < 10 ? 2 : 3}" x="${Math.cos(a) * 123 - 7}" y="${Math.sin(a) * 123 - 5}" width="14" height="10" rx="2" transform="rotate(${a * 180 / Math.PI + 90} ${Math.cos(a) * 123} ${Math.sin(a) * 123})"/>`; }
// Same order as the 3D model (static/model/city.js PHASES): 3 domes, then 8, then 12
const domeOrder = [2, 10, 6, 0, 8, 4, 3, 9, 1, 11, 7, 5];
for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 - Math.PI / 2, rank = domeOrder.indexOf(i); h += `<circle class="dome" data-ph="${rank < 3 ? 1 : rank < 8 ? 2 : 3}" cx="${Math.cos(a) * 178}" cy="${Math.sin(a) * 178}" r="20"/>`; }
for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; h += `<circle class="bldg lit" cx="${Math.cos(a) * 229}" cy="${Math.sin(a) * 229}" r="${i % 3 ? 3 : 5}" style="fill:rgba(140,190,120,${i % 3 ? .35 : .5})"/>`; }
h += `<circle class="pulse" r="10"/><circle class="spire-dot" r="7"/>`;
h += `<text x="0" y="-${235}" text-anchor="middle" dy="4">Food · Water · Energy</text>`;
plan.innerHTML = h;
const zone = $('#zone');
function selZone(k) {
  const z = Z[k];
  $$('#plan .ring').forEach(r => { const on = r.dataset.z === k; r.classList.toggle('sel', on); r.setAttribute('aria-pressed', on); });
  zone.innerHTML = `<img src="${opts.img(z.img)}" alt="" width="800" height="450"><div class="zone-body"><span class="zone-k">${z.k}</span><h3>${z.t}</h3><p>${z.d}</p><dl>${z.s.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl><a class="link light" href="${z.l[0]}">${z.l[1]} <span aria-hidden="true">→</span></a></div>`;
  zone.classList.remove('swap'); void zone.offsetWidth; zone.classList.add('swap');
}
$$('#plan .ring').forEach(r => { r.onclick = () => selZone(r.dataset.z); r.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selZone(r.dataset.z); } }; });
function phase(n) {
  $$('.phase-switch button').forEach(b => b.setAttribute('aria-checked', b.dataset.phase == n));
  $$('#plan .dome, #plan .bldg[data-ph]').forEach((el, i) => setTimeout(() => el.classList.toggle('lit', +el.dataset.ph <= n), reduce ? 0 : (i % 12) * 40));
}
$$('.phase-switch button').forEach(b => b.onclick = () => phase(+b.dataset.phase));
selZone('outer'); phase(1);

/* ---------- TECH ---------- */
const T = [
  ['form-gridshell', 'structure', 'Timber gridshell', 'Bent lattices of thin timber for the domes: long spans with very little material.', 8, 9],
  ['form-superadobe', 'structure', 'Earthbag & superadobe', 'Domes and vaults of bagged local soil for tiny homes and quiet rooms.', 7, 9],
  ['form-printed-earth', 'structure', '3D-printed earth', 'Curved walls printed from local soil, as in the TECLA prototype.', 6, 7],
  ['form-clay-plaster', 'structure', 'Clay plaster', 'Breathable interior finish that buffers humidity and softens sound.', 9, 9],
  ['clt-construction', 'structure', 'Cross-laminated timber', 'Mass-timber panels for dome frames and homes. Stores carbon; proven to 85 m.', 8, 9],
  ['geodesic-dome', 'structure', 'Geodesic dome systems', 'Light, strong spherical frames that enclose the most space with the least material.', 7, 8],
  ['hempcrete', 'structure', 'Hempcrete', 'Breathable, carbon-storing wall infill; costs more than standard walls today.', 8, 9],
  ['mycelium-insulation', 'structure', 'Mycelium insulation', 'Grown, compostable insulation panels — early commercial.', 6, 7],
  ['bipv-solar-facade', 'energy', 'Building-integrated PV', 'Solar glass that is also the dome skin — every surface makes power.', 8, 9],
  ['flow-battery', 'energy', 'Flow batteries', 'Long-duration, non-flammable storage to carry the microgrid through the night.', 7, 8],
  ['rainwater-harvesting', 'water', 'Rainwater harvesting', 'Dome surfaces catch and store water for gardens and households.', 9, 9],
  ['living-machine', 'water', 'Living machines', 'Biological wastewater treatment through plant-filled tanks and wetlands.', 8, 9],
  ['atmospheric-water', 'water', 'Atmospheric water', 'Backup drinking water drawn from humid air.', 7, 8],
  ['agroforestry', 'food', 'Agroforestry', 'Layered food forests on the city edge — perennial, resilient, carbon-rich.', 9, 9],
  ['aquaponics-system', 'food', 'Aquaponics', 'Fish and plants in one closed nutrient loop.', 8, 9],
  ['vertical-farm', 'food', 'Vertical farming', 'Small, for greens only. Solar greenhouses come first because they use far less energy.', 8, 9],
];
const rail = $('#techRail');
rail.innerHTML = T.map(([img, c, t, d, a, b]) => `<article class="tcard" data-c="${c}"><img src="${opts.img(/^form-/.test(img) ? img : 'tech-' + img)}" alt="${t}" width="720" height="540" loading="lazy"><div class="tcard-b"><div class="tcard-top"><span>${c}</span><span>TRL ${a === b ? a : a + '–' + b}</span></div><h3>${t}</h3><p>${d}</p><div class="trl-meter" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<i class="${i < b ? 'on' : ''}"></i>`).join('')}</div></div></article>`).join('');
$$('#techChips .chip').forEach(b => b.onclick = () => {
  $$('#techChips .chip').forEach(x => x.classList.toggle('active', x === b));
  $$('.tcard').forEach(c => c.hidden = !(b.dataset.f === 'all' || c.dataset.c === b.dataset.f));
  rail.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' });
});
const step = () => (rail.querySelector('.tcard:not([hidden])')?.offsetWidth || 300) + 20;
$('#railPrev').onclick = () => rail.scrollBy({ left: -step() * 2, behavior: 'smooth' });
$('#railNext').onclick = () => rail.scrollBy({ left: step() * 2, behavior: 'smooth' });

/* ---------- DAY ---------- */
const H = [['6:00', 'Wake', 'Wake naturally as circadian lighting warms with the sunrise.'], ['7:00', 'Meditate', 'Morning meditation together in the temple dome.'], ['9:00', 'Work', 'Remote work, the studios and labs, the care farm and stables, or out on the land.'], ['17:00', 'Create', 'Workshops, sport, music and art; a swim in the pond or a paddle from the boathouse.'], ['19:00', 'Dine', 'Communal dinner, cooked from the food belt.'], ['20:00', 'Gather', 'An evening ceremony in the Spire Park, or a concert on the festival meadow.'], ['22:00', 'Rest', 'Quiet hours. Stars over the domes.']];
const hours = $('#hours'), range = $('#dayRange'), arc = $('#arcPath'), sun = $('#sun'), hd = $('#hourDetail');
hours.innerHTML = H.map(([t, n], i) => `<li><button data-i="${i}"><b>${t}</b>${n}</button></li>`).join('');
function hour(i) {
  range.value = i;
  $$('#hours button').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
  const x = 1000 * (i + .5) / 7, t = (x - 20) / 960, y = (1 - t) ** 2 * 210 + 2 * (1 - t) * t * -150 + t * t * 210;
  sun.style.left = (x / 10) + '%'; sun.style.top = (y / 220 * 100) + '%';
  sun.classList.toggle('moon', i >= 5);
  hd.textContent = H[i][2];
  const sc = $('.day-scroll'); if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollTo({ left: (sc.scrollWidth * (i + .5) / 7) - sc.clientWidth / 2, behavior: 'smooth' });
}
range.oninput = () => hour(+range.value);
$$('#hours button').forEach(b => b.onclick = () => hour(+b.dataset.i));
const dayEl = $('.day .sun-arc'); let dragging = false;
const fromX = e => { const r = dayEl.getBoundingClientRect(); hour(Math.max(0, Math.min(6, Math.floor((e.clientX - r.left) / r.width * 7)))); };
on(dayEl, 'pointerdown', e => { dragging = true; dayEl.setPointerCapture(e.pointerId); fromX(e); });
on(dayEl, 'pointermove', e => dragging && fromX(e));
on(dayEl, 'pointerup', () => dragging = false);
hour(0);

/* ---------- INVEST ---------- */
const SC = [['$22.1M', '$1.8M', '150', '≈85', 0], ['$45M', '$2.5M', '200', '110', .5], ['$95.5M', '$4.5M', '300', '≈165', 1]];
// Per scenario [low, mid, high], $M a year at 90% occupancy. Resident fees use the household model (home fee + member fees).
const REV = [['Resident fees', [.99, 1.46, 2.46]], ['Retreats', [.4, .65, .9]], ['Events & agritourism', [.2, .325, .45]], ['Licensing', [.2, .325, .45]]];
const REVMAX = 2.46;
const fmt = v => v >= 1 ? '$' + v.toFixed(2).replace(/0$/, '') + 'M' : '$' + Math.round(v * 1000) + 'K';
const bars = $('#bars');
bars.innerHTML = REV.map(([n]) => `<li><span>${n}</span><span class="v"></span><span class="track"><span class="fill"></span></span></li>`).join('');
let barsSeen = false;
function scen(i) {
  $$('.scen button').forEach(b => b.setAttribute('aria-checked', +b.dataset.s === i));
  ['kCapex', 'kOpex', 'kCap', 'kBe'].forEach((id, j) => { const el = $('#' + id); el.textContent = SC[i][j]; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); });
  $$('#bars li').forEach((li, j) => { const v = REV[j][1][i]; li.querySelector('.v').textContent = fmt(v); if (barsSeen) li.querySelector('.fill').style.width = (v / REVMAX * 100) + '%'; li.dataset.w = (v / REVMAX * 100); });
}
$$('.scen button').forEach(b => b.onclick = () => scen(+b.dataset.s));
scen(1);

/* ---------- ROADMAP ---------- */
// Schedule re-baselined November 2026: Stage 1 extended, later stages moved back about one year.
// Source of truth: docs/project/development-stages.md
const ST: Array<[string, string, string, string, string[], string[]]> = [
  ['Foundation', 'Oct 2025 – Dec 2026', 'current', 'All planned deliverables are published, plus a household financial model, an economy plan and a 3D model. Four open items remain before the gate review in December.', ['Core concept documentation', 'Household financial model, three scenarios', 'Governance and residency frameworks', 'Economy and migration plan (draft)', 'Technology catalog and urban retrofit guide', 'Visual system and 3D model', 'Public website and founding-circle sign-up'], ['Debt service in the financial model', 'Confirm fee basis and economy thresholds', 'Counsel, entity and first advisors']],
  ['Design', 'Jan – Jun 2027', 'next', 'Architecture, engineering and permit preparation.', [], ['Complete architectural documentation', 'City layout and sacred geometry maps', 'Engineering partners selected', 'Permit pathway prepared']],
  ['Digital', 'Jul – Nov 2027', '', 'CRM, resident applications and investor portal.', [], ['Founding-circle CRM', 'Resident and investor applications', 'Community platform']],
  ['Community', 'Dec 2027 – Nov 2028', '', 'Retreats, pilot programs, land and permits.', [], ['Retreats and pilot residencies', 'Founding community formed', 'Land secured and permits filed']],
  ['Physical', 'Dec 2028 – Nov 2031', '', 'Capital raise and Phase 1 construction.', [], ['Capital raise closes', '3 communospheres and the first spire', '2–5 MWp solar microgrid']],
  ['Operational', '2032 onward', '', 'Break-even and the move to community governance.', [], ['200 residents in about 110 homes; operating break-even is the gate', 'Community Council with 80% consent threshold', 'Phase 2 planning (1,500 residents)']],
];
const stages = $('#stages'), sd = $('#stageDetail');
const cur = ST.findIndex(r => r[2] === 'current');
stages.innerHTML = ST.map(([n, w, st], i) => `<button type="button" class="stage ${st === 'current' ? 'current' : i < cur ? 'done' : ''}" role="tab" aria-selected="false" data-i="${i}"><span class="dot">${i + 1}</span><span class="st">${n}</span><span class="sd">${w}</span></button>`).join('');
function stage(i: number) {
  $$('.stage').forEach(b => b.setAttribute('aria-selected', String(+b.dataset.i === i)));
  const btn = stages.children[i] as HTMLElement;
  if (btn && stages.scrollWidth > stages.clientWidth) stages.scrollTo({left: Math.max(0, btn.offsetLeft - 12), behavior: 'smooth'});
  const [n, w, st, d, done, todo] = ST[i];
  const label = st === 'current' ? 'In progress' : st === 'next' ? 'Up next' : 'Planned';
  sd.innerHTML = `<div><h3>Stage ${i + 1} · ${n}</h3><p class="when">${w} · ${label}</p><p>${d}</p>${st === 'current' ? `<p class="upd">Schedule updated November 2026</p>` : ''}</div><ul>${done.map(x => `<li class="done">${x}</li>`).join('')}${todo.map(x => `<li${st === 'current' ? ' class="todo"' : ''}>${x}</li>`).join('')}</ul>`;
  sd.classList.remove('swap'); void sd.offsetWidth; sd.classList.add('swap');
}
$$('.stage').forEach(b => b.onclick = () => stage(+b.dataset.i));
stage(0);

/* ---------- LIBRARY ---------- */
const DOCS = [
  ['START-HERE', 'Project', 'Start here', 'How the library is organized, plus a reading path for you.', 1],
  ['at-a-glance', 'Project', 'Light City at a glance', 'Every key number in one place: scale, cost, homes, timeline.'],
  ['concepts/the-transition', 'Concepts', 'The transition', 'Five movements from today’s life to the Light City future.', 1],
  ['technical/technology-horizon', 'Technical', 'Technology horizon', 'Proven, scaling, emerging and frontier tech, with 2026 status.'],
  ['glossary', 'Research', 'Glossary', 'Plain-language definitions of every Light City term.'],
  ['concepts/core-concepts', 'Concepts', 'Core concepts', 'Foundational principles behind Light City.'],
  ['concepts/philosophy', 'Concepts', 'Philosophy', 'Spirit before structure, Gaia’s memory, co-creation.'],
  ['concepts/purpose-and-mission', 'Concepts', 'Purpose & mission', 'Why this, why now, and how we measure it.'],
  ['concepts/communospheres', 'Concepts', 'Communospheres', 'The dome neighborhoods where residents live.'],
  ['concepts/sacred-geometry', 'Concepts', 'Sacred geometry', 'Golden ratio, flower of life and the city plan.'],
  ['concepts/energy-systems', 'Concepts', 'Energy systems', 'Solar microgrid plus the subtle-energy research track.'],
  ['design/architecture', 'Design', 'Architecture', 'Spire, domes, rings — archetype vs. Earth build.'],
  ['design/organic-forms-and-materials', 'Design', 'Beyond the box', 'Curved forms and healthy, low-cost materials, with costs.'],
  ['design/light-on-the-land', 'Design', 'Light on the land', 'Minimal impact on nature: what is possible today, ten commitments.'],
  ['design/layout-diagrams', 'Design', 'Layout & diagrams', 'City plan, cross-sections and energy flows.'],
  ['design/visual-language', 'Design', 'Visual language', 'Symbols, forms and the look of the city.'],
  ['design/color-and-light', 'Design', 'Color & light', 'How light shapes every space and ritual.'],
  ['technical/technology-catalog', 'Technical', 'Technology catalog', 'Every system with TRL, cost and suppliers.'],
  ['technical/urban-retrofit-guide', 'Technical', 'Urban retrofit guide', 'Bringing Light City principles to existing towns.'],
  ['research/open-questions', 'Research', 'Open questions', 'What we don’t know yet — and how to test it.'],
  ['research/bibliography', 'Research', 'Bibliography', 'Sources, studies and further reading.'],
  ['project/development-stages', 'Project', 'Development stages', 'Six stages, timeline, costs and milestones.'],
  ['project/site-locations', 'Project', 'Site locations', 'Five regions in four countries, scored and mapped.'],
  ['project/governance', 'Project', 'Governance', 'Founder-led to community council, 80% consent.'],
  ['project/contribution-based-residency', 'Project', 'Contribution-based residency', 'Work-for-living tiers aligned with community needs.'],
  ['project/economy-and-migration', 'Project', 'Economy and migration', 'From dollar fees to Light hours, step by step with resident votes.'],
  ['project/quick-start-guide', 'Project', 'Quick-start guide', 'Get oriented in fifteen minutes.'],
  ['project/contributing', 'Project', 'Contributing', 'How to help — writing, design, research, code.'],
];
const docs = $('#docs'), q = $('#libSearch'), empty = $('#libEmpty');
docs.innerHTML = DOCS.map(([p, c, t, d, f]) => `<a class="doc${f ? ' feat' : ''}" data-c="${c}" data-s="${(t + ' ' + d + ' ' + c).toLowerCase()}" href="${D + p}/"><span class="doc-k">${c}</span><h3>${t}</h3><p>${d}</p><span class="go">Read <span aria-hidden="true">→</span></span></a>`).join('');
let libF = 'all';
function lib() {
  const s = q.value.trim().toLowerCase(); let n = 0;
  $$('.doc').forEach(a => { const ok = (libF === 'all' || a.dataset.c === libF) && (!s || a.dataset.s.includes(s)); a.hidden = !ok; n += ok; });
  empty.hidden = n > 0;
}
q.oninput = lib;
$$('#libChips .chip').forEach(b => b.onclick = () => { $$('#libChips .chip').forEach(x => x.classList.toggle('active', x === b)); libF = b.dataset.f; lib(); });

/* ---------- REVEAL / COUNTERS / PARALLAX ---------- */
$$('.sec-head, .pillars li, .stats > div, .tcard, .home, .kpis > div, .cmp, .doc, .zone, .plan-wrap, .hour-detail, .vision-art, .living-art, .research-art, .stage-detail').forEach(el => el.classList.add('rv'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const t = e.target; t.classList.add('in'); io.unobserve(t);
  if (t.id === 'bars') { barsSeen = true; $$('#bars li').forEach(li => li.querySelector('.fill').style.width = li.dataset.w + '%'); }
  if (t.id === 'stages') stages.style.setProperty('--prog', '8');
  if (t.dataset.count) count(t);
}), { threshold: .15 });
$$('.rv, #bars, #stages, #trl, [data-count]').forEach(el => io.observe(el));
function count(el) {
  const n = +el.dataset.count, suf = el.dataset.suffix || '';
  if (reduce) { el.textContent = n + suf; return; }
  const t0 = performance.now();
  (function f(t) { const k = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(f); })(t0);
}
if (!reduce) {
  const band = $('.band img'), bandSec = $('.band');
  on(window, 'scroll', () => { const r = bandSec.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) band.style.transform = `translateY(${(r.top / innerHeight) * -8}%)`; }, { passive: true });
}

/* ---------- FORM (Google Sheet via Apps Script, FORMS_ENDPOINT_URL) ---------- */
$('#joinForm').onsubmit = async (e: Event) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement, m = $('#formMsg'), btn = f.querySelector('button') as HTMLButtonElement;
  if (!formsEnabled(opts.forms)) { m.innerHTML = `Signups open soon. Until then, please use the <a href="${opts.base}contact">contact form</a>.`; return; }
  btn.disabled = true; m.textContent = 'Sending…';
  try {
    if (await submitForm(opts.forms, f)) { m.textContent = 'Thank you — you’re on the list. We’ll be in touch as the next stage opens.'; f.reset(); } else throw 0;
  } catch { m.innerHTML = `Something went wrong. Please try again or use the <a href="${opts.base}contact">contact form</a>.`; }
  finally { btn.disabled = false; }
};

/* ---------- INTERNAL LINKS: client-side navigation ---------- */
on(root, 'click', (e: MouseEvent) => {
  const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
  const href = a.getAttribute('href') || '';
  // Static files (the 3D model, PDFs, images) are not app routes: let the browser load them.
  const isFile = /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);
  if (href.startsWith(opts.base) && !href.startsWith('#') && !isFile) { e.preventDefault(); opts.navigate(href); }
});

return () => { offs.forEach(fn => fn()); io.disconnect(); };

}
