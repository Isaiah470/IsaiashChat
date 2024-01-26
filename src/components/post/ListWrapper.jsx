import React, { useState, useEffect, useMemo, createContext, useCallback } from 'react';
import socket from '../../utils/socket'
import CommentForm from './CommentForm'
import CardsList from './CardsList'
import DropdownSort from './DropdownSort'
import NavPages from './NavPages'
export const ListContext = createContext(null);

// either under comment section, with replies, or card list.
// under comment section: have child comments, by sort method. 
// get all comments from single post
// card list: no child comments, by sort method. 
// get all comments/posts from search query, by pages. 

//comments are comments when not doing load more bs. 
//givenCommentTree is comments displayed when is load more
export default function ListWrapper({ isPost, isChildren, query, sortMeth, isTree }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentTree, setCommentTree] = useState([]);
  const [givenCommentTree, setGivenCommentTree] = useState([])
  const [subtreeParent, setSubtree] = useState({})
  const [sortMethod, setSortMethod] = useState(sortMeth);
  const [totalNumComments, setTotalNumComments] = useState(0);
  const rootId = isPost ? query.postId : null;
  //console.log(rootId)
  //console.log("given comment tree")
  //console.log(givenCommentTree)
  useEffect(()=> {
    function onRequestMore({subtreeParent, treeComments}) {
      //console.log("once")
      //console.log(treeComments)
    //console.log(givenCommentTree)
      const removedDuplicates = Array.from(new Set([...givenCommentTree, ...treeComments,].map(JSON.stringify)), JSON.parse)
      setGivenCommentTree(givenCommentTree => removedDuplicates);
      //setSubtree(data.subtreeParent)
    }
    socket.on('user.get.request.more', onRequestMore);
    return () => {
      socket.off('user.get.request.more', onRequestMore);
    };
  }, [givenCommentTree])
  useEffect(() => {
    function onComments(data) {
      setComments(data.comments);
      setLoading(false);
    }
    function postedComment(data) {
      if (!isTree) {
        setComments(comments => ([data, ...comments,]));
      }
      if (isTree) {
        setCommentTree(commentTree => ([data, ...commentTree]));
        setGivenCommentTree(givenCommentTree => ([data, ...givenCommentTree]));
      }
    }
    function onTreeComments(data) {
      setCommentTree(data.comments);
      setGivenCommentTree(data.givenComments);
      setSubtree(data.subtreeParent)
    }  
    socket.on('user.get.comments', onComments);
    socket.on('user.post.comment', postedComment);
    socket.on('user.get.tree.comments', onTreeComments);
    
    socket.emit('getPost', { query, sortMethod });
    return () => {
      socket.off('user.get.comments', onComments);
      socket.off('user.post.comment', postedComment);
      socket.off('user.get.tree.comments', onTreeComments);
    };
  }, [sortMethod])
  const treeify = useCallback((comments, rootId, isChildren) => {
    const treeComments = {};
    treeComments[rootId] = [];
    if (comments?.length === 0) return treeComments;
    if (!isChildren) {
      treeComments[rootId] = comments;
      return treeComments;
    }
    comments.forEach((comment) => {
      treeComments[comment.parentId] ||= [];
      treeComments[comment.parentId].push(comment);
    });
    return treeComments;
  }, [])

  const treeComments = useMemo(() => {
    return treeify(commentTree, rootId, isChildren);
  }, [commentTree])

  const rootComments = useMemo(() => {
    if (isTree) { return treeify(givenCommentTree, rootId, isChildren) }
    return treeify(comments, rootId, isChildren);
  }, [comments, givenCommentTree])

  const childComments = (parentId) => {
    return rootComments[parentId];
  }
  const roots = childComments(rootId);
  //console.log('roots')
  //console.log(roots)
  return (
    <>
      <ListContext.Provider value={{ setComments, childComments, roots, rootComments, treeComments, givenCommentTree, setGivenCommentTree, setSubtree, subtreeParent, sortMethod, setSortMethod, isChildren, isPost, }}>
        <DropdownSort />
        <CommentForm spaceId={query.spaceId} parentId={query.postId} postId={query.postId} isPost = {isPost} />
        {roots !== null && roots?.length > 0 && (
          <>
            <CardsList cards={roots} isPost={query.isPost} isRoot = {true}/>
          </>
        )}
        {isPost === true ? (
          <NavPages />

        ) : (
          <NavPages />

        )}
      </ListContext.Provider>
    </>

  )

}