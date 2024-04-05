const {dbconnect} = require("./config/database");
const express = require("express");
const user= require("./routes/user");
const seller = require("./routes/seller");
const cors = require('cors');

const app = express();

require('dotenv').config();
const PORT = 3000;

//middlewares
app.use(express.json());
app.use(cors());

dbconnect(); //connecting to database

//mounting routes
app.use("/api/v1/seller",seller);
app.use("/api/v1",user);

//server
app.listen( PORT ,()=>{
    console.log(`App is listening at ${PORT}`)
});


