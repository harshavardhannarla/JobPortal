var express = require("express");
var router = express.Router();


const job = require("../models/jobs");


router.get("/", function(req, res) {
    job.find(function(err, jobs) {
		if (err) {
			res.json({msg:err,status:"0"})
		} else {
			res.json({jobs,status:"1"});
		}
	})
});

router.post("/getjobbyid",function(req,res){
      job.findById(req.body._id ,function(err,job){
        if(err)
        res.json({status:"0",msg:err});
        else
        {
            res.json({status:"1",job});
        }
      });

});


router.post("/create", (req, res) => {
     
    const newjob = new job({
        title :req.body.title,
        name  :req.body.name,
        email :req.body.email,
        max_no_appls:req.body.max_no_appls,
        max_no_pos:req.body.max_no_pos,
        date_of_pos :req.body.date_of_pos,
        deadline :req.body.deadline,
        skillset :req.body.skillset,
        type_of_job: req.body.type_of_job,
        duration:req.body.duration,
        salary:req.body.salary,
        rating:req.body.rating,
        status:"notfull"

    });

    newjob.save()
        .then(job => {
            res.json({job,status:"1"});
        })
        .catch(err => {
            console.log(err);
            res.json({status:"0",msg:err});
        });
});



router.post("/getjob",function(req,res){
    job.find({email:req.body.email},function(err,jobs)
    {  if(err)
        res.json({msg:err,status:"0"});
        else
            res.json({status:"1",jobs});        

    });

});

router.post("/deletejob", function(req,res){
    job.findOneAndDelete({_id:req.body._id},(err,docs)=>
    {  if(err)
         res.json({status:"0"});
         else 
         res.json({status:"1"});    
    });
});

router.post("/update", (req, res) => {

    
    const updates ={
        max_no_pos:req.body.max_no_pos,
        max_no_appls:req.body.max_no_appls,


    }
    job.findOneAndUpdate({_id:req.body._id},updates, function(err,a) 
    {   if(err)
        {   console.log(err);
            res.json({msg:err,status:"0"});

        }
        else
        res.json({status:"1"});


    })

   

});


module.exports = router;

