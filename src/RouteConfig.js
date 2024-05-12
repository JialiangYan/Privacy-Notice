import React from 'react'
import Store from './pages/Store'
import Intro from './pages/Intro'
import Home from './pages/Home'
import Article from './pages/Article'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

export default function RouteConfig() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Store />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </AnimatePresence>
  )
}
