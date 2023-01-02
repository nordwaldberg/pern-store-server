const Router = require('express');

const typeRouter = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/checkRoleMiddleware');

typeRouter.get('/', typeController.getAllTypes);
typeRouter.post('/', checkRole('ADMIN'), typeController.createType);
typeRouter.delete('/', checkRole('ADMIN'), typeController.deleteType);

module.exports = typeRouter;