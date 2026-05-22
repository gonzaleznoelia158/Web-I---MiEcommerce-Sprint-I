const express = require('express');
const session = require('express-session');
const cartCont = require('./middleware/cartCont');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const session = require('express-session'); 
require('./db/database');



//Services
const productsService = require('./services/productsService');
const cartService = require('./services/cartService');

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// onfigurar layouts y extracción de CSS/JS
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true); 

// onfigurar layouts y extracción de CSS/JS
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true); 

// Definir la carpeta de archivos estáticos (CSS, imágenes)
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

//Middleware global, pq sino no se puede acceder al carrito desde el header sin hacer una consulta a la BD cada vez
app.use((req, res, next) => {
    try {
        res.locals.cartTotal = cartService.getTotalPesos(req, productsService) || 0;
        res.locals.cartCont = cartService.getCantidad(req, productsService) || 0;
    } catch (error) {
        res.locals.cartTotal = 0; // Si tira error arranca en 0
        res.locals.cartCont = 0;
    }
    next();
});

// Archivos de rutas
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productRoutes');
const { title } = require('process');
const indexRoutes = require('./routes/indexRoutes');
const categoryRouter = require('./routes/categoryRoutes');

// Usar rutas
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/categories', categoryRouter);
app.use('/', indexRoutes);

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

// Usar rutas
app.use('/', mainRouter);
app.use('/products', productsRouter);


// Error 500 forzado para pruebas
app.get('/test-error', (req, res, next) => {
    throw new Error('Este es un error forzado para probar el 500');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500'); 
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});