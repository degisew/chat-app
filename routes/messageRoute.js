const express = require('express');
const {chat, getMessages} = require('../controllers/chatHandler');
const message = require('../controllers/messageHandler');

router = express.Router();


router.get('/messages', getMessages);


router.post('/messages/', chat);


module.exports = router;