const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  post_id: { type: String },
  name: { type: String },
  date: { type: String },
  status: { type: Number },
  request_user_id: { type: String },
  owner_name: { type: String },
  machine: { type: String, required: true },
  location: { type: String, required: true },
  costperday: { type: Number, required: true },
  phone: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("request", requestSchema);
