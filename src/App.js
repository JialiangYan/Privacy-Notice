import React from 'react'
import Store from './pages/Store'
import Home from './pages/Home'
import Article from './pages/Article'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

export default function App() {
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    // screen size + touch attr + device detection
    if (
      window.innerWidth < 500 &&
      'ontouchstart' in document.documentElement &&
      /iphone/.test(userAgent)
    ) {
      return true
    } else {
      return false
    }
  }

  if (!isMobileDevice()) {
    // forbidden
    return (
      <div id="forbid">
        <h1 id="forbid-info">Sorry, please use iPhone to start the study</h1>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/home" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  )
}
