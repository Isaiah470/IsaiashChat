import React, { useState, useCallback, useContext, useRef, useEffect, forwardRef } from 'react'
import './Tile.css'
import {
  MDBInput
} from 'mdb-react-ui-kit'
import { GridContext } from './GridContext'
import { insertRow, changeBlackTile, wordNumbers, reviver, replacer} from './GridUtils.js'
import isHotkey from 'is-hotkey'
const Tile = forwardRef(({ num, pos,}, ref) => {
  //set focus is what casues complete grid rerender each time
  const { n, m, setN, setM, isToggleDark, setToggleDark, currentFocus, dir, idArray, setIdArray, focusTile, setAcrossList, setDownList, rangeRef, getMap, handleClick, handleKeyDownGrid, toggleClues, handleHighlightSuper } = useContext(GridContext)
  const [value, setValue] = useState('')
  //const [isReadOnly, setReadOnly] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  const [isActive, setActive] = useState(false)
  const [isDark, setDark] = useState(false)

  const tileSize = rangeRef?.current?.value ? rangeRef.current.value : 33;

  const handleHighlight = () => {
    handleHighlightSuper(isDark, pos)
  }

  const handleMouseDown = () => {
    if (isToggleDark) {
      setValue('')
      setDark((isDark) => !isDark)
      const { newArray, listAcross, listDown } = changeBlackTile(idArray, n, m, pos[0], pos[1])
      setIdArray(newArray)
      setAcrossList(listAcross); setDownList(listDown)
    }
    else {
      if (pos[0] !== currentFocus.current?.[0] || pos[1] !== currentFocus.current?.[1]) {
        return;
      }//console.log(e.currentTarget.dataset.pos)
      if (idArray[pos[0]][pos[1]][1] === 1)
        return;
      dir.current = dir.current === 'horizontal' ? 'vertical' : 'horizontal';
      handleHighlight()
    }
  }

  const handleKeyDown = (e) => {
    // first find next tile
    //some sort of useEffect ? 
    const val = e.key
    let cX = 0; let cY = 0;
    if (/^[a-z0-9]$/.test(val)) {
      setValue(val.toUpperCase())
      dir.current === 'horizontal' ? cY++ : cX++;
    }
    else if (isHotkey('Backspace', e)) {
      setValue('')
      dir.current === 'horizontal' ? cY-- : cX--;
    }
    else if (isHotkey('Space', e)) {
      setValue('')
      dir.current === 'horizontal' ? cY++ : cX++;
    }
    else if (isHotkey('up', e)) {
      cX--;
    }
    else if (isHotkey('left', e)) {
      cY--;
    }
    else if (isHotkey('down', e)) {
      cX++;
    }
    else if (isHotkey('right', e)) {
      cY++;
    }
    else {
      handleKeyDownGrid(e, pos[0], pos[1])
    }

    focusTile(idArray?.[pos[0] + cX]?.[pos[1] + cY]?.[0])

  }
  //useref, on effect, then set set
  useEffect(() => {
    const startValues = localStorage.getItem('startValues')
    if (startValues) {
      const JSONStartValues = JSON.parse(startValues, reviver)
      const savedVal = JSONStartValues.get(idArray[pos[0]][pos[1]][0])
      setValue(savedVal?.[0] ? savedVal?.[0] : '')
      setDark(savedVal?.[1] ? true : false)
    }
  }, [toggleClues])
  return (
    <>
      <div
        style={{
        }}
        className={`${n - 1 === pos[0] ? 'bottom-row' : 'upper-rows'} tile-wrapper ${isDark ? 'dark' : ''} `}
        onClick={() => {
          if (isToggleDark) {
            handleMouseDown()
          }
        }}
      >
        <MDBInput
          style={{ width: `${tileSize}px`, height: `${tileSize}px`, fontSize: `${1 + (tileSize - 33) / 33 * 1.2}em`, }}
          labelStyle={{ color: 'black', fontSize: `${1 + (tileSize - 33) / 33 * 1.2}em`, }}
          ref={ref}
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={() => { handleHighlight() }}
          onMouseDown={(e) => { handleMouseDown() }}
          value={value}
          label={isDark ? '' : num === '0' ? '' : num}
          id='controlledValue'
          type='text'
          maxLength='2'
          autoComplete="off"
          className={` tile-input ${isActive ? 'active' : 'active'} ${isDark ? 'dark' : ''} ${isToggleDark ? 'isToggleDark' : ''}`}


        />
      </div>
      <div className="custom-tile-menu">
        <ul>
          <li><a href="#to=0">link-to=0 -item-1 </a></li>
          <li><a href="#to=0">link-to=0 -item-2 </a></li>
          <li><a href="#to=0">link-to=0 -item-3 </a></li>
        </ul>
      </div>
    </>
  )
})
export default Tile;