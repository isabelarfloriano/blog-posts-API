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

const getById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await postService.getById(id);
  if (!blogPost) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(blogPost);
};

module.exports = { post, getAll, getById };