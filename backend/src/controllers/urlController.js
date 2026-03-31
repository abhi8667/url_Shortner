const Url = require("../models/Url");
const env = require("../config/env");
const generateShortCode = require("../utils/generateShortCode");
const isValidUrl = require("../utils/validateUrl");
const { protect } = require("../middleware/authMiddleware");
const Click = require("../models/Click");
const UAParser = require("ua-parser-js");

const createShortUrl = async (req, res, next) => {
  try {
    const { originalUrl, customCode, expiresAt } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ message: "Please provide a valid URL" });
    }

    const existing = await Url.findOne({ originalUrl });

    if (existing) {
      return res.status(200).json({
        message: "Short URL already exists for this link",
        data: {
          id: existing._id,
          originalUrl: existing.originalUrl,
          shortCode: existing.shortCode,
          shortUrl: `${env.serverBaseUrl}/s/${existing.shortCode}`,
          clicks: existing.clicks,
          createdAt: existing.createdAt,
        },
      });
    }

    if (customCode) {
      const existingCustom = await Url.findOne({
        $or: [{ shortCode: customCode }, { customCode }],
      });
      if (existingCustom) {
        return res.status(400).json({ message: "Custom code already in use" });
      }
      shortCode = customCode;
      isUnique = true;
    } else {
      // Retry a few times in the unlikely event of a collision.
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const candidate = generateShortCode();
        const found = await Url.findOne({ shortCode: candidate });
        if (!found) {
          shortCode = candidate;
          isUnique = true;
          break;
        }
      }
    }

    if (!isUnique) {
      return res
        .status(500)
        .json({ message: "Unable to generate a unique short code" });
    }

    const created = await Url.create({
      originalUrl,
      shortCode,
      customCode: customCode || null,
      userId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    return res.status(201).json({
      message: "Short URL created successfully",
      data: {
        id: created._id,
        originalUrl: created.originalUrl,
        shortCode: created.shortCode,
        shortUrl: `${env.serverBaseUrl}/s/${created.shortCode}`,
        clicks: created.clicks,
        expiresAt: created.expiresAt,
        createdAt: created.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllUrls = async (req, res, next) => {
  try {
    const filter = req.user ? { userId: req.user.id } : {};
    const urls = await Url.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      data: urls.map((item) => ({
        id: item._id,
        originalUrl: item.originalUrl,
        shortCode: item.shortCode,
        shortUrl: `${env.serverBaseUrl}/s/${item.shortCode}`,
        clicks: item.clicks,
        expiresAt: item.expiresAt,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

const redirectToOriginal = async (req, res, next) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return res.status(410).json({ message: "Short URL has expired" });
    }

    // Log click metadata
    const ua = new UAParser(req.headers["user-agent"]).getResult();
    await Click.create({
      urlId: url._id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      browser: ua.browser.name,
      os: ua.os.name,
      device: ua.device.type || "desktop",
      referer: req.headers["referer"] || "direct",
    });

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({ _id: id, userId: req.user.id });

    if (!url) {
      return res
        .status(404)
        .json({ message: "URL not found or not authorized" });
    }

    const clicks = await Click.find({ urlId: id }).sort({ timestamp: -1 });

    // Simple aggregation for charts
    const stats = {
      totalClicks: clicks.length,
      byBrowser: {},
      byOS: {},
      byDate: {},
    };

    clicks.forEach((c) => {
      // By Browser
      const browser = c.browser || "Unknown";
      stats.byBrowser[browser] = (stats.byBrowser[browser] || 0) + 1;

      // By OS
      const os = c.os || "Unknown";
      stats.byOS[os] = (stats.byOS[os] || 0) + 1;

      // By Date (Last 7 days)
      const date = c.timestamp.toISOString().split("T")[0];
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
    });

    return res.status(200).json({
      data: {
        url,
        stats,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShortUrl,
  getAllUrls,
  redirectToOriginal,
  getAnalytics,
};
