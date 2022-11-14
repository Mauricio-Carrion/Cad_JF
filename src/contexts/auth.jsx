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

    const loggedUser = {
      id: null,
      user: null,
      token: null,
    }

    const verifyUser = await axios.post(`${remoteHost}/auth/login`,
      {
        usuario: user,
        senha: password
      })
      .then(res => {
        if (res && res.status === 200) {
          loggedUser = {
            id: res.data.codigo,
            user: res.data.usuario,
            token: res.data.token
          }

          localStorage.setItem('user', JSON.stringify(loggedUser))

          return true
        }
      })
      .catch(err => {
        if (err) {
          showToastMessageError(err.response.data.msg)
        }

        if (err.response.status === 404) {
          navigate('/login/signin')
        }
      })

    if (verifyUser === true) {
      setUser({
        id: loggedUser.id,
        user: loggedUser.user,
      })
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