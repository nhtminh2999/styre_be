const authRoute = require('./AuthRoute');
const userRoute = require('./UserRoute');
const issueRoute = require('./IssueRoute');
const workflowRoute = require('./WorkflowRoute');
const projectRoute = require('./ProjectRoute');

module.exports = function (app) {
  app.use('/api/user', userRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/issue', issueRoute);
  app.use('/api/workflow', workflowRoute);
  app.use('/api/project', projectRoute);
};
