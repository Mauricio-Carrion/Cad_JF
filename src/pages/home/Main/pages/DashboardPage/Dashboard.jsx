import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios'
import remoteHost from '../../../../../Api'

ChartJS.register(ArcElement, Tooltip, Legend, autocolors);

const Dashboard = () => {
  const [statusDbData, setStatusDbData] = useState('')
  const [userDbData, setUserDbData] = useState('')
  const [cardsDbData, setCardsDbData] = useState('')

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

    axios.get(`${remoteHost}/status_card`,
      { headers })
      .then(res => setCardsDbData(res.data))
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
    return Math.floor(Math.random() * 255 - 100 + 100)
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
          <h1>Status dos clientes</h1>
          <Doughnut data={statusData} />
        </div>

        <div className="clientsByUser">
          <h1>Clientes por técnico</h1>
          <Pie data={tecnData} />
        </div>
      </div>

      <div className="cards">
        <div className="card card-red">
          <h2>{cardsDbData.usuarios ? cardsDbData.usuarios : 0}</h2>
          <div>
            <h3>Técnicos</h3>
            <h6>Cadastrados</h6>
          </div>
        </div>

        <div className="card card-green">
          <h2>{cardsDbData.clientes ? cardsDbData.clientes : 0}</h2>
          <div>
            <h3>Clientes</h3>
            <h6>Cadastrados</h6>
          </div>
        </div>

        <div className="card card-yellow">
          <h2>{cardsDbData.visitas ? cardsDbData.visitas : 0}</h2>
          <div>
            <h3>Visitas</h3>
            <h6>Cadastradas</h6>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard