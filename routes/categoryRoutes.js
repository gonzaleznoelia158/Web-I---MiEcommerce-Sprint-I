const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');

router.get('/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const allProducts = productsService.getAll();
    const filtered = allProducts.filter(p => p.categoria.toLowerCase() === category);
    
    res.render('pages/category', { category, products: filtered });
});

module.exports = router;