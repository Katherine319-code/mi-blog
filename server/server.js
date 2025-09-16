const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./database-json');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas para la API
app.get('/api/comentarios', (req, res) => {
    db.obtenerComentarios((err, comentarios) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(comentarios);
    });
});

app.post('/api/comentarios', (req, res) => {
    const { nombre, comentario } = req.body;
    
    if (!nombre || !comentario) {
        return res.status(400).json({ error: 'Nombre y comentario son requeridos' });
    }
    
    db.agregarComentario(nombre, comentario, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});