const express = require('express');
const router = express.Router();
const matchService = require('./match.service');
 
// routes
router.post('/register', register);
router.put('/update', update);
router.get('/:ownerEmail', getAll);
  
function register(req, res, next) {
    matchService.create(req.body)
        .then(match => match ? res.status(201).json(match) : res.status(400).json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    matchService.getAll()
        .then(teams => res.json(teams))
        .catch(err => next(err));
}

function update(req, res, next) {
    matchService.update(req.body)
        .then(match => match ? res.status(200).json(match) : res.status(400).json({}))
        .catch(err => next(err));
}
 
module.exports = router;