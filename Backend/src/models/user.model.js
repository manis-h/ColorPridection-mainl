const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    values: ["admin", "player"],
    default: "player"
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  referralCode: {
    type: String,
    unique: true
  },
  status : {
    type : Boolean,
    default : 1
  },
  referredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
