const jwt = require('jsonwebtoken');
const { createLogger } = require('../utils/logger');
const logger = createLogger('auth-middleware');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid authentication token' });
  }
};

module.exports = auth;