const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dbPath = path.join(__dirname, 'comentarios.json');

const repoPath = process.cwd(); // Ruta de tu proyecto


// Asegurar que el archivo existe
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// Función para guardar en GitHub
function guardarEnGit() {
    try {
        // Agregar el archivo a Git
        execSync('git add comentarios.json', { cwd: repoPath });
        // Hacer commit con mensaje
        execSync('git commit -m "Actualización automática de comentarios"', { cwd: repoPath });
        // Subir a GitHub
        execSync('git push origin main', { cwd: repoPath });
        console.log("✅ Comentarios guardados en GitHub");
    } catch (error) {
        console.log("⚠️  Git no configurado, pero se guardó localmente");
    }
}

// Obtener comentarios
function obtenerComentarios(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err, []);
        try {
            const comentarios = JSON.parse(data);
            callback(null, comentarios);
        } catch (error) {
            callback(error, []);
        }
    });
}

// Agregar nuevo comentario
function agregarComentario(nombre, comentario, callback) {
    obtenerComentarios((err, comentarios) => {
        if (err) return callback(err);
        
        // Crear nuevo comentario
        const nuevoComentario = {
            id: Date.now(),
            nombre,
            comentario,
            fecha: new Date().toISOString()
        };
        
        // Agregar al inicio de la lista
        comentarios.unshift(nuevoComentario);
        
        // Guardar en archivo
        fs.writeFile(dbPath, JSON.stringify(comentarios, null, 2), (err) => {
            if (err) return callback(err);
            
            // Intentar guardar en GitHub (no bloqueante)
            setTimeout(guardarEnGit, 1000);
            callback(null);
        });
    });
}

module.exports = { obtenerComentarios, agregarComentario };