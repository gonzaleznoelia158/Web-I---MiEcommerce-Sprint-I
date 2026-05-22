const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'ecommerce.db');
const db = new Database(dbPath);


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


db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;