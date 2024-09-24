const Conversaiton = require("../models/conversation_model");
const Message = require("../models/message_model");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversaiton.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversaiton.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new message({
      senderId: senderId,
      receiverId: receiverId,
      message,
    });

    if (!newMessage) {
      conversation.message.push(newMessage._id);
    }

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error in sendMessage controller : ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendMessage };
