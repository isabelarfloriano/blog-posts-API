const joi = require('joi');

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const userValidation = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

module.exports = { userValidation };