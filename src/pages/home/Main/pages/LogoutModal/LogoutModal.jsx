import React, { useState, useContext } from 'react';
import ReactModal from 'react-modal'
import './LogoutModal.css'
import { AuthContext } from '../../../../../contexts/auth';

const Modal = () => {
  const { logout } = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <span onClick={handleOpenModal}><i className="fa fa-sign-out" aria-hidden="true" />Sair</span>
      <ReactModal
        isOpen={showModal}
        contentLabel="Modal"
        className='modal'
        ariaHideApp={false}
        overlayClassName='modaloverlay'
      >
        <div>
          Deseja realmente sair?
        </div>

        <div className='btns'>
          <span onClick={handleCloseModal}><i className="fa fa-times" aria-hidden="true" /></span>
          <span onClick={logout}><i className="fa fa-check" aria-hidden="true" /></span>
        </div>
      </ReactModal>
    </div>
  )
}

export default Modal