import React, { useState, useEffect } from 'react'
import {Link, Route} from "react-router-dom"

//don't forget to import all the functionalities that react gives us. also know as libraries.

const LauncherList = props => {
  // needs state in order to keep track of the launcher we got from our fetch
  const [launchers, setLaunchers] = useState([])

  //that fetch I was talking about earlier
  const getLaunchers = async () =>{
    //try catch block to find errors. type out try and let it autocomplete from the trycatch options. will build the block for you
    try {
      //make sure you have the right path. you can always visit it in the browser to see if you have the right one!
      const response = await fetch("/api/v1/launchers")
      //typical error handling
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      //getting the data from the JSON and parsing it into objects
      const launchersData = await response.json()
      // place debugger here to see this variables data
      // setting the data into our state so we can display it on the page.
      setLaunchers(launchersData.launchers)
      //typical error catching. displays error on front end.
    } catch (error) {
      console.error(`There was an error in fetch ${error}`);
    }
  }
// will run this slightly after the page loads. Don't want the func inside to run right when the page starts up. will cause errors. SO we put it in useEffect
  useEffect(() => {
    //invoke the fetch request above
    getLaunchers()
    // make sure you add the second arg so that this is'nt called over and over again.
  }, [])

  // make sure you import the link functionality of react.
  //dynamically linking to pages by using .map to extract each launchers ID, that happens to coincide with their specific show page URL
  //use curly brackets in line 43 since it is a JS feature in a JSX/react element.
  const launcherList = launchers.map(launcher => {
    return (
      <li key={launcher.id}>
      <Link to= {`launchers/${launcher.id}`} >
        {launcher.name}</Link>
        
      </li>
    )
  })
//displaying the list of launchers using the .map from above. 
  return (
    <div>
      <h1>Our Launchers</h1>
      <ul>{launcherList}</ul>
    </div>
  )
}

export default LauncherList
