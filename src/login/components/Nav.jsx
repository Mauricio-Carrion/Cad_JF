import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

export default props =>
  <nav className="nav">
    <NavLink to="/">
      Login
    </NavLink>

    <NavLink to="/signin">
      Cadastrar
    </NavLink>
  </nav>

