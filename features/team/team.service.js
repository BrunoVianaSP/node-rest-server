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

    console.log({teamParam});

    // validate
    if (await Team.findOne({ owner: teamParam.ownerEmail })) {
        throw 'Team "' + teamParam.ownerEmail + '" already exists';
    }

    const team = new Team(teamParam);
 
    console.log({team});

    // save user
    await team.save();

    return team;
}
 
async function update(teamParam) {
    // console.log({teamParam});

    const team = await Team.findOne({ ownerEmail: teamParam.ownerEmail });

    // validate
    if (!team) throw 'Team not found';
    
    // copy userParam properties to user
    Object.assign(team, teamParam);

    await team.save();

    return team;
}

async function findTeam(ownerEmail) { 
    return await Team.findOne({ ownerEmail: ownerEmail });
}


