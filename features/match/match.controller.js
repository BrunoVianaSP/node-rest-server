const express = require('express');
const router = express.Router();
const matchService = require('./match.service');
 
// routes
router.post('/register', register);
router.put('/update', update);
router.get('/', getAll);
router.get('/season', findMatches);
  
function register(req, res, next) {
    matchService.create(req.body)
        .then(match => match ? res.status(201).json(match) : res.status(400).json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    matchService.getAll()
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function findMatches(req, res, next) {
    matchService.findMatches(req.query.ownerEmail)
        .then(matches => res.json(matches))
        .catch(err => next(err));
}

function update(req, res, next) {
    matchService.update(req.body)
        .then(match => match ? res.status(200).json(match) : res.status(400).json({}))
        .catch(err => next(err));
}
 
module.exports = router;