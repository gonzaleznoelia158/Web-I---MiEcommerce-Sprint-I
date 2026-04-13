const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Leer formularios
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

// 👉 Hace disponible el user en TODOS los EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


// ================== RUTAS ==================

// Index
app.get('/', (req, res) => res.render('pages/index'));

// Login
app.get('/login', (req, res) => res.render('pages/login'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulación de usuario, dsp lo tengo q cambiar por MongoDB
  if (username === "pupin" && password === "1234") {
    req.session.user = {
      username: username,
      cart: []
    };
    return res.redirect('/');
  }

  res.send("Usuario o contraseña incorrectos");
});

// Register
app.get('/register', (req, res) => res.render('pages/register'));

// Productos
app.get('/products', (req, res) => res.render('pages/product'));

// Carrito
app.get('/cart', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('pages/cart');
});

// Checkout
app.get('/checkout', (req, res) => res.render('pages/checkout'));

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});