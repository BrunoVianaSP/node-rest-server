const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    shield: { type: Buffer, required: false},
    name: { type: String, required: true},
    birth: { type: Date, required: true },
    modality: { type: String, required: true },
    category: { type: String, required: true },
    availability: { type: String, required: true },
    fieldAddress: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    side: { type: String, required: true },
    neighborhood: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', schema);