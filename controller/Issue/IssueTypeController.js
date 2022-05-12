const IssueType = require('../../models/Issue/IssueTypeModel');

class IssueTypeController {
  constructor() {}

  create = async (req, res) => {
    try {
      const issueTypeModel = new IssueType(req.body);
      await issueTypeModel.save();
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const issueTypeController = new IssueTypeController();
module.exports = issueTypeController;
