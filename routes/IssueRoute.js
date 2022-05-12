const router = require('express').Router();
const issueTypeController = require('../controller/Issue/IssueTypeController');
const issuePriorityController = require('../controller/Issue/IssuePriorityController');
const issueController = require('../controller/Issue/IssueController');
const { auth } = require('../middlewares/auth');

// Issue type
router.post('/type/create', issueTypeController.create);

// Issue priority
router.post('/priority/create', issuePriorityController.create);

// Issue
router.post('/create', auth, issueController.create);

module.exports = router;
