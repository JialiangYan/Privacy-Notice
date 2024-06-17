import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null)

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}

// 自定义钩子来使用上下文
export const useUser = () => {
  return useContext(UserContext)
}
