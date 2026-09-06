const { redis } = require("../config/redis");

const rateLimiter = (window, limit, name) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip;
            const key = `rate:${name}:${ip}`;

            const count = await redis.incr(key);

            if (count === 1) {
                await redis.expire(key, window);
            }

            if (count > limit) {
                return res.status(429).json({
                    success: false,
                    message: "Too many Request!"
                });
            }

            next();

        } catch (error) {
            console.error("Rate limiter error:", error);

            // Redis not available (in that case by default allow all request)
            next();
        }
    };
};

module.exports = rateLimiter;