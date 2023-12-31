require("dotenv").config();
const messageFormat = require("./static/utils/messages");
const {
  userJoin,
  getCurrentUser,
  usersLeave,
  getRoomUsers,
} = require("./static/utils/users");
const path = require("path");
// const router = require('./routes/messageRoute');
// const connectDB = require('./db/connect');
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// connectDB();

app.use(express.static(path.join(__dirname, "static")));
// app.use(express.json());
// app.use(router);

chatBotName = "ChatBot";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageFormat(chatBotName, `${user.username} has joined the chat.`)
      );
    // Send use and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
      io.to(user.room).emit("message", messageFormat(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = usersLeave(socket.id);
    if (user) {
      socket
        .to(user.room)
        .emit(
          "message",
          messageFormat(chatBotName, `${user.username} left the Chat room.`)
        );
      socket.leave(user.room);
    }
    // Send use and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

server.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
