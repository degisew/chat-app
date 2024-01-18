require("dotenv").config();
const path = require("path");
const router = require("./routes/route");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require('./swagger')
const chatSocket = require("./socket");
const connectDB = require("./db/db");
const express = require("express");
const cors = require('cors');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

connectDB();

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(cors());
app.use(router);

chatSocket(io);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));


server.listen(process.env.PORT, () => {
  console.log("server is running on port", server.address().port);
});
