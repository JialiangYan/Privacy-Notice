import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [condition, setCondition] = useState(null)

  return (
    <GlobalContext.Provider value={{ condition, setCondition }}>
      {children}
    </GlobalContext.Provider>
  )
}
