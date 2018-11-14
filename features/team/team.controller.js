const express = require('express');
const router = express.Router();
const teamService = require('./team.service');
 
// routes
router.post('/register', register);
router.put('/update', update);
router.get('/', getAll);
  
function register(req, res, next) {
    teamService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    teamService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function update(req, res, next) {
    teamService.update(req.body)
        .then(() => res.json({message: "Team updated!"}))
        .catch(err => next(err));
}
 
module.exports = router;