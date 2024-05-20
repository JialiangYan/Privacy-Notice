import React from 'react'

import Store from './pages/Store'
import Home from './pages/Home'
import Intro1 from './pages/Intro/intro1'
import Intro2 from './pages/Intro/intro2'
import Intro3 from './pages/Intro/intro3'
import Article from './pages/Article'

import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

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
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/intro1" element={<Intro1 />} />
          <Route path="/intro2" element={<Intro2 />} />
          <Route path="/intro3" element={<Intro3 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}
