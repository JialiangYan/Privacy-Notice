import React from 'react'
import Store from './pages/Store'
import Home from './pages/Home'
import Article from './pages/Article'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

export default function App() {
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
