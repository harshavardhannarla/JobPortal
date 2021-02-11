const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recSchema = new Schema({
    name: String,
    email:{type: String,required:true},
    cont_num:String,
    bio:String
})


module.exports = recruiter = mongoose.model("recruiter",recSchema);