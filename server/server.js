require('dotenv').config();
const express=require("express");
const cors=require("cors");
const mongoose=require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;
conrs ({
    origin: process.env.CLIENT_URL,
   methods:["GET","POST","DELETE","PUT"],
   allowedHeaders:["Content-Type","Authentication"],
});

app.use(express.json());
//database connection

mongoose.connect(MONGO_URI).then(()=>console.log("mongodb is connected")).catch((e)=>console.log(e));