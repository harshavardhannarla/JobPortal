const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobschema = new Schema ({
    title:{
        type:String,
        
    },
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    max_no_appls:{
        type:Number,
    },
    max_no_pos:{
        type:Number,
    },
    date_of_pos:{
        type:Date
    },
    deadline:{
        type:Date
    },
    skillset:{
        type:[String]
    },
    type_of_job:{
         type: String ,
         enum : ["ft","pt","wfh"]
    },
    duration:{
        type: Number,
    },
    salary:{
        type:Number

    },
    rating:{
        type:Number,
        min :0,
        max:5
    },
    status:{
        type:String,
        default:"notfull"
    },
    emails_appl:[String]
})


module.exports = job = mongoose.model("job",jobschema);