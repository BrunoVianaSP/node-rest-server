const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
var User = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  confirmPassword: {
    type: String
  },
  hash: {
    type: String
  }
},{
    collection: 'user'
});

module.exports = mongoose.model('User', User);