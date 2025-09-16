const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'comentarios.json');

// Inicializar archivo JSON si no existe
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Funciones de base de datos
function obtenerComentarios(callback) {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        const comentarios = JSON.parse(data);
        callback(null, comentarios);
    } catch (error) {
        callback(error, []);
    }
}

function agregarComentario(nombre, comentario, callback) {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        const comentarios = JSON.parse(data);
        
        const nuevoComentario = {
            id: Date.now(),
            nombre,
            comentario,
            fecha: new Date().toISOString()
        };
        
        comentarios.unshift(nuevoComentario); // Agregar al inicio
        fs.writeFileSync(dbPath, JSON.stringify(comentarios, null, 2));
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = {
    obtenerComentarios,
    agregarComentario
};