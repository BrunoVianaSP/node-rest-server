const express = require('express');
const router = express.Router();
const teamService = require('./team.service');
 
// routes
router.post('/register', register);
router.put('/update', update);
router.get('/info', findTeam);
router.get('/adversary', findAdversaryList);
router.get('/', getAll);
  
function register(req, res, next) {
    teamService.create(req.body)
        .then(team => team ? res.status(201).json(team) : res.status(400).json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    teamService.getAll()
        .then(teams => res.json(teams))
        .catch(err => next(err));
}

function update(req, res, next) {
    teamService.update(req.body)
        .then(team => team ? res.status(200).json(team) : res.status(400).json({}))
        .catch(err => next(err));
}

function findTeam(req, res, next) {
    teamService.findTeam(req.query.ownerEmail)
        .then(team => team ? res.status(200).json(team) : res.status(400).json({}))
        .catch(err => next(err));
}

function findAdversaryList(req, res, next) {
    teamService.findAdversaryList(req.query.ownerEmail)
        .then(teams => teams ? res.status(200).json(teams) : res.status(400).json({}))
        .catch(err => next(err));
}
 
module.exports = router;