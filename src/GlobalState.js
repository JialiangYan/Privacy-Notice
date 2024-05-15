import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // It can be a random num generator in 1-9?
  const condition = 0
  const [tasknum, setTask] = useState(0)

  const addTask = () => {
    setTask(tasknum + 1)
  }

  return (
    <GlobalContext.Provider value={{ condition, tasknum, addTask }}>
      {children}
    </GlobalContext.Provider>
  )
}
