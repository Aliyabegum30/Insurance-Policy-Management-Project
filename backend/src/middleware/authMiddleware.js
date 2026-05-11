// 🔐 JWT Authentication Middleware

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'your-super-secret-jwt-key-change-in-production';

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

    // Attach user data
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};