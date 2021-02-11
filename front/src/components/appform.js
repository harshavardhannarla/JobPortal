import React, {Component} from 'react';
import axios from 'axios';

export default class appform extends Component{
    constructor(props){
        super(props);
        this.state ={
            name : "",
            email:"",
            education: [{name:"",startYear:"",endYear:""}],
            rating:"0.5"
        }
        this.onChangeName =this.onChangeName.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeStartYear=this.handleChangeStartYear.bind(this);
        this.handleChangeEndYear = this.handleChangeEndYear.bind(this); 
        this.addClick = this.addClick.bind(this);
         this.removeClick = this.removeClick.bind(this); 
         this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeName(i, event) {
        let education = [...this.state.education];
        education[i].name = event.target.value;
       this.setState({ education });
    }
    handleChangeStartYear(i, event) {
      let education = [...this.state.education];
      education[i].startYear = event.target.value;
     this.setState({ education });
    }
    handleChangeEndYear(i, event) {
      let education = [...this.state.education];
      education[i].endYear = event.target.value;
     this.setState({ education });
   }

    addClick() {
        this.setState(prevState => ({
          education: [...prevState.education, {  }]
        }));
    }
    removeClick(i) {
        let education = [...this.state.education];
        education.splice(i, 1);
        this.setState({ education });
    }
    onSubmit(e)
    {  e.preventDefault();
       
      const newappli ={
        name:this.state.name,
        email:localStorage.getItem("email"),
        education:this.state.education,
        rating:this.state.rating

      }
      axios.post('http://localhost:5000/applicant/register', newappli)
        .then(res => {
          
          if(res.data.status === "1") 
          {  alert("Registration is succesfull, please login");
             localStorage.clear();
             this.props.history.push("/");
          }
          else
          {alert(res.data.msg);
        
          }
        });
    
      this.setState ({
          name : "",
          email:"",
          education: [{name:"",startYear:"",endYear:""}],
          rating:"0.5"
      });

}

    
    render(){
        return (
        <div>
          <p>Currently Logged in as : </p>
          <p> Email id : {localStorage.getItem("email")}</p>
          <p>Type of user: Applicant</p>
          <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               required
                               />
                    </div>
                    
          <div className = "form-group">
          <label>Education Details:</label>     
          {this.state.education.map((el, i) => (
            <div key={i}>
              <label>Institute name: </label>
              <input
                type="text"
                value={el.name || ""}
                onChange={e => this.handleChangeName(i, e)}
                required
              />
              <label>Start Year: </label>
              <input
                type="text"
                value={el.startYear || ""}
                onChange={e => this.handleChangeStartYear(i, e)}
                required
              />
              <label>End Year: </label>
              <input
                type="text"
                value={el.endYear || ""}
                onChange={e => this.handleChangeEndYear(i, e)}
              />

              <input
                type="button"
                value="remove"
                onClick={() => this.removeClick(i)}
              />
            </div>
          ))}
        
          <input type="button" value="Add" onClick={() => this.addClick()} />
          </div>
          
          <input type="submit" value="register" className="btn btn-primary"/>
        
        </form>

            
            
        </div>
        )

    }

}
