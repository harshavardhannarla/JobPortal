import axios from 'axios';
import React, { Component } from 'react'

import "bootstrap/dist/css/bootstrap.min.css"

export default class myapp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           data: [],
        }
        

    }
    componentDidMount()
    {  const p ={
        email:localStorage.getItem("email")
    }
    axios.post("http://localhost:5000/application/myapp",p)
        .then( res =>{
            if (res.data.status==="1")
            this.setState({data:res.data.ans});
            else 
            alert("Error in fetching applications",res.data.msg);
        })
        .catch(err => console.log(err));

    }
    render() {
        const contents = this.state.data.map((item,i)=>{
            
            return<tr id={i}>
                <td>{item.title}</td>
                <td>{item.date_of_pos}</td>
                <td>{item.salary}</td>
                <td>{item.name}</td>
            </tr>
        });
        
        return (
            <div>
                <table className = "table table-stripped">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Date of joining</th>
                            <th>Salary per month</th>
                            <th>Name of recruiter</th>
                        </tr>
                        {contents}
                    </tbody>
                </table>
                
            </div>
        )
    }
}
