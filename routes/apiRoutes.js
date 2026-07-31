const express = require('express');
const router = express.Router();
const productsApiController = require('../controllers/api/productsApiController');
const categoriesApiController = require('../controllers/api/categoriesApiController');
const statsApiController = require('../controllers/api/statsApiController');

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
// GET /api/categories
router.get('/categories', categoriesApiController.list);
// GET /api/categories/:id
router.get('/categories/:id', categoriesApiController.detail);
// GET /api/stats
router.get('/stats', statsApiController.getStats);

module.exports = router;