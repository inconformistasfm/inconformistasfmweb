// Genera fotos.json (lista de fotos) y las versiones ligeras de cada imagen.
// Se ejecuta solo con GitHub Actions cuando subes fotos a "galeria/" o "fotos-programas/".
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' });
const OPT = 'optimizadas';          // optimizadas/min/... y optimizadas/med/...

function listar(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && EXT.test(e.name))
    .map(e => e.name)
    .sort(collator.compare);
}

const manifiesto = { galeria: [], programas: {} };

for (const n of listar('galeria')) manifiesto.galeria.push(`galeria/${n}`);

if (fs.existsSync('fotos-programas')) {
  const carpetas = fs.readdirSync('fotos-programas', { withFileTypes: true })
    .filter(e => e.isDirectory() && /^\d+$/.test(e.name))
    .map(e => e.name)
    .sort((a, b) => Number(a) - Number(b));
  for (const c of carpetas) {
    const fotos = listar(`fotos-programas/${c}`).map(n => `fotos-programas/${c}/${n}`);
    if (fotos.length) manifiesto.programas[c] = fotos;
  }
}

const todas = [...manifiesto.galeria, ...Object.values(manifiesto.programas).flat()];
const esperadas = new Set();

async function crear(origen, destino, ancho, calidad) {
  esperadas.add(destino);
  if (fs.existsSync(destino)) return;
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  try {
    await sharp(origen, { failOn: 'none' })
      .rotate()
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: calidad })
      .toFile(destino);
    console.log('creada', destino);
  } catch (e) {
    console.warn('No se pudo optimizar', origen, e.message);
  }
}

for (const f of todas) {
  if (/\.gif$/i.test(f)) continue;   // los GIF se sirven tal cual
  await crear(f, `${OPT}/min/${f}.webp`, 480, 70);
  await crear(f, `${OPT}/med/${f}.webp`, 1600, 78);
}

// Borra versiones ligeras de fotos que ya no existen
(function limpiar(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name).split(path.sep).join('/');
    if (e.isDirectory()) { limpiar(p); try { fs.rmdirSync(p); } catch {} }
    else if (!esperadas.has(p)) fs.unlinkSync(p);
  }
})(OPT);

fs.writeFileSync('fotos.json', JSON.stringify(manifiesto, null, 1) + '\n');
console.log(`fotos.json: ${manifiesto.galeria.length} en galeria, ${Object.keys(manifiesto.programas).length} programas con fotos`);
