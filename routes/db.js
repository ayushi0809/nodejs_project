var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ayushi',
  password : '******',
  database : 'job_interview'
});
 
connection.connect(function (error){
  if (error) throw error;
  //console.log(error);
  console.log("connected");
});
 
// connection.query("CREATE DATABASE job_interview", function (err, result) {  
// if (err) throw err;  
// console.log("Database created");  
// });  







module.exports = connection;