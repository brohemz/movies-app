import React from "react";

class Filter extends React.Component {

// Year filter for now
  constructor(props){
    super(props)
    this.state = {
      year: 2010,
      genres: this.props.props.genres,
	    hidden: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.flipVisibility = this.flipVisibility.bind(this);
}

  handleChange(event){
    // this.setState({year: event.target.value}, () => this.props.props.filter(this.state));
	this.setState({year: parseInt(event.target.value), genre: "comedy", hidden: this.state.hidden});
  console.log(event.target);
  }

  handleSubmit(event){
    // alert("Year Changed: " + this.state.year);
    event.preventDefault();
	  this.props.props.filter(this.state);
	  this.flipVisibility();
  }

  flipVisibility(){
	  this.setState(prev => ({year: prev.year, hidden: !prev.hidden}));
  }

  render(){
	var button_filter = <button onClick={this.flipVisibility} className="button button-primary"> Filter </button>

    if(!this.state.hidden){
		return (
	      <div>
		  	{button_filter}
	        <p>
	          Year: {this.state.year}
	        </p>
	        <form onSubmit={this.handleSubmit} className="filter-form">
				<label>
					<input name="year" type="radio" onChange={this.handleChange} value="1970"/> 1970s
				</label>
				<label>
					<input name="year" type="radio" onChange={this.handleChange} value="1980"/> 1980s
				</label>
				<label>
					<input name="year" type="radio" onChange={this.handleChange} value="1990"/> 1990s
				</label>
				<label>
					<input name="year" type="radio" onChange={this.handleChange} value="2000"/> 2000s
				</label>
				<label>
					<input name="year" type="radio" onChange={this.handleChange} value="2010"/> 2010s
				</label>
				<br />
			  <input type="submit" value="Update"/>
	        </form>
	      </div>
	    );
	}else{
		return button_filter;
	}
  }
}

export default Filter
