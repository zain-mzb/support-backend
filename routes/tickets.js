const express = require("express");

const router = express.Router();
const {
  createTicket,
  viewTickets,
  addComment,
  viewFullTickets,
  deleteTicket,
  editTicket,
} = require("../controllers/tickets");

router.route("/full").get(viewFullTickets);
router.route("/").post(createTicket).get(viewTickets).delete(deleteTicket);
router.route("/:id").delete(deleteTicket).put(editTicket);
router.route("/add-comment").post(addComment);

module.exports = router;
