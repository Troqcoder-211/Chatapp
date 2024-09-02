const express = require("express");
let { login, signup } = require("../controller/auth_controller");
const router = express.Router();

router.get("/dangnhap", login);

router.get("/dangky", signup);

module.exports = router;
