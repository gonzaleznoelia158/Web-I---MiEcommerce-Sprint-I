const productsService = require('../services/productsService');

function showProductDetail(req, res) {
  const id = productsService.normalizeId(req.params.id);
  
  if (id === null){ 
    return res.status(400).send('ID inválido'); 
  }
  
  const product = productsService.getById(id); 
  
  if (!product){
    return res.status(404).render('pages/404.ejs', { title: '404 - Página no encontrada' });
  }

  const todosLosProductos = productsService.getAll();
  let relatedProducts = [];

  if (product.categoria) {
      relatedProducts = todosLosProductos.filter(
        (p) => p.categoria === product.categoria && p.id !== product.id
      );

      if (relatedProducts.length > 4) {
        relatedProducts = relatedProducts
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 4); 
      }
  }

  res.render('pages/product', { product, relatedProducts }); 
  //User Story 8
  const todosLosProductos = productsService.getAll();
  
  const relacionados = todosLosProductos 
    .filter(p => p.id !== id)
    .slice(0, 2);

     res.render('pages/product', { product, relacionados }); //si todo sale bien, muestra el producto correspondinte
}

module.exports = { showProductDetail };