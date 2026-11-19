// Light City reference model: one model, with Phase 2 and Phase 3 structures switched on as layers.
// Source of truth: docs/design/architecture.md (Circular form) and img/diagrams/city-layout.svg.
// Units are metres. North is -Z. Angles are measured counter-clockwise from east, as on the plan.
import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import * as TX from './textures.js';

// Three phases share one radial plan and grow outward from the same spire and plaza.
// Phase facts: docs/at-a-glance.md (Scale by phase), docs/concepts/communospheres.md, docs/design/architecture.md.
// Rule: build once, grow outward. Nothing built in one phase is removed in the next; later phases
// fill reserved plots, add sections to the same spire and add rings outside the existing ones.
export const PHASES = {
  1: {name: 'Phase 1 · Pilot hamlet', people: '200 residents', area: '20–30 acres',
    spireSections: 3,
    inner: [[105, 10], [225, 7], [345, 7]],
    domes: [[45, 40], [165, 40], [285, 40]],
    homes: 1, extent: 222, view: 1},
  2: {name: 'Phase 2 · Village', people: '1,500 residents', area: 'about 160 acres',
    spireSections: 5,
    inner: [[105, 10], [225, 7], [345, 7], [45, 8], [165, 8], [285, 8]],
    domes: [[45, 40], [165, 40], [285, 40], [105, 44], [225, 44], [345, 44], [15, 44], [195, 44]],
    homes: 2, clusters: [255, 315], belts: [[360, 460]], extent: 460, view: 1.9},
  3: {name: 'Phase 3 · Town', people: '8,000+ residents', area: 'about 1.2 square miles',
    spireSections: 8,
    inner: [[105, 10], [225, 7], [345, 7], [45, 8], [165, 8], [285, 8], [15, 7], [195, 7]],
    domes: [[45, 40], [165, 40], [285, 40], [105, 44], [225, 44], [345, 44], [15, 44], [195, 44], [75, 44], [135, 44], [315, 44]],
    districts: {r: 640, d: 80, deg: [30, 90, 150, 210, 270, 330]},
    homes: 3, clusters: [255, 315], belts: [[360, 460], [760, 1000]], town: [460, 760], terraces: [510, 570, 710], extent: 1000, view: 3.9},
};

// Spire: stacked lattice sections on one foundation sized for the final height (after the Shukhov Tower).
// Ring radii at every 30 m; Phase 1 builds 3 sections (90 m), Phase 2 five (150 m), Phase 3 eight (240 m).
export const SPIRE = {section: 30, radii: [18, 12.5, 9.2, 7.2, 5.9, 5, 4.4, 3.9, 3.5], deck: 72};

export const PLAN = {
  rings: [
    {n: 1, name: 'Spire & plaza', r: 35, color: 0xd9cdb6},
    {n: 2, name: 'Temple & learning', r: 82, color: 0xc8c49a},
    {n: 3, name: 'Studios & domes', r: 135, color: 0xa9b98a},
    {n: 4, name: 'Homes & gardens', r: 182, color: 0x9fb07a},
    {n: 5, name: 'Energy & wild buffer', r: 222, color: 0x8d9d64},
  ],
  radialPaths: 12,
  domeRing: 109,
  homes: {radius: 160, size: 4.5},
  solar: {radius: 203, count: 16},
};

const P = PLAN;
const rad = (d) => (d * Math.PI) / 180;
const polar0 = (r, deg) => new THREE.Vector3(Math.cos(rad(deg)) * r, 0, -Math.sin(rad(deg)) * r);
// Organic flow: from the plaza outward the whole plan turns as a gentle spiral, like the arms of a galaxy
// (after Auroville). Each of the 12 paths keeps the same small angle (about 11°) to the radius, so none
// is straight and none aims at the spire or at a door (feng shui: qi meanders, straight lines carry sha).
// Everything placed with polar() follows the turn; rings stay true circles.
export const TWIST = {r0: 35, k: 11, cap: 1060};
const twist = (r) => (r <= TWIST.r0 ? 0 : TWIST.k * Math.log(Math.min(r, TWIST.cap) / TWIST.r0));
const polar = (r, deg) => polar0(r, deg + twist(r));

// One scene holds every phase. Each object belongs to a layer [from, to): it appears in the phase that
// builds it and stays until a later phase replaces it (only movable things: the solar crown, nursery
// trees on dome plots, wild woodland cleared for new rings, and the distant scenery).
export function buildCity(scene, env = null) {
  const FINAL = PHASES[3];
  const layers = new Map();
  let cur = null;
  const layer = (from, to = 4) => {
    const k = from + '-' + to;
    if (!layers.has(k)) { const g = new THREE.Group(); g.userData = {from, to}; g.name = 'phase-' + k; scene.add(g); layers.set(k, g); }
    cur = layers.get(k);
    return cur;
  };
  // Click info: every object added while a key is set is tagged with it (index.html shows the matching card)
  let curInfo = null;
  const I = (k) => { curInfo = k; };
  const inf = (k, fn) => (...a) => { const prev = curInfo; curInfo = typeof k === 'function' ? k(...a) : k; try { return fn(...a); } finally { curInfo = prev; } };
  const add = (...o) => { if (curInfo) o.forEach((x) => { if (!x.userData.info) x.userData.info = curInfo; }); cur.add(...o); };
  // Plan footprints of everything built, for the layout audit (index.html?audit, scripts/audit-model.cjs)
  const FOOT = [];
  const footC = (kind, x, z, r) => FOOT.push({kind, from: cur.userData.from, to: cur.userData.to, c: [x, z], r});
  const footM = (kind, m) => {
    m.updateMatrix(); if (!m.geometry.boundingBox) m.geometry.computeBoundingBox();
    const b = m.geometry.boundingBox, v = new THREE.Vector3(), pts = [];
    for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) { v.set(x, y, z).applyMatrix4(m.matrix); pts.push([v.x, v.z]); }
    pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const cr = (o, a, c) => (a[0] - o[0]) * (c[1] - o[1]) - (a[1] - o[1]) * (c[0] - o[0]), lo = [], hi = [];
    for (const q of pts) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of [...pts].reverse()) { while (hi.length > 1 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
    FOOT.push({kind, from: cur.userData.from, to: cur.userData.to, poly: [...lo.slice(0, -1), ...hi.slice(0, -1)]});
  };
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({color, roughness: 0.9, metalness: 0, ...o});
  // Night mode: materials register what changes after dark (emissive glow, dimmer reflections)
  const nightFx = [], nightOnly = [];
  const atNight = (m, props) => {
    const day = {};
    for (const k in props) day[k] = m[k] && m[k].isColor ? m[k].clone() : m[k];
    nightFx.push((on) => { for (const k in props) { const v = on ? props[k] : day[k]; if (m[k] && m[k].isColor) m[k].copy(v); else m[k] = v; } });
    return m;
  };
  const warm = (c, i) => ({emissive: new THREE.Color(c), emissiveIntensity: i});
  // Small repeated parts (lamps, windows) are collected per layer and built as instanced meshes
  const instSets = new Map();
  const place = (name, geo, m, pos, rotY = 0, scale = 1) => {
    if (!instSets.has(name)) instSets.set(name, {geo, m, by: new Map(), info: curInfo});
    else if (instSets.get(name).info !== curInfo) instSets.get(name).info = null;
    const by = instSets.get(name).by;
    if (!by.has(cur)) by.set(cur, []);
    by.get(cur).push(new THREE.Matrix4().compose(pos, new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY), new THREE.Vector3(scale, scale, scale)));
  };
  // Glows: additive sprites shown only at night, also collected per layer
  const GLOW = {lamp: [0xffd49a, 4.5], halo: [0xffb766, 12], window: [0xffc27a, 4], dome: [0xffc27a, 1], red: [0xff3b2e, 6], cool: [0xbfe3ff, 5]};
  const glows = new Map();
  const glow = (kind, x, y, z, size) => {
    const k = kind + '|' + (size || '');
    if (!glows.has(cur)) glows.set(cur, new Map());
    const g = glows.get(cur);
    if (!g.has(k)) g.set(k, []);
    g.get(k).push(x, y, z);
  };
  // Street lamps along a path
  const postG = new THREE.CylinderGeometry(0.07, 0.1, 4.2, 5); postG.translate(0, 2.1, 0);
  const headG = new THREE.SphereGeometry(0.32, 8, 6); headG.translate(0, 4.3, 0);
  const postM = mat(0x4a4a48, {roughness: 0.6, metalness: 0.5});
  const headM = atNight(mat(0xeee6d4), warm(0xffd9a0, 2.5));
  const lamp = (x, z) => { const pI = curInfo; curInfo = null; lampB(x, z); curInfo = pI; };
  const lampB = (x, z) => {
    if (wet(x, z, 0.8, cur.userData.to)) return;
    const v = new THREE.Vector3(x, 0, z);
    place('post', postG, postM, v); place('head', headG, headM, v);
    glow('lamp', x, 4.3, z); glow('halo', x, 0.8, z);
  };

  const lampAt = (x, z) => lamp(x, z);
  // Textured materials: ground and paths are mapped in world metres, objects by their own UVs
  const ground = (color, tex, tile, macro) => TX.worldMapped(mat(color), tex, tile, macro);
  const shiny = (m) => { if (env) { m.envMap = env; m.envMapIntensity = 0.9; atNight(m, {envMapIntensity: 0.12}); } return m; };
  const flat = (geo, m, y) => { const o = new THREE.Mesh(geo, m); o.rotation.x = -Math.PI / 2; o.position.y = y; o.receiveShadow = true; add(o); return o; };

  // Trees are instanced per layer so the town phase stays fast
  const treePts = [];
  let tFrom = 1, tTo = 4;
  const tree = (x, z, s = 1, kind = 0) => {
    if (wet(x, z, 1 + 2.2 * s, tTo) || blocked(x, z, 1 + 2 * s)) return;
    treePts.push([x, z, s, tFrom, tTo, kind]);
  };
  const trees = (from, to = 4) => { tFrom = from; tTo = to; };
  // Roads, mobility hubs and work hubs keep their ground clear of trees and buildings
  const OG = 40, ogrid = new Map();
  const block = (x, z, r) => { const k = Math.floor(x / OG) + ',' + Math.floor(z / OG); if (!ogrid.has(k)) ogrid.set(k, []); ogrid.get(k).push([x, z, r]); };
  const blocked = (x, z, pad = 0) => {
    const gx = Math.floor(x / OG), gz = Math.floor(z / OG);
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) {
      const c = ogrid.get(gx + i + ',' + (gz + j));
      if (c) for (const [bx, bz, br] of c) if (Math.hypot(x - bx, z - bz) < br + pad) return true;
    }
    return false;
  };

  // Water, read with feng shui and Auroville in mind: higher ground behind the city to the north, and
  // in front, to the south, a river that curves round the whole town like a belt (the city sits on the
  // inside of the bend), fed from a lake south of the core by a winding creek. From the lake a winding heart canal brings boats to a harbour at
  // the edge of the core, and a narrow stone rill carries the water on, between the domes, into the
  // plaza pool at the foot of the spire. Phase 2 adds a canal ring through the lake; Phase 3 an outer
  // ring and three S-curved canals. The real courses will follow the site's landform; this is schematic.
  // Each water is a centreline of [x, z, half-width] samples; `wet` tells whether a point is on water or its bank.
  const waters = [], WG = 40, wgrid = new Map();
  const addWater = (pts, from, kind, closed = false) => {
    const w = {pts, from, kind, closed, bank: kind === 'river' ? 4 : kind === 'creek' ? 3 : kind === 'rill' ? 0.9 : 2.5};
    waters.push(w);
    pts.forEach((pt, i) => { const k = Math.floor(pt[0] / WG) + ',' + Math.floor(pt[1] / WG); if (!wgrid.has(k)) wgrid.set(k, []); wgrid.get(k).push([w, i]); });
    return w;
  };
  const HEART = 256;
  const LAKE = (() => { const p = polar(400, HEART); return {x: p.x, z: p.z}; })();
  const lakeR = (a) => 74 + 14 * Math.sin(2 * a + 0.7) + 8 * Math.sin(3 * a + 2) + 5 * Math.sin(5 * a);
  // Harbour: a broad crescent lying along the ring, not a round knob on the canal's end.
  // The canal enters at its east horn, the rill leaves from its west horn.
  const HARB = (() => { const p = polar(238, HEART + (180 / Math.PI) * 4 / 238); return {x: p.x, z: p.z}; })();
  const HARB_T = Math.atan2(HARB.z, HARB.x) + Math.PI / 2;
  const harbR = (a) => { const t = a - HARB_T, A = 20, B = 7.5 + 1.5 * Math.cos(t); return (A * B / Math.hypot(B * Math.cos(t), A * Math.sin(t))) * (1 + 0.06 * Math.sin(3 * t + 1)); };
  // Constructed treatment wetland at the water mouth: the low south-east corner, between the outer ring
  // road and the river, just downstream of where the creek joins. Sewage flows here by gravity.
  const WETLAND = [[96, 1074, 15, 0.4], [134, 1082, 14, 1.9], [170, 1077, 13, 3.1]].map(([x, z, r0, ph]) => [{x, z}, (a) => r0 * (1 + 0.16 * Math.sin(2 * a + ph) + 0.08 * Math.sin(3 * a + ph * 2))]);
  const basins = [[LAKE, lakeR], [HARB, harbR], ...WETLAND];
  const inBasin = (x, z, pad = 0) => basins.some(([c, f]) => Math.hypot(x - c.x, z - c.z) < f(Math.atan2(z - c.z, x - c.x)) + pad);
  const inLake = (x, z, pad = 0) => Math.hypot(x - LAKE.x, z - LAKE.z) < lakeR(Math.atan2(z - LAKE.z, x - LAKE.x)) + pad;
  const wet = (x, z, pad = 0, to = 4) => {
    if (inBasin(x, z, pad + 3)) return true;
    const gx = Math.floor(x / WG), gz = Math.floor(z / WG);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const c = wgrid.get(gx + i + ',' + (gz + j));
      if (c) for (const [w, k] of c) { if (w.from >= to) continue; const q = w.pts[k]; if (Math.hypot(x - q[0], z - q[1]) < q[2] + w.bank + pad) return true; }
    }
    return false;
  };
  const riverZ = (x) => 1130 - 0.00035 * x * x + 30 * Math.sin(x / 130) + 14 * Math.sin(x / 53 + 1);
  // Heart rill: winds a few metres either side of 256°, through the gap between the domes at 240° and 270°
  const rillA = (r) => HEART + (180 / Math.PI) * (3.2 * Math.sin((r - 30) / 40) + 1.2 * Math.sin((r - 30) / 17) - 11 * Math.max(0, (r - 170) / 58) ** 2) / r;
  {
    const river = [];
    for (let x = -3400; x <= 3400; x += 2) river.push([x, riverZ(x), 13 + 3 * Math.sin(x / 400)]);
    addWater(river, 1, 'river');
    // The lake spills south into the river along a winding creek
    const out = [];
    for (let t = 0; t <= 1.0001; t += 0.005) { const x = LAKE.x - 70 * t + 28 * Math.sin(t * 9) * Math.min(1, t * 6), z0 = LAKE.z + 50, z1 = riverZ(LAKE.x - 70); out.push([x, z0 + (z1 - z0) * t, 6.5 + 1.5 * Math.sin(t * 13)]); }
    addWater(out, 1, 'creek');
    // Heart canal from the harbour to the lake, winding, for boats
    const hc = [];
    for (let r = 244; r <= 372; r += 3) { const p = polar(r, HEART + (180 / Math.PI) * (12 * Math.cos((r - 244) / 24) + 3 * Math.sin((r - 244) / 11)) / r); hc.push([p.x, p.z, 5 + 1.3 * Math.sin((r - 244) / 17)]); }
    addWater(hc, 1, 'canal');
    // Rill from the harbour to the plaza pool
    const rl = [];
    for (let r = 236; r >= 29; r -= 2) { const p = polar(r, rillA(r)); rl.push([p.x, p.z, 1.1 + 0.5 * Math.min(1, (r - 29) / 199)]); }
    addWater(rl, 1, 'rill');
    const ring = (r0, amp, f, hw, from) => {
      const pts = [], n = Math.round(2 * Math.PI * r0 / 3);
      for (let i = 0; i < n; i++) { const a = (i / n) * 2 * Math.PI, r = r0 + amp * Math.sin(f * a + 1) + amp * 0.4 * Math.sin((f * 2 + 1) * a); pts.push([Math.cos(a) * r, -Math.sin(a) * r, hw]); }
      addWater(pts, from, 'canal', true);
    };
    ring(377, 5, 4, 6, 2);
    ring(746, 4, 7, 6.5, 3);
    [0, 120, 240].forEach((d) => {
      const pts = [];
      for (let r = 372; r <= 750; r += 3) { const p = polar(r, d + 5 * Math.sin(2 * Math.PI * (r - 377) / 369)); pts.push([p.x, p.z, 7]); }
      addWater(pts, 3, 'canal');
    });
  }
  const paths = [];
  // A flat ribbon along a centreline of [x, z, half-width] samples, at offset ±(half-width + e)
  const ribbon = (P, e, y, m, closed = false) => {
    const n = P.length, pos = [], uv = [], nor = [];
    const side = (i) => {
      const a = P[(i - 1 + n) % n], b = P[(i + 1) % n], A = closed || i > 0 ? a : P[i], B = closed || i < n - 1 ? b : P[i];
      const dx = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dx, dz) || 1, h = P[i][2] + e;
      return [[P[i][0] - dz / L * h, P[i][1] + dx / L * h], [P[i][0] + dz / L * h, P[i][1] - dx / L * h]];
    };
    const S = P.map((_, i) => side(i));
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const [l0, r0] = S[i], [l1, r1] = S[(i + 1) % n];
      for (const v of [l0, l1, r0, r0, l1, r1]) { pos.push(v[0], y, v[1]); nor.push(0, 1, 0); uv.push(0, 0); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    const o = new THREE.Mesh(g, m); o.material.side = THREE.DoubleSide; o.receiveShadow = true; add(o);
    return o;
  };

  // Wild land beyond the city
  layer(1);
  flat(new THREE.CircleGeometry(FINAL.extent + 3600, 96), ground(0x86965e, TX.grass(3), 34, 0.6), 0);

  // Outer bands, outermost first: food and energy belts are darker, neighborhoods lighter.
  // Each band belongs to the phase whose belt adds it.
  const bands = [];
  FINAL.belts.forEach(([b0, b1]) => {
    const from = [2, 3].find((n) => (PHASES[n].belts || []).some(([x]) => x === b0));
    bands.push([b1, 0x94a46a, from, TX.fields()], [b0, 0xa0b37a, from, TX.grass(5)]);
  });
  bands.sort((x, y) => y[0] - x[0]).forEach(([r, c, from, tex], i) => { layer(from); flat(new THREE.CircleGeometry(r, 200), ground(c, tex, tex === TX.fields() ? 26 : 22, 0.4), 0.02 + i * 0.02); });

  // Core ring bands, outermost first
  layer(1);
  [...P.rings].reverse().forEach((ring, i) => flat(new THREE.CircleGeometry(ring.r, 128), ground(new THREE.Color(ring.color).multiplyScalar(1.1), i === 4 ? TX.paving() : TX.grass(7), i === 4 ? 6 : 16, 0.3), 0.12 + i * 0.025));

  // Ring paths (gravel)
  const path = ground(0xf0e6d0, TX.gravel(), 5, 0.15);
  // Plots that paths go round or stop at: every dome plot (with a forecourt, the feng shui ming tang),
  // district squares and workshop rows, work hubs and mobility hubs. Paths end at a plot's edge, and
  // the ring paths near the dome ring bend round each plot, so no path runs into a dome's door.
  const plotClear = (d) => d / 2 + 6.6;
  const OBST = [];
  // Dome plots sit between the radial paths (sector centres, 15° + 30°k), so no path runs into a dome:
  // the radials pass in the gaps and the ring paths bend round each plot. DOME_OFF balances the gaps
  // against the spiral twist. The plot at 255° is left to the heart rill and its water garden.
  const DOME_OFF = -0.7, domeAt = (deg) => polar(P.domeRing, deg + DOME_OFF);
  FINAL.domes.forEach(([deg, d]) => { const q = domeAt(deg); OBST.push({x: q.x, z: q.z, r: d / 2 + 2.6, hug: plotClear(d), dome: d, deg}); });
  FINAL.districts.deg.forEach((deg) => { const q = polar(FINAL.districts.r, deg), w = polar(FINAL.districts.r + 72, deg); OBST.push({x: q.x, z: q.z, r: FINAL.districts.d / 2 + 22, bed: true}, {x: w.x, z: w.z, r: 20, bed: true}); });
  const HUBS2 = [45, 165, 285], HUBR2 = 285;
  HUBS2.forEach((d) => { const q = polar(HUBR2, d); OBST.push({x: q.x, z: q.z, r: 38, cut: 34, bed: true}); });
  const ENTRY = 75;
  const cpR = (rows, len) => Math.hypot(rows * 11, len) / 2 + 8;
  const CARPORTS = [[1, 252, [ENTRY], 2, 30], [2, 506, [45, 165, 300], 2, 44], [3, 1012, [30, 90, 150, 210, 270, 330], 3, 48]];
  CARPORTS.forEach(([, r, ds, rows, len]) => ds.forEach((d) => { const q = polar(r, d); OBST.push({x: q.x, z: q.z, r: cpR(rows, len), cut: cpR(rows, len) - 6}); }));
  const BEDS = [];
  const inObst = (x, z, pad = 0) => OBST.some((o) => Math.hypot(x - o.x, z - o.z) < o.r + pad);
  const smin = (a, b, k = 2.5) => -k * Math.log(Math.exp(-a / k) + Math.exp(-b / k));
  const ringPathB = (r, w = 3.2) => {
    const hug = r > 60 && r < 160 ? OBST.filter((o) => o.dome) : [];
    const cuts = OBST.filter((o) => o.cut && Math.abs(Math.hypot(o.x, o.z) - r) < o.cut);
    if (cuts.length) {
      // The ring path runs into each hub's paved square and out again on the far side
      const n = Math.round((2 * Math.PI * r) / 1.5), cut = (q) => cuts.some((o) => Math.hypot(q[0] - o.x, q[1] - o.z) < o.cut);
      let i0 = 0; while (i0 < n && !cut([Math.cos(2 * Math.PI * i0 / n) * r, -Math.sin(2 * Math.PI * i0 / n) * r])) i0++;
      let run = [];
      const flush = () => { if (run.length >= 3) { for (const [e, f] of [[run[0], run[1]], [run[run.length - 1], run[run.length - 2]]]) { const dx = e[0] - f[0], dz = e[1] - f[1], L = Math.hypot(dx, dz); if (cuts.some((o) => o.bed && Math.hypot(e[0] - o.x, e[1] - o.z) < o.cut + 2)) BEDS.push([e[0] + dx / L * 5, e[1] + dz / L * 5, cur.userData.from]); } paths.push({pts: run, w, from: cur.userData.from}); ribbon(run, 0, 0.3, path); for (let k = 9; k < run.length - 4; k += 17) { const q = run[k], L = Math.hypot(q[0], q[1]), f = (L + w / 2 + 1.2) / L; lamp(q[0] * f, q[1] * f); } } run = []; };
      for (let j = 0; j <= n; j++) { const a = 2 * Math.PI * (i0 + j) / n, q = [Math.cos(a) * r, -Math.sin(a) * r, w / 2]; if (cut(q)) flush(); else run.push(q); }
      flush();
      return;
    }
    if (!hug.length) {
      paths.push({ring: true, r, w, from: cur.userData.from});
      flat(new THREE.RingGeometry(r - w / 2, r + w / 2, Math.max(160, Math.round(r))), path, 0.3);
      if (r < 30) return;
      const n = Math.max(8, Math.round((2 * Math.PI * r) / (r < 250 ? 26 : 42)));
      for (let i = 0; i < n; i++) { const q = polar(r + w / 2 + 1.2, (i + 0.5) * (360 / n)); lamp(q.x, q.z); }
      return;
    }
    const pts = [], n = Math.round((2 * Math.PI * r) / 1.5);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI;
      let rr = r;
      for (const o of hug) {
        const C = Math.hypot(o.x, o.z), phi = a - Math.atan2(-o.z, o.x), sn = C * Math.sin(phi), cs = C * Math.cos(phi);
        const R = o.hug || o.r;
        if (Math.abs(sn) >= R || cs <= 0) continue;
        const h = Math.sqrt(R * R - sn * sn);
        rr = r < C ? smin(rr, cs - h) : -smin(-rr, -(cs + h));
      }
      pts.push([Math.cos(a) * rr, -Math.sin(a) * rr, w / 2]);
    }
    paths.push({pts: [...pts, pts[0]], w, from: cur.userData.from, loop: true});
    ribbon(pts, 0, 0.3, path, true);
    const step = Math.round(26 / 1.5);
    for (let i = step >> 1; i < n; i += step) { const q = pts[i], L = Math.hypot(q[0], q[1]), k = (L + w / 2 + 1.2) / L; lamp(q[0] * k, q[1] * k); }
  };
  const ringPath = inf(null, ringPathB);
  P.rings.slice(0, 4).forEach((ring) => ringPath(ring.r));
  layer(2); ringPath(P.rings[4].r); ringPath(360, 4);
  layer(3); ringPath(460, 4); ringPath(760, 4);

  // Radial paths: 12 from the plaza, extended outward by each phase, plus 12 more in the town's outer rings.
  // They turn in a gentle spiral from the plaza (no straight arrows, feng shui) and wander a little further out.
  // Beyond the core the spiral is nearly straight over a block, so outer paths also wander a few metres
  const meander = (r) => r <= 240 ? 0 : (180 / Math.PI) * (4 * Math.sin((r - 240) / 45) + 2 * Math.sin((r - 240) / 19)) * Math.min(1, (r - 240) / 60) / r;
  // A round planted bed a few metres into a square, where a path arrives, so the path turns aside
  const bedAt = (x, z, rIn, at) => { const o = OBST.find((ob) => ob.bed && Math.hypot(x - ob.x, z - ob.z) < ob.r + 1); if (!o) return; const q = at(rIn); BEDS.push([q.x, q.z, cur.userData.from]); };
  const radialB = (deg, r0, r1, w) => {
    // Sample the path and split it where it meets a plot; each run ends exactly at the plot's edge
    const at = (r) => polar(Math.min(r, r1), deg + meander(Math.min(r, r1))), runs = [];
    let run = [], prev = null;
    const edge = (ra, rb) => { for (let k = 0; k < 14; k++) { const m = (ra + rb) / 2, q = at(m); (inObst(q.x, q.z) === inObst(at(ra).x, at(ra).z)) ? (ra = m) : (rb = m); } return (ra + rb) / 2; };
    for (let r = r0; r < r1 + 3; r += 6) {
      const q = at(r), inside = inObst(q.x, q.z);
      if (prev !== null && inside !== prev.inside) { const e = edge(prev.r, Math.min(r, r1)), b = at(e); if (inside) { run.push([b.x, b.z, w / 2, e]); runs.push(run); run = []; } else run.push([b.x, b.z, w / 2, e]); bedAt(b.x, b.z, inside ? e + 5 : e - 5, (rr) => at(rr)); }
      if (!inside) run.push([q.x, q.z, w / 2, Math.min(r, r1)]);
      prev = {r: Math.min(r, r1), inside};
    }
    if (run.length) runs.push(run);
    runs.filter((rn) => rn.length >= 3).forEach((rn) => {
      const pts = rn.map(([x, z, h]) => [x, z, h]);
      paths.push({pts, w, from: cur.userData.from});
      ribbon(pts, 0, 0.31, path);
      const ra = rn[0][3], rb = rn[rn.length - 1][3];
      for (let d = ra + 14; d < rb - 6; d += r0 > 300 ? 44 : 30) { const q = at(d).add(polar0(w / 2 + 1.2, deg + meander(d) + twist(d) + 90)); if (!inObst(q.x, q.z, 1)) lamp(q.x, q.z); }
    });
  };
  const radial = inf(null, radialB);
  [[1, P.rings[0].r, PHASES[1].extent + 20], [2, PHASES[1].extent + 18, PHASES[2].extent + 20], [3, PHASES[2].extent + 18, FINAL.extent + 20]]
    .forEach(([n, r0, r1]) => { layer(n); for (let i = 0; i < P.radialPaths; i++) radial(i * 30, r0, r1, 4); });
  layer(3);
  for (let i = 0; i < 12; i++) radial(15 + i * 30, FINAL.town[0], FINAL.extent + 20, 3.2);

  // Movement: walking, cycling and boats inside; cars stop at the edge (Houten, Vauban). A service road
  // comes in from the north, behind the city, to a mobility hub with shared electric cars under solar
  // canopies, e-bikes and a shuttle stop. Phase 2 adds a ring road outside the village that stays open to
  // the south, so the lake and river front have no traffic; Phase 3 moves private cars to an outer ring
  // road with six hubs, and the Phase 2 ring becomes the shuttle and service loop.
  const roadM = ground(0x8a857a, TX.gravel(), 4, 0.25);
  const road = (pts, w, from) => {
    layer(from);
    const P3 = pts.map(([x, z]) => [x, z, w / 2]);
    paths.push({pts: P3, w, from, road: true});
    ribbon(P3, 0, 0.315, roadM);
    let acc = 0;
    P3.forEach((q, i) => {
      if (i) acc += Math.hypot(q[0] - P3[i - 1][0], q[1] - P3[i - 1][1]);
      if (i % 2 === 0) block(q[0], q[1], w / 2 + 2);
      if (i > 0 && i < P3.length - 1 && Math.floor(acc / 46) !== Math.floor((acc - Math.hypot(q[0] - P3[i - 1][0], q[1] - P3[i - 1][1])) / 46) && Math.hypot(q[0], q[1]) < FINAL.extent + 80) {
        const dx = P3[i + 1][0] - P3[i - 1][0], dz = P3[i + 1][1] - P3[i - 1][1], L = Math.hypot(dx, dz);
        lamp(q[0] + dz / L * (w / 2 + 1.2), q[1] - dx / L * (w / 2 + 1.2));
      }
    });
  };
  const arc = (r, d0, d1) => { const pts = []; const n = Math.ceil(Math.abs(d1 - d0) * r * Math.PI / 180 / 5); for (let i = 0; i <= n; i++) { const q = polar(r, d0 + (d1 - d0) * i / n); pts.push([q.x, q.z]); } return pts; };
  // North service road: leaves the Phase 1 hub at 75° and bends into the valley between the northern hills
  const northRoad = (r0, r1) => { const pts = []; for (let r = r0; r <= r1; r += 5) { const s = Math.min(1, Math.max(0, (r - 1050) / 1500)); const q = polar0(r, ENTRY + twist(r) + (180 / Math.PI) * ((16 * Math.sin(r / 120) + 7 * Math.sin(r / 47)) * Math.min(1, (r - 266) / 90) + 9 * Math.sin(r / 37) * Math.min(1, Math.max(0, (r - 1250) / 200))) / r - 20 * s * s * (3 - 2 * s)); pts.push([q.x, q.z]); } return pts; };
  road(northRoad(266, 1500), 6, 1);
  road(northRoad(1500, 2300), 6, 2);
  road(northRoad(2300, 3600), 6, 3);
  // The Phase 2 ring runs round the back and sides from the south-east hub (300°) to the west hub (165°) and
  // ends in both hubs' paved squares, so no road stops in a field and the whole south front stays car-free
  road(arc(480, 300, 525), 6.5, 2);
  road(arc(1035, 0, 360), 7, 3);
  // Solar carports, car-share EVs, chargers and a shuttle stop
  const carG = new THREE.BoxGeometry(4.3, 0.9, 1.8); carG.translate(0, 0.75, 0);
  const cabG = new THREE.BoxGeometry(2.3, 0.6, 1.6); cabG.translate(-0.2, 1.5, 0);
  const carMs = [0xf2f0ea, 0x9aa3a8, 0x4f6f86, 0xc9c2b2, 0x6b7b5e].map((c) => shiny(mat(c, {roughness: 0.35, metalness: 0.3})));
  const cabM = atNight(shiny(mat(0x2a3238, {roughness: 0.1, metalness: 0.4})), warm(0x10181c, 0.1));
  const shuttleG = new THREE.BoxGeometry(5.5, 2.5, 2.3); shuttleG.translate(0, 1.55, 0);
  const shuttleM = atNight(shiny(mat(0xeef0ee, {roughness: 0.25})), warm(0xffd9a0, 0.35));
  const padM = ground(0xcfc6b3, TX.paving(), 5, 0.1);
  const batM = shiny(mat(0xe9ece8, {roughness: 0.35, metalness: 0.25})), concreteU = mat(0xbdb8ad, {roughness: 0.7, map: TX.repeated(TX.concrete(), 1, 1)});
  const carportB = (c, deg, rows, len) => {
    const R = Math.hypot(rows * 11, len) / 2 + 8;
    flat(new THREE.CircleGeometry(R, 40), padM, 0.32).position.set(c.x, 0.32, c.z);
    block(c.x, c.z, R + 3);
    const t = rad(deg + 90), u = [Math.cos(t), -Math.sin(t)], v = [Math.cos(rad(deg)), -Math.sin(rad(deg))];
    for (let k = 0; k < rows; k++) {
      const off = (k - (rows - 1) / 2) * 11, cx = c.x + v[0] * off, cz = c.z + v[1] * off;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(len, 0.25, 5), pv);
      roof.position.set(cx, 3.1, cz); roof.rotation.y = t; roof.rotateX(-0.12); roof.castShadow = true; add(roof); footM('carport', roof);
      for (let x = -len / 2 + 2; x <= len / 2 - 2; x += 6) place('carportPost', cpG, postM, new THREE.Vector3(cx + u[0] * x, 0, cz + u[1] * x));
      for (let x = -len / 2 + 1.6, i = 0; x <= len / 2 - 1.6; x += 2.7, i++) {
        if ((i * 7 + k * 3) % 5 === 4) continue;
        for (const sd of [-1, 1]) {
          if ((i * 3 + k + (sd > 0 ? 2 : 0)) % 4 === 3) continue;
          const pos = new THREE.Vector3(cx + u[0] * x + v[0] * sd * 2.6, 0.32, cz + u[1] * x + v[1] * sd * 2.6), ci = (i + k * 2 + (sd > 0 ? 3 : 0)) % carMs.length;
          place('car' + ci, carG, carMs[ci], pos, rad(deg) + (sd > 0 ? Math.PI : 0));
          place('carCab', cabG, cabM, pos, rad(deg) + (sd > 0 ? Math.PI : 0));
        }
      }
      for (let x = -len / 2 + 2; x <= len / 2 - 2; x += 12) glow('lamp', cx + u[0] * x, 2.9, cz + u[1] * x);
    }
    // Microgrid node: battery storage container and a compact substation at the pad's end
    { const bx = c.x + u[0] * (len / 2 + 4.5), bz = c.z + u[1] * (len / 2 + 4.5);
      const bat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 6.1), batM); bat.position.set(bx, 1.62, bz); bat.rotation.y = rad(deg); bat.castShadow = true; bat.userData.info = 'hubBattery'; add(bat); footM('utility', bat);
      const sub = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2, 2.2), concreteU); sub.position.set(bx + v[0] * 5, 1.32, bz + v[1] * 5); sub.rotation.y = rad(deg); sub.userData.info = 'hubBattery'; add(sub); footM('utility', sub);
      glow('window', bx, 2.2, bz); }
    // Shuttle stop on the city side of the hub
    const s = new THREE.Vector3(c.x - v[0] * (R - 3), 0.32, c.z - v[1] * (R - 3));
    place('shuttle', shuttleG, shuttleM, s, t); glow('window', s.x, 2, s.z);
  };
  const cpG = new THREE.CylinderGeometry(0.12, 0.12, 3, 6); cpG.translate(0, 1.5, 0);
  const pv = shiny(mat(0xffffff, {roughness: 0.25, metalness: 0.45, map: TX.solar()}));
  const carport = inf('hub', carportB);
  CARPORTS.forEach(([n, r, ds, rows, len]) => { layer(n); ds.forEach((d) => carport(polar(r, d), d + twist(r), rows, len)); });
  // Footpaths from the hubs into the city, so nobody steps out of a shared car or shuttle into a field.
  // Each one leaves the hub's city side and curves gently to the nearest ring path. (The Phase 1 hub has the
  // entry path below; the Phase 2 hub at 300°
  // and the Phase 3 hubs sit on radial paths already.)
  const spurB = (from, r0, r1, d0, d1, w = 3.2) => {
    layer(from);
    const pts = [];
    for (let r = r0; r >= r1 - 0.01; r -= 2) { const t = (r0 - r) / (r0 - r1), e = t * t * (3 - 2 * t), q = polar(r, d0 + (d1 - d0) * e + (180 / Math.PI) * 4 * Math.sin(Math.PI * t) / r); pts.push([q.x, q.z, w / 2]); }
    paths.push({pts, w, from}); ribbon(pts, 0, 0.31, path);
    pts.forEach(([x, z], i) => { if (i % 2 === 0) block(x, z, w / 2 + 0.5); });
    for (let i = 7; i < pts.length - 4; i += 15) { const a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]); lamp(a[0] - (b[1] - a[1]) / L * (w / 2 + 1.2), a[1] + (b[0] - a[0]) / L * (w / 2 + 1.2)); }
  };
  const spur = inf(null, spurB);
  spur(2, 477, 360, 45, 45); spur(2, 477, 360, 165, 165);
  layer(1); radial(ENTRY, P.rings[3].r + 1.6, 240, 3);
  { const q = polar(P.rings[3].r - 4.5, ENTRY); BEDS.push([q.x, q.z, 1]); }

  // Plaza: stone with a ring-shaped reflecting pool
  I('plaza');
  layer(1);
  flat(new THREE.CircleGeometry(P.rings[0].r - 1.6, 96), ground(0xddd2ba, TX.paving(), 5, 0), 0.26);
  const pool = flat(new THREE.RingGeometry(22, 29.5, 96), shiny(ground(0x7f9aa6, TX.water(), 9, 0)), 0.29);
  Object.assign(pool.material, {roughness: 0.08, metalness: 0.25});
  atNight(pool.material, warm(0x2f7f9a, 0.45));
  for (let i = 0; i < 24; i++) { const q = polar(30.5, i * 15); glow('cool', q.x, 0.6, q.z); }
  pool.receiveShadow = false;
  const poolM = pool.material;

  I('spire');
  // Spire: stacked hyperboloid lattice sections of straight timber and steel members.
  // The foundation, base and 72 m deck are built in Phase 1; each phase adds sections and lifts the solar crown.
  // At night the spire is uplit warm and its steel rings carry cool LED bands
  const timber = atNight(mat(0xb98a55, {roughness: 0.7}), warm(0x9a5a22, 0.55));
  const steel = atNight(mat(0x8d8a84, {roughness: 0.5, metalness: 0.4}), warm(0x9fd6ff, 1.4));
  const SP = SPIRE, legs = 24;
  const secPhase = (sct) => [1, 2, 3].find((n) => sct < PHASES[n].spireSections);
  const rAt = (h) => { const k = Math.min(h / SP.section, SP.radii.length - 1.001), i = Math.floor(k); return SP.radii[i] + (SP.radii[i + 1] - SP.radii[i]) * (k - i); };
  for (let sct = 0; sct < FINAL.spireSections; sct++) {
    layer(secPhase(sct));
    const h0 = sct * SP.section, h1 = h0 + SP.section, r0 = SP.radii[sct], r1 = SP.radii[sct + 1];
    for (let i = 0; i < legs; i++) for (const dir of [1, -1]) {
      const a = (i / legs) * Math.PI * 2, tw = dir * Math.PI / 5;
      const b0 = new THREE.Vector3(Math.cos(a) * r0, h0, Math.sin(a) * r0);
      const t1 = new THREE.Vector3(Math.cos(a + tw) * r1, h1, Math.sin(a + tw) * r1);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, b0.distanceTo(t1), 5), timber);
      leg.position.copy(b0.clone().add(t1).multiplyScalar(0.5));
      leg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), t1.clone().sub(b0).normalize());
      leg.castShadow = true;
      add(leg);
    }
    for (const h of sct === 0 ? [h0, h1] : [h1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rAt(h), 0.35, 6, 48), steel);
      ring.rotation.x = Math.PI / 2; ring.position.y = h; add(ring);
    }
  }
  layer(1);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(SP.radii[0] + 1, SP.radii[0] + 1.5, 0.8, 48), mat(0xbdb29c));
  foot.position.y = 0.4; add(foot);
  const dr = rAt(SP.deck);
  const deck = new THREE.Mesh(new THREE.CylinderGeometry(dr + 2.5, dr + 2, 3, 40), mat(0xd8cfbf));
  deck.position.y = SP.deck; deck.castShadow = true; add(deck);
  atNight(deck.material, warm(0xffcf8a, 0.6));
  for (let i = 0; i < 16; i++) { const q = polar(dr + 2.6, i * 22.5); glow('window', q.x, SP.deck, q.z); }
  // The solar crown is the one structure that moves: it is lifted to the top of each new section
  const crownM = shiny(mat(0xffffff, {roughness: 0.3, metalness: 0.45, map: TX.repeated(TX.solar(), 6, 1)}));
  [1, 2, 3].forEach((n) => {
    layer(n, n + 1);
    const top = PHASES[n].spireSections * SP.section, cr = rAt(top);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(cr + 5, cr + 0.5, 1.2, 40), crownM);
    crown.position.y = top; crown.castShadow = true; add(crown);
    for (let i = 0; i < 4; i++) { const q = polar(cr + 4, i * 90 + 45); glow('red', q.x, top + 1.2, q.z); }
  });

  I(null);
  // Phase in which an item first appears in a phase list
  const firstIn = (key, match) => [1, 2, 3].find((n) => (PHASES[n][key] || []).some(match));

  // Temple and learning pavilions (ring 2), between the radial paths. The first is the temple.
  const pavCache = new Map();
  const pavM = (color) => { if (!pavCache.has(color)) pavCache.set(color, atNight(mat(color, {roughness: 0.65, map: TX.repeated(TX.timber(14), 8, 2)}), warm(0x8a4d1c, 0.45))); return pavCache.get(color); };
  const stoneM = mat(0xc9bea8, {map: TX.repeated(TX.paving(), 6, 0.25)});
  const pavilion = (p, size, color = 0xd4a670) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), pavM(color));
    d.position.copy(p); d.castShadow = true; add(d); footC('pavilion', p.x, p.z, size + 2);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(size + 2, size + 2, 0.6, 32), stoneM);
    base.position.copy(p).setY(0.3); add(base);
    for (let i = 0; i < 8; i++) { const q = p.clone().add(polar(size + 1.6, i * 45)); glow('lamp', q.x, 0.9, q.z); }
    glow('halo', p.x, 0.8, p.z, size * 3.2);
  };
  FINAL.inner.forEach(([deg, size], i) => { I(i ? 'learning' : 'temple'); layer(firstIn('inner', ([d]) => d === deg)); pavilion(polar(58, deg), size); });
  I(null);

  const winG = new THREE.BoxGeometry(1.5, 0.9, 1);
  const winM = atNight(mat(0x39444c, {roughness: 0.15, metalness: 0.3}), warm(0xffb55c, 2.2));
  const doorG = new THREE.BoxGeometry(2.6, 2.4, 0.6);
  // Communosphere domes, as in docs/concepts/communospheres.md: a timber gridshell with solar glazing,
  // homes on terraced levels round the edge, a shared kitchen and commons at ground level, and a small
  // garden atrium under an open oculus at the crown (warm air rises and leaves there).
  // The shell mixes clear glazing low down (daylight for the homes), solar glass (BIPV) on the sunny
  // south and green-roof panels on the north; the top is open.
  const half = (r, detail) => {
    const g = new THREE.IcosahedronGeometry(r, detail);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < 0) pos.setY(i, 0);
    g.computeVertexNormals();
    return g;
  };
  const glassM = atNight(shiny(mat(0xb4ccd4, {roughness: 0.06, metalness: 0.3, transparent: true, opacity: 0.38, depthWrite: false, map: TX.repeated(TX.glass(), 3, 2)})), warm(0xffb768, 0.35));
  const bipvM = atNight(shiny(mat(0x6d86a0, {roughness: 0.45, metalness: 0.2, transparent: true, opacity: 0.72, depthWrite: false})), warm(0xffb768, 0.18));
  if (bipvM.envMap) bipvM.envMapIntensity = 0.35;
  const ribM = new THREE.LineBasicMaterial({color: 0x8a6236});
  const capM = mat(0x7a9550, {map: TX.repeated(TX.grass(13), 4, 1)});
  const greenPanelM = mat(0x7f9a55, {roughness: 0.95, map: TX.repeated(TX.grass(13), 3, 3)});
  const clayM = atNight(mat(0xe9dcc6, {roughness: 0.9, map: TX.repeated(TX.earth(), 6, 1)}), warm(0x6a3a14, 0.15));
  const deckTM = mat(0xc2925e, {roughness: 0.75, map: TX.repeated(TX.timber(30), 6, 1)});
  const atriumM = ground(0x93ad62, TX.grass(17), 7, 0.2);
  const shellCache = new Map();
  const shellParts = (diameter) => {
    if (shellCache.has(diameter)) return shellCache.get(diameter);
    const r = diameter / 2, src = half(r, diameter > 60 ? 4 : 3).toNonIndexed(), P = src.attributes.position, N = src.attributes.normal, U = src.attributes.uv;
    const parts = [[], [], []].map(() => ({p: [], n: [], u: []}));
    for (let f = 0; f < P.count; f += 3) {
      let cx = 0, cy = 0, cz = 0;
      for (let k = 0; k < 3; k++) { cx += P.getX(f + k) / 3; cy += P.getY(f + k) / 3; cz += P.getZ(f + k) / 3; }
      const h = cy / r, south = cz / r;
      if (h > 0.9 || cy < 0.05) continue;
      // Clear glazing in the lower band, with a solid panel every few cells; solar glass on the south crown
      const hash = Math.abs(Math.sin(cx * 12.9898 + cz * 78.233) * 43758.5453) % 1;
      const kind = h < 0.5 ? (hash < 0.78 ? 0 : 2) : (south > -0.15 ? 1 : 2);
      const t = parts[kind];
      for (let k = 0; k < 3; k++) { t.p.push(P.getX(f + k), P.getY(f + k), P.getZ(f + k)); t.n.push(N.getX(f + k), N.getY(f + k), N.getZ(f + k)); t.u.push(U.getX(f + k), U.getY(f + k)); }
    }
    const geos = parts.map((t) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(t.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(t.n, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(t.u, 2)); return g; });
    const ribs = new THREE.WireframeGeometry(half(r + 0.15, diameter > 60 ? 4 : 3));
    const out = {geos, ribs};
    shellCache.set(diameter, out);
    return out;
  };
  const domeB = (p, diameter, squash = 1) => {
    const r = diameter / 2, H = r * squash, S = shellParts(diameter);
    footC('dome', p.x, p.z, r);
    [glassM, bipvM, greenPanelM].forEach((m, i) => {
      const g = new THREE.Mesh(S.geos[i], m); g.scale.y = squash; g.position.copy(p); g.castShadow = i > 0; g.receiveShadow = i > 0; add(g);
    });
    const ribs = new THREE.LineSegments(S.ribs, ribM); ribs.scale.y = squash; ribs.position.copy(p); add(ribs);
    // Oculus: a timber ring at the crown
    const oy = 0.9 * H, orr = r * Math.sqrt(1 - 0.81);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(orr, 0.45, 6, 40), deckTM);
    ring.rotation.x = Math.PI / 2; ring.position.set(p.x, oy, p.z); add(ring);
    // Terraced homes: levels of 3.3 m stepping back towards the shell; level 0 is the kitchen and commons
    const levels = diameter < 42 ? 3 : diameter < 60 ? 4 : 5, lh = 3.3, f0 = r * 0.4;
    const wallR = (y) => r * Math.sqrt(Math.max(0, 1 - (y / H) * (y / H)));
    for (let k = 0; k < levels; k++) {
      const y0 = k * lh, fr = f0 + k * (r * 0.09), back = wallR(y0 + lh) - 0.6;
      if (back - fr < 2.5) break;
      const front = new THREE.Mesh(new THREE.CylinderGeometry(fr, fr, lh - 0.35, 48, 1, true), clayM);
      front.position.set(p.x, y0 + (lh - 0.35) / 2, p.z); front.receiveShadow = true; add(front);
      const floor = new THREE.Mesh(new THREE.RingGeometry(fr, back, 48), k === levels - 1 ? capM : deckTM);
      floor.rotation.x = -Math.PI / 2; floor.position.set(p.x, y0 + lh - 0.3, p.z); floor.receiveShadow = true; add(floor);
      // Windows of the homes face the atrium; the ground floor is the open commons and kitchen
      const nW = Math.floor((2 * Math.PI * fr) / 3.6);
      for (let i = 0; i < nW; i++) {
        const a = (i / nW) * 360, q = p.clone().add(polar0(fr + 0.05, a)); q.y = y0 + 1.25;
        place(k ? 'domeWin' : 'domeDoor', k ? winG : doorG, winM, q, rad(a) + Math.PI / 2);
        if (i % 2 === 0) glow('window', q.x, q.y, q.z);
      }
      // Planters along each terrace edge
      if (k > 0) for (let i = 0; i < nW; i += 3) { const q = p.clone().add(polar0(fr + 0.9, (i / nW) * 360 + 4)); treePts.push([q.x, q.z, 0.28, cur.userData.from, cur.userData.to, 2, y0 + lh - 0.3]); }
    }
    // Garden atrium: a lawn, a small pool under the oculus that catches rain, a few trees and shrubs
    flat(new THREE.CircleGeometry(f0, 40), atriumM, 0.34).position.set(p.x, 0.34, p.z);
    const pond = flat(new THREE.CircleGeometry(f0 * 0.28, 32), poolM, 0.36); pond.position.set(p.x, 0.36, p.z);
    const keep = [tFrom, tTo]; trees(cur.userData.from, cur.userData.to);
    for (let k = 0; k < 3; k++) { const q = p.clone().add(polar0(f0 * 0.55, k * 120 + 30)); treePts.push([q.x, q.z, 0.7 + k * 0.08, tFrom, tTo, 0]); }
    for (let k = 0; k < 7; k++) { const q = p.clone().add(polar0(f0 * (0.38 + (k % 2) * 0.35), k * 51 + 70)); treePts.push([q.x, q.z, 0.35, tFrom, tTo, 2]); }
    [tFrom, tTo] = keep;
    glow('dome', p.x, H * 0.35, p.z, diameter * 1.3);
  };
  const dome = inf((p, d) => (d < 42 ? 'dome40' : d < 60 ? 'dome52' : 'dome80'), domeB);
  // Each dome plot is meadow and tree nursery until its dome is built; the young trees are then moved out
  const meadow = ground(0xc2ca86, TX.meadow(), 10, 0);
  // Each dome plot sits between two radial paths. Its main doors face the plaza and the outer rings and open
  // onto paved forecourts on the ring paths (the feng shui ming tang: open, level and bright in front of the
  // door); smaller side doors open onto the radial paths as they pass. No path ends at a door.
  const doorM = atNight(mat(0x2f363c, {roughness: 0.15, metalness: 0.35}), warm(0xffb55c, 1.8));
  const foreM = ground(0xddd2bc, TX.paving(), 4, 0.1);
  const vaultG = new THREE.CylinderGeometry(2.5, 2.5, 5.2, 18, 1, true, 0, Math.PI); vaultG.rotateZ(Math.PI / 2);
  const vaultEndG = new THREE.CircleGeometry(2.2, 18, 0, Math.PI); vaultEndG.rotateY(Math.PI / 2);
  const sideDoorG = new THREE.CircleGeometry(1.5, 14, 0, Math.PI); sideDoorG.rotateY(Math.PI / 2);
  const FORE = [];
  const cisternG = new THREE.CylinderGeometry(2.3, 2.5, 0.35, 24); cisternG.translate(0, 0.17, 0);
  const entrancesB = (deg, d, from) => {
    const C = domeAt(deg), r = d / 2, out = C.clone().setY(0).normalize(), tan = new THREE.Vector3(-out.z, 0, out.x), W = [];
    // Main doors: inward (towards the plaza) and outward, each with a timber vault and a forecourt
    for (const u of [out.clone().negate(), out]) {
      const w = C.clone().addScaledVector(u, r - 1), head = Math.atan2(-u.z, u.x);
      W.push(w);
      const v = new THREE.Mesh(vaultG, deckTM); v.position.copy(w).addScaledVector(u, 1.2); v.rotation.y = head; v.castShadow = true; add(v);
      const door = new THREE.Mesh(vaultEndG, doorM); door.position.copy(w).addScaledVector(u, 3.7).setY(0.05); door.rotation.y = head; add(door);
      const g = w.clone().addScaledVector(u, 4.4); glow('window', g.x, 1.4, g.z);
      const f = C.clone().addScaledVector(u, r + 4.2);
      flat(new THREE.CircleGeometry(3.6, 28), foreM, 0.325).position.set(f.x, 0.325, f.z);
      FORE.push([f.x, f.z, 3.6, from]);
      const a0 = head * 180 / Math.PI;
      for (const t of [-1, 1]) { const q = C.clone().add(polar0(r + 1.4, a0 + t * (520 / r))); treePts.push([q.x, q.z, 0.4, from, 4, 2]); }
    }
    // Side doors onto the radial paths in the gaps between the domes
    for (const u of [tan, tan.clone().negate()]) {
      const w = C.clone().addScaledVector(u, r + 0.05), head = Math.atan2(-u.z, u.x);
      const door = new THREE.Mesh(sideDoorG, doorM); door.position.copy(w).setY(0.05); door.rotation.y = head; add(door);
      glow('window', w.x + u.x * 0.6, 1, w.z + u.z * 0.6);
      const f = C.clone().addScaledVector(u, r + 1.7);
      flat(new THREE.CircleGeometry(2.1, 20), foreM, 0.325).position.set(f.x, 0.325, f.z);
      FORE.push([f.x, f.z, 2.1, from]);
    }
    // Rain cisterns: the dome's shell drains to two buried tanks on its outer diagonals (lids shown)
    for (const t of [-1, 1]) { const q = C.clone().addScaledVector(out, (r + 3.3) * 0.72).addScaledVector(tan, t * (r + 3.3) * 0.7);
      const lid = new THREE.Mesh(cisternG, concreteU); lid.position.copy(q).setY(0.3); lid.userData.info = 'cistern'; add(lid); }
    // Ground-floor street through the commons, from the inner door to the outer door, round the rain pool
    const [A, B] = W, ax = B.clone().sub(A), n = new THREE.Vector3(-ax.z, 0, ax.x).normalize(), off = r * 0.4 * 0.28 + 1.9, pts = [];
    for (let k = 0; k <= 24; k++) { const t = k / 24, q = A.clone().addScaledVector(ax, t).addScaledVector(n, off * Math.sin(Math.PI * t)); pts.push([q.x, q.z, 1.4]); }
    ribbon(pts, 0, 0.37, foreM);
  };
  const entrances = inf((deg, d) => (d < 42 ? 'dome40' : d < 60 ? 'dome52' : 'dome80'), entrancesB);
  FINAL.domes.forEach(([deg, d]) => {
    const p = domeAt(deg);
    const built = firstIn('domes', ([a]) => a === deg) || 4;
    if (built > 1) {
      I('nursery'); layer(1, built); trees(1, built);
      flat(new THREE.CircleGeometry(20, 40), meadow, 0.27).position.set(p.x, 0.27, p.z);
      for (let x = -9; x <= 9; x += 4.5) for (let z = -9; z <= 9; z += 4.5) if (x * x + z * z < 110) tree(p.x + x, p.z + z, 0.4);
    }
    I(null);
    if (built < 4) { layer(built); dome(p, d, d > 42 ? 0.8 : 1); entrances(deg, d, built); }
  });

  I('earthHome');
  // Earth homes with green roofs (ring 4), between the radial paths
  const earthM = mat(0xd39a70, {roughness: 0.95, map: TX.repeated(TX.earth(), 5, 1.4)});
  const earthHome = (p, deg, size, sx = 1.3) => {
    const h = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), earthM);
    h.scale.set(sx, 0.75, 1); h.rotation.y = rad(deg); h.position.copy(p); h.castShadow = true; add(h); footM('home', h);
    const roof = new THREE.Mesh(new THREE.SphereGeometry(size + 0.15, 20, 6, 0, Math.PI * 2, 0, 0.7), capM);
    roof.scale.copy(h.scale); roof.rotation.copy(h.rotation); roof.position.copy(p); add(roof);
    // A window on each long side, lit at night
    for (const side of [1, -1]) {
      const w = new THREE.Vector3(0, 0.75, side * size * 0.88).applyAxisAngle(new THREE.Vector3(0, 1, 0), rad(deg)).add(p);
      place('window', winG, winM, w, rad(deg));
      const g = new THREE.Vector3(0, 0.9, side * (size * 0.88 + 1.2)).applyAxisAngle(new THREE.Vector3(0, 1, 0), rad(deg)).add(p);
      glow('window', g.x, g.y, g.z);
    }
  };
  // Other low-carbon home types, on the same footprints (about 2·size·sx by 2·size), so plots never move.
  const AY = new THREE.Vector3(0, 1, 0);
  const local = (p, deg, x, z) => new THREE.Vector3(x, 0, z).applyAxisAngle(AY, rad(deg)).add(p);
  const homeWindows = (p, deg, size, along = 0) => {
    for (const side of [1, -1]) {
      const w = local(p, deg, along, side * size * 0.88).setY(p.y + 0.75); place('window', winG, winM, w, rad(deg));
      const g = local(p, deg, along, side * (size * 0.88 + 1.2)).setY(p.y + 0.9); glow('window', g.x, g.y, g.z);
    }
  };
  // One plan footprint per home for the audit, however many parts it has
  const homeFoot = (p, deg, hx, hz) => { const b = new THREE.Mesh(new THREE.BoxGeometry(hx * 2, 1, hz * 2)); b.position.copy(p); b.rotation.y = rad(deg); footM('home', b); };
  // Superadobe / earthbag: a main dome and a smaller one joined, coiled earth tubes under lime plaster
  const bagM = mat(0xe0b88c, {roughness: 0.95, map: TX.repeated(TX.earth(), 3, 6)});
  const earthbagHome = inf('earthbagHome', (p, deg, size, sx = 1.3) => {
    const L = size * sx;
    for (const [x, r] of [[-L * 0.38, size * 0.95], [L * 0.55, size * 0.62]]) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), bagM);
      d.scale.y = 1.05; d.position.copy(local(p, deg, x, 0)); d.castShadow = true; add(d);
    }
    homeFoot(p, deg, L, size);
    homeWindows(p, deg, size, -L * 0.38);
  });
  // 3D-printed earth (TECLA-style): two ribbed, printed-clay domes with skylights, joined by a low link
  const printM = mat(0xc98f5f, {roughness: 1, map: TX.repeated(TX.earth(), 2, 9)});
  const printG = (() => {
    const pts = [];
    for (let i = 0; i <= 40; i++) { const t = i / 40, y = t * 0.92, r = Math.sqrt(Math.max(0, 1 - y * y)) * (1 + 0.025 * Math.cos(t * 80)); pts.push(new THREE.Vector2(Math.max(r, 0.2), y)); }
    return new THREE.LatheGeometry(pts, 28);
  })();
  const skyM = atNight(mat(0xbcd8e8, {roughness: 0.2, metalness: 0.1}), warm(0xffc070, 0.8));
  const printedHome = inf('printedHome', (p, deg, size, sx = 1.3) => {
    const L = size * sx, r = size * 0.72;
    for (const x of [-L * 0.45, L * 0.45]) {
      const d = new THREE.Mesh(printG, printM); d.scale.set(r, r * 1.05, r); d.position.copy(local(p, deg, x, 0)); d.castShadow = true; add(d);
      const sk = new THREE.Mesh(new THREE.CircleGeometry(r * 0.21, 16), skyM); sk.rotation.x = -Math.PI / 2; sk.position.copy(d.position).setY(p.y + r * 0.96); add(sk);
    }
    homeFoot(p, deg, L * 0.45 + r, r);
    homeWindows(p, deg, size * 0.82, 0);
  });
  // Timber frame with hempcrete infill: lime-rendered walls on a stone plinth, a curved green roof
  const limeM = mat(0xefe6d4, {roughness: 0.9, map: TX.repeated(TX.earth(), 2, 1)});
  const hempHome = inf('hempHome', (p, deg, size, sx = 1.3) => {
    const L = size * sx * 1.7, W = size * 1.55, H = 2.7;
    const pl = new THREE.Mesh(new THREE.BoxGeometry(L + 0.4, 0.5, W + 0.4), stoneM); pl.position.copy(p).setY(p.y + 0.25); pl.rotation.y = rad(deg); add(pl); homeFoot(p, deg, (L + 0.4) / 2, (W + 0.4) / 2);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, H, 28), limeM); body.scale.set(L / 2, 1, W / 2); body.position.copy(p).setY(p.y + 0.5 + H / 2); body.rotation.y = rad(deg); body.castShadow = true; add(body);
    const roof = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 8, 0, Math.PI * 2, 0, Math.PI / 2), capM); roof.scale.set(L / 2 + 0.5, 1.5, W / 2 + 0.5); roof.position.copy(p).setY(p.y + 0.5 + H); roof.rotation.y = rad(deg); roof.castShadow = true; add(roof);
    for (const [a, b] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) { const q = local(p, deg, a * L * 0.36, b * W * 0.36); place('hempPost', hempPostG, pavM(0x9a6a3e), q.setY(p.y + 0.5 + H / 2)); }
    homeWindows(p, deg, W / 2 / 0.88 + 0.02, 0);
  });
  const hempPostG = new THREE.CylinderGeometry(0.16, 0.16, 2.7, 6);
  const HOME = [earthHome, earthbagHome, hempHome, printedHome];
  // Fixed home plots: five per 30° sector. Phase 1 builds 30 of them, later phases fill the gaps; none move.
  for (let sec = 0; sec < 12; sec++) {
    // In sector 8 the heart rill takes the middle plot, so its Phase 1 home moves to the first plot
    const mid = sec === 8 ? 0 : sec % 2 ? 3 : 1, first = sec === 8 ? 1 : 2;
    [[sec * 30 + 10, 1], [sec * 30 + 20, 1], [sec * 30 + 15, mid], [sec * 30 + 5, first], [sec * 30 + 25, 2]].forEach(([deg, n], j) => {
      if (!n) return;
      layer(n); trees(n);
      // A mix of building methods round the ring; Phase 1 sticks to earth, earthbag and hempcrete
      const t = (sec * 2 + j) % 4, kind = n === 1 && t === 3 ? 1 : t;
      HOME[kind](polar(P.homes.radius, deg), deg + twist(P.homes.radius), P.homes.size);
      const q = polar(P.homes.radius + 12, deg + 2.5); tree(q.x, q.z, 0.7);
    });
  }

  I('solar');
  // Solar arrays with meadow beneath (ring 5)
  layer(1);
  const array = (p, deg, w = 22, d = 9) => {
    const a = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, d), pv);
    a.position.copy(p).setY(2.2); a.rotation.y = rad(deg) + Math.PI / 2; a.rotateX(-0.45); a.castShadow = true; add(a); footM('solar', a);
  };
  // Two arrays per 30° sector, set 9.5° either side of the sector's middle so they sit clear of the spiral paths
  for (let i = 0; i < 24; i++) { const deg = Math.floor(i / 2) * 30 + (i % 2 ? 20.5 : 9.5), q = polar(P.solar.radius, deg); if (!wet(q.x, q.z, 11) && !inObst(q.x, q.z, 12)) array(q, deg + twist(P.solar.radius)); }

  I(null);
  // Work is spread through the city, not gathered at the centre ("Scattered Work", the 15-minute city):
  // each neighbourhood has a work hub with a market hall, timber workshops with solar roofs and a
  // small square, so most people walk a few minutes to work and the morning flow runs both ways.
  const shopG = new THREE.CylinderGeometry(5, 5, 22, 20, 1, false, 0, Math.PI); shopG.rotateZ(Math.PI / 2); shopG.rotateY(Math.PI / 2);
  const shopEndG = new THREE.CircleGeometry(5, 20, 0, Math.PI);
  const marketB = (c, deg, s = 1) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 36, 14, 0, Math.PI * 2, 0, Math.PI / 2), pavM(0xcf9e66));
    m.scale.set(17 * s, 7.5 * s, 10 * s); m.rotation.y = rad(deg + twist(Math.hypot(c.x, c.z)) + 90); m.position.copy(c); m.castShadow = true; add(m); footM('market', m);
    const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 6, 0, Math.PI * 2, 0, 0.5), glassM);
    sky.scale.set(17.2 * s, 7.6 * s, 10.2 * s); sky.rotation.copy(m.rotation); sky.position.copy(c); add(sky);
    for (let i = 0; i < 10; i++) { const q = c.clone().add(polar0(13 * s, i * 36)); glow('lamp', q.x, 1.2, q.z); }
    glow('halo', c.x, 0.8, c.z, 60 * s);
  };
  const workshopB = (c, rotY) => {
    const w = new THREE.Mesh(shopG, pavM(0xc08a55)); w.position.copy(c); w.rotation.y = rotY; w.castShadow = true; add(w); footM('workshop', w);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.15, 19), pv); roof.position.copy(c).setY(4.75); roof.rotation.y = rotY; add(roof);
    for (const e of [-11, 11]) { const g = new THREE.Mesh(shopEndG, glassM); g.position.copy(c).add(new THREE.Vector3(Math.sin(rotY) * e, 0, Math.cos(rotY) * e)); g.rotation.y = rotY + (e > 0 ? 0 : Math.PI); add(g); glow('window', g.position.x, 2, g.position.z); }
  };
  const market = inf('market', marketB), workshop = inf('workshop', workshopB);
  const workHubB = (c, deg) => {
    flat(new THREE.CircleGeometry(34, 48), padM, 0.32).position.set(c.x, 0.32, c.z);
    block(c.x, c.z, 38);
    market(c, deg, 0.9);
    const out = deg + twist(Math.hypot(c.x, c.z));
    for (const da of [-64, 0, 64]) { const q = c.clone().add(polar0(26, out + da)); workshop(q, rad(out + da)); }
    for (let i = 0; i < 14; i++) { const q = c.clone().add(polar0(38, i * (360 / 14) + 6)); if (!wet(q.x, q.z, 2) && Math.abs(Math.hypot(q.x, q.z) - Math.hypot(c.x, c.z)) > 5) treePts.push([q.x, q.z, 0.85, cur.userData.from, cur.userData.to, i % 4 === 1 ? 1 : 0]); }
    for (let i = 0; i < 8; i++) { const q = c.clone().add(polar0(31, i * 45 + 20)); lamp(q.x, q.z); }
  };
  const workHub = inf('workHub', workHubB);
  layer(2);
  HUBS2.forEach((d) => workHub(polar(HUBR2, d), d));

  // Utilities that grow with the town. Water and sewage cannot sit a kilometre away from a hamlet of 200,
  // so each phase builds its own small works at its own edge, where its pipes are short, and later phases
  // add modules beside them rather than replacing them (build as you grow). Water storage sits behind,
  // on the north side; sewage is treated on the south-east side, downhill and away from the swimming lake.
  // Phase 3 adds the north campus and the water-mouth plant for the town; the earlier works stay in use.
  {
    const waterU = shiny(mat(0x6f93a0, {roughness: 0.08, metalness: 0.3}));
    const moundM = ground(0x95a463, TX.grass(23), 8, 0.2), reedM = ground(0x6c8c58, TX.leaves(), 3, 0.15), gravelM = ground(0xb5ab92, TX.gravel(), 5, 0.3);
    const compostM = mat(0x6b5236, {roughness: 1, map: TX.repeated(TX.gravel(), 4, 1)}), digM = mat(0x7f8a5c, {roughness: 0.6});
    // A local frame on a site: u along the ring, v outward
    const site = (r, deg) => { const C = polar(r, deg), a = deg + twist(r), v = [Math.cos(rad(a)), -Math.sin(rad(a))], u = [-v[1], v[0]];
      return {C, a, at: (x, y) => new THREE.Vector3(C.x + u[0] * x + v[0] * y, 0, C.z + u[1] * x + v[1] * y)}; };
    const cell = (c, R, ph, m = reedM) => {
      const f = (a) => R * (1 + 0.14 * Math.sin(2 * a + ph) + 0.07 * Math.sin(3 * a + ph * 2)), sh = new THREE.Shape(), sg = new THREE.Shape();
      for (let i = 0; i <= 96; i++) { const a = (i / 96) * 2 * Math.PI; for (const [s, k] of [[sh, 0], [sg, 2.2]]) { const x = c.x + Math.cos(a) * (f(a) + k), z = c.z + Math.sin(a) * (f(a) + k); i ? s.lineTo(x, -z) : s.moveTo(x, -z); } }
      for (const [s, y, mm] of [[sg, 0.3, gravelM], [sh, 0.34, m]]) { const g = new THREE.ShapeGeometry(s); g.rotateX(-Math.PI / 2); const o = new THREE.Mesh(g, mm); o.position.y = y; o.receiveShadow = true; add(o); }
    };
    const tank = (q, R, h) => {
      const t = new THREE.Mesh(new THREE.CylinderGeometry(R, R + 0.8, h, 36), concreteU); t.position.copy(q).setY(h / 2); t.castShadow = true; add(t); footM('utility', t);
      const top = new THREE.Mesh(new THREE.SphereGeometry(R + 0.2, 36, 8, 0, Math.PI * 2, 0, 0.55), moundM); top.scale.y = 0.45; top.position.copy(q).setY(h - 0.3); add(top);
    };
    const box = (q, a, sx, sy, sz, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), m); b.position.copy(q).setY(sy / 2 + 0.3); b.rotation.y = rad(a); b.castShadow = true; add(b); footM('utility', b); return b; };
    const screen = (S, pts, from) => pts.forEach(([x, y, s]) => { const q = S.at(x, y); treePts.push([q.x, q.z, s, from, 4, 1]); });
    // Phase 1 water yard, behind the hamlet to the north-west: a well and pump house, one earth-covered
    // tank of about 300 m³ (three days' use plus a fire reserve), two small slow sand filters, compost bays
    layer(1);
    const Y1 = site(258, 112.5);
    I('waterYard1'); flat(new THREE.CircleGeometry(17, 40), padM, 0.3).position.set(Y1.C.x, 0.3, Y1.C.z); block(Y1.C.x, Y1.C.z, 19);
    tank(Y1.at(-6, 3), 5.5, 3.6);
    box(Y1.at(6, 6), Y1.a, 3.2, 2.8, 3.2, pavM(0xc49a68));
    for (const x of [3, 9]) { const b = box(Y1.at(x, -4), Y1.a, 4.6, 0.8, 4.6, concreteU); const w = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), waterU); w.rotation.set(-Math.PI / 2, 0, rad(Y1.a)); w.position.copy(b.position).setY(1.12); add(w); }
    I('compost1'); for (let k = 0; k < 3; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), compostM); m.scale.set(4, 1.1, 1.2); m.rotation.y = rad(Y1.a); m.position.copy(Y1.at(-10 + k * 3.6, -11)).setY(0.3); add(m); footM('utility', m); }
    I(null); screen(Y1, [[-15, 12, 0.6], [14, 12, 0.6], [0, 15, 0.55]], 1);
    lamp(Y1.at(0, -14).x, Y1.at(0, -14).z);
    // Phase 1 treatment garden, just outside the hamlet on the south-east, downhill: a settling tank and two
    // planted vertical-flow reed beds of about 300 m² each (about 3 m² a person). The cleaned water
    // irrigates the orchards; nothing reaches the swimming lake.
    const T1 = site(258, 322.5);
    I('reedBeds1'); block(T1.C.x, T1.C.z, 22);
    for (const [x, ph] of [[-11, 0.4], [11, 2.1]]) cell(T1.at(x, 0), 9.8, ph);
    { const q = T1.at(0, -12), s = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.5, 24), concreteU); s.position.copy(q).setY(0.55); add(s); footM('utility', s); }
    I(null); screen(T1, [[-24, -4, 0.55], [24, -4, 0.55], [-8, 13, 0.5], [8, 13, 0.5]], 1);
    // Phase 2 adds beside each, across the new ring path: a second, larger tank, two more filters and a biogas
    // digester for food waste at the water yard; a compact treatment hall (settling and a membrane module,
    // under a solar roof) and four more reed beds at the treatment garden, for the village of 1,500.
    layer(2);
    const Y2 = site(318, 112.5);
    I('waterYard2'); flat(new THREE.CircleGeometry(19, 40), padM, 0.3).position.set(Y2.C.x, 0.3, Y2.C.z); block(Y2.C.x, Y2.C.z, 21);
    tank(Y2.at(-9, 2), 7, 4);
    for (const x of [6, 12]) { const b = box(Y2.at(x, 6), Y2.a, 4.6, 0.8, 4.6, concreteU); const w = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), waterU); w.rotation.set(-Math.PI / 2, 0, rad(Y2.a)); w.position.copy(b.position).setY(1.12); add(w); }
    I('biogas2'); { const d = new THREE.Mesh(new THREE.SphereGeometry(4.5, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), digM); d.scale.y = 0.85; d.position.copy(Y2.at(8, -8)).setY(0.3); d.castShadow = true; add(d); footM('utility', d); }
    I(null); screen(Y2, [[-17, 13, 0.6], [16, 13, 0.6]], 2);
    const T2 = site(316, 315);
    I('treatment2'); block(T2.C.x, T2.C.z, 14);
    const hall = box(T2.at(0, 0), T2.a, 12, 4, 8, pavM(0xb98f62));
    { const r = new THREE.Mesh(new THREE.BoxGeometry(12.4, 0.2, 8.4), pv); r.position.copy(hall.position).setY(4.45); r.rotation.copy(hall.rotation); add(r); }
    I('reedBeds2');
    [[-43, 0.9], [-20, 2.6], [20, 1.3], [43, 3.4]].forEach(([x, ph]) => { const q = T2.at(x, 0); cell(q, 11.5, ph); block(q.x, q.z, 13); });
    I(null); screen(T2, [[-31, 12, 0.55], [31, 12, 0.55], [-31, -12, 0.5], [31, -12, 0.5]], 2);
    // Civic, wellness, play, food and emergency services, grown phase by phase (see design/growth-plan).
    // Each item is placed by a search near its intended spot that keeps it clear of water, paths, plots,
    // buildings and the ring paths later phases will add, so every phase stays an unbroken whole.
    const FAC = [], pbb = new Map(), fbb = new Map();
    const LATER = [[285, 1.2], [345, 1.2], [360, 2], [460, 2], [488, 1.2], [532, 1.2], [548, 1.2], [592, 1.2], [688, 1.2], [732, 1.2], [760, 2], [1035, 3.5]];
    const segD = (x, z, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L)); return Math.hypot(x - a[0] - t * dx, z - a[1] - t * dz); };
    const bbOf = (pts) => pts.reduce((b, q) => [Math.min(b[0], q[0]), Math.min(b[1], q[1]), Math.max(b[2], q[0]), Math.max(b[3], q[1])], [1e9, 1e9, -1e9, -1e9]);
    const clearAt = (x, z, R) => {
      if (wet(x, z, R) || blocked(x, z, R) || inObst(x, z, R)) return false;
      const rr = Math.hypot(x, z);
      if (LATER.some(([r, h]) => Math.abs(rr - r) < R + h + 2.5)) return false;
      for (const p of paths) {
        if (p.ring) { if (Math.abs(rr - p.r) < R + p.w / 2 + 2.5) return false; continue; }
        if (!pbb.has(p)) pbb.set(p, bbOf(p.pts));
        const b = pbb.get(p), m = R + 6;
        if (x < b[0] - m || x > b[2] + m || z < b[1] - m || z > b[3] + m) continue;
        for (let i = 1; i < p.pts.length; i++) if (segD(x, z, p.pts[i - 1], p.pts[i]) < R + (p.pts[i][2] || p.w / 2) + 2.5) return false;
      }
      for (const f of FOOT) {
        if (f.c) { if (Math.hypot(x - f.c[0], z - f.c[1]) < R + f.r + 1.5) return false; continue; }
        if (!fbb.has(f)) fbb.set(f, bbOf(f.poly));
        const b = fbb.get(f); if (Math.hypot(Math.max(b[0] - x, 0, x - b[2]), Math.max(b[1] - z, 0, z - b[3])) < R + 1.5) return false;
      }
      if (FORE.some(([fx, fz, fr]) => Math.hypot(x - fx, z - fz) < R + fr + 1.5)) return false;
      return !FAC.some((s) => Math.hypot(x - s.x, z - s.z) < R + s.R + 2.5);
    };
    // A capsule (fields, long halls): circles along the long axis, which runs along the ring
    const caps = (L, W) => (S) => { const n = Math.max(1, Math.ceil((L - W) / (W / 2))); for (let i = 0; i <= n; i++) { const q = S.at(-(L - W) / 2 + (L - W) * i / n, 0); if (!clearAt(q.x, q.z, W / 2 + 1)) return false; } return true; };
    const find = (r0, d0, R, fit = null, span = 14) => {
      const C = [];
      for (let i = -6; i <= 6; i++) for (let j = -10; j <= 10; j++) C.push([Math.abs(i) + Math.abs(j) * 0.8, r0 + i * 4, d0 + j * span / 10]);
      C.sort((a, b) => a[0] - b[0]);
      for (const [, r, d] of C) {
        const S = site(r, d);
        if (fit ? fit(S) : clearAt(S.C.x, S.C.z, R)) {
          if (!fit) { FAC.push({x: S.C.x, z: S.C.z, R}); block(S.C.x, S.C.z, R);
            for (let i = treePts.length - 1; i >= 0; i--) if (Math.hypot(treePts[i][0] - S.C.x, treePts[i][1] - S.C.z) < R + 2) treePts.splice(i, 1); }
          return S;
        }
      }
      console.warn('no room for facility near', r0, d0); return null;
    };
    const capsBlock = (S, L, W) => { const n = Math.ceil(L / W) * 2; for (let i = 0; i <= n; i++) { const q = S.at(-L / 2 + L * i / n, 0); block(q.x, q.z, W / 2 + 1); FAC.push({x: q.x, z: q.z, R: W / 2}); for (let j = treePts.length - 1; j >= 0; j--) if (Math.hypot(treePts[j][0] - q.x, treePts[j][1] - q.z) < W / 2 + 2) treePts.splice(j, 1); } };
    const railM2 = mat(0xd6e8ee, {roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35, depthWrite: false}), livingM2 = mat(0x6d9046, {roughness: 0.9, map: TX.repeated(TX.leaves(), 1 / 3, 1 / 3)});
    const stoneM = ground(0xd8ccb4, TX.paving(), 4, 0.1), barkM = ground(0x8a6a48, TX.gravel(), 5, 0.4), pitchM = ground(0x7fa65a, TX.grass(41), 12, 0.1);
    const lineM = mat(0xf4f1e8, {roughness: 0.8}), trackM = ground(0xb4644a, TX.gravel(), 8, 0.2), poolM = shiny(mat(0x5f97a8, {roughness: 0.06, metalness: 0.3}));
    const redM = atNight(mat(0xa8452f, {roughness: 0.6}), warm(0xffb070, 0.4)), timberF = mat(0xb9895a, {roughness: 0.7, map: TX.repeated(TX.timber(12), 1, 1)});
    // Organic halls: a low elliptical shell with a green roof and a glazed band, long axis along the ring
    const hallF = (S, x, y, L, W, H, color, kind = 'pavilion') => {
      const q = S.at(x, y), m = new THREE.Mesh(new THREE.SphereGeometry(1, 36, 12, 0, Math.PI * 2, 0, Math.PI / 2), pavM(color));
      m.scale.set(L / 2, H, W / 2); m.rotation.y = rad(S.a + 90); m.position.copy(q).setY(0.3); m.castShadow = true; add(m); footM(kind, m);
      const roof = new THREE.Mesh(new THREE.SphereGeometry(1.02, 36, 6, 0, Math.PI * 2, 0, 0.62), capM); roof.scale.copy(m.scale); roof.rotation.copy(m.rotation); roof.position.copy(m.position); add(roof);
      const sky = new THREE.Mesh(new THREE.SphereGeometry(1.03, 30, 3, 0, Math.PI * 2, 0.3, 0.12), glassM); sky.scale.copy(m.scale); sky.rotation.copy(m.rotation); sky.position.copy(m.position); add(sky);
      for (let i = 0; i < 6; i++) { const g = q.clone().add(polar0(Math.min(L, W) / 2 + 1, S.a + i * 60)); glow('window', g.x, 1.4, g.z); }
      return m;
    };
    const pitch = (S, L, W, x = 0, y = 0) => {
      const q = S.at(x, y), g = new THREE.Mesh(new THREE.PlaneGeometry(L, W), pitchM); g.rotation.set(-Math.PI / 2, 0, rad(S.a + 90)); g.position.copy(q).setY(0.29); g.receiveShadow = true; add(g);
      for (const [lx, lz, sx, sz] of [[0, W / 2 - 1, L - 2, 0.15], [0, -W / 2 + 1, L - 2, 0.15], [L / 2 - 1, 0, 0.15, W - 2], [-L / 2 + 1, 0, 0.15, W - 2], [0, 0, 0.15, W - 2]]) {
        const l = new THREE.Mesh(new THREE.PlaneGeometry(sx, sz), lineM); l.rotation.set(-Math.PI / 2, 0, rad(S.a + 90)); l.position.copy(q).add(new THREE.Vector3(lx, 0, lz).applyAxisAngle(AY, rad(S.a + 90))).setY(0.3); add(l);
      }
      for (const e of [-1, 1]) { const p = q.clone().add(new THREE.Vector3(e * (L / 2 - 1), 0, 0).applyAxisAngle(AY, rad(S.a + 90))); const goal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 6), lineM); goal.position.copy(p).setY(1.4); goal.rotation.y = rad(S.a + 90); add(goal); }
    };
    const blobAt = (c, R, ph, m, y) => { const sh = new THREE.Shape(); for (let i = 0; i <= 96; i++) { const a = (i / 96) * 2 * Math.PI, rr = R * (1 + 0.13 * Math.sin(2 * a + ph) + 0.07 * Math.sin(3 * a + 2 * ph)), x = c.x + Math.cos(a) * rr, z = c.z + Math.sin(a) * rr; i ? sh.lineTo(x, -z) : sh.moveTo(x, -z); } const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2); const o = new THREE.Mesh(g, m); o.position.y = y; o.receiveShadow = true; add(o); };
    // Natural swimming pond: an open swimming zone ringed by a planted regeneration zone, with a timber deck
    const pond = (S, R, ph) => { blobAt(S.C, R + 2, ph, ground(0xa79c74, TX.gravel(), 6, 0.35), 0.3); blobAt(S.C, R, ph, reedM, 0.33); blobAt(S.C, R * 0.66, ph + 1, poolM, 0.36);
      const d = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.25, R * 0.75), timberF); d.position.copy(S.at(0, -R * 0.6)).setY(0.45); d.rotation.y = rad(S.a); add(d); };
    const playground = (S, x, y) => { const q = S.at(x, y); flat(new THREE.CircleGeometry(7, 32), barkM, 0.31).position.set(q.x, 0.31, q.z);
      const cl = new THREE.Mesh(new THREE.SphereGeometry(2.4, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({color: 0xd9a441, wireframe: true})); cl.position.copy(q).add(polar0(3, S.a)).setY(0.3); add(cl);
      const sw = new THREE.Mesh(new THREE.BoxGeometry(4, 2.4, 0.2), timberF); sw.position.copy(q).add(polar0(3.5, S.a + 140)).setY(1.5); sw.rotation.y = rad(S.a + 140); add(sw);
      const sl = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.15, 0.9), redM); sl.position.copy(q).add(polar0(3.5, S.a + 250)).setY(1.1); sl.rotation.set(0, rad(S.a + 250), 0.45); add(sl); };
    const cabin = (q, a) => { const b = new THREE.Mesh(new THREE.BoxGeometry(6, 2.8, 4.2), timberF); b.position.copy(q).setY(1.7); b.rotation.y = rad(a); b.castShadow = true; add(b); footM('home', b);
      const r = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 6.4, 16, 1, false, -Math.PI / 2, Math.PI), capM); r.rotation.set(0, rad(a), Math.PI / 2); r.scale.set(0.5, 1, 1); r.rotation.order = 'YXZ'; r.position.copy(q).setY(3.1); add(r);
      glow('window', q.x, 1.6, q.z); };
    const station = (S, L, bays) => { const b = new THREE.Mesh(new THREE.BoxGeometry(L, 4.5, 10), pavM(0xc9b79a)); b.position.copy(S.C).setY(2.55); b.rotation.y = rad(S.a + 90); b.castShadow = true; add(b); footM('utility', b);
      const r = new THREE.Mesh(new THREE.BoxGeometry(L + 0.6, 0.4, 10.6), capM); r.position.copy(S.C).setY(5); r.rotation.copy(b.rotation); add(r);
      for (let i = 0; i < bays; i++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.6), redM); d.position.copy(S.at(-L / 2 + (i + 0.5) * L / bays, -5.06)).setY(2.1); d.rotation.y = rad(S.a + 180) + Math.PI / 2; add(d); glow('lamp', d.position.x, 4, d.position.z); } };
    const tunnel = (S, x, y, L, W) => { const q = S.at(x, y), g = new THREE.Mesh(new THREE.CylinderGeometry(W / 2, W / 2, L, 20, 1, false, 0, Math.PI), glassM); g.rotation.set(0, rad(S.a + 90), Math.PI / 2); g.rotation.order = 'YXZ'; g.position.copy(q).setY(0.3); add(g);
      const fb = new THREE.Mesh(new THREE.BoxGeometry(L, 0.6, W), pitchM); fb.position.copy(q).setY(0.3); fb.rotation.y = rad(S.a + 90); footM('greenhouse', fb);
      for (let i = 0; i < 4; i++) { const t = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 1.1, 16), poolM); t.position.copy(S.at(x - L / 2 + (i + 0.5) * L / 4, y)).setY(0.85); add(t); } };

    // Phase 1 · Hamlet
    // Three radial paths run on past the hamlet's edge, on the lines the village will use later, to the
    // green, the lake (swimming pond and retreat cabins) and the orchard, so nothing new sits in the woods
    // without a path
    layer(1); radial(150, PHASES[1].extent + 18, 452, 4); radial(210, PHASES[1].extent + 18, 282, 4); radial(240, PHASES[1].extent + 18, 432, 4);
    // Spire: a glazed lift and stair core to the 72 m deck, a gathering level on the first steel ring at
    // 30 m, and a round gathering hall at the foot, inside the lattice
    { I('spireCore'); const core = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, SPIRE.deck, 20), glassM); core.position.y = SPIRE.deck / 2; add(core);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, SPIRE.deck, 12), concreteU); shaft.position.y = SPIRE.deck / 2; add(shaft);
      for (let h = 8; h < SPIRE.deck; h += 8) glow('window', 0, h, 2.6);
      I('spireLevel'); const lv = new THREE.Mesh(new THREE.RingGeometry(2.6, rAt(30) - 0.6, 40), deckTM); lv.rotation.x = -Math.PI / 2; lv.position.y = 30; add(lv);
      const lr = new THREE.Mesh(new THREE.TorusGeometry(rAt(30) - 0.7, 0.08, 4, 48), railM2); lr.rotation.x = Math.PI / 2; lr.position.y = 31.1; add(lr);
      I('spireHall'); const sh = new THREE.Mesh(new THREE.CylinderGeometry(11, 11.5, 4.2, 40, 1, true), glassM); sh.position.y = 2.9; add(sh);
      const sr = new THREE.Mesh(new THREE.CylinderGeometry(12, 11.2, 0.5, 40), deckTM); sr.position.y = 5.1; add(sr); glow('halo', 0, 1, 0, 30); I(null); }
    // Plaza amphitheatre: three curved stone tiers round a stage with a fire circle, on the plaza's
    // south-east, so the audience looks back over the stage to the spire
    { const S = find(62, 315, 10, null, 6);
      if (S) { I('amphitheatre'); flat(new THREE.CircleGeometry(3.6, 32), stoneM, 0.34).position.set(S.C.x, 0.34, S.C.z);
        const fire = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.8, 0.5, 16), mat(0x4a4038, {roughness: 0.9})); fire.position.copy(S.C).setY(0.6); add(fire); glow('lamp', S.C.x, 1.1, S.C.z);
        [[5, 6.2, 0.45], [6.7, 7.9, 0.9], [8.4, 9.6, 1.35]].forEach(([r0, r1, h]) => {
          const sh = new THREE.Shape(), a0 = rad(-S.a - 80), a1 = rad(-S.a + 80);
          sh.absarc(0, 0, r1, a0, a1, false); sh.absarc(0, 0, r0, a1, a0, true);
          const g = new THREE.ExtrudeGeometry(sh, {depth: h, bevelEnabled: false, curveSegments: 24}); g.rotateX(-Math.PI / 2);
          const t = new THREE.Mesh(g, stoneM); t.position.set(S.C.x, 0.3, S.C.z); t.castShadow = true; add(t);
        });
        footC('pavilion', S.C.x, S.C.z, 9.6); I(null); } }
    // Village green on the west edge: a small field and a playground (Fields in Trust, 200 people)
    { const S = find(254, 195, 0, caps(48, 30), 20);
      if (S) { capsBlock(S, 48, 30); I('villageGreen'); pitch(S, 44, 26); I(null); } }
    { const S = find(240, 215, 8, null, 30); if (S) { I('playground'); playground(S, 0, 0); I(null); } }
    // Natural swimming pond beside the heart lake, between the canal and the west shore
    { const S = find(315, 240, 15, null, 16); if (S) { I('swimPond'); pond(S, 13, 0.8); I(null); } }
    // Retreat cabins along the lake's west shore, in the future food belt
    { const S0 = find(412, 236, 26, null, 14);
      if (S0) { I('retreatCabin'); for (let i = 0; i < 6; i++) { const q = S0.at(-18 + i * 7.2, 3 * Math.sin(i * 1.3)); cabin(q, S0.a + 90 + 8 * Math.sin(i)); } I(null); } }
    // Fire and rescue shed with a water tender at the Phase 1 hub
    { const S = find(288, 76, 8, null, 10); if (S) { I('fireShed'); flat(new THREE.CircleGeometry(10, 32), padM, 0.31).position.set(S.C.x, 0.31, S.C.z); station(S, 12, 2); I(null); } }
    // Orchard and food forest, planted in Phase 1 in the permanent belt so it is mature by Phase 2:
    // fruit trees in curving rows that follow the ground, not a grid
    { I('orchard'); let n = 0;
      for (let r = 376; r <= 446; r += 8.5) for (let d = 118; d <= 162; d += 9 / r * 180 / Math.PI) {
        const dd = d + 1.2 * Math.sin(r / 23), q = polar(r + 2.5 * Math.sin(d * 0.35), dd);
        if (!clearAt(q.x, q.z, 2.2)) continue;
        treePts.push([q.x, q.z, 0.55 + 0.2 * ((n * 7) % 3) / 2, 1, 4, n % 5 === 2 ? 1 : 0]); block(q.x, q.z, 2.4); n++;
      }
      I(null); }

    // Phase 2 · Village
    layer(2);
    // Primary school (one form of entry, 210 places): two curved classroom halls round a play yard and field
    { const S = find(410, 200, 0, caps(70, 44), 24);
      if (S) { capsBlock(S, 70, 44); I('school'); hallF(S, -18, 8, 30, 12, 6, 0xd7b07c); hallF(S, 18, 8, 30, 12, 6, 0xd7b07c); pitch(S, 40, 18, 0, -10); playground(S, 0, 10); I(null); } }
    // Health centre beside the west work hub
    { const S = find(315, 172, 13, null, 20); if (S) { I('healthCentre'); hallF(S, 0, 0, 22, 13, 5.5, 0xe2c9a4); I(null); } }
    // Sports field, courts and a running loop in the food belt
    { const S = find(424, 15, 0, caps(100, 50), 16);
      if (S) { capsBlock(S, 100, 50); I('sportsField');
        const sh = new THREE.Shape(), A = 49, B = 24; for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI, x = A * Math.cos(t), z = B * Math.sin(t) * (1 + 0.05 * Math.cos(2 * t)); i ? sh.lineTo(x, z) : sh.moveTo(x, z); }
        const hole = new THREE.Path(); for (let i = 0; i <= 120; i++) { const t = -i / 120 * 2 * Math.PI, x = (A - 4) * Math.cos(t), z = (B - 4) * Math.sin(t) * (1 + 0.05 * Math.cos(2 * t)); i ? hole.lineTo(x, z) : hole.moveTo(x, z); } sh.holes.push(hole);
        const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2); const tr = new THREE.Mesh(g, trackM); tr.position.copy(S.C).setY(0.3); tr.rotation.y = rad(S.a + 90); add(tr);
        pitch(S, 76, 34); I(null); } }
    // Aquaponics greenhouses and a food-processing hall (kitchen, cold store, bakery) by the north work hub
    { const S = find(410, 75, 0, caps(64, 34), 24);
      if (S) { capsBlock(S, 64, 34); I('aquaponics'); tunnel(S, -16, 7, 26, 8); tunnel(S, -16, -7, 26, 8); I('foodHall'); hallF(S, 16, 0, 26, 16, 6, 0xc99a68, 'market'); I(null); } }
    // Volunteer fire station on the ring road, by the north-east hub
    { const S = find(462, 58, 9, null, 16); if (S) { I('fireStation'); station(S, 16, 3); I(null); } }
    // A second natural pond and a retreat lodge by the lake
    { const S = find(318, 228, 14, null, 18); if (S) { I('swimPond2'); pond(S, 12, 2.2); I(null); } }
    { const S = find(425, 226, 11, null, 20); if (S) { I('retreatLodge'); hallF(S, 0, 0, 22, 11, 5, 0xc7955f, 'home'); I(null); } }

    // Phase 3 · Town
    layer(3);
    { const S = find(640, 0, 0, caps(80, 44), 20); if (S) { capsBlock(S, 80, 44); I('secondarySchool'); hallF(S, -20, 6, 36, 14, 7, 0xd7b07c); hallF(S, 20, 6, 36, 14, 7, 0xd7b07c); pitch(S, 50, 16, 0, -12); I(null); } }
    { const S = find(640, 180, 18, null, 20); if (S) { I('townHealth'); hallF(S, 0, 0, 34, 18, 7, 0xe2c9a4); I(null); } }
    { const S = find(640, 120, 13, null, 20);
      if (S) { I('verticalFarm'); const t = new THREE.Mesh(new THREE.CylinderGeometry(9, 10.5, 22, 30), glassM); t.position.copy(S.C).setY(11.3); add(t);
        const f = new THREE.Mesh(new THREE.CylinderGeometry(10.5, 10.5, 1, 30), pitchM); f.position.copy(S.C).setY(0.8); add(f); footM('greenhouse', f);
        for (let h = 4; h < 22; h += 4) { const fl = new THREE.Mesh(new THREE.CylinderGeometry(9.2 - h * 0.06, 9.2 - h * 0.06, 0.4, 30), livingM2); fl.position.copy(S.C).setY(h); add(fl); }
        const rf = new THREE.Mesh(new THREE.CylinderGeometry(9.4, 9, 0.4, 30), pv); rf.position.copy(S.C).setY(22.4); add(rf); I(null); } }
    // Sports park in the outer belt: a track round a full pitch, two more pitches and a wellness and
    // sports centre with an indoor pool
    { const S = find(880, 202.5, 0, caps(170, 104), 5);
      if (S) { capsBlock(S, 170, 104); I('sportsPark');
        const sh = new THREE.Shape(), A = 80, B = 48; for (let i = 0; i <= 120; i++) { const t = i / 120 * 2 * Math.PI, x = A * Math.cos(t), z = B * Math.sin(t) * (1 + 0.05 * Math.cos(2 * t)); i ? sh.lineTo(x, z) : sh.moveTo(x, z); }
        const hole = new THREE.Path(); for (let i = 0; i <= 120; i++) { const t = -i / 120 * 2 * Math.PI, x = (A - 5) * Math.cos(t), z = (B - 5) * Math.sin(t) * (1 + 0.05 * Math.cos(2 * t)); i ? hole.lineTo(x, z) : hole.moveTo(x, z); } sh.holes.push(hole);
        const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2); const tr = new THREE.Mesh(g, trackM); tr.position.copy(S.C).setY(0.3); tr.rotation.y = rad(S.a + 90); add(tr);
        pitch(S, 105, 68); I(null); } }
    { const S = find(880, 217.5, 0, caps(160, 80), 5);
      if (S) { capsBlock(S, 160, 80); I('sportsPark'); pitch(S, 90, 56, -30, 0); I('wellnessCentre'); hallF(S, 50, 0, 44, 22, 8, 0xd9c3a0);
        { const q = S.at(50, -20); const pl = new THREE.Mesh(new THREE.PlaneGeometry(25, 10), poolM); pl.rotation.set(-Math.PI / 2, 0, rad(S.a + 90)); pl.position.copy(q).setY(0.33); add(pl); } I(null); } }
    { const S = find(1002, 222, 12, null, 16); if (S) { I('fireStation3'); station(S, 22, 4); I(null); } }
    I(null);
  }

  I('courtyard');
  // Phase 2: village neighborhoods of earth-home courtyard clusters (six homes round a shared garden)
  layer(2); trees(2);
  const garden = ground(0xbec894, TX.grass(19), 8, 0);
  FINAL.clusters.forEach((r) => {
    for (let i = 0; i < 24; i++) {
      const deg = 7.5 + i * 15;
      const c = polar(r, deg);
      if (wet(c.x, c.z, 32) || blocked(c.x, c.z, 20) || HUBS2.some((d) => Math.hypot(c.x - polar(HUBR2, d).x, c.z - polar(HUBR2, d).z) < 52)) continue;
      flat(new THREE.CircleGeometry(9, 32), garden, 0.27).position.set(c.x, 0.27, c.z);
      // Each courtyard is built by one crew with one method
      const build = HOME[i % 4];
      for (let k = 0; k < 6; k++) {
        const a = deg + twist(r) + k * 60;
        build(c.clone().add(polar0(15, a)), a + 90, 4, 1.2);
      }
      tree(c.x, c.z, 0.9);
    }
    ringPath(r + 30, 2.4);
  });

  I('terrace');
  // Phase 3: flowing terraces in crescents along the rings, two storeys rising to three.
  // No boxes: each building waves in plan, has round ends and a rolling roofline. Thin-shell
  // concrete floor bands, full-height glazing, a curved timber roof edge, a green roof with a
  // glass skylight ridge, a stone plinth and living-wall ends.
  layer(3); trees(3);
  const concreteM = mat(0xece7dd, {roughness: 0.5, map: TX.repeated(TX.concrete(), 1 / 10, 1 / 10)});
  const edgeM = atNight(mat(0xd2a26c, {roughness: 0.6, map: TX.repeated(TX.timber(24), 1 / 6, 1 / 1.5)}), warm(0x7a4a1c, 0.35));
  const glazeM = atNight(shiny(mat(0xffffff, {roughness: 0.12, metalness: 0.25, map: TX.repeated(TX.glazing(), 1 / 9, 1 / 3),
    emissive: 0xffffff, emissiveIntensity: 0, emissiveMap: TX.repeated(TX.glazingLights(), 1 / 9, 1 / 3)})), {emissiveIntensity: 1.25});
  const railM = mat(0xd6e8ee, {roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35, depthWrite: false});
  const livingM = mat(0x6d9046, {roughness: 0.9, map: TX.repeated(TX.leaves(), 1 / 3, 1 / 3)});
  const plinthM = mat(0xbdb3a2, {map: TX.repeated(TX.paving(), 1 / 4, 1 / 1.6)});
  const roofM = ground(0x7a9550, TX.grass(23), 9, 0.2);
  // All terrace geometry is merged into one mesh per material
  const batches = new Map();
  const tri = (m, v, n, uv) => {
    if (!batches.has(m)) batches.set(m, {p: [], n: [], u: []});
    const b = batches.get(m);
    // Wind each triangle so its face points along the wanted normal
    const e1 = [v[1][0] - v[0][0], v[1][1] - v[0][1], v[1][2] - v[0][2]], e2 = [v[2][0] - v[0][0], v[2][1] - v[0][1], v[2][2] - v[0][2]];
    const cx = e1[1] * e2[2] - e1[2] * e2[1], cy = e1[2] * e2[0] - e1[0] * e2[2], cz = e1[0] * e2[1] - e1[1] * e2[0];
    const nm = [n[0][0] + n[1][0] + n[2][0], n[0][1] + n[1][1] + n[2][1], n[0][2] + n[1][2] + n[2][2]];
    const order = cx * nm[0] + cy * nm[1] + cz * nm[2] < 0 ? [0, 2, 1] : [0, 1, 2];
    order.forEach((k) => { b.p.push(...v[k]); b.n.push(...n[k]); b.u.push(...uv[k]); });
  };
  // Outline of one building at offset d from its wall line: outer edge, round end, inner edge, round end
  const outline = (B, d) => {
    const N = 28, M = 6, R = B.hw + d, outer = [], inner = [], cap0 = [], cap1 = [];
    // t runs along the whole building; a part (t0..t1) such as a skylight follows the same wave
    const t0 = B.t0 || 0, t1 = B.t1 === undefined ? 1 : B.t1;
    const rc = (t) => B.r + B.amp * Math.sin(2 * Math.PI * t + B.ph), ang = (t) => B.a0 + (B.a1 - B.a0) * t;
    const pt = (q, t) => ({x: q.x, z: q.z, t});
    for (let i = 0; i <= N; i++) { const t = t0 + ((t1 - t0) * i) / N; outer.push(pt(polar(rc(t) + R, ang(t)), t)); inner.push(pt(polar(rc(t) - R, ang(t)), t)); }
    for (const [t, out, dir] of [[t1, cap1, 1], [t0, cap0, -1]]) {
      const a = rad(ang(t) + twist(rc(t))), c = polar(rc(t), ang(t)), u = [Math.cos(a), -Math.sin(a)], tn = [-Math.sin(a), -Math.cos(a)];
      for (let j = 1; j < M; j++) {
        const th = (Math.PI * j) / M, k = dir > 0 ? th : Math.PI - th;
        out.push({x: c.x + R * (u[0] * Math.cos(k) + dir * tn[0] * Math.sin(k)), z: c.z + R * (u[1] * Math.cos(k) + dir * tn[1] * Math.sin(k)), t, end: true});
      }
      out.center = {x: c.x, z: c.z, t};
    }
    const loop = [...outer, ...cap1, ...[...inner].reverse(), ...cap0];
    let A = 0; loop.forEach((p, i) => { const q = loop[(i + 1) % loop.length]; A += p.x * q.z - q.x * p.z; });
    const s = A > 0 ? 1 : -1;
    loop.forEach((p, i) => {
      const a = loop[(i - 1 + loop.length) % loop.length], b = loop[(i + 1) % loop.length], dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz) || 1;
      p.nx = (s * dz) / L; p.nz = (-s * dx) / L;
    });
    // Round ends belong to the segments touching them
    outer[0].end = outer[N].end = inner[0].end = inner[N].end = true;
    return {outer, inner, cap0, cap1, loop};
  };
  // A vertical band round the outline from y0(t) to y1(t); `pick` chooses the material per segment
  const band = (O, y0, y1, pick) => {
    let len = 0;
    O.loop.forEach((p, i) => {
      const q = O.loop[(i + 1) % O.loop.length], seg = Math.hypot(q.x - p.x, q.z - p.z);
      const m = typeof pick === 'function' ? pick(p, q) : pick;
      const a0 = [p.x, y0(p.t), p.z], a1 = [p.x, y1(p.t), p.z], b0 = [q.x, y0(q.t), q.z], b1 = [q.x, y1(q.t), q.z];
      const np = [p.nx, 0, p.nz], nq = [q.nx, 0, q.nz];
      tri(m, [a0, b0, b1], [np, nq, nq], [[len, a0[1]], [len + seg, b0[1]], [len + seg, b1[1]]]);
      tri(m, [a0, b1, a1], [np, nq, np], [[len, a0[1]], [len + seg, b1[1]], [len, a1[1]]]);
      len += seg;
    });
  };
  // A horizontal surface over the outline at height y(t), facing up (dir 1) or down (dir -1)
  const cap = (O, y, m, dir = 1) => {
    const n = [0, dir, 0], P = (p) => [p.x, y(p.t), p.z], U = (p) => [p.x, p.z];
    for (let i = 0; i < O.outer.length - 1; i++) {
      const a = O.outer[i], b = O.outer[i + 1], c = O.inner[i + 1], d = O.inner[i];
      tri(m, [P(a), P(b), P(c)], [n, n, n], [U(a), U(b), U(c)]);
      tri(m, [P(a), P(c), P(d)], [n, n, n], [U(a), U(c), U(d)]);
    }
    for (const [cp, o, iN] of [[O.cap1, O.outer[O.outer.length - 1], O.inner[O.inner.length - 1]], [O.cap0, O.inner[0], O.outer[0]]]) {
      const ring = [o, ...cp, iN], c = cp.center;
      for (let j = 0; j < ring.length - 1; j++) tri(m, [P(c), P(ring[j]), P(ring[j + 1])], [n, n, n], [U(c), U(ring[j]), U(ring[j + 1])]);
    }
  };
  const building = (B) => {
    // Buildings give way to the canals and the river; their place becomes waterfront
    for (let t = 0; t <= 1; t += 0.1) { const c = polar(B.r + B.amp * Math.sin(2 * Math.PI * t + B.ph), B.a0 + (B.a1 - B.a0) * t); if (wet(c.x, c.z, B.hw + 5) || blocked(c.x, c.z, B.hw + 3)) return; }
    FOOT.push({kind: 'terrace', from: cur.userData.from, to: cur.userData.to, poly: outline(B, 1.9).loop.map((q) => [q.x, q.z])});
    const H = (t) => B.base + B.rise * Math.pow(Math.sin(Math.PI * t), 0.8) * (0.8 + 0.2 * Math.cos(2 * Math.PI * (t * 1.3 + B.ph)));
    const k = (v) => () => v;
    band(outline(B, 0.3), k(0), k(0.45), plinthM);
    band(outline(B, -0.4), k(0.45), k(3.2), (p, q) => (p.end && q.end ? livingM : glazeM));
    // First-floor slab: a thin concrete shell that cantilevers into a balcony with a glass rail
    const slab = outline(B, 1.9);
    band(slab, k(3.2), k(3.6), concreteM); cap(slab, k(3.6), concreteM); cap(slab, k(3.2), concreteM, -1);
    band(outline(B, 1.8), k(3.6), k(4.6), railM);
    band(outline(B, -0.7), k(3.6), (t) => H(t) - 0.5, glazeM);
    const roof = outline(B, 1.6);
    band(roof, (t) => H(t) - 0.5, (t) => H(t) + 0.2, edgeM); cap(roof, (t) => H(t) - 0.5, edgeM, -1); cap(roof, (t) => H(t) + 0.2, roofM);
    // Glass skylights over the tallest part of the roof
    for (const [s0, s1] of [[0.2, 0.42], [0.5, 0.78]]) {
      const sky = outline({...B, t0: s0, t1: s1}, -4.9);
      band(sky, (t) => H(t) + 0.2, (t) => H(t) + 1.4, glassM); cap(sky, (t) => H(t) + 1.4, glassM);
    }
    // Planting beds of shrubs round the building, and a tree at each end
    outline(B, 3.6).loop.forEach((p, i) => { if (i % 2 === 0) tree(p.x, p.z, 0.4 + ((i * 7) % 5) * 0.06, 2); });
    for (const t of [0, 1]) { const q = polar(B.r + B.amp * Math.sin(2 * Math.PI * t + B.ph), B.a0 + (B.a1 - B.a0) * t + (t ? 1 : -1) * (7 / B.r) * (180 / Math.PI)); tree(q.x, q.z, 1.1); }
  };
  const D = FINAL.districts;
  FINAL.terraces.forEach((r, row) => {
    const n = r > 360 ? 24 : 12, step = 360 / n, gap = (20 / r) * (180 / Math.PI), split = (12 / r) * (180 / Math.PI);
    for (let i = 0; i < n; i++) {
      const a0 = i * step + gap, a1 = (i + 1) * step - gap;
      const mid = (a0 + a1) / 2;
      if (Math.abs(r - D.r) < 100 && D.deg.some((d) => Math.abs(((mid - d + 540) % 360) - 180) < step)) continue;
      // Two buildings per crescent, with a garden passage between them
      [[a0, mid - split], [mid + split, a1]].forEach(([b0, b1], j) => building({r, a0: b0, a1: b1, hw: 7, amp: 3.6, ph: (i * 2 + j + row) * 1.9, base: 6.9, rise: 2.6 + ((i + j + row) % 3) * 0.7}));
    }
    ringPath(r + 22, 2.4); ringPath(r - 22, 2.4);
    for (let i = 0; i < n * 6; i++) { const q = polar(r + 30 + ((i * 5) % 3 - 1) * 2.5, (i + 0.5) * (360 / (n * 6))); tree(q.x, q.z, 0.75 + ((i * 3) % 4) * 0.12, i % 5 === 2 ? 1 : 0); }
  });
  batches.forEach((b, m) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(b.u, 2));
    g.computeBoundingSphere();
    const mesh = new THREE.Mesh(g, m); mesh.castShadow = true; mesh.receiveShadow = true; add(mesh);
  });
  I('districtSquare');
  // District hubs: large communosphere domes with a small temple and a market green
  D.deg.forEach((deg) => {
    const c = polar(D.r, deg);
    flat(new THREE.CircleGeometry(D.d / 2 + 22, 48), ground(0xddd2ba, TX.paving(), 5, 0), 0.27).position.set(c.x, 0.27, c.z);
    dome(c, D.d, 0.7);
    const t = deg + twist(D.r);
    I('districtTemple'); pavilion(c.clone().add(polar0(D.d / 2 + 12, t + 90)), 6); I('districtSquare');
    // District work: a market hall on the other side of the square and a row of workshops behind
    market(c.clone().add(polar0(D.d / 2 + 14, t - 90)), deg + 90, 1);
    for (let k = -2; k <= 2; k++) { const q = polar(D.r + 72, deg + k * 3.4); workshop(q, rad(deg + twist(D.r + 72) + k * 3.4)); }
    block(c.x, c.z, D.d / 2 + 30);
  });

  I(null);
  // Food and energy belts: agrivoltaic arrays, solar greenhouses and food-forest rows by sector
  const gh = atNight(shiny(mat(0xdbe7e9, {roughness: 0.12, metalness: 0.15, transparent: true, opacity: 0.8, map: TX.repeated(TX.glass(), 2, 1)})), warm(0xd59cff, 0.45));
  FINAL.belts.forEach(([b0, b1]) => {
    const from = firstIn('belts', ([x]) => x === b0);
    layer(from); trees(from);
    const sectors = 24;
    for (let s = 0; s < sectors; s++) {
      const kind = s % 3;
      for (let r = b0 + 22; r < b1 - 12; r += kind === 0 ? 16 : kind === 1 ? 34 : 26) {
        const span = 15 - (24 / r) * (180 / Math.PI) * 2;
        const count = Math.max(1, Math.floor((rad(span) * r) / (kind === 0 ? 26 : 34)));
        for (let k = 0; k < count; k++) {
          const deg = s * 15 + (24 / r) * (180 / Math.PI) + (k + 0.5) * (span / count);
          const p = polar(r, deg);
          if (wet(p.x, p.z, 14) || blocked(p.x, p.z, 12)) continue;
          if (kind === 0) { I('agrivoltaic'); array(p, deg + twist(r), 22, 7); I(null); }
          else if (kind === 1) {
            I('greenhouse');
            const g = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 26, 16, 1, false, 0, Math.PI), gh);
            g.rotation.z = Math.PI / 2; g.rotation.y = rad(deg + twist(r)); g.position.copy(p); g.castShadow = true; add(g); footM('greenhouse', g);
          } else for (let t = -1; t <= 1; t++) { const q = polar(r, deg + t * (9 / r) * (180 / Math.PI)); tree(q.x, q.z, 0.8); }
        }
      }
    }
  });

  I(null);
  // Scattered trees in ring 2, kept clear of every pavilion plot
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  trees(1);
  for (let i = 0; i < 90; i++) {
    const deg = rnd() * 360, r = 40 + rnd() * 36;
    if (Math.abs(((deg - 45) % 90 + 90) % 90 - 45) > 40) continue;
    if (FINAL.inner.some(([d]) => Math.abs(((deg - d + 540) % 360) - 180) < 12)) continue;
    const p = polar(r, deg); tree(p.x, p.z, 0.7);
  }
  // Supporting systems. Service sits behind the city to the north, off the north road, inside the feng shui
  // woods; treatment sits at the water mouth, the lowest ground, so water and sewage both move by gravity.
  {
    layer(1); trees(1);
    const waterU = shiny(mat(0x6f93a0, {roughness: 0.08, metalness: 0.3}));
    const earthTop = ground(0x95a463, TX.grass(23), 8, 0.2), digM = mat(0x7f8a5c, {roughness: 0.6}), membM = shiny(mat(0xe7e3d6, {roughness: 0.4}));
    const compostM = mat(0x6b5236, {roughness: 1, map: TX.repeated(TX.gravel(), 4, 1)}), binM = [0x5d7f4a, 0x3f6b8a, 0xb58b3a, 0x8a8a84].map((c) => mat(c, {roughness: 0.6}));
    // North utility campus: reservoir, water treatment, recycling and compost, biogas, the main substation
    const roadA = (r) => { const pts = northRoad(r, r); return Math.atan2(-pts[0][1], pts[0][0]) * 180 / Math.PI; };
    const UC = 121, URr = 1200, C = polar0(URr, UC), uv = [Math.cos(rad(UC + 90)), -Math.sin(rad(UC + 90))], vv = [Math.cos(rad(UC)), -Math.sin(rad(UC))];
    const at = (u, v) => new THREE.Vector3(C.x + uv[0] * u + vv[0] * v, 0, C.z + uv[1] * u + vv[1] * v);
    layer(3);
    I('utilityCampus'); flat(new THREE.CircleGeometry(60, 56), padM, 0.32).position.set(C.x, 0.32, C.z); block(C.x, C.z, 66); I(null);
    { const a0 = roadA(1180), pts = []; for (let d = a0 + 0.3; d <= UC - (54 / 1180) * 180 / Math.PI; d += 0.25) { const q = polar0(1180 + 4 * Math.sin((d - a0) * 0.9), d); pts.push([q.x, q.z]); } road(pts, 5, 3); }
    I('reservoir');
    // Covered reservoir: two earth-sheltered cells on the high ground, feeding the city by gravity
    for (const u of [-17, 17]) {
      const q = at(u, 38);
      const t = new THREE.Mesh(new THREE.CylinderGeometry(13, 14, 5, 40), concreteU); t.position.copy(q).setY(2.5); t.castShadow = true; add(t); footM('utility', t);
      const top = new THREE.Mesh(new THREE.SphereGeometry(13.2, 40, 8, 0, Math.PI * 2, 0, 0.5), earthTop); top.scale.y = 0.5; top.position.copy(q).setY(4.6); add(top);
    }
    { const vh = new THREE.Mesh(new THREE.BoxGeometry(4, 3.4, 4), pavM(0xc49a68)); vh.position.copy(at(0, 27)).setY(1.7); vh.rotation.y = rad(UC); add(vh); footM('utility', vh); }
    I('sandFilter');
    // Water treatment: slow sand filter beds and a pump house
    for (const u of [-9, 9]) { const b = new THREE.Mesh(new THREE.BoxGeometry(8, 0.9, 16), concreteU); b.position.copy(at(u, 14)).setY(0.45); b.rotation.y = rad(UC); add(b); footM('utility', b); const w = new THREE.Mesh(new THREE.PlaneGeometry(7, 15), waterU); w.rotation.x = -Math.PI / 2; w.rotation.z = rad(UC); w.position.copy(at(u, 14)).setY(0.92); add(w); }
    I('recycling');
    // Recycling and repair hall with sorted-material bays
    workshopB(at(-18, -38), rad(UC));
    for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(4, 1.6, 3), binM[k]); b.position.copy(at(-30 + k * 7, -26)).setY(1.12); b.rotation.y = rad(UC); add(b); footM('utility', b); }
    I('compost');
    // Compost windrows for food and garden waste
    for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), compostM); m.scale.set(11, 1.5, 1.8); m.rotation.y = rad(UC + 90); m.position.copy(at(30, -46 + k * 5)).setY(0.32); add(m); footM('utility', m); }
    I('biogas');
    // Biogas: two digesters for sewage sludge and food waste, and a gas holder; the gas runs a small CHP unit
    for (const v of [6, -12]) { const d = new THREE.Mesh(new THREE.SphereGeometry(7, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), digM); d.scale.y = 0.85; d.position.copy(at(38, v)); d.castShadow = true; add(d); footM('utility', d); }
    { const g = new THREE.Mesh(new THREE.SphereGeometry(4, 24, 12), membM); g.position.copy(at(51, -3)).setY(3); add(g); footM('utility', g); }
    I('substation');
    // Main substation and battery bank where the solar belts and the CHP join the microgrid
    for (const v of [9, 1]) { const b = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 6.1), batM); b.position.copy(at(-42, v)).setY(1.62); b.rotation.y = rad(UC); add(b); footM('utility', b); }
    { const t = new THREE.Mesh(new THREE.BoxGeometry(5, 3.2, 4), concreteU); t.position.copy(at(-36, -9)).setY(1.92); t.rotation.y = rad(UC); add(t); footM('utility', t); }
    for (let i = 0; i < 10; i++) { const q = at(...[[-50, 20], [-50, -20], [0, 0], [20, 30], [-30, 50], [45, 30], [50, -30], [0, -50], [-45, -45], [25, -20]][i]); lamp(q.x, q.z); }
    I('treatmentHall');
    // Water mouth (shuikou): where the creek meets the river the water is "locked" by a grove, a pavilion
    // and a bridge, and the treatment wetland cleans the city's water before it reaches the river
    const plant = new THREE.Mesh(new THREE.BoxGeometry(22, 4.5, 12), pavM(0xb98f62)); plant.position.set(122, 2.25, 1052); plant.rotation.y = Math.atan2(1052, 122) - Math.PI / 2; plant.castShadow = true; add(plant); footM('utility', plant);
    { const r = new THREE.Mesh(new THREE.BoxGeometry(22.4, 0.2, 12.4), pv); r.position.set(122, 4.6, 1052); r.rotation.copy(plant.rotation); add(r); block(122, 1052, 16); }
    WETLAND.forEach(([c, f]) => { block(c.x, c.z, 0); for (let a = 0; a < 2 * Math.PI; a += 0.5) { const R = f(a) - 2.5 - (Math.floor(a * 7) % 3); treePts.push([c.x + Math.cos(a) * R, c.z + Math.sin(a) * R, 0.35, 3, 4, 2]); } });
    I(null); layer(1);
    const promenade = []; for (let x = -280; x <= 280; x += 4) promenade.push([x, riverZ(x) - 26 - 6 * Math.sin(x / 70), 1.5]);
    paths.push({pts: promenade, w: 3, from: 1}); ribbon(promenade, 0, 0.31, path); promenade.forEach((q, i) => { if (i % 12 === 6) lamp(q[0], q[1] - 2.7); });
    I('shuikou'); pavilion(new THREE.Vector3(-8, 0, 1098), 7); I(null);
    for (let i = 0; i < 140; i++) { const a = i * 2.39996, rr = 6 + Math.sqrt(i) * 4, x = -12 + Math.cos(a) * rr * 1.4, z = 1090 + Math.sin(a) * rr * 0.7; tree(x, z, 0.9 + (i % 5) * 0.1, i % 4 === 1 ? 1 : 0); }
    // Feng shui woods: a dense crescent of forest behind the city to the north (the Tortoise's back),
    // sheltering it from winter wind and holding water and soil on the slope
    for (let i = 0; i < 2600; i++) {
      const deg = 22 + rnd() * 136, k = (deg - 90) / 68, rIn = 1072, rOut = 1420 - 220 * k * k, r = rIn + rnd() * (rOut - rIn);
      const q = polar0(r, deg); tree(q.x, q.z, 1 + rnd() * 0.6, rnd() < 0.45 ? 1 : 0);
    }
  }
  I(null);
  // Wild woodland: one forest round the city; each phase clears only the land its new rings need
  const w0 = PHASES[1].extent + 13, w1 = FINAL.extent + 1200;
  for (let i = 0; i < 4600; i++) {
    const deg = rnd() * 360, r = Math.sqrt(w0 * w0 + rnd() * (w1 * w1 - w0 * w0)), s = 1 + rnd() * 0.8;
    trees(1, [2, 3].find((n) => r < PHASES[n].extent + 13) || 4);
    const p = polar(r, deg); tree(p.x, p.z, s, (i * 7919) % 10 < 3 ? 1 : 0);
  }
  // Distant hills, set out as the feng shui "armchair": the highest ground behind the city to the north
  // (the Tortoise), a ridge on the east (the Dragon) a little higher than the one on the west (the Tiger),
  // and an open south over the river and lake to one low, far hill (the Phoenix). The north road leaves
  // through the valley between the Dragon and the Tortoise. A real site is chosen for this shape;
  // here it is scenery that keeps its distance from the frame in each phase's view.
  const hillM = mat(0x75865a, {map: TX.repeated(TX.grass(29), 10, 3)});
  const HILLS = [[88, 1.15, 0.4, 0.95], [104, 1.0, 0.36, 1], [120, 0.9, 0.3, 1.05], [70, 0.75, 0.3, 1.15], [138, 0.8, 0.25, 1.05],
    [20, 0.85, 0.26, 1.05], [40, 0.75, 0.28, 1.0], [160, 0.85, 0.18, 1.05], [182, 0.7, 0.16, 1.15], [268, 0.9, 0.08, 2.0]];
  [1, 2, 3].forEach((n) => {
    layer(n, n + 1);
    const F = PHASES[n];
    HILLS.forEach(([deg, size, ht, dist]) => {
      const d0 = (F.extent + 1280 * Math.sqrt(F.view)) * dist + rnd() * 200, a = deg + (rnd() - 0.5) * 6, R0 = (560 + rnd() * 120) * size * Math.sqrt(F.view);
      // Northern hills stand behind the feng shui woods and the utility campus (to r 1450)
      const p = polar0(deg < 200 ? Math.max(d0, 1450 + R0) : d0, a);
      const hg = new THREE.SphereGeometry(R0, 48, 20), hp = hg.attributes.position, ph = rnd() * 6;
      for (let k = 0; k < hp.count; k++) {
        const x = hp.getX(k), y = hp.getY(k), z = hp.getZ(k), L = Math.hypot(x, y, z) || 1;
        const f = 1 + 0.07 * Math.sin(3 * x / L + ph) * Math.cos(2.5 * z / L) + 0.04 * Math.sin(7 * z / L + ph * 2) + 0.025 * Math.cos(11 * x / L);
        hp.setXYZ(k, x * f, y * f, z * f);
      }
      hg.computeVertexNormals();
      const hill = new THREE.Mesh(hg, hillM);
      hill.scale.y = ht; hill.position.copy(p); add(hill);
    });
  });

  // Build the water: river, lake, canals, quays, bridges, landings and electric boats
  {
    const waterM = atNight(shiny(ground(0x6a8c99, TX.water(), 14, 0.2)), warm(0x103040, 0.35));
    Object.assign(waterM, {roughness: 0.07, metalness: 0.3});
    const quayM = ground(0xd4ccbc, TX.paving(), 4, 0.1), sandM = ground(0xa79c74, TX.gravel(), 6, 0.35);
    const deckM = mat(0xb9895a, {roughness: 0.7, map: TX.repeated(TX.timber(12), 1, 1)});
    const blob = (rf, y, m, c = LAKE) => {
      const sh = new THREE.Shape();
      for (let i = 0; i <= 160; i++) { const a = (i / 160) * 2 * Math.PI, r = rf(a), x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r; i ? sh.lineTo(x, -z) : sh.moveTo(x, -z); }
      const g = new THREE.ShapeGeometry(sh); g.rotateX(-Math.PI / 2);
      const o = new THREE.Mesh(g, m); o.position.y = y; o.receiveShadow = true; add(o);
    };
    // Lake with a wooded island
    layer(1);
    I('lake'); blob((a) => lakeR(a) + 5, 0.335, sandM); blob(lakeR, 0.36, waterM);
    const ISL = {x: LAKE.x + 14, z: LAKE.z - 8};
    blob((a) => 15 + 3 * Math.sin(3 * a + 1), 0.38, sandM, ISL); blob((a) => 12 + 3 * Math.sin(3 * a + 1), 0.4, ground(0x8ea35e, TX.grass(11), 12, 0.2), ISL);
    for (let i = 0; i < 9; i++) { const a = i * 2.4, r = 3 + (i % 3) * 3; treePts.push([ISL.x + Math.cos(a) * r, ISL.z + Math.sin(a) * r, 0.7 + (i % 4) * 0.15, 1, 4, i % 3 === 1 ? 1 : 0]); }
    waters.forEach((w) => { I(w.kind === 'canal' ? (w.from === 1 ? 'heartCanal' : 'canal') : w.kind); layer(w.from); ribbon(w.pts, w.bank, 0.335, w.kind === 'river' || w.kind === 'creek' ? sandM : quayM, w.closed); ribbon(w.pts, 0, 0.36, waterM, w.closed); });
    // Harbour basin at the edge of the core, where the heart canal ends and the rill begins
    layer(1);
    I('harbour'); blob((a) => harbR(a) + 3, 0.335, quayM, HARB); blob(harbR, 0.36, waterM, HARB);
    // Treatment wetland cells: shallow reed beds with gravel margins
    layer(3); I('wetland'); WETLAND.forEach(([c, f]) => { blob((a) => f(a) + 2.5, 0.335, sandM, c); blob(f, 0.36, ground(0x6f8a72, TX.water(), 10, 0.2), c); });
    I(null);
    // The rill glows softly at night, like the plaza pool it feeds
    waters.filter((w) => w.kind === 'rill').forEach((w) => w.pts.forEach((q, i) => { if (i % 4 === 0) glow('cool', q[0], 0.5, q[1]); }));
    // Towpath along the east bank of the heart canal, from the harbour to the lake
    {
      const hc = waters[2].pts, tp = [];
      for (let i = 1; i < hc.length - 1; i++) {
        const dx = hc[i + 1][0] - hc[i - 1][0], dz = hc[i + 1][1] - hc[i - 1][1], L = Math.hypot(dx, dz), o = hc[i][2] + 2.5 + 2;
        const x = hc[i][0] + dz / L * o, z = hc[i][1] - dx / L * o;
        if (!inLake(x, z, 2)) tp.push([x, z, 1.3]);
      }
      ribbon(tp, 0, 0.31, path);
      tp.forEach((q, i) => { if (i % 10 === 5) lamp(q[0] + 2, q[1]); });
      // Willows and alders in loose clumps on the west bank soften the canal's line
      for (let i = 2; i < hc.length - 2; i += 3) {
        if (i % 7 === 3) continue;
        const dx = hc[i + 1][0] - hc[i - 1][0], dz = hc[i + 1][1] - hc[i - 1][1], L = Math.hypot(dx, dz), o = hc[i][2] + 6 + 3 * Math.sin(i * 1.7);
        const x = hc[i][0] - dz / L * o, z = hc[i][1] + dx / L * o;
        if (!wet(x, z, 1.5) && !blocked(x, z, 3)) treePts.push([x, z, 0.75 + 0.25 * Math.sin(i * 2.3), 1, 4, i % 4 === 1 ? 1 : 0]);
      }
      // Harbour edge: a ring of trees on the landward side frames the basin
      for (let a = 0; a < 2 * Math.PI; a += 0.26) {
        const R = harbR(a) + 8, x = HARB.x + Math.cos(a) * R, z = HARB.z + Math.sin(a) * R;
        if (!wet(x, z, 1.5) && !blocked(x, z, 3) && Math.hypot(x, z) < 236) treePts.push([x, z, 0.8, 1, 4, 0]);
      }
    }

    // Electric boats: a white hull, timber deck and bench, and a solar canopy on four posts
    const hullG = new THREE.SphereGeometry(1, 20, 8, 0, 2 * Math.PI, Math.PI / 2, Math.PI / 2); hullG.scale(4, 0.9, 1.25); hullG.translate(0, 0.62, 0);
    const deckG = new THREE.CircleGeometry(1, 20); deckG.rotateX(-Math.PI / 2); deckG.scale(3.9, 1, 1.2); deckG.translate(0, 0.62, 0);
    const benchG = new THREE.BoxGeometry(2.8, 0.45, 1.5); benchG.translate(-0.2, 0.85, 0);
    const roofG = new THREE.BoxGeometry(4.6, 0.12, 2.3); roofG.translate(-0.2, 2.35, 0);
    const postGs = [[-2.2, -0.9], [-2.2, 0.9], [1.8, -0.9], [1.8, 0.9]].map(([x, z]) => { const g = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 5); g.translate(x, 1.45, z); return g.toNonIndexed(); });
    const postsG = new THREE.BufferGeometry();
    ['position', 'normal', 'uv'].forEach((a) => postsG.setAttribute(a, new THREE.Float32BufferAttribute(postGs.flatMap((g) => [...g.attributes[a].array]), a === 'uv' ? 2 : 3)));
    const hullM = shiny(mat(0xf4f2ec, {roughness: 0.3}));
    const boatLamp = atNight(mat(0xf4f2ec, {roughness: 0.3}), warm(0xffd9a0, 0.6));
    const boatB = (x, z, dir, s = 1) => {
      const v = new THREE.Vector3(x, 0, z);
      place('boatHull', hullG, hullM, v, dir, s); place('boatDeck', deckG, deckM, v, dir, s); place('boatBench', benchG, boatLamp, v, dir, s);
      place('boatRoof', roofG, pv, v, dir, s); place('boatPost', postsG, postM, v, dir, s);
      glow('window', x, 1.6 * s, z);
    };
    const boat = inf('boat', boatB);
    // Boats along each water; the river carries larger water buses
    waters.forEach((w) => {
      if (w.kind === 'rill') return;
      layer(w.from);
      const P = w.pts, step = w.kind === 'river' ? 70 : 30, side = w.kind === 'river' ? 0.45 : 0.32;
      for (let i = 8, k = 0; i < P.length - 2; i += step, k++) {
        const [x, z, hw] = P[i], [x2, z2] = P[i + 2], dx = x2 - x, dz = z2 - z, L = Math.hypot(dx, dz);
        if (Math.hypot(x, z) > FINAL.extent + 900 || (k * 7) % 5 > 2) continue;
        const o = (k % 2 ? 1 : -1) * hw * side;
        boat(x - dz / L * o, z + dx / L * o, Math.atan2(-dz, dx) + (k % 2 ? 0 : Math.PI), w.kind === 'river' ? 1.4 : 1);
      }
      // Lamps along the canal quays
      if (w.kind === 'canal') for (let i = 0; i < P.length - 2; i += 14) {
        const [x, z, hw] = P[i], [x2, z2] = P[i + 2], dx = x2 - x, dz = z2 - z, L = Math.hypot(dx, dz), o = hw + w.bank + 1.6;
        const q = [x + dz / L * o, z - dx / L * o]; if (!wet(q[0], q[1], 0.5)) { const sv = cur; lampAt(q[0], q[1]); cur = sv; }
      }
    });
    layer(1);
    for (let i = 0; i < 5; i++) { const a = 1.2 + i * 1.25, r = lakeR(a) * 0.62; boat(LAKE.x + Math.cos(a) * r, LAKE.z + Math.sin(a) * r, -a + Math.PI / 2, 1); }

    // Timber piers in the harbour and at the lake end of the heart canal, with moored boats
    const pier = (c, rotY, len, wid, from) => {
      layer(from);
      const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.3, wid), deckM);
      m.position.set(c.x, 0.75, c.z); m.rotation.y = rotY; m.castShadow = true; m.receiveShadow = true; add(m);
    };
    I('pier');
    const hT = rad(HEART + twist(238));
    pier(polar(238, HEART - 2.2), hT, 12, 2.6, 1);
    boat(polar(234, HEART - 4.2).x, polar(234, HEART - 4.2).z, hT, 1);
    boat(polar(243, HEART - 4.2).x, polar(243, HEART - 4.2).z, hT, 1);
    boat(polar(240, HEART + 2.4).x, polar(240, HEART + 2.4).z, hT + Math.PI, 1);
    {
      let r = 330; while (!inLake(polar(r, HEART + 3.2).x, polar(r, HEART + 3.2).z)) r += 1;
      pier(polar(r + 6, HEART + 3.2), rad(HEART + twist(r)), 14, 2.8, 1);
      boat(polar(r + 7, HEART + 4.3).x, polar(r + 7, HEART + 4.3).z, rad(HEART + twist(r)), 1);
    }

    // Arched timber bridges where paths cross the river and canals, each with a small landing
    const segs = new Map();
    I(null);
    const bridgeB = (cx, cz, tdx, tdz, len, wid, from, wdx, wdz, landing = true) => {
      layer(from);
      const h = Math.min(2.6, (len < 12 ? 0.5 : 0.9) + len * 0.06), parts = [];
      const deck = new THREE.BoxGeometry(len, 0.35, wid, 20, 1, 1), railA = new THREE.BoxGeometry(len, 0.12, 0.12, 20, 1, 1);
      parts.push([deck, 0.2], [railA.clone().translate(0, 0, wid / 2), 1.25], [railA.clone().translate(0, 0, -wid / 2), 1.25]);
      for (let t = -0.5; t <= 0.5; t += 1 / 8) { const pg = new THREE.CylinderGeometry(0.06, 0.06, 1.05, 4); pg.translate(t * len, 0.7, wid / 2); parts.push([pg, 0]); const pg2 = pg.clone().translate(0, 0, -wid); parts.push([pg2, 0]); }
      parts.forEach(([g, y0]) => {
        g.translate(0, y0, 0);
        const pa = g.attributes.position;
        for (let i = 0; i < pa.count; i++) { const u = (2 * pa.getX(i)) / len; pa.setY(i, pa.getY(i) + h * (1 - u * u)); }
        g.computeVertexNormals();
        const m = new THREE.Mesh(g, deckM); m.rotation.y = Math.atan2(-tdz, tdx); m.position.set(cx, 0, cz); m.castShadow = true; add(m);
      });
      for (const sgn of [-1, 1]) lamp(cx + tdx * sgn * (len / 2 + 1) + tdz * (wid / 2 + 0.8), cz + tdz * sgn * (len / 2 + 1) - tdx * (wid / 2 + 0.8));
      // Landing beside the bridge, on the bank, with a moored boat
      const off = len / 2 - 2;
      if (landing && (segs.size % 2) === 0) {
        const lx = cx - tdx * off + wdx * (wid / 2 + 6), lz = cz - tdz * off + wdz * (wid / 2 + 6);
        const m = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 2.6), deckM); m.position.set(lx, 0.7, lz); m.rotation.y = Math.atan2(-wdz, wdx); add(m);
        boat(lx + tdx * 2.6, lz + tdz * 2.6, Math.atan2(-wdz, wdx), 1);
      }
      segs.set(segs.size, 1);
    };
    const bridge = inf('bridge', bridgeB);
    // Polyline paths and roads are indexed by segment so each water segment checks only its neighbours
    const SG = 40, sgrid = new Map();
    paths.forEach((pth) => { if (pth.ring) return; for (let i = 0; i < pth.pts.length - 1; i++) { const q = pth.pts[i], k = Math.floor(q[0] / SG) + ',' + Math.floor(q[1] / SG); if (!sgrid.has(k)) sgrid.set(k, []); sgrid.get(k).push([pth, i]); } });
    waters.forEach((w) => {
      const P = w.pts, n = P.length, done = new Set();
      for (let i = 0; i < (w.closed ? n : n - 1); i++) {
        const a = P[i], b = P[(i + 1) % n];
        const wdx0 = b[0] - a[0], wdz0 = b[1] - a[1], wl = Math.hypot(wdx0, wdz0), wdx = wdx0 / wl, wdz = wdz0 / wl;
        if (Math.hypot(a[0], a[1]) > FINAL.extent + (w.kind === 'creek' ? 200 : 60)) continue;
        const cross = (cx, cz, tdx, tdz, pth) => {
          if (inBasin(cx, cz, 4)) return;
          const sin = Math.abs(tdx * wdz - tdz * wdx);
          if (sin < 0.6) return;
          const len = Math.min(70, (2 * (a[2] + w.bank) + (w.kind === 'rill' ? 2.5 : 4)) / sin);
          bridge(cx, cz, tdx, tdz, len, pth.w + 0.8, Math.max(w.from, pth.from), wdx, wdz, w.kind !== 'rill' && !pth.road);
        };
        paths.forEach((pth) => {
          if (!pth.ring || w.closed) return;
          const f0 = Math.hypot(a[0], a[1]) - pth.r, f1 = Math.hypot(b[0], b[1]) - pth.r;
          if (f0 === 0 || (f0 < 0) === (f1 < 0)) return;
          const t = f0 / (f0 - f1), cx = a[0] + (b[0] - a[0]) * t, cz = a[1] + (b[1] - a[1]) * t, r = Math.hypot(cx, cz);
          cross(cx, cz, -cz / r, cx / r, pth);
        });
        const gx = Math.floor(a[0] / SG), gz = Math.floor(a[1] / SG);
        for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) (sgrid.get(gx + di + ',' + (gz + dj)) || []).forEach(([pth, j]) => {
          const c = pth.pts[j], d = pth.pts[j + 1], ex = d[0] - c[0], ez = d[1] - c[1];
          const den = wdx0 * ez - wdz0 * ex; if (Math.abs(den) < 1e-9) return;
          const t = ((c[0] - a[0]) * ez - (c[1] - a[1]) * ex) / den, u = ((c[0] - a[0]) * wdz0 - (c[1] - a[1]) * wdx0) / den;
          if (t < 0 || t >= 1 || u < 0 || u >= 1) return;
          const key = paths.indexOf(pth) + ':' + Math.round((c[0] + ex * u) / 25) + ',' + Math.round((c[1] + ez * u) / 25);
          if (done.has(key)) return; done.add(key);
          const L = Math.hypot(ex, ez);
          cross(a[0] + wdx0 * t, a[1] + wdz0 * t, ex / L, ez / L, pth);
        });
      }
    });
  }

  // Build trees as two instanced meshes per layer
  const trunkG = new THREE.CylinderGeometry(0.25, 0.35, 3, 6), crownG = new THREE.SphereGeometry(2.4, 10, 8);
  const coneG = new THREE.ConeGeometry(2.1, 8, 9); coneG.translate(0, 1.6, 0);
  const trunkM = mat(0x6b5038), leafM = mat(0xffffff, {map: TX.repeated(TX.leaves(), 3, 2)});
  // Leaf colours vary per tree, from deep green to olive and the odd autumn-touched crown
  const leafC = [0x56733a, 0x5f7a3d, 0x4d6a35, 0x6b8442, 0x738a3f, 0x47612f, 0x7d8a45].map((c) => new THREE.Color(c));
  const tint = new THREE.Color();
  // Planted beds where paths arrive at squares (queued while the paths were laid)
  BEDS.forEach(([x, z, from]) => {
    layer(from);
    flat(new THREE.CircleGeometry(1.8, 20), meadow, 0.34).position.set(x, 0.34, z);
    for (let k = 0; k < 3; k++) treePts.push([x + Math.cos(k * 2.1) * 0.9, z + Math.sin(k * 2.1) * 0.9, 0.3, from, 4, 2]);
  });
  // Clear trees off every path and road: a tree under a later phase's path is felled when that path is built
  {
    const PG = 8, pg = new Map(), put = (x, z, h, from, to = 4) => { const k = Math.floor(x / PG) + ',' + Math.floor(z / PG); if (!pg.has(k)) pg.set(k, []); pg.get(k).push([x, z, h, from, to]); };
    const rings = [];
    paths.forEach((pa) => {
      if (pa.ring) { rings.push(pa); return; }
      const P = pa.pts;
      for (let i = 1; i < P.length; i++) { const L = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]), n = Math.max(1, Math.ceil(L / 1.5)); for (let k = 0; k < n; k++) { const t = k / n; put(P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * t, pa.w / 2, pa.from, pa.to || 4); } }
    });
    for (let i = treePts.length - 1; i >= 0; i--) {
      const t = treePts[i], pad = 0.6 + 1.6 * t[2]; let cutAt = 99;
      const gx = Math.floor(t[0] / PG), gz = Math.floor(t[1] / PG);
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) (pg.get(gx + a + ',' + (gz + b)) || []).forEach((q) => { if (q[3] < t[4] && q[4] > t[3] && Math.hypot(t[0] - q[0], t[1] - q[1]) < q[2] + pad) cutAt = Math.min(cutAt, q[3]); });
      const R0 = Math.hypot(t[0], t[1]);
      rings.forEach((rp) => { if (rp.from < t[4] && Math.abs(R0 - rp.r) < rp.w / 2 + pad) cutAt = Math.min(cutAt, rp.from); });
      if (cutAt <= t[3]) treePts.splice(i, 1); else if (cutAt < t[4]) t[4] = cutAt;
    }
  }
  const byLayer = new Map();
  treePts.forEach((t) => { const k = t[3] + '-' + t[4]; if (!byLayer.has(k)) byLayer.set(k, []); byLayer.get(k).push(t); });
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
  byLayer.forEach((pts) => {
    layer(pts[0][3], pts[0][4]);
    const trunks = new THREE.InstancedMesh(trunkG, trunkM, pts.length);
    const crowns = new THREE.InstancedMesh(crownG, leafM, pts.length);
    const nCone = pts.filter((t) => t[5] === 1).length;
    const cones = nCone ? new THREE.InstancedMesh(coneG, leafM, nCone) : null;
    if (cones) cones.castShadow = true;
    let ci = 0;
    crowns.castShadow = true;
    pts.forEach(([x, z, s, , , , y0 = 0], i) => {
      const bush = pts[i][5] === 2;
      if (bush) m4.makeScale(0, 0, 0); else m4.compose(new THREE.Vector3(x, 1.5 * s, z), q, new THREE.Vector3(s, s, s));
      trunks.setMatrixAt(i, m4);
      const cone = pts[i][5] === 1;
      if (bush) m4.compose(new THREE.Vector3(x, 1.1 * s + y0, z), q, new THREE.Vector3(s * 1.3, s * 0.75, s * 1.3));
      else m4.compose(new THREE.Vector3(x, 4.2 * s, z), q, new THREE.Vector3(s, s * (0.9 + rnd() * 0.3), s));
      if (cone) { cones.setMatrixAt(ci, m4); m4.makeScale(0, 0, 0); }
      crowns.setMatrixAt(i, m4);
      tint.copy(leafC[Math.floor(rnd() * leafC.length)]).multiplyScalar(1.05 + rnd() * 0.25);
      if (cone) { cones.setColorAt(ci++, tint.multiplyScalar(0.72)); tint.setRGB(1, 1, 1); }
      crowns.setColorAt(i, tint);
    });
    trunks.computeBoundingSphere(); crowns.computeBoundingSphere();
    add(trunks, crowns);
    if (cones) { cones.computeBoundingSphere(); add(cones); }
  });

  // Build the instanced parts and the night glows
  instSets.forEach(({geo, m, by, info}) => by.forEach((mats, g) => {
    const im = new THREE.InstancedMesh(geo, m, mats.length); if (info) im.userData.info = info;
    mats.forEach((x, i) => im.setMatrixAt(i, x));
    im.computeBoundingSphere(); im.castShadow = geo === postG; g.add(im);
  }));
  const glowMats = new Map();
  glows.forEach((kinds, g) => kinds.forEach((pts, k) => {
    const [kind, size] = k.split('|'), [color, base] = GLOW[kind];
    if (size) {
      // Sized glows (domes, pavilion forecourts) are individual sprites
      for (let i = 0; i < pts.length; i += 3) {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({map: TX.glowDot(), color, transparent: true, opacity: kind === 'dome' ? 0.4 : 0.22, blending: THREE.AdditiveBlending, depthWrite: false}));
        sp.position.set(pts[i], pts[i + 1], pts[i + 2]); sp.scale.setScalar(+size); sp.visible = false; nightOnly.push(sp); g.add(sp);
      }
      return;
    }
    if (!glowMats.has(kind)) glowMats.set(kind, new THREE.PointsMaterial({map: TX.glowDot(), color, size: base, sizeAttenuation: true, transparent: true,
      opacity: kind === 'halo' ? 0.17 : 0.95, blending: THREE.AdditiveBlending, depthWrite: false}));
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const pm = new THREE.Points(geo, glowMats.get(kind)); pm.visible = false; pm.frustumCulled = false; nightOnly.push(pm); g.add(pm);
  }));

  // Show the layers that exist in phase n; setNight switches emissive materials and glows
  if (typeof location !== 'undefined' && /[?&]audit\b/.test(location.search)) {
    globalThis.__audit = {foot: FOOT, paths, beds: BEDS, fore: FORE, trees: treePts.map((t) => t.slice(0, 6)),
      waters: waters.map((w) => ({kind: w.kind, from: w.from, closed: w.closed, bank: w.bank, pts: w.pts}))};
  }
  const show = (n) => layers.forEach((g) => { g.visible = g.userData.from <= n && n < g.userData.to; });
  show.setNight = (on) => { nightFx.forEach((f) => f(on)); nightOnly.forEach((o) => { o.visible = on; }); };
  return show;
}

// Named camera views used to make reference renders for illustrations
export const VIEWS = {
  aerial: {pos: [330, 260, 330], target: [0, 10, 0], fov: 40, label: 'Aerial, south-east'},
  top: {pos: [0, 620, 0.01], target: [0, 0, 0], fov: 45, label: 'Top-down plan'},
  hero: {pos: [-420, 70, 300], target: [0, 30, 0], fov: 38, label: 'Low aerial from the west'},
  path: {pos: [205, 1.7, 0], target: [0, 25, 0], fov: 55, label: 'On the east radial path'},
  homes: {pos: [175, 22, 95], target: [0, 15, 0], fov: 55, label: 'Above the homes ring'},
  plaza: {pos: [0, 1.7, 75], target: [0, 32, 0], fov: 62, label: 'From the plaza edge'},
  solar: {pos: [120, 8, 210], target: [0, 20, -40], fov: 55, label: 'From the solar ring'},
  terraces: {pos: [-505, 3, -190], target: [-434, 6, -335], fov: 60, label: 'Between the Phase 3 terraces'},
  lake: {pos: [154, 80, 137], target: [89, 0, 401], fov: 50, label: 'Over the heart canal and the lake'},
  canal: {pos: [616, 3, 395], target: [693, 3, 297], fov: 60, label: 'On a canal quay, Phase 3'},
  water: {pos: [900, 420, 300], target: [-100, 0, 700], fov: 50, label: 'Lake, creek and river from the east'},
  terracesAir: {pos: [-427, 45, -195], target: [-413, 6, -378], fov: 55, label: 'Above the Phase 3 terraces'},
  heart: {pos: [0, 48, 343], target: [6, 18, 19], fov: 50, label: 'Along the heart rill to the spire'},
  utilities: {pos: [-500, 150, -870], target: [-618, 0, -1029], fov: 50, label: 'North utility campus in the feng shui woods'},
  watermouth: {pos: [-60, 90, 960], target: [70, 0, 1085], fov: 55, label: 'The water mouth: wetland, grove and bridge'},
  harbour: {pos: [-10, 110, 150], target: [40, 0, 270], fov: 55, label: 'The harbour crescent and the heart canal'},
  entrances: {pos: [150, 62, 175], target: [62, 0, 70], fov: 50, label: 'Dome entrances on the radial paths'},
  builds: {pos: [60, 16, 200], target: [5, 0, 155], fov: 50, label: 'Four ways to build a home'},
  courtyards: {pos: [90, 45, 330], target: [0, 0, 250], fov: 50, label: 'Courtyard clusters, Phase 2'},
  dome: {pos: [91, 44, 122], target: [50, 3, 97], fov: 52, label: 'Into a communosphere through its oculus'},
  yard: {pos: [-118, 55, -128], target: [-205, 0, -200], fov: 50, label: 'The water yard behind the hamlet, growing with each phase'},
  reedbeds: {pos: [205, 60, 22], target: [272, 0, 92], fov: 52, label: 'The treatment garden downhill of the hamlet'},
  amphitheatre: {pos: [80, 16, 66], target: [28, 10, 22], fov: 55, label: 'The plaza amphitheatre and fire circle'},
  green: {pos: [-118, 50, 95], target: [-180, 0, 175], fov: 55, label: 'The village green, field and playground'},
  lakeside: {pos: [-5, 60, 250], target: [-75, 0, 370], fov: 55, label: 'Swimming ponds and retreat cabins by the lake'},
  orchard: {pos: [-300, 55, -30], target: [-400, 0, -95], fov: 55, label: 'The orchard and food forest, planted in Phase 1'},
  school: {pos: [-200, 60, 230], target: [-280, 0, 300], fov: 55, label: 'The village primary school, Phase 2'},
  sport: {pos: [380, 60, -200], target: [313, 0, -286], fov: 55, label: 'The village sports field, Phase 2'},
  food: {pos: [60, 60, -330], target: [5, 0, -425], fov: 55, label: 'Aquaponics, food hall and fire station, Phase 2'},
  sportspark: {pos: [-170, 190, 560], target: [-360, 0, 790], fov: 55, label: 'The town sports park, Phase 3'},
  farm: {pos: [-470, 45, -240], target: [-554, 8, -320], fov: 55, label: 'The vertical farm, Phase 3'},
  hub: {pos: [79, 45, -208], target: [-31, 0, -248], fov: 50, label: 'Phase 1 mobility hub on the north road'},
  work: {pos: [234, 70, -217], target: [107, 0, -264], fov: 50, label: 'A Phase 2 neighbourhood work hub'},
};

// Wide views scale with the phase so the whole city stays in frame
const WIDE = ['aerial', 'top', 'hero'];
export function viewFor(name, phase = 1) {
  const v = VIEWS[name] || VIEWS.aerial;
  const k = WIDE.includes(name) ? (PHASES[phase] || PHASES[1]).view : 1;
  return {...v, pos: v.pos.map((c) => c * k), target: [v.target[0], v.target[1] * Math.sqrt(k), v.target[2]]};
}

export function start(canvas, {interactive = true, view = 'aerial', width, height, phase = 1, time = 'day'} = {}) {
  // A logarithmic depth buffer keeps the stacked ground layers from flickering at a distance
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true, preserveDrawingBuffer: true, logarithmicDepthBuffer: true});
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setPixelRatio(interactive ? Math.min(window.devicePixelRatio, 2) : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const W = width || canvas.clientWidth, H = height || canvas.clientHeight;
  renderer.setSize(W, H, false);

  TX.setAnisotropy(Math.min(8, renderer.capabilities.getMaxAnisotropy()));
  const scene = new THREE.Scene();
  scene.background = TX.sky('#c9dbe6');
  scene.fog = new THREE.Fog(0xc9dbe6, 700, 2600);
  const hemi = new THREE.HemisphereLight(0xeef4f8, 0x6b6a4a, 1.3);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.6);
  sun.castShadow = true;
  sun.shadow.bias = -0.0004;
  sun.shadow.mapSize.set(4096, 4096);
  scene.add(sun);
  // A small sky environment for reflections on glass, water and solar panels
  const pmrem = new THREE.PMREMGenerator(renderer);
  const skyScene = new THREE.Scene();
  const skyGeo = new THREE.SphereGeometry(10, 32, 16), cols = [], top = new THREE.Color(0x6f9cc4), hor = new THREE.Color(0xdfe8ee), gnd = new THREE.Color(0x6d7a50);
  for (let i = 0; i < skyGeo.attributes.position.count; i++) {
    const y = skyGeo.attributes.position.getY(i) / 10, c = y > 0 ? hor.clone().lerp(top, Math.pow(y, 0.6)) : hor.clone().lerp(gnd, Math.min(1, -y * 4));
    cols.push(c.r, c.g, c.b);
  }
  skyGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  skyScene.add(new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({vertexColors: true, side: THREE.BackSide})));
  const env = pmrem.fromScene(skyScene, 0.02).texture;
  const showPhase = buildCity(scene, env);

  const camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 6000);
  // Stars and moon sit on a sphere centred on the camera, just inside the far plane
  const sky = new THREE.Group(); sky.visible = false; scene.add(sky);
  scene.onBeforeRender = () => sky.position.copy(camera.position);
  {
    const pts = [], r = (() => { let s = 99; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
    for (let i = 0; i < 2600; i++) { const u = r() * 2 - 1, a = r() * Math.PI * 2, y = Math.abs(u) * 0.95 + 0.05, k = Math.sqrt(1 - y * y); pts.push(Math.cos(a) * k, y, Math.sin(a) * k); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    sky.add(new THREE.Points(g, new THREE.PointsMaterial({color: 0xdfe8ff, size: 1.6, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.85, depthWrite: false})));
    const moon = new THREE.Sprite(new THREE.SpriteMaterial({map: TX.glowDot(), color: 0xf2f0e4, fog: false, depthWrite: false}));
    moon.position.set(-0.55, 0.45, -0.7).normalize(); moon.scale.setScalar(0.06); sky.add(moon);
  }
  let night = time === 'night';
  const controls = interactive ? new OrbitControls(camera, canvas) : null;
  if (controls) { controls.enableDamping = true; controls.maxPolarAngle = Math.PI / 2 - 0.02; }

  let curPhase = phase, curView = view;
  const setView = (name) => {
    curView = name;
    const v = viewFor(name, curPhase);
    camera.fov = v.fov;
    camera.position.set(...v.pos);
    camera.lookAt(...v.target);
    camera.updateProjectionMatrix();
    if (controls) { controls.target.set(...v.target); controls.update(); }
    renderer.render(scene, camera);
  };
  // Switching phase only turns layers on or off; the light, fog and framing follow the city's size
  const setPhase = (n, {keepCamera = false} = {}) => {
    curPhase = PHASES[n] ? n : 1;
    const F = PHASES[curPhase];
    showPhase(curPhase);
    scene.fog.near = (night ? 500 : 700) * F.view; scene.fog.far = (night ? 3400 : 2600) * F.view;
    sky.scale.setScalar(5400 * F.view);
    sun.position.set(300, 420, 200).multiplyScalar(F.view);
    sun.shadow.normalBias = 0.6 * F.view;
    const ext = F.extent + 100;
    Object.assign(sun.shadow.camera, {left: -ext, right: ext, top: ext, bottom: -ext, near: 10, far: 1400 * F.view});
    sun.shadow.camera.updateProjectionMatrix();
    camera.far = 6000 * F.view;
    if (keepCamera) { camera.updateProjectionMatrix(); renderer.render(scene, camera); } else setView(curView);
  };
  // Day and night: lights, sky, fog and the city's own lighting
  const setTime = (t) => {
    night = t === 'night';
    showPhase.setNight(night);
    scene.background = night ? TX.nightSky() : TX.sky('#c9dbe6');
    scene.fog.color.set(night ? 0x14223a : 0xc9dbe6);
    hemi.color.set(night ? 0x5a74a8 : 0xeef4f8); hemi.groundColor.set(night ? 0x141a14 : 0x6b6a4a); hemi.intensity = night ? 0.75 : 1.3;
    sun.color.set(night ? 0x9fb6e8 : 0xfff1dc); sun.intensity = night ? 0.65 : 2.6;
    renderer.toneMappingExposure = night ? 1.1 : 0.95;
    sky.visible = night;
    setPhase(curPhase, {keepCamera: true});
  };
  setPhase(curPhase);
  setTime(time);

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  if (interactive) {
    window.addEventListener('resize', resize);
    // Fly with the arrow keys or WASD: forward, back and sideways on the horizontal plane, keeping height and
    // view direction. Speed follows height above the ground, so a walk-level view moves at a brisk walk and an
    // aerial view covers the city in seconds; Shift goes three times faster.
    const held = new Set();
    const FLY = {ArrowUp: [0, 1], KeyW: [0, 1], ArrowDown: [0, -1], KeyS: [0, -1], ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0]};
    const typing = (e) => /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) || e.target.isContentEditable;
    window.addEventListener('keydown', (e) => {
      if (!FLY[e.code] || typing(e) || e.metaKey || e.ctrlKey || e.altKey) return;
      held.add(e.code); e.preventDefault();
    });
    window.addEventListener('keyup', (e) => held.delete(e.code));
    window.addEventListener('blur', () => held.clear());
    let fast = false;
    window.addEventListener('keydown', (e) => { if (e.key === 'Shift') fast = true; });
    window.addEventListener('keyup', (e) => { if (e.key === 'Shift') fast = false; });
    const fwd = new THREE.Vector3(), side = new THREE.Vector3(), step = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
    let last = performance.now();
    const fly = (dt) => {
      let f = 0, r = 0;
      for (const k of held) { f += FLY[k][1]; r += FLY[k][0]; }
      if (!f && !r) return;
      camera.getWorldDirection(fwd); fwd.y = 0;
      if (fwd.lengthSq() < 1e-6) fwd.set(controls.target.x - camera.position.x, 0, controls.target.z - camera.position.z);
      if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
      fwd.normalize(); side.crossVectors(fwd, up).normalize();
      const speed = Math.min(600, Math.max(12, camera.position.y * 0.9)) * (fast ? 3 : 1);
      step.copy(fwd).multiplyScalar(f).addScaledVector(side, r);
      if (step.lengthSq() > 1) step.normalize();
      step.multiplyScalar(speed * dt);
      // stay within the land around the city
      const lim = PHASES[curPhase].extent * 3 + 1500, nx = camera.position.x + step.x, nz = camera.position.z + step.z;
      if (Math.hypot(nx, nz) > lim && Math.hypot(nx, nz) > Math.hypot(camera.position.x, camera.position.z)) return;
      camera.position.add(step); controls.target.add(step);
    };
    const loop = (now = performance.now()) => {
      fly(Math.min(0.1, (now - last) / 1000)); last = now;
      controls.update(); renderer.render(scene, camera); requestAnimationFrame(loop);
    };
    loop();
  }
  // Click picking: the nearest tagged structure under a screen point (x, y in -1..1). Trees, lamps and night
  // glows let the ray pass on; bare ground, paths and roads stop it, so nothing hidden behind them is picked.
  const ray = new THREE.Raycaster();
  const shown = (o) => { for (; o; o = o.parent) if (!o.visible) return false; return true; };
  const pick = (x, y) => {
    ray.setFromCamera(new THREE.Vector2(x, y), camera);
    // Only solid meshes that can be picked or that hide what is behind them; untagged instanced parts
    // (trees, lamps) are skipped up front, which keeps a click fast
    const objs = [];
    scene.traverseVisible((o) => { if (o.isMesh && !(o.isInstancedMesh && !o.userData.info)) objs.push(o); });
    for (const h of ray.intersectObjects(objs, false)) {
      const o = h.object;
      if (!shown(o)) continue;
      if (o.userData.info) { let g = o; while (g && g.userData.from === undefined) g = g.parent; return {key: o.userData.info, from: g ? g.userData.from : 1, point: h.point.toArray()}; }
      if (o.isInstancedMesh) continue;
      return null;
    }
    return null;
  };
  return {setView, setPhase, setTime, pick, camera};
}
