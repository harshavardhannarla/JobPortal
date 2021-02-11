import React, {Component} from 'react';
import axios from 'axios';



import Navbar from './Navbar' 
export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usr_type:'',
            final_usr_type:''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsr_type = this.onChangeUsr_type.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeUsr_type(event) {
        this.setState({ usr_type: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password : this.state.password,
            usr_type:this.state.usr_type
        }

        axios.post('http://localhost:5000/user/register', newUser)
             .then(res => {
                
                if(res.data.status === "0") 
                alert("Email id already exists");
                else if (res.data.status === "1")
            {    alert("User has been created successfully");
                console.log(res.data.newuser.usr_type );
                localStorage.setItem("email",newUser.email);     
            if(res.data.newuser.usr_type === "recruiter")
                {  
                    this.props.history.push("/recform");
                }
            else
                {
                    this.props.history.push("/appform");
                }
                 
            }
            else
            alert(res.data.msg);

            });

        this.setState({
            email:'',
            password:'',
            usr_type:''
        });
    }

render() {

        return (
               <div>
                <Navbar />
            
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required
                               />  
                    </div>
                    <div className="form-group">
                        <label>User-Type: </label>
                       <select id="type" onChange={this.onChangeUsr_type} value={this.state.usr_type}>
                        <option value="select">Select</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="applicant">Applicant</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>

                </form>
         
            </div>
        )
    }
}















