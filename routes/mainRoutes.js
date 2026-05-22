const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');
const products = require('../data/products.json');

// Ruta principal con productos
router.get('/', (req, res) => {
  const sort = req.query.sort || null; 
  const products = productsService.getAll(sort);
    const suggestedProducts = productsService.getAll(null)
    .sort(() => Math.random() - 0.5).slice(0, 4);
  res.render('pages/index', {products, sort, suggestedProducts});
});

//Rutas de registro y login
router.get('/login', (req, res) => { res.render('pages/login') });
router.get('/register', (req, res) => { res.render('pages/register') });
router.get('/search', (req, res) => {
    const query = req.query.q?.toLowerCase().trim();

    if (!query) {
        return res.redirect('/');
    }
    const results = products.filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        p.categoria.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
    );

    res.render('pages/search', { results, query });
});
//rutas post login y register
router.post('/register', mainController.processRegister);
router.post('/login', mainController.processLogin);

module.exports = router;