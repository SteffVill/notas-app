const { DataTypes } = require('sequelize');
const db = require('../config/db'); 
const Estudiante = require('./Estudiante');

const Nota = db.define('Nota', {   
    estudianteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estudiantes', 
            key: 'id'
        }
    },
    
    materia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
   
    seccion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
   
    calificacion: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 20 
        }
    }
}, {
    tableName: 'notas', 
    timestamps: true    
});

Estudiante.hasMany(Nota, { foreignKey: 'estudianteId', onDelete: 'CASCADE' });
Nota.belongsTo(Estudiante, { foreignKey: 'estudianteId' });

module.exports = Nota;