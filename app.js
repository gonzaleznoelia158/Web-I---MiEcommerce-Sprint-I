const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const cors = require('cors');
require('./db/database');

// Services
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

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Session para el carrito
app.use(session({
    secret: 'mi-secreto-para-carrito',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware global del carrito
app.use((req, res, next) => {
    try {
        res.locals.cartTotal = cartService.getTotalPesos(req, productsService) || 0;
        res.locals.cartCont = cartService.getCantidad(req, productsService) || 0;
    } catch (error) {
        res.locals.cartTotal = 0;
        res.locals.cartCont = 0;
    }
    next();
});

// Rutas
const mainRouter = require('./routes/mainRoutes');
const productsRouter = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/categories', categoryRouter);
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Error 500
app.get('/test-error', (req, res, next) => {
    throw new Error('Este es un error forzado para probar el 500');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/500');
});

// Error 404
app.use((req, res) => {
    res.status(404).render('pages/404', { title: '404 - Página no encontrada' });
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});