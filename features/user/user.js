const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: {
        type: String,
        required: true,
        unique: true
      },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, rired: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);