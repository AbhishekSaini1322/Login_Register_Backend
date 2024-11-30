const express = require("express");
const { register } = require("../api/register");
const { login } = require("../api/login");
const { update } = require("../api/update");
const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.put("/update/:_id", update)


module.exports = router