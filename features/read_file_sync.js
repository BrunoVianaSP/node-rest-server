var fs = require("fs");

var data = fs.readFileSync('testfile.txt');

console.log(data.toString());
console.log("Program Ended");