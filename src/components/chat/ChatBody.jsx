import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ChatMessage from './ChatMessage'
import socket from '../../utils/socket'
export default function ChatBody() {
  const [messages, setMessages] = useState([]);

  const updateMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  }
  const updateManyMessages = (data) => {
    const removedDuplicates = Array.from(new Set([...messages, ...data.messages].map(JSON.stringify)), JSON.parse)
    setMessages((messages) => removedDuplicates.sort((a, b) => {
      const aTime = a.timeStamp ? a.timeStamp : Number(a.id.slice(0, -20));
      const bTime = b.timeStamp ? b.timeStamp : Number(b.id.slice(0, -20));
      return aTime - bTime;
    }));
  }

  useEffect(() => {
    socket.on('response message', updateMessage);
    socket.on('user.get.messages', updateManyMessages)
    return () => {
      socket.off('response message', updateMessage);
      socket.off('user.get.messages', updateManyMessages);
    };
  }, [socket, messages]);

  const chatRef = useRef(null);
  useLayoutEffect(() => {
    const currChat = chatRef.current
    setTimeout(function() {
      // if currChat.scrollTop - currChat.scrollHeight <= 100px
      if (currChat) currChat.scrollTop = currChat.scrollHeight;
    }, 10);
  }, [messages]);

  return (

    <div ref={chatRef} style={{ overflow: 'scroll', height: '100%', width: '100%', marginLeft: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
      {messages.map((message) =>
        <ChatMessage key={message.id} message={message} />)
      }
    </div>

  );
}