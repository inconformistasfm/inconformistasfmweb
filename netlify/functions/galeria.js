// Esta función mira dentro de la carpeta "galeria" que subes junto a la
// web y devuelve la lista de fotos que hay, sea cual sea su nombre.
// No hay que tocar nada aquí: solo hace falta que exista la carpeta
// "galeria" en el mismo sitio de siempre, junto a index.html.

const fs = require("fs");
const path = require("path");

const EXTENSIONES_VALIDAS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

exports.handler = async function () {
  try {
    const carpetaGaleria = path.join(__dirname, "..", "..", "galeria");
    const archivos = fs
      .readdirSync(carpetaGaleria)
      .filter(function (nombre) {
        return EXTENSIONES_VALIDAS.includes(path.extname(nombre).toLowerCase());
      })
      .sort();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(archivos)
    };
  } catch (error) {
    // Si algo falla (por ejemplo, la carpeta no existe todavía),
    // devolvemos una lista vacía en vez de romper la web.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    };
  }
};
