const port = 3000;
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || port, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});



// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */
app.get("/api/contacts", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/contacts", function(req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new contact.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/contacts/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(CONTACTS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const app = express();
// const router = express.Router();
// const port = 3000;
// const config = require('./db');
// const User = require('./models/User');
// const userRoute = require('./routes/route_user');
// const url = require('url');

// // this array is used for identification of allowed origins in CORS
// const originWhitelist = ['http://localhost:3000', 'https://heroku-test-node-api.herokuapp.com/'];

// app.use(bodyParser.json());

// app.use('/user', userRoute);

// // url: http://localhost:3000/
// app.get('/', (request, response) => response.send('Hello World'));

// app.get('/api', (request, response) => response.send('This the API'));

// router.get('/stuff', (request, response) => {
//     var urlParts = url.parse(request.url, true);
//     var parameters = urlParts.query;
//     var myParam = parameters.myParam;
//     // e.g. myVenues = 12;

//     var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got: ${myParam * 5}`;

//     response.json({ message: myResponse });
// });


// // middleware route that all requests pass through
// router.use((request, response, next) => {
//     console.log('Server info: Request received');

//     let origin = request.headers.origin;

//     // only allow requests from origins that we trust
//     if (originWhitelist.indexOf(origin) > -1) {
//         response.setHeader('Access-Control-Allow-Origin', origin);
//     }

//     // only allow get requests, separate methods by comma e.g. 'GET, POST'
//     response.setHeader('Access-Control-Allow-Methods', 'GET');
//     response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     response.setHeader('Access-Control-Allow-Credentials', true);

//     // push through to the proper route
//     next();
// });

// app.listen(process.env.PORT || port, function() {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });
























// all routes prefixed with /api
// app.use('/api', router);
// connect to database local
// mongoose.connect(config.DB).then(
//     () => { console.log('Database is connected') },
//     err => {
//         console.log('Can not connect to the database' + err)
// });

// mongoose.connect('mongodb+srv://kay:f2320419@cluster0.mongodb.net/test').then(
//     () => { console.log('Database is connected') },
//     err => {
//         console.log('Can not connect to the database:\n' + err)
//     });


// // connect to database online
// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb+srv://kay:f2320419@cluster0.mongodb.net/user-management-db";
// MongoClient.connect(uri, function(err, client) {
//     const collection = client.db("user-management-db").collection("user");
//     // perform actions on the collection object
//     client.close();
// });


// using router.get() to prefix our path
// url: http://localhost:3000/api/
// router.get('/', (request, response) => {
//     response.json({ message: 'Hello, welcome to my server' });
// });


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