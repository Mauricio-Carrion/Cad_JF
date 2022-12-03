import React, { useEffect, useState } from "react"
import './EditClient.css'
import axios from "axios"
import remoteHost from "../../../../../../Api"
import Loading from "../../../../components/Loading"

const EditClient = () => {
  const params = window.location.search.split('=')[1]
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [userData, setUserData] = useState(null)

  const token = JSON.parse(localStorage.getItem('user')).token

  const clientOptions = {
    method: 'GET',
    url: `${remoteHost}/cliente/${params}`,
    headers: { Authorization: `Bearer ${token}` }
  }

  const userOptions = {
    method: 'GET',
    url: `${remoteHost}/usuarios`,
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    axios(clientOptions)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios(userOptions)
      .then(
        res => setUserData(res.data))
      .catch(err => console.error(err) /*logout()*/)
    setLoading(false)
  }, [])

  console.log(userData)

  const handleChange = (e) => {
    let updatedValue = {};

    switch (e.target.name) {
      case 'name':
        updatedValue = { nomeFantasia: e.target.value }
        //setData(data => ({ ...data, ...updatedValue }))
        break
      case 'socialName':
        updatedValue = { razaoSocial: e.target.value }
        break
      case 'cnpj':
        updatedValue = { cnpj: e.target.value }
        break
      case 'obs':
        updatedValue = { observacao: e.target.value }
    }

    setData(data => ({ ...data, ...updatedValue }))
  }

  const handleSelect = () => {

  }

  return (
    <div className="editClient">
      {
        loading ? <Loading /> : data &&
          <form className="clientForm">
            <input type="text" name="name" value={data.nomeFantasia} onChange={(e) => handleChange(e)} />
            <input type="text" name="socialName" value={data.razaoSocial} onChange={(e) => handleChange(e)} />
            <input type="text" name="cnpj" value={data.cnpj} onChange={(e) => handleChange(e)} />
            <textarea name="obs" value={data.observacao} onChange={(e) => handleChange(e)} />
            <select id="clientStatus" onChange={handleSelect}>
              <option value="Finalizado">Finalizado</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Finalizado pelo cliente">Finalizado pelo cliente</option>
            </select>

            <select id="usersEdit" onChange={handleSelect}>
              {
                userData && userData.map(user => {
                  return (
                    <option value={user.codigo}>{user.nome}</option>
                  )
                })
              }
            </select>
          </form>
      }
    </div>
  )
}

export default EditClient