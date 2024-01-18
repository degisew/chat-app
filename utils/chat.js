const Chat = require("../models/chatModel");
const createChatId = require("../utils/createChatRoom");

// const createOrGenerateChat = async (senderUid, receiverUid) => {
//   const chatId = createChatId(senderUid, receiverUid);
//   const chat = await Chat.findOne({ chatId });
//   if (chat) {
//     const response = chat.messages;
//     return response;
//   } else {
//     const newChat = new Chat({
//       chatId,
//       messages: [],
//     });
//     res;
//   }
// };

const saveChat = async (senderUid, receiverUid, text, timestamp) => {
  const chatId = createChatId(senderUid, receiverUid);
  const chat = await Chat.findOne({ chatId });
  if (chat) {
    chat.messages.push({
      sender: senderUid,
      receiver: receiverUid,
      text,
      timestamp,
    });
    // Save the updated chat
    await chat.save();
  } else {
    // Chat doesn't exist, create a new one
    const newChat = new Chat({
      chatId,
      messages: [
        {
          sender: senderUid,
          receiver: receiverUid,
          text,
          timestamp,
        },
      ],
    });
    const savedChat = await newChat.save();
    // console.log(savedChat);
  }
};

module.exports = {
  saveChat,
  // createOrGenerateChat,
};
