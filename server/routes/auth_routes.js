const express = require("express");
const { login, signup, logout } = require("../controller/auth_controller");
const router = express.Router();

router.post("/dangky", signup);

router.post("/dangnhap", login);

router.post("/dangxuat", logout);

module.exports = router;
