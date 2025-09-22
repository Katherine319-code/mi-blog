const { sql, poolPromise } = require("./db");

// Listar comentarios
async function listarComentarios() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Comentarios ORDER BY Fecha DESC");
  return result.recordset;
}

// Agregar comentario
async function agregarComentario(nombre, email, contenido) {
  const pool = await poolPromise;
  await pool.request()
    .input("Nombre", sql.NVarChar, nombre)
    .input("Email", sql.NVarChar, email)
    .input("Contenido", sql.NVarChar, contenido)
    .query("INSERT INTO Comentarios (Nombre, Email, Contenido) VALUES (@Nombre, @Email, @Contenido)");
}

module.exports = { listarComentarios, agregarComentario };
