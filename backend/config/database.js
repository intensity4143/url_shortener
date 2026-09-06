const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT),
    
    max: 20
})

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Database connected:", result.rows[0]);
    }
});

module.exports = pool;