const { saveChat } = require("../utils/chat");
const Chat = require("../models/chatModel");
const createChatId = require("../utils/createChatRoom");

const timestamp = new Date().toLocaleString();

const createChatOrGenerateMessages = async (req, res) => {
  const { sender, receiver } = req.body;
  const chatId = createChatId(sender, receiver);
  const chat = await Chat.findOne({ chatId });
  if (chat) {
    try {
      const response = chat.messages;
      res.status(201).json(chat);
    } catch (err) {
      // console.error(err);
      res.status(500).json(err);
    }
  } else {
    const newChat = new Chat({
      chatId,
      messages: [],
    });
    newChat.save();
    res.status(201).json(newChat);
  }
};

const createMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;
  try {
    saveChat(sender, receiver, text, timestamp);
    // console.log("Saved!");
    res.status(201).json("Message sent.");
  } catch (err) {
    // console.error(err);
    res.status(500).json(err);
  }
};

const updateMessage = async (req, res) => {
  const { chatId, messageId } = req.params;
  const { text } = req.body;
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { chatId: chatId, "messages._id": messageId },
      { $set: { "messages.$.text": text } },
      { new: true }
    );
    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteMessage = async (req, res) => {
  const { chatId, messageId } = req.params;
  try {
    const updatedChat = await Chat.updateOne(
      { chatId: chatId },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updatedChat.matchedCount > 0) {
      // nModified > 0 means at least one document was updated
      res.status(200).json({ message: "Message deleted successfully." });
    } else {
      res.status(404).json({ message: "Message not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
  // try {
  //   const deletedChat = await Chat.findOneAndDelete({
  //     chatId: chatId,
  //     "messages._id": messageId,
  //   });
  //   if (deletedChat) {
  //     res.status(200).json(deletedChat);
  //   } else {
  //     res.status(404).json({ message: "Message Not found." });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
};
// const getMessages = async (req, res) => {
//   const chatId = createChatId(sender, receiver);
//   try {
//     const response = fetchMessages(chatId);
//     res.status(200).json(response);
//   } catch (error) {
//     // Handle errors
//     res.status(500).json(error);
//     console.error("Error fetching messages:", error);
//   }
// };

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
  createChatOrGenerateMessages,
};
