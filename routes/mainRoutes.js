const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService'); // <-- nuevo

// Ruta principal con productos
router.get('/', (req, res) => {
  const products = productsService.getAll();
  res.render('pages/index', { products });
});
//Rutas de registro y login
router.get('/login', (req, res) => { res.render('pages/login') });
router.get('/register', (req, res) => { res.render('pages/register') });

//Exporta la ruta
module.exports = router;