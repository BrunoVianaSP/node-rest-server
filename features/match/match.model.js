const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    title: { type: String, required: false},
    time: { type: String, required: true },
    date: { type: Date, required: true },
    weekday: { type: String, required: true },
    location: { type: String, required: true },
    homeTeam: { type: Object, required: true },
    awayTeam: { type: Object, required: true },
    homeTeamGoals: { type: Number, min: 0, default: 0, required: false },
    awayTeamGoals: { type: Number, min: 0, default: 0, required: false },
    homeTeamFouls: { type: Number, min: 0, default: 0, required: false },
    awayTeamFouls: { type: Number, min: 0, default: 0, required: false },
    homeTeamConfirmation: { type: Boolean, required: false },
    awayTeamConfirmation: { type: Boolean, required: false },
    homeTeamComments: { type: String, required: false },
    awayTeamComments: { type: String, required: false },
    status: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Match', schema);