import React from "react";

class Filter extends React.Component {

// Year filter for now
  constructor(props){
    super(props)
    this.state = {
      year: 2010,
      genre_list: this.props.props.genres,
      genre: {id: 0, name: "None"},
	    hidden: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	  this.flipVisibility = this.flipVisibility.bind(this);
    this.getGenreID = this.getGenreID.bind(this);
}

  getGenreID(genre){
    return {id: this.state.genre_list[genre], name: genre};
  }

  handleChange(event){

    let persist_event = event.target;

    this.setState(prevState => {
      let newState = prevState;
      if(persist_event.name === "year"){
        newState.year = parseInt(persist_event.value);
      }else if(persist_event.name === "genre"){
        newState.genre = this.getGenreID(persist_event.value);
      }
      return newState
    })

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
					<input name="year" type="radio" onChange={this.handleChange} value="2010" checked={this.state.year === 2010 ? "checked" : ""}/> 2010s
				</label>
				<br />
        <p>
          {this.state.genre.name !== "None"? `Genre: ${this.state.genre.name}` : "No Genre Selected"}
        </p>
        <label>
          <input type="button" name="genre" onClick={this.handleChange} value="Action" />
        </label>
        <label>
          <input type="button" name="genre" onClick={this.handleChange} value="Comedy" />
        </label>
        <label>
          <input type="button" name="genre" onClick={this.handleChange} value="Romance" />
        </label>
        <br />
			    <input type="submit" value="✓"/>
	        </form>
	      </div>
	    );
	}else{
		return button_filter;
	}
  }
}

export default Filter
