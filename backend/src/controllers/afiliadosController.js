const { cargarAfiliados, guardarAfiliados, existeNumero } = require('../services/afiliadosService');
const { validateInput } = require('../utils/validation');

function listarAfiliados(req, res, next) {
  try {
    const lista = cargarAfiliados();
    res.json(lista);
  } catch (err) {
    next(err);
  }
}

function crearAfiliado(req, res, next) {
  try {
    const payload = req.body;
    const valid = validateInput(payload);
    if (!valid.ok) {
      return res.status(400).json({ error: valid.error });
    }

    if (existeNumero(Number(payload.numero_afiliado))) {
      return res.status(400).json({ error: 'numero_afiliado ya existe' });
    }

    const lista = cargarAfiliados();
    const nuevo = {
      numero_afiliado: Number(payload.numero_afiliado),
      nombre: String(payload.nombre).trim(),
      apellido: String(payload.apellido).trim(),
      tipo: String(payload.tipo).toLowerCase()
    };
    lista.push(nuevo);
    guardarAfiliados(lista);
    res.status(201).json({ mensaje: 'afiliación creada', afiliado: nuevo });
  } catch (err) {
    next(err);
  }
}

module.exports = { listarAfiliados, crearAfiliado };