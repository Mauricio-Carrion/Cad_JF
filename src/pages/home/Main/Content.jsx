import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuContext } from '../Nav/SideHeader'
import './Content.css'

import Dashboard from './pages/DashboardPage/Dashboard'
import Users from './pages/UsersPage/Users'
import Clients from './pages/ClientsPage/Clients'
import EditClient from './pages/ClientsPage/components/EditClient';
import Logs from './pages/LogsPage/Logs'

const Content = () => {
  const { value } = useContext(MenuContext)

  return (
    <div className="content" onClick={value()}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/client" element={<EditClient />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  )
}

export default Content