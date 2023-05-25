const express=require ('express');
const connection=require('../connection');
const router = express.Router();
const bcrypt=require('bcrypt');




// crud///////////////////////////

//1- creat new job //////////
router.post('/createJob/:id',(req,res)=>{
    const id=req.params.id;
    let job=req.body;
    query="insert into job (keyword,companyID,title,location,terms,salary,requirments,aboutus,abouttherole,contactus) values(?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[job.keyword,id,job.title,job.location,job.terms,job.salary,job.requirments,job.aboutus,job.abouttherole,job.contactus],(err,results)=>{
        if(!err){
            return res.status(200).json({massage: "job is inserted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

//2- read all jobs //////////////////////////////////////////////////////////////////
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

// 3- update job ////////////////////////////////////////////////////////////////////////////////
router.patch('/update/:id',(req,res,next)=>{
    const id=req.params.id;
    let job=req.body;
    var quary ="update job set title=?,location=?,terms=?,salary=?,requirments=?,aboutus=?,abouttherole=?,contactus=? where keyword=?";
    connection.query(quary,[job.title,job.location,job.terms,job.salary,job.requirments,job.aboutus,job.abouttherole,job.contactus,id],(err,results)=>{
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
    var quary="delete from job where keyword=?";
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
    if(newSeeker.username=="" || newSeeker.email=="" || newSeeker.password=="" || newSeeker.birthdate=="" || newSeeker.city=="" || newSeeker.phone=="" || newSeeker.gender=="" ){
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
        var quary="select * from users where email=?";
        connection.query(quary,[newSeeker.email],(err,results)=>{
            if(results.length){
                return res.status(500).json({massage: "This email is already exist!!"});
            }
            else{
                const saltRounds=10;
                let hash=bcrypt.hashSync(newSeeker.password,saltRounds);
                console.log(hash.length);
                    var quary="insert into users(email,username,password,birthDate,gender,city,phone) values(?,?,?,?,?,?,?)";
                    connection.query(quary,[newSeeker.email,newSeeker.username,hash,newSeeker.birthdate,newSeeker.gender,newSeeker.city,newSeeker.phone],(err,results)=>{
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
        var quary="select * from users where email=?";
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
                        return res.status(500).json({message:"Email or Password is wrong!!"});

                    }
            

            }
            else{
                
                return res.status(500).json({message:"Email or Password is wrong!!"});
            }
        });
    }
});

// fill the prifile////////////////////////////////////////
router.post('/profile/:id',(req,res,next)=>{
    const id=req.params.id;
    var user=req.body;
    if(user.email=="" || user.fullname=="" || user.skills=="" || user.languages=="" ||user.experiences=="" || user.education=="" || user.phone==""){
        return res.status(400).json({message: "Make sure to all the informations!!"});
    }
    var quary="insert into profile (id,email,fullname,skills,languages,experience,education,phone) values(?,?,?,?,?,?,?,?)";
    connection.query(quary,[id,user.email,user.fullname,user.skills,user.languages,user.experiences,user.education,user.phone],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Profile filled sucessfully!"});
        }
        else{
            return res.status(500).json(err);
        }
    });

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
router.get('/readtitle/:title',(req,res,next)=>{
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
router.get('/readlocation/:location',(req,res,next)=>{
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

//7 search where salary is greater than x///////////////
router.get('/readSalaryG/:salary',(req,res,next)=>{
    const salary=req.params.salary;
    var quary = "select * from job where salary>=?";

    connection.query(quary,[salary],(err,results)=>{
        if(!err){
            if(results.length==0){
                return res.status(404).json({message:"No jobs with Salary grater than "+salary});
            }
            else{
                return res.status(200).json(results);
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});


// //7 search where salary is less than x///////////////
router.get('/readSalaryL/:salary',(req,res,next)=>{
    const salary=req.params.salary;
    var quary = "select * from job where salary<?";

    connection.query(quary,[salary],(err,results)=>{
        if(!err){
            if(results.length==0){
                return res.status(404).json({message:"No jobs with Salary less than "+salary});
            }
            else{
                return res.status(200).json(results);
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
});


//8 search by company name=x //////////////////////////////////////
router.get('/readcompany/:name',(req,res,next)=>{
    const name=req.params.name;
    var quary = "select id from company where name=?";
    
    connection.query(quary,[name],(err,results)=>{
        if(!err){
            var id =results[0].id;
            var quary = "select * from job where companyID=?";
            connection.query(quary,id,(err,results)=>{
                if(!err){
                    return res.status(200).json(results);
                }
                else{
                    return res.status(500).json(err);
                }
            });
        }
        else{
            return res.status(500).json(err);
        }
    });
});




//apply for job 
router.post('/apply',(req,res,next)=>{
    let jobappliers=req.body;
    query="insert into jobappliers (email,jobid) values(?,?)";
    connection.query(query,[jobappliers.email,jobappliers.jobid],(err,results)=>{
        if(!err){
            return res.status(200).json({massage: "Application is inserted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    });
});




//see who apply for this job 
router.get('/readappliers/:jobid',(req,res,next)=>{
    const jobid=req.params.jobid;
    var quary = "select * from jobappliers where jobid=?";
    var r;
    var arr=[];
    var jsonarr=[];
    var l;
    connection.query(quary,[jobid],(err,results)=>{
        l=results.length;
        console.log(l);
        
        for(var i=0;i<l;i++){
            arr[i]=results[i].email;
            console.log(arr[i]);
        }
    });
            for(var i=0;i<l;i++){
                var quary = "select * from  profile where email=?";
                connection.query(quary,[arr[i]],(err,results)=>{
                //jsonarr[i]=results;
                console.log(results);
                 return res.json(results);
            });
            }
            
            //console.log(jsonarr);
             //res.write(jsonarr);
           // return res.json(jsonarr);
        
           
    
});


module.exports=router;
