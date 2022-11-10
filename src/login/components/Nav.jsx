import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

export default props =>
  <nav className="nav">
    <Link to="/login">
      Login
    </Link>

    <Link to="/signin">
      Cadastrar
    </Link>
  </nav>

