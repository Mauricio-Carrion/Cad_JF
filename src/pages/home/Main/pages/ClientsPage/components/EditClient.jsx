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

  const handleChange = (e) => {
    let updatedValue = {};

    switch (e.target.name) {
      case 'name':
        updatedValue = { nomeFantasia: e.target.value }
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

  const handleSelectStatus = (status) => {
    if (data.status == status) {
      return true
    } else {
      return false
    }
  }

  const handleSelectTec = (userCode) => {
    if (userCode == data.tecnico) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="editClient">
      <div className="resume">
        <span>{data && data.nomeFantasia}</span>
        <span>{data && data.nomeFantasia}</span>
        <span>{data && data.nomeFantasia}</span>
      </div>

      {
        loading ? <Loading /> : data &&
          <form className="clientForm">
            <input type="text" name="name" value={data.nomeFantasia} onChange={(e) => handleChange(e)} placeholder="Nome Fantasia" />
            <input type="text" name="socialName" value={data.razaoSocial} onChange={(e) => handleChange(e)} placeholder="Razão Social" />
            <input type="text" name="cnpj" value={data.cnpj} onChange={(e) => handleChange(e)} placeholder="CNPJ" />
            <textarea name="obs" value={data.observacao} onChange={(e) => handleChange(e)} placeholder="Observação" />
            <select id="clientStatus">
              <option value="1" selected={handleSelectStatus(1)}>
                Em andamento
              </option>

              <option value="2" selected={handleSelectStatus(2)}>
                Encerrado pelo cliente
              </option>

              <option value="3" selected={handleSelectStatus(3)}>
                Finalizado
              </option>
            </select>

            <select id="usersEdit">
              {
                userData && userData.map(user => {
                  return (
                    <option value={user.codigo} selected={handleSelectTec(user.codigo)}>{user.nome}</option>
                  )
                })
              }
            </select>
          </form>
      }
      <div className="visitsLabel">
        visitas
      </div>
    </div>
  )
}

export default EditClient