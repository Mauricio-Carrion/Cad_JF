import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import remoteHost from '../../../../../Api'
import Loading from '../../../components/Loading'
import TrClient from './components/TrClient'
import './Clients.css'

const Clients = () => {
  const navigate = useNavigate()

  const [data, setData] = useState()
  const [OpenAdd, setOpenAdd] = useState(false)
  const [loading, setLoading] = useState(true)

  if (OpenAdd) {
    navigate({
      pathname: '/clients/client'
    });
  }

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
            <th>Nome</th>
            <th className='none'>Razão Social</th>
            <th>Técnico</th>
            <th className='none'>Status</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <Loading /> :
              data && data.map(user =>
                <TrClient
                  code={user.codigo}
                  tec={user.tecnico}
                  clientName={user.nome}
                  razao={user.razaoSocial}
                  cnpj={user.cnpj}
                  status={user.status}
                />
              )
          }
        </tbody>
      </table>
      <PlusCircleIcon onClick={() => setOpenAdd(true)} className='buttonAddClient' title='Adicionar cliente' />
    </div>
  )
}

export default Clients
