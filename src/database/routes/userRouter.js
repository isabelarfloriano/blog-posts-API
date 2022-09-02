const { Router } = require('express');
const userController = require('../controllers/userController');
const validation = require('../middleware/validations');

const userRouter = Router();

userRouter.post('/', validation.createValidation, userController.create);

module.exports = userRouter;