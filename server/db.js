// db 
const {Pool} = require('pg');
require("dotenv").config();

// Consumo de url de database de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});
  
// Crear un pool de conexión
pool.connect()
  .then(() => {console.log("Conectado a Postgres en Render");})
  .catch(err => {
    console.error("Error de conexión con Postgres en Render:", err);
    process.exit(1);
  });

module.exports = pool;

