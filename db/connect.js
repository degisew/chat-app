require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // conect database
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.DB_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DataBase");
  } catch (error) {
    console.error("DataBase connection faild");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
