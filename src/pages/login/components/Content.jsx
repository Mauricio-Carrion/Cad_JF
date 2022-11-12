import React from 'react';
import './Content.css'
import Logo from './Logo';
import { Routes, Route } from 'react-router';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';


export default props =>

  <main className="content">
    <Logo />
    <Routes>
      <Route path="/log" element={<LoginForm />} />
      <Route path="/signin" element={<SignInForm />} />
    </Routes>
  </main>
