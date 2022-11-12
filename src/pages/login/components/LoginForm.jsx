import React, { useState, useContext } from 'react';
import { AuthContext, } from '../../../contexts/auth';
import ButtonSubmit from './ButtonSubmit';
import './LoginForm.css'

export default props => {
  const { authenticated, login } = useContext(AuthContext)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    login(username, password)

  }

  return (
    <div className='loginform'>
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='&#xf007;   Usuário'
        />
        <input
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='&#xf023;   Senha'
        />
        <ButtonSubmit btnName='Entrar' />
      </form>
    </div>
  )
}