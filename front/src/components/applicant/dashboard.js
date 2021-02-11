import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class dashboard extends Component {

    constructor(props) {
           super(props);
           this.state = {
              data: [],
              datacopy:[],
              searchQuery:"",
              sortSalary:true,
              sortDuration:true,
              sortRating:true
           }
        this.sortSalaryChange = this.sortSalaryChange.bind(this);
        this.sortDurationChange = this.sortDurationChange.bind(this);
        this.sortRatingChange = this.sortRatingChange.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.fn2 = this.fn2.bind(this);
        this.fetchjobs =this.fetchjobs.bind(this);
        this.renderArrow=this.renderArrow.bind(this);
    }

    fetchjobs()
    {axios.get("http://localhost:5000/job/")
    .then( res => { 
        if(res.data.status === "1")
        { 
          var arr = res.data.jobs;
        const t= localStorage.getItem("email");
   
       arr.forEach(e => {
       if(e.emails_appl.includes(t))
       e.sur="applied";
       else if(e.status === "full")
       e.sur="filled";
       else
       e.sur ="canapply";
        });
       this.setState({data:arr,datacopy:arr});


        }
        else
        alert("Couldnot fetch jobs",res.data.msg);
        
    });
   }
         
    componentDidMount() {
        this.fetchjobs();
    

        }
    renderArrow(a){
            if(this.state[a]){
                return(
                    <ArrowDownwardIcon/>
                )
            }
            else{
                return(
                    <ArrowUpwardIcon/>
                )            
            }
        }
    sortSalaryChange()
    {   var arr = this.state.data;
        var flag = this.state.sortSalary;
        arr.sort(function(a,b){
            if(a.salary !==undefined && b.salary !== undefined)
            return (1-flag*2)*(a.salary-b.salary);
            else
            return 1;
        }
        );
        this.setState({
            data:arr,
            sortSalary:!flag
        })

    }
    sortDurationChange()
    {   var arr = this.state.data;
        var flag = this.state.sortDuration;
        arr.sort(function(a,b){
            if(a.duration !==undefined && b.duration !== undefined)
            return (1-flag*2)*(a.duration-b.duration);
            else
            return 1;
        }
        );
        this.setState({
            data:arr,
            sortDuration:!flag
        })

    }
    sortRatingChange()
    {   var arr = this.state.data;
        var flag = this.state.sortRating;
        arr.sort(function(a,b){
            if(a.rating !==undefined && b.rating !==undefined)
            return (1-flag*2)*(a.rating-b.rating);
            else
            return 1;
        }
        );
        this.setState({
            data:arr,
            sortRating:!flag
        })

    }

    searchJob = eve =>
    {   const searchQuery = eve.target.value;
        this.setState(prevState => {
            const datacopy = prevState.data.filter(element => {
              return element.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
      
            return {
              searchQuery,
              datacopy
            };
        });

    }       
    applyJob = curjob =>
    {   const sop = prompt("Sop:") 
        const appln={
        jobid :curjob._id,
        email_appl:localStorage.getItem("email"),
        email_rec:curjob.email,
        sop:sop
         }
        axios.post("http://localhost:5000/application/create",appln)
              .then( res =>{
                    if(res.data.status === "1")
                     alert("Applied Succesfully");
                     else   
                     alert("Error in application",res.data.msg);
              }
              )
              .catch(err => {console.log(err)});

    

    }
    fn2 = (item) =>{
        var a= item.sur;
        if(a==="canapply")
       return <button className="btn btn-primary" value="apply" onClick={()=>{this.applyJob(item)}}>Apply</button>
        else if(a==="applied")
        return <button className="btn btn-success" disabled>Applied</button>
        else if(a==="filled")
        return <button className="btn btn-danger" disabled> Full</button> 
    }
    render() {
        const contents = this.state.datacopy.map(item => {
            function fn1(a) {
                if (a==="ft")
                return "Full time";
                else if(a==="pt")
                return "Part time"
                else
                return "Work from home"

                    };
            

             return <tr>
               <td>{item.title}</td> 
               <td>{item.name}</td>
             
               <td>{item.salary}</td>
               <td>{item.duration}</td>
               <td>{item.rating}</td>
               <td>{fn1(item.job_type)}</td>
               <td>{item.deadline}</td>
               <td className="del-cell">
                {this.fn2(item)}
                </td>
               
             </tr>
        });
        return (
           <div className="container">
            
             
                <div className="table table-striped">
                    <h1 className="title">Jobs listed</h1>
                    <div className="searchForm">
                <form>
                <input
            placeholder="Search for..."
            value={this.state.searchQuery}
            onChange={this.searchJob}
             />
                </form>
            </div>
                    <table class="table table-striped">
                    <tbody>
                     <tr>
                       <th>Title</th>
                       <th>Recruiter Name</th>
                   
                       <th><button onClick={this.sortSalaryChange}>{this.renderArrow("sortSalary")}</button>Salary</th>
                       <th><button onClick={this.sortDurationChange}>{this.renderArrow("sortDuration")}</button>Duration</th>
                       <th><button onClick={this.sortRatingChange}>{this.renderArrow("sortRating")}</button>Recruiter Rating</th>
                       <th>Type</th>
                       <th>Deadline</th>
                    
                     </tr>
                     
                       {contents}
                       </tbody>
                   </table>
                </div>
             </div>
        
         );
        } 

}
