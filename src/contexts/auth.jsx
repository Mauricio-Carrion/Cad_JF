import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import remoteHost from '../Api';
import axios from 'axios'
import { showToastMessageError } from '../App';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(recoveredUser)
      navigate('/')
    }

    setLoading(false)
  }, [])

  const login = async (user, password) => {

    let loggedUser = {
      id: null,
      user: null,
      token: null
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
            userName: res.data.usuario,
            lastName: res.data.sobrenome,
            token: res.data.token
          }

          localStorage.setItem('user', JSON.stringify(loggedUser))

          return true
        }
      })
      .catch(err => {
        if (err) {
          console.log(err)
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
    navigate('/login/log')
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{
      authenticated: !!user, user, loading, login, logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}