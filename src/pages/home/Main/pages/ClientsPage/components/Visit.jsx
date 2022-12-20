import React, { useState, useContext } from 'react'
import { PencilIcon, XCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import Modal from '../../../../components/Modal'
import { formatInputDate } from '../../../../../../utils/utils'
import { showToastMessageError, showToastMessageSucess } from '../../../../../../App'
import remoteHost from '../../../../../../Api'
import axios from 'axios'
import { AuthContext } from "../../../../../../contexts/auth"
import './Visit.css'

const Visit = (props) => {
  const [openEditModal, setEditModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState(props)
  const [editData, setEditData] = useState(data)
  const { logout } = useContext(AuthContext)

  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const handleLogout = (err) => {
    if (err.status == 400) {
      logout()
    }
  }

  const handleEditChange = (e) => {
    let updatedValue = {}

    switch (e.target.name) {
      case 'desc':
        updatedValue = { desc: e.target.value }
        break
      case 'obs':
        updatedValue = { obs: e.target.value }
        break
      case 'date':
        updatedValue = { date: e.target.value }
        break
      default:
    }

    setEditData(data => ({ ...data, ...updatedValue }))
  }

  const cancelEdit = () => {
    setEditData(data)
    setEditModal(false)
  }

  const handleEditVisit = async () => {
    await axios.put(
      `${remoteHost}/visitas`,
      {
        data: editData.date,
        descricao: editData.desc,
        obs: editData.obs
      },
      { headers })
      .then(res => showToastMessageSucess('Visita Cadastrada!'))
      .catch(err => {
        handleLogout(err)
        showToastMessageError(err.response.data.msg)
      })
  }

  return (
    <section id={`visit-${data.code}`} className="visit">
      <div className='mainVisit'>
        <h3>{data.desc}</h3>
        <p>{data.obs}</p>
        <h6>{`Data: ${data.date}`}</h6>
        <div className="btns-visit">
          <PencilIcon onClick={() => setEditModal(true)} />
          <XCircleIcon onClick={() => setDeleteModal(true)} />
        </div>
      </div>

      <Modal show={openEditModal} close={openEditModal}>
        <h3>Editar visita</h3>
        <form className="formAddVisit">
          <input type="text" name="desc" value={editData.desc} placeholder="Descrição" onChange={(e) => handleEditChange(e)} />
          <textarea name='obs' value={editData.obs} placeholder="Observação" onChange={(e) => handleEditChange(e)} />
          <input name="date" type="date" value={formatInputDate(editData.date)} onChange={(e) => handleEditChange(e)} />

          <div>
            <XMarkIcon className='buttonsAddVisit' onClick={cancelEdit} title='Cancelar' />
            <CheckIcon className='buttonsAddVisit' title='Confirmar' />
          </div>
        </form>
      </Modal>

      <Modal show={openDeleteModal} close={openDeleteModal}>
        <form>

        </form>
      </Modal>
    </section>
  )
}

export default Visit