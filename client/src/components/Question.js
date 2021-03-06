import React from 'react'
//questions tile
const Question = props => {
  let answer, button, questionClass

  if (props.selected) {
    questionClass = 'selected-question'
    button = (
      <i
        onClick={props.handleClick}
        className="fa fa-minus-square fa-2x green"
        aria-hidden="true"
      />
    )
    answer = props.answer
  } else {
    questionClass = 'unselected-question'
    button = (
      <i
        onClick={props.handleClick}
        className="fa fa-plus-square fa-2x"
        aria-hidden="true"
      />
    )
  }

  return (
    <div>
      <div className={questionClass}>
        {button}
        <h5 onClick={props.handleClick}>{props.question}</h5>
      </div>
      <p>{answer}</p>
    </div>
  )
}

export default Question
