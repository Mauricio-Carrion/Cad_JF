import React, { useEffect, useState } from 'react'
import axios from 'axios'
import remoteHost from '../../../../../Api'
import Loading from '../../../components/Loading'
import TrClient from './components/TrClient'
import './Clients.css'

const Clients = () => {

  const [data, setData] = useState()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = JSON.parse(localStorage.getItem('user')).token

  const searchClient = (search) => {
    const trClients = document.querySelectorAll('tbody tr')
    const arrayTrClients = [...trClients]

    arrayTrClients.filter(e => {
      e.classList.add('tr-none')
      if (e.innerText.includes(search)) {
        e.classList.remove('tr-none')
      }
    })
  }

  const clientOptions = {
    method: 'GET',
    url: `${remoteHost}/clientes`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    axios(clientOptions)
      .then(
        res => setData(res.data))
      .catch(err => console.error(err) /*logout()*/)
    setLoading(false)
  }, [])

  return (
    <div className="table">
      <input type="search" onChange={(e) => searchClient(e.target.value)} name="search" id="#userSearch" placeholder='&#xf002;  Pesquisar' />
      <table>
        <thead>
          <tr>
            <th className='none'>Código</th>
            <th>Técnico</th>
            <th>Nome</th>
            <th className='none'>Razão Social</th>
            <th className='none'>Status</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <Loading /> :
              data && data.map(user => {
                return (
                  <TrClient
                    code={user.codigo}
                    tec={user.tecnico}
                    clientName={user.nome}
                    razao={user.razaoSocial}
                    cnpj={user.cnpj}
                    status={user.status}
                  />
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Clients
