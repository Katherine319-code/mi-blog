// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('./db'); // importación clase db

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// desplegar frontend
app.use(express.static(path.join(__dirname, '../public')));

// Crear la tabla si no existe
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
    console.log("Tabla 'comentarios' creada correctamente.");
  } catch (err) {
    console.error("Error al crear tabla 'comentarios':", err);
  }
})();

// 📌 GET: Listar comentarios
app.get('/api/comentarios', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM comentarios ORDER BY fecha DESC");
    res.json(result.rows); //Envia solo filas
  } catch (err) {
    console.error("❌ Error al obtener comentarios:", err);
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

    await pool.query(
      "INSERT INTO comentarios (nombre, comentario, fecha) VALUES ($1, $2, NOW())",
      [nombre, comentario]
    );

    res.json({ success: true, message: "Comentario guardado correctamente" });
  } catch (err) {
    console.error("❌ Error al guardar comentario:", err);
    res.status(500).json({ error: "Error al guardar el comentario" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
