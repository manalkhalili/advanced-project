const express =require('express');
const connection = require("./connection");
const jobRoute=require('./crud/jobss');

const app=express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/jobs',jobRoute);
const LinkedInAPI = require('./routers/LinkedInAPI.js');
app.use('/LinkedInAPI', LinkedInAPI);
module.exports=app;
