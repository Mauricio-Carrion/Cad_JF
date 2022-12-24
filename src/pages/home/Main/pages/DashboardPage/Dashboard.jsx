import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const statusData = {
    labels: ['Encerrado pelo cliente', 'Em andamento', 'Finalizado'],
    datasets: [
      {
        label: '# of Votes',
        data: [100, 0, 0],
        backgroundColor: [
          '#EB7070',
          '#FEC771',
          '#64E291',
        ],
        borderColor: [
          '#EB7070',
          '#FEC771',
          '#64E291'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="charts">
        <div className="clientStatus">
          <h1>Status</h1>
          <Doughnut data={statusData} />
        </div>

        <div className="clientsByUser">
          <h1>Técnicos</h1>
          <Doughnut data={statusData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard