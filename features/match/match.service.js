const db = require('../../shared/db');
const dateUtils = require('../../shared/dateUtils');
const Match = db.Match; 

module.exports = { 
    getAll,
    create,
    update,
    findMatches,
    createBatch,
    hasMatch 
};
 
async function getAll() {
    return await Match.find().select('-hash');
}
 
async function create(matchParam) {

    // console.log({matchParam});

    // validate
    if (await Match.findOne( { $and : [{ "homeTeam.ownerEmail" : matchParam.homeTeam.ownerEmail, "awayTeam.ownerEmail" : matchParam.awayTeam.ownerEmail }] } )) {
        throw 'Match for ' + matchParam.homeTeam.ownerEmail +  ' and ' +  matchParam.awayTeam.ownerEmail + '" already exists';
    }

    const match = new Match(matchParam);

    match.weekday = dateUtils.weekday(match.date);
 
    console.log({match});

    // save user
    await match.save(); 

    return match;
}
 

async function createBatch(matches) {
    console.log({matches});
    let result = [];
    
    matches.forEach(element => {
        result.push(create(element));
    });

    return result;
}

async function update(matchParam) {
    // console.log({matchParam});

    const match = await Match.findOne({ "homeTeam.ownerEmail": matchParam.homeTeam.ownerEmail });

    // validate
    if (!match) throw 'Match not found';
    
    // copy userParam properties to user
    Object.assign(match, matchParam);

    await match.save();

    return match;
}

async function findMatches(ownerEmail) { 
    return await Match.find({  $or : [{"homeTeam.ownerEmail": ownerEmail}, {"awayTeam.ownerEmail": ownerEmail}] });
}
 
function hasMatch(ownerEmail, adversaryEmail) {

    // if (Match.findOne( { $and : [{ "homeTeam.ownerEmail" : ownerEmail, "awayTeam.ownerEmail" : adversaryEmail }] } )) {
    //     return true;
    // } 

    // if (Match.findOne( { $and : [{ "homeTeam.ownerEmail" : adversaryEmail, "awayTeam.ownerEmail" : ownerEmail }] } )) {
    //     return true;
    // }

    return false;
    // return false;
    // return Match.findOne( { $or: [ { "homeTeam.ownerEmail" : ownerEmail, "awayTeam.ownerEmail" : adversaryEmail },
    //                                { "homeTeam.ownerEmail" : adversaryEmail, "awayTeam.ownerEmail" : ownerEmail } ] }, {"_id" : 1} ) != null;
    // return Match.findOne( { $or: [ { $and : [{ "homeTeam.ownerEmail" : ownerEmail, "awayTeam.ownerEmail" : adversaryEmail }]},
    //                                { $and : [{ "homeTeam.ownerEmail" : adversaryEmail, "awayTeam.ownerEmail" : ownerEmail }]} ] }, {"_id" : 1} ) != null;
}
