const { Router } = require('express');
const validation = require('../middleware/validations');
const authorization = require('../middleware/auth');
const categoryExist = require('../middleware/categoryValidation');
const postController = require('../controllers/postController');

const postRouter = Router();

postRouter.post('/', authorization, validation.postValidation, categoryExist, postController.post);

module.exports = postRouter;