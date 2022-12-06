import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EllipsisHorizontalCircleIcon, XCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import './TrClient.css'
import remoteHost from '../../../../../../Api'
import axios from 'axios';
import Modal from '../../../../components/Modal'
import { showToastMessageError, showToastMessageSucess } from '../../../../../../App'

const TrClient = (props) => {
  const token = JSON.parse(localStorage.getItem('user')).token
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const client = {
    code: props.code,
    name: props.clientName,
    razao: props.razao,
    cnpj: props.cnpj
  }

  const navigate = useNavigate()

  const [OpenDelete, setOpenDelete] = useState(false)
  const [OpenEdit, setOpenEdit] = useState(false)

  const deleteClient = async () => {
    const tr = document.getElementById(`user${props.code}`)
    await axios.delete(`${remoteHost}/cliente/${props.code}`, { headers })
      .then(res => {
        showToastMessageSucess(res.data.msg)

        if (res.status === 200) {
          tr.remove()
        }

      })
      .then(setOpenDelete(false))
      .catch(err => showToastMessageError(err.response.data.msg))
  }

  if (OpenEdit) {
    navigate({
      pathname: '/clients/client',
      search: `?code=${props.code}`,
    });
  }

  const handleStatus = (status) => {
    switch (status) {
      case 1:
        return 'Em andamento'
      case 2:
        return 'Encerrado pelo cliente'
      case 3:
        return 'Finalizado'
    }
  }

  return (
    <tr id={`client${props.code}`}>
      <td className='none'>{props.code}</td>
      <td id={`tec${props.code}`}>{props.tec}</td>
      <td id={`name${props.code}`}>{props.clientName}</td>
      <td id={`razao${props.code}`} className='none'>{props.razao}</td>
      <td id={`status${props.code}`} className='none'>{handleStatus(props.status)}</td>
      <td>
        <EllipsisHorizontalCircleIcon onClick={() => setOpenEdit(true)} className='tdEditUserIcon' title='Detalhes' />
        <XCircleIcon onClick={() => setOpenDelete(true)} className='tdDeleteUserIcon' title='Excluir' />
      </td>

      {/* Modal excluir */}
      <Modal show={OpenDelete} close={OpenDelete}>
        Deseja realmente excluir cliente?
        <div className="btns">
          <button onClick={() => setOpenDelete(false)}>
            <XMarkIcon className='heroicons' />
          </button>

          <button onClick={deleteClient}>
            <CheckIcon className='heroicons' />
          </button>
        </div>
      </Modal>
    </tr >
  )
}

export default TrClient