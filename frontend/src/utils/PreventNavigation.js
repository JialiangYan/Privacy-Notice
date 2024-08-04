import React, { useEffect } from 'react'

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
  return <div>{children}</div>
}

export default PreventNavigation
