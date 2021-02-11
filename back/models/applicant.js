const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eduSchema = new Schema({
      name:String,
      startYear: { type:Date },
      endYear : {type:Date}
})

const applSchema = new Schema ({
    name: String,
    email:{ type: String, required:true},
    education:[eduSchema],
    skills:[ {type:String} ],
    rating : {type:mongoose.Types.Decimal128,min:0,max:5}
})



module.exports = applicant = mongoose.model("applicant",applSchema);






/*
class App extends React.Component {
    state = { values: [{ value: null }] };
  
    createUI() {
      return this.state.values.map((el, i) => (
        <div key={i}>
          <input
            type="text"
            value={el.value || ""}
            onChange={this.handleChange.bind(this, i)}
          />
          <input
            type="button"
            value="remove"
            onClick={this.removeClick.bind(this, i)}
          />
        </div>
      ));
    }
  
    handleChange(i, event) {
      let values = [...this.state.values];
      values[i].value = event.target.value;
      this.setState({ values });
    }
  
    addClick() {
      this.setState(prevState => ({
        values: [...prevState.values, { value: null }]
      }));
    }
  
    removeClick(i) {
      let values = [...this.state.values];
      values.splice(i, 1);
      this.setState({ values });
    }
  
    handleSubmit(event) {
      alert("A name was submitted: " + this.state.values.join(", "));
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.state.values.map((el, i) => (
            <div key={i}>
              <input
                type="text"
                value={el.value || ""}
                onChange={e => this.handleChange(i, e)}
              />
              <input
                type="button"
                value="remove"
                onClick={() => this.removeClick(i)}
              />
            </div>
          ))}
  
          <input type="button" value="add more" onClick={() => this.addClick()} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
  */