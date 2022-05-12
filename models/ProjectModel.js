const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');

const ProjectSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String
    },
    leader: {
      type: Number,
      ref: 'User'
    },
    admin: {
      type: Number,
      ref: 'User'
    },
    members: [{ type: Number, ref: 'User' }],
    issueTypes: [{ type: Number, ref: 'IssueType' }],
    status: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Number,
      ref: 'User'
    },
    updatedBy: {
      type: Number,
      ref: 'User'
    }
  },
  { timestamps: true }
);

ProjectSchema.plugin(AutoIncrement, { id: 'projectID', inc_field: '_id' });
ProjectSchema.plugin(mongoosePaginate);
const Project = mongoose.model('Project', ProjectSchema, 'Project');
module.exports = Project;
