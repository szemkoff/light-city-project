// Render reference views of the 3D city model for image generation.
// Usage: (cd static/model && python3 -m http.server 8766) then
//   PHASE=2 [TIME=night] node scripts/render-model.cjs aerial top hero path homes plaza solar
// Needs playwright-core and a Chromium build. Output: model-renders/<view>.png
const {chromium} = require('playwright-core');
const fs = require('fs');
(async () => {
  const views = process.argv.slice(2);
  const url = process.env.MODEL_URL || 'http://localhost:8766/index.html';
  fs.mkdirSync('model-renders', {recursive: true});
  const b = await chromium.launch({executablePath: process.env.CHROME, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']});
  const phase = process.env.PHASE || '1';
  const time = process.env.TIME === 'night' ? '&time=night' : '';
  for (const v of views) {
    const p = await b.newPage({viewport: {width: 1600, height: 900}});
    await p.goto(`${url}?render&phase=${phase}&view=${v}&w=1600&h=900${time}`);
    await p.waitForFunction(() => window.__ready, null, {timeout: 60000});
    await p.waitForTimeout(1500);
    await (await p.$('canvas')).screenshot({path: `model-renders/p${phase}-${v}${time ? '-night' : ''}.png`});
    console.log('rendered', phase, v);
    await p.close();
  }
  await b.close();
})();
