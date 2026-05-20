const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

// Controlador para manejar el carrito de compras

//Muestra el ccontenido del carrito y el total en pesos
function showCart(req, res) {
  const cart = cartService.getFullCart(req, productsService);
  const total = cartService.getTotalPesos(req, productsService);
  res.render('pages/cart', { cart, total });
}

//Muestra la pagina del checkout con el contenido del carrito
function showCheckout(req, res){
  const cart = cartService.getFullCart(req, productsService);
  const total = cartService.getTotalPesos(req, productsService);
  res.render('pages/checkout', {cart, total, subtotal: total, envio: 0});
}

//Agrega un producto al carrito
function addToCart(req, res) {
  const productId = productsService.normalizeId(req.params.productId);
  if (productId === null){ //Valida que sea id correcto
    return res.status(400).send('ID inválido'); //Renderiza una pag de error
  }
    const product = productsService.getById(productId); //Valida que el producto exista

  if (!product){ 
     return res.status(404).send('Producto no existe'); //si no existe el producto renderiza un pagina de error.
  }
  cartService.addItem(req, productId, 1);//Agrega un producto al carrito
  res.redirect('/products/cart'); //Renderiza el carrito
}

//Actualiza la cantidad de un producto en el carrito
function updateCartItem(req, res) {
  const productId = productsService.normalizeId(req.params.productId);
  const quantity = parseInt(req.body.quantity, 10);

  if (productId === null || isNaN(quantity)){ //Valida que el id y la cantidad sean correctos
     return res.status(400).send('Datos inválidos'); //Renderiza una pagina de error
  }
     cartService.updateQuantity(req, productId, quantity);
  res.redirect('/products/cart'); //Actualiza el carrito con la nueva cantidad
}

//Vacia el carrito de compras
function clearCart(req, res) {
  cartService.clearCart(req);
  res.redirect('/products/cart');
}

//Exporta las funciones
module.exports = { showCart, showCheckout, addToCart, updateCartItem, clearCart };