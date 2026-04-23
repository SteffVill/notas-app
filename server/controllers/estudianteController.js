const Estudiante = require('../models/Estudiante');

const crearEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;
        const nuevoEstudiante = await Estudiante.create({ nombre, apellido, email });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el estudiante', error });
    }
};

const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();     
        res.status(200).json(estudiantes);
    } catch (error) {   
        res.status(500).json({ message: 'Error al obtener los estudiantes', error });
    }
};

const obtenerEstudiantePorId = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el estudiante', error });
    }
};

module.exports = {
    crearEstudiante,
    obtenerEstudiantes,
    obtenerEstudiantePorId
};