const db = require('../../shared/db');
const Team = db.Team; 

module.exports = { 
    getAll,
    create,
    update,
    findTeam 
};
 
async function getAll() {
    return await Team.find().select('-hash');
}
 
async function create(teamParam) {
    // validate
    if (await Team.findOne({ owner: teamParam.ownerEmail })) {
        throw 'Team "' + teamParam.email + '" already exists';
    }

    const team = new Team(teamParam);
 
    // save user
    await team.save();
}
 
async function update(teamParam) {
    // console.log({teamParam});

    const team = await Team.findOne({ ownerEmail: teamParam.ownerEmail });

    // validate
    if (!team) throw 'Team not found';
    
    // copy userParam properties to user
    Object.assign(team, teamParam);

    await team.save();
}

async function findTeam(ownerEmail) { 
    return await Team.findOne({ ownerEmail: ownerEmail });
}


