const urlRepository = require("../repository/urlRepository");
const encodeBase62 = require("../utils/encodeBase62");
const { redis } = require("../config/redis");

const createShortUrl = async (originalUrl) => {
    const key = `url:long:${originalUrl}`;

    // finding in cache
    const cachedShortCode = await redis.get(key);

    // Cache hit
    if (cachedShortCode) {
        return {
            created: false,
            shortCode: cachedShortCode
        };
    }

    // Check if URL already exists
    const exist = await urlRepository.getByLongUrl(originalUrl);

    if (exist) {
        // saving to redis ( longUrl -> shortUrl )
        await redis.set(
            key,
            exist.short_code,
            { EX: 1800 }
        );

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

    // saving to redis ( longUrl -> shortUrl )
    await redis.set(
        key,
        shortCode,
        { EX: 1800 }
    );

    // saving to redis (shortCode -> longUrl)
    await redis.set(
        `url:short:${shortCode}`,
        originalUrl,
        { EX: 1800 }
    );

    return {
        created: true,
        shortCode: entry.short_code
    };
};


const getOriginalUrl = async (shortCode) => {

    // finding in cache
    const cacheUrl = await redis.get(`url:short:${shortCode}`);

    // Cache hit
    if (cacheUrl) {
        return {
            original_url: cacheUrl
        };
    }

    // call for service ( cache miss )
    const result = await urlRepository.getByShortCode(shortCode);

    if (!result) {
        return null;
    }

    // saving in redis (shortCode -> originalURL)
    await redis.set(
        `url:short:${shortCode}`,
        result.original_url,
        { EX: 1800 }
    );

    return result;
};


module.exports = {
    createShortUrl,
    getOriginalUrl
};