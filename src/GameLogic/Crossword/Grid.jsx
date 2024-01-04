import React, { useContext, useEffect, Fragment, useCallback } from 'react'
import Tile from './Tile'
import { GridContext } from './GridContext'
//take in n, m 
import { useState, useId, useRef } from 'react'
import { insertRow, insertColumn, deleteRow, deleteColumn, wordNumbers, reviver, replacer} from './GridUtils.js'
import isHotkey from 'is-hotkey'
import {
  MDBBtn, MDBRange
} from 'mdb-react-ui-kit'
import Clues from './Clues'
import TooltipControls from './TooltipControls'
export default function Grid() {
  const [n, setN] = useState(10)
  const [m, setM] = useState(10)
  const [isToggleDark, setToggleDark] = useState(false)
  //alternatively horizontal, vertical
  const [nextId, setNextId] = useState(1)
  const [dirPos, setDirPos] = useState([])
  //console.log(currentFocus)
  //console.log(nextId)
  const [toggleClues, setToggleClues] = useState(0)
  const [idArray, setIdArray] = useState(wordNumbers([...Array(n).keys()].map(() => {
    return [...Array(m + 1).keys()].map(() => [crypto.randomUUID(), 0, 0, 0, 0])
  }), n, m).newArray)
  const [acrossList, setAcrossList] = useState([...Array(n).keys()].map((i) => {
    return [i, 0, 1 + (i > 0 ? 1 : 0) * (m - 1) + i]
  }))
  const [downList, setDownList] = useState([...Array(m).keys()].map((i) => {
    return [0, i, 1 + (i > 0 ? 1 : 0) * (n - 1) + i]
  }))
  const dir = useRef('horizontal')
  const currentFocus = useRef(null)
  const tilesRef = useRef(null);
  const rangeRef = useRef(null);
  const cluesRef = useRef(null)
  const resize = () => {
    const size = rangeRef?.current?.value ? rangeRef.current.value : 33;
    //console.log(size)
    const map = getMap();
    const savedStyle = `width: ${size ? size : 33.0}px; height: ${size ? size : 33}px; fontSize: ${1 + (size - 33) / 33 * 1.2}em`
    const savedFont = `${1 + (size - 33) / 33 * 1.2}em`;
    map.forEach((value, key) => {
      value.style = savedStyle;
      value.nextSibling.style.fontSize = savedFont; 
    })
  }

  function focusTile(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node?.focus();
  }

  function getMap() {
    if (!tilesRef.current) {
      tilesRef.current = new Map();
    }
    return tilesRef.current;
  }
  const handleClick = (action, x, y) => {
    let actionResult;
    switch (action) {
      case 'add row':
        actionResult = insertRow(idArray, n, m, x ? x : currentFocus.current ? currentFocus.current[0] : n);
        setN((n) => n + 1);
        break;
      case 'add column':
        actionResult = insertColumn(idArray, n, m, y ? y : currentFocus.current ? currentFocus.current[1] : m);
        setM((m) => m + 1);
        break;
      case 'delete row':
        actionResult = deleteRow(idArray, n, m, x ? x + 1 : currentFocus.current ? currentFocus.current[0] + 1 : n);
        setN((n) => n - 1);
        break;
      case 'delete column':
        actionResult = deleteColumn(idArray, n, m, y ? y + 1 : currentFocus.current ? currentFocus.current[1] + 1 : m);
        setM((m) => m - 1);
        break;
    }
    const { newArray, listAcross, listDown } = actionResult;
    setIdArray(newArray);
    setAcrossList(listAcross);
    setDownList(listDown);
  }

  const handleKeyDownGrid = (e, i, j) => {
    if (isHotkey('Shift+left', e)) {
      handleClick('add column', i, j - 1)
    }
    else if (isHotkey('Shift+right', e)) {
      handleClick('add column', i, j + 1)
    }
    else if (isHotkey('Shift+down', e)) {
      handleClick('add row', i + 1, j)
    }
    else if (isHotkey('Shift+up', e)) {
      handleClick('add row', i - 1, j)
    }
    else if (isHotkey('mod+Shift+left', e)) {
      handleClick('delete column', i, j - 1)
    }
    else if (isHotkey('mod+Shift+right', e)) {
      handleClick('delete column', i, j + 1)
    }
    else if (isHotkey('mod+Shift+down', e)) {
      handleClick('delete row', i + 1, j)
    }
    else if (isHotkey('mod+Shift+up', e)) {
      handleClick('delete row', i - 1, j)
    }
  }

  useEffect(() => {
    if (isToggleDark) {
      getMap().forEach((value, key) => {
        value.style.backgroundColor = value.style.backgroundColor === 'yellow' ? 'transparent' : 'unset';
      })
    }
    else {
      getMap().forEach((value, key) => {
        value.style.backgroundColor = value.style.backgroundColor === 'transparent' ? 'yellow' : 'unset';
      })
    }
  }, [isToggleDark])

  const handleContextMenu = useCallback((e) => {
    console.log("context menu")
    e.preventDefault();

  }, [])
  function useSavedClues() {
    const savedIdArray = localStorage.getItem('idArray')
    const savedAcrossList = localStorage.getItem('acrossList')
    const savedDownList = localStorage.getItem('downList')
    if (savedIdArray && savedAcrossList && savedDownList) {
      console.log('saved')
      const JSONIdArray = JSON.parse(savedIdArray)
      setIdArray(JSONIdArray)
      setAcrossList(JSON.parse(savedAcrossList))
      setDownList(JSON.parse(savedDownList))
      setN(JSONIdArray.length)
      setM(JSONIdArray[0].length - 1)
      //set clues, set tilevalues
      setToggleClues((toggleClues) => toggleClues + 1)
    }
  }

  useEffect(() => {
    console.log('fired')
    useSavedClues()
  }, [])

  const handleHighlightSuper = (isDark, pos) => {
    const map = getMap();
    //console.log(tileRef.current)
    currentFocus.current = pos;
    if (!isToggleDark) {
      if (isDark || !currentFocus) {

      }
      else {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < m; j++) {
            let tileColor = ''
            if (dir.current === 'vertical') {
              //console.log('fire')
              idArray[i][j][4] !== idArray[pos[0]][pos[1]][4] ? tileColor = 'unset' : tileColor = 'yellow';
            }
            else if (dir.current === 'horizontal') {
              //&& backgroundColor.current !== 'white'
              idArray[i][j][3] !== idArray[pos[0]][pos[1]][3] ? tileColor = 'unset' : tileColor = 'yellow';
            }
            map.get(idArray[i][j][0]).style.backgroundColor = tileColor;
          }
        }
      }
    }
  }

  return (
    <>

      <GridContext.Provider value={{ n, m, setN, setM, isToggleDark, setToggleDark, currentFocus, dir, idArray, setIdArray, focusTile, acrossList, setAcrossList, downList, setDownList, rangeRef, getMap, handleClick, handleKeyDownGrid, resize, cluesRef, toggleClues, handleHighlightSuper }} >

        <TooltipControls />
        <div className='d-flex flex-wrap' >
          <div className="grid flex flex-grow p-0 m-0" onContextMenu={(e) => handleContextMenu(e)}>

            {[...Array(n).keys()].map((i) => {
              return (
                <div key={idArray[i][m][0]} >
                  {
                    [...Array(m).keys()].map((j) => {
                      return (

                        <Tile key={idArray[i][j][0]} pos={[i, j]} num={'' + idArray[i][j][2]} 
                          ref={(node) => {
                            const map = getMap();
                            if (node) {
                              node.pos = [i,j]
                              map.set(idArray[i][j][0], node);
                            } else {
                              map.delete(idArray[i][j][0]);
                            }
                          }}
                        />
                      )
                    }
                    )
                  }
                </div>
              )
            }
            )
            }
          </div>
          <Clues />
        </div>
      </GridContext.Provider>
    </>
  )
}