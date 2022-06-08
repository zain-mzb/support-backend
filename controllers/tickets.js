const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const connectDB = require("../db/connect");

const viewTickets = async (req, res) => {
  var sql = "SELECT * FROM tickets";

  connectDB.query(sql, (err, rows) => {
    if (err) res.status(500).json("Something went wrong");
    console.log("The data from tickets table: \n", rows);
    res.status(200).json(rows);
    // connectDB.end();
  });
};

const viewFullTickets = async (req, res) => {
  var sql =
    "SELECT tickets.Title , tickets.Description, comments.Text AS Comment FROM comments INNER JOIN tickets ON tickets.USERID=comments.USERID";

  connectDB.query(sql, (err, rows) => {
    if (err) res.status(500).json("Something went wrong");
    console.log("The data from tickets table: \n", rows);
    res.status(200).json(rows);
    // connectDB.end();
  });
};

const createTicket = async (req, res) => {
  var sql = "INSERT INTO tickets (ID, USERID, Title, Description) VALUES ?";
  var values = [req.body];
  connectDB.query(sql, [values], function (err, rows) {
    if (err) {
      res.status(500).json("Something went wrong");
      console.log(err);
      res.end();
    }

    console.log("Number of records inserted: " + rows.affectedRows);
    res.json({
      status: 200,
      msg: "Ticket Added",
    });
  });
};

const addComment = async (req, res) => {
  var sql = "INSERT INTO comments (ID, USERID, ticket_id, Text) VALUES ?";
  var values = [req.body];
  connectDB.query(sql, [values], function (err, rows) {
    if (err) {
      res.status(500).json("Something went wrong");
      res.end();
    }

    console.log("Number of records inserted: " + rows.affectedRows);
    res.json({
      status: 200,
      msg: "Comment Added",
    });
  });
};
const deleteTicket = async (req, res) => {
  const ID = req.params.id;

  var sql = `DELETE FROM tickets where  ID = ${ID}`;

  connectDB.query(sql, function (err, rows) {
    if (err) res.status(500).json("Something went wrong");
    console.log("Number of records affected: " + rows.affectedRows);
    res.status(200).json("Number of records affected: ", rows.affectedRows);
  });
};
const editTicket = async (req, res) => {
  const ID = req.params.id;

  const title = req.body.title;
  const description = req.body.description;

  var sql = `UPDATE tickets SET Title = '${title}' , Description = '${description}' where ID = ${ID} `;

  connectDB.query(sql, function (err, rows) {
    if (err) res.status(500).json("Something went wrong");
    console.log("Number of records affected: " + rows.affectedRows);
    res.status(200).json("Number of records affected: ", rows.affectedRows);
  });
};

module.exports = {
  createTicket,
  viewTickets,
  addComment,
  viewFullTickets,
  deleteTicket,
  editTicket,
};
