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
});

//2- read //////////////////////////////////////////////////////////////////
router.get('/read',(req,res,next)=>{
    var quary = "select *from job";
    connection.query(quary,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

// 3- update////////////////////////////////////////////////////////////////////////////////
router.patch('/update/:id',(req,res,next)=>{
    const id=req.params.id;
    let job=req.body;
    var quary ="update job set salary=?,title=? where id=?";
    connection.query(quary,[job.salary,job.title,id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"id not found"});
            }
            return res.status(200).json({message:"updated"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

// 4- delete //////////////////////////////////////
router.delete('/delete/:id',(req,res,next)=>{
    const id=req.params.id;
    var quary="delete from job where id=?";
    connection.query(quary,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"id not found"});
            }
            return res.status(200).json({message:"updated"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});
module.exports=router;
