const productsService = require('../services/productsService');

const mainController = {
    // Lógica para la página principal
    index: (req, res) => {
        const sort = req.query.sort || null; 
        const products = productsService.getAll(sort);

        // Lógica del Bonus: 5 sugeridos aleatorios
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const suggestedProducts = shuffled.slice(0, 5);

        res.render('pages/index', { products, suggestedProducts, sort });
    },
    
    // Lógica para login
    login: (req, res) => { 

        res.render('pages/login', { layout: false }); 
    },
    
    // Lógica para register
    register: (req, res) => { 
        res.render('pages/register', { layout: false }); 
    },

    processLogin: (req, res) => { 

        res.render('pages/login', { layout: false }); 
    },

    processRegister: (req, res) => {

        res.render('pages/register', { layout: false }); 
    }

    
};

module.exports = mainController;