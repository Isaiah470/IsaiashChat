import React from 'react';
import Navbar from './Navbar';
import Comment from './post/Comment';
import ChatPage from './chat/ChatPage';
import PostCard from './post/PostCard'
import ListWrapper from './post/ListWrapper'
import PostForm from './post/PostForm'
import NavPages from './post/NavPages'
import Logo from '../img/StylishDragon.svg';
import Settings from '../utils/Settings';
import SettingsTabs from '../utils/SettingsTabs'
import {getRoll, makeArray, getPayout} from '../GameLogic/slots'
import BlackjackUI from '../GameLogic/BlackjackUI'
import SlotsUI from '../GameLogic/SlotsUI'
import {Outlet} from "react-router-dom"
export default function Home() {
  //Image by <a href="https://www.freepik.com/free-vector/flat-design-dragon-silhouette_28720829.htm#query=japanese%20dragon&position=1&from_view=keyword&track=ais">Freepik</a>
  /*console.log("bro")
  console.log(getRoll(10))
  let x = makeArray(1, 1, getRoll(1))
  console.log(x)
  console.log(getPayout(1, 1, x, 1)) */
  return (
    <>

      {/*<BlackjackUI /> */}
      {/*<SlotsUI /> */} 
      <div style = {{overflow: 'auto', top: '0', left: '0', position: 'fixed', width: '100vw', 
      height: '100vh', opacity: '0.1', userSelect: 'none'}}>
      <img src={Logo} alt="Logo" className = 'img-fluid'/>
      </div>  
      <Navbar />
      <Outlet />
      <div>
        Message to Isaiah: 
        Server is up, ur right github can't do server, so it is on render.com which is blocked by school.
        login, register work, in the navbar there is new links to chat and posts.
        In the dropdown there is also link to settings. 
        Works on dev at least, may not work on deployed. 
        also the reload issue is partially solved. reload will work (because it gets cached), but if you type
        in url directly it will give 404.
        https://vitejs.dev/guide/static-deploy#github-pages if you do this it might solve
        the url issue but that is not very important 
      </div>
      
      {/*<Post postId={1} spaceId = {1}/>*/}
      {/*<Settings /> */} 
      {/*<SettingsTabs />*/}
      {/* <ChatPage initialRoomId = {1} initialChannelId = {1}/>  */}
      {/*<PostForm /> */} 
      
     {/* <ListWrapper isPost={true} isChildren={true} query={{ "isPost": null, postId: 1, spaceId: 1, startNum: 0, getNum: 1000, isTree: true }} postId={1} spaceId={1} sortMeth={'bottom'} isTree={true} /> */}
      
      {/* <ListWrapper isPost={true} isChildren={true} query={{ "isPost": null, postId: 1, spaceId: 1, startNum: 0, getNum: 1000, isTree: false }} postId={1} spaceId={1} sortMeth={'bottom'} isTree={false} />*/}
      {/*<ListWrapper isPost = {false} isChildren = {false} query = {{"isPost": true, spaceId: 1, startNum: 0, getNum: 1000 }} sortMeth = {'old'}/>  */}
      {/*<NavPages numPages = {12} currPageProp = {6}/> */}
    </>
  )
}