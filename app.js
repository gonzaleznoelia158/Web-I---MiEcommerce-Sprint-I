const express = require('express');
const app = express();
const path = require('path');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definir la carpeta de archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'assets')));

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

//Middleware global, pq sino no se puede acceder al carrito desde el header sin hacer una consulta a la BD cada vez
app.use((req, res, next) => {
    try {
        res.locals.cartTotal = cartService.getTotalPesos(req, productsService) || 0;
    } catch (error) {
        res.locals.cartTotal = 0; // Si tira error arranca en 0
    }
    next();
});

// Archivos de rutas
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productRoutes');
const { title } = require('process');
const indexRouter = require('./routes/index');

// Usar rutas
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/', indexRouter);

// Servidor 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Error 404

app.use((req, res) => {
  res.status(404).render('pages/404.ejs', { title: '404 - Página no encontrada' });
});