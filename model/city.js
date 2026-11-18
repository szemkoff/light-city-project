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
    domes: [[30, 40], [150, 40], [270, 40]],
    homes: 1, extent: 222, view: 1},
  2: {name: 'Phase 2 · Village', people: '1,500 residents', area: 'about 160 acres',
    spireSections: 5,
    inner: [[105, 10], [225, 7], [345, 7], [45, 8], [165, 8], [285, 8]],
    domes: [[30, 40], [150, 40], [270, 40], [90, 52], [210, 52], [330, 52], [0, 52], [180, 52]],
    homes: 2, clusters: [255, 315], belts: [[360, 460]], extent: 460, view: 1.9},
  3: {name: 'Phase 3 · Town', people: '8,000+ residents', area: 'about 1.2 square miles',
    spireSections: 8,
    inner: [[105, 10], [225, 7], [345, 7], [45, 8], [165, 8], [285, 8], [15, 7], [195, 7]],
    domes: [[30, 40], [150, 40], [270, 40], [90, 52], [210, 52], [330, 52], [0, 52], [180, 52], [60, 52], [120, 52], [240, 52], [300, 52]],
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
const polar = (r, deg) => new THREE.Vector3(Math.cos(rad(deg)) * r, 0, -Math.sin(rad(deg)) * r);

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
  const add = (...o) => cur.add(...o);
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
    if (!instSets.has(name)) instSets.set(name, {geo, m, by: new Map()});
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
  const lamp = (x, z) => {
    const v = new THREE.Vector3(x, 0, z);
    place('post', postG, postM, v); place('head', headG, headM, v);
    glow('lamp', x, 4.3, z); glow('halo', x, 0.8, z);
  };

  // Textured materials: ground and paths are mapped in world metres, objects by their own UVs
  const ground = (color, tex, tile, macro) => TX.worldMapped(mat(color), tex, tile, macro);
  const shiny = (m) => { if (env) { m.envMap = env; m.envMapIntensity = 0.9; atNight(m, {envMapIntensity: 0.12}); } return m; };
  const flat = (geo, m, y) => { const o = new THREE.Mesh(geo, m); o.rotation.x = -Math.PI / 2; o.position.y = y; o.receiveShadow = true; add(o); return o; };

  // Trees are instanced per layer so the town phase stays fast
  const treePts = [];
  let tFrom = 1, tTo = 4;
  const tree = (x, z, s = 1, kind = 0) => treePts.push([x, z, s, tFrom, tTo, kind]);
  const trees = (from, to = 4) => { tFrom = from; tTo = to; };

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
  const ringPath = (r, w = 3.2) => {
    flat(new THREE.RingGeometry(r - w / 2, r + w / 2, Math.max(160, Math.round(r))), path, 0.3);
    if (r < 30) return;
    const n = Math.max(8, Math.round((2 * Math.PI * r) / (r < 250 ? 26 : 42)));
    for (let i = 0; i < n; i++) { const q = polar(r + w / 2 + 1.2, (i + 0.5) * (360 / n)); lamp(q.x, q.z); }
  };
  P.rings.slice(0, 4).forEach((ring) => ringPath(ring.r));
  layer(2); ringPath(P.rings[4].r); ringPath(360, 4);
  layer(3); ringPath(460, 4); ringPath(760, 4);

  // Radial paths: 12 from the plaza, extended outward by each phase, plus 12 more in the town's outer rings
  const radial = (deg, r0, r1, w) => {
    const len = r1 - r0;
    const m = flat(new THREE.PlaneGeometry(len, w), path, 0.31);
    m.rotation.z = rad(deg);
    const mid = polar(r0 + len / 2, deg);
    m.position.x = mid.x; m.position.z = mid.z;
    for (let d = r0 + 14; d < r1 - 6; d += r0 > 300 ? 44 : 30) { const q = polar(d, deg).add(polar(w / 2 + 1.2, deg + 90)); lamp(q.x, q.z); }
  };
  [[1, P.rings[0].r, PHASES[1].extent + 20], [2, PHASES[1].extent + 18, PHASES[2].extent + 20], [3, PHASES[2].extent + 18, FINAL.extent + 20]]
    .forEach(([n, r0, r1]) => { layer(n); for (let i = 0; i < P.radialPaths; i++) radial(i * 30, r0, r1, 4); });
  layer(3);
  for (let i = 0; i < 12; i++) radial(15 + i * 30, FINAL.town[0], FINAL.extent + 20, 3.2);

  // Plaza: stone with a ring-shaped reflecting pool
  layer(1);
  flat(new THREE.CircleGeometry(P.rings[0].r - 1.6, 96), ground(0xddd2ba, TX.paving(), 5, 0), 0.26);
  const pool = flat(new THREE.RingGeometry(22, 29.5, 96), shiny(ground(0x7f9aa6, TX.water(), 9, 0)), 0.29);
  Object.assign(pool.material, {roughness: 0.08, metalness: 0.25});
  atNight(pool.material, warm(0x2f7f9a, 0.45));
  for (let i = 0; i < 24; i++) { const q = polar(30.5, i * 15); glow('cool', q.x, 0.6, q.z); }
  pool.receiveShadow = false;

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

  // Phase in which an item first appears in a phase list
  const firstIn = (key, match) => [1, 2, 3].find((n) => (PHASES[n][key] || []).some(match));

  // Temple and learning pavilions (ring 2), between the radial paths. The first is the temple.
  const pavCache = new Map();
  const pavM = (color) => { if (!pavCache.has(color)) pavCache.set(color, atNight(mat(color, {roughness: 0.65, map: TX.repeated(TX.timber(14), 8, 2)}), warm(0x8a4d1c, 0.45))); return pavCache.get(color); };
  const stoneM = mat(0xc9bea8, {map: TX.repeated(TX.paving(), 6, 0.25)});
  const pavilion = (p, size, color = 0xd4a670) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), pavM(color));
    d.position.copy(p); d.castShadow = true; add(d);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(size + 2, size + 2, 0.6, 32), stoneM);
    base.position.copy(p).setY(0.3); add(base);
    for (let i = 0; i < 8; i++) { const q = p.clone().add(polar(size + 1.6, i * 45)); glow('lamp', q.x, 0.9, q.z); }
    glow('halo', p.x, 0.8, p.z, size * 3.2);
  };
  FINAL.inner.forEach(([deg, size]) => { layer(firstIn('inner', ([d]) => d === deg)); pavilion(polar(58, deg), size); });

  // Communosphere domes: glazed geodesic shell with timber ribs and a green-roof cap
  const half = (r, detail) => {
    const g = new THREE.IcosahedronGeometry(r, detail);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < 0) pos.setY(i, 0);
    g.computeVertexNormals();
    return g;
  };
  const glassM = atNight(shiny(mat(0xa9c2cb, {roughness: 0.08, metalness: 0.35, transparent: true, opacity: 0.82, map: TX.repeated(TX.glass(), 3, 2)})), warm(0xffb768, 0.2));
  const ribM = new THREE.LineBasicMaterial({color: 0xa0743f});
  const capM = mat(0x7a9550, {map: TX.repeated(TX.grass(13), 4, 1)});
  const dome = (p, diameter, squash = 1) => {
    const r = diameter / 2;
    const g = new THREE.Mesh(half(r, diameter > 60 ? 4 : 3), glassM);
    g.scale.y = squash; g.position.copy(p); g.castShadow = true; add(g);
    const ribs = new THREE.LineSegments(new THREE.WireframeGeometry(half(r + 0.15, diameter > 60 ? 4 : 3)), ribM);
    ribs.scale.y = squash; ribs.position.copy(p); add(ribs);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(r + 0.3, 32, 8, 0, Math.PI * 2, 0, 0.55), capM);
    cap.scale.y = squash; cap.position.copy(p); add(cap);
    // A garden inside each dome, and a warm glow from within at night
    const keep = [tFrom, tTo]; trees(cur.userData.from, cur.userData.to);
    for (let k = 0; k < 14; k++) { const a = k * 137.5, d = r * 0.62 * Math.sqrt((k + 0.5) / 14), q = p.clone().add(polar(d, a)); tree(q.x, q.z, 0.75 + (k % 3) * 0.12); }
    [tFrom, tTo] = keep;
    glow('dome', p.x, r * 0.35 * squash, p.z, diameter * 1.3);
  };
  // Each dome plot is meadow and tree nursery until its dome is built; the young trees are then moved out
  const meadow = ground(0xc2ca86, TX.meadow(), 10, 0);
  for (let deg = 0; deg < 360; deg += 30) {
    const p = polar(P.domeRing, deg);
    const built = firstIn('domes', ([d]) => d === deg) || 4;
    if (built > 1) {
      layer(1, built); trees(1, built);
      flat(new THREE.CircleGeometry(20, 40), meadow, 0.27).position.set(p.x, 0.27, p.z);
      for (let x = -9; x <= 9; x += 4.5) for (let z = -9; z <= 9; z += 4.5) if (x * x + z * z < 110) tree(p.x + x, p.z + z, 0.4);
    }
    if (built < 4) { const d = FINAL.domes.find(([a]) => a === deg)[1]; layer(built); dome(p, d, d > 45 ? 0.8 : 1); }
  }

  // Earth homes with green roofs (ring 4), between the radial paths
  const winG = new THREE.BoxGeometry(1.5, 0.9, 1);
  const winM = atNight(mat(0x39444c, {roughness: 0.15, metalness: 0.3}), warm(0xffb55c, 2.2));
  const earthM = mat(0xd39a70, {roughness: 0.95, map: TX.repeated(TX.earth(), 5, 1.4)});
  const earthHome = (p, deg, size, sx = 1.3) => {
    const h = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), earthM);
    h.scale.set(sx, 0.75, 1); h.rotation.y = rad(deg); h.position.copy(p); h.castShadow = true; add(h);
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
  // Fixed home plots: five per 30° sector. Phase 1 builds 30 of them, later phases fill the gaps; none move.
  for (let sec = 0; sec < 12; sec++) {
    [[sec * 30 + 10, 1], [sec * 30 + 20, 1], [sec * 30 + 15, sec % 2 ? 3 : 1], [sec * 30 + 5, 2], [sec * 30 + 25, 2]].forEach(([deg, n]) => {
      layer(n); trees(n);
      earthHome(polar(P.homes.radius, deg), deg, P.homes.size);
      const q = polar(P.homes.radius + 12, deg + 2.5); tree(q.x, q.z, 0.7);
    });
  }

  // Solar arrays with meadow beneath (ring 5)
  layer(1);
  const pv = shiny(mat(0xffffff, {roughness: 0.25, metalness: 0.45, map: TX.solar()}));
  const array = (p, deg, w = 22, d = 9) => {
    const a = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, d), pv);
    a.position.copy(p).setY(2.2); a.rotation.y = rad(deg) + Math.PI / 2; a.rotateX(-0.45); a.castShadow = true; add(a);
  };
  for (let i = 0; i < P.solar.count; i++) { const deg = (i + 0.5) * (360 / P.solar.count); array(polar(P.solar.radius, deg), deg); }

  // Phase 2: village neighborhoods of earth-home courtyard clusters (six homes round a shared garden)
  layer(2); trees(2);
  const garden = ground(0xbec894, TX.grass(19), 8, 0);
  FINAL.clusters.forEach((r) => {
    for (let i = 0; i < 24; i++) {
      const deg = 7.5 + i * 15;
      const c = polar(r, deg);
      flat(new THREE.CircleGeometry(9, 32), garden, 0.27).position.set(c.x, 0.27, c.z);
      for (let k = 0; k < 6; k++) {
        const a = deg + k * 60;
        earthHome(c.clone().add(polar(15, a)), a + 90, 4, 1.2);
      }
      tree(c.x, c.z, 0.9);
    }
    ringPath(r + 30, 2.4);
  });

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
      const a = rad(ang(t)), c = polar(rc(t), ang(t)), u = [Math.cos(a), -Math.sin(a)], tn = [-Math.sin(a), -Math.cos(a)];
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
    const n = r > 360 ? 24 : 12, step = 360 / n, gap = (8 / r) * (180 / Math.PI), split = (7 / r) * (180 / Math.PI);
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
  // District hubs: large communosphere domes with a small temple and a market green
  D.deg.forEach((deg) => {
    const c = polar(D.r, deg);
    flat(new THREE.CircleGeometry(D.d / 2 + 22, 48), ground(0xddd2ba, TX.paving(), 5, 0), 0.27).position.set(c.x, 0.27, c.z);
    dome(c, D.d, 0.7);
    pavilion(c.clone().add(polar(D.d / 2 + 12, deg + 90)), 6);
  });

  // Food and energy belts: agrivoltaic arrays, solar greenhouses and food-forest rows by sector
  const gh = atNight(shiny(mat(0xdbe7e9, {roughness: 0.12, metalness: 0.15, transparent: true, opacity: 0.8, map: TX.repeated(TX.glass(), 2, 1)})), warm(0xd59cff, 0.45));
  FINAL.belts.forEach(([b0, b1]) => {
    const from = firstIn('belts', ([x]) => x === b0);
    layer(from); trees(from);
    const sectors = 24;
    for (let s = 0; s < sectors; s++) {
      const kind = s % 3;
      for (let r = b0 + 22; r < b1 - 12; r += kind === 0 ? 16 : 26) {
        const span = 15 - (24 / r) * (180 / Math.PI) * 2;
        const count = Math.max(1, Math.floor((rad(span) * r) / (kind === 0 ? 26 : 34)));
        for (let k = 0; k < count; k++) {
          const deg = s * 15 + (24 / r) * (180 / Math.PI) + (k + 0.5) * (span / count);
          const p = polar(r, deg);
          if (kind === 0) array(p, deg, 22, 7);
          else if (kind === 1) {
            const g = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 26, 16, 1, false, 0, Math.PI), gh);
            g.rotation.z = Math.PI / 2; g.rotation.y = rad(deg); g.position.copy(p); g.castShadow = true; add(g);
          } else for (let t = -1; t <= 1; t++) { const q = polar(r, deg + t * (9 / r) * (180 / Math.PI)); tree(q.x, q.z, 0.8); }
        }
      }
    }
  });

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
  // Wild woodland: one forest round the city; each phase clears only the land its new rings need
  const w0 = PHASES[1].extent + 13, w1 = FINAL.extent + 1200;
  for (let i = 0; i < 4600; i++) {
    const deg = rnd() * 360, r = Math.sqrt(w0 * w0 + rnd() * (w1 * w1 - w0 * w0)), s = 1 + rnd() * 0.8;
    trees(1, [2, 3].find((n) => r < PHASES[n].extent + 13) || 4);
    const p = polar(r, deg); tree(p.x, p.z, s, (i * 7919) % 10 < 3 ? 1 : 0);
  }
  // Distant hills: scenery that keeps its distance from the frame in each phase's view
  const hillM = mat(0x75865a, {map: TX.repeated(TX.grass(29), 10, 3)});
  [1, 2, 3].forEach((n) => {
    layer(n, n + 1);
    const F = PHASES[n];
    for (let i = 0; i < 9; i++) {
      const deg = i * 40 + rnd() * 20;
      const p = polar(F.extent + 1280 * Math.sqrt(F.view) + rnd() * 400, deg);
      const hg = new THREE.SphereGeometry((500 + rnd() * 300) * Math.sqrt(F.view), 48, 20), hp = hg.attributes.position, ph = rnd() * 6;
      for (let k = 0; k < hp.count; k++) {
        const x = hp.getX(k), y = hp.getY(k), z = hp.getZ(k), L = Math.hypot(x, y, z) || 1;
        const f = 1 + 0.07 * Math.sin(3 * x / L + ph) * Math.cos(2.5 * z / L) + 0.04 * Math.sin(7 * z / L + ph * 2) + 0.025 * Math.cos(11 * x / L);
        hp.setXYZ(k, x * f, y * f, z * f);
      }
      hg.computeVertexNormals();
      const hill = new THREE.Mesh(hg, hillM);
      hill.scale.y = 0.22 + rnd() * 0.12; hill.position.copy(p); add(hill);
    }
  });

  // Build trees as two instanced meshes per layer
  const trunkG = new THREE.CylinderGeometry(0.25, 0.35, 3, 6), crownG = new THREE.SphereGeometry(2.4, 10, 8);
  const coneG = new THREE.ConeGeometry(2.1, 8, 9); coneG.translate(0, 1.6, 0);
  const trunkM = mat(0x6b5038), leafM = mat(0xffffff, {map: TX.repeated(TX.leaves(), 3, 2)});
  // Leaf colours vary per tree, from deep green to olive and the odd autumn-touched crown
  const leafC = [0x56733a, 0x5f7a3d, 0x4d6a35, 0x6b8442, 0x738a3f, 0x47612f, 0x7d8a45].map((c) => new THREE.Color(c));
  const tint = new THREE.Color();
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
    pts.forEach(([x, z, s], i) => {
      const bush = pts[i][5] === 2;
      if (bush) m4.makeScale(0, 0, 0); else m4.compose(new THREE.Vector3(x, 1.5 * s, z), q, new THREE.Vector3(s, s, s));
      trunks.setMatrixAt(i, m4);
      const cone = pts[i][5] === 1;
      if (bush) m4.compose(new THREE.Vector3(x, 1.1 * s, z), q, new THREE.Vector3(s * 1.3, s * 0.75, s * 1.3));
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
  instSets.forEach(({geo, m, by}) => by.forEach((mats, g) => {
    const im = new THREE.InstancedMesh(geo, m, mats.length);
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
  terraces: {pos: [-361, 3, 401], target: [-232, 6, 497], fov: 60, label: 'Between the Phase 3 terraces'},
  terracesAir: {pos: [-289, 45, 370], target: [-192, 6, 526], fov: 55, label: 'Above the Phase 3 terraces'},
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
    const loop = () => { controls.update(); renderer.render(scene, camera); requestAnimationFrame(loop); };
    loop();
  }
  return {setView, setPhase, setTime};
}
