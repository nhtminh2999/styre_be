const WorkFlow = require('../models/WorkflowModel');
const Issue = require('../models/Issue/IssueModel');
const queryString = require('query-string');

class WorkFlowController {
  constructor() {}

  search = async (req, res) => {
    try {
      let query = queryString.parse(req.url.split('?')[1], { parseNumbers: true, arrayFormat: 'comma' });
      query = { ...query, status: true };
      const options = {
        page: 1,
        limit: 5,
        lean: true,
        populate: [{ path: 'issues' }],
        sort: { order: 1 }
      };
      const result = await WorkFlow.paginate(query, options);
      return res.status(200).json({ message: 'SUCCESS', result });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const workflowModel = new WorkFlow(req.body);
      await workflowModel.save();
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { issues } = req.body;
      const updateModel = { $set: { issues: issues } };

      await WorkFlow.findOneAndUpdate({ _id: id }, updateModel, { lean: true });
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const workflowController = new WorkFlowController();
module.exports = workflowController;
