import {useState, useEffect} from "react";


//In const Form we are accessing all props. Not *just* the getMovie function, which, so far, is the only thing we've actually passed as props
// We are passing down the getMovie function to Form, which allows us to pass the search term


const Form = (props) => {

  // State to hold the data of our form
  const [formData, setFormData] = useState({searchterm: "",});
  //We initialize formData and its content: formData starts with only an index of searchterm with a value set to "".

  // ---Handler function for changes in the form's input field. Takes an event as argument.---
  const handleChange = (event) => {
    // We update formData's state to reflect changes in the input field.
    // The spread operator (...) is used to ensure all other hypothetical formData values are retained (though not applicable right now it's a best practice)
    //This way we are only targeting the key name [event.target.name] and its value event.target.value dynamically
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  // ---Handler function for form submission:---
  const handleSubmit = (event) => {
    // Prevent page from refreshing on form submission
    event.preventDefault();
    // This calls the 'moviesearch' function passed down as part of props (props.moviesearch)
    // With the search term from formData being passed in as the argument
    //Note: The search term is extracted from the 'formData' state, where it's stored under the key 'searchterm' (more on this within the actual form below)

    props.moviesearch(formData.searchterm);
  };

  //The app will update the state as we type, but doesn't make the api call until we submit.
  //Because our form onSubmit calls handleSubmit. This prevents normal form behavior and then performs the moviesearch function

  // We also have an onChange tied to the form input field as well. When there's any change (us typing) then handleChange is called.
  // handleChange sets the state of formData using our [event.target.name] as a key (which in this case is searchterm, as expected)
  // and sets the value to our event.target.value {formData.searchterm}




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          // This sets the displayed value of the input field to the 'searchterm' state, ensuring the UI is in sync with the data.
          // This might seem strange considering we are literally setting the state to what we type. So why manually set the display to the state?
          // You might wonder why we would want a simple movie search phrase to persist but imagine this form were actually a job application
          // Setting the form value here as equal to the state ensures that once we have typed something here it persists so it is held in state
          value={formData.searchterm}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Form
