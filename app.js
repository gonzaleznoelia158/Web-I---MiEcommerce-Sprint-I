const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Configurar sesiones
app.use(session({
  secret: 'secreto', // Cambia esto por una clave secreta en producción
  resave: false,
  saveUninitialized: true
}));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definir la carpeta de archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'assets')));

//Leer form en login y register
app.use(express.urlencoded({ extended: true }));

//Login configurado
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  //Credenciales de ejemplo, despues esto hay que reemplazarlo por una DB que todavia creo q no nos la enseñaron 
  if (user === "pupin" && password === "1234") {
    req.session.user = {
      username: username,
      cart: []
    };
    return res.redirect("/");
  }

  res.send("Usuario o contraseña incorrectos");
});

//Hago que user exista en todos los ejs
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
    next();
});

// Rutas para cada vista
app.get('/', (req, res) => res.render('partials/pages/index'));
app.get('/login', (req, res) => res.render('partials/pages/login'));
app.get('/registro', (req, res) => res.render('partials/pages/register'));
app.get('/producto', (req, res) => res.render('partials/pages/product'));
app.get('/carrito', (req, res) => res.render('partials/pages/cart'));
app.get('/checkout', (req, res) => res.render('partials/pages/checkout'));

// Servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});