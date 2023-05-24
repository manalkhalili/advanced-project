const mysql=require('mysql');
var connection=mysql.createConnection({
    port:3309,
    host:"localhost",
    user:"root",
    password:"",
    database:"jobs"
}) ;
connection.connect((err)=>{
    if(!err){
        console.log("Connected to Database");
    }
    else{
        console.log(err);
    }
});
module.exports=connection;