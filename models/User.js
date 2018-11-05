const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
var User = new Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  hash: {
    type: String
  },
  createdDate: { type: Date, default: Date.now }
},

{ collection: 'user' }, {strict: true}

);

module.exports = mongoose.model('User', User);