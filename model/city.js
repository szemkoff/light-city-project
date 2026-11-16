// Light City Phase 1 reference model.
// Source of truth: docs/design/architecture.md (Circular form) and img/diagrams/city-layout.svg.
// Units are metres. North is -Z. Angles are measured counter-clockwise from east, as on the plan.
import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';

export const PLAN = {
  rings: [
    {n: 1, name: 'Spire & plaza', r: 35, color: 0xd9cdb6},
    {n: 2, name: 'Temple & learning', r: 82, color: 0xc8c49a},
    {n: 3, name: 'Studios & domes', r: 135, color: 0xa9b98a},
    {n: 4, name: 'Homes & gardens', r: 182, color: 0x9fb07a},
    {n: 5, name: 'Energy & wild buffer', r: 222, color: 0x8d9d64},
  ],
  radialPaths: 12,
  spire: {height: 90, base: 9, top: 3.2, deck: 72},
  temples: {count: 4, radius: 58, startDeg: 45, size: 8},
  domes: {radius: 109, diameter: 40, phase1Deg: [30, 150, 270], laterDeg: [0, 60, 90, 120, 180, 210, 240, 300, 330]},
  homes: {radius: 160, count: 30, size: 4.5},
  solar: {radius: 203, count: 16},
};

const P = PLAN;
const rad = (d) => (d * Math.PI) / 180;
const polar = (r, deg) => new THREE.Vector3(Math.cos(rad(deg)) * r, 0, -Math.sin(rad(deg)) * r);

export function buildCity(scene) {
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({color, roughness: 0.9, metalness: 0, ...o});

  // Wild land beyond the city
  const ground = new THREE.Mesh(new THREE.CircleGeometry(2200, 96), mat(0x7f8f58));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Ring bands, outermost first
  [...P.rings].reverse().forEach((ring, i) => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(ring.r, 128), mat(ring.color));
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.02 + i * 0.02;
    m.receiveShadow = true;
    scene.add(m);
  });

  // Ring paths (gravel)
  const path = mat(0xe6dcc6);
  P.rings.slice(0, 4).forEach((ring) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(ring.r - 1.6, ring.r + 1.6, 160), path);
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.15;
    m.receiveShadow = true;
    scene.add(m);
  });

  // 12 radial paths
  for (let i = 0; i < P.radialPaths; i++) {
    const deg = i * (360 / P.radialPaths);
    const len = P.rings[4].r + 20 - P.rings[0].r;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(len, 3.2), path);
    m.rotation.x = -Math.PI / 2;
    m.rotation.z = rad(deg);
    const mid = polar(P.rings[0].r + len / 2, deg);
    m.position.set(mid.x, 0.16, mid.z);
    m.receiveShadow = true;
    scene.add(m);
  }

  // Plaza: stone with a ring-shaped reflecting pool
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(P.rings[0].r - 1.6, 96), mat(0xcfc3aa));
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.18;
  plaza.receiveShadow = true;
  scene.add(plaza);
  const pool = new THREE.Mesh(new THREE.RingGeometry(14, 24, 96), mat(0x7f9aa6, {roughness: 0.15, metalness: 0.2}));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.22;
  scene.add(pool);

  // Spire: tapered steel and timber lattice with an observation deck and a solar crown
  const S = P.spire;
  const timber = mat(0xb98a55, {roughness: 0.7});
  const steel = mat(0x8d8a84, {roughness: 0.5, metalness: 0.4});
  const legs = 8;
  for (let i = 0; i < legs; i++) {
    const a = (i / legs) * Math.PI * 2;
    const b = new THREE.Vector3(Math.cos(a) * S.base, 0, Math.sin(a) * S.base);
    const t = new THREE.Vector3(Math.cos(a + 0.5) * S.top, S.height, Math.sin(a + 0.5) * S.top);
    const len = b.distanceTo(t);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.7, len, 8), timber);
    leg.position.copy(b.clone().add(t).multiplyScalar(0.5));
    leg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), t.clone().sub(b).normalize());
    leg.castShadow = true;
    scene.add(leg);
  }
  for (let h = 8; h < S.height; h += 8) {
    const r = S.base + (S.top - S.base) * (h / S.height);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.25, 6, 32), steel);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = h;
    scene.add(ring);
  }
  const deck = new THREE.Mesh(new THREE.CylinderGeometry(7, 6, 3, 32), mat(0xd8cfbf));
  deck.position.y = S.deck;
  deck.castShadow = true;
  scene.add(deck);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(9, 4, 1.2, 32), mat(0x2c3a4a, {roughness: 0.3, metalness: 0.5}));
  crown.position.y = S.height;
  crown.castShadow = true;
  scene.add(crown);

  // Temple and learning pavilions (ring 2)
  for (let i = 0; i < P.temples.count; i++) {
    const p = polar(P.temples.radius, P.temples.startDeg + i * 90);
    const d = new THREE.Mesh(new THREE.SphereGeometry(P.temples.size, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xc79a62, {roughness: 0.6}));
    d.position.copy(p);
    d.castShadow = true;
    scene.add(d);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(P.temples.size + 2, P.temples.size + 2, 0.6, 32), mat(0xbdb29c));
    base.position.copy(p).setY(0.3);
    scene.add(base);
  }

  // Phase 1 communosphere domes (ring 3): glazed geodesic shell with timber ribs and a green-roof cap
  const domeR = P.domes.diameter / 2;
  const half = (r, detail) => {
    const g = new THREE.IcosahedronGeometry(r, detail);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) if (pos.getY(i) < 0) pos.setY(i, 0);
    g.computeVertexNormals();
    return g;
  };
  P.domes.phase1Deg.forEach((deg) => {
    const p = polar(P.domes.radius, deg);
    const glass = new THREE.Mesh(half(domeR, 3), mat(0x9fb6bf, {roughness: 0.15, metalness: 0.3, transparent: true, opacity: 0.85}));
    glass.position.copy(p);
    glass.castShadow = true;
    scene.add(glass);
    const ribs = new THREE.LineSegments(new THREE.WireframeGeometry(half(domeR + 0.15, 3)), new THREE.LineBasicMaterial({color: 0xa0743f}));
    ribs.position.copy(p);
    scene.add(ribs);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(domeR + 0.3, 32, 8, 0, Math.PI * 2, 0, 0.55), mat(0x6f8a4a));
    cap.position.copy(p);
    scene.add(cap);
  });
  // Later-phase plots: orchards for now
  const leaf = mat(0x5f7a3d);
  const trunk = mat(0x6b5038);
  const tree = (x, z, s = 1) => {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * s, 0.35 * s, 3 * s, 6), trunk);
    t.position.set(x, 1.5 * s, z);
    const c = new THREE.Mesh(new THREE.SphereGeometry(2.4 * s, 10, 8), leaf);
    c.position.set(x, 4.2 * s, z);
    c.castShadow = true;
    scene.add(t, c);
  };
  P.domes.laterDeg.forEach((deg) => {
    const p = polar(P.domes.radius, deg);
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2;
      tree(p.x + Math.cos(a) * 8, p.z + Math.sin(a) * 8, 0.9);
    }
  });

  // Earth homes with green roofs (ring 4), skipping the radial paths
  for (let i = 0; i < P.homes.count; i++) {
    const deg = (i + 0.5) * (360 / P.homes.count);
    const p = polar(P.homes.radius, deg);
    const h = new THREE.Mesh(new THREE.SphereGeometry(P.homes.size, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xc98d64, {roughness: 0.95}));
    h.scale.set(1.3, 0.75, 1);
    h.rotation.y = rad(deg);
    h.position.copy(p);
    h.castShadow = true;
    scene.add(h);
    const roof = new THREE.Mesh(new THREE.SphereGeometry(P.homes.size + 0.15, 20, 6, 0, Math.PI * 2, 0, 0.7), mat(0x6f8a4a));
    roof.scale.copy(h.scale);
    roof.rotation.copy(h.rotation);
    roof.position.copy(p);
    scene.add(roof);
    tree(...(() => { const q = polar(P.homes.radius + 10, deg + 4); return [q.x, q.z]; })(), 0.8);
  }

  // Solar arrays with meadow beneath (ring 5)
  const pv = mat(0x24313f, {roughness: 0.35, metalness: 0.4});
  for (let i = 0; i < P.solar.count; i++) {
    const deg = (i + 0.5) * (360 / P.solar.count);
    const p = polar(P.solar.radius, deg);
    const a = new THREE.Mesh(new THREE.BoxGeometry(22, 0.3, 9), pv);
    a.position.copy(p).setY(2.2);
    a.rotation.y = rad(deg) + Math.PI / 2;
    a.rotateX(-0.45);
    a.castShadow = true;
    scene.add(a);
  }

  // Scattered trees in ring 2 and wild woodland beyond ring 5
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 90; i++) {
    const deg = rnd() * 360;
    const r = 40 + rnd() * 36;
    if (Math.abs(((deg - 45) % 90 + 90) % 90 - 45) > 40) continue;
    const p = polar(r, deg);
    tree(p.x, p.z, 0.7);
  }
  for (let i = 0; i < 700; i++) {
    const deg = rnd() * 360;
    const r = 235 + rnd() * 600;
    const p = polar(r, deg);
    tree(p.x, p.z, 1 + rnd() * 0.8);
  }
  // Distant hills
  for (let i = 0; i < 9; i++) {
    const deg = i * 40 + rnd() * 20;
    const p = polar(1500 + rnd() * 400, deg);
    const hill = new THREE.Mesh(new THREE.SphereGeometry(500 + rnd() * 300, 24, 12), mat(0x6f7f55));
    hill.scale.y = 0.22 + rnd() * 0.12;
    hill.position.copy(p);
    scene.add(hill);
  }
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

export function start(canvas, {interactive = true, view = 'aerial', width, height} = {}) {
  const renderer = new THREE.WebGLRenderer({canvas, antialias: true, preserveDrawingBuffer: true});
  renderer.setPixelRatio(interactive ? Math.min(window.devicePixelRatio, 2) : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const W = width || canvas.clientWidth, H = height || canvas.clientHeight;
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc9dbe6);
  scene.fog = new THREE.Fog(0xc9dbe6, 700, 2600);
  scene.add(new THREE.HemisphereLight(0xeef4f8, 0x6b6a4a, 1.3));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.2);
  sun.position.set(300, 420, 200);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  Object.assign(sun.shadow.camera, {left: -320, right: 320, top: 320, bottom: -320, near: 10, far: 1400});
  scene.add(sun);
  buildCity(scene);

  const camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 6000);
  const controls = interactive ? new OrbitControls(camera, canvas) : null;
  if (controls) { controls.enableDamping = true; controls.maxPolarAngle = Math.PI / 2 - 0.02; }

  const setView = (name) => {
    const v = VIEWS[name] || VIEWS.aerial;
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
