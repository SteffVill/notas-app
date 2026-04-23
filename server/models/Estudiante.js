const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Estudiante = db.define('Estudiante', {
    nombre: {
        type: DataTypes.STRING,    
        allowNull: false
    },
    apellido: { 
        type: DataTypes.STRING,    
        allowNull: false
    },  
    email: {
        type: DataTypes.STRING,    
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    }
    }, 
    {
    timestamps: true 
});       
module.exports = Estudiante;