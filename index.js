require('dotenv').config();
const path = require('path');
// const router = require('./routes/messageRoute');
// const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// connectDB();

app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.json());
// app.use(router);

io.on('connection', socket =>{
    socket.broadcast.emit('message','User has joined');
    socket.on('chatMessage', msg => {
        socket.emit('message', msg)
        // console.log(`################ ${msg}`);
    })
    socket.on('disconnect', () => {
        io.emit('message', 'The user left the Chat room.')
    })
   });
   

server.listen(3000, () => {
    console.log('server is running on port', server.address().port);
})
