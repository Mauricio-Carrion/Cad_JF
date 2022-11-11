import React from 'react'
import './SignInForm.css'

export default props =>
  <div className='signLogin'>
    <form id="userForm">
      <input type="text" name='username' placeholder='&#xf007; Usuário' />
      <input type="password" name='password' placeholder='&#xf023; Senha' />
      <input type="password" name='confirm_password' placeholder='&#xf084; Confirmar senha' />
      <input type="text" name='name' placeholder='&#xf2bb; Nome' />
      <input type="text" name='lastname' placeholder='&#xf2b9; Sobrenome' />
    </form>
  </div>
