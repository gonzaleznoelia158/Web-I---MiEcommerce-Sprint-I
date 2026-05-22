const ProductModel = require('./models/ProductModel');
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

ProductModel.insertMany(products);
console.log(`Migrados ${products.length} productos a SQLite.`);