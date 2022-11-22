import React, { useEffect, useState } from 'react'
import './Users.css'
import TrUser from './components/TrUser'
import axios from 'axios'
import Loading from '../../../components/Loading'
import remoteHost from '../../../../../Api'
import { showToastMessageError } from '../../../../../App';

const token = JSON.parse(localStorage.getItem('user')).token

const options = {
  method: 'GET',
  url: `${remoteHost}/usuarios`,
  headers: { Authorization: `Bearer ${token}` }
}

const Users = () => {
  const [data, setData] = useState()
  //const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios(options)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="users">
      <input type="search" name="search" id="#userSearch" placeholder='&#xf002;  Pesquisar' />
      <table>
        <tr>
          <th>Código</th>
          <th className='none'>Usuário</th>
          <th>Nome</th>
          <th className='none'>Sobrenome</th>
          <th className='none'>Admin</th>
          <th>Editar/Excluir</th>
        </tr>
        {data && data.map(user => {
          return (
            <TrUser
              code={user.codigo}
              userName={user.login}
              name={user.nome}
              lastName={user.sobrenome}
              admin={user.administador ? 'Sim' : 'Não'}
            />
          )
        })}
      </table>
    </div>
  )
}

export default Users

