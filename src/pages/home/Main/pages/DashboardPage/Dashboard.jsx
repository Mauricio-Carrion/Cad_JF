import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'
import remoteHost from '../../../../../Api'

ChartJS.register(ArcElement, Tooltip, Legend, autocolors);

const Dashboard = () => {
  const [statusDbData, setStatusDbData] = useState('')
  const [userDbData, setUserDbData] = useState('')
  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  useEffect(() => {
    axios.get(`${remoteHost}/cliente_status`,
      { headers })
      .then(res => setStatusDbData(res.data))
      .then()
      .catch(err => console.log(err))

    axios.get(`${remoteHost}/usuario_cliente`,
      { headers })
      .then(res => setUserDbData(res.data))
      .then()
      .catch(err => console.log(err))
  }, [])

  let chartStatus = statusDbData && statusDbData.map(status => status.qtd)

  const statusData = {
    labels: ['Em andamento', 'Encerrado pelo cliente', 'Finalizado'],
    datasets: [
      {
        label: 'Clientes',
        data: chartStatus,
        backgroundColor: [
          '#FEC771',
          '#EB7070',
          '#64E291',
        ],
        borderColor: [
          '#FEC771',
          '#EB7070',
          '#64E291'
        ],
        borderWidth: 1,
      },
    ],
  };

  const randomColor = () => {
    return Math.floor(Math.random() * 255) + 1
  }

  let usersNames = userDbData && userDbData.map(user => user.usuario)
  let clientsQtd = userDbData && userDbData.map(user => user.qtdClientes)

  let randomRgb = userDbData && userDbData.map(user => {
    return (
      `RGB(${randomColor()},${randomColor()},${randomColor()})`
    )
  })

  const tecnData = {
    labels: usersNames,
    datasets: [
      {
        label: 'Clientes',
        data: clientsQtd,
        backgroundColor: randomRgb,
        borderColor: randomRgb,
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
          <Doughnut data={tecnData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard