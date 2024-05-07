import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Store from './pages/Store'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Article from './pages/Article'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Store />,
  },
  {
    path: '/intro',
    element: <Intro />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/article',
    element: <Article />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
