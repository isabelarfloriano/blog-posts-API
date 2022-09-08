const { Op } = require('sequelize');
const { BlogPost, PostCategory, sequelize, User, Category } = require('../models');

const post = async ({ title, content, categoryIds, userId }) => {
  const t = await sequelize.transaction();

  try {
    const date = Date.now();
    const newCategory = await BlogPost.create(
      { title, content, categoryIds, userId, published: date, updated: date },
      { transaction: t },
    );
    await Promise.all(categoryIds.map((id) => PostCategory.create(
      { categoryId: id, postId: newCategory.id },
      { transaction: t },
    )));
    await t.commit();
    return newCategory;
  } catch (e) {
    await t.rollback();
    console.log(e.message);
  }
};

const getAll = async () => {
  const posts = BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!blogPost) return null;
  return blogPost;
};

const updatePost = async ({ id, title, content, userId }) => {
  const blogPost = await BlogPost.findOne({ where: { id, userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  if (!blogPost) return 'denied';
  blogPost.update({ title, content });
  return blogPost;
};

const deletePost = async ({ id, userId }) => {
  const exist = await BlogPost.findOne({ where: { id } });
  if (!exist) return 'nonexistent';
  const result = await BlogPost.destroy({ where: { id, userId } });
  if (!result) return 'denied';
};

const searchPost = async (query) => {
  const blogPost = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return blogPost;
};

module.exports = { post, getAll, getById, deletePost, updatePost, searchPost };