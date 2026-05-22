// migrate.js
const db = require9('./database/db');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(_dirname, 'data','products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

//Prepara la insercion
const insert = db.prepare(`
    inset or ignore into products 
    (id, nombre, precio, imagen, descripcion, categoria, stock)
    values (?, ?, ?, ?, ?, ?, ?)
    `)

const insertMany = db.transaction((items) => {
    for(const item of items){
        insert.run(item.id, item.nombre, item.precio, item.imagen, item.descripcion, item.categoria, item.stock);
    }
});

insertMany(products);

console.log(`Migracion de ${products.length} productos a SQLite.`);