const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

router.get('/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filtered = products.filter(p => p.categoria.toLowerCase() === category);
    res.render('pages/category', { category, products: filtered });
});

module.exports = router;