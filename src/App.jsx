import { useState, useEffect } from 'react'
import './App.css'
const apiKey = import.meta.env.VITE_API_KEY

// Import our components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

function App() {
  // State to hold movie data fetched from the OMDB API:
  const [movie, setMovie] = useState(null);
  
  // Function to actually get movies from OMDB using a search term:
  const getMovie = async(searchTerm) => {
    // Make fetch request and store the response
    try{
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      // Parse JSON response into a JavaScript object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data);
    }catch(e) {
      console.error(e)
    }
  };

// Awesome, now our app is working! It would be nice if a movie showed up right away, though.
// The problem is, we can't just make a call to getMovie in the body of the App component because it would:
//  -Make the fetch call, update the state, re-render the component, invoke getMovie AGAIN, and thereby create an infinite loop.
//Is there a way to have something happen when a component loads without repeating on every render? useEffect!
//The React useEffect hook allows us to create things that only happen at certain times.
//useEffect(() => {}, []); First argument is a function, second is an array.
//On each render of the component, the items in the array are compared to their value on the previous render, and if they are a different value the function will run again.
//This gives you a way to create logic in a component that doesn't run on every render.

  // This will run on the first render but not on subsquent renders (because of the empty dependencies list)
  useEffect(() => {
    getMovie("Hackers");
  }, [
    // empty list of dependencies here means this runs only once!
  ]);

  return(
    <div className='App'>
      {/* We pass the getMovie **function** as a prop called moviesearch - note, its not the movie data its the function itself, the function sets the state in root.
      This allows Form to trigger this function and fetch movies when needed.*/}
      <Form moviesearch={getMovie}/>
      <MovieDisplay movie={movie} />
    </div>
  );
}

export default App


