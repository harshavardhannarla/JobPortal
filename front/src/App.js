import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

/* import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Profile from './components/Users/Profile'*/

import Register from './components/Register'
import Login from './components/Login'

import recform from './components/recform'
import appform from './components/appform'
import apphome from './components/applicant/home'
import rechome from './components/recruiter/home'
import Home from './components/Home'
function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path = "/recform" component ={recform} / >
        <Route path = "/appform" component = {appform} />
        <Route path = "/applicant/home" component = {apphome} />
        <Route path = "/recruiter/home" component ={rechome} />
        
      </div>
    </Router>
  );
}

export default App;
