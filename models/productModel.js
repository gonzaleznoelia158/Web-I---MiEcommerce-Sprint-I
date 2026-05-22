const db = require('../database/db');

function getAll(orderBy = null) {
  let query = 'SELECT * FROM products';
  if (orderBy === 'asc') query += ' ORDER BY precio ASC';
  if (orderBy === 'desc') query += ' ORDER BY precio DESC';
  const stmt = db.prepare(query);
  return stmt.all();
}

function getById(id) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return stmt.get(id);
}

function getByCategory(categoria) {
  const stmt = db.prepare('SELECT * FROM products WHERE categoria = ?');
  return stmt.all(categoria);
}

function searchByName(termino) {
  const stmt = db.prepare('SELECT * FROM products WHERE nombre LIKE ?');
  return stmt.all(`%${termino}%`);
}

// Para la migración (insertar muchos)
function insertMany(products) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO products (id, nombre, precio, imagen, descripcion, categoria, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(item.id, item.nombre, item.precio, item.imagen, item.descripcion, item.categoria, item.stock);
    }
  });
  insertMany(products);
}



module.exports = { getAll, getById, getByCategory, searchByName, insertMany };