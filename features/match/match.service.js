const db = require('../../shared/db');
const Match = db.Match; 

module.exports = { 
    getAll,
    create,
    update,
    findTeam 
};
 
async function getAll() {
    return await Match.find().select('-hash');
}
 
async function create(matchParam) {

    console.log({matchParam});

    // validate
    if (await Match.findOne({ "homeTeam.ownerEmail" : homeTeam.ownerEmail, "awayTeam.ownerEmail" : awayTeam.ownerEmail })) {
        throw 'Match "' + homeTeam.ownerEmail + '" already exists';
    }

    const match = new Match(matchParam);
 
    console.log({match});

    // save user
    await match.save(); 

    return match;
}
 
async function update(matchParam) {
    // console.log({matchParam});

    const team = await Match.findOne({ ownerEmail: matchParam.ownerEmail });

    // validate
    if (!team) throw 'Match not found';
    
    // copy userParam properties to user
    Object.assign(team, matchParam);

    await team.save();

    return team;
}

async function findTeam(ownerEmail) { 
    return await Match.findOne({ ownerEmail: ownerEmail });
}


