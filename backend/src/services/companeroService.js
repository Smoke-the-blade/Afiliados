const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'companeros.json');

function loadData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

async function verificar({ numero_afiliado, nombre, apellido, tipo }) {
  try {
    const data = loadData();
    const match = data.find((item) =>
      Number(item.numero_afiliado) === Number(numero_afiliado) &&
      item.nombre === nombre &&
      item.apellido === apellido &&
      item.tipo === tipo
    );
    if (match) {
      return { ok: true };
    }
    return { ok: false, error: 'No coincide con ningún registro' };
  } catch (err) {
    return { ok: false, error: 'Error al leer datos' };
  }
}

module.exports = { verificar };