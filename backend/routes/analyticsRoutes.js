const express = require("express")
const router = express.Router()

const { getAnalytics, getOverview } = require("../controllers/analyticsControllers")

router.get("/api/analytics/overview", getOverview);
router.get("/api/analytics/:shortCode", getAnalytics);

module.exports = router;