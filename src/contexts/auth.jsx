import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const login = (user, password) => {
    if (password === '123') {
      setUser({ id: '1234', user })
      navigate('/')
    }

  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{
      authenticated: !!user, user, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}