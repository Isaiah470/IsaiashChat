import React, { useState, useContext } from 'react';
import { MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';
import socket from '../../utils/socket';
import { ChatPageContext } from './ChatPage';
export default function ChatForm({ }) {
  const [numRows, setRows] = useState(3);
  const [chatText, setChat] = useState('');
  const { roomId, setRoomId, channelId, setChannelId, } = useContext(ChatPageContext);
  const handleInput = (e) => {
    setChat(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('enter press here! ');
      sendMessage();
    }
  }
  const sendMessage = () => {
    const message = chatText;
    console.log(message);
    console.log(localStorage.getItem('id'));
    const senderName = localStorage.getItem('id');
    socket.emit('message', {
      content: message,
      name: senderName ? senderName : 'noone',
      //localStorage.getItem('token')?.id,
      id: `${Date.now()}${socket.id}`,
      socketID: socket.id,
      roomId, channelId,

    });
    setChat('');

  }
  return (
    <div style={{ width: '100%', marginLeft: '0px', paddingLeft: '0px', paddingRight: '0px', }}>
      <MDBTextArea label='Message' id='textAreaExample' rows={numRows} onKeyPress={handleKeyPress} value={chatText} onChange={handleInput} />
      <MDBBtn onClick={sendMessage}>
        Send Message
      </MDBBtn>
    </div>
  )
}