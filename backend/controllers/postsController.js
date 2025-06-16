const posts = require("../models/posts");

const push = async (req, res) => {
  const { user_id, name, machine, location, costperday, phone, image64bit } =
    req.body;
  try {
    const post = posts.create({
      user_id,
      name,
      machine,
      location,
      costperday,
      phone,
      image: image64bit,
    });
    console.log("Successfully Posted");
    res.send("Successfully Posted");
  } catch (error) {
    console.log(error);
    res.send(`failed due to ${error}`);
  }
};

const pull = async (req, res) => {
  try {
    const { id } = req.body || {};
    console.log(`id:${id}`);
    if (!id) return res.status(400).json({ error: "Post ID is required" });
    const result = await posts.find({ user_id: id });
    console.log("succcessfully fetched");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.send(`failed due to ${error}`);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.body || {};
    console.log(`id:${id}`);
    if (!id) return res.status(400).json({ error: "Post ID is required" });
    const result = await posts.findByIdAndDelete(id);
    console.log("successfully deleted");
    res.send("successfully deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error while deleting" });
  }
};

const pullall = async (req, res) => {
  try {
    const result = await posts.find();
    console.log("succcessfully fetched");
    //console.log(result.data);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.send(`failed due to ${error}`);
  }
};

module.exports = { push, pull, remove, pullall };
