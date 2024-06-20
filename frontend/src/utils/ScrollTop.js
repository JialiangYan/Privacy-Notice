import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
