const express = require("express");
const {
  push,
  pull,
  remove,
  pullall,
} = require("../controllers/postsController");
const router = express.Router();
router.post("/push", push);
router.post("/pull", pull);
router.post("/remove", remove);
router.get("/pullall", pullall);

module.exports = router;
