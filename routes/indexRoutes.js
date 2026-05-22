const express = require('express');
const router  = express.Router();

// INICIO MODIFICACIÓN: Importar el servicio de productos
const productsService = require('../services/productsService');
// FIN MODIFICACIÓN

const fallback_image = '/images/fallback.png';
const MAX_PRODUCTS   = 10;

function getMostOrdered(products) {
  // primero los marcados con featured true
  const featured = products.filter(p => p.featured);

  // si hay menos de 10 completar con aleatorios del resto
  const rest = products.filter(p => !p.featured);
  const shuffled = rest.sort(() => Math.random() - 0.5);
  const combined = [...featured, ...shuffled].slice(0, MAX_PRODUCTS);

  // imagen de fallback si no tiene imagen
  return combined.map(p => ({
    ...p,
    image: p.image || fallback_image
  }));
}

router.get('/', (req, res) => {
  // INICIO MODIFICACIÓN: Obtener los productos desde la base de datos a través del servicio
  const products = productsService.getAll();
  // FIN MODIFICACIÓN
  
  const mostOrdered = getMostOrdered(products);
  res.render('index', { mostOrdered });
});

module.exports = router;