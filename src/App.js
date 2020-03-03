import React from 'react';
import './App.scss';
import Header from './Components/Header.js'
import Footer from './Components/Footer.js'
import Movie_item from './Components/Movie_item.js'
import Filter from './Components/Filter.js'
const axios = require('axios')



class App extends React.Component {

  constructor(){

    super();
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.filter = this.filter.bind(this);
	  this.random_movie = this.random_movie.bind(this);
    this.get_movies = this.get_movies.bind(this);
    this.get_genres = this.get_genres.bind(this);
  }

  handleChange(res){
    this.setState(() => {
      return res
    });
  }

  handleUpdate(res){
    this.setState((prevState) => {
      return Object.assign({}, prevState, res);
    });
  }

  componentDidMount(){
    this.get_movies().then(res => this.handleChange({movies: res}));
  }

  get_genres(){
    const genre_list =
      {
        "Action" : 28,
        "Comedy" : 35,
        "Romance" : 10749
      }

    return genre_list;
  }

  get_movies(props){
    const api_url = "https://api.themoviedb.org/3/discover/movie?language=en-US?sort_by=popularity.desc";

    let parameters = {
      api_key : 'f3c134e0862454196cdaab3f54ba99fc',
    }

    if(props !== undefined){
  		const filters_to_add = Object.entries(props);
      // const filters_to_add = Object.entries({ 'genre' : '10749', 'primary_release_date.lte': '1990-01-01', 'primary_release_date.gte':'1980-02-01'})
  		filters_to_add.forEach((obj) => {
        parameters[obj[0]] = obj[1].toString();
  		});
    }

    console.log(parameters)

	const ax = [];

  // Fix: Page Limit Needed
	for(let page = 1; page <= 5; page += 1){
		ax.push(axios.get(api_url + "&page="+page, {
		      params: parameters
		    }).then(res => {
		      return res;
		  })
    );

	  }


    // let ax = axios.get(api_url, {
    //   params : parameters
    // }).then(res => {
	// 	console.log(res);
    //   return res.data.results;
    // });

	return axios.all(ax).then(axios.spread(function(list1, list2, list3, list4, list5){
		let movie_list = list1.data.results;
		movie_list = movie_list.concat(list2.data.results, list3.data.results, list4.data.results, list5.data.results);
		return movie_list;

	}));

  }

  // filter(props){
  //
  //   this.setState((prevState) => {
  //     let state = {};
  //     state['primary_release_date.gte'] = props.year;
	//   state['primary_release_date.lte'] = props.year < 2010 ? (props.year + 10) : 2019;
	//   state['movies'] = this.get_movies(state).then(data => {console.log(data[0]); return data});
	//   state['promise-resolved'] = true;
  //     return (
  //       state
  //     )
  //   }, () => console.log(this.state));
  // }

  filter(props){

  	let state = {};
  	// Filters
  	state['primary_release_date.gte'] = `${props.year}-01-01`;
    state['primary_release_date.lte'] = `${props.year < 2010 ? (props.year + 9) : 2019}-12-31`;

    if(props.genre.id !== 0){
      state['genre'] = props.genre.id;
    }



  	this.get_movies(state).then(data => {
  		this.setState(() => {
  			console.log(data);
  			state['movies'] = data;
  			state['promise-resolved'] = true;
  			console.log(state)
  			return state;
  		})
  	});
  }

  random_movie(){

	  let rand = Math.floor(Math.random() * (99));
	  if(this.state['movies'] !== undefined){
		  let movieList = this.state.movies;
		  return movieList[rand];
	  }
  }





  render(){

    let movieList = <h1> Cannot connect to database! </h1>;
    if(this.state['movies'] !== undefined){
        movieList = this.state['movies'].map(movie => < Movie_item key={movie.title} movie={movie} handleChange={this.handleChange} />);
	  }

    return (
      <div className="App">
  		< Header />
		<div className="flex-container">
			<div className="flex-item flex-item-filter">
				< Filter props={{filter: this.filter, genres: this.get_genres()}} />
			</div>
			<div className="flex-item">
			  <button onClick={() => this.handleUpdate({random_movie_item: this.random_movie()})} className="button button-primary"> Roll </button>
			  <Movie_item props={{movie: this.state.random_movie_item, genres: this.get_genres()}} />
			</div>
		</div>

		< Footer />
      </div>
    );
  }
}

export default App;
