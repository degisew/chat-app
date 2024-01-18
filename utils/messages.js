const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const message = async (messageId, text, sender) => {
  const newMessage = new Message({ messageId, text, sender });
  try {
    const savedMessage = await newMessage.save();
    console.log("Saved!", savedMessage);
    // res.status(200).json(savedMessage);
  } catch (err) {
    console.error(err);
    // res.status(500).json(err);
  }
};

const chat = async (chatId, messageId, text, sender, timestamp) => {
  const chat = await Chat.findOne({ chatId: chatId });
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", chat);
  if (chat) {
    try {
      chat.messages.push({ messageId, text, sender, timestamp });
      // Save the updated chat
      await chat.save();
    } catch (err) {
      console.error(err);
    }
  }else {
    try {
      // Chat doesn't exist, create a new one
      const newChat = new Chat({
        chatId: chatId,
        messages: [{ messageId, text, sender, timestamp }],
      });
      const savedChat = await newChat.save();
      console.log(savedChat);
    } catch (err) {
      console.error(err);
    }
  }
};

// New way with promise or async/await
const getMessages = async (chatId) => {
  try {
    // Assuming you have a Message model defined
    const chat = await Chat.findOne({ chatId: chatId });

    // Handle the result
    if(chat) {
      console.log('#####################################################', chat.messages[0]);
      const response = chat.messages;
      return response;
    }
    return;
  } catch (error) {
    // Handle errors
    console.error('Error fetching messages:', error);
  }
};

// const postMessages = async (req, res) => {
//     var message = new Message(req.body);
//     try {
//       const savedMessage = await message.save();
//       res.status(200).json(savedMessage);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

module.exports = {
  message,
  chat,
  getMessages,
};
