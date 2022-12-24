import React, { useState, useEffect, useContext } from 'react';
import TrLog from './components/TrLog'
import { formatDate } from '../../../../../utils/utils';
import Loading from '../../../components/Loading';
import axios from 'axios';
import remoteHost from '../../../../../Api';
import { handleLogout } from '../../../../../utils/utils';
import './Logs.css'
import { AuthContext } from '../../../../../contexts/auth';

const Logs = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const { logout } = useContext(AuthContext)

  const token = JSON.parse(localStorage.getItem('user')).token

  const options = {
    method: 'GET',
    url: `${remoteHost}/logs`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    axios(options)
      .then(res => setData(res.data))
      .catch(err => err.response.status === 400 ? logout() : handleLogout(err))
    setLoading(false)
  }, [])

  const searchLog = (search) => {
    const trLogs = document.querySelectorAll('tbody tr')
    const arrayTrLogs = [...trLogs]

    arrayTrLogs.filter(e => {
      e.classList.add('tr-none')
      if (e.innerText.includes(search)) {
        e.classList.remove('tr-none')
      }
    })
  }

  return (
    <div className="table">
      <input type="search" onChange={(e) => searchLog(e.target.value)} name="search" id="#userSearch" placeholder='&#xf002;  Pesquisar' />
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <Loading /> :
              data && data.map(log => {
                return (
                  <TrLog
                    code={log.codigo}
                    type={log.tipo}
                    user={log.descricao}
                    date={formatDate(log.data)}
                  />
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Logs