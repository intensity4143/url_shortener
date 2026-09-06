const urlService = require("../services/urlService");
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "Please provide url"
            });
        }

        // call for service
        const result = await urlService.createShortUrl(originalUrl);

        return res.status(result.created ? 201 : 200).json({
            success: true,
            message: result.created
                ? "URL shortened successfully"
                : "URL already exists",
            shortUrl: `${BASE_URL}/${result.shortCode}`
        });

    } 
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // call for service ( cache miss )
        const result = await urlService.getOriginalUrl(shortCode);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "URL not found"
            });
        }

        return res.redirect(result.original_url);

    } 
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createShortUrl,
    getOriginalUrl
};