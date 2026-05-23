const db = require('./database/db');

const products = [
  { nombre: 'Alfajor Block', precio: 500, imagen: '/img/productos/alfajorBlock60gr.jpg', descripcion: '', categoria: 'alimentos', stock: 0 },
  { nombre: 'Burger Doble', precio: 9000, imagen: '/img/productos/burgerDoble.jpg', descripcion: '', categoria: 'alimentos', stock: 0 },
  { nombre: 'Burger Simple', precio: 7000, imagen: '/img/productos/burgerSimple.jpg', descripcion: '', categoria: 'alimentos', stock: 0 },
  { nombre: 'Cofler 70gr', precio: 600, imagen: '/img/productos/cofler70gr.jpg', descripcion: '', categoria: 'alimentos', stock: 0 },
  { nombre: 'Cosmico 500gr', precio: 800, imagen: '/img/productos/cosmico500gr.jpg', descripcion: '', categoria: 'alimentos', stock: 12 },
  { nombre: 'Doritos Original 30gr', precio: 700, imagen: '/img/productos/doritosOriginal30gr.jpg', descripcion: '', categoria: 'alimentos', stock: 18 },
  { nombre: 'Fanta Pile', precio: 1400, imagen: '/img/productos/FantaPile.jpg', descripcion: '', categoria: 'bebidas', stock: 10 },
  { nombre: 'Fanta Roja', precio: 1200, imagen: '/img/productos/FantaRoja.jpg', descripcion: '', categoria: 'bebidas', stock: 15 },
  { nombre: 'Fernet', precio: 3000, imagen: '/img/productos/fernet.jpg', descripcion: '', categoria: 'bebidas', stock: 8 },
  { nombre: 'Franui Original', precio: 500, imagen: '/img/productos/franuiOriginal.jpg', descripcion: '', categoria: 'alimentos', stock: 20 },
  { nombre: 'Mate Imperial', precio: 2500, imagen: '/img/productos/mateImperial.jpg', descripcion: '', categoria: 'bebidas', stock: 10 },
  { nombre: 'Oreos', precio: 900, imagen: '/img/productos/oreos.jpg', descripcion: '', categoria: 'alimentos', stock: 14 },
  { nombre: 'Playadito 1000gr', precio: 1800, imagen: '/img/productos/playadito1000gr.jpg', descripcion: '', categoria: 'bebidas', stock: 9 },
  { nombre: 'Pringles', precio: 2000, imagen: '/img/productos/pringles.jpg', descripcion: '', categoria: 'alimentos', stock: 12 },
  { nombre: 'Vizzio Cacao 90gr', precio: 1100, imagen: '/img/productos/vizzioCacao90gr.jpg', descripcion: '', categoria: 'alimentos', stock: 16 },
];

const stmt = db.prepare(`
  INSERT INTO products (nombre, precio, imagen, descripcion, categoria, stock)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const insertAll = db.transaction((items) => {
  for (const p of items) {
    stmt.run(p.nombre, p.precio, p.imagen, p.descripcion, p.categoria, p.stock);
  }
});

insertAll(products);
console.log(` ${products.length} productos insertados correctamente.`);