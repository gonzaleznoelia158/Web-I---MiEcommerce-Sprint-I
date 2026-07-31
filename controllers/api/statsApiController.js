const productsService = require('../../services/productsService');
const categoriesService = require('../../services/categoriesService');

const statsApiController = {
    getStats: async (req, res) => {
        try {
            // Ejecutamos los métodos de conteo
            const totalProducts = await productsService.countProduct();
            const totalCategories = await categoriesService.count();

            // Armamos la respuesta JSON 
            return res.status(200).json({
                products: totalProducts,
                categories: totalCategories,
                status: 200
            });

        } catch (error) {
            console.error("Error al obtener estadísticas:", error);
            return res.status(500).json({ 
                error: "Error interno del servidor",
                message: error.message 
            });
        }
    }
};

module.exports = statsApiController;