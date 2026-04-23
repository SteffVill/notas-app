const Nota = require('../models/Nota');

const crearNota = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const nuevaNota = await Nota.create({ titulo, contenido });
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

module.exports = { crearNota, obtenerNotas };