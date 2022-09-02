const tokenHelper = require('../helpers/token');

// live-lectures/24.3

const tokenValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) res.status(401).json({ message: 'Token not found' });

    try {
        const dataToken = tokenHelper.verifyToken(authorization);
        req.userId = dataToken.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token not found' });
    }
};

module.exports = tokenValidation;