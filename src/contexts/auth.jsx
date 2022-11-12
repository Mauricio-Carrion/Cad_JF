import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import remoteHost from '../Api';
import axios from 'axios'
import { showToastMessageError } from '../App';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const login = async (user, password) => {
    const verifyUser = await axios.post(`${remoteHost}/auth/login`,
      {
        usuario: user,
        senha: password
      })
      .then(res => {
        if (res && res.status === 200) {
          localStorage.setItem(`token ${user}`, res.data.token)
          return true
        }
      })
      .catch(err => {
        console.log(err.response.data.msg)
        if (err) {
          showToastMessageError(err.response.data.msg)
        }
      })

    if (verifyUser === true) {
      setUser({ user })
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