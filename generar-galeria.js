// Build de Inconformistas FM: galería, recursos compartidos y HTML prerenderizado por sección.
// No necesita dependencias externas: funciona con Node incluido en el build de Cloudflare Pages.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const ROOT = 'assets/generated';
const DIRS = ['images', 'css', 'js'];
for (const dir of DIRS) {
  const target = path.join(ROOT, dir);
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
}

const galleryDir = 'galeria';
if (fs.existsSync(galleryDir)) {
  const fotos = fs.readdirSync(galleryDir)
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  fs.writeFileSync(path.join(galleryDir, 'fotos.json'), JSON.stringify(fotos));
  console.log(fotos.length + ' fotos en galeria/fotos.json');
}

const routes = [
  { file: 'index.html', path: '/', key: 'inicio', title: 'Inconformistas FM — Radio Villalba 107.4 FM', description: 'Inconformistas FM es el programa de Radio Villalba: entrevistas, música, cultura y actualidad con humor y sin censura. Escúchanos en 107.4 FM y online.', heading: 'Inconformistas FM' },
  { file: 'programas.html', path: '/programas', key: 'programas', title: 'Programas y entrevistas · Inconformistas FM', description: 'Archivo de programas y entrevistas de Inconformistas FM. Busca artistas, músicos, escritores e invitados y escucha programas emitidos en Radio Villalba 107.4 FM.', heading: 'Programas y entrevistas' },
  { file: 'noticias.html', path: '/noticias', key: 'noticias', title: 'Noticias de Collado Villalba · Inconformistas FM', description: 'Noticias recientes de Collado Villalba y la Sierra de Guadarrama, recopiladas por Inconformistas FM.', heading: 'Noticias de Collado Villalba' },
  { file: 'equipo.html', path: '/equipo', key: 'equipo', title: 'El equipo · Inconformistas FM', description: 'Conoce a Juanma Hontoria y al equipo de Inconformistas FM, el programa de entrevistas, música y cultura de Radio Villalba 107.4 FM.', heading: 'El equipo de Inconformistas FM' },
  { file: 'galeria.html', path: '/galeria', key: 'galeria', title: 'Galería de fotos · Inconformistas FM', description: 'Fotografías del estudio, programas, entrevistas, conciertos e invitados de Inconformistas FM.', heading: 'Galería de Inconformistas FM' },
  { file: 'artistas.html', path: '/artistas', key: 'colaboradores', title: 'Artistas y colaboradores · Inconformistas FM', description: 'Artistas, músicos, escritores, comercios y medios que han colaborado con Inconformistas FM.', heading: 'Artistas y colaboradores' },
  { file: 'radio-online.html', path: '/radio-online', key: 'radio', title: 'Escuchar radio online · Inconformistas FM', description: 'Escucha Inconformistas FM y Radio Villalba 107.4 FM en directo por internet. También puedes recuperar programas en iVoox y Spotify.', heading: 'Radio online · Radio Villalba 107.4 FM' },
  { file: 'contacto.html', path: '/contacto', key: 'contacto', title: 'Contacto · Inconformistas FM', description: 'Contacta con Inconformistas FM para proponer entrevistas, colaboraciones, participar en el programa o enviar tus mensajes.', heading: 'Contacto con Inconformistas FM' }
];

let source = fs.readFileSync('index.html', 'utf8');

// Extrae imágenes incrustadas en HTML, CSS y JavaScript. Así no viajan dentro del
// documento ni del gran archivo JS: se descargan como imágenes independientes y cacheables.
const imageMap = new Map();
let imageBytes = 0;
source = source.replace(/data:image\/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=\r\n]+)/gi, function (whole, mime, encoded) {
  const data = encoded.replace(/\s/g, '');
  const ext = mime.toLowerCase() === 'jpeg' ? 'jpg' : mime.toLowerCase() === 'jpg' ? 'jpg' : mime.toLowerCase();
  const hash = crypto.createHash('sha256').update(data).digest('hex').slice(0, 20);
  const filename = hash + '.' + ext;
  if (!imageMap.has(filename)) {
    const bytes = Buffer.from(data, 'base64');
    fs.writeFileSync(path.join(ROOT, 'images', filename), bytes);
    imageMap.set(filename, bytes.length);
    imageBytes += bytes.length;
  }
  return '/assets/generated/images/' + filename;
});
console.log(imageMap.size + ' imágenes extraídas (' + imageBytes + ' bytes binarios, antes incrustados en HTML/JS).');

// Prerenderiza las mismas vistas que usa la web en el navegador. Se evalúa el código
// original hasta antes del router, con un DOM mínimo seguro; no se inventa contenido.
function renderViews(htmlSource) {
  const blocks = Array.from(htmlSource.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi));
  const app = blocks.find(m => !/\bsrc\s*=/.test(m[1]) && !/application\/ld\+json/i.test(m[1]) && m[2].trim());
  if (!app) throw new Error('No se encontró el JavaScript principal para prerenderizar.');
  const marker = '/* ---------- router y URLs limpias para buscadores ---------- */';
  const markerAt = app[2].indexOf(marker);
  if (markerAt < 0) throw new Error('No se encontró el punto seguro de corte del router; se cancela el build.');
  const code = app[2].slice(0, markerAt) +
    '\nglobalThis.__renderPage = function (route) { return vistas[route](); };';

  const elements = new Map();
  function noop() {}
  function element(id) {
    if (elements.has(id)) return elements.get(id);
    const e = {
      id: id, innerHTML: '', textContent: '', value: '', style: {}, dataset: {},
      className: '', classList: { add: noop, remove: noop, toggle: function () { return false; }, contains: function () { return false; } },
      addEventListener: noop, removeEventListener: noop, setAttribute: noop, removeAttribute: noop,
      getAttribute: function () { return null; }, hasAttribute: function () { return false; },
      appendChild: noop, removeChild: noop, insertBefore: noop, focus: noop, click: noop, remove: noop,
      closest: function () { return null; }, matches: function () { return false; },
      querySelector: function (selector) { return element(id + ':' + selector); }, querySelectorAll: function () { return []; },
      getBoundingClientRect: function () { return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 }; },
      offsetWidth: 0, offsetHeight: 0, clientWidth: 0, clientHeight: 0, scrollTop: 0,
      children: [], files: [], paused: true, play: function () { return Promise.resolve(); }, pause: noop, load: noop
    };
    elements.set(id, e);
    return e;
  }
  const document = {
    getElementById: element,
    querySelector: function (selector) { return element('query:' + selector); },
    querySelectorAll: function () { return []; },
    createElement: function (tag) { return element('created:' + tag + ':' + elements.size); },
    createTextNode: function (text) { return { textContent: text }; },
    addEventListener: noop, removeEventListener: noop, dispatchEvent: noop,
    body: element('body'), head: element('head'), documentElement: element('documentElement'),
    visibilityState: 'visible', fonts: { ready: Promise.resolve() }
  };
  const location = { hash: '', pathname: '/', search: '', origin: 'https://inconformistasfm.es', href: 'https://inconformistasfm.es/' };
  const window = {
    document: document, location: location, innerWidth: 1280, innerHeight: 800,
    addEventListener: noop, removeEventListener: noop, scrollTo: noop, open: noop,
    matchMedia: function () { return { matches: false, addListener: noop, addEventListener: noop }; },
    getComputedStyle: function () { return {}; }, requestAnimationFrame: noop, cancelAnimationFrame: noop
  };
  const context = {
    document: document, window: window, location: location, navigator: { userAgent: 'InconformistasFM build renderer' },
    localStorage: { getItem: function () { return null; }, setItem: noop, removeItem: noop },
    sessionStorage: { getItem: function () { return null; }, setItem: noop, removeItem: noop },
    setTimeout: function () { return 1; }, clearTimeout: noop, setInterval: function () { return 1; }, clearInterval: noop,
    requestAnimationFrame: noop, cancelAnimationFrame: noop,
    fetch: function () { return Promise.resolve({ ok: false, json: function () { return Promise.resolve({}); }, text: function () { return Promise.resolve(''); } }); },
    Image: function () { return element('image:' + elements.size); }, Audio: function () { return element('audio:' + elements.size); },
    URL: URL, URLSearchParams: URLSearchParams, Event: function () {}, CustomEvent: function () {},
    console: { log: noop, warn: noop, error: noop }, performance: { now: function () { return 0; } }
  };
  window.localStorage = context.localStorage;
  window.sessionStorage = context.sessionStorage;
  vm.runInNewContext(code, context, { timeout: 5000, displayErrors: true });
  const result = {};
  for (const route of routes) {
    location.pathname = route.path;
    location.href = 'https://inconformistasfm.es' + route.path;
    let markup = context.__renderPage(route.key);
    if (typeof markup !== 'string' || !markup.trim()) throw new Error('La vista ' + route.key + ' no ha generado contenido HTML.');
    if (route.key === 'programas' && typeof context.pintarProgramas === 'function') {
      context.pintarProgramas('');
      const list = element('lista').innerHTML;
      const counter = element('contador').textContent;
      markup = markup.replace(/(<ul\b[^>]*id="lista"[^>]*>)[\s\S]*?(<\/ul>)/i, function (all, open, close) { return open + list + close; });
      markup = markup.replace(/(<p\b[^>]*id="contador"[^>]*>)[\s\S]*?(<\/p>)/i, function (all, open, close) { return open + counter + close; });
    }
    result[route.key] = markup;
    console.log('Vista prerenderizada: ' + route.path + ' (' + markup.length + ' caracteres)');
  }
  return result;
}

const rendered = renderViews(source);
let cssCount = 0;
let jsCount = 0;
let html = source;

// Procesa scripts y estilos como bloques completos. De este modo no confunde etiquetas
// <style> que aparecen dentro de cadenas JavaScript con hojas de estilo reales.
html = html.replace(/<script\b([^>]*)>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, function (block) {
  if (/^<style\b/i.test(block)) {
    const css = block.replace(/^<style\b[^>]*>/i, '').replace(/<\/style>$/i, '');
    const hash = crypto.createHash('sha256').update(css).digest('hex').slice(0, 16);
    const filename = hash + '.css';
    fs.writeFileSync(path.join(ROOT, 'css', filename), css);
    cssCount++;
    return '<link rel="stylesheet" href="/assets/generated/css/' + filename + '">';
  }
  const attrs = (block.match(/^<script\b([^>]*)>/i) || ['', ''])[1];
  const code = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '');
  if (/\bsrc\s*=/.test(attrs) || /application\/ld\+json/i.test(attrs) || !code.trim()) return block;
  let js = code;
  // Se mantiene la navegación SPA tras la carga inicial para que el reproductor
  // persistente no se corte al cambiar de sección. Solo se elimina el salto a #/inicio.
  js = js.replace(/if\(!location\.hash && location\.pathname==="\/"\) location\.replace\("#\/inicio"\);\s*/, '');
  const hash = crypto.createHash('sha256').update(js).digest('hex').slice(0, 16);
  const filename = hash + '.js';
  fs.writeFileSync(path.join(ROOT, 'js', filename), js);
  jsCount++;
  return '<script src="/assets/generated/js/' + filename + '" defer></script>';
});

function replaceMeta(doc, selector, value, attr) {
  const escaped = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const re = new RegExp('(<meta\\b(?=[^>]*' + selector + ')[^>]*\\b' + attr + '=")[^"]*(")', 'i');
  return doc.replace(re, function (all, before, after) { return before + escaped + after; });
}

function pageFor(route) {
  let doc = html;
  doc = doc.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + route.title + '</title>');
  doc = replaceMeta(doc, 'name="description"', route.description, 'content');
  doc = doc.replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/i, '<link rel="canonical" href="https://inconformistasfm.es' + route.path + '">');
  doc = replaceMeta(doc, 'property="og:title"', route.title, 'content');
  doc = replaceMeta(doc, 'property="og:description"', route.description, 'content');
  doc = replaceMeta(doc, 'property="og:url"', 'https://inconformistasfm.es' + route.path, 'content');
  if (!/<meta\b[^>]*property="og:image"/i.test(doc)) {
    doc = doc.replace(/<meta\b[^>]*property="og:site_name"[^>]*>/i, '$&\n<meta property="og:image" content="https://inconformistasfm.es/favicon-512.png">');
  }
  const bodyContent = rendered[route.key] +
    '<noscript><p>Esta sección de Inconformistas FM está disponible en esta página. Para utilizar el reproductor, las búsquedas y el formulario interactivo, activa JavaScript en tu navegador.</p></noscript>';
  doc = doc.replace(/<main\s+id="main"><\/main>/i, '<main id="main">' + bodyContent + '</main>');
  const schema = '<script type="application/ld+json">' + JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': route.title,
    'description': route.description,
    'url': 'https://inconformistasfm.es' + route.path,
    'inLanguage': 'es',
    'isPartOf': { '@type': 'WebSite', 'name': 'Inconformistas FM', 'url': 'https://inconformistasfm.es/' }
  }) + '</script>';
  // La accesibilidad se corrige en el HTML original, para que los cambios
  // sigan presentes también cuando el router vuelve a pintar la sección.
  doc = doc.replace(/<\/head>/i, schema + '\n</head>');
  return doc;
}

for (const route of routes) {
  const page = pageFor(route);
  fs.writeFileSync(route.file, page);
  console.log('Página HTML independiente: ' + route.file + ' (' + page.length + ' caracteres)');
}
console.log('Build terminado: ' + routes.length + ' páginas, ' + cssCount + ' CSS, ' + jsCount + ' JS y ' + imageMap.size + ' imágenes independientes.');
