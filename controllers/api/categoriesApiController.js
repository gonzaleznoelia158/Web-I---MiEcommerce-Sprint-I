const categoriesService = require('../../services/categoriesService');

const categoriesApiController = {
    list: async (req, res) => {
        try {
            const categories = await categoriesService.getAll();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    
    detail: async (req, res) => {
        try {
            const category = await categoriesService.getById(req.params.id);
            
            if (!category) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }
            
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = categoriesApiController;