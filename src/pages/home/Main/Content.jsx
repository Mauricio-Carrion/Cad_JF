import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Content.css'

import Dashboard from './pages/DashboardPage/Dashboard'
import Users from './pages/UsersPage/Users'
import Clients from './pages/ClientsPage/Clients'
import Visits from './pages/VisitPage/Visits'
import Logs from './pages/LogsPage/Logs'

const Content = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/visits" element={<Visits />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  )
}

export default Content