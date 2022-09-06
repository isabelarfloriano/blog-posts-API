const postService = require('../services/postService');

const post = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const newCategory = await postService.post({ title, content, categoryIds, userId: req.userId });
  return res.status(201).json(newCategory);
};

const getAll = async (req, res) => {
  const posts = await postService.getAll();
  return res.status(200).json(posts);
};

module.exports = { post, getAll };