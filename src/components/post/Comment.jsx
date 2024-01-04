import React, { useState, useContext, useRef } from 'react';
import socket from '../../utils/socket';
import CardsList from './CardsList';
import './Comment.css';
import CommentForm from './CommentForm';
import { ListContext } from './ListWrapper';
import RequestButton from './RequestButton';
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

// Data received from Mongo database

//HEAVY HEAVE Optimization needed currently reloads each vote, each single update, usememo, memo
export default function Comment({ content, spaceId, parentId, postId, username, commentId, upvotes, downvotes, vote, isRoot }) {
  const [showShow, setShow] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [childrenHidden, setChildrenHidden] = useState(false);
  const [ups, setUps] = useState(upvotes);
  //change later for user voting
  const [isUp, setIsUp] = useState(vote === 1);
  const [downs, setDowns] = useState(downvotes);
  //change later for user voting
  const [isDown, setIsDown] = useState(vote === -1);

  const { childComments, roots, rootComments, } = useContext(ListContext);
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
  const cComments = childComments(commentId);

  return (
    <>

      <div className={`d-flex mb-0 align-items-stretch ${isRoot ? 'mb-3': ''}`}>

        <MDBBtn className=" me-0 ms-0 align-self-stretch " outline color='danger' rippleColor='rgb(100,0,0,0)' rippleDuration='0' style={{ paddingRight: "5px", paddingLeft: "0px", borderRightColor: 'rgb(0,0,0,0)', borderTopColor: 'rgb(0,0,0,0)', borderBottomColor: 'rgb(0,0,0,0)', borderRadius: '0px' }} onClick={() => setShow(!showShow)} />

        <div className="d-flex flex-column  w-100">

          <MDBCard className="w-100">
            <MDBCardBody className="ps-2 pt-2 pb-2">
              <MDBCardHeader tag="h6" className="mt-0 ps-2 pt-0 pb-0" style={{ fontSize: '15px' }}>
                <div className="d-flex align-items-center mb-1">
                  <a className='icon-link' onClick={() => setShow(!showShow)}> <MDBIcon fas icon="circle-minus" className="position-absolute top-0 start-0 " style={{ transform: 'translateX(-40%)', }} /> </a>
                  <p className="mb-0 me-1">
                    {username ? username : 'noone'}
                  </p>
                  <MDBBadge className="bg-danger ">Approved</MDBBadge>
                  <a className="link-muted icon-link">
                    <MDBIcon fas icon="pencil-alt ms-2 " size='sm' />
                  </a>
                  <a className="text-success icon-link">
                    <MDBIcon fas icon="redo-alt ms-2" size='sm' />
                  </a>
                  <a className="link-danger icon-link">
                    <MDBIcon fas icon="heart ms-2" size='sm' />
                  </a>
                </div>
              </MDBCardHeader>
              <div id="expand-container" className="w-100">
                <div id="expand-contract" className={`${showShow ? 'expanded' : 'not-expanded'}`}>
                  <MDBCardText className="ps-2" style={{ fontSize: '15px' }}>
                    {content}
                  </MDBCardText>
                  <MDBCardFooter tag="h6" className="mt-1 mb-1 ps-0 pt-0 pb-1" style={{ fontSize: '15px' }}>
                    <div className="d-flex align-items-center mt-1">
                      {/* Upvote button */}
                      <div className='d-flex me-1'>
                        <a className='icon-link' onClick={() => handleUp()}><MDBIcon fas icon="arrow-up me-1" color={isUp ? "success" : "dark"} /></a>
                        <p className="mb-0 ">{ups - downs}</p>
                        {/* Downvote button */}
                        <a className='icon-link' onClick={() => handleDown()}> <MDBIcon fas icon="arrow-down ms-1" color={isDown ? "danger" : "dark"} /></a>
                      </div>
                      {/* Reply button */}
                      <div className='d-flex justify-content-center'>
                        <a className='icon-link' onClick={() => setShowReply(!showReply)}>
                          <MDBIcon fas icon="reply ms-2" size='sm' />
                          <span className="small ms-0"> Reply </span>
                        </a>
                      </div>


                      <a className='icon-link'><MDBIcon far icon="clone ms-2" size='sm' /></a>
                      <a className='icon-link'><MDBIcon far icon="clipboard ms-2" size='sm' /></a>
                      <a className='icon-link'><MDBIcon far icon="bookmark ms-2" size='sm' /></a>
                    </div>
                  </MDBCardFooter>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
          <div id="expand-container" className="ms-1 w-100">
            <div id="expand-contract" className={`${showReply ? 'expanded' : 'not-expanded'}`} >
              <CommentForm spaceId={spaceId} parentId={commentId} postId={postId} />
            </div>
          </div>
          {cComments?.length > 0 && (
            <>
              <div id="expand-container" className="w-100">
                <div id="expand-contract" className={`${showShow ? 'expanded' : 'not-expanded'}`}>
                  <div className={`${childrenHidden ? "hide" : ""}`}>
                    <div className="ms-0 nested-comments"  >

                      <CardsList cards={cComments} isPost={false} />
                    </div>

                  </div>
                  {/*} <button className={`${!childrenHidden ? "hide" : ""}`} onClick={() => setChildrenHidden(false)} > Show replies
                  </button> */}

                </div>
              </div>
            </>)
          }
          <RequestButton commentId={commentId} />
        </div>
      </div>


    </>
  );
}