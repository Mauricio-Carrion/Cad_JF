import React, { useEffect, useState } from "react"
import './EditClient.css'
import { PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from "axios"
import remoteHost from "../../../../../../Api"
import Loading from "../../../../components/Loading"

const EditClient = () => {
  const params = window.location.search.split('=')[1]
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [buttonEditStatus, setButtonEditStatus] = useState(false)
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

  const valueCNPJ = (e) => {
    let v = e.toString().replace(/\D/g, "");

    v = v.replace(/^(\d{2})(\d)/, "$1.$2");

    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    console.log(data.cnpj)

    return v
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

  const handleEdition = () => {
    if (buttonEditStatus) {
      setButtonEditStatus(false)
    } else {
      setButtonEditStatus(true)
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
            <input type="text" name="name" value={data.nomeFantasia} onChange={(e) => handleChange(e)} placeholder="Nome Fantasia" disabled={!buttonEditStatus} />
            <input type="text" name="socialName" value={data.razaoSocial} onChange={(e) => handleChange(e)} placeholder="Razão Social" disabled={!buttonEditStatus} />
            <input type="text" name="cnpj" value={valueCNPJ(data.cnpj)} onChange={(e) => handleChange(e)} placeholder="CNPJ" disabled={!buttonEditStatus} />
            <textarea name="obs" value={data.observacao} onChange={(e) => handleChange(e)} placeholder="Observação" disabled={!buttonEditStatus} />
            <select id="clientStatus" disabled={!buttonEditStatus}>
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

            <select id="usersEdit" disabled={!buttonEditStatus}>
              {
                userData && userData.map(user => {
                  return (
                    <option value={user.codigo} selected={handleSelectTec(user.codigo)}>{user.nome}</option>
                  )
                })
              }
            </select>
            {
              buttonEditStatus
                ?
                <div>
                  <CheckIcon className="buttonEdit" title="Salvar" />
                  <XMarkIcon className="buttonCancel" onClick={() => handleEdition()} title="Cancelar" />
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