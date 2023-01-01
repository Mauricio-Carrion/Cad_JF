import React, { useEffect, useState, useContext } from 'react'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios'
import remoteHost from '../../../../../Api'
import { handleLogout } from '../../../../../utils/utils';
import { AuthContext } from '../../../../../contexts/auth';


ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { logout } = useContext(AuthContext)
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
      .catch(err => err.response.status === 400 ? logout() : handleLogout(err))

    axios.get(`${remoteHost}/usuario_cliente`,
      { headers })
      .then(res => setUserDbData(res.data))
      .catch(err => err.response.status === 400 ? logout() : handleLogout(err))

    axios.get(`${remoteHost}/status_card`,
      { headers })
      .then(res => setCardsDbData(res.data))
      .catch(err => err.response.status === 400 ? logout() : handleLogout(err))
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
          <h1>{cardsDbData.usuarios ? cardsDbData.usuarios : 0}</h1>
          <div>
            <h3>Técnicos</h3>
            <h6>Cadastrados</h6>
          </div>
        </div>

        <div className="card card-green">
          <h1>{cardsDbData.clientes ? cardsDbData.clientes : 0}</h1>
          <div>
            <h3>Clientes</h3>
            <h6>Cadastrados</h6>
          </div>
        </div>

        <div className="card card-yellow">
          <h1>{cardsDbData.visitas ? cardsDbData.visitas : 0}</h1>
          <div>
            <h3>Visitas</h3>
            <h6>Efetuadas</h6>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard