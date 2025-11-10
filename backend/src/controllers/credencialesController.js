const { verificar } = require('../services/companeroService');
const { validateInput } = require('../utils/validation');

async function verificarCredenciales(req, res, next) {
  try {
    const input = req.body;

    const valid = validateInput(input);
    if (!valid.ok) {
      return res.status(400).json({ error: valid.error });
    }

    const result = await verificar(input);
    if (result.ok) {
      return res.status(200).json({ mensaje: 'ok credencial correcto' });
    }

    return res.status(400).json({ error: result.error || 'Credenciales no válidas' });
  } catch (err) {
    next(err);
  }
}

module.exports = { verificarCredenciales };