import React, { useState } from 'react'
import { PencilIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Modal from '../../../../components/Modal'
import './Visit.css'

const Visit = (props) => {
  const [openEditModal, setEditModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)

  return (
    <section id={`visit-${props.code}`} className="visit">
      <div className='mainVisit'>
        <h3>{props.desc}</h3>
        <p>{props.obs}</p>
        <h6>{`Data: ${props.date}`}</h6>
        <div className="btns-visit">
          <PencilIcon />
          <XCircleIcon />
        </div>
      </div>

      <Modal show={openEditModal} close={openEditModal}>

      </Modal>

      <Modal show={openDeleteModal} close={openDeleteModal}>

      </Modal>
    </section>
  )
}

export default Visit