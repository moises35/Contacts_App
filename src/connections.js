// Importamos el modulo PG para conectar con la base de datos
const Pool = require('pg').Pool

// Configuración de la conexión a la base de datos
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_DB,
    ssl: {
        rejectUnauthorized: false
    }
})

// Exportamos la conexión
module.exports = {pool}