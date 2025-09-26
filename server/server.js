const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// desplegar frontend
app.use(express.static(path.join(__dirname, '../public')));

// Crear la base de datos

(async () => {

  try {

    await pool.query(`

      CREATE TABLE IF NOT EXISTS comentarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        comentario TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT NOW()
      );

    `);
    console.log("Tabla 'comentarios' verificada/creada correctamente.");
    } catch (err) {
        console.error("Error al crear/verificar la tabla 'comentarios':", err);
    }                       
})();

// 📌 GET: Listar comentarios
app.get('/api/comentarios', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.query("SELECT * FROM Comentarios ORDER BY fecha DESC");
        res.json(result.row);
    } catch (err) {
        console.error("Error al obtener comentarios",err);
        res.status(500).json({ error: err.message });
    }
});

// 📌 POST: Agregar comentario
app.post('/api/comentarios', async (req, res) => {
    try {
        const { nombre, comentario } = req.body;

        if (!nombre || !comentario) {
            return res.status(400).json({ error: "Nombre y comentario son requeridos" });
        }

         await pool.query("INSERT INTO Comentarios (nombre, comentario, fecha) VALUES ($1, $2, NOW())",
            [nombre, comentario]
        );

        res.json({ success: true, message: "Comentario guardado correctamente" });
    } catch (err) {
        console.error("Error al guardar comentario:", err);
        res.status(500).json({ error: "Error al guardar el comentario" });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
