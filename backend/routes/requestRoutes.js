const express = require("express");
const {
  push,
  pull,
  updatestatus,
  pullstatus,
} = require("../controllers/requestController");
const router = express.Router();
router.post("/push", push);
router.post("/pull", pull);
router.post("/update", updatestatus);
router.post("/pullstatus", pullstatus);
module.exports = router;
