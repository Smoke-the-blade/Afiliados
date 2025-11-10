const express = require('express');
const cors = require('cors');
const path = require('path');
const credencialesRouter = require('./routes/credenciales.routes');
const afiliadosRouter = require('./routes/afiliados.routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Servir el front desde ../front
const frontDir = path.resolve(__dirname, '..', '..', 'front');
app.use(express.static(frontDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(frontDir, 'index.html'));
});

// Rutas
app.use('/credenciales', credencialesRouter);
app.use('/afiliados', afiliadosRouter);

// 404 y errores globales
app.use(notFound);
app.use(errorHandler);

module.exports = app;