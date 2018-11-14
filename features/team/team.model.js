const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    name: { type: String, required: true},
    birth: { type: Date, required: true },
    mode: { type: String, required: true },
    address: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    side: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', schema);