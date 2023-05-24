const express=require ('express');
const connection=require('../connection');
const router = express.Router();
const bcrypt=require('bcrypt');

// crud///////////////////////////

//1- creat//////////
router.post('/create',(req,res,next)=>{
    let job=req.body;
    query="insert into job (title,location,terms,salary,requirments,aboutus,abouttherole,contactus) values(?,?,?,?,?,?,?,?)";
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


// sign up for job seeker/////////////////
router.post('/signupSeeker',(req,res,next)=>{
    let newSeeker=req.body;
    if(newSeeker.username=="" || newSeeker.email=="" || newSeeker.password=="" || newSeeker.birthdate=="" || newSeeker.city=="" || newSeeker.phone=="" || newSeeker.gender=="" || newSeeker.major=="" || newSeeker.expertIn==""){
        return res.status(500).json({massage: "Make sure to fill all information please!!"});
    }
    else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(newSeeker.email)){
        return res.status(500).json({massage: "Invalid Email!!"});
    }
    else if(newSeeker.password.length <8){
        return res.status(500).json({massage: "Password is short!!"});
    }
    else if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newSeeker.password)){
        return res.status(500).json({massage: "Password should has at least a symbol, upper and lower case letters and a number"});
        
    }
    else{
        var quary="select * from signup where email=?";
        connection.query(quary,[newSeeker.email],(err,results)=>{
            if(results.length){
                return res.status(500).json({massage: "This email is already exist!!"});
            }
            else{
                const saltRounds=10;
                let hash=bcrypt.hashSync(newSeeker.password,saltRounds);
                console.log(hash.length);
                    var quary="insert into signup(email,username,password,birthDate,major,gender,city,phone,expertIn) values(?,?,?,?,?,?,?,?,?)";
                    connection.query(quary,[newSeeker.email,newSeeker.username,hash,newSeeker.birthdate,newSeeker.major,newSeeker.gender,newSeeker.city,newSeeker.phone,newSeeker.expertIn],(err,results)=>{
                        if(!err){
                            return res.status(200).json({massage: "New user is inserted"});
                        }
                        else{
                            return res.status(500).json(err);
                        }
                    });
                
                
            }
        })
    }

});

// log in (job seeker)////////////////////////////
router.post('/loginSeeker',(req,res,next)=>{
    let seeker=req.body;
    if(seeker.email=="" || seeker.password==""){
        return res.status(500).json({massage: "Email or Password is blank!!"});
    }
    else{
        var quary="select * from signup where email=?";
        connection.query(quary,[seeker.email],(err,results)=>{
            if(results.length){
                const saltRounds=10;
                let hash=results[0].password;
                
                console.log(results[0].password);
                console.log(hash);
                    
                    if(bcrypt.compareSync(seeker.password,hash)){
                        return res.status(200).json({message:"Log in success, WELCOME Back!"});
                    }
                    else{
                        return res.status(500).json(err);

                    }
            

            }
            else{
                
                return res.status(500).json(err);
            }
        });
    }
});

// sign up new company////////////////
router.post('/signupCompany',(req,res,next)=>{
    let newCompany=req.body;
    if(newCompany.COname=="" || newCompany.email=="" || newCompany.password=="" || newCompany.location=="" || newCompany.discription=="" || newCompany.phone=="" || newCompany.feild==""){
        return res.status(500).json({massage: "Make sure to fill all information please!!"});
    }
    else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(newCompany.email)){
        return res.status(500).json({massage: "Invalid Email!!"});
    }
    else if(newCompany.password.length <8){
        return res.status(500).json({massage: "Password is short!!"});
    }
    else if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newCompany.password)){
        return res.status(500).json({massage: "Password should has at least a symbol, upper and lower case letters and a number"});
        
    }else{
        var quary="select * from company where email=?";
        connection.query(quary,[newCompany.email],(err,results)=>{
            if(results.length){
                return res.status(500).json({massage: "This email is already exist!!"});
            }
            else{
                const saltRounds=10;
                let hash=bcrypt.hashSync(newCompany.password,saltRounds);
                console.log(hash.length);
                    var quary="insert into company(email,name,password,location,feild,phone,discription) values(?,?,?,?,?,?,?)";
                    connection.query(quary,[newCompany.email,newCompany.COname,hash,newCompany.location,newCompany.feild,newCompany.phone,newCompany.discription],(err,results)=>{
                        if(!err){
                            return res.status(200).json({massage: "New Company is Signed UP"});
                        }
                        else{
                            return res.status(500).json(err);
                        }
                    });
                
                
            }
        })
    }

});

// log in company////////////////////

router.post('/loginCompany',(req,res,next)=>{
    let company=req.body;
    if(company.email=="" || company.password==""){
        return res.status(500).json({massage: "Email or Password is blank!!"});
    }else{
        var quary="select * from company where email=?";
        connection.query(quary,[company.email],(err,results)=>{
            if(results.length){
                const saltRounds=10;
                let hash=results[0].password;
                
                console.log(results[0].password);
                console.log(hash);
                    
                    if(bcrypt.compareSync(company.password,hash)){
                        return res.status(200).json({message:"Log in success, WELCOME Back!"});
                    }
                    else{
                        return res.status(500).json({message:"Email or Password is wrong!!"});

                    }
            

            }
            else{
                
                return res.status(500).json({message:"Email or Password is wrong!!"});
            }
        });
    }
});


//5 search where title =x///////////////
router.get('/readt/:title',(req,res,next)=>{
    const title=req.params.title;
    var quary = "select * from job where title=?";
    connection.query(quary,[title],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

//6 search where location =x///////////////
router.get('/readl/:location',(req,res,next)=>{
    const location=req.params.location;
    var quary = "select * from job where location=?";

    connection.query(quary,[location],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    });
});

//7 search where salary =x///////////////
router.get('/reads/:salary',(req,res,next)=>{
    const salary=req.params.salary;
    var quary = "select * from job where salary=?";

    connection.query(quary,[salary],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
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
//////////////////list///////////////

router.get('/list',(req,res,next)=>{
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

module.exports=router;