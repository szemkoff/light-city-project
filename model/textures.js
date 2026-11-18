// Procedural textures for the Light City model. Everything is drawn on canvases at load time,
// so the model needs no image files. Textures are near-white detail maps: the material colour
// from city.js still sets the palette, and the map only adds grain, pattern and variation.
import * as THREE from 'three';

const SIZE = 512;
let anisotropy = 4;
export const setAnisotropy = (n) => { anisotropy = n; };

// Seeded random so every load draws the same textures
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Tileable value noise: lattice of `period` cells that wraps at the canvas edge
function noiseLayer(period, rnd) {
  const g = new Float32Array(period * period).map(() => rnd());
  const s = (t) => t * t * (3 - 2 * t);
  return (u, v) => {
    const x = u * period, y = v * period, x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = s(x - x0), fy = s(y - y0);
    const at = (i, j) => g[((j % period + period) % period) * period + ((i % period + period) % period)];
    const a = at(x0, y0), b = at(x0 + 1, y0), c = at(x0, y0 + 1), d = at(x0 + 1, y0 + 1);
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  };
}
function fbm(rnd, periods = [4, 8, 16, 32, 64], gain = 0.55) {
  const layers = periods.map((p) => noiseLayer(p, rnd));
  let norm = 0, w = 1; const ws = layers.map(() => { const x = w; norm += x; w *= gain; return x; });
  return (u, v) => layers.reduce((acc, f, i) => acc + f(u, v) * ws[i], 0) / norm;
}

function canvas(w = SIZE, h = SIZE) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}
// Fill a canvas pixel by pixel from f(u, v) -> [r, g, b] in 0..1
function paint(ctx, w, h, f) {
  const img = ctx.createImageData(w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const [r, g, b] = f(x / w, y / h), i = (y * w + x) * 4;
    d[i] = r * 255; d[i + 1] = g * 255; d[i + 2] = b * 255; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}
function toTexture(c, {srgb = true} = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const clamp = (x) => Math.max(0, Math.min(1, x));
// Wrap-around drawing helper: draws f at (x, y) and its copies across the tile edges
const wrapDraw = (w, h, x, y, r, f) => {
  for (const dx of [-w, 0, w]) for (const dy of [-h, 0, h]) {
    if (x + dx + r < 0 || x + dx - r > w || y + dy + r < 0 || y + dy - r > h) continue;
    f(x + dx, y + dy);
  }
};

const cache = new Map();
const once = (key, make) => { if (!cache.has(key)) cache.set(key, make()); return cache.get(key); };

// Grass and meadow: soft clumps, warm dry patches and fine blade strokes
export const grass = (seed = 3) => once('grass' + seed, () => {
  const rnd = rng(seed), n = fbm(rnd), m = fbm(rnd, [3, 6, 12]);
  const [c, ctx] = canvas();
  paint(ctx, SIZE, SIZE, (u, v) => {
    const k = n(u, v), dry = clamp((m(u, v) - 0.55) * 3);
    const l = 0.74 + k * 0.32;
    return [clamp(l + dry * 0.1), clamp(l + dry * 0.04), clamp(l * 0.9 - dry * 0.04)];
  });
  for (let i = 0; i < 9000; i++) {
    const x = rnd() * SIZE, y = rnd() * SIZE, len = 2 + rnd() * 5, a = -Math.PI / 2 + (rnd() - 0.5) * 1.2;
    const light = rnd() > 0.5;
    ctx.strokeStyle = light ? `rgba(255,255,220,${0.10 + rnd() * 0.12})` : `rgba(40,60,20,${0.08 + rnd() * 0.12})`;
    ctx.lineWidth = 1;
    wrapDraw(SIZE, SIZE, x, y, len, (px, py) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a) * len, py + Math.sin(a) * len); ctx.stroke(); });
  }
  return toTexture(c);
});

// Fields and food belts: grass with faint crop rows
export const fields = () => once('fields', () => {
  const rnd = rng(11), n = fbm(rnd);
  const [c, ctx] = canvas();
  paint(ctx, SIZE, SIZE, (u, v) => {
    const row = 0.5 + 0.5 * Math.sin(u * Math.PI * 2 * 24), k = n(u, v);
    const l = 0.76 + k * 0.24 + row * 0.07;
    return [clamp(l + 0.02), clamp(l + 0.03), clamp(l * 0.88)];
  });
  return toTexture(c);
});

// Gravel paths: compacted fines with scattered stones
export const gravel = () => once('gravel', () => {
  const rnd = rng(5), n = fbm(rnd, [8, 16, 32, 64, 128]);
  const [c, ctx] = canvas();
  paint(ctx, SIZE, SIZE, (u, v) => { const l = 0.82 + n(u, v) * 0.18 + (rnd() - 0.5) * 0.08; return [clamp(l), clamp(l * 0.98), clamp(l * 0.94)]; });
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * SIZE, y = rnd() * SIZE, r = 1 + rnd() * 2.6, l = 150 + rnd() * 105;
    ctx.fillStyle = `rgb(${l},${l * 0.97},${l * 0.92})`;
    wrapDraw(SIZE, SIZE, x, y, r, (px, py) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * (0.6 + rnd() * 0.4), rnd() * 3, 0, Math.PI * 2); ctx.fill(); });
  }
  return toTexture(c);
});

// Stone paving: running-bond flags with joints and weathering
export const paving = () => once('paving', () => {
  const rnd = rng(9), n = fbm(rnd, [8, 16, 32, 64]);
  const [c, ctx] = canvas();
  paint(ctx, SIZE, SIZE, (u, v) => { const l = 0.84 + n(u, v) * 0.16; return [l, l * 0.98, l * 0.95]; });
  const rows = 8, h = SIZE / rows;
  for (let r = 0; r < rows; r++) {
    let x = (r % 2) * h * 0.7;
    const cells = [];
    while (x < SIZE + h) { const w = h * (1 + Math.floor(rnd() * 2) * 0.5); cells.push([x, w]); x += w; }
    cells.forEach(([x0, w]) => {
      const l = 0.9 + rnd() * 0.12;
      ctx.fillStyle = `rgba(${255 * l},${250 * l},${240 * l},0.35)`;
      wrapDraw(SIZE, SIZE, x0 % SIZE, r * h, w, (px, py) => ctx.fillRect(px + 1, py + 1, w - 2, h - 2));
    });
    ctx.fillStyle = 'rgba(90,80,65,0.55)';
    ctx.fillRect(0, r * h, SIZE, 2);
    cells.forEach(([x0]) => wrapDraw(SIZE, SIZE, x0 % SIZE, r * h, 2, (px, py) => ctx.fillRect(px, py, 2, h)));
  }
  return toTexture(c);
});

// Water: soft ripples, used as a colour map on a glossy material
export const water = () => once('water', () => {
  const rnd = rng(21), n = fbm(rnd, [4, 8, 16, 32]);
  const [c, ctx] = canvas(256, 256);
  paint(ctx, 256, 256, (u, v) => {
    const w = 0.5 + 0.5 * Math.sin((u * 6 + n(u, v) * 3) * Math.PI * 2);
    const l = 0.82 + w * 0.18; return [l, clamp(l * 1.02), clamp(l * 1.04)];
  });
  return toTexture(c);
});

// Timber: vertical boards with grain, for pavilions and terrace walls. Returns {map, bump}
export const timber = (boards = 16) => once('timber' + boards, () => {
  const rnd = rng(31), n = fbm(rnd, [2, 4, 8, 16]);
  const [c, ctx] = canvas();
  const shade = Array.from({length: boards}, () => 0.85 + rnd() * 0.18);
  paint(ctx, SIZE, SIZE, (u, v) => {
    const b = Math.floor(u * boards), f = u * boards - b;
    const grain = 0.5 + 0.5 * Math.sin((f * 3 + n(u * 0.3 + b * 0.07, v) * 7) * Math.PI * 2);
    const seam = f < 0.05 ? 0.6 : 1;
    const l = shade[b] * (0.86 + grain * 0.14) * seam;
    return [clamp(l * 1.02), clamp(l), clamp(l * 0.95)];
  });
  return toTexture(c);
});

// Terrace facades: timber boards with a band of windows on each storey (tile = one storey high)
export const facade = () => once('facade', () => {
  const [c, ctx] = canvas(512, 256);
  ctx.drawImage(timber(24).image, 0, 0, 512, 256);
  const rnd = rng(41);
  for (let i = 0; i < 6; i++) {
    const x = 14 + i * 84 + rnd() * 6, w = 50;
    ctx.fillStyle = 'rgb(70,86,96)'; ctx.fillRect(x, 70, w, 110);
    ctx.fillStyle = 'rgba(200,225,235,0.45)'; ctx.fillRect(x + 4, 74, w / 2 - 6, 102);
    ctx.fillStyle = 'rgb(120,90,60)'; ctx.fillRect(x + w / 2 - 2, 70, 4, 110); ctx.fillRect(x - 4, 180, w + 8, 6);
  }
  ctx.fillStyle = 'rgba(80,60,40,0.5)'; ctx.fillRect(0, 248, 512, 8);
  return toTexture(c);
});

// Rammed earth: horizontal strata with pebbles, for the earth homes. Sphere UVs run v up the wall
export const earth = () => once('earth', () => {
  const rnd = rng(51), n = fbm(rnd, [4, 8, 16, 32]);
  const [c, ctx] = canvas();
  paint(ctx, SIZE, SIZE, (u, v) => {
    const strata = 0.5 + 0.5 * Math.sin((v * 22 + n(u, v) * 1.6) * Math.PI * 2);
    const l = 0.8 + strata * 0.12 + n(u * 2, v * 2) * 0.1;
    return [clamp(l * 1.02), clamp(l * 0.97), clamp(l * 0.9)];
  });
  for (let i = 0; i < 1400; i++) {
    const x = rnd() * SIZE, y = rnd() * SIZE, r = 0.8 + rnd() * 1.8, l = 140 + rnd() * 90;
    ctx.fillStyle = `rgba(${l},${l * 0.9},${l * 0.8},0.6)`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  return toTexture(c);
});

// Solar modules (true colour, not a tint map): dark cells on a light grid with an aluminium frame (one map per box face)
export const solar = () => once('solar', () => {
  const [c, ctx] = canvas(512, 256);
  ctx.fillStyle = '#c3c9d0'; ctx.fillRect(0, 0, 512, 256);
  const cols = 12, rows = 5, pad = 6, cw = (512 - pad * 2) / cols, ch = (256 - pad * 2) / rows;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const g = ctx.createLinearGradient(0, pad + j * ch, 0, pad + (j + 1) * ch);
    g.addColorStop(0, '#2c4466'); g.addColorStop(1, '#1a2a42');
    ctx.fillStyle = g; ctx.fillRect(pad + i * cw + 1.5, pad + j * ch + 1.5, cw - 3, ch - 3);
    ctx.fillStyle = 'rgba(160,180,205,0.35)';
    for (let k = 1; k < 4; k++) ctx.fillRect(pad + i * cw + (cw * k) / 4, pad + j * ch + 2, 1, ch - 4);
  }
  return toTexture(c);
});

// Geodesic glass: faint dirt and reflection streaks so the shell reads as glazing
export const glass = () => once('glass', () => {
  const rnd = rng(61), n = fbm(rnd, [2, 4, 8]);
  const [c, ctx] = canvas(256, 256);
  paint(ctx, 256, 256, (u, v) => { const l = 0.82 + n(u, v) * 0.18 + Math.max(0, Math.sin((u + v) * 18)) * 0.06; return [l, l, clamp(l * 1.03)]; });
  return toTexture(c);
});

// Foliage: overlapping leaf clusters with light tops and shaded gaps (tinted per tree in city.js)
export const leaves = () => once('leaves', () => {
  const rnd = rng(71);
  const [c, ctx] = canvas(256, 256);
  ctx.fillStyle = 'rgb(175,180,170)'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1500; i++) {
    const x = rnd() * 256, y = rnd() * 256, r = 3 + rnd() * 6, l = 170 + rnd() * 85;
    ctx.fillStyle = `rgba(${l},${l},${l * 0.95},0.85)`;
    wrapDraw(256, 256, x, y, r, (px, py) => { ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.7, rnd() * 3, 0, Math.PI * 2); ctx.fill(); });
  }
  return toTexture(c);
});

// Sky: vertical gradient used as the scene background, horizon matching the fog colour
export const sky = (horizon = '#c9dbe6') => once('sky', () => {
  const [c, ctx] = canvas(4, 256);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#7fa7c9'); g.addColorStop(0.55, '#b4cde0'); g.addColorStop(1, horizon);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
});

// Map a texture in world space (X/Z, metres) instead of by mesh UVs, so large ground discs and
// thin rings share one consistent scale. `tile` is the size in metres of one texture repeat.
// A second, much larger sample breaks up visible tiling across the open land.
export function worldMapped(material, tex, tile, macro = 0.35) {
  const map = tex.clone(); map.needsUpdate = true;
  map.repeat.set(1 / tile, 1 / tile);
  material.map = map;
  material.onBeforeCompile = (sh) => {
    sh.uniforms.uMacro = {value: macro};
    sh.vertexShader = sh.vertexShader.replace('#include <uv_vertex>',
      '#include <uv_vertex>\n#ifdef USE_MAP\n vMapUv = ( mapTransform * vec3( ( modelMatrix * vec4( position, 1.0 ) ).xz, 1.0 ) ).xy;\n#endif');
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>',
      '#include <map_fragment>\n#ifdef USE_MAP\n{ float mc = texture2D( map, vMapUv * 0.043 + vec2( 0.37, 0.71 ) ).g;\n  diffuseColor.rgb *= mix( 1.0, 0.72 + mc * 0.42, uMacro ); }\n#endif')
      .replace('void main() {', 'uniform float uMacro;\nvoid main() {');
  };
  material.customProgramCacheKey = () => 'world-mapped';
  return material;
}

// Repeat a texture over a mesh's own UVs
export function repeated(tex, u, v = u) {
  const t = tex.clone(); t.needsUpdate = true; t.repeat.set(u, v); return t;
}
