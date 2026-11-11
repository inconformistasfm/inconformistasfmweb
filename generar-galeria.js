// Genera el manifiesto de la galería y páginas HTML independientes para cada sección.
// Las páginas comparten los mismos recursos y la misma aplicación; cada URL entrega
// un documento HTML propio con metadatos y contenido inicial rastreable.
const fs = require("fs");
const path = require("path");

const dir = "galeria";
if (fs.existsSync(dir)) {
  const fotos = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  fs.writeFileSync(path.join(dir, "fotos.json"), JSON.stringify(fotos));
  console.log(fotos.length + " fotos en galeria/fotos.json");
} else {
  console.log("No existe galeria; se omite fotos.json.");
}

const source = fs.readFileSync("index.html", "utf8");
const routes = [
  { file: "index.html", path: "/", key: "inicio", title: "Inconformistas FM — Radio Villalba 107.4 FM", description: "Inconformistas FM es el programa de Radio Villalba: entrevistas, música, cultura y actualidad con humor y sin censura. Escúchanos en 107.4 FM y online.", heading: "Inconformistas FM", intro: "Entrevistas, música, cultura y actualidad con humor y sin censura. Escucha Inconformistas FM en Radio Villalba 107.4 FM y online." },
  { file: "programas.html", path: "/programas", key: "programas", title: "Programas y entrevistas · Inconformistas FM", description: "Archivo de programas y entrevistas de Inconformistas FM. Escucha programas emitidos en Radio Villalba 107.4 FM.", heading: "Programas y entrevistas", intro: "Consulta el archivo de programas de Inconformistas FM y escucha entrevistas a músicos, artistas, escritores y otros invitados de Radio Villalba 107.4 FM." },
  { file: "noticias.html", path: "/noticias", key: "noticias", title: "Noticias · Inconformistas FM", description: "Noticias de Collado Villalba y actualidad local en Inconformistas FM.", heading: "Noticias", intro: "Sigue la actualidad y las noticias de Collado Villalba y la Sierra de Guadarrama desde Inconformistas FM." },
  { file: "equipo.html", path: "/equipo", key: "equipo", title: "El equipo · Inconformistas FM", description: "Conoce al equipo de Inconformistas FM, el programa de entrevistas, música y cultura de Radio Villalba 107.4 FM.", heading: "Nuestro equipo", intro: "Conoce a las personas que hacen posible Inconformistas FM, el espacio de entrevistas, música y cultura de Radio Villalba 107.4 FM." },
  { file: "galeria.html", path: "/galeria", key: "galeria", title: "Galería de fotos · Inconformistas FM", description: "Galería de fotografías de Inconformistas FM, sus programas, entrevistas y actividades.", heading: "Galería", intro: "Imágenes de los programas, entrevistas, invitados y actividades de Inconformistas FM." },
  { file: "artistas.html", path: "/artistas", key: "colaboradores", title: "Artistas y colaboradores · Inconformistas FM", description: "Artistas, músicos, escritores y colaboradores que han pasado por Inconformistas FM.", heading: "Artistas y colaboradores", intro: "Descubre a músicos, artistas, escritores, intérpretes y colaboradores que han pasado por los micrófonos de Inconformistas FM." },
  { file: "radio-online.html", path: "/radio-online", key: "radio", title: "Radio online · Inconformistas FM", description: "Escucha Radio Villalba 107.4 FM en directo y sigue Inconformistas FM también online.", heading: "Radio online", intro: "Escucha Radio Villalba 107.4 FM en directo y disfruta de Inconformistas FM también a través de internet." },
  { file: "contacto.html", path: "/contacto", key: "contacto", title: "Contacto · Inconformistas FM", description: "Contacta con Inconformistas FM para proponer entrevistas, colaboraciones o enviar tus mensajes.", heading: "Contacto", intro: "Escribe a Inconformistas FM para proponer entrevistas, colaboraciones, enviar sugerencias o saludarnos." }
];

let html = source;
let cssIndex = 0;
html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
  cssIndex++;
  const assetDir = "assets/css";
  fs.mkdirSync(assetDir, { recursive: true });
  fs.writeFileSync(path.join(assetDir, "site-" + cssIndex + ".css"), css);
  return '<link rel="stylesheet" href="/assets/css/site-' + cssIndex + '.css">';
});

let jsIndex = 0;
html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, code) => {
  if (/\bsrc\s*=/.test(attrs) || /application\/ld\+json/i.test(attrs) || !code.trim()) return whole;
  jsIndex++;
  const assetDir = "assets/js";
  fs.mkdirSync(assetDir, { recursive: true });
  let js = code;
  if (js.includes("Navegación interna sin recargar")) {
    js = js.replace(/\/\/ Navegación interna sin recargar:[\s\S]*?window\.addEventListener\("hashchange",pintar\);/, 'window.addEventListener("hashchange",pintar);');
    js = js.replace(/if\(!location\.hash && location\.pathname==="\/"\) location\.replace\("#\/inicio"\);\s*/, "");
  }
  fs.writeFileSync(path.join(assetDir, "site-" + jsIndex + ".js"), js);
  return '<script src="/assets/js/site-' + jsIndex + '.js" defer></script>';
});

if (!/<base\b/i.test(html)) html = html.replace(/<head([^>]*)>/i, '<head$1>\n<base href="/">');

function replaceMeta(doc, selector, value, attr) {
  const re = new RegExp('(<meta\\b(?=[^>]*' + selector + ')[^>]*\\b' + attr + '=")[^"]*(")', "i");
  return doc.replace(re, "$1" + value.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + "$2");
}
function pageFor(route) {
  let doc = html;
  doc = doc.replace(/<title>[\s\S]*?<\/title>/i, "<title>" + route.title + "</title>");
  doc = replaceMeta(doc, 'name="description"', route.description, "content");
  doc = doc.replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/i, '<link rel="canonical" href="https://inconformistasfm.es' + route.path + '">');
  doc = replaceMeta(doc, 'property="og:title"', route.title, "content");
  doc = replaceMeta(doc, 'property="og:description"', route.description, "content");
  doc = replaceMeta(doc, 'property="og:url"', "https://inconformistasfm.es" + route.path, "content");
  const staticMain = '<main id="main"><section class="seccion"><div class="wrap"><h1>' + route.heading + '</h1><p>' + route.intro + '</p><p>Explora las secciones de Inconformistas FM desde el menú principal. Esta página forma parte del sitio oficial de Radio Villalba 107.4 FM.</p><noscript>Para escuchar los programas y utilizar todas las funciones, activa JavaScript en tu navegador.</noscript></div></section></main>';
  doc = doc.replace(/<main\s+id="main"><\/main>/i, staticMain);
  const schema = '<script type="application/ld+json">' + JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": route.title,
    "description": route.description,
    "url": "https://inconformistasfm.es" + route.path,
    "isPartOf": { "@type": "WebSite", "name": "Inconformistas FM", "url": "https://inconformistasfm.es/" }
  }) + '</script>';
  doc = doc.replace(/<\/head>/i, schema + "\n</head>");
  return doc;
}

for (const route of routes) {
  fs.writeFileSync(route.file, pageFor(route));
  console.log("Página independiente generada: " + route.file + " (" + route.path + ")");
}
console.log("Recursos compartidos: " + cssIndex + " CSS y " + jsIndex + " JavaScript.");
