import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const usePreventNavigation = () => {
  useEffect(() => {
    window.onpopstate = function (event) {
      // forbid browser forward/backward
      window.history.forward(1)
    }
  }, [])
}

const PreventNavigation = ({ children }) => {
  usePreventNavigation()
  return children
}

export default PreventNavigation
