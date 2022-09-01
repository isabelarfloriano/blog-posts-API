const { Router } = require('express');
const userController = require('../controllers/userController');
const validation = require('../middleware/validations');

const loginRouter = Router();

loginRouter.post('/', validation.userValidation, userController.login);

module.exports = loginRouter;