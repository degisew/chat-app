const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_COMPAS, {
    });
    console.log("Connected to DataBase");
  } catch (error) {
    console.error("DataBase connection faild");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
