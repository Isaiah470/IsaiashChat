import React, { useState, useContext } from 'react'
import { GridContext } from './GridContext'
import {
  MDBBtn, MDBRange
} from 'mdb-react-ui-kit'
import { replacer, reviver } from './GridUtils.js'
export default function TooltipControls(props) {

  const { setToggleDark, rangeRef, handleClick, resize, idArray, acrossList, downList, cluesRef, getMap } = useContext(GridContext)

  const saveCrossword = () => {
    console.log('save crossword')
    localStorage.setItem('idArray', JSON.stringify(idArray))
    localStorage.setItem('tileSize', JSON.stringify(rangeRef.current.value))
    localStorage.setItem('acrossList', JSON.stringify(acrossList))
    localStorage.setItem('downList', JSON.stringify(downList))
    const cluesMap = new Map()
    cluesRef.current.forEach((value, key) => {
      cluesMap.set(key, value.innerHTML);
    })
    localStorage.setItem('clues', JSON.stringify(cluesMap, replacer))
    const map = getMap(); 
    const startValueMap = new Map()
    map.forEach((value, key) => {
      startValueMap.set(key, [value.value, value.className.includes('dark')]);
    })
    localStorage.setItem('startValues', JSON.stringify(startValueMap, replacer))
    console.log(JSON.parse(localStorage.getItem('clues', reviver)))
  }

  return (
    <div>
      <MDBRange
        inputRef={rangeRef}
        defaultValue={33}
        min='25'
        max='60'
        step='0.1'
        id='customRangeWordSize'
        label={<span className='small'>Grid Size (px) </span>}
        onChange={() => {
          resize()
        }}
      />
      <MDBBtn size='sm' onClick={() => {

      }}> Share </MDBBtn>
      <MDBBtn size='sm' onClick={() => {
        saveCrossword()
      }}> Save </MDBBtn>
      <MDBBtn size='sm' onClick={() => {

      }}> Undo </MDBBtn>

      <MDBBtn size='sm' onClick={() => setToggleDark((toggleDark) => !toggleDark)}> Toggle Dark</MDBBtn>

      <MDBBtn size='sm' onClick={() => {
        handleClick('add row')
      }}> Add row </MDBBtn>
      <MDBBtn size='sm' onClick={() => {
        handleClick('add column')
      }}> Add column </MDBBtn>
      <MDBBtn size='sm' onClick={() => {
        handleClick('delete row')
      }}> Delete row</MDBBtn>
      <MDBBtn size='sm' onClick={() => {
        handleClick('delete column')
      }}> Delete column </MDBBtn>
    </div>
  )
}