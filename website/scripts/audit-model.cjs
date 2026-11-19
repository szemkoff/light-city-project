// Layout audit for the 3D city model: collisions and feng shui line checks, per phase.
// Usage: (cd static/model && python3 -m http.server 8766) then
//   node scripts/audit-model.cjs [--json model-audit.json]
// Needs playwright-core and a Chromium build (CHROME=/path/to/chrome).
// Checks, for each phase:
//   1. buildings on paths or roads      2. buildings in water or on its banks
//   3. buildings overlapping buildings  4. path ends aimed at a building within 30 m (feng shui "road rush")
//   5. straight runs of path or road longer than 80 m (feng shui: lines should curve)
//   6. trees standing on paths or roads
const {chromium} = require('playwright-core');
const fs = require('fs');

const SOLID = new Set(['home', 'dome', 'pavilion', 'market', 'workshop', 'terrace', 'greenhouse', 'solar', 'carport', 'spire', 'utility']);
const DOORS = new Set(['home', 'dome', 'pavilion', 'market', 'workshop', 'terrace', 'utility']);

const circlePoly = (c, r, n = 20) => Array.from({length: n}, (_, i) => [c[0] + Math.cos((i / n) * 2 * Math.PI) * r, c[1] + Math.sin((i / n) * 2 * Math.PI) * r]);
const dense = (poly, step = 2) => {
  const out = [];
  poly.forEach((a, i) => { const b = poly[(i + 1) % poly.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / step)); for (let k = 0; k < n; k++) out.push([a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n]); });
  return out;
};
const inside = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
const segDist = (p, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / L2)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dz); };
const bbox = (pts) => pts.reduce((b, [x, z]) => [Math.min(b[0], x), Math.min(b[1], z), Math.max(b[2], x), Math.max(b[3], z)], [1e9, 1e9, -1e9, -1e9]);
const centroid = (poly) => [poly.reduce((s, p) => s + p[0], 0) / poly.length, poly.reduce((s, p) => s + p[1], 0) / poly.length];
const where = (p) => { const r = Math.hypot(p[0], p[1]), a = ((Math.atan2(-p[1], p[0]) * 180) / Math.PI + 360) % 360; return `r ${r.toFixed(0)} m at ${a.toFixed(0)}°`; };

function audit(A, n) {
  const on = (x) => x.from <= n && n < (x.to === undefined ? 4 : x.to);
  const foot = A.foot.filter((f) => on(f) && SOLID.has(f.kind)).map((f) => {
    const poly = f.poly || circlePoly(f.c, f.r);
    return {...f, poly, d: dense(poly), bb: bbox(poly), at: centroid(poly)};
  });
  const G = 30, grid = new Map(), put = (bb, item) => { for (let x = Math.floor(bb[0] / G); x <= Math.floor(bb[2] / G); x++) for (let z = Math.floor(bb[1] / G); z <= Math.floor(bb[3] / G); z++) { const k = x + ',' + z; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(item); } };
  const near = (bb) => { const s = new Set(); for (let x = Math.floor(bb[0] / G); x <= Math.floor(bb[2] / G); x++) for (let z = Math.floor(bb[1] / G); z <= Math.floor(bb[3] / G); z++) (grid.get(x + ',' + z) || []).forEach((i) => s.add(i)); return s; };
  // Linear features as segments with a half-width
  const segs = [];
  A.paths.filter((p) => p.from <= n && n < (p.to || 4)).forEach((p, pi) => {
    if (p.ring) { segs.push({ring: true, r: p.r, hw: p.w / 2, what: `ring path r ${p.r}`}); return; }
    for (let i = 0; i < p.pts.length - 1; i++) segs.push({a: p.pts[i], b: p.pts[i + 1], hw: p.w / 2, what: p.road ? 'road' : 'path', pi});
  });
  A.waters.filter((w) => w.from <= n).forEach((w) => { const P = w.pts; for (let i = 0; i < (w.closed ? P.length : P.length - 1); i++) segs.push({a: P[i], b: P[(i + 1) % P.length], hw: P[i][2] + w.bank, what: w.kind, water: true}); });
  segs.forEach((s) => { if (!s.ring) put(bbox([s.a, s.b]).map((v, i) => v + (i < 2 ? -s.hw : s.hw)), s); });
  const rings = segs.filter((s) => s.ring);
  const hit = (f, s, pad = 0.3) => {
    if (s.ring) { const rs = f.d.map((p) => Math.hypot(p[0], p[1])); return Math.min(...rs) < s.r + s.hw + pad && Math.max(...rs) > s.r - s.hw - pad; }
    if (inside(s.a, f.poly) || inside(s.b, f.poly)) return true;
    return f.d.some((p) => segDist(p, s.a, s.b) < s.hw + pad);
  };
  const out = {onPath: [], inWater: [], overlap: [], arrows: [], entrances: 0, straight: [], treesOnPaths: 0, treeSamples: []};
  const seen = new Set();
  foot.forEach((f) => {
    const cands = [...near(f.bb), ...rings];
    for (const s of cands) {
      if (!hit(f, s, s.water ? 0.5 : 0.3)) continue;
      const key = f.kind + f.at.join() + s.what;
      if (seen.has(key)) continue; seen.add(key);
      (s.water ? out.inWater : out.onPath).push(`${f.kind} (${where(f.at)}) on ${s.what}`);
    }
  });
  // Building overlaps
  const fg = new Map(), fput = (f) => { for (let x = Math.floor(f.bb[0] / G); x <= Math.floor(f.bb[2] / G); x++) for (let z = Math.floor(f.bb[1] / G); z <= Math.floor(f.bb[3] / G); z++) { const k = x + ',' + z; if (!fg.has(k)) fg.set(k, []); fg.get(k).push(f); } };
  foot.forEach(fput);
  const pairs = new Set();
  foot.forEach((f, i) => {
    for (let x = Math.floor(f.bb[0] / G); x <= Math.floor(f.bb[2] / G); x++) for (let z = Math.floor(f.bb[1] / G); z <= Math.floor(f.bb[3] / G); z++) (fg.get(x + ',' + z) || []).forEach((g) => {
      const j = foot.indexOf(g); if (j <= i) return;
      const k = i + ':' + j; if (pairs.has(k)) return; pairs.add(k);
      if (g.bb[0] > f.bb[2] || g.bb[2] < f.bb[0] || g.bb[1] > f.bb[3] || g.bb[3] < f.bb[1]) return;
      if (f.d.some((p) => inside(p, g.poly)) || g.d.some((p) => inside(p, f.poly))) out.overlap.push(`${f.kind} (${where(f.at)}) overlaps ${g.kind} (${where(g.at)})`);
    });
  });
  // Path ends aimed at a door, and straight runs
  const trees = A.trees.filter((t) => t[3] <= n && n < t[4]);
  const tg = new Map(); trees.forEach((t) => { const k = Math.floor(t[0] / G) + ',' + Math.floor(t[1] / G); if (!tg.has(k)) tg.set(k, []); tg.get(k).push(t); });
  const fore = (A.fore || []).filter((f) => f[3] <= n);
  A.paths.filter((p) => p.from <= n && n < (p.to || 4) && !p.ring).forEach((p) => {
    const P = p.pts;
    if (!p.loop) for (const [e, f] of [[P[P.length - 1], P[P.length - 2]], [P[0], P[1]]]) {
      const dx = e[0] - f[0], dz = e[1] - f[1], L = Math.hypot(dx, dz) || 1, u = [dx / L, dz / L];
      // A path that arrives in a dome's paved forecourt (the ming tang) is an entrance, not an arrow
      if (fore.some((f) => Math.hypot(e[0] - f[0], e[1] - f[1]) < f[2] + 2)) { out.entrances++; continue; }
      let screened = false;
      for (let s = 1; s <= 30; s += 1) {
        const q = [e[0] + u[0] * s, e[1] + u[1] * s];
        if ((tg.get(Math.floor(q[0] / G) + ',' + Math.floor(q[1] / G)) || []).some((t) => t[5] === 2 && Math.hypot(t[0] - q[0], t[1] - q[1]) < 1.6)) screened = true;
        const tgt = [...near([q[0], q[1], q[0], q[1]])].length >= 0 && foot.find((g) => DOORS.has(g.kind) && q[0] >= g.bb[0] && q[0] <= g.bb[2] && q[1] >= g.bb[1] && q[1] <= g.bb[3] && inside(q, g.poly));
        if (tgt) { out.arrows.push(`${p.road ? 'road' : 'path'} end (${where(e)}) aims at ${tgt.kind} ${s} m ahead${screened ? ', screened by planting' : ''}`); break; }
      }
    }
    // Straight runs: longest stretch whose heading stays within 1.5° of its start
    let i0 = 0, len = 0, best = 0, bestAt = null;
    for (let i = 1; i < P.length; i++) {
      const h0 = Math.atan2(P[i0 + 1][1] - P[i0][1], P[i0 + 1][0] - P[i0][0]), h = Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]);
      let dh = Math.abs(h - h0); if (dh > Math.PI) dh = 2 * Math.PI - dh;
      if (dh > (1.5 * Math.PI) / 180) { i0 = i - 1; len = 0; }
      len += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
      if (len > best) { best = len; bestAt = P[i0]; }
    }
    if (best > 80) out.straight.push(`${p.road ? 'road' : 'path'} straight for ${best.toFixed(0)} m from ${where(bestAt)}`);
  });
  // Trees on paths and roads
  trees.forEach((t) => {
    const p = [t[0], t[1]], r = 0.9 * t[2];
    const s = [...near([p[0], p[1], p[0], p[1]])].find((s) => !s.water && segDist(p, s.a, s.b) < s.hw + r) || rings.find((s) => Math.abs(Math.hypot(p[0], p[1]) - s.r) < s.hw + r);
    if (s) { out.treesOnPaths++; if (out.treeSamples.length < 8) out.treeSamples.push(`tree (${where(p)}) on ${s.what}`); }
  });
  return out;
}

(async () => {
  const url = process.env.MODEL_URL || 'http://localhost:8766/index.html';
  const b = await chromium.launch({executablePath: process.env.CHROME, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
  const p = await b.newPage({viewport: {width: 400, height: 300}});
  p.on('pageerror', (e) => console.error('page error:', e.message));
  await p.goto(`${url}?render&audit&phase=3&w=400&h=300`);
  await p.waitForFunction(() => window.__ready && window.__audit, null, {timeout: 120000});
  const A = await p.evaluate(() => window.__audit);
  await b.close();
  const report = {};
  let problems = 0;
  for (const n of [1, 2, 3]) {
    const r = audit(A, n); report[n] = r;
    const hard = r.onPath.length + r.inWater.length + r.overlap.length;
    problems += hard;
    console.log(`\nPhase ${n}: ${r.onPath.length} on paths, ${r.inWater.length} in water, ${r.overlap.length} overlaps, ${r.arrows.length} path ends aimed at buildings, ${r.entrances} paths arriving at dome entrances, ${r.straight.length} straight runs > 80 m, ${r.treesOnPaths} trees on paths`);
    for (const k of ['onPath', 'inWater', 'overlap', 'arrows', 'straight']) r[k].slice(0, 12).forEach((x) => console.log(`  [${k}] ${x}`));
    r.treeSamples.slice(0, 4).forEach((x) => console.log(`  [tree] ${x}`));
  }
  const j = process.argv.indexOf('--json');
  if (j > 0) fs.writeFileSync(process.argv[j + 1], JSON.stringify(report, null, 1));
  process.exitCode = problems ? 1 : 0;
})();
