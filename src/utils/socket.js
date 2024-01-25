import { io } from "socket.io-client";
import { createContext } from 'react';
const URL = "https://socketserver-dico.onrender.com/";
const socket = io(URL, { autoConnect: false });
console.log("started")

socket.onAny((event, ...args) => {
  console.log(event, args);
}); 


export default socket;