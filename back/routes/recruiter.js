var express = require("express");
var router = express.Router();

const rec = require("../models/recruiter");

router.get("/", function(req, res) {
    rec.find(function(err, recs) {
		if (err) {
			console.log(err);
		} else {
			res.json(recs);
		}
	})
});

router.post("/register", (req, res) => {
    const { name, email, const_num ,bio }  = req.body;
    const newrec = new rec({
        name,
        email,
        const_num,
        bio

    });

    newrec.save()
        .then(rec => {
            res.json({rec,status:"1"});
        })
        .catch(err => {
            console.log(err);
            res.json({msg:err,status:"0"});
        });
});

router.post("/getrecruiter",(req,res) => {
  
    rec.findOne({email:req.body.email}, function(err,recr){
        if(err)
            res.json({msg:err,status:"0"});
        else {
            
            if(!recr)
            {res.json({msg:"User not found",status:"0"});
            }
            else
            res.json({recr,status:"1"});
        }
    })
});



router.post("/update", (req, res) => {
    const { name ,cont_num,bio }  = req.body;
    
    const newrecr = {
        name,
        cont_num,
        bio
    }

    rec.findOneAndUpdate({email:req.body.email},newrecr, function(err,a) 
    {   if(err)
        {   console.log(err);
            res.json({msg:err,status:"0"});
        }
        else
        res.json({status:"1"});
    })

});



module.exports = router;

