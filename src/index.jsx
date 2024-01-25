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
import Navbar from './components/Navbar'
import Home from './components/Home';
import ErrorPage from './pages/ErrorPage';
import Grid2048Wrapper from './GameLogic/2048/Grid2048Wrapper'
import Grid from './GameLogic/Crossword/Grid'
import BlackjackUI from './GameLogic/BlackjackUI'
import SlotsUI from './GameLogic/SlotsUI'
import PostForm from './components/post/PostForm'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Games",
        element: <Games />,
      }, 
      {
        path: "2048",
        element: <Grid2048Wrapper />
      },
      {
        path: "Crossword",
        element: <Grid />
      },
      {
        path: "IBlackjack",
        element: <BlackjackUI />
      },
      {
        path: "Game/Slots",
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

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
    <RouterProvider router={router} />
    </App>
  </React.StrictMode>
)