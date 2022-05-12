const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    emailVerified: {
      type: Boolean,
      default: false,
      trim: true
    }
  },
  { timestamps: true, _id: false }
);

UserSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    return next(err);
  }
});

UserSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const accesstoken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '7d'
  });
  const refreshToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '10d'
  });
  return { accesstoken, refreshToken };
};

UserSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.plugin(AutoIncrement, { id: 'userID', inc_field: '_id' });
const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
