import {useState, useContext, useRef, useEffect} from 'react'
import {
  MDBBtn
} from 'mdb-react-ui-kit'
import {GridContext} from './GridContext'
import './Clues.css'
import {reviver, replacer} from './GridUtils.js'
import DOMPurify from 'dompurify';
export default function Clues({savedClues}) {

  const {acrossList, downList, idArray, setIdArray, cluesRef, setAcrossList, setDownList, toggleClues, getMap, dir, handleHighlightSuper} = useContext(GridContext)

  function getClueMap() {
    if (!cluesRef.current) {
      cluesRef.current = new Map();
    }
    return cluesRef.current;
  }

  function setClue(e, clueId) {
    console.log('lol')
    const clueMap = getClueMap();
     clueMap.get(clueId).clue = e.currentTarget.innerHTML;
    //console.log(e.currentTarget)
  }

  useEffect(() => {
    const clueMap = getClueMap();
    const savedClues = localStorage.getItem('clues')
    if (savedClues) {
      const JSONClues = JSON.parse(savedClues, reviver)
      clueMap.forEach((value, key) => {
      const savedVal = JSONClues.get(key)
      value.innerHTML = savedVal ? DOMPurify.sanitize(savedVal) : '';
    })
    }
  }, [toggleClues])
  //onclick, should ref.onFOcus to call highlight function! correct direction too
  const handleFocus = (key, direction) => {
    console.log(key)
    dir.current = direction === 'horizontal' ? 'horizontal' : 'vertical'
    //console.log(getMap().get(key).className.includes('dark'))
    handleHighlightSuper(false, getMap().get(key).pos)
  }

  return (
    <>
    <div className = 'ms-2' style = {{overflowY: 'scroll', display: 'flex', flexGrow: '1', maxHeight: '50vh',}}>
      <div style = {{width: '50%'}}>
        <div className = 'clue'> Across </div>
      {
        acrossList.map((item) => {
          //item[0] is i, item[1] is j, item[2] is number

          return (  
          <div className = 'clue' key = {idArray[item[0]][item[1]][0]}> 
          <div> {item[2]}. </div>
          <div className = 'clue-text' style = {{display: 'inline-block'}} contentEditable = 'true' 
            tabIndex = '0'
            onInput = {(e) => {setClue(e, 'a' + idArray[item[0]][item[1]][0])}}
            onFocus = {() => {handleFocus(idArray[item[0]][item[1]][0], 'horizontal')}}
            ref={(node) => {
              const map = getClueMap();
              if (node) {
                 map.set('a' + idArray[item[0]][item[1]][0], node);
              } else {
                map.delete('a' + idArray[item[0]][item[1]][0]);
              }
            }}
            >

          </div>
          </div>

          )
          })
      }
      </div>
      <div style = {{width: '50%'}}>
        <div className = 'clue'> Down </div>
      {
        downList.map((item) => {
          //item[0] is i, item[1] is j, item[2] is number
          return (  
          <div className = 'clue' key = {idArray[item[0]][item[1]][0]}> 
          <div> {item[2]}. </div>
          <div className = 'clue-text' style = {{display: 'inline-block'}} contentEditable = 'true' 
            tabIndex = '0'
            onInput = {(e) => {setClue(e, 'd' + idArray[item[0]][item[1]][0])}}
            onFocus = {() => {handleFocus(idArray[item[0]][item[1]][0], 'vertical')}}
            ref={(node) => {
              const map = getClueMap();
              if (node) {
                 map.set('d' + idArray[item[0]][item[1]][0], node);
              } else {
                map.delete('d' + idArray[item[0]][item[1]][0]);
              }
            }}
            >

          </div>
          </div>

          )
          })
      }
      </div>

    </div>
    <div>



    </div>
    </>
  )
}
