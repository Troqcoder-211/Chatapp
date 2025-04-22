const express = require("express");
const { getUsersForSidebar } = require("../controller/user_controller");
const { protectRoute } = require("../middleware/protectRoute");

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

module.exports = router;
