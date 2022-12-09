import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './SignInForm.css'
import remoteHost from '../../../Api'
import ButtonSubmit from './ButtonSubmit'
import axios from 'axios'
import { showToastMessageError, showToastMessageSucess } from '../../../App';

export default props => {
  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      showToastMessageError('Senhas são diferentes')
      return
    }

    axios.post(`${remoteHost}/usuarios`, {
      usuario: username,
      senha: password,
      nome: name,
      sobrenome: lastname,
      adm: "false"
    })
      .then(res => {
        showToastMessageSucess('Usuário cadastrado!')
        navigate('/login/log')
      })
      .catch(err => {
        if (err) {
          showToastMessageError(err.response.data.msg)
        }
      })
  }

  return (
    <div className='signin'>
      <form id="userForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='&#xf007;   Usuário' />
        <input
          type="password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='&#xf023;   Senha' />
        <input
          type="password"
          name='confirm_password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='&#xf084;   Confirmar senha' />
        <input
          type="text"
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='&#xf2bb;   Nome' />
        <input
          type="text"
          name='lastname'
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='&#xf2b9;   Sobrenome' />
        <ButtonSubmit btnName='Cadastrar' />
      </form>
    </div>
  )
}