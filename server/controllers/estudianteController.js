const Estudiante = require('../models/Estudiante');

const crearEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;
        if (!nombre || !apellido || !email) {
            return res.status(400).json({ message: 'Faltan datos: nombre, apellido o email' });
        }
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

const actualizarEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
        await estudiante.update({ nombre, apellido, email });
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estudiante', error });
    }
};

const eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
        await estudiante.destroy();
        res.status(200).json({ message: 'Estudiante eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el estudiante', error });
    }
};

module.exports = {
    crearEstudiante,
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    actualizarEstudiante,
    eliminarEstudiante
};