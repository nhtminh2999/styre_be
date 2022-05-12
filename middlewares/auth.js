const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const auth = async (req, res, next) => {
  const { accessToken: token } = req.cookies;
  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Get user from the token
      const user = await User.findById(decoded._id).select('-password').lean();
      // If email is not verfied return error
      if (!user.emailVerified) return res.json({ message: 'ERROR', error: 'Email is not verified' });

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'NOT_AUTHORIZED', error: error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'ERROR', error: 'No token provided' });
  }
};

module.exports = { auth };
