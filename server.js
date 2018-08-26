const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const port = 3000;
const config = require('./db');
const User = require('./models/User');
const userRoute = require('./routes/route_user');

app.use(bodyParser.json());

app.use('/user', userRoute);

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World'));

// all routes prefixed with /api
// app.use('/api', router);

// connect to database
mongoose.connect(config.DB).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database' +err)
});

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({message: 'Hello, welcome to my server'});
});





// // Database connection
// // Retrieve
// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/nodeservice", function(err, db) {
//   if(err) { return console.dir(err); }

//   db.collection('test', function(err, collection) {});

//   db.collection('test', {w:1}, function(err, collection) {});

//   db.createCollection('test', function(err, collection) {});

//   db.createCollection('test', {w:1}, function(err, collection) {});

// });












const url = require('url');

router.get('/stuff', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var myParam = parameters.myParam;
  // e.g. myVenues = 12;
  
  var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;
  
  response.json({message: myResponse});
});


// this array is used for identification of allowed origins in CORS
const originWhitelist = ['http://localhost:3000', 'https://heroku-test-node-api.herokuapp.com/'];

// middleware route that all requests pass through
router.use((request, response, next) => {
  console.log('Server info: Request received');
  
  let origin = request.headers.origin;
  
  // only allow requests from origins that we trust
  if (originWhitelist.indexOf(origin) > -1) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // only allow get requests, separate methods by comma e.g. 'GET, POST'
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  
  // push through to the proper route
  next();
});




// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));