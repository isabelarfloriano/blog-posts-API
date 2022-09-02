const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const validation = require('../middleware/validations');
const authorization = require('../middleware/auth');

const categoryRouter = Router();

categoryRouter.get('/', authorization, categoryController.getAll);
categoryRouter.post('/', authorization, validation.categoryValidation, categoryController.create);

module.exports = categoryRouter;