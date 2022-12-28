import React, { useState, useContext } from 'react'
import { formatInputDate } from '../../../../../../utils/utils'
import axios from 'axios'
import remoteHost from '../../../../../../Api'
import { showToastMessageSucess } from "../../../../../../App"
import { CheckIcon, XMarkIcon, PencilIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { handleLogout } from '../../../../../../utils/utils'
import Modal from '../../../../components/Modal'
import { AuthContext } from '../../../../../../contexts/auth'
import './Visit.css'

const Visit = (props) => {
  const data = props
  const [editData, setEditData] = useState(data)
  const [disableState, setDisableState] = useState(true)
  const [openEditModal, setEditModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)

  const token = JSON.parse(localStorage.getItem('user')).token
  const update = props.exclude
  const { logout } = useContext(AuthContext)

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const handleEditChange = (e) => {
    let updatedValue = {}
    console.log(e.target)
    switch (e.target.name) {
      case 'desc':
        if (e.target.value.length < 50) {
          updatedValue = { desc: e.target.value }
        }
        break
      case 'obs':
        if (e.target.value.length < 150) {
          updatedValue = { obs: e.target.value }
        }
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

  const deleteVisit = async () => {
    await axios.delete(
      `${remoteHost}/visita/${props.code}`,
      { headers })
      .then(res => showToastMessageSucess('Visita Excluida!'))
      .then(res => setEditModal(false))
      .then(res => setDeleteModal(false))
      .catch(err => {
        err.response.status === 400 ? logout() : handleLogout(err)
      })

    update(props.code)
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
      .then(res => setDisableState(true))
      .catch(err => {
        err.response.status === 400 ? logout() : handleLogout(err)
      })
  }

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
          <textarea name='obs' value={editData.obs} placeholder="Observação" onChange={(e) => console.log(e.target)} disabled={disableState} />
          <input name="date" type="date" value={editData.date} onChange={(e) => handleEditChange(e)} disabled={disableState} />

          <div>
            {
              disableState ?
                <>
                  <PencilIcon onClick={() => setDisableState(false)} title='Editar visita' />
                  <TrashIcon onClick={() => setDeleteModal(true)} title='Excluir visita' />
                  <XCircleIcon onClick={cancelEdit} title='Fechar' />
                </>
                :
                <>
                  <CheckIcon className='buttonsAddVisit' onClick={handleEditVisit} title='Confirmar edição' />
                  <XMarkIcon className='buttonsAddVisit' onClick={() => setDisableState(true)} title='Cancelar edição' />
                </>
            }
          </div>
        </form>
      </Modal>

      <Modal show={openDeleteModal} close={openDeleteModal}>
        Deseja realmente excluir visita?
        <div className="btns">
          <button onClick={() => setDeleteModal(false)}>
            <XMarkIcon className='heroicons' />
          </button>

          <button onClick={deleteVisit}>
            <CheckIcon className='heroicons' />
          </button>
        </div>
      </Modal>
    </section>
  )
}

export default Visit