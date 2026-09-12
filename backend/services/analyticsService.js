const analyticsRespository = require("../repository/analayticsRepository")

const getAnalytics = async(shortCode) => {
    const result = await analyticsRespository.getVisitCount(shortCode);

    return {
        shortCode,
        totalVisits : result.total_visits
    }
}

module.exports = {
    getAnalytics
}