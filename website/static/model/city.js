// Light City reference model, Phases 1–3.
// Source of truth: docs/design/architecture.md (Circular form) and img/diagrams/city-layout.svg.
// Units are metres. North is -Z. Angles are measured counter-clockwise from east, as on the plan.
import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';

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

export function buildCity(scene, phase = 1) {
  const F = PHASES[phase] || PHASES[1];
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({color, roughness: 0.9, metalness: 0, ...o});
  const flat = (geo, m, y) => { const o = new THREE.Mesh(geo, m); o.rotation.x = -Math.PI / 2; o.position.y = y; o.receiveShadow = true; scene.add(o); return o; };

  // Trees are instanced so the town phase stays fast
  const treePts = [];
  const tree = (x, z, s = 1) => treePts.push([x, z, s]);

  // Wild land beyond the city
  flat(new THREE.CircleGeometry(F.extent + 3600, 96), mat(0x7f8f58), 0);

  // Outer bands added by later phases (drawn first so the core sits on top)
  // Bands outermost first: food and energy belts are darker, neighborhoods lighter
  if (F.belts) {
    const bands = [];
    F.belts.forEach(([b0, b1]) => bands.push([b1, 0x8d9d64], [b0, 0x98ab72]));
    bands.sort((x, y) => y[0] - x[0]).forEach(([r, c], i) => flat(new THREE.CircleGeometry(r, 200), mat(c), 0.004 + i * 0.002));
  }

  // Core ring bands, outermost first
  [...P.rings].reverse().forEach((ring, i) => flat(new THREE.CircleGeometry(ring.r, 128), mat(ring.color), 0.02 + i * 0.02));

  // Ring paths (gravel)
  const path = mat(0xe6dcc6);
  const ringPath = (r, w = 3.2) => flat(new THREE.RingGeometry(r - w / 2, r + w / 2, Math.max(160, Math.round(r))), path, 0.15);
  P.rings.slice(0, 4).forEach((ring) => ringPath(ring.r));
  if (F.belts) { ringPath(P.rings[4].r); F.belts.forEach(([b0, b1]) => { ringPath(b0, 4); if (b1 < F.extent) ringPath(b1, 4); }); }

  // Radial paths: 12 from the plaza, plus 12 more in the town's outer rings
  const radial = (deg, r0, r1, w) => {
    const len = r1 - r0;
    const m = flat(new THREE.PlaneGeometry(len, w), path, 0.16);
    m.rotation.z = rad(deg);
    const mid = polar(r0 + len / 2, deg);
    m.position.x = mid.x; m.position.z = mid.z;
  };
  const edge = F.extent + 20;
  for (let i = 0; i < P.radialPaths; i++) radial(i * 30, P.rings[0].r, edge, phase === 1 ? 3.2 : 4.5);
  if (F.town) for (let i = 0; i < 12; i++) radial(15 + i * 30, F.town[0], edge, 3.2);

  // Plaza: stone with a ring-shaped reflecting pool
  flat(new THREE.CircleGeometry(P.rings[0].r - 1.6, 96), mat(0xcfc3aa), 0.18);
  const pool = flat(new THREE.RingGeometry(22, 29.5, 96), mat(0x7f9aa6, {roughness: 0.15, metalness: 0.2}), 0.22);
  pool.receiveShadow = false;

  // Spire: stacked hyperboloid lattice sections of straight timber and steel members.
  // The foundation, base and 72 m deck are built in Phase 1; later phases add sections and lift the solar crown.
  const timber = mat(0xb98a55, {roughness: 0.7});
  const steel = mat(0x8d8a84, {roughness: 0.5, metalness: 0.4});
  const SP = SPIRE, nSec = F.spireSections, top = nSec * SP.section, legs = 24;
  const rAt = (h) => { const k = Math.min(h / SP.section, SP.radii.length - 1.001), i = Math.floor(k); return SP.radii[i] + (SP.radii[i + 1] - SP.radii[i]) * (k - i); };
  for (let sct = 0; sct < nSec; sct++) {
    const h0 = sct * SP.section, h1 = h0 + SP.section, r0 = SP.radii[sct], r1 = SP.radii[sct + 1];
    for (let i = 0; i < legs; i++) for (const dir of [1, -1]) {
      const a = (i / legs) * Math.PI * 2, tw = dir * Math.PI / 5;
      const b0 = new THREE.Vector3(Math.cos(a) * r0, h0, Math.sin(a) * r0);
      const t1 = new THREE.Vector3(Math.cos(a + tw) * r1, h1, Math.sin(a + tw) * r1);
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, b0.distanceTo(t1), 5), timber);
      leg.position.copy(b0.clone().add(t1).multiplyScalar(0.5));
      leg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), t1.clone().sub(b0).normalize());
      leg.castShadow = true;
      scene.add(leg);
    }
    for (const h of [h0, h1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rAt(h), 0.35, 6, 48), steel);
      ring.rotation.x = Math.PI / 2; ring.position.y = h; scene.add(ring);
    }
  }
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(SP.radii[0] + 1, SP.radii[0] + 1.5, 0.8, 48), mat(0xbdb29c));
  foot.position.y = 0.4; scene.add(foot);
  const dr = rAt(SP.deck);
  const deck = new THREE.Mesh(new THREE.CylinderGeometry(dr + 2.5, dr + 2, 3, 40), mat(0xd8cfbf));
  deck.position.y = SP.deck; deck.castShadow = true; scene.add(deck);
  const cr = rAt(top);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(cr + 5, cr + 0.5, 1.2, 40), mat(0x2c3a4a, {roughness: 0.3, metalness: 0.5}));
  crown.position.y = top; crown.castShadow = true; scene.add(crown);

  // Temple and learning pavilions (ring 2), between the radial paths. The first is the temple.
  const pavilion = (p, size, color = 0xc79a62) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat(color, {roughness: 0.6}));
    d.position.copy(p); d.castShadow = true; scene.add(d);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(size + 2, size + 2, 0.6, 32), mat(0xbdb29c));
    base.position.copy(p).setY(0.3); scene.add(base);
  };
  F.inner.forEach(([deg, size]) => pavilion(polar(58, deg), size));

  // Communosphere domes: glazed geodesic shell with timber ribs and a green-roof cap
  const half = (r, detail) => {
    const g = new THREE.IcosahedronGeometry(r, detail);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < 0) pos.setY(i, 0);
    g.computeVertexNormals();
    return g;
  };
  const glassM = mat(0x9fb6bf, {roughness: 0.15, metalness: 0.3, transparent: true, opacity: 0.85});
  const ribM = new THREE.LineBasicMaterial({color: 0xa0743f});
  const capM = mat(0x6f8a4a);
  const dome = (p, diameter, squash = 1) => {
    const r = diameter / 2;
    const g = new THREE.Mesh(half(r, diameter > 60 ? 4 : 3), glassM);
    g.scale.y = squash; g.position.copy(p); g.castShadow = true; scene.add(g);
    const ribs = new THREE.LineSegments(new THREE.WireframeGeometry(half(r + 0.15, diameter > 60 ? 4 : 3)), ribM);
    ribs.scale.y = squash; ribs.position.copy(p); scene.add(ribs);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(r + 0.3, 32, 8, 0, Math.PI * 2, 0, 0.55), capM);
    cap.scale.y = squash; cap.position.copy(p); scene.add(cap);
  };
  const built = new Set(F.domes.map(([d]) => d));
  F.domes.forEach(([deg, d]) => dome(polar(P.domeRing, deg), d, d > 45 ? 0.8 : 1));
  // Reserved dome plots: meadow and a tree nursery whose young trees are moved out when the dome is built
  const meadow = mat(0xb9c27f);
  for (let deg = 0; deg < 360; deg += 30) if (!built.has(deg)) {
    const p = polar(P.domeRing, deg);
    flat(new THREE.CircleGeometry(20, 40), meadow, 0.19).position.set(p.x, 0.19, p.z);
    for (let x = -9; x <= 9; x += 4.5) for (let z = -9; z <= 9; z += 4.5) if (x * x + z * z < 110) tree(p.x + x, p.z + z, 0.4);
  }

  // Earth homes with green roofs (ring 4), between the radial paths
  const earthM = mat(0xc98d64, {roughness: 0.95});
  const earthHome = (p, deg, size, sx = 1.3) => {
    const h = new THREE.Mesh(new THREE.SphereGeometry(size, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), earthM);
    h.scale.set(sx, 0.75, 1); h.rotation.y = rad(deg); h.position.copy(p); h.castShadow = true; scene.add(h);
    const roof = new THREE.Mesh(new THREE.SphereGeometry(size + 0.15, 20, 6, 0, Math.PI * 2, 0, 0.7), capM);
    roof.scale.copy(h.scale); roof.rotation.copy(h.rotation); roof.position.copy(p); scene.add(roof);
  };
  // Fixed home plots: five per 30° sector. Phase 1 builds 30 of them, later phases fill the gaps; none move.
  const homeSlots = [];
  for (let sec = 0; sec < 12; sec++) {
    homeSlots.push([sec * 30 + 10, 1], [sec * 30 + 20, 1], [sec * 30 + 15, sec % 2 ? 3 : 1], [sec * 30 + 5, 2], [sec * 30 + 25, 2]);
  }
  homeSlots.filter(([, ph]) => ph <= F.homes).forEach(([deg]) => {
    earthHome(polar(P.homes.radius, deg), deg, P.homes.size);
    const q = polar(P.homes.radius + 12, deg + 2.5); tree(q.x, q.z, 0.7);
  });

  // Solar arrays with meadow beneath (ring 5)
  const pv = mat(0x24313f, {roughness: 0.35, metalness: 0.4});
  const array = (p, deg, w = 22, d = 9) => {
    const a = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, d), pv);
    a.position.copy(p).setY(2.2); a.rotation.y = rad(deg) + Math.PI / 2; a.rotateX(-0.45); a.castShadow = true; scene.add(a);
  };
  for (let i = 0; i < P.solar.count; i++) { const deg = (i + 0.5) * (360 / P.solar.count); array(polar(P.solar.radius, deg), deg); }

  // Phase 2: village neighborhoods of earth-home courtyard clusters (six homes round a shared garden)
  if (F.clusters) {
    const garden = mat(0xb5c08c);
    F.clusters.forEach((r) => {
      for (let i = 0; i < 24; i++) {
        const deg = 7.5 + i * 15;
        const c = polar(r, deg);
        flat(new THREE.CircleGeometry(9, 32), garden, 0.2).position.set(c.x, 0.2, c.z);
        for (let k = 0; k < 6; k++) {
          const a = deg + k * 60;
          const p = c.clone().add(polar(15, a));
          earthHome(p, a + 90, 4, 1.2);
        }
        tree(c.x, c.z, 0.9);
      }
      ringPath(r + 30, 2.4);
    });
  }

  // Phase 3: two-to-three storey timber terraces with green roofs, in crescents along the rings
  if (F.terraces) {
    const wall = mat(0xc4a27a, {roughness: 0.8});
    const roofM = mat(0x6f8a4a);
    F.terraces.forEach((r, row) => {
      const n = r > 360 ? 24 : 12, step = 360 / n, gap = (8 / r) * (180 / Math.PI);
      for (let i = 0; i < n; i++) {
        const a0 = i * step + gap, a1 = (i + 1) * step - gap;
        const mid = (a0 + a1) / 2;
        if (F.districts && Math.abs(r - F.districts.r) < 100 && F.districts.deg.some((d) => Math.abs(((mid - d + 540) % 360) - 180) < step)) continue;
        const h = 7 + ((i + row) % 3) * 2.5;
        const shape = new THREE.Shape();
        const r0 = r - 8, r1 = r + 8;
        shape.absarc(0, 0, r1, rad(a0), rad(a1), false);
        shape.absarc(0, 0, r0, rad(a1), rad(a0), true);
        const geo = new THREE.ExtrudeGeometry(shape, {depth: h, bevelEnabled: false, curveSegments: 24});
        geo.rotateX(-Math.PI / 2);
        const m = new THREE.Mesh(geo, wall); m.castShadow = true; m.receiveShadow = true; scene.add(m);
        const roofGeo = new THREE.ShapeGeometry(shape, 24); roofGeo.rotateX(-Math.PI / 2);
        const roof = new THREE.Mesh(roofGeo, roofM); roof.position.y = h + 0.05; scene.add(roof);
      }
      ringPath(r + 22, 2.4); ringPath(r - 22, 2.4);
      for (let i = 0; i < n * 3; i++) { const q = polar(r + 30, (i + 0.5) * (360 / (n * 3))); tree(q.x, q.z, 0.85); }
    });
    // District hubs: large communosphere domes with a small temple and a market green
    F.districts.deg.forEach((deg) => {
      const c = polar(F.districts.r, deg);
      flat(new THREE.CircleGeometry(F.districts.d / 2 + 22, 48), mat(0xcfc3aa), 0.19).position.set(c.x, 0.19, c.z);
      dome(c, F.districts.d, 0.7);
      pavilion(c.clone().add(polar(F.districts.d / 2 + 12, deg + 90)), 6);
    });
  }

  // Food and energy belt: agrivoltaic arrays, solar greenhouses and food-forest rows by sector
  (F.belts || []).forEach(([b0, b1]) => {
    const gh = mat(0xd6e2e4, {roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.8});
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
            g.rotation.z = Math.PI / 2; g.rotation.y = rad(deg); g.position.copy(p); g.castShadow = true; scene.add(g);
          } else for (let t = -1; t <= 1; t++) { const q = polar(r, deg + t * (9 / r) * (180 / Math.PI)); tree(q.x, q.z, 0.8); }
        }
      }
    }
  });

  // Scattered trees in ring 2 and wild woodland beyond the city
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 90; i++) {
    const deg = rnd() * 360, r = 40 + rnd() * 36;
    if (Math.abs(((deg - 45) % 90 + 90) % 90 - 45) > 40) continue;
    if (F.inner.some(([d]) => Math.abs(((deg - d + 540) % 360) - 180) < 12)) continue;
    const p = polar(r, deg); tree(p.x, p.z, 0.7);
  }
  const wild = 700 * F.view;
  for (let i = 0; i < wild; i++) {
    const deg = rnd() * 360, r = F.extent + 13 + rnd() * 600 * Math.sqrt(F.view);
    const p = polar(r, deg); tree(p.x, p.z, 1 + rnd() * 0.8);
  }
  // Distant hills
  for (let i = 0; i < 9; i++) {
    const deg = i * 40 + rnd() * 20;
    const p = polar(F.extent + 1280 * Math.sqrt(F.view) + rnd() * 400, deg);
    const hill = new THREE.Mesh(new THREE.SphereGeometry((500 + rnd() * 300) * Math.sqrt(F.view), 24, 12), mat(0x6f7f55));
    hill.scale.y = 0.22 + rnd() * 0.12; hill.position.copy(p); scene.add(hill);
  }

  // Build all trees as two instanced meshes
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.25, 0.35, 3, 6), mat(0x6b5038), treePts.length);
  const crowns = new THREE.InstancedMesh(new THREE.SphereGeometry(2.4, 10, 8), mat(0x5f7a3d), treePts.length);
  crowns.castShadow = true;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
  treePts.forEach(([x, z, s], i) => {
    m4.compose(new THREE.Vector3(x, 1.5 * s, z), q, new THREE.Vector3(s, s, s)); trunks.setMatrixAt(i, m4);
    m4.compose(new THREE.Vector3(x, 4.2 * s, z), q, new THREE.Vector3(s, s, s)); crowns.setMatrixAt(i, m4);
  });
  scene.add(trunks, crowns);
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
};

// Wide views scale with the phase so the whole city stays in frame
const WIDE = ['aerial', 'top', 'hero'];
export function viewFor(name, phase = 1) {
  const v = VIEWS[name] || VIEWS.aerial;
  const k = WIDE.includes(name) ? (PHASES[phase] || PHASES[1]).view : 1;
  return {...v, pos: v.pos.map((c) => c * k), target: [v.target[0], v.target[1] * Math.sqrt(k), v.target[2]]};
}

export function start(canvas, {interactive = true, view = 'aerial', width, height, phase = 1} = {}) {
  const F = PHASES[phase] || PHASES[1];
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true, preserveDrawingBuffer: true});
  renderer.setPixelRatio(interactive ? Math.min(window.devicePixelRatio, 2) : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const W = width || canvas.clientWidth, H = height || canvas.clientHeight;
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc9dbe6);
  scene.fog = new THREE.Fog(0xc9dbe6, 700 * F.view, 2600 * F.view);
  scene.add(new THREE.HemisphereLight(0xeef4f8, 0x6b6a4a, 1.3));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.2);
  sun.position.set(300, 420, 200);
  sun.castShadow = true;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.6 * F.view;
  sun.shadow.mapSize.set(4096, 4096);
  const ext = F.extent + 100;
  sun.position.multiplyScalar(F.view);
  Object.assign(sun.shadow.camera, {left: -ext, right: ext, top: ext, bottom: -ext, near: 10, far: 1400 * F.view});
  scene.add(sun);
  buildCity(scene, phase);

  const camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 6000 * F.view);
  const controls = interactive ? new OrbitControls(camera, canvas) : null;
  if (controls) { controls.enableDamping = true; controls.maxPolarAngle = Math.PI / 2 - 0.02; }

  const setView = (name) => {
    const v = viewFor(name, phase);
    camera.fov = v.fov;
    camera.position.set(...v.pos);
    camera.lookAt(...v.target);
    camera.updateProjectionMatrix();
    if (controls) { controls.target.set(...v.target); controls.update(); }
    renderer.render(scene, camera);
  };
  setView(view);

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
  return {setView};
}
