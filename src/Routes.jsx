import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Main from './pages/main/Main';
import Login from './pages/login/Login';
import { AuthProvider, AuthContext } from './contexts/auth';

export default () => {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) {
      return <Navigate to='/login/log' />
    }

    return children
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element=
            {<Private><Main /></Private>} />
          <Route exact path='/login/*' element=
            {<Login />} />
        </Routes>
      </AuthProvider>
    </Router >
  )
}
