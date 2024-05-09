import React from 'react'

//We pass the moviedata as props from App.js:
const MovieDisplay = ({movie}) => {
  // We need to create a function called loaded which returns a div of our movie data info being displayed
  const loaded = () => {
    return (
      <>
        <h1>{movie.Title}</h1>
        <h2>{movie.Genre}</h2>
        <img src={movie.Poster} alt={movie.Title} />
        <h2>{movie.Year}</h2>
      </>
    );
  };

  // Function to return loading JSX
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  // Ternary operator will determine which functions JSX we will return - if movie exists then loaded, if not then loading:
  return movie ? loaded() : loading();
}

export default MovieDisplay
