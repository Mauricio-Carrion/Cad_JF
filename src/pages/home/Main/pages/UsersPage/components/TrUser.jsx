import React, { useState } from 'react';
import { PencilIcon, XCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
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
  const [inputPassword, setInputPassword] = useState('')
  const [inputConfirmPassword, setConfirmPassword] = useState('')
  const [inputName, setInputName] = useState(props.name)
  const [inputLastName, setInputLastName] = useState(props.lastName)
  const [inputAdmin, setInputAdmin] = useState(props.admin)
  const [inputImage, setInputImage] = useState(props.image ? props.image : userImg)

  const tdUserName = document.getElementById(`userName${props.code}`)
  const tdName = document.getElementById(`name${props.code}`)
  const tdLastName = document.getElementById(`lastName${props.code}`)
  const tdAdmin = document.getElementById(`admin${props.code}`)

  const editUser = async (e) => {
    e.preventDefault()

    if (inputPassword !== inputConfirmPassword) {

      showToastMessageError('Senhas são diferentes')

    } else {
      const adminCheckBox = document.getElementById('admin')

      await axios.put(
        `${remoteHost}/usuario/${props.code}`,
        {
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
        .catch(err => showToastMessageError(err.response.data.msg))
    }
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
    setInputUser(tdUserName.innerText)
    setInputPassword('')
    setConfirmPassword('')
    setInputName(tdName.innerText)
    setInputLastName(tdLastName.innerText)
    setInputAdmin(tdAdmin.innerText)
    setInputImage(props.image ? props.image : userImg)
  }

  const handleCheckBoxAdmin = (e) => {
    e.target.checked ? setInputAdmin('Sim') : setInputAdmin('Não')
  }

  const deleteUser = async () => {
    const tr = document.getElementById(`user${props.code}`)
    await axios.delete(`${remoteHost}/usuario/${props.code}`, { headers })
      .then(res => showToastMessageSucess(res.data.msg))
      .then(tr.remove())
      .then(setOpenDelete(false))
      .catch(err => showToastMessageError(err.response.data.msg))
  }

  return (
    <tr id={`user${props.code}`}>
      <td>{props.code}</td>
      <td id={`userName${props.code}`} className='none'>{props.userName}</td>
      <td id={`name${props.code}`}>{props.name}</td>
      <td id={`lastName${props.code}`} className='none'>{props.lastName}</td>
      <td id={`admin${props.code}`} className='none'>{props.admin}</td>
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
          <input type="password" placeholder='Senha' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
          <input type="password" placeholder='Confirmar senha' value={inputConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label htmlFor="admin">Administrador
            <input type="checkbox" id="admin" name="Admin" onChange={handleCheckBoxAdmin} checked={inputAdmin == 'Sim' ? true : false} />
          </label>

          <div className="btns" title="Cancelar">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className='heroicons' />
            </button>

            <button onClick={editUser} title="Confirmar">
              <CheckIcon className='heroicons' />
            </button>
          </div>
        </form>
      </Modal>
    </tr>
  )
}

export default TrUser