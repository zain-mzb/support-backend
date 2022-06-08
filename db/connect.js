require("dotenv").config();

const mysql = require("mysql2");

const connectDB = mysql.createConnection({
  user: "doadmin",
  password: "AVNS_TYGjyPI5Ewbe5W0",
  host: "zain-do-user-4895963-0.b.db.ondigitalocean.com",
  port: 25060,
  database: "defaultdb",
});

// var sql = "CREATE TABLE comments ( ID int NOT NULL, USERID int NOT NULL, ticket_id int NOT NULL, Text VARCHAR(255), PRIMARY KEY (ID),   FOREIGN KEY (USERID) REFERENCES users(USERID), FOREIGN KEY (ticket_id) REFERENCES tickets(ID)  ON DELETE CASCADE)";
// var sql = "CREATE TABLE tickets ( ID int NOT NULL, USERID int NOT NULL, Title VARCHAR(255), Description VARCHAR(255),   PRIMARY KEY (ID),   FOREIGN KEY (USERID) REFERENCES users(USERID)  ON DELETE CASCADE)";
var sql = "SHOW TABLES";
// var sql = "SET FOREIGN_KEY_CHECKS = 0";
// var sql = "DROP TABLE U"
// var sql = "ALTER TABLE tickets ADD column"

connectDB.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Result", result);
});

module.exports = connectDB;
