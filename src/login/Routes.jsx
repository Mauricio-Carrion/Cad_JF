import React from 'react';
import { Routes, Route } from 'react-router';

import LoginForm from './components/LoginForm';
import SignInForm from './components/SignInForm';

export default props =>
  <Routes>
    <Route path='/login' element={<LoginForm />} />
    <Route path='/signin' element={<SignInForm />} />
    <Route path='*' element={<LoginForm />} />
  </Routes>