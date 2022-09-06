const { User } = require('../models');
const tokenHelper = require('../helpers/token');

// live-lectures/24.3

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
      if (!authorization) return res.status(401).json({ message: 'Token not found' });
        const dataToken = tokenHelper.verifyToken(authorization);
        const user = await User.findOne({ where: { email: dataToken.email } });
        req.userId = user.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = tokenValidation;