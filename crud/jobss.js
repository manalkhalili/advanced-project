const express=require ('express');
const connection=require('../connection');
const router = express.Router();

// crud///////////////////////////

//1- creat//////////
router.post('/create',(req,res,next)=>{
    let job=req.body;
    query="insert into job (title,location,terms,salary,requirments,aboutus,abouttherole,contactus) values(?,?,?,?,?,?,?,?,?)";
    connection.query(query,[job.title,job.location,job.terms,job.salary,job.requirments,job.aboutus,job.abouttherole,job.contactus],(err,results)=>{
        if(!err){
            return res.status(200).json({massage: "job is inserted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
})

module.exports=router;
