import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import cj from "./cj";
import profile from "./profile";
import active from "./active";
import viewjob from "./viewjob";
import mainhome from "../Home";

/*<Route path="/applicant/dashboard" exact component={dashboard} />*/

export default class home extends Component {
    render() {
        return (
            <div>
            <Router>
             <div className="HomePage">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="navbar-item">
                                        <Link to="/recruiter/profile" className="nav-link">My profile</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/recruiter/cj" className="nav-link">Create Job</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/recruiter/active" className="nav-link">Active</Link>
                                    </li>
                                    <li className="navbar-item">
                                    <a className = "navbar-item" href="/" >Logout </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <br />
                        <Route path="/recruiter/profile" exact component={profile} />
                        <Route path="/recruiter/cj" exact component={cj} />         
                        <Route path="/recruiter/active" exact component={active} /> 
                        <Route path="/recruiter/viewjob" exact component ={viewjob} />  
                        <Route path="/" exact component ={mainhome} />  
                              

             </div>
            </Router>    
            </div>
        )
    }
}







