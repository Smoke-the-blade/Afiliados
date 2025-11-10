require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}/`);
  console.log(`Front: http://localhost:${PORT}/`);
  console.log(`Verificación: POST http://localhost:${PORT}/credenciales/verificar`);
});