const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS comentarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        comentario TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Funciones de base de datos
function obtenerComentarios(callback) {
    db.all("SELECT * FROM comentarios ORDER BY fecha DESC", callback);
}

function agregarComentario(nombre, comentario, callback) {
    db.run("INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)", 
           [nombre, comentario], callback);
}

module.exports = {
    obtenerComentarios,
    agregarComentario
};