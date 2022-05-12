const router = require('express').Router();
const workflowController = require('../controller/WorkflowController');

router.get('/search', workflowController.search);
router.post('/create', workflowController.create);
router.put('/update/:id', workflowController.update);

module.exports = router;
