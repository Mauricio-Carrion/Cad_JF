import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Loading from './pages/home/components/Loading'
import { AuthProvider, AuthContext } from './contexts/auth';

export default () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {

      return <Loading />

    }

    if (!authenticated) {

      return <Navigate to='/login/log' />

    }

    return children
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/*' element=
            {<Private>
              <Home />
            </Private>} />
          <Route exact path='/login/*' element=
            {<Login />} />
        </Routes>
      </AuthProvider>
    </Router >
  )
}
