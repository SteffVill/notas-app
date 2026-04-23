const express = require('express');
const router = express.Router();
const { crearNota, obtenerNotas, obtenerNotaPorId, actualizarNota, eliminarNota } = require('../controllers/notaController');

router.post('/', crearNota);

router.get('/', obtenerNotas);

router.get('/:id', obtenerNotaPorId);

router.put('/:id', actualizarNota);

router.delete('/:id', eliminarNota);

module.exports = router;