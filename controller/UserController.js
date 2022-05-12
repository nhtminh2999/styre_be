const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

class UserController {
  constructor() {}

  me = (req, res) => {
    try {
      return res.status(200).json({ message: 'SUCCESS', user: req.user });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const userController = new UserController();
module.exports = userController;
