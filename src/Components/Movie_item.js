import React from "react"

function genreMatch(genre_id_list, genre_list){
  for(const [key, val] of Object.entries(genre_list)){
    // if(genre_id_list.find(val) !== undefined){
    //   return key;
    // }
  }
  return false;
}


function Movie_item(props){
  // console.log(props);

  let poster_path_base = "http://image.tmdb.org/t/p/w185";

  let poster = <br />;
  let description = <br />;
  let genre = false;

  if(props.props.movie !== undefined){
	  poster = <img src={poster_path_base + props.props.movie.poster_path} alt="No Poster Available" />;
	  description = <div> <h4> Description </h4> {props.props.movie.overview} </div>;
    genre = genreMatch(props.props.movie.genre_ids, props.props.genres);
  }


  return (
    <div className= "movie_item">
      <h3> {props.props.movie !== undefined ? props.props.movie.title + ` (${props.props.movie.release_date}) ` : "Roll the Dice!"} </h3>
      <h4> {genre !== false ? `[$genre]` : ""} </h4>
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
