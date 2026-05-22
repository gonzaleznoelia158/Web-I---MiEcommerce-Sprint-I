const productsService = require('../services/productsService');

function showProductDetail(req, res) {
  const id = productsService.normalizeId(req.params.id);//normaliza el id para evitar errores de tipo
  if (id === null){ 
    return res.status(400).send('ID inválido'); //Si el id no es valido, renderiza un error
  }
  const product = productsService.getById(id); //busca el producto por id en la BD
  if (!product){
     return res.status(404).send('Producto no encontrado');//si no se encuentra el producto, renderiza un error
  }
  //User Story 8
  const todosLosProductos = productsService.getAll();
  
  const relacionados = todosLosProductos 
    .filter(p => p.id !== id)
    .slice(0, 2);

     res.render('pages/product', { product, relacionados }); //si todo sale bien, muestra el producto correspondinte
     res.render('pages/product', { product }); //si todo sale bien, muestra el producto correspondinte
}

//exporta la funcion
module.exports = { showProductDetail };