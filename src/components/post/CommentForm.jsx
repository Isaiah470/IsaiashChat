import React, { useState, useContext } from 'react';
import socket from '../../utils/socket';
import {
  MDBBtn, MDBTextArea
} from 'mdb-react-ui-kit';

export default function CommentForm({ autoFocus = false, spaceId, postId, parentId, isPost=true}) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  //const { comments, setComments, } = useContext(PostContext);
  //data.content, data.spaceId, data.parentId, data.postId
  const username = localStorage.getItem('token')?.id;
  const sendComment = (e) => {
    const commentText = text;
    setText('');
    socket.emit('postComment', { content: commentText, 'spaceId': spaceId, 'parentId': parentId, 'postId': postId, username, }

    )
  }

  return (
    <div className='small'>
    <MDBTextArea autoFocus={autoFocus} value={text} onChange={(e) => setText(e.target.value)} style={{ padding: '10px', borderRadius: '5px', fontSize: '14px' }} rows={3} label={isPost ? 'Post' : 'Comment'} className="mt-2 small" >
      </MDBTextArea>
      <div className="d-flex justify-content-end">
        <MDBBtn type="submit" disabled={loading} onClick={sendComment} className='mb-4 '>
          {loading ? "Submitting" : isPost ? "Post" : "Comment"}
        </MDBBtn >
      </div>
    </div>
  )
}