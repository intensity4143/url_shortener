const pool = require("../config/database");
const encodeBase62 = require("../utils/encodeBase62");

const createUrl = async (originalUrl) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const idResult = await client.query(
            `SELECT nextval('urls_id_seq') AS id`
        );

        const nextId = idResult.rows[0].id;

        const shortCode = encodeBase62(nextId);

        const result = await client.query(
            `INSERT INTO urls (id, original_url, short_code)
             OVERRIDING SYSTEM VALUE
             VALUES ($1, $2, $3)
             RETURNING id, original_url, short_code, created_at`,
            [nextId, originalUrl, shortCode]
        );

        await client.query("COMMIT");

        return result.rows[0];

    } 
    catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } 
    finally {
        client.release();
    }
};

const getUrl = async (shortCode) => {
    const result = await pool.query(
        `SELECT original_url
         FROM urls
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0];
};

const getByLongUrl = async (originalUrl) =>{
    const result = await pool.query(
        `SELECT short_code 
        FROM urls
        WHERE original_url = $1`,
        [originalUrl]
    )

    if(result.rows.length > 0){
        return result.rows[0];
    }

    return null;
}

module.exports = {
    createUrl,
    getUrl,
    getByLongUrl
};