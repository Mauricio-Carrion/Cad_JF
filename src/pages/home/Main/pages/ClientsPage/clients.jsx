import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircleIcon, FunnelIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { showToastMessageError } from '../../../../../App'
import { AuthContext } from '../../../../../contexts/auth'
import axios from 'axios'
import remoteHost from '../../../../../Api'
import Loading from '../../../components/Loading'
import TrClient from './components/TrClient'
import './Clients.css'
import Filter from '../../../components/Filter'

const Clients = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [userData, setUserData] = useState('')
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [openFilter, setOpenFilter] = useState(false)
  const [filterTec, setFilterTec] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = { Authorization: `Bearer ${token}` }

  const userOptions = {
    method: 'GET',
    url: `${remoteHost}/usuarios`,
    headers: headers
  }

  const clientOptions = {
    method: 'GET',
    url: `${remoteHost}/clientes`,
    headers: headers
  }

  const OpenAdd = () => {
    navigate({
      pathname: '/clients/client'
    });
  }

  const searchClient = (search) => {
    const trClients = document.querySelectorAll('tbody tr')
    const arrayTrClients = [...trClients]

    arrayTrClients.filter(e => {
      e.classList.add('tr-none')

      if (e.children[0].innerHTML.includes(search)) {
        e.classList.remove('tr-none')
      }
    })
  }

  useEffect(() => {
    axios(clientOptions)
      .then(
        res => setData(res.data))
      .catch(err => err.response.status ? logout() : showToastMessageError(err.response.data.msg))

    axios(userOptions)
      .then(res => setUserData(res.data))
      .catch(err => console.error(err))
    setLoading(false)
  }, [])

  const toggleFilter = () => {
    if (openFilter) {
      setOpenFilter(false)
    } else {
      setOpenFilter(true)
    }
  }

  const handleFilter = (e) => {
    e.preventDefault()
    const trClients = document.querySelectorAll('tbody tr')
    const arrayTrClients = [...trClients]

    switch (e.target.name) {
      case 'cleanFilter':
        setFilterTec('')
        setFilterStatus('')

        arrayTrClients.filter(client => {

          client.classList.remove('tr-none')

        })
        break
      case 'submitFilter':
        arrayTrClients.filter(client => {
          client.classList.add('tr-none')
          if (client.children[2].innerText.includes(filterTec) && client.children[3].innerText.includes(filterStatus)) {

            client.classList.remove('tr-none')

          }
        })
        break
      default:
    }
  }



  return (
    <div className="table">
      <div>
        <input type="search" onChange={(e) => searchClient(e.target.value)} name="search" id="#userSearch" placeholder='&#xf002;  Pesquisar' />
        <FunnelIcon className='funnelIcon' title='Filtrar' onClick={toggleFilter} />
        {
          openFilter
            ?
            <Filter>
              <form className='formFilter'>
                <select id="filterTec" name="filterTec" value={filterTec} onChange={(e) => setFilterTec(e.target.value)}>
                  <option value="">Técnico</option>
                  {
                    userData && userData.map(user => {
                      return (
                        <option value={user.nome}>{user.nome}</option>
                      )
                    })
                  }
                </select>

                <select id="filterStatus" name="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Status</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Encerrado pelo cliente">Encerrado pelo cliente</option>
                  <option value="Finalizado">Finalizado</option>
                </select>

                <div>
                  <button name='cleanFilter' className='btnFilter' onClick={(e) => handleFilter(e)} title='Limpar'>
                    Limpar
                  </button>

                  <button name='submitFilter' className='btnFilter' onClick={(e) => handleFilter(e)} title='Aplicar'>
                    Aplicar
                  </button>
                </div>
              </form>
            </Filter>
            : ''
        }
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th className='none'>Razão Social</th>
            <th>Técnico</th>
            <th className='none thStatus'>Status</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <Loading /> :
              data && data.map(user =>
                <TrClient
                  key={user.codigo}
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
      <PlusCircleIcon onClick={OpenAdd} className='buttonAddClient' title='Adicionar cliente' />
    </div >
  )
}

export default Clients
