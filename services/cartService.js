/* Servicio para gestionar el carrito de compras */

//inicializa el carrito
function getCart(req) {
  if (!req.session.cart) req.session.cart = []; 
  return req.session.cart; //si no existe el carrito, lo inicializa vacio
}

//Agrega un producto al carrito o actualiza la cantidad
function addItem(req, productId, quantity = 1) {
  const cart = getCart(req); //obtiene el carrito actual
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity; //Si el producto existe, actualiza la cantidad
  } else {
    cart.push({ productId, quantity }); // sino, lo agrega
  }
  req.session.cart = cart; //guarda el carrito
}

//Actualiza la cantidad de un producto en el carrito o lo elimina si la cantidad es 0 o menos
function updateQuantity(req, productId, newQuantity) {
  let cart = getCart(req); //obtiene el carrito actual
  if (newQuantity <= 0) { //si la cantidad es menos que 0 se elimina el producto
    cart = cart.filter(item => item.productId !== productId); //filtra el carrito para eliminar el producto
  } else {
    const item = cart.find(item => item.productId === productId); //busca el producto en el carrito
    if (item) item.quantity = newQuantity; //si el producto existe, actualiza la cantidad
  }
  req.session.cart = cart;
}
//vacia el carrito
function clearCart(req) {
  req.session.cart = []; //lo vuelve a iniciar vacio
}
//devuelve el carrito con los detalles de cada producto 
function getFullCart(req, productsService) {
  const cart = getCart(req); //obtiene el carrito actual
  return cart.map(item => { //mapea cada item
    const product = productsService.getById(item.productId); //obtiene los detalles 
    if (!product) {
      return null;
    } //si el producto no existe, lo ignora
    return { //devuelve un objeto con detalles y el subtotal
      productId: item.productId,
      quantity: item.quantity,
      product: product,
      subtotal: product.precio * item.quantity
    };
  }).filter(item => item !== null); //filtra los items nulos
}
//calcula el total del carrito
function getTotalPesos(req, productsService) {
  const fullCart = getFullCart(req, productsService);
  return fullCart.reduce((total, item) => total + item.subtotal, 0);
}

//exporta las funciones del servicio
module.exports = { getCart, addItem, updateQuantity, clearCart, getFullCart, getTotalPesos };