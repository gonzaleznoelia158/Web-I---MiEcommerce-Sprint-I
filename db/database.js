const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'ecommerce.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath);

// Ejecuta el schema si la base es nueva
const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

console.log('Base de datos SQLite conectada correctamente.');

module.exports = db;