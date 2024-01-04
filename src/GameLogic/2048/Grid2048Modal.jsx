import React, {useState, useContext} from 'react'
import './Grid2048Modal.css'
import {GridWrapperContext} from './Grid2048Wrapper'
export default function Grid2048Modal(props) {
   const {gameState, setGameState} = useContext(GridWrapperContext);
//console.log('called')
  return (
    <div className = 'winlose-modal'>
      <div className = 'winlose-modal-menu'>
        <div>
          You {props.state}
        </div>

        <div className = 'winlose-modal-menu-body'>
         Final score: {props.state === 'won' ?  "We're cooking" : "It's over"}
        </div>

        <div className = 'winlose-modal-menu-footer'>
        <button onClick = {() => {setGameState('continue')}}>
          Close
        </button>

        </div>


      </div>


    </div>
  )
}