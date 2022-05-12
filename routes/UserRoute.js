const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const userController = require('../controller/UserController');

router.get('/me', auth, userController.me);

module.exports = router;
