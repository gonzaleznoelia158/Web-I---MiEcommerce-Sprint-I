const productsService = require('../services/productsService');
const productsData = require('../data/products.json');

function showProductDetail(req, res) {
  const id = productsService.normalizeId(req.params.id);//normaliza el id para evitar errores de tipo
  if (id === null){ 
    return res.status(400).send('ID inválido'); //Si el id no es valido, renderiza un error
  }
  const product = productsService.getById(id); //busca el producto por id en la BD
  if (!product){
     return res.status(404).render('pages/404.ejs', { title: '404 - Página no encontrada' });//si no se encuentra el producto, renderiza un error
  }

  // Aca arranca el user story 8

  let relatedProducts = [];

    // Verificar categoria
  if (product.categoria) {
      // Filtrar productos de la misma categoria menos el actual
      relatedProducts = productsData.filter(
        (p) => p.categoria === product.categoria && p.id !== product.id
      );

      // Si hay mas de 4, hago un random y quedan 4 nomas
      if (relatedProducts.length > 4) {
        relatedProducts = relatedProducts
          .sort(() => 0.5 - Math.random()) // Ese math.random me lo dio la IA, ni idea como funca pero funca
          .slice(0, 4); 
      }
    }

     res.render('pages/product', { product, relatedProducts }); //si todo sale bien, muestra el producto correspondinte
}

//exporta la funcion
module.exports = { showProductDetail };