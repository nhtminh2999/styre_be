const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const IssuePrioritySchema = new Schema(
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

IssuePrioritySchema.plugin(AutoIncrement, { id: 'issuePriorityID', inc_field: '_id' });
const IssuePriority = mongoose.model('IssuePriority', IssuePrioritySchema, 'IssuePriority');
module.exports = IssuePriority;
