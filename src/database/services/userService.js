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

module.exports = { login };