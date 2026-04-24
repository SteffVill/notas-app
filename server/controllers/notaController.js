const Nota = require('../models/Nota');

const crearNota = async (req, res) => {
    try {
        const { estudianteId, materia, seccion, calificacion } = req.body;
        const nuevaNota = await Nota.create({ estudianteId, materia, seccion, calificacion });
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la nota', error });
    }
};

const obtenerNotas = async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notas', error });
    }
};

const obtenerNotaPorId = async (req, res) => {
    try {
        const nota = await Nota.findByPk(req.params.id);
        if (!nota) return res.status(404).json({ message: 'Nota no encontrada' });
        res.status(200).json(nota);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la nota', error });
    }
};


const actualizarNota = async (req, res) => {
    try {
        const { estudianteId, materia, seccion, calificacion } = req.body;
        const nota = await Nota.findByPk(req.params.id);
        if (!nota) return res.status(404).json({ message: 'Nota no encontrada' });

        nota.estudianteId = estudianteId || nota.estudianteId;
        nota.materia = materia || nota.materia;
        nota.seccion = seccion || nota.seccion;
        nota.calificacion = calificacion || nota.calificacion;
        await nota.save();

        res.status(200).json(nota);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la nota', error });
    }
};

const eliminarNota = async (req, res) => {
    try {
        const nota = await Nota.findByPk(req.params.id);
        if (!nota) return res.status(404).json({ message: 'Nota no encontrada' });

        await nota.destroy();
        res.status(200).json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la nota', error });
    }
};

module.exports = { crearNota, obtenerNotas, obtenerNotaPorId, actualizarNota, eliminarNota };