const mongoose = require("mongoose");
const DB_URI = "mongodb://127.0.0.1:27017/auth";
const connectDatabase = () => {
  mongoose
    .connect(DB_URI)
    .then((con) => {
      console.log(`MongoDB Database Connected To ${con.connection.host}`);
    });
};

module.exports = connectDatabase;
