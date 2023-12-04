const Message = require('../models/messageModel')

// New way with promise or async/await
const getMessages = async (req, res) => {
  try {
    // Assuming you have a Message model defined
    const messages = await Message.find({}); // Use your actual query conditions

    // Handle the result
    res.json(messages);
  } catch (error) {
    // Handle errors
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postMessages = async (req, res) => {
    var message = new Message(req.body);
    try {
      const savedMessage = await message.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports = {
    getMessages,
    postMessages,
};