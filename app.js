const express = require('express');
const app = express();
const path = require('path');

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Leer formularios
app.use(express.urlencoded({ extended: true }));

// ================== RUTAS ==================

// Index
app.get('/', (req, res) => res.render('pages/index'));

// Login
app.get('/login', (req, res) => res.render('pages/login'));

// Register
app.get('/register', (req, res) => res.render('pages/register'));

// Productos
app.get('/products', (req, res) => res.render('pages/product'));

// Carrito
app.get('/cart', (req, res) => res.render('pages/cart'));

// Checkout
app.get('/checkout', (req, res) => res.render('pages/checkout'));


// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});