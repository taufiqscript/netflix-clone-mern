import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Browse from './pages/Browse'
import Watch from './pages/Watch'
import Register from './pages/Register'
import Login from './pages/Login'
import Favorite from './pages/Favorite'
import Trending from './pages/Trending'
import Movie from './pages/Movie'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/watch/:id",
    element: <Watch />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/favorite",
    element: <Favorite />
  },
  {
    path: "/trending/:moviesTypeTrending/:timeWindow",
    element: <Trending />
  },
  {
    path: "/movie/:moviesTypeUrl",
    element: <Movie />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
