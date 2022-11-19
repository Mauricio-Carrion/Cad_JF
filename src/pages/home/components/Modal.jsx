import React from 'react';
import { Dialog } from '@headlessui/react';
import './Modal.css'

const Modal = (props) => {
  return (
    <div>
      <Dialog
        open={props.show}
        onClose={() => props.close}
        className='modal'
      >
        <Dialog.Panel>
          {props.children}
        </Dialog.Panel>

      </Dialog>
    </div >
  )
}

export default Modal