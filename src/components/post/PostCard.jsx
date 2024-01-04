import React, { useState, useContext, useRef } from 'react';
import socket from '../../utils/socket';
import './Comment.css';
import CommentForm from './CommentForm';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardText,
  MDBBtn,
  MDBContainer,
  MDBRow, MDBCol,
  MDBIcon,
  MDBBadge,
  MDBCollapse
} from 'mdb-react-ui-kit';
//  <PostContext.Provider value = {{comments, childComments, "roots": roots, rootComments}}> comments is all comments, childComments function get array of children, roots is function that returns key value pairs of commentId and array of children, rootComments is array of root comments.
//  const newComment = {content, spaceId, parentId, postId, username, "commentId": commentId.COUNT};

export default function PostCard({ message, content, spaceId, parentId, postId, username, commentId, upvotes, downvotes, vote }) {
  const [ups, setUps] = useState(upvotes);
  const [isUp, setIsUp] = useState(vote === 1);
  const [downs, setDowns] = useState(downvotes);
  const [isDown, setIsDown] = useState(vote === -1);

  const handleUp = () => {
    socket.emit('voteComment', { commentId, vote: isUp ? 0 : 1 })
    if (isUp) {
      setUps((ups) => ups - 1);
    } else {
      setUps((ups) => ups + 1);
      if (isDown) setDowns((downs) => downs - 1);
    }
    setIsUp(!isUp);
    setIsDown(false);
  }
  const handleDown = () => {
    socket.emit('voteComment', { commentId, vote: isDown ? 0 : -1 })
    if (isDown) {
      setDowns((downs) => (downs - 1))
    } else {
      setDowns((downs) => (downs + 1))
      if (isUp) setUps((ups) => ups - 1)
    }
    setIsDown(!isDown);
    setIsUp(false);

  }

  return (
    <>

      <div className="d-flex mb-3 align-items-stretch">

        <div className="d-flex flex-column justify-content-center" style={{ width: '20px' }}>
          {/* Upvote button */}
          <div className='d-flex justify-content-center'>
            <a className='icon-link' onClick={() => handleUp()} ><MDBIcon fas icon="arrow-up" color={isUp ? "success" : "dark"} /></a>
          </div>
          <span className="mb-0 text-center">{ups - downs}</span>
          {/* Downvote button */}
          <div className='d-flex justify-content-center'>
            <a className='icon-link' onClick={() => handleDown()}> <MDBIcon fas icon="arrow-down " className='me-0' color={isDown ? "danger" : "dark"} /></a>
          </div>
        </div>
        <MDBCard className="w-100">
          <MDBCardBody className="ps-2 pt-2 pb-2">
            <MDBCardHeader tag="h6" className="mt-1 ps-2 pt-0 pb-1">
              <div className="d-flex align-items-center mb-1">

                <p className="mb-0 me-1">
                  {username ? username : 'noone'}
                </p>
                <MDBBadge className="bg-danger">Approved</MDBBadge>
                <a className="link-muted icon-link">
                  <MDBIcon fas icon="pencil-alt ms-2" />
                </a>
                <a className="text-success icon-link">
                  <MDBIcon fas icon="redo-alt ms-2" />
                </a>
                <a className="link-danger icon-link">
                  <MDBIcon fas icon="heart ms-2" />
                </a>
              </div>
            </MDBCardHeader>
            <MDBCardText className="ps-2">
              {content}
            </MDBCardText>
            <MDBCardFooter tag="h6" className="mt-1 mb-1 ps-0 pt-0 pb-1">
              <div className="d-flex align-items-center mt-1">



                <a className='icon-link'><MDBIcon far icon="clone ms-2" /></a>
                <a className='icon-link'><MDBIcon far icon="clipboard ms-2" /></a>
                <a className='icon-link'><MDBIcon far icon="bookmark ms-2" /></a>
              </div>
            </MDBCardFooter>
          </MDBCardBody>
        </MDBCard>


      </div>


    </>
  );
}