const Router = require('express');

const userRouter = new Router();
const userController = require('../controllers/userController');
const checkAuthorization = require('../middlewares/checkAuthorizationMiddleware');

userRouter.get('/auth', checkAuthorization, userController.authCheck);
userRouter.post('/sign_up', userController.signUp);
userRouter.post('/sign_in', userController.signIn);

module.exports = userRouter;