import React from 'react'
import './Bouton.css'

function Bouton(props) {
  return (
    <button onClick={props.handleClick} className="btn">
      {props.text}
    </button>
  )
}

export default Bouton