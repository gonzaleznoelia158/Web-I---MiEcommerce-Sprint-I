const ProductModel = require('../models/ProductModel');

function getAll(sort = null) {
  // lógica de negocio: si sort es válido, se lo pasa; si no, null
  let orderBy = null;
  if (sort === 'asc' || sort === 'desc') orderBy = sort;
  return ProductModel.getAll(orderBy);
}

function getById(id) {
  return ProductModel.getById(id);
}

function normalizeId(id) {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed)) return null;
  // validar existencia en BD
  const product = ProductModel.getById(parsed);
  return product ? parsed : null;
}

function getByCategory(categoria) {
  return ProductModel.getByCategory(categoria);
}

function searchByName(termino) {
  return ProductModel.searchByName(termino);
}

function createProduct(data){
  return ProductModel.create(data);
}

function updateProduct(id, data){
  return ProductModel.update(id, data);
}

function deleteProduct(id){
  return ProductModel.deleteProduct(id);
}

function countProduct(){
  return ProductModel.count();
}

module.exports = { getAll, getById, normalizeId, getByCategory, searchByName, createProduct, updateProduct, deleteProduct, countProduct };