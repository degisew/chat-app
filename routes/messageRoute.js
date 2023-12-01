const express = require('express');
const {getMessages, postMessages} = require('../controllers/messageHandler');

router = express.Router();


router.get('/messages', getMessages)


router.post('/messages/', postMessages)

