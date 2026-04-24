const express = require(`express`);
const router = express.Router();

// Rutas para páginas principales
router.get('/', (req, res) => res.render('pages/index'));
router.get('/login',(req, res)=> {res.render('pages/login')});
router.get('/register', (req, res) =>{res.render('pages/register')});

module.exports = router;
