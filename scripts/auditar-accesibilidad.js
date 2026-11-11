const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const pages = [
  ['Inicio', 'index.html'],
  ['Programas', 'programas.html'],
  ['Noticias', 'noticias.html'],
  ['Equipo', 'equipo.html'],
  ['Galería', 'galeria.html'],
  ['Artistas', 'artistas.html'],
  ['Radio online', 'radio-online.html'],
  ['Contacto', 'contacto.html']
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const [name, file] of pages) {
      const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:4173/' + file, { waitUntil: 'domcontentloaded' });
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const audit = await page.evaluate(async () => {
        const result = await axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] }
        });
        return {
          violations: result.violations.map(v => ({
            id: v.id, impact: v.impact, description: v.help,
            helpUrl: v.helpUrl, nodes: v.nodes.map(n => ({
              target: n.target, summary: n.failureSummary
            }))
          })),
          passes: result.passes.length,
          incomplete: result.incomplete.length
        };
      });
      results.push({ page: name, file, ...audit, javascriptErrors: errors });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  fs.mkdirSync('informes-auditoria', { recursive: true });
  fs.writeFileSync('informes-auditoria/accesibilidad-axe.json', JSON.stringify({
    generatedAt: new Date().toISOString(), pages: results
  }, null, 2));
  for (const item of results) {
    const serious = item.violations.filter(v => ['critical', 'serious'].includes(v.impact)).length;
    console.log(item.page + ': ' + item.violations.length + ' incidencias axe (' + serious + ' graves/críticas), ' + item.passes + ' comprobaciones superadas.');
    for (const v of item.violations) { console.log('  [' + v.impact + '] ' + v.id + ': ' + v.description); for (const n of v.nodes) console.log('    SELECTOR ' + JSON.stringify(n.target) + ' | ' + String(n.summary || '').replace(/\s+/g, ' ').slice(0, 700)); }
    for (const e of item.javascriptErrors) console.log('  [JS] ' + e);
  }
  const seriousCount = results.reduce((n, p) => n + p.violations.filter(v => ['critical', 'serious'].includes(v.impact)).length, 0);
  const jsErrors = results.reduce((n, p) => n + p.javascriptErrors.length, 0);
  if (seriousCount || jsErrors) process.exitCode = 1;
})().catch(error => { console.error(error); process.exit(1); });
