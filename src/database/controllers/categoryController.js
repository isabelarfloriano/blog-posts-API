const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  const category = await categoryService.addCategory(req.body);
  res.status(201).json(category);
};

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).json(categories);
};

module.exports = { create, getAll };