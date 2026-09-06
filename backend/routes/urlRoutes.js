const express = require("express");
const router = express.Router();

const {createShortUrl, getOriginalUrl} = require("../controllers/urlController")

router.post("/generate", createShortUrl);
router.get("/:shortCode", getOriginalUrl);

module.exports = router;