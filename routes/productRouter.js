const Router = require('express');

const productRouter = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middlewares/checkRoleMiddleware');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.post('/', checkRole('ADMIN'), productController.createProduct);
productRouter.delete('/', checkRole('ADMIN'), productController.deleteProduct);

module.exports = productRouter;