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
    axios.post('http://localhost:5000/recruiter/update',newrec)
        .then ( res => {
               if(res.data.status === "1")
               { alert("Successfully Updated");
                 this.props.history.push("/recruiter/home");
                 localStorage.removeItem("name");
                 localStorage.setItem("name",newrec.name);   
            }
               else 
               {alert(res.data.msg);
            }
        }
        );


 }
 componentDidMount()
 {   const tmp={
     email:localStorage.getItem("email")
    } 
     axios.post("http://localhost:5000/recruiter/getrecruiter",tmp)
            .then(res =>{
                if(res.data.status==="1")
                {   const rec = res.data.recr;
                    console.log(rec);
                    this.setState({
                        name:rec.name,
                        email:localStorage.getItem("email"),
                        cont_num:rec.cont_num,
                        bio:rec.bio
                    });
                    localStorage.setItem("name",rec.name);
                }
                else 
                {alert("Error in fetching data",res.data.msg);}

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
                        <input type="submit" value="Save changes" className="btn btn-primary"/>
        
                </form>

                
            </div>
        )
    }
}
