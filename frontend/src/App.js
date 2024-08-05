import React, { Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import PreventNavigation from './utils/PreventNavigation'
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const Loading = lazy(() => import('./components/Loading'))
const Error = lazy(() => import('./pages/Error'))
const Entry = lazy(() => import('./pages/Entry'))
const Store = lazy(() => import('./pages/Store'))
const Home = lazy(() => import('./pages/Home'))
const Intro1 = lazy(() => import('./pages/Intro/intro1'))
const Intro2 = lazy(() => import('./pages/Intro/intro2'))
const Intro3 = lazy(() => import('./pages/Intro/intro3'))
const Article = lazy(() => import('./pages/Article'))
const Instruct = lazy(() => import('./pages/Instruct'))

const router = createBrowserRouter([
  {
    element: <Entry />,
    path: '/',
  },
  {
    element: <Instruct />,
    path: '/inst',
  },
  {
    element: <Store />,
    path: '/appstore',
  },
  {
    element: <Intro1 />,
    path: '/quicknews/intro1',
  },
  {
    element: <Intro2 />,
    path: '/quicknews/intro2',
  },
  {
    element: <Intro3 />,
    path: '/quicknews/intro3',
  },
  {
    element: <Home />,
    path: '/quicknews/home',
  },
  {
    element: <Article />,
    path: '/quicknews/article/:id',
  },
  {
    path: '*', // 404 NOTFOUND
    element: <Error />,
  },
])

export default function App() {
  const isMobileDevice = () => {
    const ua = navigator.userAgent
    const isiPhone = ua.indexOf('iPhone') != -1
    if ('ontouchstart' in document.documentElement && isiPhone) {
      return true
    } else {
      return false
    }
  }

  if (!isMobileDevice()) {
    return (
      <div id="forbid">
        <h1 id="forbid-info">
          Sorry, please use iPhone to participate in the study
        </h1>
      </div>
    )
  }
  return (
    <div>
      <PreventNavigation>
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router}>
              <ScrollRestoration />
            </RouterProvider>
          </Suspense>
        </AnimatePresence>
      </PreventNavigation>
    </div>
  )
}
