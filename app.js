const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session para el carrito
app.use(session({
  secret: 'mi-secreto-para-carrito',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // localhost no necesita HTTPS
}));

// Archivos de rutas
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productRoutes');
const { title } = require('process');

// Usar rutas
app.use('/', mainRouter);
app.use('/products', productsRouter);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Error 404

app.use((req, res) => {
  res.status(404).render('pages/404.ejs', { title: '404 - Página no encontrada' });
});