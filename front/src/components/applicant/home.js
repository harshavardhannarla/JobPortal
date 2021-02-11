import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import profile from "./profile";
import dashboard from './dashboard';
import myhome from "../Home";
import myapp from"./myapp";

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
                                        <Link to="/applicant/profile" className="nav-link">My profile</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/applicant/dashboard" className="nav-link">Dash Board</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/applicant/myapplications" className="nav-link">My Applications</Link>
                                    </li>
                                    <li className="navbar-item">
                                    <a href="/" >Logout </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <br />
                        <Route path="/applicant/profile" exact component={profile} />
                        <Route path="/applicant/dashboard" exact component={dashboard} />
                        <Route path="/applicant/myapplications" exact component={myapp} />
                        <Route path="/" exact component={myhome} />
                        
             </div>
            </Router>    
            </div>
        )
    }
}







