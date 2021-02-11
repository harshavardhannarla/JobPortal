var express = require("express");
const { findOneAndUpdate } = require("../models/applicant");
var router = express.Router();

const appl = require("../models/applicant");

router.get("/", function(req, res) {
    appl.find(function(err, appls) {
		if (err) {
			console.log(err);
		} else {
			res.json(appls);
		}
	})
});

router.post("/register", (req, res) => {
    const { name, email, education,skills,rating }  = req.body;
    
    const newappl = new appl({
        name,
        email,
        education,
        skills,
        rating

    });
    

    newappl.save()
        .then(appl => {
            res.json({appl,status:"1"});
        })
        .catch(err => {
            console.log(err);
            res.json({msg:err,status:"0"});
        });

});
router.post("/getapplicant",(req,res) => {
    appl.findOne({email:req.body.email}, function(err,appli){
        if(err)
            res.json({msg:err,status:"0"});
        else {
            
            if(!appli)
            {res.json({msg:"User not found",status:"0"});
            }
            else
            res.json({appli,status:"1"});
        }
    })
});


router.post("/update", (req, res) => {
    const { name , education,skills,rating }  = req.body;
    
    const newappl = {
        name:name,
        education:education,
        skills:skills,
        rating:rating

    }
    appl.findOneAndUpdate({email:req.body.email},newappl, function(err,a) 
    {   if(err)
        {   console.log(err);
            res.json({msg:err,status:"0"});

        }
        else
        res.json({status:"1"});


    })

   

});


module.exports = router;

