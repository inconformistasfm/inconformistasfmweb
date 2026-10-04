// Genera galeria/fotos.json con todas las imágenes de la carpeta "galeria".
// Cloudflare Pages lo ejecuta en cada despliegue (Build command: node generar-galeria.js).
const fs = require("fs");

const dir = "galeria";

if (!fs.existsSync(dir)) {
  console.log("No existe la carpeta '" + dir + "'. No se genera fotos.json.");
  process.exit(0);
}

const fotos = fs.readdirSync(dir)
  .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(dir + "/fotos.json", JSON.stringify(fotos));
console.log(fotos.length + " fotos en " + dir + "/fotos.json");
