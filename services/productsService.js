const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
//Muestra el contenido del JSON
function getAll() {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
}
//Busca el producto por id
function getById(id) {
  const products = getAll();
  return products.find(p => p.id === id);
}
//Normalize el id para asegurarse de que es entero
function normalizeId(id) {
  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}

//Exporta las funciones
module.exports = { getAll, getById, normalizeId };