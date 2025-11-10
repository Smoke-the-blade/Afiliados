const express = require('express');
const router = express.Router();
const { verificarCredenciales } = require('../controllers/credencialesController');

// POST /credenciales/verificar
router.post('/verificar', verificarCredenciales);

module.exports = router;