const { DataTypes } = require('sequelize');
const db = require('../config/db'); 
const Estudiante = require('./Estudiante');
const Nota = db.define('Nota', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true 
});

Estudiante.hasMany(Nota, { foreignKey: 'estudianteId', onDelete: 'CASCADE' });
Nota.belongsTo(Estudiante, { foreignKey: 'estudianteId' });

module.exports = Nota;