import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Login />
    ),
  },
  {
    path: "/home",
    element: (
      <Home />
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
