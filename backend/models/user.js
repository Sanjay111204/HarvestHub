const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // changed from Name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // changed from Password
});

module.exports = mongoose.model("User", userSchema);
