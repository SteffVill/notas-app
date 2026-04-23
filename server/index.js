const notaRoutes = require('./routes/notaRoutes');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/notas', notaRoutes);
const PORT = process.env.PORT || 3306;

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('✅ Conexión a MySQL (XAMPP) establecida.');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
};

startServer();