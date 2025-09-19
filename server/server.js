const express = require('express');
const path = require('path');
const cors = require('cors');
const { sql, poolPromise } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '../public')));

// 📌 GET: Listar comentarios
app.get('/api/comentarios', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Comentarios ORDER BY fecha DESC");
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// 📌 POST: Insertar comentario
app.post('/api/comentarios', async (req, res) => {
    try {
        const { nombre, comentario } = req.body;

        if (!nombre || !comentario) {
            return res.status(400).json({ error: "Nombre y comentario son requeridos" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('comentario', sql.Text, comentario)
            .query('INSERT INTO Comentarios (nombre, comentario, fecha) VALUES (@nombre, @comentario, GETDATE())');

        res.json({ success: true, message: "Comentario guardado correctamente" });
    } catch (err) {
        console.error("Error al guardar comentario:", err);
        res.status(500).json({ error: "Error al guardar el comentario" });
    }
});



app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
