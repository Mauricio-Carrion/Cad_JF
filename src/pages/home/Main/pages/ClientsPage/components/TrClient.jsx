import React, { useState } from 'react';
import { PencilIcon, XCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import './TrClient.css'
import remoteHost from '../../../../../../Api'
import axios from 'axios';
import Modal from '../../../../components/Modal';
import { showToastMessageError, showToastMessageSucess } from '../../../../../../App';
import userImg from '../../../../../../assets/img/user.png'

const TrClient = (props) => {
  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const tdUserName = document.getElementById(`userName${props.code}`)
  const tdName = document.getElementById(`name${props.code}`)
  const tdLastName = document.getElementById(`lastName${props.code}`)
  const tdAdmin = document.getElementById(`admin${props.code}`)

  const [OpenDelete, setOpenDelete] = useState(false)
  const [OpenEdit, setOpenEdit] = useState(false)

  const [inputUser, setInputUser] = useState(props.userName)
  const [inputPassword, setInputPassword] = useState('')
  const [inputConfirmPassword, setConfirmPassword] = useState('')
  const [inputName, setInputName] = useState(props.name)
  const [inputLastName, setInputLastName] = useState(props.lastName)

  const editClient = async (e) => {
    e.preventDefault()

    if (inputPassword !== inputConfirmPassword) {

      showToastMessageError('Senhas são diferentes')

    } else {
      const adminCheckBox = document.getElementById('admin')

      await axios.put(
        `${remoteHost}/usuario/${props.code}`,
        {
          imagem: inputImage ? inputImage : 'null',
          usuario: inputUser,
          senha: inputPassword,
          nome: inputName,
          sobrenome: inputLastName,
          adm: adminCheckBox.checked ? 'true' : 'false',
        },
        { headers })
        .then(res => {
          tdUserName.innerHTML = res.data.usuario
          tdName.innerHTML = res.data.nome
          tdLastName.innerHTML = res.data.sobrenome
          tdAdmin.innerHTML = res.data.adm == 'true' ? 'Sim' : 'Não'

          setInputUser(res.data.usuario)
          setInputName(res.data.nome)
          setInputLastName(res.data.sobrenome)
          setInputAdmin(res.data.adm == 'true' ? 'Sim' : 'Não')
          showToastMessageSucess('Usuário atualizado!')
          setOpenEdit(false)
        })
        .catch(err => /*showToastMessageError(err.response.data.msg)*/ console.log(err))
    }
  }

  const handleCancelEdit = () => {
    setOpenEdit(false)
    setInputUser(tdUserName.innerText)
    setInputPassword('')
    setConfirmPassword('')
    setInputName(tdName.innerText)
    setInputLastName(tdLastName.innerText)
    setInputAdmin(tdAdmin.innerText)
    setCurrentImage(dbImage ? dbImage : userImg)
  }

  const deleteClient = async () => {
    const tr = document.getElementById(`user${props.code}`)
    await axios.delete(`${remoteHost}/usuario/${props.code}`, { headers })
      .then(res => {
        showToastMessageSucess(res.data.msg)

        if (res.status === 200) {
          tr.remove()
        }

      })
      .then(setOpenDelete(false))
      .catch(err => showToastMessageError(err.response.data.msg))
  }

  return (
    <tr id={`client${props.code}`}>
      <td>{props.code}</td>
      <td id={`name${props.code}`} className='none'>{props.clientName}</td>
      <td id={`razao${props.code}`}>{props.razao}</td>
      <td id={`status${props.code}`} className='none'>{props.staus}</td>
      <td>
        <PencilIcon onClick={() => setOpenEdit(true)} className='tdEditUserIcon' />
        <XCircleIcon onClick={() => setOpenDelete(true)} className='tdDeleteUserIcon' />
      </td>

      {/* Modal excluir */}
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
    </tr>
  )
}

export default TrClient