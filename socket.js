// const { saveChat } = require("./utils/chat");
const getPreviousMessages = require("./utils/messages");
const createChatId = require("./utils/createChatRoom");
// const moment = require("moment");

// const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
const timestamp = new Date().toLocaleString();

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User is connected.${socket.id} `);
    try {
      const chatId = createChatId(sender, receiver);

      const loadPreviousMessages = async () => {
        // Load previous messages from the database
        const previousMessages = await getPreviousMessages(chatId);

        // Emit previous messages to the connecting
        socket.emit("previousMessages", previousMessages);
      };
      loadPreviousMessages();
    } catch (error) {
      console.log("chat id", error);
    }

    socket.on("chatMessage", ({ sender, receiver, text, chatIdN }) => {
      io.emit("message", {
        sender,
        receiver,
        text,
        timestamp,
        chatIdN,
      });
    });
    socket.on("disconnect", () => {
      console.log("User has left the chat.");
    });
  });
};

module.exports = chatSocket;
