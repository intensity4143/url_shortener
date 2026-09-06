const pool = require("../config/database");
const encodeBase62 = require("../utils/encodeBase62");

const createShortUrl = async (originalUrl) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const idResult = await client.query(
            `SELECT nextval('urls_id_seq') AS id`
        );

        const id = idResult.rows[0].id;

        const shortCode = encodeBase62(id);

        const result = await client.query(
            `INSERT INTO urls (id, original_url, short_code)
             VALUES ($1, $2, $3)
             RETURNING id, original_url, short_code, created_at`,
            [id, originalUrl, shortCode]
        );

        await client.query("COMMIT");

        return result.rows[0];

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
};

const getOriginalUrl = async (shortCode) => {
    const result = await pool.query(
        `SELECT original_url
         FROM urls
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0];
};

module.exports = {
    createShortUrl,
    getOriginalUrl
};