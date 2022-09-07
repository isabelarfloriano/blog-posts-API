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
  return res.status(200).json(blogPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await postService.deletePost({ id, userId: req.userId });
  if (result === 'nonexistent') return res.status(404).json({ message: 'Post does not exist' });
  if (result === 'denied') return res.status(401).json({ message: 'Unauthorized user' });
  return res.status(204).end();
};

module.exports = { post, getAll, getById, deletePost };
