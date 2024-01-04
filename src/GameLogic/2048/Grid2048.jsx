import React, {useState, useTransition, useCallback, useRef, useEffect, useContext, useLayoutEffect} from 'react'
import './Grid2048.css'
import Tile2048 from './Tile2048'
import isHotkey from 'is-hotkey'
import {clone, left, right, up, down, addTile, checkLose} from './2048Logic'
import {GridWrapperContext} from './Grid2048Wrapper'
const colorMap = {
  2: ['#2b2b1d', 'white'],
  4: ['#1e1d2b', 'white'],
  8: ['#2b1f1d', 'white'],
  16: ['#2b1d2a', 'white'],
  32: ['#1d2b21', 'white'],
  64: ['#2b271d', 'white'],
  128: ['#2b1d2b', 'white'],
  256: ['#1d2b2a', 'white'],
  512: ['#1d2b25', 'white'],
  1024: ['#1d2b1d', 'white'],
  2048: ['#2b281d', 'white']

}

const initialGrid = [
    [[crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2 ], [crypto.randomUUID() ,2 ]], 

    [[crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2]],

    [[crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2]],

    [[crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2], [crypto.randomUUID() , 2]],   
];

export default function Grid2048() {
  const {gameState, setGameState} = useContext(GridWrapperContext);
  const [grid, setGrid] = 
    useState(initialGrid)
  const [animeDur, setAnimeDur] = useState(500);
  const iterArr = useRef([...Array(16).keys()])
  const delayKeyDown = useRef(true);

  useEffect(() => {
    delayKeyDown.current = true;
    let timer = setTimeout(() => {
      delayKeyDown.current = false;
      //console.log('called')
    }, animeDur);
    return () => {
      clearTimeout(timer)
    }
  }, [grid])
  const handleKeyUp = (e) => {
    if (!delayKeyDown.current) {
      if (isHotkey('left', e)) {
        const gridMore = addTile(4, 4, left(4, 4, clone(grid)))
        setGrid(gridMore.grid)
        setAnimeDur(gridMore.maxChange)
      }
      else if (isHotkey('right', e)) {
        const gridMore = addTile(4, 4, right(4, 4, clone(grid)))
        setGrid(gridMore.grid)
        setAnimeDur(gridMore.maxChange)
      }
      else if (isHotkey('down', e)) {
        const gridMore = addTile(4, 4, down(4, 4, clone(grid)))
        setGrid(gridMore.grid)
        setAnimeDur(gridMore.maxChange)
      }
      else if (isHotkey('up', e)) {
        const gridMore = addTile(4, 4, up(4, 4, clone(grid)))
        setGrid(gridMore.grid)
        setAnimeDur(gridMore.maxChange)
      }
    }
  }
  //console.log(checkLose(4, 4, grid))
  useEffect( () => {
  let winlose = checkLose(4, 4, grid);
  let timer;
  if (winlose === 'lost' || winlose === 'won') {
    timer = setTimeout( () => {
    setGameState(winlose)
    }, 400)
  }
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
  }
  }, [grid])
  return (

  <>
    <h1> Lose your eyes </h1>

    <p />
    <div style = {{
      display: 'inline-block',
    }}tabIndex = '1' onKeyUp = {(e)=> { handleKeyUp(e)}}>
    <div className = 'tile-2048-container' style = {{width:'380px', height: '380px'}}> 
      <div className = 'tile-2048-innercontainer'>
    {
      iterArr.current.map((index)=> {
          const i = Math.floor(index/4);
          const j = index % 4;
                return (
                  <Tile2048 
                    color = {colorMap[grid[i][j][1]]}
                    dur = {animeDur}
                    hide = {grid[i][j][0] === 0}
                    key ={ 
                    grid[i][j][0] !== 0 ? grid[i][j][0] : crypto.randomUUID()} 
                    pos = {[i, j]}  >                                   {grid[i][j][1] ? grid[i][j][1] : ''} 
                  </Tile2048> 

                )

      })
    }
      </div>
      {/*

         */
      }
      </div>
    </div>
  </>

  )
}