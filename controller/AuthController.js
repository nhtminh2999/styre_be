const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const { verifyEmailTemplate } = require('../template/verifyEmailTemplate');
const { randomRGBColor } = require('../utils/randomRGBColor');

class AuthController {
  constructor() {}

  register = async (req, res) => {
    try {
      const existedUser = await User.findOne({ email: req.body.email }, null, { lean: true });
      if (existedUser) return res.json({ message: 'EXISTED', error: 'This email is in used' });

      const userModel = new User(req.body);
      userModel.color = randomRGBColor();
      await userModel.save();

      // Create verify email url
      const verifyToken = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
        expiresIn: '30d'
      });
      const url = `http://localhost:5000/api/auth/verify/${verifyToken}`;
      // Config mail server
      const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: 'Styre',
        to: req.body.email,
        subject: 'Confirm you email',
        html: verifyEmailTemplate(url)
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }, '_id firstName lastName email password emailVerified');
      if (!user) return res.json({ message: 'ERROR', error: 'Invalid email or password' });

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) return res.json({ message: 'ERROR', error: 'Invalid email or password' });

      if (!user.emailVerified) return res.json({ message: 'ERROR', error: 'Email is not verified' });

      const { accesstoken, refreshToken } = await user.generateAuthToken();
      res.cookie('accessToken', accesstoken, { httpOnly: true, expires: new Date(Date.now() + 3600000 * 24 * 7) });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 3600000 * 24 * 10) });

      return res.status(200).json({
        message: 'SUCCESS',
        user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
      });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
      const updateModel = { $set: { emailVerified: true } };

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      await User.findOneAndUpdate({ email: decoded.email }, updateModel, { lean: true });

      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  validate = (req, res) => {
    try {
      return res.status(200).json({ message: 'SUCCESS', user: req.user });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const authController = new AuthController();
module.exports = authController;
