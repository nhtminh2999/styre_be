const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const IssueSchema = new Schema(
  {
    _id: Number,
    shortSummary: {
      type: String,
      required: true
    },
    workflow: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Workflow'
    },
    description: {
      type: String
    },
    assignees: [{ type: Number, ref: 'User' }],
    issueType: {
      type: Number,
      required: true,
      ref: 'IssueType'
    },
    priority: {
      type: Number,
      ref: 'IssuePriority'
    },
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

IssueSchema.plugin(AutoIncrement, { id: 'issueID', inc_field: '_id' });
const Issue = mongoose.model('Issue', IssueSchema, 'Issue');
module.exports = Issue;
