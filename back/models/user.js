const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email:{type: String},
    password:{type:String},
    usr_type:{type:String}
})


module.exports = recruiter = mongoose.model("user",userSchema);