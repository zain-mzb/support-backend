const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const connectDB = require("../db/connect");

const viewUsers = async (req, res) => {
  connectDB.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json("Something went wrong");
    }

    console.log("The data from tickets table: \n", rows);
    res.status(200).json(rows);
    // connectDB.end();
  });
};

const createUser = async (req, res) => {
  var sql = "INSERT INTO users (USERID, Name) VALUES ?";
  var values = [req.body];
  connectDB.query(sql, [values], function (err, rows) {
    if (err) {
      res.status(500).send("Something went wrong");
      console.log(err);
      res.end();
    }

    console.log("Number of records inserted: " + rows.affectedRows);
    res.json({
      status: 200,
      msg: "User Added",
    });
  });
};

module.exports = {
  createUser,
  viewUsers,
};
