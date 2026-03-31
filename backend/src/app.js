const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");
const { redirectToOriginal } = require("./controllers/urlController");
const errorHandler = require("./middleware/errorHandler");
const env = require("./config/env");

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/s/:shortCode", redirectToOriginal);
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);

app.use(errorHandler);

module.exports = app;
