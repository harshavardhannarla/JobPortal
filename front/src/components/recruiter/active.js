import axios from 'axios';
import React, { Component } from 'react'

export default class active extends Component {
   constructor(props){
       super(props);
       this.state ={
           jobs:[]
       }
    this.onChangeSp= this.onChangeSp.bind(this);
    this.editjob = this.editjob.bind(this);

    this.deletejob = this.deletejob.bind(this);
    this.fetchjobs = this.fetchjobs.bind(this);
}
   fetchjobs()
   {    const det ={
    email:localStorage.getItem("email")
     }    
       axios.post("http://localhost:5000/job/getjob",det)
             .then( res =>
              {  if(res.data.status === "1")
           {this.setState({jobs:res.data.jobs});
           }
           else
           alert("couldnot fetch your jobs",res.data.msg);

             })
   .catch(err => 
       { console.log("ekkadad paaye",err);

       })
       
   }
   componentDidMount()
   {   this.fetchjobs();
   
   }
   editjob = j =>
   {   const newjob ={
       _id:j._id,
       max_no_pos :j.max_no_pos,
       max_no_appls:j.max_no_appls,
   }
   axios.post("http://localhost:5000/job/update",newjob)
        .then(res =>{
           if(res.data.status === "0")
           alert("Error in updating");
           else
           alert("Updated succesfully");
        })
   }
   
   viewjob = j =>
   {  localStorage.setItem("curJobid",j._id);
       this.props.history.push("/recruiter/viewjob");
   }
   deletejob = j =>
   {   console.log("here delete job");
        const da ={_id:j._id};
        axios.post("http://localhost:5000/job/deletejob",da)
            .then( res => 
                {  if(res.data.status==="0")
                    alert("Error in deleting",res.data.msg);
                    else
                    this.fetchjobs();    
                })
            .catch(err=>{
                alert(err);
            })
            
   }
   onChangeSp = (i,event) =>
   {  let jobs = [...this.state.jobs];
     jobs[i][event.target.name] =  event.target.value;
      this.setState({jobs});
   }
    render() {
        const contents = this.state.jobs.map((j,i) =>{
             function fn(date){
                var dat= new Date(date);
                return dat.toISOString().split("Z")[0] 
            }
           return<tr key ={i}>
                   <td>{j.title}</td>
                   <td>{j.date_of_pos}</td>
                   <td> 
                           <input type="number" 
                            className="form-control"
                            name = "max_no_pos" 
                            value={j.max_no_pos}
                            onChange={e => this.onChangeSp(i,e)}
                            required
                            />
                   </td>

                   <td><input type="number"
                            name = "max_no_appls" 
                            className="form-control" 
                            value={j.max_no_appls}
                            onChange={e => this.onChangeSp(i,e)}
                            required
                            />
                    </td>
                   <td>  
                    <input type="datetime-local"
                            name="deadline" 
                            className="form-control" 
                            value={fn(j.deadline)}
                            onChange={e => this.onChangeSp(i,e)}
                            required
                            />
                    </td> 
                    <td> <button className="btn btn-primary btn-sm" onClick ={()=>this.editjob(j)}>Save Changes</button></td>
                    <td> <button className="btn btn-danger btn-sm" onClick ={() =>this.deletejob(j)}>Delete</button></td>
                    <td><button className="btn btn-secondary btn-sm" onClick={() => this.viewjob(j)}>More details</button></td>
               </tr>
          
        });

        return (
            <div className="container">
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Date of posting</th>
                            <th>No of pos</th>
                            <th>Max no of appls</th>
                            <th>Deadline</th>
                        </tr>
                        {contents}
                    </tbody>
                </table>
            
                
            </div>
        )
    }
}
