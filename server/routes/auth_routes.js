const express = require("express");
const { login, signup, logout } = require("../controller/auth_controller");
const router = express.Router();

router.post("/signup", signup);

router.post("/signin", login);

router.post("/logout", logout);

module.exports = router;
