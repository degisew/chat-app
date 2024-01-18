const Chat = require("../models/chatModel");

const getPreviousMessages = async (chatId) => {
  const chat = await Chat.findOne({ chatId });

  // Handle the result
  if (chat) {
    const response = chat.messages;
    return response;
  }
  return;
};

module.exports = getPreviousMessages;
