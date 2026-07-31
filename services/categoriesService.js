const db = require('../database/db');

const categoriesService = {
    getAll: async () => {
        return db.prepare('SELECT DISTINCT categoria FROM products').all();
    },
    
    getById: async (id) => {
        return null; 
    },

    count: async () => {
        const row = db.prepare('SELECT COUNT(DISTINCT categoria) AS total FROM products').get();
        return row ? row.total : 0;
    }
};

module.exports = categoriesService;