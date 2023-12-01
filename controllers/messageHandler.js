const Message = require('../models/messageModel')


const getMessages = (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
      })
}

const postMessages = (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      res.sendStatus(200);
    })
  }

module.exports = {
    getMessages,
    postMessages,
};