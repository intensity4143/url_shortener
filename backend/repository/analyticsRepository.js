const { pool } = require("../config/database");

const getVisitCount = async(shortCode) =>{
    const result = await pool.query(
        `SELECT count(*) As total_visits
         FROM analytics_events
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0];
}

const getOverview = async () => {
    const result = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM urls) AS total_urls,
            (SELECT COUNT(*) FROM analytics_events) AS total_clicks,
            (SELECT COUNT(*)
             FROM analytics_events
             WHERE visited_at >= CURRENT_DATE) AS today_clicks,
            (SELECT COUNT(*)
             FROM analytics_events
             WHERE visited_at >= CURRENT_DATE - INTERVAL '6 days') AS last_7_days_clicks
    `);

    return result.rows[0];
};


module.exports = {
    getVisitCount,
    getOverview
}