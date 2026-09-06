const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

const pool = require("./config/database");
const urlRoutes = require("./routes/urlRoutes")

app.use('/api', urlRoutes);

app.get("/", (req,res)=>{
    res.json({message: "welcome to backend server"});
})

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})