const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const IssueTypeSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

IssueTypeSchema.plugin(AutoIncrement, { id: 'issueTypeID', inc_field: '_id' });
const IssueType = mongoose.model('IssueType', IssueTypeSchema, 'IssueType');
module.exports = IssueType;
