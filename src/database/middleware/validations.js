const joi = require('joi');

const REQUIRED_ERROR = 'Some required fields are missing';

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: REQUIRED_ERROR });
  next();
};

const createSchema = joi.object({
  displayName: joi.string().min(8).required().messages({
    'string.min': '{#label} length must be at least {#limit} characters long',
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  password: joi.string().min(6).required().messages({
    'string.min': '{#label} length must be at least {#limit} characters long',
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  email: joi.string().email().required().messages({
    'string.email': '{#label} must be a valid email',
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  image: joi.string().required().messages({
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
});

const createValidation = (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const categorySchema = joi.object({
  name: joi.string().required().messages({
    'any.required': '{#label} is required',
  }),
});

const categoryValidation = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const postSchema = joi.object({
  title: joi.string().required().messages({
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  content: joi.string().required().messages({
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  categoryIds: joi.array().required().messages({
    'array.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
});

const postValidation = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

const updateSchema = joi.object({
  title: joi.string().required().messages({
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
  content: joi.string().required().messages({
    'string.empty': REQUIRED_ERROR,
    'any.required': REQUIRED_ERROR,
  }),
});

const updateValidation = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = { 
  userValidation, 
  createValidation, 
  categoryValidation, 
  postValidation, 
  updateValidation };