import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './Navbar' 
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e)
   {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:5000/user/login', newUser)
    .then(res => {
        if (res.data.status === "1") 
        {        console.log(res.data);
            localStorage.setItem("email",newUser.email);
            if(res.data.user.usr_type === "applicant")
              this.props.history.push("/applicant/home");
            else if (res.data.user.usr_type === "recruiter")
              this.props.history.push("/recruiter/home");   
            else 
            alert("Error in fetching user data");
        }
        else{ 
            
            alert(res.data.msg)
        }            
    });


    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      
      <div>
        <Navbar />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" value="LOGIN" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
