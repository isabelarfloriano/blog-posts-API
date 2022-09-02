const userService = require('../services/userService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid fields' });
  res.status(200).json({ token: user });
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await userService.create({ displayName, email, password, image });
  if (!user) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json({ token: user });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(user);
};

module.exports = { login, create, getAll, getById }; 