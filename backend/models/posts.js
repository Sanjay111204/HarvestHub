const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  machine: { type: String, required: true },
  location: { type: String, required: true },
  costperday: { type: Number, required: true },
  phone: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("posts", postSchema);
