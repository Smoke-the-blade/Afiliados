const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'afiliados.json');

function cargarAfiliados() {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function guardarAfiliados(lista) {
  fs.writeFileSync(filePath, JSON.stringify(lista, null, 2), 'utf-8');
}

function existeNumero(numero) {
  const lista = cargarAfiliados();
  return lista.some(a => Number(a.numero_afiliado) === Number(numero));
}

module.exports = { cargarAfiliados, guardarAfiliados, existeNumero };