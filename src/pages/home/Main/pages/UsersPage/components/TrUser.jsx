import React, { useState } from 'react';
import { PencilIcon, XCircleIcon, XMarkIcon, CheckIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import './TrUser.css'
import remoteHost from '../../../../../../Api'
import axios from 'axios';
import Modal from '../../../../components/Modal';
import { showToastMessageError, showToastMessageSucess } from '../../../../../../App';
import userImg from '../../../../../../assets/img/user.png'

const TrUser = (props) => {
  const token = JSON.parse(localStorage.getItem('user')).token

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const [OpenDelete, setOpenDelete] = useState(false)
  const [OpenEdit, setOpenEdit] = useState(false)
  const [inputUser, setInputUser] = useState(props.userName)
  const [inputName, setInputName] = useState(props.name)
  const [inputLastName, setInputLastName] = useState(props.lastName)
  const [inputAdmin, setInputAdmin] = useState(props.admin)
  const [inputImage, setInputImage] = useState(props.image ? props.image : userImg)

  const editUser = async () => {
    await axios.post(`${remoteHost}/usuario/${props.code}`, { headers })
  }

  const loadImg = (e) => {
    let input = e.target;

    let reader = new FileReader();

    reader.onload = () => {
      let dataURL = reader.result;
      setInputImage(dataURL)
    };
    reader.readAsDataURL(input.files[0]);
  }

  const handleCancelEdit = () => {
    setOpenEdit(false)
    setInputUser(props.userName)
    setInputName(props.name)
    setInputLastName(props.lastName)
    setInputAdmin(props.admin)
    setInputImage(props.image ? props.image : userImg)
  }

  const handleCheckBoxAdmin = (e) => {
    e.target.checked ? setInputAdmin('Sim') : setInputAdmin('Não')
  }

  const deleteUser = async () => {
    const tr = document.getElementById(`user${props.code}`)
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

      {/* Modal editar */}
      <Modal show={OpenEdit} close={OpenEdit}>
        <form className="formEditUser">
          <label htmlFor="imgUser">
            <img id='editUserImg' src={inputImage} alt="user" title="Clique para alterar!" />
            <input id="imgUser" type="file" onChange={loadImg} />
          </label>

          <input type="text" placeholder='Usuário' value={inputUser} onChange={(e) => setInputUser(e.target.value)} />
          <input type="text" placeholder='Nome' value={inputName} onChange={(e) => setInputName(e.target.value)} />
          <input type="text" placeholder='Sobrenome' value={inputLastName} onChange={(e) => setInputLastName(e.target.value)} />
          <input type="password" placeholder='Senha' />
          <input type="password" placeholder='Confirmar senha' />
          <label htmlFor="admin">Administrador
            <input type="checkbox" id="admin" name="Admin" onChange={handleCheckBoxAdmin} checked={inputAdmin == 'Sim' ? true : false} />
          </label>

          <div className="btns" title="Cancelar">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className='heroicons' />
            </button>

            <button title="Confirmar">
              <CheckIcon className='heroicons' />
            </button>
          </div>
        </form>
      </Modal>
    </tr>
  )
}

export default TrUser