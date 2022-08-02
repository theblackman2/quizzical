import React from 'react'
import './Welcome.css'
import Bouton from '../Bouton/Bouton'

function Welcome(props) {
  return (
    <div className='welcome-section'>
      <h1>Quizzical</h1>
      <p>Answer all questions before checking</p>
      <Bouton
        handleClick = {props.biginGame}
        text = "Start quiz"
      />
    </div>
  )
}

export default Welcome