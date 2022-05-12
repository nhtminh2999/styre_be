const Project = require('../models/ProjectModel');
const WorkFlow = require('../models/WorkflowModel');
const queryString = require('query-string');

class ProjectController {
  constructor() {}

  checkExistKey = async (key, user) => {
    try {
      const project = await Project.findOne(
        { $and: [{ key, admin: user._id }] },
        '_id firstName lastName email password emailVerified'
      );
      if (project) return { message: 'ERROR', error: 'This key is in used' };
      else return false;
    } catch (error) {
      return { message: 'ERROR', error: error.message };
    }
  };

  create = async (req, res) => {
    try {
      // Check the project is in used or not
      const isExisted = await this.checkExistKey(req.body.key, req.user);
      if (isExisted) return res.json(isExisted);

      const projectModel = new Project(req.body);
      projectModel.members = [req.user._id];
      projectModel.issueTypes = [1, 2, 3];
      projectModel.leader = req.user._id;
      projectModel.admin = req.user._id;
      await projectModel.save();
      const workflows = [
        {
          name: 'To do',
          projectKey: req.body.key,
          order: 0,
          createdBy: req.user._id,
          updatedBy: req.user._id
        },
        {
          name: 'In progress',
          projectKey: req.body.key,
          order: 1,
          createdBy: req.user._id,
          updatedBy: req.user._id
        },
        {
          name: 'Review',
          projectKey: req.body.key,
          order: 2,
          createdBy: req.user._id,
          updatedBy: req.user._id
        },
        {
          name: 'Done',
          projectKey: req.body.key,
          order: 3,
          createdBy: req.user._id,
          updatedBy: req.user._id
        }
      ];
      await WorkFlow.insertMany(workflows);
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  search = async (req, res) => {
    try {
      const searchCondition = queryString.parse(req.url.split('?')[1], { parseNumbers: true, arrayFormat: 'comma' });
      const mainQuery = { members: { $in: [req.user._id] }, status: true };
      let firstQuery = {};
      let secondQuery = {};
      if (searchCondition.value) {
        firstQuery = { name: { $regex: searchCondition.value, $options: 'i' } };
        secondQuery = { key: { $regex: searchCondition.value, $options: 'i' } };
      }

      const options = {
        page: searchCondition?.page || 1,
        limit: searchCondition?.limit || 10,
        lean: true,
        populate: [
          { path: 'members', select: '_id firstName lastName' },
          { path: 'leader', select: '_id firstName lastName color' },
          { path: 'issueTypes', select: '_id name', match: { status: true } },
          { path: 'createdBy', select: '_id firstName lastName' },
          { path: 'updatedBy', select: '_id firstName lastName' }
        ],
        sort: { createdAt: 1 }
      };
      const result = await Project.paginate({ $and: [mainQuery, { $or: [firstQuery, secondQuery] }] }, options);
      return res.status(200).json({ message: 'SUCCESS', result });
    } catch (error) {}
  };

  searchById = async (req, res) => {
    try {
      const { id } = req.params;
      const options = {
        lean: true,
        populate: [
          { path: 'members', select: '_id firstName lastName' },
          { path: 'leader', select: '_id firstName lastName color' },
          { path: 'issueTypes', select: '_id name', match: { status: true } },
          { path: 'createdBy', select: '_id firstName lastName' },
          { path: 'updatedBy', select: '_id firstName lastName' }
        ]
      };
      const result = await Project.findById(id, null, options);
      return res.status(200).json({ message: 'SUCCESS', result });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };

  remove = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findOne({ $and: [{ _id: id, admin: req.user._id }] }).lean();
      if (!project) return res.json({ message: 'ERROR', error: 'Only admin can delete this project' });

      await Project.findByIdAndDelete(id).lean();
      await WorkFlow.deleteMany({ projectKey: project.key }).lean();
      return res.status(200).json({ message: 'SUCCESS' });
    } catch (error) {
      return res.json({ message: 'ERROR', error: error.message });
    }
  };
}

const projectController = new ProjectController();
module.exports = projectController;
