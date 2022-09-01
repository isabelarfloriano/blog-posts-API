const jwt = require('jsonwebtoken');

// live-lectures/24.3

require('dotenv').config();

const { JWT_SECRET } = process.env;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
    return token;
};

const verifyToken = (token) => {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
};

module.exports = { createToken, verifyToken };