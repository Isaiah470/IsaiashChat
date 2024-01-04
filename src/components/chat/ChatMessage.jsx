import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
//message is text, name, id, socketId
import Timestamp from '../../utils/Timestamp'
export default function ChatMessage({ message, profilePic }) {

  //console.log("this IS SS")
  //console.log(message)
  // top right we want react, reply, more, createThread? to appear on hover
  // edit message, pin message, reply, create threa, mark unread, cop message link, speak message, delete message, copy id
  //reactions will appear on bottom left, to remove 
  return (
    <MDBCard>
      <MDBCardHeader tag='span' className='p-2' >
        <div className="d-flex align-items-center gap-1">
          <MDBContainer className="my-0 px-0 mx-0 flex-fill d-flex justify-content-center" style={{ maxWidth: '30px' }}>
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="img-fluid rounded-circle shadow-5"
            />
          </MDBContainer>
          <span>{message.username}</span>
          <Timestamp messageTime={message.timeStamp ? message.timeStamp : Number(message.id.slice(0, -20))} />
        </div>
      </MDBCardHeader>
      <MDBCardBody className='px-3 py-1'>
        <MDBCardText>{message.content}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}