const { DataTypes } = require('sequelize');
const db = require('../config/db'); 

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

module.exports = Nota;