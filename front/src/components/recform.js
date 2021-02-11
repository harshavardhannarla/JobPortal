import axios from 'axios';
import React, { Component } from 'react'

export default class recform extends Component {
   constructor(props){
    super(props);
    this.state ={
        name : "",
        email:localStorage.getItem("email"),
        cont_num:"",
        bio:""
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCont_num = this.onChangeCont_num.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);
   }
   onChangeName(event)
   {  this.setState({name:event.target.value});
   }
   onChangeCont_num(event)
   {  this.setState({cont_num:event.target.value});
   
   }
   onChangeBio (event)
   {  this.setState({bio:event.target.value});    
   }

   onSubmit(e)
  {   e.preventDefault();
    
    const newrec ={
        name: this.state.name,
        email:this.state.email,
        cont_num: this.state.cont_num,
        bio:this.state.bio
    }
    axios.post('http://localhost:5000/recruiter/register',newrec)
        .then ( res => {
               if(res.data.status === "1")
               { alert("Registration is successfull");
                localStorage.clear();
               }
               else 
               {alert(res.data.msg);
            }
        }
        );

    this.setState ({
            name : "",
            email:"",
            cont_num:"",
            bio:""
        });

  }


   
    render() {
        
        return (
            <div>
                <p>Currently Logged in as : </p>
                <p>Email id: {this.state.email}</p>
                <p>Type of user: Recriuter</p>
                <form onSubmit = {this.onSubmit}>
                        <div className = "form-group">
                            <label>Name:</label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               required
                               />
                        </div>
                        <div className = "form-group">
                            <label>Contact number:</label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.cont_num}
                               onChange={this.onChangeCont_num}
                               required
                               />
                        </div>
                        <div className = "form-group">
                            <label>Bio:</label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangeBio}
                               required
                               />
                        </div>
                        <input type="submit" value="register" className="btn btn-primary"/>
        
                </form>

                
            </div>
        )
    }
}
