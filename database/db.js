const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'ecommerce.db');
const db = new Database(dbPath);

// Crear tabla si no existe 
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio INTEGER NOT NULL,
    imagen TEXT,
    descripcion TEXT,
    categoria TEXT,
    stock INTEGER DEFAULT 0
  )
`);

module.exports = db;