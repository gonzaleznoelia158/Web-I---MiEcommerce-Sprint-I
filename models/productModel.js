const db = require('../database/db');
const Product = require('../models/productModel');

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

// Funcion que permite crear productos
function create(data) {
  const { nombre, precio, imagen, descripcion, categoria, stock } = data;
 
  if(!nombre || !precio || !categoria){
    throw new Error("Faltan datos");
  }

  const nuevo = db.prepare(`
    INSERT INTO products (nombre, precio, imagen, descripcion, categoria, stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
 
  const result = nuevo.run(nombre, precio, imagen, descripcion, categoria, stock);
  return getById(result.lastInsertRowid);
}

// funcion para editar el producto
function update(id, data){
  const{nombre, precio, imagen, descripcion, categoria, stock} = data;
  const pro = db.prepare(`
    update products
    set nombre = ?, precio = ?, imagen = ?, descripcion = ?, categoria = ?, stock = ?
    where id = ?
    `);
    pro.run(nombre,precio, imagen, descripcion, categoria, stock, id);
    return getById(id);
}

// Funcion para borar el producto
function deleteProduct(id){
  const pro = db.prepare('delete from products where id = ?');
  return pro.run(id);
}

//Contador
function count(){
  const pro = db.prepare('select count(*) as total from products');
  return pro.get().total;
}

module.exports = { getAll, getById, getByCategory, searchByName, insertMany, create, update, deleteProduct, count };