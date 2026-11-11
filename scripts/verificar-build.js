const fs = require('node:fs');
const path = require('node:path');

const pages = [
  ['index.html', '/', 'Inconformistas FM'],
  ['programas.html', '/programas', 'Programas y entrevistas'],
  ['noticias.html', '/noticias', 'Noticias de Collado Villalba'],
  ['equipo.html', '/equipo', 'El equipo'],
  ['galeria.html', '/galeria', 'Galería de fotos'],
  ['artistas.html', '/artistas', 'Artistas y colaboradores'],
  ['radio-online.html', '/radio-online', 'Radio online'],
  ['contacto.html', '/contacto', 'Contacto']
];
const fail = [];
const check = (ok, message) => { if (!ok) fail.push(message); };
const read = file => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';

const titles = new Set();
for (const [file, route, expected] of pages) {
  const html = read(file);
  check(html.length > 0, file + ': no existe o está vacío');
  if (!html) continue;
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const description = (html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["']/i) || [])[1] || '';
  const canonical = (html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*href=["']([^"']*)["']/i) || [])[1] || '';
  check(title.trim().length > 10, file + ': falta un título SEO válido');
  check(!titles.has(title), file + ': título duplicado');
  titles.add(title);
  check(description.trim().length >= 50, file + ': descripción SEO ausente o demasiado corta');
  check(canonical === 'https://inconformistasfm.es' + route, file + ': canonical incorrecta (' + canonical + ')');
  check(/<main\s+id=["']main["'][^>]*>[\s\S]*?\S[\s\S]*?<\/main>/i.test(html), file + ': main sin contenido prerenderizado');
  check(html.includes(expected), file + ': no aparece el contenido esperado de la sección');
  check(!/data:image\/(?:png|jpe?g|webp|gif);base64,/i.test(html), file + ': conserva imágenes base64 incrustadas');
}

for (const dir of ['assets/generated/css', 'assets/generated/js', 'assets/generated/images']) {
  check(fs.existsSync(dir) && fs.statSync(dir).isDirectory(), dir + ': falta el directorio');
  if (fs.existsSync(dir)) check(fs.readdirSync(dir).some(name => fs.statSync(path.join(dir, name)).isFile()), dir + ': no contiene archivos');
}
if (fs.existsSync('assets/generated/js')) {
  for (const file of fs.readdirSync('assets/generated/js').filter(name => name.endsWith('.js'))) {
    check(fs.statSync(path.join('assets/generated/js', file)).size > 0, 'archivo JavaScript generado vacío: ' + file);
  }
}

const redirects = read('_redirects');
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
for (const [, route] of pages.slice(1)) {
  const target = route + '.html';
  check(redirects.split(/\r?\n/).some(line => line.trim() === route + ' ' + target + ' 200'), '_redirects: falta ' + route);
}
for (const [, route] of pages) {
  check(sitemap.includes('<loc>https://inconformistasfm.es' + route + '</loc>'), 'sitemap.xml: falta ' + route);
}
check(robots.includes('Sitemap: https://inconformistasfm.es/sitemap.xml'), 'robots.txt: falta la referencia al sitemap');

if (fail.length) {
  console.error('VALIDACIÓN FALLIDA:');
  for (const message of fail) console.error(' - ' + message);
  process.exit(1);
}
console.log('Validación correcta: 8 páginas, títulos y descripciones únicas, canonical, contenido prerenderizado, rutas, sitemap, robots y recursos generados.');
