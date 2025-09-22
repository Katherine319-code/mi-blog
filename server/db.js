// db.js
const sql = require("mssql");

// Configuración de conexión
const dbConfig = {
  user: "aca-servidor@aca-servidor",   // tu login
  password: "Servi123",        // tu contraseña
  server: "aca-servidor.database.windows.net",               // IP del servidor
  database: "mi-blog",                  // base de datos que creaste
  options: {
    encrypt: true,                     // usar SSL (Azure lo requiere normalmente)
    trustServerCertificate: true       // confiar en el certificado
  }
};

// Crear un pool de conexión
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Error de conexión con SQL Server:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
