const tokenHelper = require('../helpers/token');

// live-lectures/24.3

const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    try {
      if (!authorization) res.status(401).json({ message: 'Token not found' });
        const dataToken = tokenHelper.verifyToken(authorization);
        req.userId = dataToken.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = tokenValidation;