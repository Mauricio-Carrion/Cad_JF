import React, { useState } from 'react';
import { PencilIcon, XCircleIcon, XMarkIcon, CheckIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import './TrUser.css'
import remoteHost from '../../../../../../Api'
import axios from 'axios';
import Modal from '../../../../components/Modal';
import { showToastMessageError, showToastMessageSucess } from '../../../../../../App';

const TrUser = (props) => {
  const [OpenDelete, setOpenDelete] = useState(false)
  const [OpenEdit, setOpenEdit] = useState(false)

  const editUser = () => {

  }

  const deleteUser = async () => {
    const tr = document.getElementById(`user${props.code}`)

    const token = JSON.parse(localStorage.getItem('user')).token

    const headers = {
      Authorization: `Bearer ${token}`
    }

    await axios.delete(`${remoteHost}/usuario/${props.code}`, { headers })
      .then(res => showToastMessageSucess(res.data.msg))
      .then(res => tr.remove())
      .then(setOpenDelete(false))
      .catch(err => showToastMessageError(err.response.data.msg))
  }

  return (
    <tr id={`user${props.code}`}>
      <td>{props.code}</td>
      <td className='none'>{props.userName}</td>
      <td>{props.name}</td>
      <td className='none'>{props.lastName}</td>
      <td className='none'>{props.admin}</td>
      <td>
        <PencilIcon onClick={() => setOpenEdit(true)} className='tdEditUserIcon' />
        <XCircleIcon onClick={() => setOpenDelete(true)} className='tdDeleteUserIcon' />
      </td>

      <Modal show={OpenDelete} close={OpenDelete}>
        Deseja realmente excluir usuário?
        <div className="btns">
          <button onClick={() => setOpenDelete(false)}>
            <XMarkIcon className='heroicons' />
          </button>

          <button onClick={deleteUser}>
            <CheckIcon className='heroicons' />
          </button>
        </div>
      </Modal>

      <Modal show={OpenEdit} close={OpenEdit}>
        <form className="formEditUser">
          <label htmlFor="imgUser">
            <PlusCircleIcon className='heroicons' />
            <input type="file" id="imgUser" />
          </label>

          <input type="text" />
          <input type="password" />
          <input type="password" />
          <input type="text" />
          <label htmlFor="admin">Administrador
            <input type="checkbox" id="admin" name="Admin" value="true" />
          </label>

          <div className="btns">
            <button onClick={() => setOpenEdit(false)}>
              <XMarkIcon className='heroicons' />
            </button>

            <button onClick={deleteUser}>
              <CheckIcon className='heroicons' />
            </button>
          </div>
        </form>
      </Modal>
    </tr>
  )
}

export default TrUser