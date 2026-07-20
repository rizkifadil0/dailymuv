const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Databse connected ✅");
  } catch (err) {
    console.log("Failed to connect ⛔", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
