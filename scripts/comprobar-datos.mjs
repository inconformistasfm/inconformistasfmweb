// Comprueba que datos/programas.js está bien escrito. Si hay un fallo, lo dice en castellano.
import fs from 'fs';
import vm from 'vm';

const ruta = 'datos/programas.js';
const errores = [];
let lista = null;

try {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(ruta, 'utf8'), ctx);
  lista = ctx.window.PROGRAMAS;
} catch (e) {
  console.error('ERROR: el archivo ' + ruta + ' tiene un fallo de escritura (probablemente falta una coma, una comilla o una llave).');
  console.error('Detalle técnico: ' + e.message);
  process.exit(1);
}

if (!Array.isArray(lista) || lista.length === 0) {
  console.error('ERROR: no encuentro la lista window.PROGRAMAS=[ ... ]; en ' + ruta);
  process.exit(1);
}

const vistos = new Set();
const campos = new Set(['n', 'titulo', 'ivoox', 'audio', 'blog', 'spotify', 'desde']);
lista.forEach((p, i) => {
  const que = 'Línea ' + (i + 1) + (p && p.n ? ' (programa ' + p.n + ')' : '');
  if (!p || typeof p !== 'object') { errores.push(que + ': no es un programa válido.'); return; }
  if (!Number.isInteger(p.n) || p.n < 1) errores.push(que + ': "n" debe ser un número entero, sin comillas.');
  else if (vistos.has(p.n)) errores.push(que + ': el número ' + p.n + ' está repetido.');
  else vistos.add(p.n);
  if (typeof p.titulo !== 'string' || !p.titulo.trim()) errores.push(que + ': falta el "titulo".');
  for (const k of Object.keys(p)) if (!campos.has(k)) errores.push(que + ': campo desconocido "' + k + '" (¿mal escrito?).');
  for (const k of ['ivoox', 'audio', 'blog', 'spotify']) {
    if (p[k] != null && !/^https?:\/\//.test(p[k])) errores.push(que + ': "' + k + '" debe ser un enlace que empiece por https://');
  }
  if (p.desde != null && (typeof p.desde !== 'string' || isNaN(new Date(p.desde)) || !/[+-]\d\d:\d\d$|Z$/.test(p.desde)))
    errores.push(que + ': "desde" debe ser como "2026-11-21T20:30:00+01:00" (con +01:00 o +02:00 al final).');
});

if (errores.length) {
  console.error('Se han encontrado ' + errores.length + ' problema(s) en ' + ruta + ':');
  errores.forEach(e => console.error(' - ' + e));
  process.exit(1);
}
console.log('OK: ' + lista.length + ' programas, todo correcto.');
