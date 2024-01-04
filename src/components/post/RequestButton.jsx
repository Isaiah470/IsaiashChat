import React, { useState, useContext, useCallback, useEffect } from 'react'
import { ListContext } from './ListWrapper'
import {
  MDBBtn,
} from 'mdb-react-ui-kit'
import socket from '../../utils/socket'
export default function RequestButton({ commentId }) {
  const { rootComments, treeComments, sortMethod, setGivenCommentTree } = useContext(ListContext)
  const [isRequested, setIsRequested] = useState(false)
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [startNum, setStart] = useState(1)
  
  
  //should be displayed if /  

  /* case 1: has less comments than it should have
  rootComments[commentId].length < treeComments[commentId].length
  case 2: has no children at all. 
  Then rootComments[commentId] is undefined, but treeComments[commentId].length > 0
  */
  /* console.log('trsdsasaeecommentssaa')
  console.log(commentId)
  console.log(treeComments) 
  */
  //want to get: given comment, get context for it.
  //given comment, get children again 
  const checkDisplay = useEffect(() => {
    //console.log("actual children")
   // console.log(treeComments?.[commentId]?.length)
    //console.log("has children")
    //console.log(rootComments?.[commentId]?.length)

    if (treeComments?.[commentId]?.length > 0) {
      if (!(rootComments?.[commentId]?.length) || rootComments?.[commentId]?.length < treeComments?.[commentId]?.length) {
        if (!isDisplayed)
          setIsDisplayed(true)
      }
      else {
        if (isDisplayed)
          setIsDisplayed(false)
      }
    }
  }, [rootComments])

  
  const handleClick = () => {
    //setIsRequested(true)
    socket.emit('getSubtree', { query: {"isPost": null, postId: 1, spaceId: 1, startNum: startNum, getNum: 2, isTree: true, rootId: commentId} , sortMethod }); 
    //requestPost(post)
    //setIsDisplayed(false)
    //setClicked(true)
    console.log("clicked")
    setStart(startNum + 2 )
  }
  return (
    <>
      {isDisplayed === true && (
        <button onClick={handleClick} >
          Hecko
        </button>
      )}
    </>
  )
}