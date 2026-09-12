const {pool} = require("../config/database");

const getVisitCount = async(shortCode) =>{
    const result = await pool.query(
        `SELECT count(*) As total_visits
         FROM analytics_events
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0];
}



module.exports = {
    getVisitCount
}