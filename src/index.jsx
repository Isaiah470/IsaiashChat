import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App';
import Login from './pages/Login';
import Games from './pages/Games'
import Settings from './utils/Settings'
import Navbar from './components/Navbar'
import Home from './components/Home';
import ErrorPage from './pages/ErrorPage';
import Grid2048Wrapper from './GameLogic/2048/Grid2048Wrapper'
import Grid from './GameLogic/Crossword/Grid'
import BlackjackUI from './GameLogic/BlackjackUI'
import SlotsUI from './GameLogic/SlotsUI'
import PostForm from './components/post/PostForm'
import ChatPage from './components/chat/ChatPage'
import ListWrapper from './components/post/ListWrapper'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Settings",
        element: <Settings />,
      },
      {
        path: "Games",
        element: <Games />,
      }, 
      {
        path: "Chat",
        element: <ChatPage initialRoomId = {1} initialChannelId = {1}/> ,
      },
      {
        path: "Posts",
        element: <ListWrapper isPost = {false} isChildren = {false} query = {{"isPost": true, spaceId: 1, startNum: 0, getNum: 1000 }} sortMeth = {'old'}/>
      },
      {
        path: "Post/:id", 
        loader: ({ params }) => {
          console.log(params.id)
          return null;
        }, 
        action: ({ params }) => {},  
        element: <ListWrapper isPost={true} isChildren={true} 
        query={{ "isPost": null, postId: 1, spaceId: 1, startNum: 0, getNum: 1000, isTree: true }} 
        postId={1} spaceId={1} sortMeth={'bottom'} isTree={true} /> 
      },
      {
        path: "Games/2048",
        element: <Grid2048Wrapper />
      },
      {
        path: "Games/Crossword",
        element: <Grid />
      },
      {
        path: "Games/Blackjack",
        element: <BlackjackUI />
      },
      {
        path: "Games/Slots",
        element: <SlotsUI />
      },
      {

        path: "create_post",
        element: <PostForm />

      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Navbar />,
    errorElement: <ErrorPage />,
  },

  
], {basename: "/IsaiashChat/", });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
    <RouterProvider router={router} />
    </App>
  </React.StrictMode>
)
/*
how to fix vite random stuff: need to set up actions workflow https://vitejs.dev/guide/static-deploy#github-pages
guide to get images: https://vitejs.dev/guide/assets
must add comments, posts, view, and settings
change scrollbar style
fix deploy url
fix click link go to comments
*/