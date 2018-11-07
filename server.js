// require('./')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./shared/jwt');
const errorHandler = require('./shared/error_handler');

// controllers
const userController = require('./features/user/user.controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/user', userController);

// global error handler
app.use(errorHandler);


app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});