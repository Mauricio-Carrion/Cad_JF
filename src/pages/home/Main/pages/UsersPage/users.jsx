import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import TrUser from './components/TrUser'
import axios from 'axios'
import Loading from '../../../components/Loading'
import remoteHost from '../../../../../Api'
import { AuthContext } from '../../../../../contexts/auth'

const Users = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const logout = useContext(AuthContext).logout

  const token = JSON.parse(localStorage.getItem('user')).token

  const options = {
    method: 'GET',
    url: `${remoteHost}/usuarios`,
    headers: { Authorization: `Bearer ${token}` }
  }

  const searchUser = (search) => {
    const trUsers = document.querySelectorAll('tbody tr')
    const arrayTrUsers = [...trUsers]

    arrayTrUsers.filter(e => {
      e.classList.add('tr-none')
      if (e.innerText.includes(search)) {
        e.classList.remove('tr-none')
      }
    })
  }

  useEffect(() => {
    axios(options)
      .then(
        res => setData(res.data))
      .catch(err => console.error(err) /*logout()*/)
    setLoading(false)
  }, [])

  return (
    <div className="users">
      <input type="search" onChange={(e) => searchUser(e.target.value)} name="search" id="#userSearch" placeholder='&#xf002;  Pesquisar' />
      <table>
        <thead>
          <tr>
            <th className='none'>Foto Perfil</th>
            <th>Código</th>
            <th className='none'>Usuário</th>
            <th>Nome</th>
            <th className='none'>Sobrenome</th>
            <th className='none'>Admin</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? <Loading /> :
              data && data.map(user => {
                return (
                  <TrUser
                    code={user.codigo}
                    dbImage={user.imagem}
                    userName={user.login}
                    name={user.nome}
                    lastName={user.sobrenome}
                    admin={user.administador ? 'Sim' : 'Não'}
                  />
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
}


export default Users

