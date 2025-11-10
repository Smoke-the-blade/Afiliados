function errorHandler(err, req, res, next) {
  // Log básico de error
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;