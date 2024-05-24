import React, { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  // It can be a random num generator in 1-9?
  const [tasknum, setTask] = useState(0)
  const [notice, setNotice] = useState({
    intro: true,
    firstuse: true,
    duringuse: true,
  })

  const addTask = () => {
    setTask(tasknum + 1)
  }

  const updateNotice = (notice) => {
    setNotice((prevNotice) => ({ ...prevNotice, ...notice }))
  }

  return (
    <GlobalContext.Provider value={{ tasknum, addTask, notice, updateNotice }}>
      {children}
    </GlobalContext.Provider>
  )
}
