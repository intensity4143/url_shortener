const { createShortUrl, getOriginalUrl} = require("../models/urlModel");

const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "Please provide url"
            });
        }

        const exist = await getUrlByOriginalUrl(originalUrl);

        if (exist) {
            return res.status(200).json({
                success: true,
                message: "URL already exists",
                shortCode: exist.short_code
            });
        }

        const entry = await createUrl(originalUrl);

        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            shortCode: entry.short_code
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getOriginalUrl = async (req, res) =>{
    try {
        const {shortCode} = req.params;
        
        const result = await getOriginalUrl(shortCode);

        if(!result){
            return res.status(404).json({
                success: false,
                message: "URL not found"
            })
        }

        return res.redirect(result.original_url)
    } 
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { 
    createShortUrl,
    getOriginalUrl 
};