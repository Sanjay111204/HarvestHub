require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const requestRoutes = require("./routes/requestRoutes");
const path = require("path");

connect();

const _dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: "https://harvesthub-h4eh.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/Seller", postRoutes);
app.use("/api/request", requestRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("/", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 1112;
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
