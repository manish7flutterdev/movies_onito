var mysql = require('mysql');

var sqlDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Flarecrazy@123",
  database: "new_schema"
});


module.exports = sqlDB