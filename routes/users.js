const express = require("express");

const router = express.Router();
const { createUser, viewUsers } = require("../controllers/users");

router.route("/").post(createUser).get(viewUsers);

module.exports = router;
