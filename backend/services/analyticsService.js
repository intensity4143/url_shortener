const analyticsRepository = require("../repository/analyticsRepository")

const getAnalytics = async(shortCode) => {
    const result = await analyticsRepository.getVisitCount(shortCode);

    return {
        shortCode,
        totalVisits : result.total_visits
    }
}

const getOverview = async() => {
    const data = await analyticsRepository.getOverview();
    
    return {
        totalUrls: Number(data.total_urls),
        totalClicks: Number(data.total_clicks),
        clicksToday: Number(data.today_clicks),
        clicksLast7Days: Number(data.last_7_days_clicks)
    };
};

module.exports = {
    getAnalytics,
    getOverview
}