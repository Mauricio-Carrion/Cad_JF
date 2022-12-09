import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import './EditClient.css'
import { PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { showToastMessageError, showToastMessageSucess } from "../../../../../../App"
import axios from "axios"
import remoteHost from "../../../../../../Api"
import Loading from "../../../../components/Loading"

const EditClient = () => {
  const params = window.location.search.split('=')[1]
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [oldData, setOldData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [buttonEditStatus, setButtonEditStatus] = useState(!params ? true : false)
  const navigate = useNavigate()

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

  const headers = {
    Authorization: `Bearer ${token}`
  }

  if (params) {
    useEffect(() => {
      axios(clientOptions)
        .then(res => setData(res.data))
        .catch(err => showToastMessageError(err.response.data.msg))
    }, [])
  }

  useEffect(() => {
    axios(userOptions)
      .then(res => setUserData(res.data))
      .catch(err => console.error(err) /*logout()*/)
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    let updatedValue = {}

    switch (e.target.name) {
      case 'name':
        updatedValue = { nomeFantasia: e.target.value }
        break
      case 'socialName':
        updatedValue = { razaoSocial: e.target.value }
        break
      case 'cnpj':
        let numbersCNPJ = [...e.target.value].filter(element => {
          if (element <= 9) {
            return element
          }
        }).join('')

        updatedValue = { cnpj: numbersCNPJ }
        break
      case 'obs':
        updatedValue = { observacao: e.target.value }
        break
      case 'status':
        updatedValue = { status: e.target.value }
        break
      case 'tec':
        updatedValue = { tecnico: e.target.value }
        break
      default:
    }

    setData(data => ({ ...data, ...updatedValue }))
  }

  const valueCNPJ = (e) => {
    if (e) {
      let v = e.toString().replace(/\D/g, "");

      v = v.replace(/^(\d{2})(\d)/, "$1.$2");

      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

      v = v.replace(/(\d{4})(\d)/, "$1-$2");

      return v
    }
  }

  const handleCancelEdit = () => {
    if (data) {

      setData(oldData)
      setButtonEditStatus(false)

    } else {

      navigate('/clients')

    }
  }

  const handleEdition = () => {

    setOldData(data)
    setButtonEditStatus(true)

  }

  const handleSubmit = async () => {
    if (oldData) {

      await axios.put(
        `${remoteHost}/cliente/${params}`,
        {
          nome: data.nomeFantasia,
          razao: data.razaoSocial,
          cnpj: data.cnpj,
          obs: data.observacao,
          status: data.status
        },
        { headers })
        .then(res => showToastMessageSucess(res.data.msg))
        .catch(err => showToastMessageError(err.response.data.msg))

    } else {

      await axios.post(
        `${remoteHost}/clientes`,
        {
          nome: data.nomeFantasia,
          razao: data.razaoSocial,
          cnpj: data.cnpj,
          obs: data.observacao,
          status: data.status
        },
        { headers })
        .then(res => showToastMessageSucess('Cliente cadastrado!'))
        .catch(err => showToastMessageError(err.response.data.msg))

    }

    navigate('/clients')
  }

  return (
    <div className="editClient">
      <div className="resume">
        <h1>{data && data.nomeFantasia}</h1>
        <h3>{ }Visitas Concluídas</h3>

      </div>
      {
        loading ? <Loading /> :
          <form className="clientForm">
            <input type="text" name="name" value={data ? data.nomeFantasia : null} onChange={(e) => handleChange(e)} placeholder="Nome Fantasia" disabled={!buttonEditStatus} />
            <input type="text" name="socialName" value={data ? data.razaoSocial : null} onChange={(e) => handleChange(e)} placeholder="Razão Social" disabled={!buttonEditStatus} />
            <input type="text" name="cnpj" value={valueCNPJ(data ? data.cnpj : null)} onChange={(e) => handleChange(e)} placeholder="CNPJ" disabled={!buttonEditStatus} />
            <textarea name="obs" value={data ? data.observacao : null} onChange={(e) => handleChange(e)} placeholder="Observação" disabled={!buttonEditStatus} />
            <select id="clientStatus" name="status" value={data && data.status} onChange={(e) => handleChange(e)} disabled={!buttonEditStatus}>
              <option value="">
                Selecione Status
              </option>

              <option value="1">
                Em andamento
              </option>

              <option value="2">
                Encerrado pelo cliente
              </option>

              <option value="3">
                Finalizado
              </option>
            </select>

            <select id="usersEdit" name="tec" value={data && data.tecnico} onChange={(e) => handleChange(e)} disabled={!buttonEditStatus}>
              <option value="">
                Selecione Técnico
              </option>
              {
                userData && userData.map(user => {
                  return (
                    <option key={user.codigo} value={user.codigo}>{user.nome}</option>
                  )
                })
              }
            </select>
            {
              buttonEditStatus
                ?
                <div>
                  <CheckIcon className="buttonEdit" title="Salvar" onClick={() => handleSubmit()} />
                  <XMarkIcon className="buttonCancel" onClick={() => handleCancelEdit()} title="Cancelar" />
                </div>
                :
                <PencilSquareIcon className="buttonEdit" onClick={() => handleEdition()} title="Editar" />
            }
          </form>
      }
      <div className="visitsLabel">
        visitas
      </div>
    </div>
  )
}

export default EditClient