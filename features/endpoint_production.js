var express    = require("express");
var mysql      = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'REPORT_DATABASE'
});



connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/",function(req, res){
connection.query('SELECT * from Account LIMIT 1', function(err, rows, fields) {
connection.end();
  if (!err) 
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
});

app.listen(3000);