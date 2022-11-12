import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default props =>
  <nav className="nav">
    <NavLink to="/login/log">
      Login
    </NavLink>

    <NavLink to="/login/signin">
      Cadastrar
    </NavLink>
  </nav>

