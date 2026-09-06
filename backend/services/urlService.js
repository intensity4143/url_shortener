const urlRepository = require("../repository/urlRepository");
const encodeBase62 = require("../utils/encodeBase62");

const createShortUrl = async (originalUrl) => {

    // Check if URL already exists
    const exist = await urlRepository.getByLongUrl(originalUrl);

    if (exist) {
        return {
            created: false,
            shortCode: exist.short_code
        };
    }

    // Get next ID
    const nextId = await urlRepository.getNextId();

    // Generate short code
    const shortCode = encodeBase62(nextId);

    // Store URL
    const entry = await urlRepository.createUrl(
        nextId,
        originalUrl,
        shortCode
    );

    return {
        created: true,
        shortCode: entry.short_code
    };
};


const getOriginalUrl = async (shortCode) => {

    const result = await urlRepository.getByShortCode(shortCode);

    if (!result) {
        return null;
    }

    return result;
};


module.exports = {
    createShortUrl,
    getOriginalUrl
};