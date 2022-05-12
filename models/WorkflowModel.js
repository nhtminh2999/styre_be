const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const WorkflowSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    projectKey: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true
    },
    issues: [{ type: Number, ref: 'Issue' }],
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

WorkflowSchema.plugin(mongoosePaginate);
const Workflow = mongoose.model('Workflow', WorkflowSchema, 'Workflow');
module.exports = Workflow;
