const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/authConfig');

function authenticationMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticationMiddleware;
