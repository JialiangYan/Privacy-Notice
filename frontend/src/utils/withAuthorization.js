import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const withAuthorization = (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const location = useLocation()
    const valid = location.state?.valid
    if (!valid) {
      return (
        <Navigate
          to={localStorage.getItem('prestate')}
          state={{ valid: true }}
        />
      )
    }
    return <WrappedComponent {...props} />
  }

  return WithAuthorization
}

export default withAuthorization
