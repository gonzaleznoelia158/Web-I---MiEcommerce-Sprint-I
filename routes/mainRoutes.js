const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');

// Ruta principal con productos
router.get('/', (req, res) => {
  const sort = req.query.sort || null; 
  const products = productsService.getAll(sort);
  res.render('pages/index', {products, sort});
});
//Rutas de registro y login
router.get('/login', (req, res) => { res.render('pages/login') });
router.get('/register', (req, res) => { res.render('pages/register') });

//Exporta la ruta
module.exports = router;