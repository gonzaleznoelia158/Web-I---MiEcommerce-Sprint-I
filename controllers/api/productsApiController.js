// controllers/api/productsApiController.js
const productsService = require('../../services/productsService');


const productsApiController = {
  // GET /api/products
  getAll: (req, res) => {
    try{
      const orden = req.query.orden || null;
      const products = productsService.getAll();
      res.json(products);
    } catch(error){
      console.error(error.message);
      res.status(500).json({eroor: "Error interno al obtener productos"});
    }
  },

  // GET /api/products/:id
  getById: (req, res) => {
    try{
    const id = parseInt(req.params.id, 10);
    const product = productsService.getById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch(error){
    console.error(error.message);
    res.status(500).json({error: "Error interno al obtener producto"});
  }
  },

  // POST /api/products (por ahora solo placeholder)
  create: (req, res) => {
    try{
      const newProduct = productsService.create(req.body);
      res.status(201).json(newProduct);
    }catch(error){
      console.error(error.message);
      if(error.message.includes("Faltan datos")){
        return res.status(400).json({error: error.message});
      }
      res.status(500).json({error: "Error interno al crear productos"});
    }
  },

  // PUT /api/products/:id
  update: (req, res) => {
    try{
    const id = parseInt(req.params.id);
    const existing = productsService.getById(id);
    if(!existing) {
      return res.status(404).json({error: 'Producto no encontrado'});
    }
    const updated = productsService.updateProduct(id, req.body);
    res.json(updated);
  } catch(error){
    console.error(error.message);
    res.status(500).json({error: "Error interno al actualizar el producto"});
  }
  },

  // DELETE /api/products/:id
  delete: (req, res) => {
    try{
      const id = parseInt(req.params.id);
      const existing = productsService.getById(id);
      if(!existing) {
      return res.status(404).json({error: 'Producto no encontrado'});
    }
    const result = productsService.deleteProduct(id);
    res.status(204).send();
    }catch(error){
    console.error(error.message);
    res.status(500).json({error: "Error interno al borrar el producto"});
    }
  }

};


module.exports = productsApiController;