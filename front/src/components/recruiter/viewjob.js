import axios from 'axios';
import React, { Component } from 'react'

export default class viewjob extends Component {
    constructor(props)
    {  super(props);
        this.state={
            data:[],
            curJob:[],
            flag:false,
           
        }
      

        this.currJobdetails= this.currJobdetails.bind(this);
        this.acceptJob = this.acceptJob.bind(this);
        this.shortlistJob = this.shortlistJob.bind(this);
        this.rejectJob = this.rejectJob.bind(this);
    }
    componentDidMount()
    {   const p ={
        _id:localStorage.getItem("curJobid"),
        }
        axios.post("http://localhost:5000/job/getjobbyid",p)
             .then(res =>
                { this.setState({curJob:res.data.job,flag:true});
                  

                })
              .catch(err => console.log(err));

        axios.post("http://localhost:5000/application/getspl",p)
                .then(res => {
                   
                    if(res.data.status === "1")
                   {  console.log(res.data.op);
                       this.setState({
                        data:res.data.op,
                    }) }
                    else
                    alert("Error in fetching applications",res.data.msg);

                })
                .catch(err => console.log(err));

    }
    currJobdetails = e =>{
            
        if(typeof this.state.curJob === "undefined")
        return<p>Haleluya</p>
        else
        return <div> 
                 <h3>Current job Details</h3>
                <h4>Title:{this.state.curJob['title']}</h4>
                <h4>Max number of pos:{this.state.curJob['max_no_pos']}</h4>
                <h4>Max number of applications:{this.state.curJob['max_no_appls']}</h4>
                <h4>Salary:{this.state.curJob['salary']}</h4>
                <br></br>
                </div>
      
       
        };
    shortlistJob = a =>{
        const p ={
            id:a.applnid,
            edit:"shortlisted",
        } 
        axios.post("http://localhost:5000/application/edit",p)
                .then(res=>{
                    if(res.data.status === "1")
                    {console.log("shortlisted succesfully");}
                    else
                    alert("Error in updation",res.data.msg);

                });
    };
    acceptJob =a =>
    {   const p ={
        id:a.applnid,
        edit:"accepted",
          } 
    axios.post("http://localhost:5000/application/edit",p)
            .then(res=>{
                if(res.data.status === "1")
                {console.log("accepted succesfully")}
                else
                alert("Error in updation",res.data.msg);

            });

    };
    rejectJob =a =>
    {const p ={
        id:a.applnid,
        edit:"rejected",
    } 
    axios.post("http://localhost:5000/application/edit",p)
            .then(res=>{
                if(res.data.status === "1")
                {console.log("rejected succesfully");}
                else
                alert("Error in updation",res.data.msg);

            });

    };
    fn1 = (a,app) =>{
        if(a==="applied")
        return <button className="btn btn-outline-primary" onClick={this.shortlistJob(app)}>Shortlist</button>
        else if(a==="shortlisted")
        return <button className="btn btn-outline-secondary" onClick={this.acceptJob(app)}>Accept</button>
        else if(a==="rejected")
        return <button className="btn-block" disabled>Rejected</button>
    }
    fn2 =(a,app) =>
    {   if(a==="rejected")
        return <button className="btn-block" disabled>Rejected</button>
        else 
        return <button className="btn-danger" onClick ={ this.rejectJob(app)}>Reject</button>

    }
    render() {
        const contents = this.state.data.map((appl,i)=>{
          if(this.state.flag)
            return<tr id={i}>
                <td>{appl.name}</td>
                <td>{appl.skills}</td>
                <td>{appl.education}</td>
                <td>{appl.sop}</td>
                <td>{this.fn1(appl.state,appl)}</td>
                <td>{this.fn2(appl.state,appl)}</td>
            </tr>
        });
        

        return (
            <div>
                <div >
                {console.log("camehere",this.state.curJob)}
                    {this.currJobdetails()}
                </div>
                <table className="table  table-striped" >
                    <tbody>
                        <tr>
                            <th> Name</th>
                            <th> Skills</th>
                            <th>Education</th>
                            <th>Sop</th>
                            <th>Options</th>
                        </tr>
                           {contents}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
