import React from "react"

function Movie_item(props){
  // console.log(props);

  let poster_path_base = "http://image.tmdb.org/t/p/w185";

  let poster = <br />;
  let description = <br />;

  if(props.props.movie !== undefined){
	  poster = <img src={poster_path_base + props.props.movie.poster_path} alt="No Poster Available" />;
	  description = props.props.movie.overview;
  }
  return (
    <div className= "movie_item">
      <h3> {props.props.movie !== undefined ? props.props.movie.title : "Roll the Dice!"} </h3>
	  <div>
	  	{poster}
	  </div>
	  <div id="description">
	  	{description}
	  </div>
    </div>
  );
}

export default Movie_item;
