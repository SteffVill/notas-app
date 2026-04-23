const express = require('express');
const router = express.Router();
const { crearEstudiante, obtenerEstudiantes, obtenerEstudiantePorId, actualizarEstudiante, eliminarEstudiante } = require('../controllers/estudianteController');
router.post('/', crearEstudiante);

router.get('/', obtenerEstudiantes); 
router.get('/:id', obtenerEstudiantePorId);

router.put('/:id', actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);

module.exports = router;