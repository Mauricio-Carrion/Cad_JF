import React from 'react'
import './SignInForm.css'

export default props =>
  <div className='signLogin'>
    <form id="userForm">
      <input type="text" name='username' />
      <input type="password" name='password' />
      <input type="password" name='confirm_password' />
      <input type="text" name='name' />
      <input type="text" name='lastname' />
    </form>
  </div>
