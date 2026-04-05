const express = require('express');
const app = express();
const path = require('path');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definir la carpeta de archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'assets')));

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