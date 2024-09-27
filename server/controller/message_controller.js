const Message = require("../models/message_model.js");
const Conversation = require("../models/conversation_model.js");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    // SOCKET IO FUNCTIONALITY HERE

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([await conversation.save(), await newMessage.save()]);

    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in sendMessage controller : ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await Message.find({
      _id: { $in: conversation.message },
    });
    if (!messages) {
      return res.status(404).json({ message: "Messages not found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in getMessages controller : ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { sendMessage, getMessages };
