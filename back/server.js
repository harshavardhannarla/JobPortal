const express  =require("express");
const mongoose  =require("mongoose");
const bodyParser  =require("body-parser");
const cors = require("cors");
const keys = require("./keys");

const userRouter= require("./routes/user");
const jobRouter = require("./routes/job");
const appliRouter = require("./routes/applicants");
const recRouter = require("./routes/recruiter");
const applicationRouter =require("./routes/application");

const app = express();
app.use(cors());
app.use(express.json());
const db = require("./keys").mongouri;

function hello() { return "Hello" };
const str = hello();
console.log(str);

mongoose
     .connect(db,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology:true})
    .then( () => console.log("Connected to mongodb"))
    .catch( err => console.log(err));

const port = process.env.PORT || 5000;


app.use("/job",jobRouter);
app.use("/applicant",appliRouter);
app.use("/recruiter",recRouter);
app.use("/user",userRouter);
app.use("/application",applicationRouter);
app.listen(port, ()=>console.log("Server started on port" ,port));


