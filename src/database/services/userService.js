const { User } = require('../models');
const tokenHelper = require('../helpers/token');

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) return null;

  const token = tokenHelper.createToken({ email: user.email });
  return token;
};

const create = async ({ displayName, email, password, image }) => {
  const verifyEmail = await User.findOne({
    where: { email },
  });
  if (verifyEmail) return null;

  const user = await User.create({ displayName, email, password, image });
  const token = tokenHelper.createToken({ email: user.email });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return null;
  return user;
};

const deleteMyself = async (id) => User.destroy({ where: { id } });

module.exports = { login, create, getAll, getById, deleteMyself };