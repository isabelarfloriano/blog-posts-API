const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  const category = await categoryService.addCategory(req.body);
  res.status(201).json(category);
};

module.exports = { create };