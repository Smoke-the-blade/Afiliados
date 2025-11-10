const express = require('express');
const router = express.Router();
const { crearAfiliado, listarAfiliados } = require('../controllers/afiliadosController');

router.get('/', listarAfiliados);
router.post('/', crearAfiliado);

module.exports = router;