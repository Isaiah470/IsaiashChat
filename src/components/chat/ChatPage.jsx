import React, { useEffect, useState, useRef, useLayoutEffect, createContext } from 'react'
import ChatForm from './ChatForm'
import ChatBody from './ChatBody'
import ChatMessage from './ChatMessage'
import ChatUsers from './ChatUsers'
import socket from '../../utils/socket'
import { MDBContainer, MDBRow, MDBCol, } from 'mdb-react-ui-kit';
import SidebarNav from '../SidebarNav'
export const ChatPageContext = createContext(null);
// document.body.style.overflow = "hidden";
// https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
// https://stackoverflow.com/questions/42388989/bootstrap-center-vertical-and-horizontal-alignment
// https://stackoverflow.com/questions/22196587/how-to-vertically-center-a-container-in-bootstrap
export default function ChatPage({ initialRoomId, initialChannelId }) {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [channelId, setChannelId] = useState(initialChannelId);
  useEffect(
    () => {
      function onConnect() {
        socket.emit('changeChannel', { roomId, channelId, online: true, placeholder: true })
      }

      socket.emit('changeChannel', { roomId, channelId, online: true, placeholder: true })
      //socket.emit('getMessages', {query: {roomId, channelId}})
      socket.on('connect', onConnect);
      return () => {
        socket.off('connect', onConnect);
        socket.emit('changeChannel', { roomId, channelId, online: false, placeholder: true })
      };
    }, [])

  return (
    <ChatPageContext.Provider value={{ roomId, channelId, setRoomId, setChannelId }}>

      <MDBContainer className=' ' style={{ border: '1px solid blue', minWidth: '100vw', width: '1px', transform: 'translateY(0px)' }} >
        <MDBRow>

          <SidebarNav side='left' />

          <MDBCol md='8' size='12' className=' ' style={{ paddingInline: '8px 8px' }}>
            <MDBContainer fluid className='d-flex-column' style={{ border: '1px solid red', minHeight: '80vh', height: '1px', margin: '0px', width: '100%', }} >
              <MDBRow className='' style={{ overflow: 'scroll', height: '80%', }} >
                <ChatBody />
              </MDBRow>

              <MDBRow>
                <ChatForm style={{}} />
              </MDBRow>
            </MDBContainer>
          </MDBCol>

          <SidebarNav side='right' />
          {/*<MDBCol md = '2' size= '0' className = 'd-none d-md-flex'>
        <ChatUsers />
      </MDBCol>  */}
        </MDBRow>
      </MDBContainer>

    </ChatPageContext.Provider>
  );
}