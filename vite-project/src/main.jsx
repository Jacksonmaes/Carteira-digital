import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import NewTransaction from './pages/NewTransaction.jsx'
const router =createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/transactions/:type",
    element: <NewTransaction />
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider route={router} />
  </React.StrictMode>,
)
