import socket from './utils/socket'
import {useState, useEffect} from 'react'


export default function App({children}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  useEffect(() => {
    function onConnect() {
      console.log("Connected to Server");
      console.log(socket.signedIn);
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Disconnected to Server");
      setIsConnected(false);
    }
    socket.auth = {token: {id: localStorage.getItem('id'), sessionID: localStorage.getItem('sessionID'), password: localStorage.getItem('password')}}
    socket.connect(); 
    /* socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
      }
    });*/
    socket.on('connect', onConnect); 
    socket.on('disconnect', onDisconnect); 
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  
  return (
    <>
      {children}
    </>
    //<FormValidate />
   // <Login socket = {socket}/>
      // <ChatPage socket = {socket}/>
  )
}
