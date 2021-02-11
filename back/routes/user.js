const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usr = require("../models/user");


router.get("/", function(req, res) {
    usr.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

router.post("/register", async (req, res) => {
    

    const {email,password,usr_type}= req.body;
    const existinguser =  await usr.findOne({email:email});
       
        if(existinguser)
            return res.json({status:"0"});
        
        let newuser = new usr({
            email,
            password,
            usr_type
            });
        
            
        const salt =   await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newuser.password,salt);

        newuser.password = passwordHash; 
        newuser.save()
        .then(user => {
         
            res.json({newuser,status:"1"});
        })
        .catch(err => {
            res.json({msg:err});
        });
    
});



router.post("/login", async (req,res) => {
      
       const {email, password} = req.body;
       
       if(!email || !password)
       return res.json({status:"0",msg :" Not all fields are filled"});
       const user = await usr.findOne({email:email});
   
    if(!user)
   {      console.log("came here ",email);
       return res
            .json({status:"0",msg: " No account with the given email exists"});
   }
    const didmatch = await bcrypt.compare(password, user.password);
    if(!didmatch) 
        return res
             .json({status:"0",msg : " invalid credentials"});
    

    res.json({user,status:"1"});


});


module.exports = router;
