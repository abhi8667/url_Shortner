const express = require("express");
const {
  createShortUrl,
  getAllUrls,
  getAnalytics,
} = require("../controllers/urlController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/shorten", (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, createShortUrl);
router.get("/", protect, getAllUrls);
router.get("/analytics/:id", protect, getAnalytics);

module.exports = router;
