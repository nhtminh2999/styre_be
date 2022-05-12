const Issue = require('../../models/Issue/IssueModel');
const WorkFlow = require('../../models/WorkflowModel');

class IssueController {
  constructor() {}

  create = async (req, res) => {
    try {
      const issueModel = new Issue(req.body);
      issueModel.createdBy = req.user._id;
      issueModel.updatedBy = req.user._id;
      issueModel.issueType = 1;
      issueModel.priority = 1;
      const issue = await issueModel.save();

      const updateModel = { $push: { issues: issue._id } };
      await WorkFlow.findOneAndUpdate({ _id: req.body.workflow }, updateModel, { lean: true });
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.status(200).json({ message: 'SUCCESS' });
    }
  };
}

const issueController = new IssueController();
module.exports = issueController;
