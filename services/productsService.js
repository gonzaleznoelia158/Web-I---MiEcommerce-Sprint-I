const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
//Leer productos desde el JSON
function readProducts(){
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
}
//Obtener y opion de ordenar productoss
function getAll(sort = null) {
  const products = readProducts();
  if(sort === 'asc'){
    return products.sort((a,b) => a.precio - b.precio);
  } 
  if(sort === 'desc'){
    return products.sort((a,b) => b.precio - a.precio);
  }
  return products;
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