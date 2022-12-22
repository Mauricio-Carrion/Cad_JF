import React, { useState, useContext } from 'react'
import { formatInputDate } from '../../../../../../utils/utils'
import { AuthContext } from '../../../../../../contexts/auth'
import axios from 'axios'
import remoteHost from '../../../../../../Api'
import { showToastMessageError, showToastMessageSucess } from "../../../../../../App"
import { CheckIcon, XMarkIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Modal from '../../../../components/Modal'
import './Visit.css'

const Visit = (props) => {
  const [data, setData] = useState(props)
  const [editData, setEditData] = useState(data)
  const [disableState, setDisableState] = useState(data)
  const { logout } = useContext(AuthContext)
  const [openEditModal, setEditModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)

  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const handleLogout = (err) => {
    if (err.status === 400) {
      logout()
    }
  }

  const handleEditChange = (e) => {
    let updatedValue = {}

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
      `${remoteHost}/visita/${props.code}`,
      {
        data: editData.date,
        descricao: editData.desc,
        obs: editData.obs
      },
      { headers })
      .then(res => showToastMessageSucess('Visita Editada!'))
      .then(res => setEditModal(false))
      .catch(err => {
        handleLogout(err)
        showToastMessageError(err.response.data.msg)
      })
  }

  console.log(editData.date)

  return (
    <section id={`visit-${data.code}`} className="visit" onClick={() => setEditModal(true)}>

      <div className='mainVisit'>
        <h3>{editData.desc}</h3>
        <p>{editData.obs}</p>
        <h6>{`Data: ${formatInputDate(editData.date)}`}</h6>
      </div>

      <Modal show={openEditModal} close={openEditModal}>
        <h3>Editar visita</h3>
        <form className="formAddVisit">
          <input type="text" name="desc" value={editData.desc} placeholder="Descrição" onChange={(e) => handleEditChange(e)} disabled={disableState} />
          <textarea name='obs' value={editData.obs} placeholder="Observação" onChange={(e) => handleEditChange(e)} disabled={disableState} />
          <input name="date" type="date" value={editData.date} onChange={(e) => handleEditChange(e)} disabled={disableState} />

          <div>
            {
              disableState ?
                <>
                  <XMarkIcon className='buttonsAddVisit' onClick={cancelEdit} title='Cancelar' />
                  <XCircleIcon onClick={() => setDeleteModal(true)} title='Excluir' />
                </>
                :
                <CheckIcon className='buttonsAddVisit' onClick={handleEditVisit} title='Confirmar' />
            }
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