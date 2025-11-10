const ALLOWED_TYPES = ['permanente', 'parcial'];

function isPositiveInteger(n) {
  const num = Number(n);
  return Number.isInteger(num) && num > 0;
}

function nonEmptyString(s) {
  return typeof s === 'string' && s.trim().length > 0;
}

function validateInput({ numero_afiliado, nombre, apellido, tipo }) {
  if (!isPositiveInteger(numero_afiliado)) {
    return { ok: false, error: 'numero_afiliado debe ser entero positivo' };
  }
  if (!nonEmptyString(nombre)) {
    return { ok: false, error: 'nombre debe ser texto no vacío' };
  }
  if (!nonEmptyString(apellido)) {
    return { ok: false, error: 'apellido debe ser texto no vacío' };
  }
  if (!nonEmptyString(tipo)) {
    return { ok: false, error: 'tipo es requerido' };
  }

  const normalized = String(tipo).toLowerCase();
  if (!ALLOWED_TYPES.includes(normalized)) {
    return { ok: false, error: 'tipo inválido' };
  }

  return { ok: true };
}

module.exports = { validateInput, ALLOWED_TYPES };