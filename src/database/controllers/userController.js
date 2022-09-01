const userService = require('../services/userService');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await userService.login({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid fields' });
  res.status(200).json({ token: user });
};

module.exports = { login };