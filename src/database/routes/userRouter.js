const { Router } = require('express');
const userController = require('../controllers/userController');
const validation = require('../middleware/validations');
const authorization = require('../middleware/auth');

const userRouter = Router();

userRouter.get('/', authorization, userController.getAll);
userRouter.get('/:id', authorization, userController.getById);
userRouter.post('/', validation.createValidation, userController.create);
userRouter.delete('/me', authorization, userController.deleteMyself);

module.exports = userRouter;