import axios from 'axios';
import React, { Component } from 'react'

export default class recform extends Component {
   constructor(props){
    super(props);
    this.state ={
        title:"",
        name : localStorage.getItem("name"),
        email:localStorage.getItem("email"),
        max_no_appls:"",
        max_no_pos:"",
        date_of_pos:"",
        deadline:"",
        skillset:"",
        type_of_job:"",
        duration:"",
        salary:"",
        rating:""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   }
   
   onChange = e => {
    e.persist();
    this.setState({
      [e.target.name]: e.target.value
    });
   }

   onSubmit(e)
  {   e.preventDefault();
    
    const newjob = this.state;
    axios.post('http://localhost:5000/job/create',newjob)
        .then ( res => {
               if(res.data.status === "1")
               { alert("Job created succesfully");
                 this.props.history.push("/recruiter/home/")
               }
               else 
               {alert("Error in creating job",res.data.msg);
            }
        }
        );


  }


   
    render() {
        
        return (
            <div>
                <p>Email id: {localStorage.getItem("email")}</p>
                <p>Name of recruiter:{localStorage.getItem("name")} </p>
                <form onSubmit = {this.onSubmit}>
                        <div className = "form-group">
                            <label for="title">Title:</label>
                            <input type="text" 
                               name ="title"
                               id ="title"
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChange}
                               required
                               />
                            <label for ="max_no_appls">Max no applicant: </label>
                            <input type="number" 
                               name = "max_no_appls"
                               id = "max_no_appls"
                               className="form-control" 
                               value={this.state.max_no_appls}
                               onChange={this.onChange}
                               required
                               />
                            <label for="max_no_pos">Max no positions: </label>
                            <input type="number"
                               name="max_no_pos"
                               id="max_no_pos"  
                               className="form-control" 
                               value={this.state.max_no_pos}
                               onChange={this.onChange}
                               required
                               />
                            <label for="date_of_pos">Date of posting: </label>
                            <input type="date"
                               name="date_of_pos"
                               id="date_of_pos"  
                               className="form-control" 
                               value={this.state.date_of_pos}
                               onChange={this.onChange}
                               required
                            />
                            <label for ="deadline">Dead Line: </label>
                            <input type="datetime-local"
                               name="deadline"  
                               id="deadline"
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChange}
                               required
                               />
                             <label for="skillset">Skills : </label>
                            <input type="text"
                               name="skillset"
                               id="skillset"  
                               className="form-control" 
                               value={this.state.skillset}
                               onChange={this.onChange}
                               required
                               multiple
                               />
                            <label for="type_of_job" >Type of job: </label>
                                <select name="type_of_job"
                                        id="type_of_job"
                                       className="form-control"
                               onChange={this.onChange}
                               
                               required
                               >
                                <option value="ft">Full Time</option>
                                <option value="pt">Part Time</option>
                                <option value="wfh">Work from Home</option>
                              
                               </select>
                            
                           <label for="duration">Duration: </label>
                           <input type="number"
                               name="duration" id="duration"  
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChange}
                               min="0"
                               max="6"
                               required
                               />
                            <label for ="salary">Salary </label>
                            <input type="number"
                                name="salary" id="salary"  
                                  className="form-control" 
                                  value={this.state.salary}
                                  onChange={this.onChange}
                                  required
                                  />
                            <label for="rating">Rating: </label>
                                <input type="number"
                                     name="rating" id="rating"  
                                     className="form-control" 
                                     value={this.state.rating}
                                     onChange={this.onChange}
                                     required
                                />

                        </div>
                         
                        <input type="submit" value="Create" className="btn btn-primary"/>
        
                </form>

                
            </div>
        )
    }
}
