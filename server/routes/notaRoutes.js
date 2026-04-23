const express = require('express');
const router = express.Router();
const { crearNota, obtenerNotas } = require('../controllers/notaController');

router.post('/', crearNota);

router.get('/', obtenerNotas);

module.exports = router;