const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware.verifyToken, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

module.exports = router;
