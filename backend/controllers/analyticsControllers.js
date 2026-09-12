const analyticsService = require("../services/analyticsService");

const getAnalytics = async (req, res) =>{
    const {shortCode} = req.params;

    try {
        const result = await analyticsService.getAnalytics(shortCode);
    
        return res.json({
            success: true,
            result
        })
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"    
        })    
    }
}

module.exports = {
    getAnalytics
}