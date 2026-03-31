const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/smart_url_shortener",
  serverBaseUrl: process.env.SERVER_BASE_URL || "http://localhost:5000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "somesecretkey",
};
