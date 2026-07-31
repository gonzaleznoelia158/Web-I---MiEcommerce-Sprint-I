const express = require('express');
const router = express.Router();
const productsApiController = require('../controllers/api/productsApiController');

// GET /api/products
router.get('/products', productsApiController.getAll);
// GET /api/products/:id
router.get('/products/:id', productsApiController.getById);
// POST /api/products
router.post('/products', productsApiController.create);
// PUT /api/products/:id
router.put('/products/:id', productsApiController.update);
// DELETE /api/products/:id
router.delete('/products/:id', productsApiController.delete);

module.exports = router;