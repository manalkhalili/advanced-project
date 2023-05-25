const express =require('express');
const connection = require("./connection");
const jobRoute=require('./crud/jobss');
const LinkedInAPI = require('./external/Linkedin.js');
const indeedAPI = require('./external/indeed.js');

const app=express();
app.use('/LinkedInAPI', LinkedInAPI);
app.use('/indeedAPI', indeedAPI);
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/jobs',jobRoute);


module.exports=app;
