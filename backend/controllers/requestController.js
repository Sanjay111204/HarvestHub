const request = require("../models/request");

const push = async (req, res) => {
  const {
    post_id,
    name,
    date,
    req_id,
    owner_name,
    machine,
    location,
    costperday,
    phone,
    image,
  } = req.body;
  try {
    const result = await request.create({
      post_id,
      name,
      date,
      status: 0,
      request_user_id: req_id,
      owner_name,
      machine,
      location,
      costperday,
      phone,
      image,
    });
    console.log("Successfully pushed");
    res.send("Request sent");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error while sending request to the owner" });
  }
};
const pull = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await request.find({ post_id: id });
    console.log("successfully fetched");
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error while loading resquest" });
  }
};

const updatestatus = async (req, res) => {
  const { id, newstatus } = req.body;
  try {
    const result = await request.updateOne(
      { _id: id },
      { $set: { status: newstatus } }
    );
    console.log("updated successfully");
    res.send("updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error while loading resquest" });
  }
};

const pullstatus = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await request.find({ request_user_id: id });
    console.log("successfully fetched");
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error while loading resquest" });
  }
};

module.exports = { push, pull, updatestatus, pullstatus };
