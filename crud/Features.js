const express=require ('express');
const connection=require('../connection');
const router = express.Router();

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
  
 
  
  


