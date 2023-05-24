const express =require('express');
const connection = require("./connection");
const jobRoute=require('./crud/jobss');
const fileUpload=require('express-fileupload');


const app=express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(fileUpload());
app.use('/jobs',jobRoute);


module.exports=app;
