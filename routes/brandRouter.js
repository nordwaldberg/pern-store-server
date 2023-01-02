const Router = require('express');

const brandRouter = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../middlewares/checkRoleMiddleware');

brandRouter.get('/', brandController.getAllBrands);
brandRouter.post('/', checkRole('ADMIN'), brandController.createBrand);
brandRouter.delete('/', checkRole('ADMIN'), brandController.deleteBrand);

module.exports = brandRouter;