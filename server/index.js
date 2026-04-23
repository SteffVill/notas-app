const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const notaRoutes = require('./routes/notaRoutes');
const Nota = require('./models/Nota');
const estudianteRoutes = require('./routes/estudianteRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notas', notaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
const PORT = process.env.PORT || 3306;

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('✅ Conexión a MySQL (XAMPP) establecida.');
        await db.sync(); 
        console.log('📊 Tablas sincronizadas.');        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
};

startServer();