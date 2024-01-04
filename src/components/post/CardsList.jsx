import React, { useContext } from 'react';
import { ListContext } from './ListWrapper'
import Comment from './Comment';
import PostCard from './PostCard';
//comments = roots,=array of root comments [c1, c2,]
//comments are {spaceId: 1222, commentId: 121, content: , upvotes, downvotes}etc

export default function CardsList({ cards, isPost, isRoot }) {

  return (
    <>
      {/* <Comment message = {{name:"hello", text: "comment text", profilePic: "", votes: "5", }} />*/}
      {
        cards.map(card => {
          if (!isPost) {
            return (
              <div key={card.commentId}> <Comment  {...card} isRoot = {isRoot}/>
              </div >
            )
          }
          else {
            return (
              <div key={card.commentId}> <PostCard  {...card} isRoot = {isRoot}/>
              </div >
            )
          }
        })
      }
    </>
  )
}