const express = require('express');
const app = express();
const router = express.Router();

const User = require('../models/User');

router.route('/add').post(function (req, res) {
    const user = new User(req.body);
    console.log("Body:", user);
    user.save()
      .then(user => {
      res.status(200).json({'user': 'User added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save the user into database");
      });
  });

  // Defined get data(index or listing) route
  router.route('/').get(function (req, res) {
    User.find(function (err, users){
      if(err){
        console.log(err);
      }
      else {
        res.json(users);
      }
    });
  });
 
  //  Defined update route
  router.route('/update/:username').post(function (req, res) {
    User.find({username: req.params.username}, function(err, user) {
      if (!user)
        return next(new Error('Could not load Document'));
      else {
        const user = new User(req.body);
        user.save().then(user => {
            res.json('Successfully Updated');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
  
  // Defined delete | remove | destroy route
  router.route('/delete/:username').get(function (req, res) {
    User.deleteOne({username: req.params.username}, function(err, user){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
  });


  //  Defined update route
  router.route('/login/:username/:password/:application').get(function (req, res) {
    console.log("username:", req.params.username);
    console.log("password:", req.params.password);
    console.log("application:", req.params.application);

    User.find({username: req.params.username, password: req.params.password, application: req.params.application }, function(err, user) {
      if (!user)
        res.status(400).send("unable to login");
      else {
        console.log("found user:", user);
        res.status(200).json('Successfully logged in');
      }
    });
  });


module.exports = router;