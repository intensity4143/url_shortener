const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimiter");

const {createShortUrl, getOriginalUrl} = require("../controllers/urlController")

router.post("/api/generate", rateLimiter(60, 5, "generate"), createShortUrl);
router.get("/:shortCode", rateLimiter(60, 15, "redirect"), getOriginalUrl);

const { getAnalytics } = require("../controllers/analyticsControllers")

router.get("/api/analytics/:shortCode", rateLimiter(60, 15, "analytics"), getAnalytics);

module.exports = router;

