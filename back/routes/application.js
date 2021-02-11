var express = require("express");
var router = express.Router();


const ap = require("../models/application");
const applicant = require("../models/applicant");
const job =require("../models/jobs");


router.get("/", function(req, res) {
    ap.find(function(err, aps) {
		if (err) {
			res.json({msg:err,status:"0"})
		} else {
			res.json({aps,status:"1"});
		}
	})
});


router.post("/create", (req, res) => {
     
    const newap = new ap({
        jobid :req.body.jobid,
        email_appl : req.body.email_appl,
        email_rec : req.body.email_rec,
        sop:req.body.sop,
        state:"applied"

    });

    newap.save()
        .then(async ap => {
           let  a = await job.findOneAndUpdate({_id:ap.jobid},{$push:{emails_appl:ap.email_appl}});
           
            if(a.emails_appl.length >= Number(a.max_no_appls)-1)
            {  let b =await job.findOneAndUpdate({_id:ap.jobid}, {status:'full'});
            }

            res.json({ap,status:"1"});
        })
        .catch(err => {
            console.log(err);
            res.json({status:"0",msg:err});
        });
});


router.post("/getspl", (req,res) =>{
  
    let op=[];
    ap.find({jobid:req.body._id},function(err,applns){
        if(err)
        res.json({status:"0",msg:err});
        else
        {  
            const len = applns.length;
            let check=0;
           
            applns.map((appln,i) => {
                     let obj={};
                     obj.sop = appln.sop;
                     obj.applnid = appln._id;
                     obj.state =appln.state;
                applicant.findOne({email:appln.email_appl})
                         .then(doc =>
                         {   obj.name=doc.name;
                             // obj.education=doc.education;
                             check = check+1; 
                         })
                         .then(()=>{
                           
                             op.push(obj);
                            if(check == len)
                            {res.json({op,status:"1"});}

                         })  
                         
                      
               
            });
            
           // console.log("aplength: ",ap.length);
        }
    })     

});


router.post("/myapp",(req,res) =>{
   ap.find({email_appl:req.body.email} ,function(err,applns){
    if(err)
    res.json({status:"0",msg:err});
    else
    {   var ans=[];
        var check=0;
        var len = applns.length;
        applns.map((appl,i)=>{
            job.findOne({_id:appl.jobid})
                .then(j =>{
                    var po =j;
                   
                    ans.push(po);
                    check =check+1;
                })
                .then(()=>{
                    if(check == len)
                    res.json({ans,status:"1"});
                })
                .catch(err => res.json({status:"0",msg:err}));

        
        
        
        }
        );
    }



   });


});



router.post("/edit",(req,res) =>{
       ap.findOneAndUpdate({_id:req.body.id},{state:req.body.edit} ,(err,doc)=>
       {   if(err)
            res.json({status:"0",msg:err});
            else
            {   var a= ap.findOne({_id:req.body.id});
               console.log(a.status);   
            res.json({status:"1"});
            }
       });

});
module.exports = router;
