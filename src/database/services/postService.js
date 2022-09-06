const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = { post };