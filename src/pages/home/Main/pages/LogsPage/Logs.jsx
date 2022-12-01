import React, { useState, useEffect } from 'react';
import TrLog from './components/TrLog'
import { showToastMessageError, showToastMessageSucess } from '../../../../../App';
import Loading from '../../../components/Loading';
import axios from 'axios';
import remoteHost from '../../../../../Api';
import './Logs.css'

const Logs = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  const token = JSON.parse(localStorage.getItem('user')).token

  const options = {
    method: 'GET',
    url: `${remoteHost}/logs`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    axios(options)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
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
    <div className="users">
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
                    date={`${log.data.split('T')[0]}  /  ${log.data.split('T')[1]}`}
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