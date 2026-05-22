const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(_dirname, 'ecommerce.db');
const db = new Database(dbPath);

//Crear tabla product si no exite
db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio TEXT,
    imagen  TEXT,
    descripcion TEXT,
    categoria TEXT,
    stock INTEGER DEFAULT 0
    )
`);


module.exports = db;