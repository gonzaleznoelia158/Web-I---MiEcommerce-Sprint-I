const express = require(`express`);
const router = express.Router();

//Rutas para productos y demas
router.get('/product', (req, res) => {res.render('pages/product')});
router.get('/cart', (req, res)=> {res.render('pages/cart')});
router.get('/checkout', (req, res)=> {res.render('pages/checkout')});

module.exports = router;
