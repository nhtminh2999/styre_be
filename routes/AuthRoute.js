const router = require('express').Router();
const authController = require('../controller/AuthController');
const { auth } = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify/:token', authController.verifyEmail);
router.get('/validate', auth, authController.validate);

module.exports = router;
