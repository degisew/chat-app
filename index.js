require("dotenv").config();
const path = require("path");
const router = require('./routes/messageRoute');
const chatSocket = require('./socket');
const connectDB = require('./db/connect');
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

connectDB();

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(router);

chatSocket(io);

server.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});
