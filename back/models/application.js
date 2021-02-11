const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const appnSchema = new Schema({
    jobid:String,
    email_appl:String,
    email_rec:String,
    sop:String,
    state:String
})


module.exports = application = mongoose.model("application",appnSchema);