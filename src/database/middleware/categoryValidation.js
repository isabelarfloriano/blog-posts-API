const Model = require('../models');

const categoryExist = async (req, res, next) => {
  const { categoryIds } = req.body;
  const checkArray = await Promise.all(
    categoryIds.map((cat) => Model.Category.findByPk(cat)),
  );
    if (!checkArray.every((item) => item !== null)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
    }
  next();
};

module.exports = categoryExist;