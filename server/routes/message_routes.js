const express = require("express");

const router = express.Router();

const { protectRoute } = require("../middleware/protectRoute");
const {
  sendMessage,
  getMessages,
} = require("../controller/message_controller");

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
