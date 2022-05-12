const router = require('express').Router();
const projectController = require('../controller/ProjectController');
const { auth } = require('../middlewares/auth');

router.post('/create', auth, projectController.create);
router.get('/search', auth, projectController.search);
router.get('/search/:id', auth, projectController.searchById);
router.delete('/remove/:id', auth, projectController.remove);

module.exports = router;
