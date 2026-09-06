const pool = require("../config/database");

const createUrl = async (id, originalUrl, shortCode) => {
    const result = await pool.query(
        `INSERT INTO urls (id, original_url, short_code)
         OVERRIDING SYSTEM VALUE
         VALUES ($1, $2, $3)
         RETURNING id, original_url, short_code, created_at`,
        [id, originalUrl, shortCode]
    );

    return result.rows[0];
};


const getByShortCode = async (shortCode) => {
    const result = await pool.query(
        `SELECT original_url
         FROM urls
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0] || null;
};


const getByLongUrl = async (originalUrl) => {
    const result = await pool.query(
        `SELECT short_code
         FROM urls
         WHERE original_url = $1`,
        [originalUrl]
    );

    return result.rows[0] || null;
};


const getNextId = async () => {
    const result = await pool.query(
        `SELECT nextval('urls_id_seq') AS id`
    );

    return result.rows[0].id;
};


module.exports = {
    createUrl,
    getByShortCode,
    getByLongUrl,
    getNextId
};