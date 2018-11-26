const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    title: { type: String, required: false},
    time: { type: String, required: true },
    date: { type: Date, required: true },
    weekday: { type: String, required: false },
    location: { type: String, required: true },
    homeTeam: { type: Object, required: true },
    awayTeam: { type: Object, required: true },
    matchManager: { type: Object, required: false },
    lineup: { type: Object, required: false },
    timeline: { type: Object, required: false },
    stats: { type: Object, required: false },
    homeTeamConfirmation: { type: Boolean, required: false },
    awayTeamConfirmation: { type: Boolean, required: false },
    status: { type: String, required: false, default:"CREATED" },
    createdDate: { type: Date, default: Date.now }
});
 
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Match', schema);