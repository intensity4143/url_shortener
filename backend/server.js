const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const pool = require("./config/database");
const urlRoutes = require("./routes/urlRoutes")
const { redis, connectRedis } = require("./config/redis")

app.use('/', urlRoutes);

app.get("/", (req,res)=>{
    res.json({message: "welcome to backend server"});
})

const startServer = async () => {
    try {
        await connectRedis();
        
        app.listen(PORT, ()=>{
        console.log(`server started at port ${PORT}`)
        })  
    } 
    catch (error) {
        console.log("Failed to start server!", error) 
    }
}

startServer();