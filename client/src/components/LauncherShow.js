import React,{useState, useEffect} from "react"

const LauncherShow = props =>{
//state must have a default value! don't leave it blank or your app will error!
const [launcher, setLauncher]=useState({})
//finding the number used in the page for example localhost:300/launchers/4
 const launcherId  = props.match.params.id
// debugger
//use the above debugger to see props in the browser console. 
// it has access to a a lot of props because it is being rendered by a router; not its parent.

//fetching for an individual launcher using 
  const getLauncher = async ()=>{
    //typical try catch block. when you type out try let it autocomplete trycatch and it will block it for you!
    try {
      //have to string interpolate the path in order to use the above variable that corresponds to the launcher ID
      //use backticks! and make sure you use await
      //there is a dynamic router set up for this path. Also make sure you add the dynamic path in client router and in our app browser router.

      const response = await fetch(`/api/v1/launchers/${launcherId}`)
      //typical error handling
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error= new Error(errorMessage)
        throw(error)
      }
      //this will get back an object with the key of launcher by parsing the raw data
      const launcherData = await response.json()
      //put a debugger here to see it in console by calling the launcherData variable
      //putting the launcher into state, have to index in to get the necessary data
      setLauncher(launcherData.launcher)
      //typical error msg relay.
    } catch (error) {
      console.error(`There was an error in fetch! ${error}`);
    }
  }
// this is so you can render the page first and then this will load. basically tells react load this slightly after. 
//put a debugger inside and watch your webpage load to see this in action.
  useEffect(()=>{
    //calls the get launcher fetch. it is in here so react tries to invoke this function slightly after page loading.
    // can run into some errors if you invoke this function outside of the usEffect
    getLauncher()
    //make sure you have the second argument of [] so you dont get some odd loops, errors, etc.
    //tells react to only do this once, until their is a hard refresh. 
  },[])

//displaying info based on the state.
  return(
    <div>
      <h1>Featured Launcher</h1>
      <h2>{launcher.name}</h2>
      <p>{launcher.bio}</p>
    </div>
  )
}

export default LauncherShow