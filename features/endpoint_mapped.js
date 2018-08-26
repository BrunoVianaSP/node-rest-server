var express= require("express");
var mysql= require('mysql');
var app= express();

var pool= mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'REPORT_DATABASE',
    debug    :  false
});

function getAccount(req, res, user) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from Account WHERE id =" + user + " LIMIT 1",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get('/musician/:name', function(req, res) {
   // Get /musician/Matt
   console.log(req.params.name);
   // => Matt
   res.send('{"id": 1,"name":"Matt", "band":"BBQ Brawlers"}');
   res.sendStatus(200);
});

app.get('/account/:user', function(req, res) {
  console.log("getAccount Endpoint");
  
   // Get /musician/Matt
   console.log("Requested account ID: " + req.params.user);
   // => Matt
   getAccount(req, res, req.params.user);
});

app.get('/buycar/:car', function(req, res) {
  console.log("getBuyCar Endpoint");
   // Get /musician/Matt
   console.log("Choosed Car: " + req.params.car);
   res.send(req.params.car);
});





app.listen(3000);