const IssuePriority = require('../../models/Issue/IssuePriorityModel');

class IssuePriorityController {
  constructor() {}

  create = async (req, res) => {
    try {
      const issuePriorityModel = new IssuePriority(req.body);
      await issuePriorityModel.save();
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const issuePriorityController = new IssuePriorityController();
module.exports = issuePriorityController;
