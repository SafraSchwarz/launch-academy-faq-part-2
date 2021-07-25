import React, { useState, useEffect } from 'react'
import Question from './Question'
import { hot } from "react-hot-loader/root"
import AddFAQForm from "./AddFAQForm.js"

const FAQList = props => {
  //state NEEDS a default value to work properly. this will house our fetch data
  const [questions, setQuestions] = useState([])
  //will handle what question is selected
  const [selectedQuestion, setSelectedQuestion] = useState([])

  //async since it takes time
  const getQuestions = async()=>{
    //need a try catch block for errors to show exactly what is going on
    try {
      //this is the ENTIRE fetch request. need the correct path and await for the time it takes to fetch.
      const response = await fetch("/api/v1/questions")
      //just error handling. pretty standard stuff.
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        //will error out if anything goes wrong
        throw(error)
      }
      // parse/read the response for the data NEED AWAIT!!! this takes time.
      const questionsData = await response.json()
      //place debugger here to see the variable data
      // sets the state to the data parsed by questionsData it is an array of objects after this.
      setQuestions(questionsData.questions)
      //will catch any errors thrown 
    } catch (error) {
      // standard error msg to console. for a nice front end error msg. front end error msg.
      console.error(`Error in fetch ${error}`);
    }
  }
  // this will be sent to our addFAQform.js via props so that we can record the data being submitted by the form.
  const postQuestions = async(formPayload)=>{
    try {
      //start of fetch
      const response = await fetch("/api/v1/questions",{
        //inside of an object currently. You must create this object for the post to work. It is a second arg for a fetch
        //must specify it is a post since fetch defaults to get.
        method: "POST",
        //need these headers since the router wants them. this is also an object inside of this objects
        // key of headers
        //see questionsRouter.js line 8
        headers: new Headers({
          'Content-Type' :'application/json'
        }),
        //this is making the information from our form into a form JSON can read
        body: JSON.stringify(formPayload)
      })
      //standard error handling
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      //getting the data from the form THAT WE/the user SUBMITTED!! and converting it back to an object
      const FAQData = await response.json()
      //put debugger here to see the object created. It will have a key of "question:" it gets this key from the router..see questionsRouter.js line 14
      //at this point, if no errors occurred, the data that we submitted via the form...
      //in the json file already. We need to update state so that the user will see the updated list...
      //without having to hard refresh. State will change and the page will re-render itself using react.
      setQuestions([
        ...questions,
        FAQData.question
      ])
    } catch (error) {
      console.error(`Error in fetch ${fetch}`);
    }
  }

  //this prevents the fetch request from loading on page load. NEEDs TO BE A CALLBACK FUNC
  useEffect(()=>{
    //calls the function after the initial render of the page
    getQuestions()
    //second argument TO MAKE SURE IT DOES IT ONCE!
  },[])

  //toggles the selected using state of on click see the questions.js
  const toggleQuestionSelect = id => {
    if (id === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(id)
    }
  }
  //mapping through the state(that house our questions due to fetch) and creates child components by passing props.
  const questionListItems = questions.map(question => {
    // makes sure we can select one question if it is selected it becomes true
    let selected
    if (selectedQuestion === question.id) {
      selected = true
    }
  //handles the toggle. needs to be packaged to send to question.js
    let handleClick = () => {
      toggleQuestionSelect(question.id)
    }
    //sending props to child question.js
    return (
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })
//rendering the page
  return (
    <div className="page">
      <h1>We Are Here To Help</h1>
      <div className="question-list">{questionListItems}</div>
      <AddFAQForm postFAQ = {postQuestions}/>
    </div>
  )
}

export default hot(FAQList)
