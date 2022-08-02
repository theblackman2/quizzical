import React from 'react'
import Welcome from './../Welcome/Welcome'
import './Game.css'

function Game() {
  const [playing, setPlaying] = React.useState(false)

  const biginGame = () => {
    setPlaying(true)
  }

  return (
    <div className='game'>
      <img src="./assets/blobs-1.png" alt="Blob" className="top-blob" />
      <img src="./assets/blobs-2.png" alt="Blob" className="bottom-blob" />
      { !playing && (
        <Welcome
          biginGame={biginGame}
        />
      )}
    </div>
  )
}

export default Game