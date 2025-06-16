const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Cant connect to DB");
  }
};
module.exports = connectDB;
