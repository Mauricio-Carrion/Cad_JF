import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import './EditClient.css'
import { PencilSquareIcon, CheckIcon, XMarkIcon, PlusCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { showToastMessageSucess } from "../../../../../../App"
import axios from "axios"
import remoteHost from "../../../../../../Api"
import Loading from "../../../../components/Loading"
import Modal from "../../../../components/Modal"
import { handleLogout } from "../../../../../../utils/utils"
import { AuthContext } from "../../../../../../contexts/auth"
import Visit from "./Visit"

const EditClient = () => {
  const searchParams = window.location.search.split('=')[1]
  const [params, setParams] = useState(searchParams)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState('')
  const [visitsData, setVisitsData] = useState('')
  const [oldData, setOldData] = useState('')
  const [userData, setUserData] = useState('')
  const [newVisitData, setNewVisitData] = useState('')
  const [buttonEditStatus, setButtonEditStatus] = useState(!params ? true : false)
  const [changeVisit, setChangeVisit] = useState('')

  const { logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const clientOptions = {
    method: 'GET',
    url: `${remoteHost}/cliente/${params}`,
    headers: headers
  }

  const userOptions = {
    method: 'GET',
    url: `${remoteHost}/usuarios`,
    headers: headers
  }

  const visitOptions = {
    method: 'GET',
    url: `${remoteHost}/visita_cliente/${params}`,
    headers: headers
  }

  const excludeVisit = (value) => {
    setChangeVisit(value)
  }

  useEffect(() => {
    if (params) {
      axios(clientOptions)
        .then(res => setData(res.data))
        .catch(err =>
          err.response.status === 400 ? logout() : handleLogout(err)
        )

      axios(visitOptions)
        .then(res => setVisitsData(res.data))
        .catch(err => {
          if (err.response.status === 404) {
            setVisitsData('')
            return
          }
          handleLogout(err)
        })
    }

    axios(userOptions)
      .then(res => setUserData(res.data))
      .catch(err => err.response.status === 400 ? logout() : handleLogout(err))

    setLoading(false)
  }, [openModal, changeVisit])

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

        if (numbersCNPJ.length <= 14) {
          updatedValue = { cnpj: numbersCNPJ }
        }
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
    if (params) {
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
          usuario: data.tecnico,
          nome: data.nomeFantasia,
          razao: data.razaoSocial,
          cnpj: data.cnpj,
          obs: data.observacao,
          status: data.status
        },
        { headers })
        .then(res => showToastMessageSucess('Cliente atualizado!'))
        .then(setButtonEditStatus(false))
        .catch(err => {
          err.response.status === 400 ? logout() : handleLogout(err)
        })

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
        .then(res => setParams(res.data.codigo))
        .then(showToastMessageSucess('Cliente cadastrado!'))
        .then(setButtonEditStatus(false))
        .catch(err => {
          err.response.status === 400 ? logout() : handleLogout(err)
        })
    }
  }

  const handleAddChange = (e) => {
    let updatedValue = {}
    console.log(e.target.name)
    switch (e.target.name) {
      case 'desc':
        if (e.target.value.length < 50)
          updatedValue = { desc: e.target.value }
        break
      case 'obs':
        if (e.target.value.length < 150)
          updatedValue = { obs: e.target.value }
        break
      case 'date':
        updatedValue = { data: e.target.value }
        break
      default:
    }

    setNewVisitData(data => ({ ...data, ...updatedValue }))
  }

  const handleCancelAddChange = () => {
    setNewVisitData('')
    setOpenModal(false)
  }

  const handleSubmitVisit = async () => {
    await axios.post(
      `${remoteHost}/visitas`,
      {
        cliente: params,
        data: newVisitData.data,
        descricao: newVisitData.descricao,
        obs: newVisitData.obs
      },
      { headers })
      .then(res => showToastMessageSucess('Visita Cadastrada!'))
      .catch(err => {
        err.response.status === 400 ? logout() : handleLogout(err)
      })

    handleCancelAddChange()
  }

  const scrollVisits = () => {
    const scrollContainer = document.querySelector(".visitsLabel div")

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault()
      scrollContainer.scrollLeft += evt.deltaY
    })
  }

  return (
    <div className="editClient">
      <ArrowUturnLeftIcon className="btnBack" onClick={() => navigate('/clients')} title="Voltar" />
      <div className="resume">
        <h3>{data && data.nomeFantasia}</h3>
        <h1>{visitsData.length}</h1>
        <h3>Visitas efetuadas</h3>
      </div>
      {
        loading ? <Loading /> :
          <form className="clientForm">
            <input type="text" name="name" value={data ? data.nomeFantasia : ''} onChange={(e) => handleChange(e)} placeholder="Nome Fantasia" disabled={!buttonEditStatus} />
            <input type="text" name="socialName" value={data ? data.razaoSocial : ''} onChange={(e) => handleChange(e)} placeholder="Razão Social" disabled={!buttonEditStatus} />
            <input type="text" name="cnpj" value={valueCNPJ(data ? data.cnpj : '')} onChange={(e) => handleChange(e)} placeholder="CNPJ" disabled={!buttonEditStatus} />
            <textarea name="obs" value={data ? data.observacao : ''} onChange={(e) => handleChange(e)} placeholder="Observação" disabled={!buttonEditStatus} />
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
                  <XMarkIcon className="buttonCancel" onClick={() => handleCancelEdit()} title="Cancelar edição" />
                </div>
                :
                <PencilSquareIcon className="buttonEdit" onClick={() => handleEdition()} title="Editar" />
            }
          </form>
      }
      <div className="visitsLabel" onMouseOver={scrollVisits}>
        <div className="scrollLabel">
          {
            params
              ?
              <section className="buttonAddVisit">
                <p>Adicionar visita</p>
                < PlusCircleIcon onClick={() => setOpenModal(true)} title='Adicionar visita' />
              </section>
              : ''
          }

          {
            visitsData && visitsData.map(visit => {
              return (
                <Visit key={visit.codigo} code={visit.codigo} desc={visit.descricao} obs={visit.observacao} date={visit.data} exclude={excludeVisit} />
              )
            })
          }

        </div>

        <Modal show={openModal} close={openModal}>
          <h3>Adicionar visita</h3>
          <form className="formAddVisit">
            <input type="text" name="desc" value={newVisitData.desc} onChange={(e) => handleAddChange(e)} placeholder="Descrição" />
            <textarea name='obs' value={newVisitData.obs} onChange={(e) => handleAddChange(e)} placeholder="Observação" />
            <input name="date" type="date" onChange={(e) => handleAddChange(e)} value={newVisitData.date} />

            <div>
              <XMarkIcon className='buttonsAddVisit' title='Cancelar' onClick={handleCancelAddChange} />
              <CheckIcon className='buttonsAddVisit' title='Confirmar' onClick={handleSubmitVisit} />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default EditClient