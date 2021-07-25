import React, {useState, useEffect} from "react"

const AddFAQForm = props => {
  //destructuring the props sent by the parent component FAQList.js
  const {postFAQ} = props
  //tracking the state of the form using an object with key value pairs
  const [questionFormData, setQuestionFormData] = useState({
    question: "",
    answer: "",
  })

  //this will change the state if the form is changed i.e  when one types something in the form.
  const handleFormChange= (event)=>{
    // need ot set it using the data type it is already i.e and object {}
    setQuestionFormData({
      //yada yada operator. keeps the current object the same unless specified to change below
      ...questionFormData,
      //changes state based on the name given to the input field.  
      [event.currentTarget.name]:event.currentTarget.value
      //the value is tied to state so the dom does not take over. If we do not implement this...
      // some odd things can happen. since the dom will do one thing and react will do another
    })
  }

  //this will actually submit the form and invoke our post fetch request that we sent here via props
  const handleSubmit=(event)=>{
    // prevents the dom from doing its own post request
    event.preventDefault()
    //the post fetch function that we sent via props is being used and taking the current state of the form..
    //as the argument
    postFAQ(questionFormData)
    //resetting our form to its original state so that the form clears. we want to do this since the form is set up...
    //to have te value of the forms current state. Also, since the dom is no longer in charge, the form will not clear unless we tell it to . 
    setQuestionFormData({
      question: "",
      answer: "",
    })
  }

  // onSubmit is on the form for alternate submit methods like pressing enter. 
  // onChange is here to keep track of state. try to name id and name the same
  //value is tied to the current state of the form. it is defaulted to an empty string
  

  return(
    <div>
      <form onSubmit={handleSubmit}> 
        <label htmlFor="question">Question:</label>
        <input onChange={handleFormChange} type="text" id="question" name="question" value={questionFormData.question} ></input>
        

        <label htmlFor="answer">Answer: </label>
        <input onChange={handleFormChange} type="text" id="answer" name="answer" value={questionFormData.answer} ></input>
       

        <input type ="submit" value="Submit a FAQ"></input>
      </form>
    </div>
  )
}


export default AddFAQForm