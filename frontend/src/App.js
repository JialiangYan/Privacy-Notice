import React, { lazy } from 'react'
import PreventNavigation from './utils/PreventNavigation'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const Error = lazy(() => import('./pages/Error'))
const Entry = lazy(() => import('./pages/Entry'))
const Store = lazy(() => import('./pages/Store'))
const Home = lazy(() => import('./pages/Home'))
const Intro1 = lazy(() => import('./pages/Intro/intro1'))
const Intro2 = lazy(() => import('./pages/Intro/intro2'))
const Intro3 = lazy(() => import('./pages/Intro/intro3'))
const Article = lazy(() => import('./pages/Article'))
const Instruct = lazy(() => import('./pages/Instruct'))

export default function App() {
  // const isMobileDevice = () => {
  //   const ua = navigator.userAgent.toLowerCase()
  //   console.log(ua)
  //   const isiPhone = ua.indexOf('iphone') != -1

  //   // screen size + touch attr + device detection
  //   if (
  //     window.innerWidth < 500 &&
  //     'ontouchstart' in document.documentElement &&
  //     !isiPhone
  //   ) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // if (!isMobileDevice()) {
  //   // forbidden
  //   return (
  //     <div id="forbid">
  //       <h1 id="forbid-info">Sorry, please use iPhone to start the study</h1>
  //     </div>
  //   )
  // }

  return (
    <BrowserRouter>
      <PreventNavigation>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route path="/instruction" element={<Instruct />} />
            <Route path="/appstore" element={<Store />} />
            <Route path="/intro1" element={<Intro1 />} />
            <Route path="/intro2" element={<Intro2 />} />
            <Route path="/intro3" element={<Intro3 />} />
            <Route path="/home" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
        </AnimatePresence>
      </PreventNavigation>
    </BrowserRouter>
  )
}
