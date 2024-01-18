const { message, chat, getMessages } = require("./utils/messages");
const moment = require('moment');
// const {
//   userJoin,
//   getCurrentUser,
//   usersLeave,
//   getRoomUsers,
// } = require("./utils/users");

const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', timestamp);
const chatSocket = (io) => {
  io.on("connection", (socket) => {
    try {
      console.log("User is connected.");
      // io.emit("start", dbMessages);
      socket.on("chatMessage", ({chatId, messageId, text, sender }) => {
        message(messageId, text, sender);
        chat(chatId, messageId, text, sender, timestamp);
        io.emit("message", { chatId: messageId, text, sender, time: timestamp});
      });
      socket.on("disconnect", () => {
        console.log("User is left the chat.");
      });
    } catch (error) {
      // Handle errors
      console.error('Error in chatSocket:', error);
    }
  });
};













// const chatSocket = (io) => {
//   io.on("connection", (socket) => {
//     // socket.on("joinRoom", ({ username, room }) => {
//     //   const user = userJoin(socket.id, username, room);
//     //   socket.join(user.room);
//       socket.broadcast
//         .to(user.room)
//         .emit(
//           "message",
//           messageFormat(chatBotName, `${user.username} has joined the chat.`)
//         );
//       // Send use and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     });

//     socket.on("chatMessage", (msg) => {
//       const user = getCurrentUser(socket.id);
//       io.to(user.room).emit("message", messageFormat(user.username, msg));
//     });

//     socket.on("disconnect", () => {
//       const user = usersLeave(socket.id);
//       if (user) {
//         socket
//           .to(user.room)
//           .emit(
//             "message",
//             messageFormat(chatBotName, `${user.username} left the Chat room.`)
//           );
//         socket.leave(user.room);
//       }
//       // Send use and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     });
//   });
// };

module.exports = chatSocket;
